/**
 * AETHERIA - Astronomical & Astrological Calculation Engine
 * Calculates Sun Sign, Moon Sign, Ascendant (Rising Sign), Planetary Rulers,
 * and Quad-Elemental Cosmic Balances.
 */

import { findCityCoordinates } from "./data/cities.js";
import { parseFlexibleDate } from "./numerology.js";

export const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", element: "Fire", modality: "Cardinal", ruler: "Mars", start: [3, 21], end: [4, 19], degreeOffset: 0 },
  { name: "Taurus", symbol: "♉", element: "Earth", modality: "Fixed", ruler: "Venus", start: [4, 20], end: [5, 20], degreeOffset: 30 },
  { name: "Gemini", symbol: "♊", element: "Air", modality: "Mutable", ruler: "Mercury", start: [5, 21], end: [6, 20], degreeOffset: 60 },
  { name: "Cancer", symbol: "♋", element: "Water", modality: "Cardinal", ruler: "The Moon", start: [6, 21], end: [7, 22], degreeOffset: 90 },
  { name: "Leo", symbol: "♌", element: "Fire", modality: "Fixed", ruler: "The Sun", start: [7, 23], end: [8, 22], degreeOffset: 120 },
  { name: "Virgo", symbol: "♍", element: "Earth", modality: "Mutable", ruler: "Mercury", start: [8, 23], end: [9, 22], degreeOffset: 150 },
  { name: "Libra", symbol: "♎", element: "Air", modality: "Cardinal", ruler: "Venus", start: [9, 23], end: [10, 22], degreeOffset: 180 },
  { name: "Scorpio", symbol: "♏", element: "Water", modality: "Fixed", ruler: "Mars / Pluto", start: [10, 23], end: [11, 21], degreeOffset: 210 },
  { name: "Sagittarius", symbol: "♐", element: "Fire", modality: "Mutable", ruler: "Jupiter", start: [11, 22], end: [12, 21], degreeOffset: 240 },
  { name: "Capricorn", symbol: "♑", element: "Earth", modality: "Cardinal", ruler: "Saturn", start: [12, 22], end: [1, 19], degreeOffset: 270 },
  { name: "Aquarius", symbol: "♒", element: "Air", modality: "Fixed", ruler: "Saturn / Uranus", start: [1, 20], end: [2, 18], degreeOffset: 300 },
  { name: "Pisces", symbol: "♓", element: "Water", modality: "Mutable", ruler: "Jupiter / Neptune", start: [2, 19], end: [3, 20], degreeOffset: 330 }
];

export const PLANETARY_NUMEROLOGY = {
  1: { planet: "The Sun", glyph: "☉", description: "Solar creative vitality, sovereignty, self-will, and illumination." },
  2: { planet: "The Moon", glyph: "☽", description: "Lunar emotional intelligence, psychic receptivity, and subconscious rhythm." },
  3: { planet: "Jupiter", glyph: "♃", description: "Jovian benevolence, philosophical expansion, eloquence, and prosperity." },
  4: { planet: "Uranus / Saturn", glyph: "♅ / ♄", description: "Structural discipline grounded with revolutionary inventiveness." },
  5: { planet: "Mercury", glyph: "☿", description: "Mercurial quicksilver intellect, rapid communication, and alchemy." },
  6: { planet: "Venus", glyph: "♀", description: "Venutian aesthetic harmony, unconditional devotion, and restorative beauty." },
  7: { planet: "Neptune / Ketu", glyph: "♆", description: "Neptunian mystical intuition, esoteric depth, and transcendent wisdom." },
  8: { planet: "Saturn", glyph: "♄", description: "Saturnian karmic law, executive authority, resilience, and material mastery." },
  9: { planet: "Mars / Jupiter", glyph: "♂ / ♃", description: "Martian spiritual courage coupled with universal humanitarian vision." },
  11: { planet: "Uranus / Neptune", glyph: "♅ • ♆", description: "High-frequency cosmic antenna; lightning intuitive downloads." },
  22: { planet: "Pluto / Uranus / Saturn", glyph: "♇ • ♅ • ♄", description: "Titan architect; materializing collective evolutionary institutions." },
  33: { planet: "Venus / Neptune / Jupiter", glyph: "♀ • ♆ • ♃", description: "Avatar octave; transcendent cosmic love and healing frequency." }
};

