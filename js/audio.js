/**
 * AETHERIA - Solfeggio Sound Healing & Harmonic Tone Synthesizer
 * Built with native Web Audio API. Zero dependencies, pure harmonic sine resonance.
 */

class SolfeggioSynthesizer {
  constructor() {
    this.ctx = null;
    this.oscMain = null;
    this.oscHarmonic = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.currentFreq = 432;
    this.volume = 0.4;
    this.timerId = null;
    this.listeners = [];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  play(frequency, durationMinutes = 0) {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isPlaying) {
      this.stop();
    }

    this.currentFreq = frequency;
    const now = this.ctx.currentTime;

    // Master Gain with Soft Attack Envelope
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.0001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(this.volume, now + 1.2);
    this.gainNode.connect(this.ctx.destination);

    // Primary Pure Sine Oscillator
    this.oscMain = this.ctx.createOscillator();
    this.oscMain.type = "sine";
    this.oscMain.frequency.setValueAtTime(frequency, now);
    this.oscMain.connect(this.gainNode);
    this.oscMain.start(now);

    // Subtle 2nd Harmonic Overtone (octave + fifth subtle shimmer at 10% volume)
    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(this.volume * 0.12, now);
    harmonicGain.connect(this.gainNode);

    this.oscHarmonic = this.ctx.createOscillator();
    this.oscHarmonic.type = "sine";
    this.oscHarmonic.frequency.setValueAtTime(frequency * 2, now);
    this.oscHarmonic.connect(harmonicGain);
    this.oscHarmonic.start(now);

    this.isPlaying = true;
    this.notifyStateChange();

    // Timer Auto-shutoff
    if (this.timerId) clearTimeout(this.timerId);
    if (durationMinutes > 0) {
      this.timerId = setTimeout(() => {
        this.stop();
      }, durationMinutes * 60 * 1000);
    }

    return true;
  }

  stop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) {
      this.isPlaying = false;
      this.notifyStateChange();
      return;
    }

    const now = this.ctx.currentTime;
    // Smooth Fade-Out Release Envelope
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      try {
        if (this.oscMain) {
          this.oscMain.stop();
          this.oscMain.disconnect();
          this.oscMain = null;
        }
        if (this.oscHarmonic) {
          this.oscHarmonic.stop();
          this.oscHarmonic.disconnect();
          this.oscHarmonic = null;
        }
      } catch (e) {}
      this.isPlaying = false;
      this.notifyStateChange();
    }, 850);

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.gainNode && this.isPlaying && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  onStateChange(cb) {
    this.listeners.push(cb);
  }

  notifyStateChange() {
    this.listeners.forEach(cb => cb({
      isPlaying: this.isPlaying,
      frequency: this.currentFreq
    }));
  }
}

export const audioSynthesizer = new SolfeggioSynthesizer();
