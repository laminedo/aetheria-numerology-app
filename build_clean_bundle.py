import re
import os
import subprocess

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Strip import statements
    text = re.sub(r'import\s+.*?from\s+[\'"][^\'"]+[\'"];?', '', text)
    text = re.sub(r'import\s+[\'"][^\'"]+[\'"];?', '', text)
    
    # Strip export declarations
    text = re.sub(r'export\s+(async\s+)?(function|const|let|var|class)\s+', r'\1\2 ', text)
    text = re.sub(r'export\s+default\s+', '', text)
    text = re.sub(r'export\s*\{[^}]*\}\s*;?', '', text)
    return text

def main():
    files = [
        'js/data/interpretations.js',
        'js/data/presets.js',
        'js/data/cities.js',
        'js/data/remedies.js',
        'js/data/business.js',
        'js/auth.js',
        'js/numerology.js',
        'js/astrology.js',
        'js/loshu.js',
        'js/natalwheel.js',
        'js/planetaryhours.js',
        'js/audio.js',
        'js/businessengine.js',
        'js/oracle.js',
        'js/synthesis.js',
        'js/forecasting.js',
        'js/export.js'
    ]

    modules_code = []
    for f in files:
        modules_code.append(clean_file(f))

    # Add the unified controller code
    controller_code = '''
// ==========================================================================
// UNIFIED APPLICATION CONTROLLER & AUTH INTEGRATION
function getCoreData(num) {
  return (CORE_NUMBERS_DATA && CORE_NUMBERS_DATA[num]) ? CORE_NUMBERS_DATA[num] : CORE_NUMBERS_DATA[1];
}
// ==========================================================================

const state = {
  system: "pythagorean",
  blueprint: null,
  astrology: null,
  forecasting: null,
  loshu: null,
  activeTab: "tab-core",
  activeTone: 432,
  signupSelectedSigil: "☉"
};

function initApp() {
  initPresets();
  initCitiesDatalist();
  initSolfeggioUI();
  initAuthUI();
  initEventListeners();
  updateSavedProfilesCount();
  runCalculation();

  setInterval(function() {
    if (state.activeTab === "tab-synthesis") {
      renderPlanetaryHours();
    }
  }, 60000);
}

function initPresets() {
  const presetSelect = document.getElementById("preset-select");
  if (!presetSelect) return;
  presetSelect.innerHTML = '<option value="">— Select a Master Blueprint —</option>';
  PRESET_PROFILES.forEach(function(preset) {
    const opt = document.createElement("option");
    opt.value = preset.id;
    opt.textContent = preset.name + " (" + preset.subtitle + ")";
    presetSelect.appendChild(opt);
  });
}

function initCitiesDatalist() {
  const citiesDatalist = document.getElementById("cities-datalist");
  if (!citiesDatalist) return;
  citiesDatalist.innerHTML = "";
  CITIES_DATABASE.forEach(function(city) {
    const opt = document.createElement("option");
    opt.value = city.name;
    citiesDatalist.appendChild(opt);
  });
}

function initAuthUI() {
  authManager.onAuthChange(function(user) {
    updateAuthHeaderUI(user);
    updateSavedProfilesCount();
  });

  const sigilContainer = document.getElementById("signup-sigil-picker");
  if (sigilContainer) {
    sigilContainer.innerHTML = "";
    COSMIC_SIGILS.forEach(function(sig) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sigil-choice-btn" + (sig.symbol === state.signupSelectedSigil ? " selected" : "");
      btn.textContent = sig.symbol;
      btn.title = sig.label;
      btn.addEventListener("click", function() {
        document.querySelectorAll(".sigil-choice-btn").forEach(function(b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        state.signupSelectedSigil = sig.symbol;
      });
      sigilContainer.appendChild(btn);
    });
  }

  const tabProfile = document.getElementById("tab-auth-profile");
  const tabSignin = document.getElementById("tab-auth-signin");
  const tabSignup = document.getElementById("tab-auth-signup");

  const paneProfile = document.getElementById("auth-pane-profile");
  const paneSignin = document.getElementById("auth-pane-signin");
  const paneSignup = document.getElementById("auth-pane-signup");

  function switchAuthTab(activeTab, activePane) {
    [tabProfile, tabSignin, tabSignup].forEach(function(t) { if (t) t.classList.remove("active"); });
    [paneProfile, paneSignin, paneSignup].forEach(function(p) { if (p) p.style.display = "none"; });
    if (activeTab) activeTab.classList.add("active");
    if (activePane) activePane.style.display = "block";
  }

  if (tabProfile) tabProfile.addEventListener("click", function() { switchAuthTab(tabProfile, paneProfile); });
  if (tabSignin) tabSignin.addEventListener("click", function() { switchAuthTab(tabSignin, paneSignin); });
  if (tabSignup) tabSignup.addEventListener("click", function() { switchAuthTab(tabSignup, paneSignup); });

  const formSignin = document.getElementById("form-signin");
  if (formSignin) {
    formSignin.addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("signin-email").value;
      const pin = document.getElementById("signin-pin").value;
      try {
        const user = authManager.signIn(email, pin);
        showToast("Welcome back, " + user.name + "! Vault unlocked.", "success");
        switchAuthTab(tabProfile, paneProfile);
        closeModal(document.getElementById("auth-modal"));
        runCalculation();
      } catch (err) {
        showToast(err.message, "error");
      }
    });
  }

  const formSignup = document.getElementById("form-signup");
  if (formSignup) {
    formSignup.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const pin = document.getElementById("signup-pin").value;
      try {
        const user = authManager.signUp(name, email, pin, state.signupSelectedSigil);
        showToast("Account created for " + user.name + "! Vault initialized.", "success");
        switchAuthTab(tabProfile, paneProfile);
        closeModal(document.getElementById("auth-modal"));
        runCalculation();
      } catch (err) {
        showToast(err.message, "error");
      }
    });
  }

  const btnVaultExport = document.getElementById("btn-vault-export");
  if (btnVaultExport) {
    btnVaultExport.addEventListener("click", function() {
      const backup = authManager.exportVaultBackup();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "aetheria_vault_backup_" + Date.now() + ".json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Encrypted Vault Backup downloaded!", "success");
    });
  }

  const btnVaultImport = document.getElementById("btn-vault-import");
  const vaultFileInput = document.getElementById("vault-file-input");
  if (btnVaultImport && vaultFileInput) {
    btnVaultImport.addEventListener("click", function() { vaultFileInput.click(); });
    vaultFileInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const parsed = JSON.parse(evt.target.result);
          authManager.importVaultBackup(parsed);
          showToast("Vault restored successfully from backup!", "success");
          updateSavedProfilesCount();
          runCalculation();
        } catch (err) {
          showToast("Invalid backup file format.", "error");
        }
      };
      reader.readAsText(file);
    });
  }

  const btnBannerLogin = document.getElementById("btn-banner-login");
  if (btnBannerLogin) {
    btnBannerLogin.addEventListener("click", function() {
      switchAuthTab(tabSignin, paneSignin);
      openModal(document.getElementById("auth-modal"));
    });
  }

  const btnBannerSignup = document.getElementById("btn-banner-signup");
  if (btnBannerSignup) {
    btnBannerSignup.addEventListener("click", function() {
      switchAuthTab(tabSignup, paneSignup);
      openModal(document.getElementById("auth-modal"));
    });
  }

  const btnUserAccount = document.getElementById("btn-user-account");
  if (btnUserAccount) {
    btnUserAccount.addEventListener("click", function() {
      const activeUser = authManager.getActiveUser();
      if (activeUser && activeUser.id !== "guest") {
        switchAuthTab(tabProfile, paneProfile);
      } else {
        switchAuthTab(tabSignin, paneSignin);
      }
      openModal(document.getElementById("auth-modal"));
    });
  }

  const btnSwitch = document.getElementById("btn-switch-account");
  if (btnSwitch) {
    btnSwitch.addEventListener("click", function() {
      switchAuthTab(tabSignin, paneSignin);
    });
  }

  const btnSignout = document.getElementById("btn-signout");
  if (btnSignout) {
    btnSignout.addEventListener("click", function() {
      authManager.signOut();
      showToast("Signed out of vault", "info");
      switchAuthTab(tabSignin, paneSignin);
    });
  }
}

function updateAuthHeaderUI(user) {
  const sigilEl = document.getElementById("header-user-sigil");
  const nameEl = document.getElementById("header-user-name");
  const roleEl = document.getElementById("header-user-role");

  const bannerSigilEl = document.getElementById("banner-user-sigil");
  const bannerNameEl = document.getElementById("banner-user-name");
  const bannerRoleEl = document.getElementById("banner-user-role");

  const vaultSigilEl = document.getElementById("vault-user-sigil");
  const vaultNameEl = document.getElementById("vault-user-name");
  const vaultEmailEl = document.getElementById("vault-user-email");
  const vaultCountEl = document.getElementById("vault-profile-count");

  if (user) {
    if (sigilEl) sigilEl.textContent = user.sigil || "☉";
    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role || "Master";

    if (bannerSigilEl) bannerSigilEl.textContent = user.sigil || "☉";
    if (bannerNameEl) bannerNameEl.textContent = user.name;
    if (bannerRoleEl) bannerRoleEl.textContent = user.role || "Master";

    if (vaultSigilEl) vaultSigilEl.textContent = user.sigil || "☉";
    if (vaultNameEl) vaultNameEl.textContent = user.name;
    if (vaultEmailEl) vaultEmailEl.textContent = user.email;
    if (vaultCountEl) vaultCountEl.textContent = (user.profiles || []).length;
  } else {
    if (sigilEl) sigilEl.textContent = "🔒";
    if (nameEl) nameEl.textContent = "Log In / Sign Up";
    if (roleEl) roleEl.textContent = "Guest";

    if (bannerSigilEl) bannerSigilEl.textContent = "🔒";
    if (bannerNameEl) bannerNameEl.textContent = "Guest Mode";
    if (bannerRoleEl) bannerRoleEl.textContent = "Not Signed In";

    if (vaultNameEl) vaultNameEl.textContent = "Guest Mode";
    if (vaultEmailEl) vaultEmailEl.textContent = "Sign in to save profiles";
    if (vaultCountEl) vaultCountEl.textContent = "0";
  }
}

function initSolfeggioUI() {
  const grid = document.getElementById("frequency-pill-grid");
  if (!grid) return;
  grid.innerHTML = "";

  SOLFEGGIO_FREQUENCIES.forEach(function(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "freq-btn" + (item.freq === state.activeTone ? " active" : "");
    btn.dataset.freq = item.freq;
    btn.innerHTML = '<div style="font-weight: 700; font-size: 0.95rem; color: var(--gold-primary); margin-bottom: 2px;">' + item.name + '</div>' +
      '<div style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.4;">' + item.purpose + '</div>' +
      '<div style="font-size: 0.7rem; color: var(--gold-muted); margin-top: 4px;">Chakra: ' + item.chakra + '</div>';

    btn.addEventListener("click", function() {
      document.querySelectorAll(".freq-btn").forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.activeTone = item.freq;
      const labelEl = document.getElementById("active-tone-label");
      if (labelEl) labelEl.textContent = item.name;

      if (audioSynthesizer.isPlaying) {
        const timerSelect = document.getElementById("solfeggio-timer");
        const timerVal = timerSelect ? parseInt(timerSelect.value, 10) : 0;
        audioSynthesizer.play(item.freq, timerVal);
      }
      showToast("Selected frequency: " + item.name, "info");
    });

    grid.appendChild(btn);
  });

  const btnToggle = document.getElementById("btn-toggle-audio");
  const playIcon = document.getElementById("audio-play-icon");
  const volumeSlider = document.getElementById("solfeggio-volume");
  const timerSelect = document.getElementById("solfeggio-timer");

  if (btnToggle) {
    btnToggle.addEventListener("click", function() {
      if (audioSynthesizer.isPlaying) {
        audioSynthesizer.stop();
      } else {
        const timerVal = timerSelect ? parseInt(timerSelect.value, 10) : 0;
        audioSynthesizer.play(state.activeTone, timerVal);
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", function(e) {
      audioSynthesizer.setVolume(parseFloat(e.target.value));
    });
  }

  audioSynthesizer.onStateChange(function(st) {
    if (btnToggle) btnToggle.classList.toggle("active", st.isPlaying);
    if (playIcon) {
      playIcon.innerHTML = st.isPlaying 
        ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
        : '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    }
  });
}

function initEventListeners() {
  const form = document.getElementById("blueprint-form");
  const presetSelect = document.getElementById("preset-select");
  const btnSavedProfiles = document.getElementById("btn-saved-profiles");
  const btnUserAccount = document.getElementById("btn-user-account");
  const btnCopyReport = document.getElementById("btn-copy-report");
  const btnPrintDossier = document.getElementById("btn-print-dossier");
  const btnSaveCurrent = document.getElementById("btn-save-current");
  const btnPythagorean = document.getElementById("btn-system-pythagorean");
  const btnChaldean = document.getElementById("btn-system-chaldean");
  const chkUnknownTime = document.getElementById("chk-unknown-time");
  const chkSameName = document.getElementById("chk-same-name");
  const inputBirthTime = document.getElementById("input-birth-time");
  const inputCurrentName = document.getElementById("input-current-name");

  const inspectorModal = document.getElementById("inspector-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const savedProfilesModal = document.getElementById("saved-profiles-modal");
  const savedModalCloseBtn = document.getElementById("saved-modal-close-btn");
  const authModal = document.getElementById("auth-modal");
  const authModalCloseBtn = document.getElementById("auth-modal-close-btn");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      runCalculation();
      showToast("Master Blueprint generated successfully", "success");
    });
  }

  if (presetSelect) {
    presetSelect.addEventListener("change", function(e) {
      const selectedId = e.target.value;
      if (!selectedId) return;
      const preset = PRESET_PROFILES.find(function(p) { return p.id === selectedId; });
      if (preset) {
        document.getElementById("input-birth-date").value = preset.birthDate;
        document.getElementById("input-birth-time").value = preset.birthTime;
        document.getElementById("input-birth-place").value = preset.birthPlace;
        document.getElementById("input-birth-name").value = preset.birthName;
        document.getElementById("input-current-name").value = preset.currentName;
        document.getElementById("input-forecast-date").value = preset.forecastDate || "2026-08-13";
        
        if (chkUnknownTime) {
          chkUnknownTime.checked = !preset.birthTime;
          if (inputBirthTime) inputBirthTime.disabled = !preset.birthTime;
        }
        if (chkSameName) chkSameName.checked = preset.birthName === preset.currentName;
        
        runCalculation();
        showToast("Loaded " + preset.name + "'s master profile", "success");
      }
    });
  }

  if (btnPythagorean) btnPythagorean.addEventListener("click", function() { setSystem("pythagorean"); });
  if (btnChaldean) btnChaldean.addEventListener("click", function() { setSystem("chaldean"); });

  if (chkUnknownTime) {
    chkUnknownTime.addEventListener("change", function(e) {
      if (inputBirthTime) {
        inputBirthTime.disabled = e.target.checked;
        if (e.target.checked) inputBirthTime.value = "";
      }
    });
  }

  if (chkSameName) {
    chkSameName.addEventListener("change", function(e) {
      if (inputCurrentName) {
        if (e.target.checked) {
          inputCurrentName.value = document.getElementById("input-birth-name").value;
          inputCurrentName.disabled = true;
        } else {
          inputCurrentName.disabled = false;
        }
      }
    });
  }

  document.querySelectorAll(".tab-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const targetTab = btn.dataset.tab;
      switchTab(targetTab);
    });
  });

  if (btnCopyReport) btnCopyReport.addEventListener("click", handleCopyReport);
  if (btnPrintDossier) btnPrintDossier.addEventListener("click", handlePrintDossier);
  if (btnSaveCurrent) btnSaveCurrent.addEventListener("click", handleSaveCurrentProfile);
  if (btnSavedProfiles) btnSavedProfiles.addEventListener("click", openSavedProfilesModal);

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", function() { closeModal(inspectorModal); });
  if (savedModalCloseBtn) savedModalCloseBtn.addEventListener("click", function() { closeModal(savedProfilesModal); });
  if (authModalCloseBtn) authModalCloseBtn.addEventListener("click", function() { closeModal(authModal); });

  window.addEventListener("click", function(e) {
    if (e.target === inspectorModal) closeModal(inspectorModal);
    if (e.target === savedProfilesModal) closeModal(savedProfilesModal);
    if (e.target === authModal) closeModal(authModal);
  });

  const btnCalcBusiness = document.getElementById("btn-calc-business");
  if (btnCalcBusiness) {
    btnCalcBusiness.addEventListener("click", handleCalculateBusiness);
  }

  const btnCalcAddress = document.getElementById("btn-calc-address");
  if (btnCalcAddress) {
    btnCalcAddress.addEventListener("click", handleCalculateAddress);
  }

  const btnAskOracle = document.getElementById("btn-ask-oracle");
  const oracleInput = document.getElementById("oracle-question-input");
  if (btnAskOracle && oracleInput) {
    btnAskOracle.addEventListener("click", function() {
      handleAskOracle(oracleInput.value);
    });
    oracleInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        handleAskOracle(oracleInput.value);
      }
    });
  }

  document.querySelectorAll(".quick-prompt-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const prompt = btn.dataset.prompt;
      if (oracleInput) oracleInput.value = prompt;
      handleAskOracle(prompt);
    });
  });

  const btnCompat = document.getElementById("btn-calculate-compat");
  if (btnCompat) btnCompat.addEventListener("click", handleCalculateCompatibility);
}

function setSystem(newSystem) {
  if (state.system === newSystem) return;
  state.system = newSystem;

  const btnPythagorean = document.getElementById("btn-system-pythagorean");
  const btnChaldean = document.getElementById("btn-system-chaldean");
  if (btnPythagorean) btnPythagorean.classList.toggle("active", newSystem === "pythagorean");
  if (btnChaldean) btnChaldean.classList.toggle("active", newSystem === "chaldean");

  runCalculation();
  showToast("Switched to " + newSystem.toUpperCase() + " system", "info");
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll(".tab-btn").forEach(function(b) {
    const isActive = b.dataset.tab === tabId;
    b.classList.toggle("active", isActive);
    b.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  document.querySelectorAll(".tab-pane").forEach(function(p) {
    p.classList.toggle("active", p.id === tabId);
  });

  if (tabId === "tab-synthesis") {
    renderSection5AstroSynthesis();
  }
}

function runCalculation() {
  const birthDateInput = document.getElementById("input-birth-date");
  const birthNameInput = document.getElementById("input-birth-name");
  const birthTimeInput = document.getElementById("input-birth-time");
  const birthPlaceInput = document.getElementById("input-birth-place");
  const currentNameInput = document.getElementById("input-current-name");
  const forecastDateInput = document.getElementById("input-forecast-date");
  const chkUnknownTime = document.getElementById("chk-unknown-time");
  const chkSameName = document.getElementById("chk-same-name");

  const birthDate = birthDateInput ? birthDateInput.value : "1990-07-15";
  const birthName = birthNameInput ? birthNameInput.value : "Alexander James Sterling";
  const birthTime = (chkUnknownTime && chkUnknownTime.checked) ? "" : (birthTimeInput ? birthTimeInput.value : "14:30");
  const birthPlace = birthPlaceInput ? birthPlaceInput.value : "New York, USA";
  const currentName = (chkSameName && chkSameName.checked) ? birthName : (currentNameInput && currentNameInput.value ? currentNameInput.value : birthName);
  const forecastDate = forecastDateInput && forecastDateInput.value ? forecastDateInput.value : "2026-08-13";

  if (!birthDate || !birthName) return;

  state.blueprint = calculateFullBlueprint({
    birthDate: birthDate,
    birthTime: birthTime,
    birthPlace: birthPlace,
    birthName: birthName,
    currentName: currentName,
    forecastDate: forecastDate,
    system: state.system
  });

  state.astrology = calculateAstrologyProfile(birthDate, birthTime, birthPlace, state.blueprint);
  state.forecasting = calculatePersonalCycles(birthDate, forecastDate);
  state.loshu = calculateLoShuGrid(birthDate);

  renderPrintBanner();
  renderSection1Core();
  renderSection2Advanced();
  renderSection3NameShift();
  renderSection4Forecasting();
  renderSection5AstroSynthesis();
  renderSection6Remedies();
  handleCalculateBusiness();
  handleCalculateAddress();
}

function renderSection1Core() {
  const container = document.getElementById("core-blueprint-grid");
  if (!container || !state.blueprint) return;
  const b = state.blueprint.core;
  container.innerHTML = "";

  const items = [
    {
      num: b.lifePath.value,
      isMaster: b.lifePath.isMaster,
      tag: "Primary Life Purpose",
      title: "Life Path Number",
      archetype: getCoreData(b.lifePath.value).title,
      summary: getCoreData(b.lifePath.value).lifePath.summary,
      pills: getCoreData(b.lifePath.value).lifePath.vocations,
      type: "lifePath",
      isHighlight: true
    },
    {
      num: b.destiny.value,
      isMaster: b.destiny.isMaster,
      tag: "Innate Talents & Potential",
      title: "Destiny / Expression Number",
      archetype: getCoreData(b.destiny.value).title,
      summary: getCoreData(b.destiny.value).destiny.summary,
      pills: ["Talents: " + getCoreData(b.destiny.value).destiny.talents.split(",")[0], "Outer Potential"],
      type: "destiny"
    },
    {
      num: b.soulUrge.value,
      isMaster: b.soulUrge.isMaster,
      tag: "Subconscious Emotional Driver",
      title: "Soul Urge / Heart\\'s Desire",
      archetype: getCoreData(b.soulUrge.value).title,
      summary: getCoreData(b.soulUrge.value).soulUrge.summary,
      pills: ["Intimate Longings", "Core Drivers"],
      type: "soulUrge"
    },
    {
      num: b.personality.value,
      isMaster: b.personality.isMaster,
      tag: "Social Mask & Projection",
      title: "Personality Number",
      archetype: getCoreData(b.personality.value).title,
      summary: getCoreData(b.personality.value).personality.summary,
      pills: ["Social Aura", "First Impression"],
      type: "personality"
    },
    {
      num: b.birthday.value,
      isMaster: b.birthday.isMaster,
      tag: "Special Daily Gift",
      title: "Birthday Number (" + b.birthday.day + ")",
      archetype: getCoreData(b.birthday.value).title,
      summary: getCoreData(b.birthday.value).birthday.talent,
      pills: ["Day " + b.birthday.day + " Vibration", "Native Gift"],
      type: "birthday"
    },
    {
      num: b.maturity.value,
      isMaster: b.maturity.isMaster,
      tag: "Midlife Synthesis (Ages 35-45+)",
      title: "Maturity Number",
      archetype: getCoreData(b.maturity.value).title,
      summary: getCoreData(b.maturity.value).maturity.synthesis,
      pills: ["Life Path + Destiny", "Mature Mastery"],
      type: "maturity"
    }
  ];

  items.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "blueprint-card" + (item.isHighlight ? " highlight" : "");
    card.innerHTML = '<div>' +
      '<div class="card-top">' +
        '<div class="card-meta">' +
          '<span class="card-tag">' + item.tag + '</span>' +
          '<h3>' + item.title + '</h3>' +
          '<div class="card-archetype">' + item.archetype + '</div>' +
        '</div>' +
        '<div class="number-glyph-box' + (item.isMaster ? " master" : "") + '">' + item.num + '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<p>' + item.summary + '</p>' +
        '<div class="card-pill-list">' +
          item.pills.map(function(p) { return '<span class="card-pill">' + p + '</span>'; }).join("") +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="card-footer">' +
      '<button type="button" class="btn-inspect" data-inspect="' + item.type + '">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
        ' Inspect Formula & Reductions' +
      '</button>' +
    '</div>';

    card.querySelector(".btn-inspect").addEventListener("click", function() { openFormulaInspector(item.type); });
    container.appendChild(card);
  });
}

function renderSection2Advanced() {
  const adv = state.blueprint.advanced;
  const loshu = state.loshu;

  const loshuContainer = document.getElementById("loshu-container");
  if (loshuContainer && loshu) {
    let gridHtml = '<div class="loshu-grid-card">' +
      '<strong style="color: var(--gold-primary); font-family: var(--font-serif); font-size: 1.1rem;">3×3 Natal Magic Matrix</strong>' +
      '<table class="loshu-table">';

    LOSHU_LAYOUT.forEach(function(row) {
      gridHtml += "<tr>";
      row.forEach(function(cellNum) {
        const count = loshu.digitCounts[cellNum] || 0;
        const isPresent = count > 0;
        gridHtml += '<td class="' + (isPresent ? "present" : "empty") + '">' +
          '<div class="loshu-cell-num">' + cellNum + '</div>' +
          (isPresent ? '<span class="loshu-count-badge">' + (count > 1 ? "(" + count + "x)" : "✓") + '</span>' : '<span style="font-size: 0.65rem; color: var(--text-muted); opacity: 0.4;">—</span>') +
        '</td>';
      });
      gridHtml += "</tr>";
    });
    gridHtml += '</table>' +
      '<div style="font-size: 0.78rem; color: var(--text-muted);">' +
        'Planes: Mental (<strong>' + loshu.planes.mental + '</strong>) • Soul (<strong>' + loshu.planes.emotional + '</strong>) • Body (<strong>' + loshu.planes.physical + '</strong>)' +
      '</div>' +
    '</div>';

    let arrowsHtml = '<div class="arrows-list">';
    if (loshu.arrowsPresent.length === 0 && loshu.arrowsMissing.length === 0) {
      arrowsHtml += '<p style="color: var(--text-muted);">No complete 3-in-a-row arrows present or completely missing. A balanced baseline energy.</p>';
    }

    loshu.arrowsPresent.forEach(function(a) {
      arrowsHtml += '<div class="arrow-item-card">' +
        '<strong style="color: var(--gold-primary); display: block; font-size: 0.95rem; margin-bottom: 2px;">✨ ' + a.strengthTitle + ' (' + a.numbers.join("-") + ')</strong>' +
        '<div style="font-size: 0.82rem; color: var(--text-secondary);">' + a.strengthDesc + '</div>' +
      '</div>';
    });

    loshu.arrowsMissing.forEach(function(a) {
      arrowsHtml += '<div class="arrow-item-card loss">' +
        '<strong style="color: var(--stellar-crimson); display: block; font-size: 0.95rem; margin-bottom: 2px;">⚠️ ' + a.lossTitle + ' (Missing ' + a.numbers.join("-") + ')</strong>' +
        '<div style="font-size: 0.82rem; color: var(--text-secondary);">' + a.lossDesc + '</div>' +
      '</div>';
    });
    arrowsHtml += "</div>";

    loshuContainer.innerHTML = gridHtml + arrowsHtml;
  }

  const planesGrid = document.getElementById("planes-expression-grid");
  if (planesGrid) {
    const planes = calculatePlanesOfExpression(state.blueprint.birthName, state.system);
    planesGrid.innerHTML = '<div class="blueprint-card">' +
      '<span class="card-tag">Channel Distribution</span>' +
      '<h3>Four Expression Planes</h3>' +
      '<div class="elemental-meter-group" style="margin-top: 1rem;">' +
        '<div class="elemental-bar-item">' +
          '<div class="elemental-bar-label"><span>🧠 Mental Plane (' + planes.planes.Mental.count + ' letters)</span><strong>' + planes.percentages.Mental + '%</strong></div>' +
          '<div class="elemental-track"><div class="elemental-fill air" style="width: ' + planes.percentages.Mental + '%"></div></div>' +
        '</div>' +
        '<div class="elemental-bar-item">' +
          '<div class="elemental-bar-label"><span>🌱 Physical Plane (' + planes.planes.Physical.count + ' letters)</span><strong>' + planes.percentages.Physical + '%</strong></div>' +
          '<div class="elemental-track"><div class="elemental-fill earth" style="width: ' + planes.percentages.Physical + '%"></div></div>' +
        '</div>' +
        '<div class="elemental-bar-item">' +
          '<div class="elemental-bar-label"><span>❤️ Emotional Plane (' + planes.planes.Emotional.count + ' letters)</span><strong>' + planes.percentages.Emotional + '%</strong></div>' +
          '<div class="elemental-track"><div class="elemental-fill fire" style="width: ' + planes.percentages.Emotional + '%"></div></div>' +
        '</div>' +
        '<div class="elemental-bar-item">' +
          '<div class="elemental-bar-label"><span>🔮 Intuitive Plane (' + planes.planes.Intuitive.count + ' letters)</span><strong>' + planes.percentages.Intuitive + '%</strong></div>' +
          '<div class="elemental-track"><div class="elemental-fill water" style="width: ' + planes.percentages.Intuitive + '%"></div></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="blueprint-card">' +
      '<span class="card-tag">Subconscious Anchor</span>' +
      '<h3>Subconscious Self Number</h3>' +
      '<div class="number-glyph-box master" style="margin: 0.5rem 0;">' + planes.subconsciousSelf + ' / 9</div>' +
      '<p style="font-size: 0.88rem;">' +
        'Your subconscious reflex capacity is <strong>' + planes.subconsciousSelf + ' out of 9</strong>. This reflects your instinctive confidence when sudden crises disrupt ordinary plans.' +
      '</p>' +
    '</div>';
  }

  const bridgeGrid = document.getElementById("bridge-numbers-grid");
  if (bridgeGrid) {
    const bridges = calculateBridgeNumbers(
      state.blueprint.core.lifePath.value,
      state.blueprint.core.destiny.value,
      state.blueprint.core.soulUrge.value,
      state.blueprint.core.personality.value
    );
    bridgeGrid.innerHTML = '<div class="blueprint-card">' +
      '<span class="card-tag">Internal Alignment</span>' +
      '<h3>' + bridges.lpDestBridge.title + '</h3>' +
      '<p style="font-size: 0.88rem;">' + bridges.lpDestBridge.advice + '</p>' +
    '</div>' +
    '<div class="blueprint-card">' +
      '<span class="card-tag">Relational Alignment</span>' +
      '<h3>' + bridges.suPersBridge.title + '</h3>' +
      '<p style="font-size: 0.88rem;">' + bridges.suPersBridge.advice + '</p>' +
    '</div>';
  }

  const epochsGrid = document.getElementById("three-periods-grid");
  if (epochsGrid) {
    const epochs = calculateThreeLifePeriods(state.blueprint.birthDate, state.blueprint.core.lifePath.value);
    epochsGrid.innerHTML = "";
    epochs.forEach(function(ep) {
      const el = document.createElement("div");
      el.className = "pinnacle-item";
      el.innerHTML = '<div class="pinnacle-item-header">' +
        '<div>' +
          '<span class="pinnacle-label">' + ep.title + '</span>' +
          '<div style="font-size: 0.76rem; color: var(--gold-muted);">' + ep.ageSpan + '</div>' +
        '</div>' +
        '<div class="number-glyph-box number-glyph-sm">' + ep.number + '</div>' +
      '</div>' +
      '<p style="font-size: 0.85rem; margin-top: 0.5rem;">' + ep.desc + '</p>';
      epochsGrid.appendChild(el);
    });
  }

  const debtContainer = document.getElementById("karmic-debt-banner-container");
  if (debtContainer) {
    if (adv.karmicDebts.length === 0) {
      debtContainer.innerHTML = '<div class="karmic-banner clean">' +
        '<div class="karmic-icon-box">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' +
        '</div>' +
        '<div class="karmic-content">' +
          '<h3>Clean Slate • Pristine Karmic Balance</h3>' +
          '<p>No major Karmic Debt numbers (13, 14, 16, or 19) appear in your primary calculations. Your evolutionary journey operates on an unencumbered foundation.</p>' +
        '</div>' +
      '</div>';
    } else {
      debtContainer.innerHTML = '<div class="karmic-banner debt">' +
        '<div class="karmic-icon-box">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' +
        '</div>' +
        '<div class="karmic-content" style="width: 100%;">' +
          '<h3>Karmic Debt Alert (' + adv.karmicDebts.join(", ") + ')</h3>' +
          '<p>Specific developmental lessons from past cycles are highlighted for conscious mastery.</p>' +
          adv.karmicDebts.map(function(d) {
            const info = KARMIC_DEBTS_DATA[d];
            if (!info) return "";
            return '<div class="karmic-debt-card">' +
              '<div class="karmic-debt-header">' +
                '<strong>' + info.name + ' (Vibration ' + info.number + ')</strong>' +
              '</div>' +
              '<p style="font-size: 0.88rem; margin-bottom: 0.4rem;"><strong>Core Lesson:</strong> ' + info.lesson + '</p>' +
              '<p style="font-size: 0.84rem; color: var(--gold-muted);"><strong>Actionable Guidance:</strong> ' + info.guidance + '</p>' +
            '</div>';
          }).join("") +
        '</div>' +
      '</div>';
    }
  }

  const attBalContainer = document.getElementById("attitude-balance-grid");
  if (attBalContainer) {
    attBalContainer.innerHTML = '<div class="blueprint-card">' +
      '<div class="card-top">' +
        '<div class="card-meta">' +
          '<span class="card-tag">First Impressions & Instinct</span>' +
          '<h3>Attitude / Sun Number</h3>' +
          '<div class="card-archetype">' + getCoreData(adv.attitude.value).title + '</div>' +
        '</div>' +
        '<div class="number-glyph-box">' + adv.attitude.value + '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<p>How you instinctively approach life and react when sudden challenges arise. Vibration <strong>' + adv.attitude.value + '</strong> approaches obstacles with ' + getCoreData(adv.attitude.value).keyword.toLowerCase() + '.</p>' +
      '</div>' +
    '</div>' +
    '<div class="blueprint-card">' +
      '<div class="card-top">' +
        '<div class="card-meta">' +
          '<span class="card-tag">Crisis Recovery Anchor</span>' +
          '<h3>Balance Number</h3>' +
          '<div class="card-archetype">' + getCoreData(adv.balance.value).title + '</div>' +
        '</div>' +
        '<div class="number-glyph-box">' + adv.balance.value + '</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<p>Derived from the initials of your full name (<strong>' + adv.balance.initials.map(function(i) { return i.char; }).join("") + '</strong>). When emotional turbulence strikes, you regain stability through ' + getCoreData(adv.balance.value).keyword.toLowerCase() + '.</p>' +
      '</div>' +
    '</div>';
  }

  const chalContainer = document.getElementById("challenges-grid");
  if (chalContainer) {
    chalContainer.innerHTML = "";
    const ch = adv.challenges;
    const challengeList = [
      { label: "1st Challenge (Early Life)", num: ch.c1, isMain: false },
      { label: "2nd Challenge (Middle Life)", num: ch.c2, isMain: false },
      { label: "3rd / Main Challenge (Lifelong)", num: ch.c3, isMain: true },
      { label: "4th Challenge (Later Life)", num: ch.c4, isMain: false }
    ];

    challengeList.forEach(function(item) {
      const data = CHALLENGES_DATA[item.num] || CHALLENGES_DATA[0];
      const el = document.createElement("div");
      el.className = "challenge-item" + (item.isMain ? " main-challenge" : "");
      el.innerHTML = '<div class="challenge-item-header">' +
        '<span class="challenge-label">' + item.label + '</span>' +
        '<div class="number-glyph-box number-glyph-sm">' + item.num + '</div>' +
      '</div>' +
      '<strong style="color: var(--gold-primary); font-size: 0.95rem; display: block; margin-bottom: 0.35rem;">' + data.name + '</strong>' +
      '<p style="font-size: 0.84rem;">' + data.description + '</p>';
      chalContainer.appendChild(el);
    });
  }

  const pinContainer = document.getElementById("pinnacles-grid");
  if (pinContainer) {
    pinContainer.innerHTML = "";
    adv.pinnacles.forEach(function(p) {
      const desc = PINNACLES_DATA[p.number] || PINNACLES_DATA[1];
      const el = document.createElement("div");
      el.className = "pinnacle-item";
      el.innerHTML = '<div class="pinnacle-item-header">' +
        '<div>' +
          '<span class="pinnacle-label">' + p.title + '</span>' +
          '<div style="font-size: 0.76rem; color: var(--gold-muted);">' + p.ageSpan + '</div>' +
        '</div>' +
        '<div class="number-glyph-box number-glyph-sm">' + p.number + '</div>' +
      '</div>' +
      '<p style="font-size: 0.85rem; margin-top: 0.5rem;">' + desc + '</p>';
      pinContainer.appendChild(el);
    });
  }
}

function renderSection3NameShift() {
  const container = document.getElementById("name-shift-container");
  if (!container || !state.blueprint) return;
  const ns = state.blueprint.nameShift;

  if (!state.blueprint.hasNameShift) {
    container.innerHTML = '<div class="console-card" style="text-align: center; padding: 3rem 2rem;">' +
      '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="1.5" style="margin-bottom: 1rem;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>' +
      '<h3>No Name Shift Detected</h3>' +
      '<p style="max-width: 540px; margin: 0.5rem auto 1.5rem auto;">' +
        'The Current / Everyday Name matches the original Birth Certificate name (<strong>' + state.blueprint.birthName + '</strong>). Your daily energetic output remains directly synchronized with your original birth vibration.' +
      '</p>' +
      '<p style="font-size: 0.85rem; color: var(--gold-muted);">To explore an energetic pivot (e.g. marriage name, professional pseudonym, or nickname), enter a different Current Name in the Subject Profile Console above.</p>' +
    '</div>';
    return;
  }

  const birthExp = ns.birth.destiny.value;
  const currExp = ns.current.destiny.value;
  const birthSU = ns.birth.soulUrge.value;
  const currSU = ns.current.soulUrge.value;
  const birthPers = ns.birth.personality.value;
  const currPers = ns.current.personality.value;

  container.innerHTML = '<div class="comparison-table-wrapper">' +
    '<table class="comparison-table">' +
      '<thead>' +
        '<tr>' +
          '<th>Core Name Pillar</th>' +
          '<th>Birth Name (' + state.blueprint.birthName + ')</th>' +
          '<th>Current Name (' + state.blueprint.currentName + ')</th>' +
          '<th>Energetic Shift</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '<tr>' +
          '<td><strong>Destiny / Expression</strong><br><span style="font-size: 0.76rem; color: var(--text-muted);">Outer potential & vocation</span></td>' +
          '<td class="number-cell">' + birthExp + ' (' + getCoreData(birthExp).title + ')</td>' +
          '<td class="number-cell">' + currExp + ' (' + getCoreData(currExp).title + ')</td>' +
          '<td><span class="shift-badge ' + (ns.destinyDiff ? "changed" : "steady") + '">' + (ns.destinyDiff ? "Shift to " + currExp : "Unchanged") + '</span></td>' +
        '</tr>' +
        '<tr>' +
          '<td><strong>Soul Urge / Heart\\'s Desire</strong><br><span style="font-size: 0.76rem; color: var(--text-muted);">Inner longings & emotional driver</span></td>' +
          '<td class="number-cell">' + birthSU + ' (' + getCoreData(birthSU).title + ')</td>' +
          '<td class="number-cell">' + currSU + ' (' + getCoreData(currSU).title + ')</td>' +
          '<td><span class="shift-badge ' + (ns.soulUrgeDiff ? "changed" : "steady") + '">' + (ns.soulUrgeDiff ? "Shift to " + currSU : "Unchanged") + '</span></td>' +
        '</tr>' +
        '<tr>' +
          '<td><strong>Personality Number</strong><br><span style="font-size: 0.76rem; color: var(--text-muted);">Social projection & first impressions</span></td>' +
          '<td class="number-cell">' + birthPers + ' (' + getCoreData(birthPers).title + ')</td>' +
          '<td class="number-cell">' + currPers + ' (' + getCoreData(currPers).title + ')</td>' +
          '<td><span class="shift-badge ' + (ns.personalityDiff ? "changed" : "steady") + '">' + (ns.personalityDiff ? "Shift to " + currPers : "Unchanged") + '</span></td>' +
        '</tr>' +
      '</tbody>' +
    '</table>' +
  '</div>' +
  '<div class="blueprint-card" style="margin-top: 1.5rem;">' +
    '<h3>Energetic Pivot Synthesis</h3>' +
    '<p style="margin-bottom: 0.75rem;">Transitioning from <strong>"' + state.blueprint.birthName + '"</strong> to <strong>"' + state.blueprint.currentName + '"</strong> creates a noticeable vibrational realignment in your daily reality:</p>' +
    '<ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;">' +
      '<li><strong>Expression Shift (' + birthExp + ' ➔ ' + currExp + '):</strong> You channel worldly output through ' + getCoreData(currExp).title + '.</li>' +
      '<li><strong>Soul Urge Shift (' + birthSU + ' ➔ ' + currSU + '):</strong> Private comfort resonates with ' + getCoreData(currSU).soulUrge.drivers.toLowerCase() + '.</li>' +
      '<li><strong>Social Projection (' + birthPers + ' ➔ ' + currPers + '):</strong> Worldly perception aligns with ' + getCoreData(currPers).personality.projection.toLowerCase() + '.</li>' +
    '</ul>' +
  '</div>';
}

function renderSection4Forecasting() {
  const f = state.forecasting;
  if (!f) return;
  const py = f.personalYear;
  const pm = f.personalMonth;
  const pd = f.personalDay;

  const heroGrid = document.getElementById("forecast-hero-grid");
  if (heroGrid) {
    heroGrid.innerHTML = '<div class="forecast-hero-card featured">' +
      '<div>' +
        '<span class="card-tag">Annual Cycle (' + f.forecastYear + ')</span>' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 0.5rem 0 1rem 0;">' +
          '<div>' +
            '<h3>Personal Year ' + py.value + '</h3>' +
            '<div class="card-archetype">' + py.data.theme + '</div>' +
          '</div>' +
          '<div class="number-glyph-box' + (py.isMaster ? " master" : "") + '">' + py.value + '</div>' +
        '</div>' +
        '<p style="font-size: 0.88rem;">' + py.data.summary + '</p>' +
      '</div>' +
      '<div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.8rem;">' +
        '<strong style="color: var(--gold-primary);">Strategic Focus:</strong> ' + py.data.focus +
      '</div>' +
    '</div>' +
    '<div class="forecast-hero-card">' +
      '<div>' +
        '<span class="card-tag">Monthly Cycle (' + f.forecastMonthName + ')</span>' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 0.5rem 0 1rem 0;">' +
          '<div>' +
            '<h3>Personal Month ' + pm.value + '</h3>' +
            '<div class="card-archetype">' + pm.data.title + '</div>' +
          '</div>' +
          '<div class="number-glyph-box number-glyph-sm' + (pm.isMaster ? " master" : "") + '">' + pm.value + '</div>' +
        '</div>' +
        '<p style="font-size: 0.88rem;">' + pm.theme + '. Focus on ' + pm.data.lifePath.corePurpose.toLowerCase() + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="forecast-hero-card">' +
      '<div>' +
        '<span class="card-tag">Daily Vibration (Day ' + f.forecastDay + ')</span>' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 0.5rem 0 1rem 0;">' +
          '<div>' +
            '<h3>Personal Day ' + pd.value + '</h3>' +
            '<div class="card-archetype">' + pd.data.title + '</div>' +
          '</div>' +
          '<div class="number-glyph-box number-glyph-sm' + (pd.isMaster ? " master" : "") + '">' + pd.value + '</div>' +
        '</div>' +
        '<p style="font-size: 0.88rem;">Today\\'s micro-frequency emphasizes ' + pd.data.keyword.toLowerCase() + '.</p>' +
      '</div>' +
    '</div>';
  }

  const epicycleTracker = document.getElementById("epicycle-tracker");
  if (epicycleTracker) {
    epicycleTracker.innerHTML = "";
    for (let step = 1; step <= 9; step++) {
      const isCurrent = step === py.epicyclePhase;
      const isPast = step < py.epicyclePhase;
      const el = document.createElement("div");
      el.className = "epicycle-step" + (isCurrent ? " active" : isPast ? " past" : "");
      el.title = "Year " + step;
      el.textContent = step;
      epicycleTracker.appendChild(el);
    }
  }

  const yrLabel = document.getElementById("forecast-year-label");
  if (yrLabel) yrLabel.textContent = f.forecastYear;

  const transitContainer = document.getElementById("transit-calendar-grid");
  if (transitContainer) {
    transitContainer.innerHTML = "";
    const roadmap = generateYearlyTransitRoadmap(state.blueprint.birthDate, f.forecastYear);
    roadmap.months.forEach(function(m) {
      const isCurrent = m.monthNumber === f.forecastMonth;
      const card = document.createElement("div");
      card.className = "transit-month-card" + (isCurrent ? " current-month" : "");
      card.innerHTML = '<div class="transit-month-header">' +
        '<div>' +
          '<strong style="font-size: 1rem; color: var(--text-primary);">' + m.name + '</strong>' +
          '<div style="font-size: 0.75rem; color: var(--gold-muted);">' + m.vibe + '</div>' +
        '</div>' +
        '<div class="number-glyph-box number-glyph-sm' + (m.isMaster ? " master" : "") + '">' + m.personalMonthNumber + '</div>' +
      '</div>' +
      '<div style="font-size: 0.82rem; font-weight: 600; color: var(--gold-primary); margin-bottom: 0.35rem;">' +
        m.archetypeTitle +
      '</div>' +
      '<p style="font-size: 0.82rem; margin-bottom: 0.5rem;">' + m.strategicFocus + '</p>';
      transitContainer.appendChild(card);
    });
  }
}

function renderSection5AstroSynthesis() {
  const astro = state.astrology;
  const bp = state.blueprint;
  if (!astro || !bp) return;

  const wheelContainer = document.getElementById("natal-wheel-container");
  if (wheelContainer) {
    wheelContainer.innerHTML = renderNatalWheelSVG(astro.sunSign, astro.moonData, astro.ascendantData, 480);
  }

  renderPlanetaryHours();

  const sunSynth = synthesizeLifePathSun(bp.core.lifePath.value, astro.sunSign);
  const moonSynth = synthesizeSoulUrgeMoon(bp.core.soulUrge.value, astro.moonData);
  const ascSynth = synthesizePersonalityAscendant(bp.core.personality.value, astro.ascendantData);

  const container = document.getElementById("astro-synthesis-grid");
  if (container) {
    const sunName = (astro.sunSign && astro.sunSign.name) ? astro.sunSign.name : "Sun";
    const sunElem = (astro.sunSign && astro.sunSign.element) ? astro.sunSign.element : "Fire";
    const sunSym = (astro.sunSign && astro.sunSign.symbol) ? astro.sunSign.symbol : "☉";
    const moonSym = (astro.moonData && astro.moonData.sign && astro.moonData.sign.symbol) ? astro.moonData.sign.symbol : "☽";
    const moonName = (astro.moonData && astro.moonData.sign && astro.moonData.sign.name) ? (astro.moonData.sign.name + " (~" + astro.moonData.degree + "°)") : "Moon (~12°)";
    const ascSym = (astro.ascendantData && astro.ascendantData.sign && astro.ascendantData.sign.symbol) ? astro.ascendantData.sign.symbol : "🌅";

    container.innerHTML = '<div class="astro-card">' +
      '<div class="astro-glyph-hero">' + sunSym + '</div>' +
      '<span class="card-tag">Solar Core & Life Path (' + (bp.core ? bp.core.lifePath.value : 1) + ')</span>' +
      '<h3>' + (sunSynth ? sunSynth.title : "Solar Core") + '</h3>' +
      '<p style="margin: 0.5rem 0;">' + (sunSynth ? sunSynth.text : "") + '</p>' +
      '<div class="card-pill-list" style="margin-top: 0.75rem;">' +
        '<span class="card-pill">Sun in ' + sunName + '</span>' +
        '<span class="card-pill">' + sunElem + ' Element</span>' +
      '</div>' +
    '</div>' +
    '<div class="astro-card">' +
      '<div class="astro-glyph-hero">' + moonSym + '</div>' +
      '<span class="card-tag">Lunar Subconscious & Soul Urge (' + (bp.core ? bp.core.soulUrge.value : 1) + ')</span>' +
      '<h3>' + (moonSynth ? moonSynth.title : "Lunar Mirror") + '</h3>' +
      '<p style="margin: 0.5rem 0;">' + (moonSynth ? moonSynth.text : "") + '</p>' +
      '<div class="card-pill-list" style="margin-top: 0.75rem;">' +
        '<span class="card-pill">Moon in ' + moonName + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="astro-card">' +
      '<div class="astro-glyph-hero">' + ascSym + '</div>' +
      '<span class="card-tag">Ascendant & Personality (' + (bp.core ? bp.core.personality.value : 1) + ')</span>' +
      '<h3>' + (ascSynth ? ascSynth.title : "Ascendant Filter") + '</h3>' +
      '<p style="margin: 0.5rem 0;">' + (ascSynth ? ascSynth.text : "") + '</p>' +
      '<div class="card-pill-list" style="margin-top: 0.75rem;">' +
        ((astro.ascendantData && astro.ascendantData.available && astro.ascendantData.sign)
          ? ('<span class="card-pill">' + astro.ascendantData.sign.name + ' Rising (' + (astro.ascendantData.degree || 0) + '°)</span>')
          : '<span class="card-pill">Approximate (Time Unknown)</span>') +
      '</div>' +
    '</div>';
  }

  const mansionCard = document.getElementById("lunar-mansion-card");
  if (mansionCard) {
    const moonDeg = (astro.moonData && astro.moonData.totalLongitude) ? astro.moonData.totalLongitude : 0;
    const mansionIdx = Math.floor((moonDeg % 360) / (360 / 28)) % LUNAR_MANSIONS.length;
    const mansion = LUNAR_MANSIONS[mansionIdx] || LUNAR_MANSIONS[0];
    mansionCard.innerHTML = '<div class="card-top">' +
      '<div class="card-meta">' +
        '<span class="card-tag">Lunar Mansion (Nakshatra Archetype)</span>' +
        '<h3>Mansion ' + mansion.index + ': ' + mansion.name + '</h3>' +
        '<div class="card-archetype">' + mansion.archetype + '</div>' +
      '</div>' +
      '<div class="number-glyph-box master">☽</div>' +
    '</div>' +
    '<p style="font-size: 0.9rem; margin-top: 0.5rem;">' +
      '<strong>Subconscious Impulse:</strong> ' + mansion.energy + ' (Span: ' + mansion.span + ')' +
    '</p>';
  }

  const meterGroup = document.getElementById("elemental-meter-group");
  if (meterGroup) {
    const elem = (astro.elemental && astro.elemental.percentages) ? astro.elemental.percentages : { Fire: 25, Earth: 25, Air: 25, Water: 25 };
    meterGroup.innerHTML = '<div class="elemental-bar-item">' +
      '<div class="elemental-bar-label"><span>🔥 Fire (Inspiration & Willpower)</span><strong>' + elem.Fire + '%</strong></div>' +
      '<div class="elemental-track"><div class="elemental-fill fire" style="width: ' + elem.Fire + '%"></div></div>' +
    '</div>' +
    '<div class="elemental-bar-item">' +
      '<div class="elemental-bar-label"><span>🌱 Earth (Structure & Pragmatism)</span><strong>' + elem.Earth + '%</strong></div>' +
      '<div class="elemental-track"><div class="elemental-fill earth" style="width: ' + elem.Earth + '%"></div></div>' +
    '</div>' +
    '<div class="elemental-bar-item">' +
      '<div class="elemental-bar-label"><span>💨 Air (Intellect & Communication)</span><strong>' + elem.Air + '%</strong></div>' +
      '<div class="elemental-track"><div class="elemental-fill air" style="width: ' + elem.Air + '%"></div></div>' +
    '</div>' +
    '<div class="elemental-bar-item">' +
      '<div class="elemental-bar-label"><span>🌊 Water (Intuition & Empathy)</span><strong>' + elem.Water + '%</strong></div>' +
      '<div class="elemental-track"><div class="elemental-fill water" style="width: ' + elem.Water + '%"></div></div>' +
    '</div>';
  }

  const mandateEl = document.getElementById("mandate-proclamation-text");
  if (mandateEl) {
    mandateEl.innerHTML = generateLifeMandate(bp, astro);
  }
}

function renderPlanetaryHours() {
  const banner = document.getElementById("planetary-hours-banner");
  if (!banner) return;
  const hoursData = calculatePlanetaryHours(new Date());

  banner.innerHTML = '<div style="flex: 1; min-width: 260px;">' +
    '<div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.25rem;">' +
      '<span style="font-size: 1.6rem; color: var(--gold-primary);">' + hoursData.glyph + '</span>' +
      '<div>' +
        '<strong style="color: var(--gold-primary); font-size: 1.15rem;">Current Planetary Hour: ' + hoursData.currentPlanet + '</strong>' +
        '<div style="font-size: 0.78rem; color: var(--text-muted);">Day Ruler: <strong>' + hoursData.dayRuler + '</strong> • Local Time: <strong>' + hoursData.timeString + '</strong></div>' +
      '</div>' +
    '</div>' +
    '<p style="font-size: 0.85rem; margin-top: 0.4rem;">' +
      '<strong>Favorable for:</strong> ' + hoursData.guidance.goodFor +
    '</p>' +
  '</div>' +
  '<div class="planetary-hours-schedule" style="flex: 2;">' +
    hoursData.schedule.slice(0, 8).map(function(h) {
      return '<div class="hour-step-badge' + (h.isCurrent ? " current" : "") + '">' +
        '<div>' + h.timeLabel + '</div>' +
        '<strong style="color: ' + (h.isCurrent ? "var(--gold-primary)" : "var(--text-secondary)") + ';">' + h.glyph + ' ' + h.planet + '</strong>' +
      '</div>';
    }).join("") +
  '</div>';
}

function renderSection6Remedies() {
  if (!state.blueprint) return;
  const lp = state.blueprint.core.lifePath.value;
  const remedies = NUMBER_REMEDIES[lp] || NUMBER_REMEDIES[1];

  const grid = document.getElementById("remedies-grid");
  if (grid) {
    grid.innerHTML = '<div class="blueprint-card highlight">' +
      '<div class="card-top">' +
        '<div class="card-meta">' +
          '<span class="card-tag">Alchemical Stones</span>' +
          '<h3>Sacred Crystals for Life Path ' + lp + '</h3>' +
        '</div>' +
        '<div class="number-glyph-box master">💎</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<p style="margin-bottom: 0.5rem;">Primary amplifying gemstones:</p>' +
        '<div class="card-pill-list">' +
          remedies.crystals.map(function(c) { return '<span class="card-pill" style="color: var(--gold-primary); font-weight: 600;">' + c + '</span>'; }).join("") +
        '</div>' +
        '<div style="margin-top: 0.75rem; font-size: 0.84rem;">' +
          '<div>Resonant Metal: <strong>' + remedies.metals.join(", ") + '</strong></div>' +
          '<div>Elemental Colors: <strong>' + remedies.elementalColor + '</strong></div>' +
          '<div>Sacred Botanical Herb: <strong>' + remedies.sacredHerb + '</strong></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="blueprint-card">' +
      '<div class="card-top">' +
        '<div class="card-meta">' +
          '<span class="card-tag">Daily Ritual Focus</span>' +
          '<h3>Alchemical Meditation Action</h3>' +
        '</div>' +
        '<div class="number-glyph-box">🌿</div>' +
      '</div>' +
      '<div class="card-body">' +
        '<p style="font-size: 0.92rem; line-height: 1.7;">' +
          remedies.dailyFocus +
        '</p>' +
      '</div>' +
    '</div>';
  }

  const mantraEl = document.getElementById("daily-mantra-proclamation");
  if (mantraEl) {
    mantraEl.innerHTML = '"' + remedies.mantra + '"';
  }
}

function handleCalculateBusiness() {
  const inputEl = document.getElementById("input-business-name");
  const container = document.getElementById("business-results-container");
  if (!inputEl || !container) return;

  const bName = inputEl.value.trim() || "Aetheria Labs";
  const founderLP = state.blueprint ? state.blueprint.core.lifePath.value : 1;
  const result = calculateBusinessBlueprint(bName, founderLP, state.system);

  container.innerHTML = '<div class="blueprint-card highlight">' +
    '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">' +
      '<div>' +
        '<span class="card-tag">Brand Archetype (' + result.expression.value + ')</span>' +
        '<h3 style="color: var(--gold-primary);">' + result.archetype + '</h3>' +
        '<div style="font-size: 0.84rem; color: var(--text-secondary);">' + result.vibe + '</div>' +
      '</div>' +
      '<div class="number-glyph-box master" style="width: 65px; height: 65px;">' + result.expression.value + '</div>' +
    '</div>' +
    '<div class="form-row-duo" style="margin: 1rem 0;">' +
      '<div style="background: var(--bg-input); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.84rem;">' +
        '<strong style="color: var(--gold-primary);">Vowel Mission (Heart):</strong> Vibration ' + result.soulMission.value +
      '</div>' +
      '<div style="background: var(--bg-input); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.84rem;">' +
        '<strong style="color: var(--gold-primary);">Consonant Image (Persona):</strong> Vibration ' + result.brandImage.value +
      '</div>' +
    '</div>' +
    '<div style="margin-top: 1rem; font-size: 0.88rem;">' +
      '<strong style="color: var(--gold-primary);">Founder Synergy (' + result.synergyScore + '%):</strong> ' + result.synergyAnalysis +
    '</div>' +
    '<div style="margin-top: 0.75rem;">' +
      '<strong style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Optimal Industry Verticals:</strong>' +
      '<div class="card-pill-list" style="margin-top: 0.35rem;">' +
        result.bestIndustries.map(function(ind) { return '<span class="card-pill">' + ind + '</span>'; }).join("") +
      '</div>' +
    '</div>' +
  '</div>';
}

function handleCalculateAddress() {
  const inputEl = document.getElementById("input-home-address");
  const container = document.getElementById("address-results-container");
  if (!inputEl || !container) return;

  const addrStr = inputEl.value.trim() || "108 Sacred Oak Way";
  const result = calculateAddressNumerology(addrStr, state.system);
  if (!result) return;

  container.innerHTML = '<div class="blueprint-card">' +
    '<div class="card-top">' +
      '<div class="card-meta">' +
        '<span class="card-tag">Dwelling Atmosphere</span>' +
        '<h3>' + result.title + '</h3>' +
        '<div class="card-archetype">Vibration Number ' + result.vibrationNumber + '</div>' +
      '</div>' +
      '<div class="number-glyph-box master">' + result.vibrationNumber + '</div>' +
    '</div>' +
    '<p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Living Energy:</strong> ' + result.vibe + '</p>' +
    '<p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Best For:</strong> ' + result.bestFor + '</p>' +
    '<p style="font-size: 0.82rem; color: var(--gold-muted);"><strong>Harmonic Tip:</strong> ' + result.caution + '</p>' +
  '</div>';
}

function handleAskOracle(questionText) {
  const container = document.getElementById("oracle-response-container");
  if (!container) return;
  if (!questionText || !state.blueprint) {
    showToast("Please enter a question to consult the Oracle", "info");
    return;
  }

  container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gold-primary);">' +
    '<div style="font-size: 1.5rem; animation: soundWave 600ms infinite alternate;">🔮</div>' +
    '<div style="font-size: 0.88rem; margin-top: 0.5rem;">Consulting your cosmic chart alignment...</div>' +
  '</div>';

  setTimeout(function() {
    container.innerHTML = consultOracle(questionText, state.blueprint, state.astrology, state.forecasting);
  }, 400);
}

function handleCalculateCompatibility() {
  const pName = document.getElementById("compat-partner-name").value;
  const pDate = document.getElementById("compat-partner-date").value;
  const container = document.getElementById("compatibility-results-container");

  if (!pName || !pDate || !state.blueprint) {
    showToast("Please enter partner name and birth date", "info");
    return;
  }

  const pBlueprint = calculateFullBlueprint({
    birthDate: pDate,
    birthTime: "",
    birthPlace: "",
    birthName: pName,
    currentName: pName,
    forecastDate: state.blueprint.forecastDate,
    system: state.system
  });

  const lp1 = state.blueprint.core.lifePath.value;
  const lp2 = pBlueprint.core.lifePath.value;
  const dest1 = state.blueprint.core.destiny.value;
  const dest2 = pBlueprint.core.destiny.value;

  let score = 85;
  let dynamic = "Harmonic Natural Flow";
  let analysis = "";

  if (lp1 === lp2) {
    score = 92;
    dynamic = "Mirror Soul Resonance";
    analysis = "Both carry Life Path " + lp1 + ". You share an identical cosmic wavelength, creating immediate understanding.";
  } else if ([1, 5, 7].includes(lp1) && [1, 5, 7].includes(lp2)) {
    score = 88;
    dynamic = "Dynamic Intellectual & Visionary Synergy";
    analysis = "Both value independence, intellectual freedom, and unconventional exploration.";
  } else if ([2, 4, 8].includes(lp1) && [2, 4, 8].includes(lp2)) {
    score = 90;
    dynamic = "Architectural & Grounded Security Synergy";
    analysis = "A powerful, building combination focused on mutual loyalty, long-term security, and material success.";
  } else if ([3, 6, 9].includes(lp1) && [3, 6, 9].includes(lp2)) {
    score = 94;
    dynamic = "Creative & Universal Heart Resonance";
    analysis = "Deep artistic and empathic harmony. Both value expression, unconditional love, and uplifting community.";
  } else {
    score = 78;
    dynamic = "Alchemical Growth & Complementary Polish";
    analysis = "Life Path " + lp1 + " and Life Path " + lp2 + " offer complementary balances.";
  }

  if (container) {
    container.innerHTML = '<div class="blueprint-card highlight" style="margin-top: 1.5rem;">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">' +
        '<div>' +
          '<span class="card-tag">Cosmic Synastry Matrix</span>' +
          '<h3>' + state.blueprint.birthName + ' & ' + pName + '</h3>' +
          '<div class="card-archetype" style="font-size: 1.05rem;">' + dynamic + '</div>' +
        '</div>' +
        '<div class="number-glyph-box master" style="width: 70px; height: 70px; font-size: 1.85rem;">' +
          score + '%' +
        '</div>' +
      '</div>' +
      '<p style="font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.25rem;">' + analysis + '</p>' +
      '<div class="form-row-duo">' +
        '<div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">' +
          '<strong style="color: var(--gold-primary); display: block; margin-bottom: 0.25rem;">' + state.blueprint.birthName + '</strong>' +
          '<div style="font-size: 0.84rem;">Life Path: <strong>' + lp1 + '</strong> | Destiny: <strong>' + dest1 + '</strong></div>' +
        '</div>' +
        '<div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">' +
          '<strong style="color: var(--gold-primary); display: block; margin-bottom: 0.25rem;">' + pName + '</strong>' +
          '<div style="font-size: 0.84rem;">Life Path: <strong>' + lp2 + '</strong> | Destiny: <strong>' + dest2 + '</strong></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  showToast("Compatibility calculated", "success");
}

function handleSaveCurrentProfile() {
  const birthDateInput = document.getElementById("input-birth-date");
  const birthNameInput = document.getElementById("input-birth-name");
  const birthTimeInput = document.getElementById("input-birth-time");
  const birthPlaceInput = document.getElementById("input-birth-place");
  const currentNameInput = document.getElementById("input-current-name");
  const forecastDateInput = document.getElementById("input-forecast-date");
  const chkUnknownTime = document.getElementById("chk-unknown-time");
  const chkSameName = document.getElementById("chk-same-name");

  const birthDate = birthDateInput ? birthDateInput.value.trim() : "";
  const birthName = birthNameInput ? birthNameInput.value.trim() : "";
  const birthTime = (chkUnknownTime && chkUnknownTime.checked) ? "" : (birthTimeInput ? birthTimeInput.value : "");
  const birthPlace = birthPlaceInput ? birthPlaceInput.value.trim() : "";
  const currentName = (chkSameName && chkSameName.checked) ? birthName : (currentNameInput && currentNameInput.value.trim() ? currentNameInput.value.trim() : birthName);
  const forecastDate = forecastDateInput && forecastDateInput.value ? forecastDateInput.value : "2026-08-13";

  if (!birthDate || !birthName) {
    showToast("Please enter at least Full Birth Name and Birth Date to save", "error");
    return;
  }

  const profileToSave = {
    id: "profile_" + Date.now(),
    birthDate: birthDate,
    birthTime: birthTime,
    birthPlace: birthPlace,
    birthName: birthName,
    currentName: currentName,
    forecastDate: forecastDate,
    system: state.system
  };

  saveProfile(profileToSave);
  updateSavedProfilesCount();
  runCalculation();
  showToast("✓ Profile for \\"" + birthName + "\\" saved to your personal vault!", "success");
}

function updateSavedProfilesCount() {
  const savedCountSpan = document.getElementById("saved-count");
  const vaultCountEl = document.getElementById("vault-profile-count");
  const profiles = getSavedProfiles();
  if (savedCountSpan) {
    savedCountSpan.textContent = profiles.length;
  }
  if (vaultCountEl) {
    vaultCountEl.textContent = profiles.length;
  }
}

function openSavedProfilesModal() {
  const savedProfilesModal = document.getElementById("saved-profiles-modal");
  const savedProfilesList = document.getElementById("saved-profiles-list");
  if (!savedProfilesModal || !savedProfilesList) return;

  const profiles = getSavedProfiles();
  savedProfilesList.innerHTML = "";

  const actionsBar = document.createElement("div");
  actionsBar.style.cssText = "display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap;";
  actionsBar.innerHTML = '<button type="button" class="btn btn-primary btn-sm" id="btn-modal-save-current">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path></svg>' +
      ' Save Current Active Profile' +
    '</button>' +
    '<div style="display: flex; gap: 0.5rem;">' +
      '<button type="button" class="btn btn-secondary btn-sm" id="btn-modal-export-json">Export (JSON)</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" id="btn-modal-import-json">Import (JSON)</button>' +
      '<input type="file" id="json-import-file-input" accept=".json" style="display: none;">' +
    '</div>';
  savedProfilesList.appendChild(actionsBar);

  actionsBar.querySelector("#btn-modal-save-current").addEventListener("click", function() {
    handleSaveCurrentProfile();
    openSavedProfilesModal();
  });

  actionsBar.querySelector("#btn-modal-export-json").addEventListener("click", function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getSavedProfiles(), null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "aetheria_dossiers_" + Date.now() + ".json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported dossiers JSON file", "success");
  });

  const fileInput = actionsBar.querySelector("#json-import-file-input");
  actionsBar.querySelector("#btn-modal-import-json").addEventListener("click", function() {
    fileInput.click();
  });

  fileInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          imported.forEach(function(p) { saveProfile(p); });
          updateSavedProfilesCount();
          openSavedProfilesModal();
          showToast("Imported " + imported.length + " profiles successfully to your vault!", "success");
        }
      } catch (err) {
        showToast("Invalid JSON file", "error");
      }
    };
    reader.readAsText(file);
  });

  const listContainer = document.createElement("div");
  listContainer.style.cssText = "display: flex; flex-direction: column; gap: 0.75rem;";

  if (profiles.length === 0) {
    listContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem; background: var(--bg-input); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">Your vault has no saved dossiers yet. Click "Save Profile" above or save the active profile.</div>';
  } else {
    profiles.forEach(function(p) {
      const item = document.createElement("div");
      item.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: var(--bg-input); padding: 0.85rem 1.15rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 0.5rem;";
      item.innerHTML = '<div>' +
          '<strong style="color: var(--gold-primary); font-size: 1rem;">' + p.birthName + '</strong>' +
          '<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">' +
            'Born: <strong>' + p.birthDate + '</strong> ' + (p.birthPlace ? "• " + p.birthPlace : "") + ' ' + (p.birthTime ? "(" + p.birthTime + ")" : "") +
          '</div>' +
        '</div>' +
        '<div style="display: flex; gap: 0.5rem;">' +
          '<button type="button" class="btn btn-primary btn-sm btn-load-profile">Load Profile</button>' +
          '<button type="button" class="btn btn-secondary btn-sm btn-del-profile" style="color: var(--stellar-crimson);">Delete</button>' +
        '</div>';

      item.querySelector(".btn-load-profile").addEventListener("click", function() {
        document.getElementById("input-birth-date").value = p.birthDate;
        document.getElementById("input-birth-time").value = p.birthTime || "";
        document.getElementById("input-birth-place").value = p.birthPlace || "";
        document.getElementById("input-birth-name").value = p.birthName;
        document.getElementById("input-current-name").value = p.currentName || p.birthName;
        document.getElementById("input-forecast-date").value = p.forecastDate || "2026-08-13";
        
        const chkUnknownTime = document.getElementById("chk-unknown-time");
        const inputBirthTime = document.getElementById("input-birth-time");
        if (chkUnknownTime && inputBirthTime) {
          chkUnknownTime.checked = !p.birthTime;
          inputBirthTime.disabled = !p.birthTime;
        }

        if (p.system) setSystem(p.system);
        else runCalculation();

        closeModal(savedProfilesModal);
        showToast("Loaded profile for \\"" + p.birthName + "\\"", "success");
      });

      item.querySelector(".btn-del-profile").addEventListener("click", function() {
        deleteProfile(p.id);
        updateSavedProfilesCount();
        openSavedProfilesModal();
        showToast("Deleted profile for \\"" + p.birthName + "\\"", "info");
      });

      listContainer.appendChild(item);
    });
  }

  savedProfilesList.appendChild(listContainer);
  openModal(savedProfilesModal);
}

function renderPrintBanner() {
  const bp = state.blueprint;
  if (!bp) return;
  const nameEl = document.getElementById("print-subject-name");
  const detailsEl = document.getElementById("print-subject-details");
  const dateEl = document.getElementById("print-generated-date");

  if (nameEl) nameEl.textContent = bp.birthName;
  if (detailsEl) detailsEl.textContent = "Birth Date: " + bp.birthDate + " | Time: " + (bp.birthTime || "Unknown") + " | Place: " + (bp.birthPlace || "N/A") + " | System: " + bp.system.toUpperCase();
  if (dateEl) dateEl.textContent = "Forecast Target: " + bp.forecastDate + " | Generated via AETHERIA";
}

function openFormulaInspector(type) {
  const bp = state.blueprint;
  const modalInspectorContent = document.getElementById("modal-inspector-content");
  const inspectorModal = document.getElementById("inspector-modal");
  if (!bp || !modalInspectorContent || !inspectorModal) return;

  let title = "";
  let html = "";

  if (type === "lifePath") {
    title = "Life Path Number • Step-by-Step Reduction";
    const lp = bp.core.lifePath;
    const bParsed = parseFlexibleDate(bp.birthDate);
    html = '<h3>' + title + '</h3>' +
      '<p style="margin-bottom: 1rem;">Calculated by reducing Birth Month, Day, and Year separately, then summing their core vibrations.</p>' +
      '<div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.95rem; margin-bottom: 1rem;">' +
        '<div><strong>1. Month (' + bParsed.month + '):</strong> Reduced to ➔ <strong>' + lp.monthRed.value + '</strong></div>' +
        '<div><strong>2. Day (' + bParsed.day + '):</strong> Reduced to ➔ <strong>' + lp.dayRed.value + '</strong></div>' +
        '<div><strong>3. Year (' + bParsed.year + '):</strong> Reduced to ➔ <strong>' + lp.yearRed.value + '</strong></div>' +
        '<div style="margin-top: 0.5rem; border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem;">' +
          '<strong>Total Sum:</strong> ' + lp.monthRed.value + ' + ' + lp.dayRed.value + ' + ' + lp.yearRed.value + ' = <strong>' + lp.componentSum + '</strong>' +
        '</div>' +
        '<div><strong>Final Reduction Path:</strong> ' + lp.steps.join(" ➔ ") + ' = <strong style="color: var(--gold-primary); font-size: 1.15rem;">' + lp.value + '</strong></div>' +
      '</div>' +
      '<p style="font-size: 0.85rem; color: var(--gold-muted);">Master Numbers (11, 22, 33) are strictly preserved and never reduced prematurely.</p>';
  } else if (["destiny", "soulUrge", "personality"].includes(type)) {
    const isDestiny = type === "destiny";
    const isSoulUrge = type === "soulUrge";
    title = isDestiny ? "Destiny / Expression Letter Calculation" : isSoulUrge ? "Soul Urge Vowel Calculation" : "Personality Consonant Calculation";
    
    const analysis = bp.birthNameAnalysis;
    const filteredLetters = analysis.lettersData.filter(function(l) {
      if (isDestiny) return true;
      if (isSoulUrge) return l.type === "vowel";
      return l.type === "consonant";
    });

    const sum = isDestiny ? analysis.totalSum : isSoulUrge ? analysis.vowelSum : analysis.consonantSum;
    const numObj = isDestiny ? bp.core.destiny : isSoulUrge ? bp.core.soulUrge : bp.core.personality;

    html = '<h3>' + title + ' (' + bp.system.toUpperCase() + ')</h3>' +
      '<p style="margin-bottom: 1rem;">' +
        (isDestiny ? "Every letter of your birth certificate name translated to its numerical frequency." : isSoulUrge ? "Filtering only the vowels (A, E, I, O, U, and contextual Y) to reveal subconscious soul longings." : "Filtering only the consonants to calculate outer personality projection.") +
      '</p>' +
      '<div style="max-height: 240px; overflow-y: auto; margin-bottom: 1rem;">' +
        '<table class="letter-breakdown-table">' +
          '<thead>' +
            '<tr>' +
              '<th>Letter</th>' +
              '<th>Type</th>' +
              '<th>Word</th>' +
              '<th>Numerical Value</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            filteredLetters.map(function(l) {
              return '<tr>' +
                '<td><strong>' + l.char + '</strong></td>' +
                '<td style="text-transform: capitalize; color: ' + (l.type === "vowel" ? "var(--gold-primary)" : "var(--text-secondary)") + '">' + l.type + '</td>' +
                '<td>' + l.word + '</td>' +
                '<td style="font-weight: 700; color: var(--gold-primary);">' + l.val + '</td>' +
              '</tr>';
            }).join("") +
          '</tbody>' +
        '</table>' +
      '</div>' +
      '<div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.95rem;">' +
        '<div><strong>Raw Sum of Analyzed Letters:</strong> ' + sum + '</div>' +
        '<div><strong>Step-by-Step Reduction Path:</strong> ' + numObj.steps.join(" ➔ ") + ' = <strong style="color: var(--gold-primary); font-size: 1.15rem;">' + numObj.value + '</strong></div>' +
      '</div>';
  }

  modalInspectorContent.innerHTML = html;
  openModal(inspectorModal);
}

async function handleCopyReport() {
  if (!state.blueprint || !state.astrology || !state.forecasting) return;
  const md = generateMarkdownReport(state.blueprint, state.astrology, state.forecasting);
  const ok = await copyToClipboard(md);
  if (ok) {
    showToast("Executive Markdown Dossier copied to clipboard!", "success");
  } else {
    showToast("Unable to copy to clipboard", "error");
  }
}

function handlePrintDossier() {
  window.print();
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("active");
  modalEl.setAttribute("aria-hidden", "false");
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("active");
  modalEl.setAttribute("aria-hidden", "true");
}

function showToast(message, type) {
  if (!type) type = "info";
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-item toast-" + type;
  
  let icon = "✨";
  if (type === "success") icon = "✦";
  if (type === "error") icon = "⚠️";

  toast.innerHTML = '<span>' + icon + '</span> <span>' + message + '</span>';
  container.appendChild(toast);

  setTimeout(function() {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      } else if (typeof toast.remove === "function") {
        toast.remove();
      }
    }, 300);
  }, 3500);
}

if (typeof window !== "undefined") {
  window.AETHERIA = {
    authManager: typeof authManager !== "undefined" ? authManager : null,
    state: state,
    runCalculation: runCalculation,
    switchTab: switchTab,
    saveProfile: saveProfile,
    getSavedProfiles: getSavedProfiles
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
'''

    bundle = f"""/**
 * AETHERIA - Master Numerology & Astrological Synthesis Standalone Bundle
 * Complete build with User Account Auth, Vault Persistence, Lo Shu, Natal Wheel, Solfeggio, Business Suite & Oracle.
 */
(() => {{
  'use strict';

  {chr(10).join(modules_code)}

  {controller_code}

}})();
"""

    with open('js/app.bundle.js', 'w', encoding='utf-8') as f:
        f.write(bundle)
    
    print('SUCCESS! Bundle created, length:', len(bundle))

if __name__ == '__main__':
    main()
