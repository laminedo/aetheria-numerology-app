// Stopwatch & Dedicated Boxing/Circuit Rounds Timer Mode
import { soundEngine } from './audio.js';

export class PrecisionStopwatch {
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
