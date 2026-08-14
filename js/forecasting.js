/**
 * AETHERIA - Timing & Forecasting Engine
 * Calculates Personal Year, Personal Month, Personal Day cycles,
 * 9-Year Epicycle Progress, and 12-Month Transit Roadmaps.
 */

import { reduceNumber, sumDigits } from "./numerology.js";
import { PERSONAL_YEARS_DATA, CORE_NUMBERS_DATA } from "./data/interpretations.js";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Calculate Personal Year, Personal Month, and Personal Day
 */
export function calculatePersonalCycles(birthDateStr, forecastDateStr) {
  const [, bMonthStr, bDayStr] = birthDateStr.split("-");
  const bMonth = parseInt(bMonthStr, 10);
  const bDay = parseInt(bDayStr, 10);

  const [fYearStr, fMonthStr, fDayStr] = forecastDateStr.split("-");
  const fYear = parseInt(fYearStr, 10);
  const fMonth = parseInt(fMonthStr, 10);
  const fDay = parseInt(fDayStr, 10);

  // Universal Calculations
  const universalYearRed = reduceNumber(fYear);
  const universalMonthRed = reduceNumber(universalYearRed.value + fMonth);
  const universalDayRed = reduceNumber(universalMonthRed.value + fDay);

  // Personal Calculations
  // Personal Year = (Birth Month + Birth Day + Current Year)
  const pySum = bMonth + bDay + fYear;
  const personalYearRed = reduceNumber(pySum);

  // Personal Month = (Personal Year + Current Month)
  const pmSum = personalYearRed.value + fMonth;
  const personalMonthRed = reduceNumber(pmSum);

  // Personal Day = (Personal Month + Current Day)
  const pdSum = personalMonthRed.value + fDay;
  const personalDayRed = reduceNumber(pdSum);

  // 9-Year Epicycle position (1 to 9)
  const epicyclePhase = personalYearRed.value > 9 ? sumDigits(personalYearRed.value) : personalYearRed.value;
  const epicycleDescriptions = {
    1: { phase: "Initiation & Germination", desc: "Planting new seeds; clean slate; individual self-direction." },
    2: { phase: "Gestation & Alliance", desc: "Subterranean root growth; quiet cooperation; patience." },
    3: { phase: "First Bloom & Expression", desc: "Emergence into sunlight; creative visibility; social expansion." },
    4: { phase: "Structural Hardening & Weeding", desc: "Building strong trellises; rigorous work; foundation testing." },
    5: { phase: "Cross-Pollination & Pivot", desc: "Midpoint whirlwind; unexpected shifts; dynamic liberation." },
    6: { phase: "Nurturing & Community Care", desc: "Domestic harmony; family responsibility; beautifying surroundings." },
    7: { phase: "Deep Pruning & Sabbatical", desc: "Internal contemplation; spiritual depth; strategic refinement." },
    8: { phase: "Abundant Harvest & Mastery", desc: "Bountiful reaping of past investments; material authority." },
    9: { phase: "Clearing the Soil & Rest", desc: "Harvest completion; releasing the obsolete; resting before rebirth." }
  };

  const currentYearData = PERSONAL_YEARS_DATA[personalYearRed.value] || PERSONAL_YEARS_DATA[1];
  const currentMonthData = CORE_NUMBERS_DATA[personalMonthRed.value] || CORE_NUMBERS_DATA[1];
  const currentDayData = CORE_NUMBERS_DATA[personalDayRed.value] || CORE_NUMBERS_DATA[1];

  return {
    forecastDate: forecastDateStr,
    forecastYear: fYear,
    forecastMonth: fMonth,
    forecastMonthName: MONTH_NAMES[fMonth - 1],
    forecastDay: fDay,
    personalYear: {
      value: personalYearRed.value,
      isMaster: personalYearRed.value > 9,
      data: currentYearData,
      epicyclePhase,
      epicycleInfo: epicycleDescriptions[epicyclePhase]
    },
    personalMonth: {
      value: personalMonthRed.value,
      isMaster: personalMonthRed.value > 9,
      data: currentMonthData,
      theme: `Vibration ${personalMonthRed.value}: ${currentMonthData.keyword}`
    },
    personalDay: {
      value: personalDayRed.value,
      isMaster: personalDayRed.value > 9,
      data: currentDayData,
      theme: `Vibration ${personalDayRed.value}: ${currentDayData.keyword}`
    },
    universal: {
      year: universalYearRed.value,
      month: universalMonthRed.value,
      day: universalDayRed.value
    }
  };
}

/**
 * Generate 12-Month Transit Forecast for the entire forecast year
 */
export function generateYearlyTransitRoadmap(birthDateStr, targetYear) {
  const [, bMonthStr, bDayStr] = birthDateStr.split("-");
  const bMonth = parseInt(bMonthStr, 10);
  const bDay = parseInt(bDayStr, 10);

  const personalYearRed = reduceNumber(bMonth + bDay + targetYear);
  const pyVal = personalYearRed.value;

  const months = [];
  for (let m = 1; m <= 12; m++) {
    const pmRed = reduceNumber(pyVal + m);
    const pmVal = pmRed.value;
    const info = CORE_NUMBERS_DATA[pmVal] || CORE_NUMBERS_DATA[1];

    let strategicFocus = "";
    let vibe = "Harmonic";

    if ([1, 8].includes(pmVal)) {
      strategicFocus = "High Power: Push major contracts, initiate high-stakes negotiations, lead boldly.";
      vibe = "Peak Power";
    } else if ([2, 6].includes(pmVal)) {
      strategicFocus = "Relational: Mediate disputes, invest in domestic peace, build partnerships.";
      vibe = "Nurturing";
    } else if ([3, 5].includes(pmVal)) {
      strategicFocus = "Dynamic: Travel, launch creative marketing, network extensively, pivot routines.";
      vibe = "Expansive";
    } else if ([4].includes(pmVal)) {
      strategicFocus = "Structural: Organize finances, double check legal documents, grind out details.";
      vibe = "Discipline";
    } else if ([7].includes(pmVal)) {
      strategicFocus = "Introspective: Study, reflect, retreat from public chaos, recharge mental battery.";
      vibe = "Sabbatical";
    } else if ([9].includes(pmVal)) {
      strategicFocus = "Completion: Conclude lingering debts or projects, forgive old feuds, declutter.";
      vibe = "Culmination";
    } else if ([11, 22, 33].includes(pmVal)) {
      strategicFocus = "Master Voltage: Channel high intuitive downloads, lead on a grander scale.";
      vibe = "Master Portal";
    }

    months.push({
      monthNumber: m,
      name: MONTH_NAMES[m - 1],
      personalMonthNumber: pmVal,
      isMaster: pmVal > 9,
      archetypeTitle: info.title,
      keyword: info.keyword,
      ruler: info.ruler,
      strategicFocus,
      vibe
    });
  }

  return {
    year: targetYear,
    personalYear: pyVal,
    months
  };
}
