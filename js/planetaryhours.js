/**
 * AETHERIA - Planetary Hours & Real-Time Cosmic Clock Engine
 * Calculates the active planetary ruler of the hour based on Chaldean order.
 */

const CHALDEAN_ORDER = ["Saturn", "Jupiter", "Mars", "The Sun", "Venus", "Mercury", "The Moon"];

const DAY_RULERS = [
  "The Sun",    // Sunday (0)
  "The Moon",   // Monday (1)
  "Mars",       // Tuesday (2)
  "Mercury",    // Wednesday (3)
  "Jupiter",    // Thursday (4)
  "Venus",      // Friday (5)
  "Saturn"      // Saturday (6)
];

const PLANETARY_HOUR_GUIDANCE = {
  "The Sun": {
    glyph: "☉",
    theme: "Authority, Vitality, Prominence & Success",
    goodFor: "Approaching leaders, launching public projects, applying for honors, revitalizing energy.",
    caution: "Avoid arrogance or overbearing pride."
  },
  "The Moon": {
    glyph: "☽",
    theme: "Intuition, Fluidity, Public Relations & Domesticity",
    goodFor: "Short travel, family affairs, counseling, intuitive meditation, culinary creations.",
    caution: "Avoid fluctuating emotional commitments or signing permanent contracts."
  },
  "Mars": {
    glyph: "♂",
    theme: "Courage, Decisive Action, Energy & Drive",
    goodFor: "Physical workouts, competitive sports, surgery, courageous confrontations, cutting dead weight.",
    caution: "High risk of impulsive arguments, haste, or accidents; keep your temper cool."
  },
  "Mercury": {
    glyph: "☿",
    theme: "Communication, Intellect, Commerce & Writing",
    goodFor: "Sending vital emails, writing reports, accounting, studying, negotiations, software coding.",
    caution: "Avoid gossiping or scattering your focus on too many browser tabs."
  },
  "Jupiter": {
    glyph: "♃",
    theme: "Benevolence, Expansion, Wealth & Philosophy",
    goodFor: "Financial investments, seeking legal advice, grand marketing campaigns, spiritual rituals.",
    caution: "Avoid overindulgence or excessive unwarranted optimism."
  },
  "Venus": {
    glyph: "♀",
    theme: "Beauty, Love, Harmony, Luxury & Art",
    goodFor: "Romantic dates, artistic creations, buying jewelry/clothing, socializing, peacemaking.",
    caution: "Avoid reckless luxury spending or conflict avoidance."
  },
  "Saturn": {
    glyph: "♄",
    theme: "Structure, Discipline, Contracts, Boundaries & Karma",
    goodFor: "Long-term planning, signing durable contracts, heavy labor, meditation, boundary setting.",
    caution: "Avoid pessimism, cynicism, or beginning lighthearted social parties."
  }
};

/**
 * Calculate the Planetary Hours for a given date and time
 */
export function calculatePlanetaryHours(dateObj = new Date()) {
  const dayOfWeek = dateObj.getDay(); // 0 (Sun) to 6 (Sat)
  const currentHour = dateObj.getHours(); // 0 to 23
  const currentMinutes = dateObj.getMinutes();

  const dayRulerName = DAY_RULERS[dayOfWeek];
  const dayRulerIdx = CHALDEAN_ORDER.indexOf(dayRulerName);

  // Standard planetary hour division (approximate 6:00 AM sunrise base)
  // Hours from sunrise (0 to 23, where 6:00 AM is hour 0)
  const hoursSinceSunrise = (currentHour - 6 + 24) % 24;
  const currentPlanetIdx = (dayRulerIdx + hoursSinceSunrise) % 7;
  const currentPlanet = CHALDEAN_ORDER[currentPlanetIdx];
  const planetInfo = PLANETARY_HOUR_GUIDANCE[currentPlanet];

  // Generate 24 hours schedule table
  const schedule = [];
  for (let h = 0; h < 24; h++) {
    const clockHour = (h + 6) % 24;
    const pIdx = (dayRulerIdx + h) % 7;
    const pName = CHALDEAN_ORDER[pIdx];
    const isCurrent = h === hoursSinceSunrise;

    const timeLabel = `${clockHour.toString().padStart(2, '0')}:00 - ${((clockHour + 1) % 24).toString().padStart(2, '0')}:00`;

    schedule.push({
      hourIndex: h + 1,
      timeLabel,
      planet: pName,
      glyph: PLANETARY_HOUR_GUIDANCE[pName].glyph,
      isDay: h < 12,
      isCurrent
    });
  }

  return {
    dayRuler: dayRulerName,
    currentPlanet,
    glyph: planetInfo.glyph,
    guidance: planetInfo,
    schedule,
    timeString: `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`
  };
}
