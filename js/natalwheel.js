/**
 * AETHERIA - Interactive SVG 12-House Natal Horoscope Wheel Renderer
 * Draws clean vector astrological wheels with 12 Houses, Zodiac Glyphs,
 * Ascendant axis, Sun/Moon degrees, and geometric aspect lines.
 */

import { ZODIAC_SIGNS } from "./astrology.js";

const ELEMENT_COLORS = {
  Fire: "#E65C5C",
  Earth: "#5CAE81",
  Air: "#5CB4E6",
  Water: "#6D87A4"
};

/**
 * Generate full SVG string for Natal Wheel
 */
export function renderNatalWheelSVG(sunSign, moonData, ascendantData, containerWidth = 520) {
  const size = 520;
  const center = size / 2;
  const rOuter = center - 20;      // 240
  const rZodiacInner = rOuter - 36; // 204
  const rHouseInner = rZodiacInner - 40; // 164
  const rPlanetRing = rHouseInner - 35;  // 129
  const rCenter = 45;

  // Ascendant angle offset: In classical astrology charts, ASC is placed on the left (180° / 9 o'clock)
  const ascDegree = ascendantData && ascendantData.available ? ascendantData.totalLongitude : 0;
  
  // Angle conversion helper: converts zodiac longitude (0-360) to SVG coordinate angle
  function lonToAngle(lon) {
    // 180° (Ascendant) is at 180° in standard polar space (left).
    const rel = (lon - ascDegree + 360) % 360;
    return (180 - rel + 360) % 360;
  }

  function polarToCartesian(cx, cy, r, angleInDegrees) {
    const rad = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy - r * Math.sin(rad) // SVG inverted Y axis
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${arcSweep} 0 ${end.x} ${end.y}`;
  }

  let svg = `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" class="natal-wheel-svg" style="max-width: ${containerWidth}px; margin: 0 auto; display: block;">`;

  // Background Rings
  svg += `<defs>
    <radialGradient id="wheelBgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="hsl(222, 24%, 10%)" />
      <stop offset="85%" stop-color="hsl(222, 22%, 14%)" />
      <stop offset="100%" stop-color="hsl(222, 20%, 8%)" />
    </radialGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>`;

  // Base background
  svg += `<circle cx="${center}" cy="${center}" r="${rOuter + 10}" fill="url(#wheelBgGrad)" stroke="hsl(42, 50%, 35%)" stroke-width="1.5" />`;
  svg += `<circle cx="${center}" cy="${center}" r="${rZodiacInner}" fill="none" stroke="hsl(220, 15%, 25%)" stroke-width="1" />`;
  svg += `<circle cx="${center}" cy="${center}" r="${rHouseInner}" fill="none" stroke="hsl(220, 15%, 25%)" stroke-width="1" />`;
  svg += `<circle cx="${center}" cy="${center}" r="${rCenter}" fill="hsl(222, 25%, 11%)" stroke="hsl(42, 45%, 40%)" stroke-width="1.5" />`;

  // 1. Draw 12 Zodiac Sign Segments
  ZODIAC_SIGNS.forEach((sign, idx) => {
    const signStartLon = idx * 30;
    const signEndLon = (idx + 1) * 30;
    const aStart = lonToAngle(signStartLon);
    const aEnd = lonToAngle(signEndLon);

    const color = ELEMENT_COLORS[sign.element] || "#fff";

    // Divider spoke
    const p1 = polarToCartesian(center, center, rZodiacInner, aStart);
    const p2 = polarToCartesian(center, center, rOuter, aStart);
    svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="hsl(220, 15%, 28%)" stroke-width="1" />`;

    // Zodiac Glyph in segment center
    const aMid = lonToAngle(signStartLon + 15);
    const pGlyph = polarToCartesian(center, center, (rOuter + rZodiacInner) / 2, aMid);
    svg += `<text x="${pGlyph.x}" y="${pGlyph.y + 5}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="${color}" font-weight="700" title="${sign.name} (${sign.element})">${sign.symbol}</text>`;
  });

  // 2. Draw 12 Houses
  for (let h = 1; h <= 12; h++) {
    // Equal House cusps relative to Ascendant
    const houseLon = (ascDegree + (h - 1) * 30) % 360;
    const aHouse = lonToAngle(houseLon);

    // House dividing line
    const isAngle = h === 1 || h === 4 || h === 7 || h === 10;
    const strokeColor = isAngle ? "hsl(42, 65%, 60%)" : "hsla(220, 15%, 35%, 0.6)";
    const strokeWidth = isAngle ? "1.8" : "1";

    const pStart = polarToCartesian(center, center, rCenter, aHouse);
    const pEnd = polarToCartesian(center, center, rHouseInner, aHouse);
    svg += `<line x1="${pStart.x}" y1="${pStart.y}" x2="${pEnd.x}" y2="${pEnd.y}" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${isAngle ? 'stroke-dasharray="none"' : 'stroke-dasharray="3,3"'} />`;

    // House Number
    const aHouseMid = lonToAngle((houseLon + 15) % 360);
    const pHouseText = polarToCartesian(center, center, (rHouseInner + rPlanetRing) / 2, aHouseMid);
    svg += `<text x="${pHouseText.x}" y="${pHouseText.y + 4}" text-anchor="middle" font-family="'Cinzel', serif" font-size="10" fill="hsl(218, 15%, 60%)" font-weight="600">${h}</text>`;
  }

  // 3. ASC & MC Markers
  // Ascendant at 180° (left)
  const pAsc = polarToCartesian(center, center, rOuter + 14, 180);
  svg += `<text x="${pAsc.x - 2}" y="${pAsc.y + 4}" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="hsl(42, 75%, 65%)">ASC ${ascendantData && ascendantData.available ? `${ascendantData.degree}°` : ""}</text>`;

  // Descendant at 0° (right)
  const pDsc = polarToCartesian(center, center, rOuter + 14, 0);
  svg += `<text x="${pDsc.x + 2}" y="${pDsc.y + 4}" text-anchor="start" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="hsl(218, 15%, 60%)">DSC</text>`;

  // Midheaven at 90° (top)
  const pMc = polarToCartesian(center, center, rOuter + 14, 90);
  svg += `<text x="${pMc.x}" y="${pMc.y - 2}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="hsl(42, 65%, 60%)">MC</text>`;

  // 4. Plot Sun and Moon Placements
  const sunLon = (sunSign.start[0] * 30 + 15) % 360; // approximate sun degree center
  const aSun = lonToAngle(sunLon);
  const pSun = polarToCartesian(center, center, (rHouseInner + rCenter) / 2 + 10, aSun);

  const moonLon = moonData && moonData.totalLongitude ? moonData.totalLongitude : (sunLon + 120) % 360;
  const aMoon = lonToAngle(moonLon);
  const pMoon = polarToCartesian(center, center, (rHouseInner + rCenter) / 2 + 10, aMoon);

  // Aspect Line between Sun and Moon (e.g. Trine or Sextile chord)
  const diffAngle = Math.abs(sunLon - moonLon) % 360;
  let aspectColor = "hsla(42, 50%, 50%, 0.35)";
  if (Math.abs(diffAngle - 120) <= 8 || Math.abs(diffAngle - 240) <= 8) {
    aspectColor = "hsla(205, 70%, 60%, 0.6)"; // Trine
  } else if (Math.abs(diffAngle - 90) <= 8 || Math.abs(diffAngle - 270) <= 8) {
    aspectColor = "hsla(355, 70%, 60%, 0.6)"; // Square
  } else if (Math.abs(diffAngle - 60) <= 6 || Math.abs(diffAngle - 300) <= 6) {
    aspectColor = "hsla(150, 70%, 60%, 0.6)"; // Sextile
  }

  svg += `<line x1="${pSun.x}" y1="${pSun.y}" x2="${pMoon.x}" y2="${pMoon.y}" stroke="${aspectColor}" stroke-width="1.2" stroke-dasharray="4,2" />`;

  // Sun Glyph
  svg += `<g class="planet-glyph-group" title="Sun in ${sunSign.name}">
    <circle cx="${pSun.x}" cy="${pSun.y}" r="13" fill="hsl(42, 60%, 20%)" stroke="hsl(42, 75%, 65%)" stroke-width="1.5" />
    <text x="${pSun.x}" y="${pSun.y + 4}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#FFE599" font-weight="700">☉</text>
  </g>`;

  // Moon Glyph
  svg += `<g class="planet-glyph-group" title="Moon in ${moonData && moonData.sign ? moonData.sign.name : 'Cosmic'}">
    <circle cx="${pMoon.x}" cy="${pMoon.y}" r="13" fill="hsl(215, 40%, 20%)" stroke="hsl(205, 60%, 65%)" stroke-width="1.5" />
    <text x="${pMoon.x}" y="${pMoon.y + 4}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#D0E5FF" font-weight="700">☽</text>
  </g>`;

  // Center Sigil
  svg += `<text x="${center}" y="${center + 5}" text-anchor="middle" font-family="'Cinzel', serif" font-size="14" font-weight="800" fill="hsl(42, 65%, 62%)" letter-spacing="1">AETHERIA</text>`;

  svg += `</svg>`;
  return svg;
}
