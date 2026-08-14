/**
 * AETHERIA - Esoteric Astro-Numerology Hybrid Synthesis Engine
 * Synthesizes planetary rulerships, zodiacal archetypes, and core numerology
 * into a cohesive psychological and metaphysical blueprint.
 */

import { CORE_NUMBERS_DATA } from "./data/interpretations.js";

/**
 * Synthesize Life Path with Sun Sign
 */
export function synthesizeLifePathSun(lifePathVal, sunSign) {
  const lpInfo = CORE_NUMBERS_DATA[lifePathVal] || CORE_NUMBERS_DATA[1];
  const signName = sunSign ? sunSign.name : "Cosmic";
  const signElement = sunSign ? sunSign.element : "Ether";

  const matrix = {
    "1-Fire": "Double Solar Dynamo: Pure forward momentum, groundbreaking initiative, and fierce sovereign will.",
    "1-Earth": "Pragmatic Pioneer: Concrete execution meets fearless originality; building realistic empires from scratch.",
    "1-Air": "Intellectual Trailblazer: Generating radical new concepts, pioneering disruptive technologies and philosophies.",
    "1-Water": "Intuitive Warrior: Leading with deep emotional passion, fiercely protecting autonomy through gut instinct.",

    "2-Fire": "Dynamic Diplomat: High-energy mediation; channeling passionate courage to heal conflicts and build bridges.",
    "2-Earth": "Grounded Counselor: Sensible, dependable empathy; soothing stress through tangible support and unwavering loyalty.",
    "2-Air": "Cerebral Harmonizer: Objective diplomacy; solving complex relational puzzles with intellectual grace.",
    "2-Water": "Sublime Empath: Profound psychic sensitivity; feeling the subtle collective pulse and healing spiritual rifts.",

    "3-Fire": "Radiant Luminary: Electric charisma, dramatic stage presence, and infectious celebratory enthusiasm.",
    "3-Earth": "Artisan Architect: Translating artistic genius into tangible, profitable, and enduring crafts.",
    "3-Air": "Master Communicator: Lightning wit, prolific literary output, and sparkling social magnetism.",
    "3-Water": "Poetic Channel: Transmuting deep emotional vulnerability into breathtaking art, music, or literature.",

    "4-Fire": "Disciplined Firebrand: Channeling intense passion into methodical, unstoppable institutional conquest.",
    "4-Earth": "Titan of Stability: Absolute structural mastery, unbreakable perseverance, and unyielding integrity.",
    "4-Air": "Systems Engineer: Designing complex logical architectures, operational protocols, and future frameworks.",
    "4-Water": "Protective Anchor: Building secure, emotional havens and preserving sacred ancestral traditions.",

    "5-Fire": "Fearless Adventurer: Boundless courage to pioneer uncharted territories and provoke evolutionary change.",
    "5-Earth": "Sensory Alchemist: Grounded exploration; mastering real estate, travel, culinary arts, and material agility.",
    "5-Air": "Universal Polymath: Rapid assimilation of languages, concepts, and cross-cultural insights.",
    "5-Water": "Emotional Chameleon: Fluid adaptation across disparate human experiences; deep psychological resonance.",

    "6-Fire": "Heroic Guardian: Championing loved ones with fierce courage and leading community reform with moral passion.",
    "6-Earth": "Sanctuary Steward: Manifesting tranquil, beautiful domestic order and restorative therapeutic stability.",
    "6-Air": "Harmonic Educator: Teaching ethics, aesthetics, and relational wisdom with elegant clarity.",
    "6-Water": "Compassionate Mystic: Embodying unconditional nurturing love and comforting the deepest emotional wounds.",

    "7-Fire": "Intuitive Inquisitor: Piercing mystery with burning intellectual curiosity and solitary courage.",
    "7-Earth": "Empirical Hermit: Rigorous scientific research grounded in concrete evidence and meticulous data analysis.",
    "7-Air": "Philosophical Sage: Pure analytical intellect exploring the abstract geometries of the cosmos.",
    "7-Water": "Esoteric Mystic: Clairvoyant insight, deep meditative communion, and exploring the oceanic unconscious.",

    "8-Fire": "Imperial Sovereign: Dominant executive leadership, charismatic conquest, and bold capital deployment.",
    "8-Earth": "Industrial Magnate: Masterful stewardship of physical resources, real estate, and corporate institutions.",
    "8-Air": "Strategic Monopolist: High-level financial gamesmanship, visionary governance, and macroeconomic policy.",
    "8-Water": "Karmic Alchemist: Harnessing immense emotional depth and psychological leverage to transform material structures.",

    "9-Fire": "Prophetic Champion: Igniting global movements for justice, human rights, and spiritual evolution.",
    "9-Earth": "Global Philanthropist: Anchoring universal humanitarian ideals into enduring charitable institutions.",
    "9-Air": "Universal Philosopher: Bridging world cultures, international diplomacy, and timeless literature.",
    "9-Water": "Transcendent Mystic: Dissolving ego barriers to channel universal compassion and planetary healing.",

    "11-Air": "Electrified Oracle: Channeling lightning-speed intuitive downloads and modern visionary technology.",
    "11-Water": "Psychic Vessel: Oceanic spiritual sensitivity, healing human trauma through transcendent frequency.",
    "11-Fire": "Spiritual Spark: Inspiring massive awakenings with electrifying charisma and moral fire.",
    "11-Earth": "Grounded Visionary: Anchoring high spiritual revelations into practical community reality.",

    "22-Earth": "Cosmic Engineer: Physical manifestation of monumental world infrastructure and enduring civilizations.",
    "22-Air": "Grand Strategic Architect: Designing global systems of governance, economics, and universal knowledge.",
    "22-Fire": "Transformative Builder: Mobilizing massive collective energy to construct world-changing physical wonders.",
    "22-Water": "Sacred Architect: Creating sanctuaries and healing environments of global magnitude.",

    "33-Water": "Universal Healer: Embodying divine cosmic compassion, soothing planetary suffering through living grace.",
    "33-Fire": "Radiant Spiritual Guide: Uplifting humanity through transformative spiritual devotion and magnetic joy.",
    "33-Air": "Universal Teacher: Transmitting eternal metaphysical wisdom to illuminate millions.",
    "33-Earth": "Sanctuary of Grace: Providing tangible, unshakeable sanctuary and loving sustenance for all living things."
  };

  const key = `${lifePathVal}-${signElement}`;
  const synthesis = matrix[key] || `${lpInfo.title} filtered through the ${signElement} essence of ${signName}.`;

  return {
    title: `${lpInfo.title} (${signName} Solar Overlay)`,
    text: synthesis,
    element: signElement
  };
}

