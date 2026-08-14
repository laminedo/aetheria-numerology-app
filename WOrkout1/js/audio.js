// Audio Engine using Web Audio API and SpeechSynthesis for zero-lag athletic sound effects
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
    this.volume = 0.8;
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

  // Generate tone using oscillator
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

  // 3-2-1 Short Beeps
  playCountdownBeep(num) {
    this.playTone(880, 'sine', 0.12, 0.6); // High crisp A5
    if (this.voiceEnabled && num) {
      this.speak(String(num), 1.2);
    }
  }

  // Work Started: High energizing double whistle / chime
  playWorkChime() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Two high burst tones
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

  // Rest Phase: Low relaxing chime
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

  // Boxing warning bell / clap (10s left)
  playWarningBell() {
    this.playTone(600, 'square', 0.08, 0.4);
    setTimeout(() => this.playTone(600, 'square', 0.08, 0.4), 120);
    setTimeout(() => this.playTone(600, 'square', 0.08, 0.4), 240);
  }

  // Complete Fanfare
  playCompleteFanfare() {
    if (!this.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.3, 0.8);
      }, i * 160);
    });

    if (this.voiceEnabled) {
      setTimeout(() => this.speak('Workout completed! Outstanding job!'), 700);
    }
  }

  speak(text, rate = 1.1) {
    if (!this.voiceEnabled || !this.synth) return;
    try {
      this.synth.cancel(); // clear previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = this.volume;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }

  // Haptic feedback (Vibration on supported mobile browsers)
  vibrate(ms = 60) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
  }
}

export const soundEngine = new SoundEngine();
