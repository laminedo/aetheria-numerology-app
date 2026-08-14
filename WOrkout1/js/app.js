/**
 * AETHERIA ATHLETIC INTERVAL & TABATA TIMER
 * Complete self-contained application engine
 */

(function () {
  'use strict';

  /* =========================================================================
     1. SOUND & VOICE ENGINE (Web Audio API + SpeechSynthesis)
     ========================================================================= */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
      this.voiceEnabled = true;
      this.volume = 0.85;
      this.synth = window.speechSynthesis || null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.5) {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio tone error:', e);
      }
    }

    playCountdownBeep(num) {
      this.playTone(880, 'sine', 0.12, 0.6); // High crisp A5
      if (this.voiceEnabled && num) {
        this.speak(String(num), 1.2);
      }
    }

    playWorkChime() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1174.66, now); // D6
      gain1.gain.setValueAtTime(0.7 * this.volume, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1760, now + 0.1); // A6
      gain2.gain.setValueAtTime(0.8 * this.volume, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.35);

      if (this.voiceEnabled) {
        setTimeout(() => this.speak('Work!'), 150);
      }
    }

    playRestChime() {
      if (!this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.3); // Drop to E4
      gain.gain.setValueAtTime(0.7 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);

      if (this.voiceEnabled) {
        setTimeout(() => this.speak('Rest'), 150);
      }
    }

    playCompleteFanfare() {
      if (!this.soundEnabled) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.3, 0.8);
        }, i * 160);
      });

      if (this.voiceEnabled) {
        setTimeout(() => this.speak('Workout complete! Outstanding job!'), 700);
      }
    }

    speak(text, rate = 1.1) {
      if (!this.voiceEnabled || !this.synth) return;
      try {
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = this.volume;
        this.synth.speak(utterance);
      } catch (e) {
        console.warn('Speech error:', e);
      }
    }

    vibrate(pattern = 60) {
      if (navigator.vibrate) {
        try {
          navigator.vibrate(pattern);
        } catch (e) {}
      }
    }
  }

  const soundEngine = new SoundEngine();

  /* =========================================================================
     2. WORKOUT PRESETS & STORAGE MANAGER (Beginner to Advanced)
     ========================================================================= */
  const DEFAULT_PRESETS = [
    // BEGINNER
    {
      id: 'preset-beg-1',
      name: 'BEGINNER INTRO TABATA',
      level: 'Beginner',
      description: 'Gentle work-to-rest ratio (1:2) to build stamina and heart health.',
      prepare: 15,
      work: 10,
      rest: 20,
      rounds: 4,
      cycles: 2,
      restBetweenCycles: 45,
      cooldown: 30,
      tag: 'Intro / Low Impact'
    },
    {
      id: 'preset-beg-2',
      name: 'BEGINNER CARDIO BOOST',
      level: 'Beginner',
      description: 'Balanced 15s work & 15s rest for developing basic interval power.',
      prepare: 15,
      work: 15,
      rest: 15,
      rounds: 6,
      cycles: 2,
      restBetweenCycles: 30,
      cooldown: 30,
      tag: 'Aerobic Base'
    },
    {
      id: 'preset-beg-3',
      name: 'CORE & STABILITY',
      level: 'Beginner',
      description: 'Planks, crunches, and glute bridges with ample recovery.',
      prepare: 10,
      work: 20,
      rest: 20,
      rounds: 5,
      cycles: 2,
      restBetweenCycles: 40,
      cooldown: 20,
      tag: 'Core Strength'
    },

    // INTERMEDIATE
    {
      id: 'preset-int-1',
      name: 'CLASSIC TABATA 20/10',
      level: 'Intermediate',
      description: 'The world-famous Izumi Tabata protocol: 20s max effort, 10s rest.',
      prepare: 15,
      work: 20,
      rest: 10,
      rounds: 8,
      cycles: 3,
      restBetweenCycles: 30,
      cooldown: 0,
      tag: 'Gold Standard'
    },
    {
      id: 'preset-int-2',
      name: 'FAT BURN HIIT 30/15',
      level: 'Intermediate',
      description: 'High calorie burn interval structure with dynamic bodyweight moves.',
      prepare: 10,
      work: 30,
      rest: 15,
      rounds: 6,
      cycles: 3,
      restBetweenCycles: 45,
      cooldown: 45,
      tag: 'High Intensity'
    },
    {
      id: 'preset-int-3',
      name: 'BOXING FITNESS ROUNDS',
      level: 'Intermediate',
      description: '2-minute punching and footwork rounds with 30s active rest.',
      prepare: 15,
      work: 120,
      rest: 30,
      rounds: 5,
      cycles: 1,
      restBetweenCycles: 60,
      cooldown: 60,
      tag: 'Combat Conditioning'
    },

    // ADVANCED
    {
      id: 'preset-adv-1',
      name: 'SPARTAN 40/20 BEAST',
      level: 'Advanced',
      description: 'Grueling 40 seconds all-out work with short 20s recovery windows.',
      prepare: 10,
      work: 40,
      rest: 20,
      rounds: 8,
      cycles: 4,
      restBetweenCycles: 60,
      cooldown: 60,
      tag: 'Elite Endurance'
    },
    {
      id: 'preset-adv-2',
      name: 'TABATA INFERNO 30/10',
      level: 'Advanced',
      description: 'Extended work time on the Tabata cycle for maximum VO2 max surge.',
      prepare: 10,
      work: 30,
      rest: 10,
      rounds: 8,
      cycles: 4,
      restBetweenCycles: 45,
      cooldown: 45,
      tag: 'Extreme Anaerobic'
    },
    {
      id: 'preset-adv-3',
      name: 'PRO MMA CHAMPIONSHIP',
      level: 'Advanced',
      description: '5 Championship rounds of 3 minutes work with 1 minute rest.',
      prepare: 15,
      work: 180,
      rest: 60,
      rounds: 5,
      cycles: 1,
      restBetweenCycles: 0,
      cooldown: 90,
      tag: 'Championship'
    }
  ];

  const STORAGE_KEY = 'aetheria_workouts_v2';
  const ACTIVE_KEY = 'aetheria_active_workout_id_v2';

  class WorkoutManager {
    constructor() {
      this.workouts = this.loadWorkouts();
      this.activeWorkoutId = localStorage.getItem(ACTIVE_KEY) || 'preset-int-1';
    }

    loadWorkouts() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Storage read warning:', e);
      }
      this.saveWorkouts(DEFAULT_PRESETS);
      return JSON.parse(JSON.stringify(DEFAULT_PRESETS));
    }

    saveWorkouts(list = this.workouts) {
      this.workouts = list;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.workouts));
      } catch (e) {
        console.error('Storage save error:', e);
      }
    }

    getActiveWorkout() {
      const found = this.workouts.find(w => w.id === this.activeWorkoutId);
      if (found) return found;
      return this.workouts[0] || DEFAULT_PRESETS[0];
    }

    setActiveWorkout(id) {
      this.activeWorkoutId = id;
      try {
        localStorage.setItem(ACTIVE_KEY, id);
      } catch (e) {}
    }

    updateActiveWorkout(fields) {
      const active = this.getActiveWorkout();
      if (!active) return;
      Object.assign(active, fields);
      this.saveWorkouts();
    }

    createWorkout(workoutData) {
      const newWorkout = {
        id: 'custom-' + Date.now(),
        name: workoutData.name || 'CUSTOM TABATA',
        level: workoutData.level || 'Custom',
        description: workoutData.description || 'Custom interval configuration',
        prepare: Number(workoutData.prepare ?? 15),
        work: Number(workoutData.work ?? 20),
        rest: Number(workoutData.rest ?? 10),
        rounds: Number(workoutData.rounds ?? 8),
        cycles: Number(workoutData.cycles ?? 3),
        restBetweenCycles: Number(workoutData.restBetweenCycles ?? 30),
        cooldown: Number(workoutData.cooldown ?? 0),
        tag: workoutData.tag || 'Custom Routine'
      };

      this.workouts.unshift(newWorkout);
      this.saveWorkouts();
      this.setActiveWorkout(newWorkout.id);
      return newWorkout;
    }

    duplicateWorkout(id) {
      const orig = this.workouts.find(w => w.id === id);
      if (!orig) return;
      const cloned = {
        ...orig,
        id: 'custom-' + Date.now(),
        name: `${orig.name} (COPY)`
      };
      this.workouts.unshift(cloned);
      this.saveWorkouts();
      this.setActiveWorkout(cloned.id);
      return cloned;
    }

    deleteWorkout(id) {
      if (this.workouts.length <= 1) return false;
      this.workouts = this.workouts.filter(w => w.id !== id);
      if (this.activeWorkoutId === id) {
        this.activeWorkoutId = this.workouts[0].id;
        try { localStorage.setItem(ACTIVE_KEY, this.activeWorkoutId); } catch(e){}
      }
      this.saveWorkouts();
      return true;
    }

    static calculateTotalSeconds(w) {
      if (!w) return 0;
      const roundTime = (w.work || 0) + (w.rest || 0);
      const cycleWorkTime = roundTime * (w.rounds || 1);
      const allCyclesTime = cycleWorkTime * (w.cycles || 1);
      const interCycleRestTime = (w.cycles > 1) ? ((w.cycles - 1) * (w.restBetweenCycles || 0)) : 0;
      return (w.prepare || 0) + allCyclesTime + interCycleRestTime + (w.cooldown || 0);
    }

    static formatTime(seconds) {
      const s = Math.max(0, Math.floor(seconds));
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      if (mins === 0) {
        return `:${secs < 10 ? '0' : ''}${secs}`;
      }
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    static formatFullTime(seconds) {
      const s = Math.max(0, Math.floor(seconds));
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }

  const workoutManager = new WorkoutManager();

  /* =========================================================================
     3. INTERACTIVE VALUE PICKER MODAL
     ========================================================================= */
  class PickerModal {
    constructor() {
      this.modalEl = null;
      this.currentField = null;
      this.currentValue = 0;
      this.isCountOnly = false;
      this.onSaveCallback = null;
      this.initDOM();
    }

    initDOM() {
      let el = document.getElementById('picker-modal-backdrop');
      if (!el) {
        el = document.createElement('div');
        el.id = 'picker-modal-backdrop';
        el.className = 'modal-backdrop hidden';
        el.innerHTML = `
          <div class="modal-card" id="picker-card" role="dialog" aria-modal="true">
            <div class="modal-header">
              <h3 class="modal-title" id="picker-title">EDIT INTERVAL</h3>
              <button class="modal-close-btn" id="picker-cancel-btn" aria-label="Cancel">&times;</button>
            </div>
            
            <div class="picker-body">
              <div class="picker-value-display" id="picker-display-val">00:20</div>
              <div class="picker-subtitle" id="picker-subtitle">WORK INTERVAL DURATION</div>

              <div class="picker-adjust-row">
                <button class="stepper-btn" id="picker-step-sub-10" data-delta="-10">-10s</button>
                <button class="stepper-btn" id="picker-step-sub-5" data-delta="-5">-5s</button>
                <button class="stepper-btn big-stepper" id="picker-step-sub-1" data-delta="-1">-1</button>
                <button class="stepper-btn big-stepper" id="picker-step-add-1" data-delta="1">+1</button>
                <button class="stepper-btn" id="picker-step-add-5" data-delta="5">+5s</button>
                <button class="stepper-btn" id="picker-step-add-10" data-delta="10">+10s</button>
              </div>

              <div class="picker-chips" id="picker-chips"></div>

              <div class="picker-slider-wrap">
                <input type="range" id="picker-range" min="0" max="300" step="1" value="20" class="custom-slider" />
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn-modal-cancel" id="picker-btn-cancel">CANCEL</button>
              <button class="btn-modal-save" id="picker-btn-save">SET VALUE</button>
            </div>
          </div>
        `;
        document.body.appendChild(el);
      }
      this.modalEl = el;
      this.bindEvents();
    }

    bindEvents() {
      const backdrop = this.modalEl;
      const cancelBtn1 = backdrop.querySelector('#picker-cancel-btn');
      const cancelBtn2 = backdrop.querySelector('#picker-btn-cancel');
      const saveBtn = backdrop.querySelector('#picker-btn-save');
      const slider = backdrop.querySelector('#picker-range');
      const chipsContainer = backdrop.querySelector('#picker-chips');

      const close = () => this.close();
      cancelBtn1.addEventListener('click', close);
      cancelBtn2.addEventListener('click', close);

      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close();
      });

      saveBtn.addEventListener('click', () => {
        soundEngine.playTone(880, 'sine', 0.05, 0.3);
        if (this.onSaveCallback) {
          this.onSaveCallback(this.currentField, this.currentValue);
        }
        this.close();
      });

      slider.addEventListener('input', (e) => {
        this.setValue(parseInt(e.target.value, 10));
      });

      backdrop.querySelectorAll('.stepper-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          soundEngine.playTone(660, 'sine', 0.04, 0.2);
          const delta = parseInt(btn.dataset.delta, 10);
          this.setValue(this.currentValue + delta);
        });
      });

      chipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip-btn');
        if (!chip) return;
        soundEngine.playTone(770, 'sine', 0.05, 0.25);
        const val = parseInt(chip.dataset.set, 10);
        this.setValue(val);
      });
    }

    open({ field, title, subtitle, value, isCount = false, min = 0, max = 600, onSave }) {
      this.currentField = field;
      this.currentValue = Number(value) || 0;
      this.isCountOnly = isCount;
      this.onSaveCallback = onSave;

      const titleEl = this.modalEl.querySelector('#picker-title');
      const subEl = this.modalEl.querySelector('#picker-subtitle');
      const slider = this.modalEl.querySelector('#picker-range');
      const chips = this.modalEl.querySelector('#picker-chips');
      const sub10 = this.modalEl.querySelector('#picker-step-sub-10');
      const sub5 = this.modalEl.querySelector('#picker-step-sub-5');
      const add5 = this.modalEl.querySelector('#picker-step-add-5');
      const add10 = this.modalEl.querySelector('#picker-step-add-10');

      titleEl.textContent = (title || 'EDIT VALUE').toUpperCase();
      subEl.textContent = subtitle || '';

      slider.min = min;
      slider.max = max;

      if (isCount) {
        chips.innerHTML = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map(n => 
          `<button class="chip-btn" data-set="${n}">${n}</button>`
        ).join('');
        sub10.style.display = 'none';
        sub5.style.display = 'none';
        add5.style.display = 'none';
        add10.style.display = 'none';
      } else {
        chips.innerHTML = [
          { label: '5s', v: 5 },
          { label: '10s', v: 10 },
          { label: '15s', v: 15 },
          { label: '20s', v: 20 },
          { label: '30s', v: 30 },
          { label: '45s', v: 45 },
          { label: '1m', v: 60 },
          { label: '1:30', v: 90 },
          { label: '2m', v: 120 },
          { label: '3m', v: 180 },
          { label: '5m', v: 300 }
        ].map(c => `<button class="chip-btn" data-set="${c.v}">${c.label}</button>`).join('');
        sub10.style.display = '';
        sub5.style.display = '';
        add5.style.display = '';
        add10.style.display = '';
      }

      this.setValue(this.currentValue);
      this.modalEl.classList.remove('hidden');
    }

    setValue(val) {
      const min = parseInt(this.modalEl.querySelector('#picker-range').min, 10) || 0;
      const max = parseInt(this.modalEl.querySelector('#picker-range').max, 10) || 600;
      this.currentValue = Math.max(min, Math.min(max, val));

      const display = this.modalEl.querySelector('#picker-display-val');
      const slider = this.modalEl.querySelector('#picker-range');
      slider.value = this.currentValue;

      if (this.isCountOnly) {
        display.textContent = `${this.currentValue}`;
      } else {
        const m = Math.floor(this.currentValue / 60);
        const s = this.currentValue % 60;
        display.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
      }
    }

    close() {
      this.modalEl.classList.add('hidden');
    }
  }

  const pickerModal = new PickerModal();

  /* =========================================================================
     4. INTERVAL RUNNER ENGINE (High Precision Delta Time + WakeLock)
     ========================================================================= */
  const PhaseType = {
    PREPARE: 'PREPARE',
    WORK: 'WORK',
    REST: 'REST',
    REST_BETWEEN_CYCLES: 'REST_BETWEEN_CYCLES',
    COOLDOWN: 'COOLDOWN',
    FINISHED: 'FINISHED'
  };

  class WorkoutTimerEngine {
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

      this.onTick = null;
      this.onPhaseChange = null;
      this.onStateChange = null;
      this.onComplete = null;
    }

    buildTimeline(w) {
      this.workout = w;
      const list = [];

      if (w.prepare > 0) {
        list.push({
          phase: PhaseType.PREPARE,
          title: 'PREPARE',
          subtitle: 'GET READY',
          duration: w.prepare,
          round: 1,
          totalRounds: w.rounds,
          cycle: 1,
          totalCycles: w.cycles
        });
      }

      const totalCycles = Math.max(1, w.cycles || 1);
      const totalRounds = Math.max(1, w.rounds || 1);

      for (let c = 1; c <= totalCycles; c++) {
        for (let r = 1; r <= totalRounds; r++) {
          if (w.work > 0) {
            list.push({
              phase: PhaseType.WORK,
              title: 'WORK',
              subtitle: `CYCLE ${c}/${totalCycles} • ROUND ${r}/${totalRounds}`,
              duration: w.work,
              round: r,
              totalRounds: totalRounds,
              cycle: c,
              totalCycles: totalCycles
            });
          }

          const isLastRoundOfCycle = (r === totalRounds);
          const isLastCycle = (c === totalCycles);

          if (!isLastRoundOfCycle) {
            if (w.rest > 0) {
              list.push({
                phase: PhaseType.REST,
                title: 'REST',
                subtitle: `RECOVERY BEFORE ROUND ${r + 1}`,
                duration: w.rest,
                round: r,
                totalRounds: totalRounds,
                cycle: c,
                totalCycles: totalCycles
              });
            }
          } else if (!isLastCycle) {
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
                totalCycles: totalCycles
              });
            }
          }
        }
      }

      if (w.cooldown > 0) {
        list.push({
          phase: PhaseType.COOLDOWN,
          title: 'COOLDOWN',
          subtitle: 'HEART RATE RECOVERY',
          duration: w.cooldown,
          round: totalRounds,
          totalRounds: totalRounds,
          cycle: totalCycles,
          totalCycles: totalCycles
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
        this.totalSecondsElapsed += this.stepSecondsRemaining;
        this.currentStepIdx++;
        this.setupCurrentStep();
      } else {
        this.finish();
      }
    }

    skipPrevious() {
      if (this.stepDuration - this.stepSecondsRemaining > 3 || this.currentStepIdx === 0) {
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

          if (newWholeSec !== prevWholeSec && newWholeSec > 0 && newWholeSec <= 3) {
            soundEngine.playCountdownBeep(newWholeSec);
            soundEngine.vibrate(50);
          }

          if (this.stepSecondsRemaining <= 0) {
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
          console.warn('WakeLock not supported/granted:', err);
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

  const workoutTimer = new WorkoutTimerEngine();

  /* =========================================================================
     5. PRECISION STOPWATCH ENGINE
     ========================================================================= */
  class PrecisionStopwatch {
    constructor(renderCallback) {
      this.renderCallback = renderCallback;
      this.startTime = 0;
      this.elapsedTime = 0;
      this.running = false;
      this.rafId = null;
      this.laps = [];
      this.lastLapTime = 0;
    }

    start() {
      if (this.running) return;
      this.running = true;
      soundEngine.init();
      this.startTime = performance.now() - this.elapsedTime;
      this.tick();
    }

    pause() {
      if (!this.running) return;
      this.running = false;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.elapsedTime = performance.now() - this.startTime;
      this.render();
    }

    toggle() {
      if (this.running) this.pause();
      else this.start();
    }

    reset() {
      this.pause();
      this.elapsedTime = 0;
      this.laps = [];
      this.lastLapTime = 0;
      this.render();
    }

    lap() {
      if (!this.running && this.elapsedTime === 0) return;
      const current = this.running ? (performance.now() - this.startTime) : this.elapsedTime;
      const lapDuration = current - this.lastLapTime;
      this.lastLapTime = current;
      
      this.laps.unshift({
        number: this.laps.length + 1,
        time: lapDuration,
        overall: current
      });
      soundEngine.playTone(800, 'sine', 0.05, 0.3);
      this.render();
    }

    tick() {
      if (!this.running) return;
      this.elapsedTime = performance.now() - this.startTime;
      this.render();
      this.rafId = requestAnimationFrame(() => this.tick());
    }

    render() {
      if (this.renderCallback) {
        this.renderCallback({
          elapsed: this.elapsedTime,
          running: this.running,
          laps: this.laps
        });
      }
    }

    static formatMs(ms) {
      const totalSecs = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSecs / 60);
      const seconds = totalSecs % 60;
      const millis = Math.floor((ms % 1000) / 10);
      return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${millis < 10 ? '0' : ''}${millis}`;
    }
  }

  /* =========================================================================
     6. MAIN APPLICATION COORDINATOR
     ========================================================================= */
  class WorkoutApp {
    constructor() {
      this.currentTab = 'tabata';
      this.activeFilter = 'all';
      this.stopwatch = null;

      this.boxingConfig = {
        roundTime: 180,
        restTime: 60,
        totalRounds: 12,
        warningTime: 10
      };

      this.initDOM();
      this.bindEvents();
      this.renderCurrentWorkout();
      this.renderWorkoutsList();
      this.initStopwatch();
    }

    initDOM() {
      this.dom = {
        headerTitle: document.getElementById('header-page-title'),
        btnCancel: document.getElementById('btn-header-cancel'),
        btnSave: document.getElementById('btn-header-save'),
        btnQuickRun: document.getElementById('btn-quick-run'),
        btnAddTimer: document.getElementById('btn-add-timer'),
        
        valPrepare: document.getElementById('val-prepare'),
        valWork: document.getElementById('val-work'),
        valRest: document.getElementById('val-rest'),
        valRounds: document.getElementById('val-rounds'),
        valCycles: document.getElementById('val-cycles'),
        descCycles: document.getElementById('desc-cycles'),
        valRestBC: document.getElementById('val-rest-bc'),
        valCooldown: document.getElementById('val-cooldown'),

        workoutCardsList: document.getElementById('workout-cards-list'),
        filterPills: document.getElementById('workout-filters'),

        runnerScreen: document.getElementById('runner-screen'),
        runnerClose: document.getElementById('btn-runner-close'),
        runnerReset: document.getElementById('btn-runner-reset'),
        runnerModeLabel: document.getElementById('runner-mode-label'),
        runnerTotalClock: document.getElementById('runner-total-clock'),
        
        runnerMainStage: document.getElementById('runner-main-stage'),
        runnerStageTitle: document.getElementById('runner-stage-title'),
        runnerStageDigits: document.getElementById('runner-stage-digits'),
        runnerStageSub: document.getElementById('runner-stage-sub'),

        runnerSubStage: document.getElementById('runner-sub-stage'),
        runnerSubTitle: document.getElementById('runner-sub-title'),
        runnerSubDigits: document.getElementById('runner-sub-digits'),

        runnerRoundsLeftNum: document.getElementById('runner-rounds-left-num'),
        btnRunnerPlay: document.getElementById('btn-runner-play'),
        runnerPlayIcon: document.getElementById('runner-play-icon'),
        runnerPlayLabel: document.getElementById('runner-play-label'),
        btnRunnerPrev: document.getElementById('btn-runner-prev'),
        btnRunnerNext: document.getElementById('btn-runner-next'),
        
        runnerCompleteModal: document.getElementById('runner-complete-modal'),
        compTotalTime: document.getElementById('comp-total-time'),
        compTotalRounds: document.getElementById('comp-total-rounds'),
        btnCompleteClose: document.getElementById('btn-complete-close'),

        navTabs: document.querySelectorAll('.nav-tab-btn'),
        tabPanes: document.querySelectorAll('.tab-pane'),

        btnStartBoxing: document.getElementById('btn-start-boxing-rounds'),
        valRoundTime: document.getElementById('val-r-roundtime'),
        valRestTime: document.getElementById('val-r-resttime'),
        valTotalRounds: document.getElementById('val-r-totalrounds'),
        valWarning: document.getElementById('val-r-warning'),

        swDisplay: document.getElementById('sw-display'),
        btnSwToggle: document.getElementById('btn-sw-toggle'),
        btnSwLap: document.getElementById('btn-sw-lap'),
        btnSwReset: document.getElementById('btn-sw-reset'),
        swLapsContainer: document.getElementById('sw-laps-container'),

        settingSound: document.getElementById('setting-sound'),
        settingVoice: document.getElementById('setting-voice'),
        settingVibrate: document.getElementById('setting-vibrate'),
        btnTestBeep: document.getElementById('btn-test-beep'),
        btnTestWork: document.getElementById('btn-test-work'),
        btnTestRest: document.getElementById('btn-test-rest')
      };
    }

    bindEvents() {
      // 1. Bottom Navigation
      this.dom.navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          const tabId = tab.getAttribute('data-tab');
          this.switchTab(tabId);
        });
      });

      // 2. Interval Row Clicks
      const intervalRows = {
        prepare: { title: 'Prepare Countdown', sub: 'COUNTDOWN BEFORE YOU START', isCount: false, min: 0, max: 120 },
        work: { title: 'Work Interval', sub: 'DO EXERCISES FOR THIS LONG', isCount: false, min: 1, max: 600 },
        rest: { title: 'Rest Interval', sub: 'REST FOR THIS LONG', isCount: false, min: 0, max: 300 },
        rounds: { title: 'Rounds', sub: 'ONE ROUND IS WORK + REST', isCount: true, min: 1, max: 99 },
        cycles: { title: 'Cycles', sub: 'NUMBER OF ROUND SETS', isCount: true, min: 1, max: 20 },
        restBetweenCycles: { title: 'Rest Between Cycles', sub: 'RECOVERY BETWEEN ROUND SETS', isCount: false, min: 0, max: 300 },
        cooldown: { title: 'Cooldown', sub: 'COOLDOWN AFTER WORKOUT', isCount: false, min: 0, max: 600 }
      };

      Object.keys(intervalRows).forEach(field => {
        const rowId = `row-${field === 'restBetweenCycles' ? 'rest-bc' : field}`;
        const row = document.getElementById(rowId);
        if (row) {
          row.addEventListener('click', () => {
            const config = intervalRows[field];
            const active = workoutManager.getActiveWorkout();
            pickerModal.open({
              field,
              title: config.title,
              subtitle: config.sub,
              value: active[field],
              isCount: config.isCount,
              min: config.min,
              max: config.max,
              onSave: (f, val) => {
                const patch = {};
                patch[f] = val;
                workoutManager.updateActiveWorkout(patch);
                this.renderCurrentWorkout();
                this.renderWorkoutsList();
              }
            });
          });
        }
      });

      // 3. Add New Timer Button
      if (this.dom.btnAddTimer) {
        this.dom.btnAddTimer.addEventListener('click', () => {
          const name = prompt('Enter routine name (e.g. "HIIT CORE BLAST"):', 'NEW INTERVAL TIMER');
          if (name && name.trim()) {
            workoutManager.createWorkout({
              name: name.trim().toUpperCase(),
              level: 'Custom',
              prepare: 10,
              work: 30,
              rest: 15,
              rounds: 6,
              cycles: 2,
              restBetweenCycles: 30,
              cooldown: 0,
              tag: 'Custom Workout'
            });
            this.renderCurrentWorkout();
            this.renderWorkoutsList();
          }
        });
      }

      // 4. Header Actions
      if (this.dom.btnCancel) {
        this.dom.btnCancel.addEventListener('click', () => {
          if (confirm('Reset active routine to default template?')) {
            workoutManager.setActiveWorkout('preset-int-1');
            this.renderCurrentWorkout();
            this.renderWorkoutsList();
          }
        });
      }

      if (this.dom.btnSave) {
        this.dom.btnSave.addEventListener('click', () => {
          const active = workoutManager.getActiveWorkout();
          soundEngine.playTone(1000, 'sine', 0.1, 0.4);
          alert(`Routine "${active.name}" saved successfully!`);
        });
      }

      if (this.dom.btnQuickRun) {
        this.dom.btnQuickRun.addEventListener('click', () => {
          this.launchWorkoutRunner();
        });
      }

      // 5. Workout Filter Pills
      if (this.dom.filterPills) {
        this.dom.filterPills.addEventListener('click', (e) => {
          const pill = e.target.closest('.filter-pill');
          if (!pill) return;
          this.dom.filterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeFilter = pill.dataset.filter;
          this.renderWorkoutsList();
        });
      }

      // 6. Runner Controls
      if (this.dom.btnRunnerPlay) {
        this.dom.btnRunnerPlay.addEventListener('click', () => {
          workoutTimer.togglePlayPause();
        });
      }

      if (this.dom.runnerReset) {
        this.dom.runnerReset.addEventListener('click', () => {
          if (confirm('Restart this workout?')) {
            workoutTimer.reset();
          }
        });
      }

      if (this.dom.btnRunnerPrev) {
        this.dom.btnRunnerPrev.addEventListener('click', () => {
          workoutTimer.skipPrevious();
        });
      }

      if (this.dom.btnRunnerNext) {
        this.dom.btnRunnerNext.addEventListener('click', () => {
          workoutTimer.skipNext();
        });
      }

      if (this.dom.runnerClose) {
        this.dom.runnerClose.addEventListener('click', () => {
          workoutTimer.pause();
          this.dom.runnerScreen.classList.remove('active');
        });
      }

      if (this.dom.btnCompleteClose) {
        this.dom.btnCompleteClose.addEventListener('click', () => {
          this.dom.runnerCompleteModal.classList.add('hidden');
          this.dom.runnerScreen.classList.remove('active');
        });
      }

      // 7. Timer Engine Handlers
      workoutTimer.onTick = (data) => this.handleTimerTick(data);
      workoutTimer.onPhaseChange = (curr, next) => this.handlePhaseChange(curr, next);
      workoutTimer.onStateChange = (state) => this.handleStateChange(state);
      workoutTimer.onComplete = () => this.handleWorkoutComplete();

      // 8. Boxing Events
      this.bindBoxingEvents();

      // 9. Settings
      if (this.dom.settingSound) {
        this.dom.settingSound.addEventListener('change', (e) => {
          soundEngine.soundEnabled = e.target.checked;
        });
      }
      if (this.dom.settingVoice) {
        this.dom.settingVoice.addEventListener('change', (e) => {
          soundEngine.voiceEnabled = e.target.checked;
        });
      }

      if (this.dom.btnTestBeep) this.dom.btnTestBeep.addEventListener('click', () => soundEngine.playCountdownBeep(3));
      if (this.dom.btnTestWork) this.dom.btnTestWork.addEventListener('click', () => soundEngine.playWorkChime());
      if (this.dom.btnTestRest) this.dom.btnTestRest.addEventListener('click', () => soundEngine.playRestChime());
    }

    switchTab(tabId) {
      this.currentTab = tabId;
      this.dom.navTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
      this.dom.tabPanes.forEach(p => p.classList.toggle('active', p.id === `pane-${tabId}`));

      const titles = {
        tabata: 'TABATA',
        rounds: 'ROUNDS',
        stopwatch: 'STOPWATCH',
        more: 'MORE / SETTINGS'
      };
      if (this.dom.headerTitle) {
        this.dom.headerTitle.textContent = titles[tabId] || 'WORKOUT';
      }
    }

    renderCurrentWorkout() {
      const w = workoutManager.getActiveWorkout();
      if (!w) return;

      if (this.dom.valPrepare) this.dom.valPrepare.textContent = WorkoutManager.formatTime(w.prepare);
      if (this.dom.valWork) this.dom.valWork.textContent = WorkoutManager.formatTime(w.work);
      if (this.dom.valRest) this.dom.valRest.textContent = WorkoutManager.formatTime(w.rest);
      if (this.dom.valRounds) this.dom.valRounds.textContent = w.rounds;
      if (this.dom.valCycles) this.dom.valCycles.textContent = w.cycles;
      if (this.dom.descCycles) this.dom.descCycles.textContent = `ONE CYCLE IS ${w.rounds} ROUNDS`;
      if (this.dom.valRestBC) this.dom.valRestBC.textContent = WorkoutManager.formatTime(w.restBetweenCycles);
      if (this.dom.valCooldown) this.dom.valCooldown.textContent = WorkoutManager.formatTime(w.cooldown);
    }

    renderWorkoutsList() {
      const active = workoutManager.getActiveWorkout();
      const list = workoutManager.workouts.filter(w => {
        if (this.activeFilter === 'all') return true;
        return (w.level || '').toLowerCase() === this.activeFilter.toLowerCase();
      });

      if (!this.dom.workoutCardsList) return;

      this.dom.workoutCardsList.innerHTML = list.map(w => {
        const isSelected = (w.id === active.id);
        const totalTime = WorkoutManager.formatFullTime(WorkoutManager.calculateTotalSeconds(w));
        const badgeClass = `badge-${(w.level || 'custom').toLowerCase()}`;

        return `
          <div class="workout-card ${isSelected ? 'active-selected' : ''}" data-id="${w.id}">
            <div class="workout-card-header">
              <h4 class="workout-card-title">${w.name}</h4>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="workout-badge ${badgeClass}">${w.level || 'CUSTOM'}</span>
                <div class="selection-check">
                  <svg style="width:16px; height:16px; fill:currentColor;" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>
            </div>

            <div class="workout-stats-grid">
              <div class="stat-item">
                <span class="stat-label">PREPARE</span>
                <span class="stat-val">${WorkoutManager.formatTime(w.prepare)}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">ROUNDS</span>
                <span class="stat-val">${w.rounds}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">WORK</span>
                <span class="stat-val">${WorkoutManager.formatTime(w.work)}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">CYCLES</span>
                <span class="stat-val">${w.cycles}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">REST</span>
                <span class="stat-val">${WorkoutManager.formatTime(w.rest)}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">REST BC</span>
                <span class="stat-val">${WorkoutManager.formatTime(w.restBetweenCycles)}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">COOLDOWN</span>
                <span class="stat-val">${WorkoutManager.formatTime(w.cooldown)}</span>
              </div>
            </div>

            <div class="workout-card-footer">
              <span class="total-duration-tag">TOTAL TIME: ${totalTime}</span>
              <div class="card-actions">
                <button class="btn-card-action btn-duplicate" data-id="${w.id}" title="Duplicate routine">COPY</button>
                ${w.id.startsWith('custom-') ? `<button class="btn-card-action btn-delete" data-id="${w.id}" title="Delete routine">DELETE</button>` : ''}
                <button class="btn-card-action btn-start-card" style="color:var(--color-work); font-weight:800;" data-id="${w.id}">START ›</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      this.dom.workoutCardsList.querySelectorAll('.workout-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const id = card.dataset.id;
          if (e.target.closest('.btn-duplicate')) {
            workoutManager.duplicateWorkout(id);
            this.renderCurrentWorkout();
            this.renderWorkoutsList();
            return;
          }
          if (e.target.closest('.btn-delete')) {
            if (confirm('Delete this custom routine?')) {
              workoutManager.deleteWorkout(id);
              this.renderCurrentWorkout();
              this.renderWorkoutsList();
            }
            return;
          }

          workoutManager.setActiveWorkout(id);
          this.renderCurrentWorkout();
          this.renderWorkoutsList();

          if (e.target.closest('.btn-start-card')) {
            this.launchWorkoutRunner();
          }
        });
      });
    }

    launchWorkoutRunner(customWorkout = null) {
      const workout = customWorkout || workoutManager.getActiveWorkout();
      workoutTimer.buildTimeline(workout);

      if (this.dom.runnerModeLabel) {
        this.dom.runnerModeLabel.textContent = workout.name || 'ROUNDS';
      }
      if (this.dom.runnerCompleteModal) {
        this.dom.runnerCompleteModal.classList.add('hidden');
      }
      if (this.dom.runnerScreen) {
        this.dom.runnerScreen.classList.add('active');
      }

      workoutTimer.start();
    }

    handleTimerTick(data) {
      const { stepSecondsRemaining, totalSecondsRemaining, roundsLeft, nextStep } = data;

      if (this.dom.runnerTotalClock) {
        this.dom.runnerTotalClock.textContent = WorkoutManager.formatFullTime(totalSecondsRemaining);
      }
      if (this.dom.runnerStageDigits) {
        this.dom.runnerStageDigits.textContent = WorkoutManager.formatFullTime(stepSecondsRemaining);
      }
      if (this.dom.runnerRoundsLeftNum) {
        this.dom.runnerRoundsLeftNum.textContent = roundsLeft;
      }
      if (this.dom.runnerSubDigits) {
        if (nextStep) {
          this.dom.runnerSubDigits.textContent = WorkoutManager.formatFullTime(nextStep.duration);
        } else {
          this.dom.runnerSubDigits.textContent = '00:00';
        }
      }
    }

    handlePhaseChange(curr, next) {
      if (!curr) return;

      if (this.dom.runnerStageTitle) this.dom.runnerStageTitle.textContent = curr.title;
      if (this.dom.runnerStageSub) this.dom.runnerStageSub.textContent = curr.subtitle;

      const themeMap = {
        [PhaseType.WORK]: 'theme-work',
        [PhaseType.REST]: 'theme-rest',
        [PhaseType.PREPARE]: 'theme-prepare',
        [PhaseType.REST_BETWEEN_CYCLES]: 'theme-rest-bc',
        [PhaseType.COOLDOWN]: 'theme-cooldown'
      };

      if (this.dom.runnerMainStage) {
        this.dom.runnerMainStage.className = `runner-main-stage ${themeMap[curr.phase] || 'theme-work'}`;
      }

      if (next) {
        if (this.dom.runnerSubTitle) this.dom.runnerSubTitle.textContent = next.title;
        if (this.dom.runnerSubStage) {
          this.dom.runnerSubStage.className = `runner-sub-stage ${themeMap[next.phase] || 'theme-rest'}`;
          this.dom.runnerSubStage.style.display = 'flex';
        }
        if (this.dom.runnerSubDigits) {
          this.dom.runnerSubDigits.textContent = WorkoutManager.formatFullTime(next.duration);
        }
      } else {
        if (this.dom.runnerSubTitle) this.dom.runnerSubTitle.textContent = 'FINAL INTERVAL';
        if (this.dom.runnerSubDigits) this.dom.runnerSubDigits.textContent = '00:00';
      }
    }

    handleStateChange(status) {
      if (status === 'running') {
        if (this.dom.btnRunnerPlay) this.dom.btnRunnerPlay.classList.add('playing');
        if (this.dom.runnerPlayLabel) this.dom.runnerPlayLabel.textContent = 'PAUSE';
        if (this.dom.runnerPlayIcon) this.dom.runnerPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
      } else {
        if (this.dom.btnRunnerPlay) this.dom.btnRunnerPlay.classList.remove('playing');
        if (this.dom.runnerPlayLabel) this.dom.runnerPlayLabel.textContent = 'START';
        if (this.dom.runnerPlayIcon) this.dom.runnerPlayIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
      }
    }

    handleWorkoutComplete() {
      const totalSecs = workoutTimer.totalWorkoutDuration;
      if (this.dom.compTotalTime) this.dom.compTotalTime.textContent = WorkoutManager.formatFullTime(totalSecs);
      if (this.dom.compTotalRounds) this.dom.compTotalRounds.textContent = (workoutTimer.workout?.rounds || 1) * (workoutTimer.workout?.cycles || 1);
      if (this.dom.runnerCompleteModal) this.dom.runnerCompleteModal.classList.remove('hidden');
    }

    bindBoxingEvents() {
      const editRoundTime = document.getElementById('rounds-edit-roundtime');
      if (editRoundTime) {
        editRoundTime.addEventListener('click', () => {
          pickerModal.open({
            field: 'roundTime',
            title: 'Round Time',
            subtitle: 'DURATION OF EACH ROUND',
            value: this.boxingConfig.roundTime,
            min: 10,
            max: 600,
            onSave: (_, val) => {
              this.boxingConfig.roundTime = val;
              if (this.dom.valRoundTime) this.dom.valRoundTime.textContent = WorkoutManager.formatFullTime(val);
            }
          });
        });
      }

      const editRestTime = document.getElementById('rounds-edit-resttime');
      if (editRestTime) {
        editRestTime.addEventListener('click', () => {
          pickerModal.open({
            field: 'restTime',
            title: 'Corner Rest Time',
            subtitle: 'RECOVERY DURATION BETWEEN ROUNDS',
            value: this.boxingConfig.restTime,
            min: 5,
            max: 300,
            onSave: (_, val) => {
              this.boxingConfig.restTime = val;
              if (this.dom.valRestTime) this.dom.valRestTime.textContent = WorkoutManager.formatFullTime(val);
            }
          });
        });
      }

      const editTotalRounds = document.getElementById('rounds-edit-totalrounds');
      if (editTotalRounds) {
        editTotalRounds.addEventListener('click', () => {
          pickerModal.open({
            field: 'totalRounds',
            title: 'Total Rounds',
            subtitle: 'CHAMPIONSHIP / TRAINING ROUNDS',
            value: this.boxingConfig.totalRounds,
            isCount: true,
            min: 1,
            max: 20,
            onSave: (_, val) => {
              this.boxingConfig.totalRounds = val;
              if (this.dom.valTotalRounds) this.dom.valTotalRounds.textContent = val;
            }
          });
        });
      }

      if (this.dom.btnStartBoxing) {
        this.dom.btnStartBoxing.addEventListener('click', () => {
          const boxingWorkout = {
            name: 'BOXING CHAMPIONSHIP ROUNDS',
            prepare: 10,
            work: this.boxingConfig.roundTime,
            rest: this.boxingConfig.restTime,
            rounds: this.boxingConfig.totalRounds,
            cycles: 1,
            restBetweenCycles: 0,
            cooldown: 30
          };
          this.launchWorkoutRunner(boxingWorkout);
        });
      }
    }

    initStopwatch() {
      this.stopwatch = new PrecisionStopwatch((state) => {
        if (this.dom.swDisplay) this.dom.swDisplay.textContent = PrecisionStopwatch.formatMs(state.elapsed);
        if (this.dom.btnSwToggle) {
          if (state.running) {
            this.dom.btnSwToggle.textContent = 'STOP';
            this.dom.btnSwToggle.className = 'btn-sw-circle btn-sw-stop';
          } else {
            this.dom.btnSwToggle.textContent = 'START';
            this.dom.btnSwToggle.className = 'btn-sw-circle btn-sw-start';
          }
        }

        if (this.dom.swLapsContainer) {
          if (state.laps.length === 0) {
            this.dom.swLapsContainer.innerHTML = '';
          } else {
            this.dom.swLapsContainer.innerHTML = state.laps.map(lap => `
              <div class="lap-row">
                <span>LAP ${lap.number < 10 ? '0' : ''}${lap.number}</span>
                <span style="color:#fff; font-family:var(--font-athletic); font-weight:800;">+${PrecisionStopwatch.formatMs(lap.time)}</span>
                <span style="font-variant-numeric:tabular-nums;">${PrecisionStopwatch.formatMs(lap.overall)}</span>
              </div>
            `).join('');
          }
        }
      });

      if (this.dom.btnSwToggle) this.dom.btnSwToggle.addEventListener('click', () => this.stopwatch.toggle());
      if (this.dom.btnSwLap) this.dom.btnSwLap.addEventListener('click', () => this.stopwatch.lap());
      if (this.dom.btnSwReset) this.dom.btnSwReset.addEventListener('click', () => this.stopwatch.reset());
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.app = new WorkoutApp();
    });
  } else {
    window.app = new WorkoutApp();
  }

})();
