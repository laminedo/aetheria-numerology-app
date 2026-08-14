/**
 * AETHERIA - Lo Shu Magic Square, Arrows of Destiny, Planes of Expression,
 * Bridge Numbers & Three Life Epochs Calculation Engine.
 */

import { reduceNumber, sumDigits, analyzeNameLetters } from "./numerology.js";

/**
 * Lo Shu Grid Definition (Classical 3x3 Hermetic/Chinese Magic Square)
 * Row 1: 4, 9, 2 (Top / Mind)
 * Row 2: 3, 5, 7 (Middle / Soul)
 * Row 3: 8, 1, 6 (Bottom / Body)
 */
export const LOSHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

/**
 * 8 Arrows of Destiny Definitions (Strengths and Losses)
 */
export const ARROWS_DEFINITIONS = [
  {
    id: "thought",
    numbers: [4, 9, 2],
    name: "Arrow of Intellect & Clear Vision (4-9-2)",
    strengthTitle: "The Master Intellect",
    strengthDesc: "Exceptional analytical memory, strategic clarity, and intellectual discrimination.",
    lossTitle: "Arrow of Poor Memory / Confusion",
    lossDesc: "Tendency toward mental fatigue or absent-mindedness; benefits from structured note-taking."
  },
  {
    id: "spirituality",
    numbers: [3, 5, 7],
    name: "Arrow of Spirituality & Serenity (3-5-7)",
    strengthTitle: "The Mystical Conduit",
    strengthDesc: "Deep metaphysical insight, philosophical resilience, and profound spiritual peace in crises.",
    lossTitle: "Arrow of Skepticism / Insecurity",
    lossDesc: "Struggles with trusting life's unfolding; needs to anchor emotional certainty from within."
  },
  {
    id: "practicality",
    numbers: [8, 1, 6],
    name: "Arrow of Practical Action (8-1-6)",
    strengthTitle: "The Master Practitioner",
    strengthDesc: "Hands-on dexterity, commercial realism, and manifesting high ideas into concrete physical results.",
    lossTitle: "Arrow of Disorganization / Procrastination",
    lossDesc: "Impractical idealism or difficulty completing tedious tasks; requires strict daily schedules."
  },
  {
    id: "planning",
    numbers: [4, 3, 8],
    name: "Arrow of Strategic Planning (4-3-8)",
    strengthTitle: "The Grand Strategist",
    strengthDesc: "Methodical foresight, structural logistics, and planning complex multi-year campaigns.",
    lossTitle: "Arrow of Short-Sightedness",
    lossDesc: "Impulsive actions without long-term plans; benefits from consulting mentors before large moves."
  },
  {
    id: "willpower",
    numbers: [9, 5, 1],
    name: "Arrow of Willpower & Determination (9-5-1)",
    strengthTitle: "The Unstoppable Will",
    strengthDesc: "Unshakeable perseverance, sovereign grit, and the relentless courage to overcome monumental odds.",
    lossTitle: "Arrow of Hesitation / Defeatism",
    lossDesc: "Giving up right before breakthroughs occur; requires cultivating daily self-belief."
  },
  {
    id: "action",
    numbers: [2, 7, 6],
    name: "Arrow of Activity & Dynamism (2-7-6)",
    strengthTitle: "The Dynamic Catalyst",
    strengthDesc: "High bodily vitality, swift reflexes, athletic or artistic expression, and boundless energy.",
    lossTitle: "Arrow of Lethargy / Hesitancy",
    lossDesc: "Physical sluggishness or overthinking before moving; regular morning movement is essential."
  },
  {
    id: "balance",
    numbers: [4, 5, 6],
    name: "Arrow of Emotional Balance (4-5-6)",
    strengthTitle: "The Compassionate Harmonizer",
    strengthDesc: "Supreme psychological equilibrium, empathetic wisdom, and bringing serenity to disordered environments.",
    lossTitle: "Arrow of Hypersensitivity / Turmoil",
    lossDesc: "Vulnerability to emotional shocks and emotional reactivity; benefits from daily grounding rituals."
  },
  {
    id: "stability",
    numbers: [2, 5, 8],
    name: "Arrow of Memory & Sovereign Stability (2-5-8)",
    strengthTitle: "The Pillar of Equilibrium",
    strengthDesc: "Photographic nuance, emotional fortitude, and keeping steady composure during severe crises.",
    lossTitle: "Arrow of Emotional Volatility",
    lossDesc: "Feeling ungrounded during unexpected change; benefits from physical earth contact."
  }
];

