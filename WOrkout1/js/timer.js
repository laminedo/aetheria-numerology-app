// High-Precision Interval Runner Engine with WakeLock & Web Audio synchronization
import { soundEngine } from './audio.js';

export const PhaseType = {
  PREPARE: 'PREPARE',
  WORK: 'WORK',
  REST: 'REST',
  REST_BETWEEN_CYCLES: 'REST_BETWEEN_CYCLES',
  COOLDOWN: 'COOLDOWN',
  FINISHED: 'FINISHED'
};

export class WorkoutTimerEngine {
  constructor() {
    this.workout = null;
    this.timeline = [];
    this.currentStepIdx = 0;
    this.status = 'idle'; // 'idle' | 'running' | 'paused' | 'finished'
    
    this.stepSecondsRemaining = 0;
    this.stepDuration = 0;
    this.totalSecondsElapsed = 0;
    this.totalSecondsRemaining = 0;
    this.totalWorkoutDuration = 0;

    this.rafId = null;
    this.lastTimestamp = 0;
    this.wakeLock = null;

    // Callbacks
    this.onTick = null;
    this.onPhaseChange = null;
    this.onStateChange = null;
    this.onComplete = null;
  }

  buildTimeline(w) {
    this.workout = w;
    const list = [];

    // 1. Prepare phase
    if (w.prepare > 0) {
      list.push({
        phase: PhaseType.PREPARE,
        title: 'PREPARE',
        subtitle: 'GET READY',
        duration: w.prepare,
        round: 1,
        totalRounds: w.rounds,
        cycle: 1,
        totalCycles: w.cycles,
        colorTheme: 'prepare'
      });
    }

    // 2. Cycles & Rounds
    const totalCycles = Math.max(1, w.cycles || 1);
    const totalRounds = Math.max(1, w.rounds || 1);

    for (let c = 1; c <= totalCycles; c++) {
      for (let r = 1; r <= totalRounds; r++) {
        // Work
        if (w.work > 0) {
          list.push({
            phase: PhaseType.WORK,
            title: 'WORK',
            subtitle: `CYCLE ${c}/${totalCycles} • ROUND ${r}/${totalRounds}`,
            duration: w.work,
            round: r,
            totalRounds: totalRounds,
            cycle: c,
            totalCycles: totalCycles,
            colorTheme: 'work'
          });
        }

        const isLastRoundOfCycle = (r === totalRounds);
        const isLastCycle = (c === totalCycles);

        if (!isLastRoundOfCycle) {
          // Regular Rest between rounds
          if (w.rest > 0) {
            list.push({
              phase: PhaseType.REST,
              title: 'REST',
              subtitle: `RECOVERY BEFORE ROUND ${r + 1}`,
              duration: w.rest,
              round: r,
              totalRounds: totalRounds,
              cycle: c,
              totalCycles: totalCycles,
              colorTheme: 'rest'
            });
          }
        } else if (!isLastCycle) {
          // Rest between cycles
          const rbcDuration = (w.restBetweenCycles !== undefined && w.restBetweenCycles !== null) ? w.restBetweenCycles : w.rest;
          if (rbcDuration > 0) {
            list.push({
              phase: PhaseType.REST_BETWEEN_CYCLES,
              title: 'REST BETWEEN CYCLES',
              subtitle: `PREPARE FOR CYCLE ${c + 1}/${totalCycles}`,
              duration: rbcDuration,
              round: r,
              totalRounds: totalRounds,
              cycle: c,
              totalCycles: totalCycles,
              colorTheme: 'rest-bc'
            });
          }
        }
      }
    }

    // 3. Cooldown phase
    if (w.cooldown > 0) {
      list.push({
        phase: PhaseType.COOLDOWN,
        title: 'COOLDOWN',
        subtitle: 'HEART RATE RECOVERY',
        duration: w.cooldown,
        round: totalRounds,
        totalRounds: totalRounds,
        cycle: totalCycles,
        totalCycles: totalCycles,
        colorTheme: 'cooldown'
      });
    }

    this.timeline = list;
    this.totalWorkoutDuration = list.reduce((acc, item) => acc + item.duration, 0);
    this.reset();
  }

  reset() {
    this.pause();
    this.currentStepIdx = 0;
    this.totalSecondsElapsed = 0;
    this.status = 'idle';

    if (this.timeline.length > 0) {
      this.stepDuration = this.timeline[0].duration;
      this.stepSecondsRemaining = this.timeline[0].duration;
      this.totalSecondsRemaining = this.totalWorkoutDuration;
    } else {
      this.stepDuration = 0;
      this.stepSecondsRemaining = 0;
      this.totalSecondsRemaining = 0;
    }

    this.notifyState();
    this.notifyTick();
  }

  start() {
    if (this.status === 'running') return;
    if (this.timeline.length === 0) return;

    soundEngine.init();
    this.acquireWakeLock();
    this.status = 'running';
    this.lastTimestamp = performance.now();

    // If starting fresh on prepare/work, announce
    if (this.currentStepIdx === 0 && this.stepSecondsRemaining === this.stepDuration) {
      this.handlePhaseAudio(this.currentStep());
    }

    this.notifyState();
    this.loop();
  }

  pause() {
    if (this.status !== 'running') return;
    this.status = 'paused';
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.releaseWakeLock();
    this.notifyState();
  }

