/**
 * AETHERIA - Export, Print, and Profile Persistence Engine
 * Manages User-scoped client dossiers, Markdown summary generation, and PDF printing.
 */

import { authManager } from "./auth.js";

const STORAGE_KEY = "aetheria_saved_profiles";

/**
 * Get all saved profiles for the current user
 */
export function getSavedProfiles() {
  if (authManager && authManager.currentUser) {
    return authManager.getUserProfiles();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save a profile for the current user
 */
export function saveProfile(profileData) {
  const id = profileData.id || `profile_${Date.now()}`;
  const timestamp = new Date().toISOString();
  const newEntry = {
    ...profileData,
    id,
    updatedAt: timestamp
  };

  if (authManager && authManager.currentUser) {
    authManager.saveUserProfile(newEntry);
    return newEntry;
  }

  try {
    const profiles = getSavedProfiles();
    const existingIndex = profiles.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
      profiles[existingIndex] = newEntry;
    } else {
      profiles.unshift(newEntry);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return newEntry;
  } catch (e) {
    return null;
  }
}

/**
 * Delete a profile for the current user
 */
export function deleteProfile(id) {
  if (authManager && authManager.currentUser) {
    return authManager.deleteUserProfile(id);
  }
  try {
    const profiles = getSavedProfiles().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Generate Markdown Formatted Executive Reading Report
 */
export function generateMarkdownReport(blueprint, astrologyProfile, forecasting) {
  const lp = blueprint.core.lifePath.value;
  const dest = blueprint.core.destiny.value;
  const su = blueprint.core.soulUrge.value;
  const pers = blueprint.core.personality.value;
  const bday = blueprint.core.birthday.value;
  const mat = blueprint.core.maturity.value;

  const sun = astrologyProfile.sunSign ? astrologyProfile.sunSign.name : "N/A";
  const moon = astrologyProfile.moonData && astrologyProfile.moonData.sign ? astrologyProfile.moonData.sign.name : "N/A";
  const asc = astrologyProfile.ascendantData && astrologyProfile.ascendantData.available ? `${astrologyProfile.ascendantData.sign.name} (${astrologyProfile.ascendantData.degree}°)` : "Time Unknown";

  let md = `# AETHERIA • Master Numerology & Astrological Synthesis Dossier\n\n`;
  md += `**Subject Name:** ${blueprint.birthName}\n`;
  if (blueprint.hasNameShift) {
    md += `**Current Working Name:** ${blueprint.currentName}\n`;
  }
  md += `**Birth Date:** ${blueprint.birthDate}\n`;
  md += `**Birth Time & Place:** ${blueprint.birthTime || "N/A"} | ${blueprint.birthPlace || "N/A"}\n`;
  md += `**Forecast Date Target:** ${blueprint.forecastDate}\n`;
  md += `**Calculation System:** ${blueprint.system.toUpperCase()}\n\n`;

  md += `---\n\n`;
  md += `## 1. Core Numerology Blueprint\n\n`;
  md += `* **Life Path Number: ${lp}**\n`;
  md += `* **Destiny / Expression Number: ${dest}**\n`;
  md += `* **Soul Urge / Heart's Desire: ${su}**\n`;
  md += `* **Personality Number: ${pers}**\n`;
  md += `* **Birthday Number: ${bday}** (Day ${blueprint.core.birthday.day})\n`;
  md += `* **Maturity Number: ${mat}**\n\n`;

  md += `## 2. Advanced & Secondary Elements\n\n`;
  md += `* **Attitude Number:** ${blueprint.advanced.attitude.value}\n`;
  md += `* **Balance Number:** ${blueprint.advanced.balance.value}\n`;
  md += `* **Karmic Debts:** ${blueprint.advanced.karmicDebts.length > 0 ? blueprint.advanced.karmicDebts.join(", ") : "None (Clean Slate)"}\n`;
  md += `* **Main Challenge (Lifelong):** Challenge ${blueprint.advanced.challenges.c3}\n`;
  md += `* **Pinnacle Cycles:** ${blueprint.advanced.pinnacles.map(p => `P${p.pinnacleIndex}: ${p.number}`).join(" | ")}\n\n`;

  if (blueprint.hasNameShift) {
    md += `## 3. Name Shift Analysis\n\n`;
    md += `* **Birth Expression (${blueprint.nameShift.birth.destiny.value}) ➔ Current Expression (${blueprint.nameShift.current.destiny.value})**\n`;
    md += `* **Birth Soul Urge (${blueprint.nameShift.birth.soulUrge.value}) ➔ Current Soul Urge (${blueprint.nameShift.current.soulUrge.value})**\n`;
    md += `* **Birth Personality (${blueprint.nameShift.birth.personality.value}) ➔ Current Personality (${blueprint.nameShift.current.personality.value})**\n\n`;
  }

  md += `## 4. Timing & Forecasting (${forecasting.forecastYear})\n\n`;
  md += `* **Personal Year:** ${forecasting.personalYear.value} (${forecasting.personalYear.data.theme})\n`;
  md += `* **Personal Month:** ${forecasting.personalMonth.value} (${forecasting.personalMonth.data.title})\n`;
  md += `* **Personal Day:** ${forecasting.personalDay.value} (${forecasting.personalDay.data.title})\n`;
  md += `* **9-Year Epicycle Stage:** Year ${forecasting.personalYear.epicyclePhase} of 9\n\n`;

  md += `## 5. Astrological Synthesis\n\n`;
  md += `* **Sun Sign:** ${sun} (${astrologyProfile.sunSign.element} Element)\n`;
  md += `* **Moon Sign:** ${moon} (~${astrologyProfile.moonData.degree}°)\n`;
  md += `* **Ascendant (Rising):** ${asc}\n`;
  md += `* **Elemental Balance:** Fire ${astrologyProfile.elemental.percentages.Fire}% | Earth ${astrologyProfile.elemental.percentages.Earth}% | Air ${astrologyProfile.elemental.percentages.Air}% | Water ${astrologyProfile.elemental.percentages.Water}%\n\n`;

  md += `---\n`;
  md += `*Generated via AETHERIA Master Esoteric & Astrological Platform*\n`;

  return md;
}

/**
 * Copy text to clipboard helper
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    return false;
  }
}
