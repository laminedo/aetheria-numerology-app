/**
 * AETHERIA - Master Numerology Calculation Engine
 * Implements rigorous Pythagorean and Chaldean algorithms,
 * Master Number preservation (11, 22, 33), and Karmic Debt tracking (13, 14, 16, 19).
 */

// Pythagorean Letter Value Table (1-9)
export const PYTHAGOREAN_TABLE = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

// Chaldean Letter Value Table (1-8, no 9 in base alphabet)
export const CHALDEAN_TABLE = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

export const MASTER_NUMBERS = [11, 22, 33];
export const KARMIC_NUMBERS = [13, 14, 16, 19];

/**
 * Standard digit sum of a number
 */
export function sumDigits(num) {
  return String(Math.abs(num))
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
}

/**
 * Reduce a number to single digit or Master Number (11, 22, 33).
 * Captures all intermediate steps for step-by-step mathematical breakdowns.
 */
export function reduceNumber(num, preserveMaster = true) {
  let steps = [num];
  let current = num;
  let karmicFound = null;

  if (KARMIC_NUMBERS.includes(current)) {
    karmicFound = current;
  }

  while (current > 9) {
    if (preserveMaster && MASTER_NUMBERS.includes(current)) {
      break;
    }
    current = sumDigits(current);
    steps.push(current);
    if (!karmicFound && KARMIC_NUMBERS.includes(current)) {
      karmicFound = current;
    }
  }

  return {
    value: current,
    steps,
    rawInitial: num,
    karmicFound: karmicFound
  };
}

/**
 * Determine if a character is a vowel, consonant, or context-dependent 'Y'
 */
export function classifyLetter(char, prevChar = null, nextChar = null) {
  const c = char.toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];
  
  if (vowels.includes(c)) return "vowel";
  if (c === "y") {
    // Esoteric 'Y' rule: 'Y' is a vowel if there are no adjacent vowels in the syllable or word
    const isPrevVowel = prevChar && vowels.includes(prevChar.toLowerCase());
    const isNextVowel = nextChar && vowels.includes(nextChar.toLowerCase());
    if (!isPrevVowel && !isNextVowel) return "vowel";
    return "consonant";
  }
  if (/[a-z]/.test(c)) return "consonant";
  return "other";
}

/**
 * Letter-to-number breakdown for a name
 */
export function analyzeNameLetters(name, system = "pythagorean") {
  const table = system === "chaldean" ? CHALDEAN_TABLE : PYTHAGOREAN_TABLE;
  const words = name.trim().split(/\s+/).filter(Boolean);
  
  let lettersData = [];
  let totalSum = 0;
  let vowelSum = 0;
  let consonantSum = 0;
  let letterCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  words.forEach((word, wIdx) => {
    const chars = word.split("");
    chars.forEach((ch, cIdx) => {
      const lower = ch.toLowerCase();
      const val = table[lower];
      if (val !== undefined) {
        const prev = cIdx > 0 ? chars[cIdx - 1] : null;
        const next = cIdx < chars.length - 1 ? chars[cIdx + 1] : null;
        const type = classifyLetter(lower, prev, next);

        totalSum += val;
        letterCounts[val] = (letterCounts[val] || 0) + 1;

        if (type === "vowel") {
          vowelSum += val;
        } else if (type === "consonant") {
          consonantSum += val;
        }

        lettersData.push({
          char: ch,
          lower,
          val,
          type,
          wordIndex: wIdx,
          word
        });
      }
    });
  });

  return {
    lettersData,
    totalSum,
    vowelSum,
    consonantSum,
    letterCounts,
    words
  };
}

/**
 * Flexible date parser that accepts YYYY-MM-DD, MM/DD/YYYY, MM-DD-YYYY, or textual dates like "July 15, 1990"
 */
