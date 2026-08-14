# 🌌 AETHERIA • Master Numerology & Astrological Synthesis Platform

> **A holistic, high-precision esoteric calculation engine and interactive dossier generator marrying authentic Pythagorean and Chaldean numerological traditions with astrological ephemeris synthesis.**

![AETHERIA Banner](https://img.shields.io/badge/System-AETHERIA%20v2.0-gold?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla%20JS)-emerald?style=for-the-badge)

---

## 🌟 Key Capabilities & Architecture

### 1. 🔮 Core Numerological Calculation Engine (`js/numerology.js`)
* **Dual Calculation Modes:** Seamlessly switch between the **Pythagorean (1–9)** and **Chaldean (1–8)** systems.
* **Master Numbers:** Strict preservation of **11, 22, and 33** without premature digit reduction.
* **Core Pillars:** Life Path, Destiny / Expression, Soul Urge (Heart's Desire), Personality, Birthday Vibration, and Midlife Maturity (Ages 35–45+).
* **Mathematical Inspector:** Step-by-step audit modal revealing individual vowel/consonant breakdowns and intermediate reduction steps.

### 2. 🀄 Lo Shu Magic Square & 8 Cosmic Arrows (`js/loshu.js`)
* 3×3 Chinese Natal Magic Matrix mapping date digits into **Thought**, **Soul**, and **Physical** planes.
* Automatic detection of **8 Arrows of Strength & Losses** (Willpower, Intellect, Determination, Skepticism, Frustration, etc.).
* **Planes of Expression:** Mental, Physical, Emotional, and Intuitive letter weight percentages.
* **Subconscious Self Number (1–9)** and **Bridge Numbers** (Internal & Relational harmony).
* **Three Major Life Epochs:** Youth, Productivity, and Wisdom cycle spans.

### 3. ☸️ Vector SVG Natal Horoscope Wheel (`js/natalwheel.js`)
* Interactive 12-House astrological wheel rendered in pure vector SVG.
* Dynamic Sun degree boundaries, Mean Moon longitude estimation, and Local Sidereal Time Ascendant calculations.
* Quad-elemental distribution meters (Fire, Earth, Air, Water).
* 28 Lunar Mansions / Nakshatras interpretation engine.

### 4. ⏳ Timing, Epicycles & Transit Forecasts (`js/forecasting.js`)
* Real-time calculation of **Personal Year**, **Personal Month**, and **Personal Day**.
* Interactive **9-Year Epicycle Progress Wheel**.
* **12-Month Transit Roadmaps** for any selected target calendar year.

### 5. 🎵 Solfeggio Harmonic Frequency Synthesizer (`js/audio.js`)
* Zero-dependency Web Audio API harmonic tone generator.
* Resonant frequencies: **432 Hz**, **528 Hz (Miracle/DNA Repair)**, **639 Hz**, **741 Hz**, **852 Hz**, and **963 Hz**.
* Built-in volume slider, auto-shutoff timer, and animated sound-wave visualizer.

### 6. 🏢 Business, Brand & Address Numerology (`js/businessengine.js`)
* Commercial brand vibration analyzer, vowel mission, and consonant impression.
* Founder synergy compatibility score and optimal industry verticals.
* Residential address/dwelling vibration analyzer.

### 7. 🤖 AI Esoteric Oracle (`js/oracle.js`) & Synastry Matcher
* Intelligent chart advisor synthesizing user queries with their complete natal blueprint.
* Multi-subject synastry compatibility calculator comparing Life Path and Destiny resonance.

### 8. 🔐 User Authentication & Scoped Dossier Vault (`js/auth.js`)
* Multi-account management with 4-digit PIN protection and personal Cosmic Sigil avatars (`☉`, `☽`, `✦`, `👁`, `⬡`, `🜂`, `🪷`).
* Isolated client dossier vaults per account.
* **1-Click Encrypted Vault Backup & Restore (`.JSON`)**.

---

## 🚀 Getting Started

No build tools or package managers required. Everything is self-contained.

### Running Locally
```bash
# Clone the repository
git clone https://github.com/your-username/aetheria-numerology-app.git

# Navigate to the folder
cd aetheria-numerology-app

# Start a local web server (Python 3)
python3 -m http.server 3000

# Open in your browser
open http://localhost:3000
```

Or simply double-click `index.html` to run locally via `file:///` mode.

---

## 📁 Repository Structure

```
├── index.html               # Main SPA Entrypoint (all 9 tabs & modals)
├── css/
│   ├── main.css             # Typography, global layout, responsive breakpoints
│   ├── components.css       # Cards, wheels, dials, sigils, audio visualizer
│   └── print.css            # Executive print styling & PDF export optimization
├── js/
│   ├── app.bundle.js        # Universal standalone production bundle
│   ├── app.js               # Main modular controller
│   ├── auth.js              # Multi-account auth & user-scoped vault engine
│   ├── numerology.js        # Pythagorean & Chaldean reduction algorithms
│   ├── astrology.js         # Ephemeris, Sun, Moon, Ascendant & Elements
│   ├── loshu.js             # 3x3 Magic Square, 8 Arrows & Planes of Expression
│   ├── natalwheel.js        # Interactive SVG 12-House Natal Wheel
│   ├── planetaryhours.js    # Real-time Chaldean planetary hours clock
│   ├── audio.js             # Web Audio API Solfeggio synthesizer
│   ├── businessengine.js    # Commercial vibration & address analyzer
│   ├── oracle.js            # Chart consultation AI oracle
│   ├── synthesis.js         # Hybrid cross-synthesis & life mandate
│   ├── forecasting.js       # Personal Year/Month/Day & 9-Year Epicycles
│   ├── export.js            # Markdown generator & dossier storage
│   └── data/                # Sacred remedies, cities, presets & archetypes
├── build_clean_bundle.py    # Python bundle builder & transpiler
└── README.md
```

---

## 📜 License
MIT License • Created with sacred precision for esoteric practitioners and seekers worldwide.