/**
 * Calculate Julian Day Number for a given UTC date and time
 */
export function calculateJulianDay(year, month, day, decimalHours = 12) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JDN = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JDN + decimalHours / 24;
}

/**
 * Determine Sun Sign based on birth month and day
 */
export function calculateSunSign(birthDateStr) {
  const { month, day } = parseFlexibleDate(birthDateStr);

  for (const sign of ZODIAC_SIGNS) {
    const [sM, sD] = sign.start;
    const [eM, eD] = sign.end;

    if (sM === eM) {
      if (month === sM && day >= sD && day <= eD) return sign;
    } else if (sM < eM) {
      if ((month === sM && day >= sD) || (month === eM && day <= eD)) return sign;
    } else {
      // Crosses year boundary (Capricorn: Dec 22 - Jan 19)
      if ((month === sM && day >= sD) || (month === eM && day <= eD)) return sign;
    }
  }
  return ZODIAC_SIGNS[0];
}

/**
 * Approximate Moon Sign calculation
 */
export function calculateMoonSign(year, month, day, decimalHours = 12) {
  const jd = calculateJulianDay(year, month, day, decimalHours);
  const T = (jd - 2451545.0) / 36525.0; // Centuries since J2000.0

  // Moon Mean Longitude formula (Meeus astronomical formula approximation)
  let L_prime = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + (T * T * T) / 538841.0;
  L_prime = ((L_prime % 360) + 360) % 360;

  const signIndex = Math.floor(L_prime / 30) % 12;
  const signDegree = Math.floor(L_prime % 30);
  const sign = ZODIAC_SIGNS[signIndex];

  return {
    sign,
    degree: signDegree,
    totalLongitude: L_prime
  };
}

/**
 * Calculate Ascendant (Rising Sign) from birth date, time, and coordinates
 */
export function calculateAscendant(birthDateStr, birthTimeStr, birthPlaceStr) {
  if (!birthTimeStr) {
    return {
      available: false,
      reason: "Exact birth time not provided",
      sign: null,
      degree: null
    };
  }

  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const [hourStr, minStr] = birthTimeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);

  const coords = findCityCoordinates(birthPlaceStr) || { lat: 40.7128, lng: -74.0060, tz: -5 };
  const tzOffset = coords.tz;

  // Convert local birth time to UTC decimal hours
  const localDecimalHours = hour + min / 60;
  const utcDecimalHours = localDecimalHours - tzOffset;

  const jd0 = calculateJulianDay(year, month, day, 0);
  const D = jd0 - 2451545.0;
  const T = D / 36525.0;

  // Greenwich Mean Sidereal Time at 0h UT (degrees)
  let GMST0 = 280.46061837 + 360.98564736629 * D + 0.000387933 * T * T - (T * T * T) / 38710000;
  GMST0 = ((GMST0 % 360) + 360) % 360;

  // GMST at birth time
  const GMST = ((GMST0 + utcDecimalHours * 15.04107) % 360 + 360) % 360;

  // Local Sidereal Time (RAMC in degrees)
  let RAMC = ((GMST + coords.lng) % 360 + 360) % 360;

  // Obliquity of the Ecliptic (approx 23.4393 degrees)
  const eps = 23.4392911 * (Math.PI / 180);
  const ramcRad = RAMC * (Math.PI / 180);
  const latRad = coords.lat * (Math.PI / 180);

  // Ascendant formula: tan(Asc) = -cos(RAMC) / (sin(RAMC)*cos(eps) + tan(lat)*sin(eps))
  const y = -Math.cos(ramcRad);
  const x = Math.sin(ramcRad) * Math.cos(eps) + Math.tan(latRad) * Math.sin(eps);
  
  let ascRad = Math.atan2(y, x);
  let ascDeg = (ascRad * 180 / Math.PI + 360) % 360;

  // Quadrant correction
  if (ascDeg < 0) ascDeg += 360;

  const signIndex = Math.floor(ascDeg / 30) % 12;
  const signDegree = Math.floor(ascDeg % 30);
  const sign = ZODIAC_SIGNS[signIndex];

  return {
    available: true,
    sign,
    degree: signDegree,
    totalLongitude: ascDeg,
    coordinates: coords
  };
}