export function parseFlexibleDate(dateStr) {
  if (!dateStr) return { year: 1990, month: 7, day: 15, iso: "1990-07-15" };
  const s = String(dateStr).trim();

  // 1. YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD
  let match = s.match(/^(\d{4})[-\/\.](\d{1,2})[-\/\.](\d{1,2})$/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = Math.min(12, Math.max(1, parseInt(match[2], 10)));
    const day = Math.min(31, Math.max(1, parseInt(match[3], 10)));
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { year, month, day, iso };
  }

  // 2. MM/DD/YYYY, MM-DD-YYYY, MM.DD.YYYY
  match = s.match(/^(\d{1,2})[-\/\.](\d{1,2})[-\/\.](\d{4})$/);
  if (match) {
    const month = Math.min(12, Math.max(1, parseInt(match[1], 10)));
    const day = Math.min(31, Math.max(1, parseInt(match[2], 10)));
    const year = parseInt(match[3], 10);
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { year, month, day, iso };
  }

  // 3. Named textual date e.g. "January 5, 1974" or "July 15 1990"
  const parsedTs = Date.parse(s);
  if (!isNaN(parsedTs)) {
    const dt = new Date(parsedTs);
    const year = dt.getUTCFullYear();
    const month = dt.getUTCMonth() + 1;
    const day = dt.getUTCDate();
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { year, month, day, iso };
  }

  // 4. Fallback: extract digits
  const digits = s.match(/\d+/g);
  if (digits && digits.length >= 3) {
    let yearStr = digits.find(d => d.length === 4);
    if (!yearStr) yearStr = digits[2];
    const rem = digits.filter((_, i) => digits[i] !== yearStr);
    const month = Math.min(12, Math.max(1, parseInt(rem[0] || "1", 10)));
    const day = Math.min(31, Math.max(1, parseInt(rem[1] || "15", 10)));
    const year = parseInt(yearStr || "1990", 10);
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { year, month, day, iso };
  }

  return { year: 1990, month: 7, day: 15, iso: "1990-07-15" };
}

/**
 * Calculate Life Path Number with full reduction path
 */
export function calculateLifePath(birthDateStr) {
  const { year, month, day } = parseFlexibleDate(birthDateStr);

  // Method 1: Component reduction (standard esoteric Pythagorean method)
  const monthRed = reduceNumber(month);
  const dayRed = reduceNumber(day);
  const yearRed = reduceNumber(year);

  const componentSum = monthRed.value + dayRed.value + yearRed.value;
  const finalRed = reduceNumber(componentSum);

  // Full sum check for Karmic debts
  const rawSum = month + day + year;
  let karmic = null;
  if (KARMIC_NUMBERS.includes(componentSum)) karmic = componentSum;
  else if (KARMIC_NUMBERS.includes(rawSum)) karmic = rawSum;
  else if (dayRed.karmicFound) karmic = dayRed.karmicFound;

  return {
    value: finalRed.value,
    isMaster: MASTER_NUMBERS.includes(finalRed.value),
    monthRed,
    dayRed,
    yearRed,
    componentSum,
    steps: finalRed.steps,
    rawSum,
    karmicDebt: karmic
  };
}

/**
 * Calculate full Destiny/Expression, Soul Urge, and Personality numbers
 */
