// Interactive Modal Value Picker (Seconds, Minutes, Counts)
import { soundEngine } from './audio.js';

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
    // Create modal element if not present
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

            <!-- Time / Stepper Controls -->
            <div class="picker-adjust-row">
              <button class="stepper-btn" id="picker-step-sub-10" data-delta="-10">-10s</button>
              <button class="stepper-btn" id="picker-step-sub-5" data-delta="-5">-5s</button>
              <button class="stepper-btn big-stepper" id="picker-step-sub-1" data-delta="-1">-1</button>
              <button class="stepper-btn big-stepper" id="picker-step-add-1" data-delta="1">+1</button>
              <button class="stepper-btn" id="picker-step-add-5" data-delta="5">+5s</button>
              <button class="stepper-btn" id="picker-step-add-10" data-delta="10">+10s</button>
            </div>

            <!-- Quick Preset Chips -->
            <div class="picker-chips" id="picker-chips">
              <button class="chip-btn" data-set="5">5s</button>
              <button class="chip-btn" data-set="10">10s</button>
              <button class="chip-btn" data-set="15">15s</button>
              <button class="chip-btn" data-set="20">20s</button>
              <button class="chip-btn" data-set="30">30s</button>
              <button class="chip-btn" data-set="45">45s</button>
              <button class="chip-btn" data-set="60">1m</button>
              <button class="chip-btn" data-set="120">2m</button>
              <button class="chip-btn" data-set="180">3m</button>
              <button class="chip-btn" data-set="300">5m</button>
            </div>

            <!-- Slider -->
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

    // Delta buttons
    this.modalEl.querySelectorAll('.stepper-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        soundEngine.playTone(660, 'sine', 0.04, 0.2);
        const delta = parseInt(btn.dataset.delta, 10);
        this.setValue(this.currentValue + delta);
      });
    });

    // Chips
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
    document.body.classList.add('modal-open');
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
    document.body.classList.remove('modal-open');
  }
}

export const pickerModal = new PickerModal();