/**
 * Synthesize Soul Urge with Moon Sign
 */
export function synthesizeSoulUrgeMoon(soulUrgeVal, moonData) {
  const suInfo = CORE_NUMBERS_DATA[soulUrgeVal] || CORE_NUMBERS_DATA[1];
  const moonSign = moonData && moonData.sign ? moonData.sign.name : "Lunar Sphere";
  const moonElement = moonData && moonData.sign ? moonData.sign.element : "Water";

  return {
    title: `Inner Drive ${soulUrgeVal} (${moonSign} Moon)`,
    text: `Your subconscious emotional sanctuary (Moon in ${moonSign}) seeks nourishment through ${suInfo.keyword.toLowerCase()}. You find internal peace when your instinctive emotional needs are aligned with your soul's desire for authentic expression.`,
    element: moonElement
  };
}

/**
 * Synthesize Personality with Ascendant (Rising Sign)
 */
export function synthesizePersonalityAscendant(personalityVal, ascendantData) {
  const pInfo = CORE_NUMBERS_DATA[personalityVal] || CORE_NUMBERS_DATA[1];
  if (!ascendantData || !ascendantData.available || !ascendantData.sign) {
    return {
      title: `Outer Persona ${personalityVal}`,
      text: `Your social aura projects the qualities of ${pInfo.title}: ${pInfo.personality.summary}`,
      ascendantAvailable: false
    };
  }

  const ascSign = ascendantData.sign.name;
  return {
    title: `Outer Persona ${personalityVal} (${ascSign} Rising)`,
    text: `The world first perceives you through the lens of ${ascSign} Rising combined with Personality Vibration ${personalityVal}. You project ${pInfo.personality.projection.toLowerCase()} with the distinct stylistic demeanor and physical presence of ${ascSign}.`,
    ascendantAvailable: true
  };
}

/**
 * Generate Comprehensive Life Mandate
 */
export function generateLifeMandate(blueprint, astrologyProfile) {
  const lp = blueprint.core.lifePath.value;
  const dest = blueprint.core.destiny.value;
  const su = blueprint.core.soulUrge.value;
  const sun = astrologyProfile.sunSign.name;
  const lpData = CORE_NUMBERS_DATA[lp] || CORE_NUMBERS_DATA[1];
  const destData = CORE_NUMBERS_DATA[dest] || CORE_NUMBERS_DATA[1];

  let mandate = `You are a sovereign cosmic archetype carrying the **Life Path ${lp} (${lpData.title})** and the **Destiny ${dest} (${destData.title})**, under the solar banner of **${sun}**. `;
  mandate += `Your overarching evolutionary purpose is ${lpData.lifePath.corePurpose.toLowerCase()} `;
  mandate += `You are equipped with natural gifts in ${destData.destiny.talents.toLowerCase()} `;
  mandate += `When you master your shadow lessons of ${lpData.lifePath.shadow.toLowerCase()}, your presence becomes an unshakeable catalyst for your community and civilization.`;

  return mandate;
}