  togglePlayPause() {
    if (this.status === 'running') {
      this.pause();
    } else {
      this.start();
    }
  }

  skipNext() {
    if (this.currentStepIdx < this.timeline.length - 1) {
      const step = this.timeline[this.currentStepIdx];
      this.totalSecondsElapsed += this.stepSecondsRemaining;
      this.currentStepIdx++;
      this.setupCurrentStep();
    } else {
      this.finish();
    }
  }

  skipPrevious() {
    if (this.stepDuration - this.stepSecondsRemaining > 3 || this.currentStepIdx === 0) {
      // Restart current step
      this.totalSecondsElapsed -= (this.stepDuration - this.stepSecondsRemaining);
      this.stepSecondsRemaining = this.stepDuration;
    } else if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      this.setupCurrentStep();
    }
    this.notifyTick();
    this.notifyPhase();
  }

  setupCurrentStep() {
    const step = this.timeline[this.currentStepIdx];
    this.stepDuration = step.duration;
    this.stepSecondsRemaining = step.duration;
    this.recalculateTotalRemaining();
    this.handlePhaseAudio(step);
    this.notifyPhase();
    this.notifyTick();
  }

  currentStep() {
    return this.timeline[this.currentStepIdx] || null;
  }

  nextStep() {
    return this.timeline[this.currentStepIdx + 1] || null;
  }

  getRoundsLeft() {
    if (!this.timeline || this.timeline.length === 0) return 0;
    // Count how many WORK steps are remaining from this point forward
    let count = 0;
    for (let i = this.currentStepIdx; i < this.timeline.length; i++) {
      if (this.timeline[i].phase === PhaseType.WORK) {
        count++;
      }
    }
    return count;
  }

  loop() {
    if (this.status !== 'running') return;

    this.rafId = requestAnimationFrame((now) => {
      const deltaSec = (now - this.lastTimestamp) / 1000;
      this.lastTimestamp = now;

      if (deltaSec > 0) {
        const prevWholeSec = Math.ceil(this.stepSecondsRemaining);
        this.stepSecondsRemaining -= deltaSec;
        this.totalSecondsElapsed += deltaSec;
        this.totalSecondsRemaining = Math.max(0, this.totalWorkoutDuration - this.totalSecondsElapsed);

        const newWholeSec = Math.ceil(this.stepSecondsRemaining);

        // 3-2-1 Beep trigger
        if (newWholeSec !== prevWholeSec && newWholeSec > 0 && newWholeSec <= 3) {
          soundEngine.playCountdownBeep(newWholeSec);
          soundEngine.vibrate(50);
        }

        if (this.stepSecondsRemaining <= 0) {
          // Transition to next phase
          if (this.currentStepIdx < this.timeline.length - 1) {
            this.currentStepIdx++;
            this.setupCurrentStep();
          } else {
            this.finish();
            return;
          }
        }
      }

      this.notifyTick();
      this.loop();
    });
  }

  handlePhaseAudio(step) {
    if (!step) return;
    if (step.phase === PhaseType.WORK) {
      soundEngine.playWorkChime();
      soundEngine.vibrate([100, 50, 100]);
    } else if (step.phase === PhaseType.REST || step.phase === PhaseType.REST_BETWEEN_CYCLES) {
      soundEngine.playRestChime();
      soundEngine.vibrate(150);
    } else if (step.phase === PhaseType.PREPARE) {
      soundEngine.playTone(550, 'sine', 0.2, 0.4);
      soundEngine.speak('Prepare to start');
    } else if (step.phase === PhaseType.COOLDOWN) {
      soundEngine.playTone(440, 'sine', 0.3, 0.4);
      soundEngine.speak('Cooldown');
    }
  }

  finish() {
    this.status = 'finished';
    this.stepSecondsRemaining = 0;
    this.totalSecondsRemaining = 0;
    this.totalSecondsElapsed = this.totalWorkoutDuration;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.releaseWakeLock();
    soundEngine.playCompleteFanfare();
    soundEngine.vibrate([200, 100, 200, 100, 400]);
    this.notifyState();
    this.notifyTick();
    if (this.onComplete) this.onComplete();
  }

  recalculateTotalRemaining() {
    let remaining = Math.max(0, this.stepSecondsRemaining);
    for (let i = this.currentStepIdx + 1; i < this.timeline.length; i++) {
      remaining += this.timeline[i].duration;
    }
    this.totalSecondsRemaining = remaining;
  }

  notifyTick() {
    if (this.onTick) {
      this.onTick({
        stepSecondsRemaining: Math.max(0, this.stepSecondsRemaining),
        stepDuration: this.stepDuration,
        totalSecondsElapsed: this.totalSecondsElapsed,
        totalSecondsRemaining: Math.max(0, this.totalSecondsRemaining),
        roundsLeft: this.getRoundsLeft(),
        currentStep: this.currentStep(),
        nextStep: this.nextStep()
      });
    }
  }

  notifyPhase() {
    if (this.onPhaseChange) {
      this.onPhaseChange(this.currentStep(), this.nextStep());
    }
  }

  notifyState() {
    if (this.onStateChange) {
      this.onStateChange(this.status);
    }
  }

  async acquireWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {
        console.warn('Wake Lock error:', err);
      }
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      try {
        this.wakeLock.release();
      } catch (err) {}
      this.wakeLock = null;
    }
  }
}

export const workoutTimer = new WorkoutTimerEngine();