/**
 * Calculate Lo Shu Grid & Detect Arrows
 */
export function calculateLoShuGrid(birthDateStr) {
  // Extract all digits from birth date (e.g. 1990-07-15 -> [1, 9, 9, 0, 0, 7, 1, 5])
  const digits = birthDateStr.replace(/\D/g, "").split("").map(Number).filter(n => n > 0);
  
  const digitCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(d => {
    digitCounts[d] = (digitCounts[d] || 0) + 1;
  });

  const arrowsPresent = [];
  const arrowsMissing = [];

  ARROWS_DEFINITIONS.forEach(arrow => {
    const allPresent = arrow.numbers.every(num => digitCounts[num] > 0);
    const allMissing = arrow.numbers.every(num => digitCounts[num] === 0);

    if (allPresent) {
      arrowsPresent.push({
        ...arrow,
        type: "strength"
      });
    } else if (allMissing) {
      arrowsMissing.push({
        ...arrow,
        type: "loss"
      });
    }
  });

  // Isolated numbers or planes
  const mentalPlaneCount = digitCounts[4] + digitCounts[9] + digitCounts[2];
  const emotionalPlaneCount = digitCounts[3] + digitCounts[5] + digitCounts[7];
  const physicalPlaneCount = digitCounts[8] + digitCounts[1] + digitCounts[6];

  return {
    digits,
    digitCounts,
    arrowsPresent,
    arrowsMissing,
    planes: {
      mental: mentalPlaneCount,
      emotional: emotionalPlaneCount,
      physical: physicalPlaneCount
    }
  };
}

/**
 * Calculate Planes of Expression from Name Letters
 * Evaluates Mental, Physical, Emotional, and Intuitive distribution
 */
export function calculatePlanesOfExpression(name, system = "pythagorean") {
  const analysis = analyzeNameLetters(name, system);
  
  // Categorization of letters based on classical numerology planes:
  // Mental: A, H, J, N, P, S (1, 8 values)
  // Physical: D, E, M, W (4, 5 values)
  // Emotional: B, I, O, R, Z (2, 3, 6, 9 values)
  // Intuitive: C, F, G, K, L, T, U, V, X, Y (3, 6, 7, 2 values)

  const planes = {
    Mental: { count: 0, letters: [] },
    Physical: { count: 0, letters: [] },
    Emotional: { count: 0, letters: [] },
    Intuitive: { count: 0, letters: [] }
  };

  const mentalLetters = ["a", "h", "j", "n", "p", "s"];
  const physicalLetters = ["d", "e", "m", "w"];
  const emotionalLetters = ["b", "i", "o", "r", "z"];
  const intuitiveLetters = ["c", "f", "g", "k", "l", "t", "u", "v", "x", "y"];

  analysis.lettersData.forEach(l => {
    const ch = l.lower;
    if (mentalLetters.includes(ch)) {
      planes.Mental.count++;
      planes.Mental.letters.push(l.char);
    } else if (physicalLetters.includes(ch)) {
      planes.Physical.count++;
      planes.Physical.letters.push(l.char);
    } else if (emotionalLetters.includes(ch)) {
      planes.Emotional.count++;
      planes.Emotional.letters.push(l.char);
    } else if (intuitiveLetters.includes(ch)) {
      planes.Intuitive.count++;
      planes.Intuitive.letters.push(l.char);
    } else {
      planes.Mental.count++;
      planes.Mental.letters.push(l.char);
    }
  });

  const total = analysis.lettersData.length || 1;
  const percentages = {
    Mental: Math.round((planes.Mental.count / total) * 100),
    Physical: Math.round((planes.Physical.count / total) * 100),
    Emotional: Math.round((planes.Emotional.count / total) * 100),
    Intuitive: Math.round((planes.Intuitive.count / total) * 100)
  };

  // Subconscious Self Number: 9 - number of missing karmic lesson numbers
  const missingCount = Object.values(analysis.letterCounts).filter(c => c === 0).length;
  const subconsciousSelf = 9 - missingCount;

  return {
    planes,
    percentages,
    subconsciousSelf,
    missingCount
  };
}

