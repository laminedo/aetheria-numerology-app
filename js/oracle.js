/**
 * AETHERIA - Esoteric Oracle & Chart Advisor Engine
 * Synthesizes user questions through the subject's complete cosmic blueprint.
 */

import { CORE_NUMBERS_DATA, KARMIC_DEBTS_DATA } from "./data/interpretations.js";
import { NUMBER_REMEDIES } from "./data/remedies.js";

export function consultOracle(questionText, blueprint, astrologyProfile, forecasting) {
  if (!questionText || !blueprint || !astrologyProfile || !forecasting) {
    return "Please provide a valid question and ensure your cosmic blueprint is calculated.";
  }

  const q = questionText.toLowerCase().trim();
  const lp = blueprint.core.lifePath.value;
  const dest = blueprint.core.destiny.value;
  const su = blueprint.core.soulUrge.value;
  const py = forecasting.personalYear.value;
  const pm = forecasting.personalMonth.value;
  const sun = astrologyProfile.sunSign.name;
  const moon = astrologyProfile.moonData && astrologyProfile.moonData.sign ? astrologyProfile.moonData.sign.name : "Cosmic";
  const asc = astrologyProfile.ascendantData && astrologyProfile.ascendantData.available ? astrologyProfile.ascendantData.sign.name : "Rising";

  const lpData = CORE_NUMBERS_DATA[lp] || CORE_NUMBERS_DATA[1];
  const remedies = NUMBER_REMEDIES[lp] || NUMBER_REMEDIES[1];

  let topic = "general";
  if (q.includes("career") || q.includes("job") || q.includes("business") || q.includes("work") || q.includes("money") || q.includes("finance") || q.includes("wealth")) {
    topic = "career";
  } else if (q.includes("love") || q.includes("relationship") || q.includes("partner") || q.includes("marriage") || q.includes("romance") || q.includes("soulmate")) {
    topic = "love";
  } else if (q.includes("year") || q.includes("timing") || q.includes("when") || q.includes("2026") || q.includes("2027") || q.includes("now") || q.includes("future")) {
    topic = "timing";
  } else if (q.includes("karma") || q.includes("debt") || q.includes("lesson") || q.includes("past") || q.includes("shadow")) {
    topic = "karma";
  } else if (q.includes("purpose") || q.includes("calling") || q.includes("spiritual") || q.includes("why am i") || q.includes("path")) {
    topic = "purpose";
  }

  let diagnosis = "";
  let timingAdvice = "";
  let actionableStep = "";

  if (topic === "career") {
    diagnosis = `Your vocational resonance is anchored in **Life Path ${lp} (${lpData.title})** and **Destiny ${dest}**, filtered through the ${astrologyProfile.sunSign.element} solar drive of **${sun}**. In professional endeavors, you excel when your natural talents in *${CORE_NUMBERS_DATA[dest].destiny.talents.toLowerCase()}* are granted autonomy rather than forced into bureaucratic restriction.`;
    timingAdvice = `You are currently operating in **Personal Year ${py}** (${forecasting.personalYear.data.theme}) and **Personal Month ${pm}**. `;
    if ([1, 8].includes(py)) {
      timingAdvice += "This is an extraordinary high-power cycle to demand executive authority, scale commercial ventures, negotiate contracts, and initiate bold career leaps.";
    } else if ([4, 7].includes(py)) {
      timingAdvice += "This phase favors deep structural systematization, technical mastery, and strategic preparation rather than reckless external gambles.";
    } else {
      timingAdvice += "Maintain dynamic adaptability. Build high-value alliances and allow your creative reputation to expand organically.";
    }
    actionableStep = `Align your immediate work with **${remedies.dailyFocus}** Work with **${remedies.crystals[0]}** or **${remedies.crystals[1]}** to amplify your strategic clarity.`;

  } else if (topic === "love") {
    diagnosis = `Your intimate emotional sanctuary is governed by **Soul Urge ${su}** and your **Moon in ${moon}**. At your core, ${CORE_NUMBERS_DATA[su].soulUrge.summary.toLowerCase()} You thrive in partnerships where your partner respects your sovereign rhythm and provides emotional safety.`;
    timingAdvice = `In your current **Personal Year ${py}**, relationship dynamics reflect ${forecasting.personalYear.data.theme.toLowerCase()}. `;
    if ([2, 6, 9].includes(py)) {
      timingAdvice += "This is a peak cycle for deepening emotional intimacy, resolving old family wounds, or meeting a partner who aligns with your core evolutionary trajectory.";
    } else if ([1, 5, 7].includes(py)) {
      timingAdvice += "This cycle emphasizes self-individuation. Ensure you maintain healthy personal boundaries without losing your sovereign independence.";
    } else {
      timingAdvice += "Solidify mutual loyalty through clear shared goals and transparent communication.";
    }
    actionableStep = `Practice the sacred mantra: *"I honor my intuitive sensitivity. Sacred cooperation flows effortlessly through my boundaries."* Consider carrying **Rose Quartz** or **Moonstone** to soften emotional friction.`;

  } else if (topic === "timing") {
    diagnosis = `Your current cycle is guided by the **9-Year Epicycle Stage ${forecasting.personalYear.epicyclePhase}/9**, carrying the vibration of **Personal Year ${py}** (${forecasting.personalYear.data.theme}) and **Personal Month ${pm}**.`;
    timingAdvice = `Right now, the universal tides are asking you to focus on: *${forecasting.personalYear.data.focus}* Avoid the common trap of *${forecasting.personalYear.data.caution.toLowerCase()}*`;
    actionableStep = `Honor the natural pace of this season. Planting seeds during Year 1-3, building foundations in Year 4-7, and harvesting rewards in Year 8-9 creates effortless flow with cosmic timing.`;

  } else if (topic === "karma") {
    const debts = blueprint.advanced.karmicDebts;
    if (debts.length > 0) {
      const debtInfo = KARMIC_DEBTS_DATA[debts[0]];
      diagnosis = `Your blueprint carries the sacred **Karmic Debt ${debts.join(", ")}** (${debtInfo.name}). This indicates a specialized evolutionary test: *${debtInfo.lesson}*`;
      timingAdvice = `In Personal Year ${py}, past karmic patterns are illuminated for final transmutation. Obstacles are not punishments, but precise alchemical weight-training for your soul.`;
      actionableStep = `Apply this actionable remedy: *${debtInfo.guidance}*`;
    } else {
      diagnosis = `You carry a **Clean Slate • Pristine Karmic Balance**. You are not burdened by severe karmic debts from prior cycles, meaning your primary life challenges are fresh choices of free will.`;
      timingAdvice = `Your main growth challenge is **Challenge ${blueprint.advanced.challenges.c3}**. Focus on mastering emotional equilibrium and trusting your innate capabilities.`;
      actionableStep = `Ground your energy daily using **Clear Quartz** or **Black Tourmaline**.`;
    }

  } else {
    diagnosis = `You stand as a **Life Path ${lp} (${lpData.title})** with **Sun in ${sun}**, **Moon in ${moon}**, and **${asc} Rising**. Your overarching cosmic mandate is: *${lpData.lifePath.corePurpose}*`;
    timingAdvice = `You are navigating **Personal Year ${py}** (${forecasting.personalYear.data.theme}). The universe is currently asking you to align your daily efforts with *${forecasting.personalYear.data.focus}*`;
    actionableStep = `Daily decree: *"${remedies.mantra}"* Focus on: *${remedies.dailyFocus}*`;
  }

  return `
    <div class="oracle-response-card">
      <div class="oracle-response-section">
        <h4 style="color: var(--gold-primary); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>🔮</span> 1. Cosmic Chart Diagnosis
        </h4>
        <p style="font-size: 0.92rem; line-height: 1.7;">${diagnosis}</p>
      </div>

      <div class="oracle-response-section" style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <h4 style="color: var(--gold-primary); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>⏳</span> 2. Timing & Active Cycle Alignment
        </h4>
        <p style="font-size: 0.92rem; line-height: 1.7;">${timingAdvice}</p>
      </div>

      <div class="oracle-response-section" style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <h4 style="color: var(--gold-primary); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>✨</span> 3. Alchemical Guidance & Action
        </h4>
        <p style="font-size: 0.92rem; line-height: 1.7; color: var(--text-primary); font-style: italic;">${actionableStep}</p>
      </div>
    </div>
  `;
}