export function calculateNameNumbers(name, system = "pythagorean") {
  const analysis = analyzeNameLetters(name, system);

  const destinyRed = reduceNumber(analysis.totalSum);
  const soulUrgeRed = reduceNumber(analysis.vowelSum);
  const personalityRed = reduceNumber(analysis.consonantSum);

  // Karmic debts in name totals
  let karmicDebts = [];
  if (KARMIC_NUMBERS.includes(analysis.totalSum)) karmicDebts.push({ type: "Expression", number: analysis.totalSum });
  if (KARMIC_NUMBERS.includes(analysis.vowelSum)) karmicDebts.push({ type: "Soul Urge", number: analysis.vowelSum });
  if (KARMIC_NUMBERS.includes(analysis.consonantSum)) karmicDebts.push({ type: "Personality", number: analysis.consonantSum });

  // Missing numbers (Karmic Lessons) & Hidden Passion
  let karmicLessons = [];
  let maxCount = 0;
  let hiddenPassions = [];

  for (let d = 1; d <= 9; d++) {
    const count = analysis.letterCounts[d] || 0;
    if (count === 0) {
      karmicLessons.push(d);
    }
    if (count > maxCount) {
      maxCount = count;
      hiddenPassions = [d];
    } else if (count === maxCount && count > 0) {
      hiddenPassions.push(d);
    }
  }

  return {
    analysis,
    destiny: {
      value: destinyRed.value,
      isMaster: MASTER_NUMBERS.includes(destinyRed.value),
      steps: destinyRed.steps,
      rawSum: analysis.totalSum
    },
    soulUrge: {
      value: soulUrgeRed.value,
      isMaster: MASTER_NUMBERS.includes(soulUrgeRed.value),
      steps: soulUrgeRed.steps,
      rawSum: analysis.vowelSum
    },
    personality: {
      value: personalityRed.value,
      isMaster: MASTER_NUMBERS.includes(personalityRed.value),
      steps: personalityRed.steps,
      rawSum: analysis.consonantSum
    },
    karmicDebts,
    karmicLessons,
    hiddenPassions,
    letterCounts: analysis.letterCounts
  };
}

/**
 * Calculate Birthday Number
 */
export function calculateBirthdayNumber(birthDateStr) {
  const { day } = parseFlexibleDate(birthDateStr);
  const red = reduceNumber(day);
  const isKarmic = KARMIC_NUMBERS.includes(day);

  return {
    day,
    value: red.value,
    isMaster: MASTER_NUMBERS.includes(red.value),
    isKarmic: isKarmic ? day : null,
    steps: red.steps
  };
}

/**
 * Calculate Maturity Number (Life Path + Destiny)
 */
export function calculateMaturityNumber(lifePathVal, destinyVal) {
  const sum = lifePathVal + destinyVal;
  const red = reduceNumber(sum);
  return {
    value: red.value,
    isMaster: MASTER_NUMBERS.includes(red.value),
    steps: red.steps,
    sum
  };
}

/**
 * Calculate Attitude / Sun Number (Month + Day)
 */
export function calculateAttitudeNumber(birthDateStr) {
  const { month, day } = parseFlexibleDate(birthDateStr);
  const sum = month + day;
  const red = reduceNumber(sum, false); // Attitude is traditionally 1-9
  return {
    value: red.value,
    sum,
    steps: red.steps
  };
}

/**
 * Calculate Balance Number (Sum of first initials of each word)
 */
export function calculateBalanceNumber(name, system = "pythagorean") {
  const table = system === "chaldean" ? CHALDEAN_TABLE : PYTHAGOREAN_TABLE;
  const words = name.trim().split(/\s+/).filter(Boolean);
  let initialSum = 0;
  let initials = [];

  words.forEach(w => {
    const firstChar = w[0].toLowerCase();
    const val = table[firstChar] || 0;
    if (val > 0) {
      initialSum += val;
      initials.push({ char: w[0].toUpperCase(), val });
    }
  });

  const red = reduceNumber(initialSum, false);
  return {
    value: red.value,
    sum: initialSum,
    initials,
    steps: red.steps
  };
}

/**
 * Calculate the 4 Challenge Numbers
 */
export function calculateChallengeNumbers(birthDateStr) {
  const { year: yrNum, month: moNum, day: dyNum } = parseFlexibleDate(birthDateStr);
  const month = reduceNumber(moNum, false).value;
  const day = reduceNumber(dyNum, false).value;
  const year = reduceNumber(yrNum, false).value;

  const challenge1 = Math.abs(month - day);
  const challenge2 = Math.abs(day - year);
  const challenge3 = Math.abs(challenge1 - challenge2); // Main Challenge
  const challenge4 = Math.abs(month - year);

  return {
    c1: challenge1,
    c2: challenge2,
    c3: challenge3, // Primary / Major Challenge
    c4: challenge4
  };
}

/**
 * Calculate the 4 Pinnacle Cycles & Age Brackets
 */