/**
 * Calculate Quad-Elemental Matrix (Fire, Earth, Air, Water)
 * Synthesizes Astrological Placements with Numerological vibrations
 */
export function calculateElementalBalance(sunSign, moonData, ascendantData, numerologyProfile) {
  const scores = { Fire: 0, Earth: 0, Air: 0, Water: 0 };

  // Astrological weightings (100 total base)
  if (sunSign) scores[sunSign.element] += 30;
  if (moonData && moonData.sign) scores[moonData.sign.element] += 25;
  if (ascendantData && ascendantData.available && ascendantData.sign) {
    scores[ascendantData.sign.element] += 20;
  } else {
    // Distribute remaining evenly if ascendant unavailable
    scores.Fire += 5; scores.Earth += 5; scores.Air += 5; scores.Water += 5;
  }

  // Numerological weightings (Life Path, Destiny, Soul Urge)
  const numWeights = [
    { val: numerologyProfile.core.lifePath.value, weight: 15 },
    { val: numerologyProfile.core.destiny.value, weight: 10 },
    { val: numerologyProfile.core.soulUrge.value, weight: 10 }
  ];

  numWeights.forEach(({ val, weight }) => {
    const root = val > 9 ? (val === 11 ? 2 : val === 22 ? 4 : 6) : val;
    if ([1, 3, 9].includes(root)) scores.Fire += weight;
    else if ([4, 8].includes(root)) scores.Earth += weight;
    else if ([5].includes(root)) scores.Air += weight;
    else if ([2, 6, 7].includes(root)) scores.Water += weight;
    else scores.Air += weight;
  });

  const total = scores.Fire + scores.Earth + scores.Air + scores.Water;
  const percentages = {
    Fire: Math.round((scores.Fire / total) * 100),
    Earth: Math.round((scores.Earth / total) * 100),
    Air: Math.round((scores.Air / total) * 100),
    Water: Math.round((scores.Water / total) * 100)
  };

  // Determine dominant and auxiliary element
  const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);

  return {
    percentages,
    dominant: sorted[0][0],
    auxiliary: sorted[1][0],
    least: sorted[3][0]
  };
}

/**
 * Generate Complete Astrological Profile
 */
export function calculateAstrologyProfile(birthDateStr, birthTimeStr, birthPlaceStr, numerologyProfile) {
  const { year, month, day, iso } = parseFlexibleDate(birthDateStr);

  const sunSign = calculateSunSign(iso);
  const moonData = calculateMoonSign(year, month, day);
  const ascendantData = calculateAscendant(iso, birthTimeStr, birthPlaceStr);
  const elemental = calculateElementalBalance(sunSign, moonData, ascendantData, numerologyProfile);

  return {
    sunSign,
    moonData,
    ascendantData,
    elemental,
    lifePathRuler: PLANETARY_NUMEROLOGY[numerologyProfile.core.lifePath.value] || PLANETARY_NUMEROLOGY[1],
    destinyRuler: PLANETARY_NUMEROLOGY[numerologyProfile.core.destiny.value] || PLANETARY_NUMEROLOGY[1],
    soulUrgeRuler: PLANETARY_NUMEROLOGY[numerologyProfile.core.soulUrge.value] || PLANETARY_NUMEROLOGY[1]
  };
}