/**
 * Calculate Bridge Numbers (Friction Resolvers)
 */
export function calculateBridgeNumbers(lifePathVal, destinyVal, soulUrgeVal, personalityVal) {
  const lpRoot = lifePathVal > 9 ? sumDigits(lifePathVal) : lifePathVal;
  const destRoot = destinyVal > 9 ? sumDigits(destinyVal) : destinyVal;
  const suRoot = soulUrgeVal > 9 ? sumDigits(soulUrgeVal) : soulUrgeVal;
  const persRoot = personalityVal > 9 ? sumDigits(personalityVal) : personalityVal;

  const lpDestBridge = Math.abs(lpRoot - destRoot);
  const suPersBridge = Math.abs(suRoot - persRoot);

  const bridgeDescriptions = {
    0: "Bridge 0 (Harmonic Alignment): Zero friction. Your core nature and outward expression are in natural effortless synchronization.",
    1: "Bridge 1 (Cultivate Sovereignty): Bridge the gap through independent decision-making and trusting your own authority over external validation.",
    2: "Bridge 2 (Cultivate Tact & Patience): Bridge through subtle diplomacy, emotional listening, and not forcing rapid confrontations.",
    3: "Bridge 3 (Cultivate Creative Expression): Bridge through authentic communication, artistic outlets, and joyful optimism.",
    4: "Bridge 4 (Cultivate Discipline & Method): Bridge by creating structured daily habits, financial order, and dependable follow-through.",
    5: "Bridge 5 (Cultivate Adaptability & Freedom): Bridge through progressive flexibility, willingness to change routines, and open-minded exploration.",
    6: "Bridge 6 (Cultivate Loving Responsibility): Bridge through compassionate service, domestic harmony, and setting healthy relational boundaries.",
    7: "Bridge 7 (Cultivate Spiritual Faith & Study): Bridge through contemplative quiet, analytical research, and trusting your inner intuitive sage.",
    8: "Bridge 8 (Cultivate Material Stewardship): Bridge through executive organization, ethical abundance, and balancing spiritual with physical wealth."
  };

  return {
    lpDestBridge: {
      value: lpDestBridge,
      title: `Life Path ↔ Destiny Bridge (${lpDestBridge})`,
      advice: bridgeDescriptions[lpDestBridge] || bridgeDescriptions[0]
    },
    suPersBridge: {
      value: suPersBridge,
      title: `Soul Urge ↔ Personality Bridge (${suPersBridge})`,
      advice: bridgeDescriptions[suPersBridge] || bridgeDescriptions[0]
    }
  };
}

/**
 * Calculate the Three Major Life Period Cycles (Epochs)
 */
export function calculateThreeLifePeriods(birthDateStr, lifePathVal) {
  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);

  const p1 = reduceNumber(month).value; // 1st Period: Month
  const p2 = reduceNumber(day).value;   // 2nd Period: Day
  const p3 = reduceNumber(year).value;  // 3rd Period: Year

  const lpRoot = lifePathVal > 9 ? sumDigits(lifePathVal) : lifePathVal;
  const endAge1 = 36 - lpRoot;
  const endAge2 = endAge1 + 27; // Spans 27 years (three 9-year cycles)

  return [
    {
      index: 1,
      title: "1st Period Cycle: The Formative Youth",
      number: p1,
      ageSpan: `Birth to Age ${endAge1}`,
      desc: "Shaped by parental, familial, and foundational educational environments."
    },
    {
      index: 2,
      title: "2nd Period Cycle: The Productive Adulthood",
      number: p2,
      ageSpan: `Ages ${endAge1 + 1} to ${endAge2}`,
      desc: "The primary career, relational, and self-actualization chapter of maximum worldly impact."
    },
    {
      index: 3,
      title: "3rd Period Cycle: The Culminating Harvest",
      number: p3,
      ageSpan: `Age ${endAge2 + 1} & Beyond`,
      desc: "The elderhood chapter of spiritual mastery, philosophical synthesis, and legacy."
    }
  ];
}