export function calculatePinnacles(birthDateStr, lifePathBase) {
  const { year: yrNum, month: moNum, day: dyNum } = parseFlexibleDate(birthDateStr);
  const month = reduceNumber(moNum, false).value;
  const day = reduceNumber(dyNum, false).value;
  const year = reduceNumber(yrNum, false).value;

  const p1 = reduceNumber(month + day).value;
  const p2 = reduceNumber(day + year).value;
  const p3 = reduceNumber(p1 + p2).value;
  const p4 = reduceNumber(month + year).value;

  // Age spans based on standard Pythagorean 36 - Life Path rule
  const lifePathRoot = lifePathBase > 9 ? sumDigits(lifePathBase) : lifePathBase;
  const endAge1 = 36 - lifePathRoot;
  const endAge2 = endAge1 + 9;
  const endAge3 = endAge2 + 9;

  return [
    { index: 1, number: p1, title: "1st Pinnacle (Formative Foundations)", ageSpan: `Birth to Age ${endAge1}` },
    { index: 2, number: p2, title: "2nd Pinnacle (Productive Expansion)", ageSpan: `Ages ${endAge1 + 1} to ${endAge2}` },
    { index: 3, number: p3, title: "3rd Pinnacle (Attainment & Mastery)", ageSpan: `Ages ${endAge2 + 1} to ${endAge3}` },
    { index: 4, number: p4, title: "4th Pinnacle (Harvest & Legacy)", ageSpan: `Age ${endAge3 + 1} & Beyond` }
  ];
}

/**
 * Complete Full Blueprint Calculator
 */
export function calculateFullBlueprint({
  birthDate,
  birthTime,
  birthPlace,
  birthName,
  currentName,
  forecastDate,
  system = "pythagorean"
}) {
  const lifePath = calculateLifePath(birthDate);
  const birthNameAnalysis = calculateNameNumbers(birthName, system);
  
  const hasNameShift = currentName && currentName.trim() && currentName.trim().toLowerCase() !== birthName.trim().toLowerCase();
  const currentNameAnalysis = hasNameShift ? calculateNameNumbers(currentName, system) : null;

  const birthday = calculateBirthdayNumber(birthDate);
  const maturity = calculateMaturityNumber(lifePath.value, birthNameAnalysis.destiny.value);
  const attitude = calculateAttitudeNumber(birthDate);
  const balance = calculateBalanceNumber(birthName, system);
  const challenges = calculateChallengeNumbers(birthDate);
  const pinnacles = calculatePinnacles(birthDate, lifePath.value);

  // Compile all Karmic Debts detected across core calculations
  const allKarmicDebts = new Set();
  if (lifePath.karmicDebt) allKarmicDebts.add(lifePath.karmicDebt);
  if (birthday.isKarmic) allKarmicDebts.add(birthday.isKarmic);
  birthNameAnalysis.karmicDebts.forEach(kd => allKarmicDebts.add(kd.number));

  return {
    system,
    birthDate,
    birthTime,
    birthPlace,
    birthName,
    currentName: currentName || birthName,
    hasNameShift,
    forecastDate,
    core: {
      lifePath,
      destiny: birthNameAnalysis.destiny,
      soulUrge: birthNameAnalysis.soulUrge,
      personality: birthNameAnalysis.personality,
      birthday,
      maturity
    },
    advanced: {
      attitude,
      balance,
      karmicDebts: Array.from(allKarmicDebts),
      karmicLessons: birthNameAnalysis.karmicLessons,
      hiddenPassions: birthNameAnalysis.hiddenPassions,
      challenges,
      pinnacles
    },
    nameShift: hasNameShift ? {
      birth: birthNameAnalysis,
      current: currentNameAnalysis,
      destinyDiff: currentNameAnalysis.destiny.value !== birthNameAnalysis.destiny.value,
      soulUrgeDiff: currentNameAnalysis.soulUrge.value !== birthNameAnalysis.soulUrge.value,
      personalityDiff: currentNameAnalysis.personality.value !== birthNameAnalysis.personality.value
    } : null,
    birthNameAnalysis,
    currentNameAnalysis
  };
}
