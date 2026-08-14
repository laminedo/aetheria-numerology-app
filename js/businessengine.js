/**
 * AETHERIA - Business, Brand & Address Numerology Calculation Engine
 */

import { analyzeNameLetters, reduceNumber, sumDigits } from "./numerology.js";
import { BUSINESS_ARCHETYPES, ADDRESS_NUMEROLOGY } from "./data/business.js";

/**
 * Calculate Business & Brand Name Blueprint
 */
export function calculateBusinessBlueprint(businessName, founderLifePath = 1, system = "pythagorean") {
  const analysis = analyzeNameLetters(businessName, system);
  const expressionRed = reduceNumber(analysis.totalSum);
  const soulMissionRed = reduceNumber(analysis.vowelSum);
  const brandImageRed = reduceNumber(analysis.consonantSum);

  const expVal = expressionRed.value;
  const businessData = BUSINESS_ARCHETYPES[expVal] || BUSINESS_ARCHETYPES[1];

  // Founder Compatibility Synergy
  const fRoot = founderLifePath > 9 ? sumDigits(founderLifePath) : founderLifePath;
  const bRoot = expVal > 9 ? sumDigits(expVal) : expVal;
  const diff = Math.abs(fRoot - bRoot);

  let synergyScore = 80;
  let synergyAnalysis = "";

  if (fRoot === bRoot) {
    synergyScore = 95;
    synergyAnalysis = `Identical vibration (${fRoot}). This business name acts as a direct magnifying mirror of your personal soul mission. Natural authenticity and zero friction.`;
  } else if ([1, 5, 8].includes(fRoot) && [1, 5, 8].includes(bRoot)) {
    synergyScore = 92;
    synergyAnalysis = "High-velocity commercial alignment. Both emphasize executive leadership, dynamic market expansion, and bold commercial conquest.";
  } else if ([2, 4, 8].includes(fRoot) && [2, 4, 8].includes(bRoot)) {
    synergyScore = 90;
    synergyAnalysis = "Structural and financial compounding alignment. Focused on long-term enterprise value, dependable contracts, and blue-chip stability.";
  } else if ([3, 6, 9].includes(fRoot) && [3, 6, 9].includes(bRoot)) {
    synergyScore = 94;
    synergyAnalysis = "Creative, cultural, and universal heart alignment. Deep public trust, magnetic aesthetic charisma, and viral organic reach.";
  } else if ([7, 11].includes(fRoot) || [7, 11].includes(bRoot)) {
    synergyScore = 88;
    synergyAnalysis = "High-prestige niche positioning. Ideal for specialized proprietary technology, elite advisory, or transformational thought leadership.";
  } else {
    synergyScore = 78;
    synergyAnalysis = `Complementary market expansion. Where your Life Path ${founderLifePath} brings personal strength, the Brand Vibration ${expVal} expands your commercial reach into new market segments.`;
  }

  return {
    businessName,
    system,
    expression: {
      value: expVal,
      isMaster: expressionRed.value > 9,
      rawSum: analysis.totalSum,
      steps: expressionRed.steps
    },
    soulMission: {
      value: soulMissionRed.value,
      isMaster: soulMissionRed.value > 9,
      rawSum: analysis.vowelSum
    },
    brandImage: {
      value: brandImageRed.value,
      isMaster: brandImageRed.value > 9,
      rawSum: analysis.consonantSum
    },
    archetype: businessData.archetype,
    vibe: businessData.vibe,
    bestIndustries: businessData.bestIndustries,
    marketingAngle: businessData.marketingAngle,
    financialFlow: businessData.financialFlow,
    synergyScore,
    synergyAnalysis
  };
}

/**
 * Calculate Address / Living Space Vibration
 */
export function calculateAddressNumerology(addressStr, system = "pythagorean") {
  if (!addressStr || typeof addressStr !== "string") return null;

  // Extract digits from the house / unit portion
  const clean = addressStr.trim();
  const digits = clean.match(/\d+/g);
  let totalSum = 0;

  if (digits && digits.length > 0) {
    digits.forEach(d => {
      d.split("").forEach(digit => {
        totalSum += parseInt(digit, 10);
      });
    });
  } else {
    // If no numbers, calculate from letters
    const analysis = analyzeNameLetters(clean, system);
    totalSum = analysis.totalSum;
  }

  const red = reduceNumber(totalSum, true);
  const rootVal = red.value > 9 ? sumDigits(red.value) : red.value;
  const addressInfo = ADDRESS_NUMEROLOGY[rootVal] || ADDRESS_NUMEROLOGY[1];

  return {
    inputAddress: addressStr,
    vibrationNumber: red.value,
    rootNumber: rootVal,
    isMaster: red.value > 9,
    steps: red.steps,
    title: addressInfo.title,
    vibe: addressInfo.vibe,
    bestFor: addressInfo.bestFor,
    caution: addressInfo.caution
  };
}
