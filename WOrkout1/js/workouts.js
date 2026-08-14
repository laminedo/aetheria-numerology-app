// Workouts database, default presets (Beginner to Advanced), and storage management

export const DEFAULT_PRESETS = [
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

const STORAGE_KEY = 'aetheria_workouts_v1';
const ACTIVE_KEY = 'aetheria_active_workout_id';

export class WorkoutManager {
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
      console.warn('Failed to load workouts:', e);
    }
    // Default clone
    this.saveWorkouts(DEFAULT_PRESETS);
    return [...DEFAULT_PRESETS];
  }

  saveWorkouts(list = this.workouts) {
    this.workouts = list;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.workouts));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  getActiveWorkout() {
    const found = this.workouts.find(w => w.id === this.activeWorkoutId);
    if (found) return found;
    return this.workouts[0] || DEFAULT_PRESETS[0];
  }

  setActiveWorkout(id) {
    this.activeWorkoutId = id;
    localStorage.setItem(ACTIVE_KEY, id);
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
      localStorage.setItem(ACTIVE_KEY, this.activeWorkoutId);
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

export const workoutManager = new WorkoutManager();
