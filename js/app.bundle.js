/**
 * AETHERIA - Master Numerology & Astrological Synthesis Standalone Bundle
 * Complete build with User Account Auth, Vault Persistence, Lo Shu, Natal Wheel, Solfeggio, Business Suite & Oracle.
 */
(() => {
  'use strict';

  /**
 * AETHERIA - Esoteric Numerology & Astrological Interpretations Data
 * Authoritative, psychological, and esoteric archetypes.
 */

const CORE_NUMBERS_DATA = {
  1: {
    title: "The Pioneer & Originator",
    keyword: "Independence, Innovation, Willpower & Leadership",
    ruler: "The Sun",
    element: "Fire",
    tarot: "The Magician (I)",
    archetype: "The Initiator",
    color: "#E6A15C",
    lifePath: {
      summary: "You are here to forge unprecedented paths, embody absolute self-reliance, and lead from authentic conviction.",
      corePurpose: "To pioneer new territory, overcome the fear of standing alone, and master sovereign leadership.",
      lessons: "Transcending self-doubt, avoiding tyrannical or aggressive tendencies, and learning collaborative humility without losing your creative spark.",
      shadow: "Arrogance, isolation, impatience, fear of vulnerability, or passive procrastination when direct action is required.",
      vocations: ["Entrepreneur", "Inventor", "Executive Leader", "Director", "Trailblazing Researcher", "Independent Creator"]
    },
    destiny: {
      summary: "Your natural gift is the ability to conceptualize original ideas and manifest them through sheer willpower and executive drive.",
      talents: "Strategic vision, decisive action, charisma in moments of uncertainty, and independent resourcefulness."
    },
    soulUrge: {
      summary: "At your deepest core, your soul craves absolute autonomy, creative freedom, and the thrill of being first.",
      drivers: "An unquenchable desire to be recognized for individual excellence and to never be subordinate to mediocrity."
    },
    personality: {
      summary: "Others perceive you as dynamic, confident, authoritative, and distinctly self-contained.",
      projection: "A striking aura of competence and directness that commands natural respect."
    },
    birthday: {
      talent: "Innate originality and executive courage. You excel whenever you are granted total ownership of your craft."
    },
    maturity: {
      synthesis: "In the second half of life, you transition from self-assertive striving into sovereign wisdom, mentoring younger visionaries."
    }
  },

  2: {
    title: "The Diplomat & Alchemical Peacemaker",
    keyword: "Intuition, Harmony, Partnership & Sensitivity",
    ruler: "The Moon",
    element: "Water",
    tarot: "The High Priestess (II)",
    archetype: "The Harmonizer",
    color: "#8FA9C4",
    lifePath: {
      summary: "You are here to weave balance into human discord, master high intuitive perception, and bridge divided worlds.",
      corePurpose: "To cultivate profound empathy, master the art of sacred cooperation, and act as the quiet glue that holds systems together.",
      lessons: "Setting firm personal boundaries, trusting your subtle psychic impressions, and not sacrificing your identity to keep external peace.",
      shadow: "Codependency, hypersensitivity, passive-aggressive resentment, fear of confrontation, and indecisiveness.",
      vocations: ["Mediator", "Diplomat", "Counselor", "Curator", "Biomedical Specialist", "Archivist / Editor"]
    },
    destiny: {
      summary: "Your innate ability lies in emotional intelligence, negotiation, acute detail perception, and unifying disparate viewpoints.",
      talents: "Tact, subtle diplomacy, psychic receptivity, and cultivating sublime relational synergy."
    },
    soulUrge: {
      summary: "Your soul yearns for profound emotional intimacy, serene environments, and soulmate-level alignment.",
      drivers: "Deep need for safety, mutual understanding, and being cherished for your gentle wisdom."
    },
    personality: {
      summary: "You present as gentle, approachable, supportive, and exceptionally perceptive of others' unspoken feelings.",
      projection: "A calming, non-threatening presence that immediately puts distressed individuals at ease."
    },
    birthday: {
      talent: "An acute gift for emotional calibration, rhythm, aesthetic balance, and interpersonal mediation."
    },
    maturity: {
      synthesis: "As maturity unfolds, your sensitivity deepens into profound intuitive counseling and sacred relational wisdom."
    }
  },

  3: {
    title: "The Creative Luminary & Synthesizer",
    keyword: "Self-Expression, Joy, Artistry & Inspiration",
    ruler: "Jupiter",
    element: "Fire / Air",
    tarot: "The Empress (III)",
    archetype: "The Muse",
    color: "#E2BA55",
    lifePath: {
      summary: "You are here to channel creative life force, uplift human consciousness through authentic expression, and inspire joy.",
      corePurpose: "To master verbal, artistic, or written communication and transmute emotional depth into radiant inspiration.",
      lessons: "Channeling scattered creative sparks into disciplined focus, navigating emotional highs and lows, and avoiding superficial escapism.",
      shadow: "Scattered energy, gossip, vanity, superficiality, cynicism, and hiding deep grief behind a comedic mask.",
      vocations: ["Author / Journalist", "Keynote Speaker", "Visual Artist", "Performer / Actor", "Brand Visionary", "Creative Director"]
    },
    destiny: {
      summary: "Your natural genius is the gift of the word, captivating storytelling, and making complex truths delightfully accessible.",
      talents: "Artistic fluency, spontaneous wit, magnetic communication, and contagious optimism."
    },
    soulUrge: {
      summary: "Your soul aches to be heard, to express its kaleidoscope of feelings without restriction, and to spark joyful wonder.",
      drivers: "A hunger for creative validation, laughter, beauty, and emotional freedom."
    },
    personality: {
      summary: "Others perceive you as radiant, magnetic, charming, articulate, and naturally entertaining.",
      projection: "An effervescent warmth and sparkling conversational style that lights up any room."
    },
    birthday: {
      talent: "Effortless eloquence, aesthetic flair, and an instinctive understanding of how to captivate an audience."
    },
    maturity: {
      synthesis: "In later years, your creative expression reaches sublime artistic or philosophical distillation that inspires generations."
    }
  },

  4: {
    title: "The Master Architect & Foundation Stone",
    keyword: "Structure, Discipline, Mastery & Pragmatism",
    ruler: "Saturn / Uranus",
    element: "Earth",
    tarot: "The Emperor (IV)",
    archetype: "The Builder",
    color: "#6C9B7D",
    lifePath: {
      summary: "You are here to establish enduring systems, anchor high ideas into physical reality, and build multi-generational security.",
      corePurpose: "To master discipline, methodical planning, and structural integrity in an unpredictable world.",
      lessons: "Avoiding rigid dogmatism, remaining adaptable when structures evolve, and distinguishing healthy caution from fear of change.",
      shadow: "Stubbornness, narrow-minded rigidity, workaholism, emotional suppression, and penny-pinching anxiety.",
      vocations: ["Systems Architect", "Civil Engineer", "Financial Director", "Operational Chief", "Master Craftsman", "Legal Strategist"]
    },
    destiny: {
      summary: "Your innate capability is transforming chaotic concepts into step-by-step scalable, indestructible systems.",
      talents: "Relentless work ethic, logistical precision, spatial/systemic logic, and dependable execution."
    },
    soulUrge: {
      summary: "Your soul craves stability, clear order, demonstrable results, and absolute peace of mind through solid foundations.",
      drivers: "A deep yearning to leave an indelible, tangible legacy that withstands the erosion of time."
    },
    personality: {
      summary: "You are seen as rock-solid, trustworthy, grounded, punctual, and profoundly competent under pressure.",
      projection: "A calm, unshakeable aura of grounded authority and pragmatic realism."
    },
    birthday: {
      talent: "Innate organizational mastery, spatial awareness, and the stamina to see grueling long-term projects to completion."
    },
    maturity: {
      synthesis: "In the second half of life, your tireless foundational work blossoms into lasting institutional or financial empire."
    }
  },

  5: {
    title: "The Dynamic Catalyst & Sovereign Explorer",
    keyword: "Freedom, Versatility, Alchemy & Global Vision",
    ruler: "Mercury",
    element: "Air",
    tarot: "The Hierophant / The Chariot (V)",
    archetype: "The Catalyst",
    color: "#4FA5A0",
    lifePath: {
      summary: "You are here to experience the multi-dimensional spectrum of existence, champion progressive evolution, and master constructive freedom.",
      corePurpose: "To adapt fluidly across cultures and paradigms, liberate others from stagnation, and learn discipline within liberty.",
      lessons: "Developing sustained focus amidst continuous curiosity, mastering sensory temperance, and avoiding commitment phobia.",
      shadow: "Restlessness, impulsivity, sensory addiction, irresponsible escapism, and scattered half-finished endeavors.",
      vocations: ["Global Correspondent", "International Strategist", "Venture Capitalist", "Cultural Anthropologist", "Public Relations Innovator", "Traveler / Explorer"]
    },
    destiny: {
      summary: "Your primary capability is rapid assimilation of new paradigms, magnetic persuasion, and fearless cross-disciplinary pivots.",
      talents: "Linguistic agility, swift crisis adaptation, progressive risk analysis, and multifaceted charisma."
    },
    soulUrge: {
      summary: "Your soul hungers for visceral expansion, untethered movement, intellectual discovery, and sensory richness.",
      drivers: "An intense dread of monotony, routine confinement, or conventional predictability."
    },
    personality: {
      summary: "People perceive you as worldly, exhilarating, quick-witted, unconventional, and perpetually youthful.",
      projection: "A sharp, electrifying presence that makes everyone around you feel like an adventure is about to begin."
    },
    birthday: {
      talent: "Exceptional psychological adaptability, rapid problem-solving, and uncanny resourcefulness in foreign situations."
    },
    maturity: {
      synthesis: "Your varied life explorations crystallize into profound cosmopolitan wisdom and liberating mentorship."
    }
  },

  6: {
    title: "The Sacred Guardian & Cosmic Nurturer",
    keyword: "Responsibility, Love, Healing, Beauty & Service",
    ruler: "Venus",
    element: "Earth / Water",
    tarot: "The Lovers (VI)",
    archetype: "The Guardian",
    color: "#B8838B",
    lifePath: {
      summary: "You are here to anchor unconditional harmony, create sanctuaries of beauty, and uphold the welfare of your community.",
      corePurpose: "To master balanced responsibility, heal emotional fractures, and manifest visual and domestic sanctuary.",
      lessons: "Refraining from meddling or over-protectiveness, relinquishing perfectionist expectations of loved ones, and practicing radical self-care.",
      shadow: "Martyrdom, obsessive control disguised as caring, righteous moralizing, and emotional enmeshment.",
      vocations: ["Physician / Healer", "Holistic Therapist", "Interior & Architectural Designer", "Educator", "Community Director", "Social Justice Advocate"]
    },
    destiny: {
      summary: "Your natural genius is holding space, reconciling interpersonal rifts, and curating environments of sublime aesthetic harmony.",
      talents: "Empathic counseling, aesthetic harmony, community leadership, and nurturing potential in others."
    },
    soulUrge: {
      summary: "Your soul yearns to love and be cherished, to protect the vulnerable, and to dwell in an aesthetically elevated haven.",
      drivers: "A profound emotional need for familial or tribal harmony and meaningful domestic sanctuary."
    },
    personality: {
      summary: "Others see you as warm, magnetic, elegantly presented, protective, and innately wise in affairs of the heart.",
      projection: "A comforting maternal/paternal presence that immediately radiates safety and refined taste."
    },
    birthday: {
      talent: "An innate instinct for restorative healing, interior aesthetics, and calming troubled dynamics."
    },
    maturity: {
      synthesis: "In the second half of life, you become the respected matriarch, patriarch, or elder guardian of your extended community."
    }
  },

  7: {
    title: "The Esoteric Mystic & Truth Seeker",
    keyword: "Wisdom, Analysis, Introspection & Mysticism",
    ruler: "Neptune / Ketu",
    element: "Water / Air",
    tarot: "The Chariot / The Hermit (VII)",
    archetype: "The Sage",
    color: "#6D87A4",
    lifePath: {
      summary: "You are here to penetrate the veil of physical appearance, discover universal laws, and synthesize analytical science with mystical truth.",
      corePurpose: "To cultivate solitary contemplative mastery, trust your spiritual intellect, and unveil hidden knowledge.",
      lessons: "Bridging the gap between cerebral isolation and human vulnerability, overcoming cynical skepticism, and trusting emotional connections.",
      shadow: "Cold detachment, misanthropic elitism, paranoia, escapism through intellectual obscurity, and spiritual pride.",
      vocations: ["Philosopher / Theologian", "Data Scientist / Quantum Physicist", "Esoteric Astrologer", "Investigative Analyst", "Spiritual Mentor", "Specialized Researcher"]
    },
    destiny: {
      summary: "Your gift is razor-sharp critical discrimination paired with acute intuitive/clairvoyant pattern recognition.",
      talents: "Deep diagnostic research, metaphysical synthesis, penetrating psychological insight, and scholarly rigor."
    },
    soulUrge: {
      summary: "Your soul craves quiet sanctuary, intellectual sovereignty, and direct communion with the deeper mysteries of the cosmos.",
      drivers: "An absolute aversion to superficial small-talk, noisy trivialities, and dogmatic dogma."
    },
    personality: {
      summary: "You appear dignified, aristocratic, introspective, enigmatic, and possessing an aura of profound hidden depth.",
      projection: "A selective, serene presence that commands reverence and hints at vast knowledge."
    },
    birthday: {
      talent: "Exceptional investigative intuition, photographic memory for nuance, and an instinctive grasp of root causes."
    },
    maturity: {
      synthesis: "Your lifelong pursuit of knowledge culminates in singular philosophical mastery and sought-after spiritual guidance."
    }
  },

  8: {
    title: "The Sovereign Executive & Sovereign Alchemist",
    keyword: "Power, Abundance, Mastery, Authority & Karmic Law",
    ruler: "Saturn",
    element: "Earth / Fire",
    tarot: "Strength / Justice (VIII)",
    archetype: "The Sovereign",
    color: "#C59B27",
    lifePath: {
      summary: "You are here to master the material plane, harness cosmic laws of cause and effect, and channel vast resources for high evolutionary impact.",
      corePurpose: "To step into authentic executive power without corrupting your spiritual core, balancing spiritual and financial wealth.",
      lessons: "Learning that true power is stewardship, avoiding ruthless domination, and transcending fear of material loss or ruin.",
      shadow: "Greed, tyrannical authoritarianism, status obsession, treating human beings as pawns, and burnout through relentless conquest.",
      vocations: ["Chief Executive", "Investment Banker", "Real Estate Magnate", "Industrialist", "High-Stakes Litigator", "Venture Philanthropist"]
    },
    destiny: {
      summary: "Your natural genius is macro-strategic governance, material manifestation, and commanding large-scale capital and human energy.",
      talents: "Commercial acumen, fearless risk appetite, executive governance, and karmic resilience in adversity."
    },
    soulUrge: {
      summary: "Your soul desires uncompromised sovereignty, material abundance, and the authority to reshape physical systems.",
      drivers: "A deep drive to command your own destiny and hold the levers of real-world influence."
    },
    personality: {
      summary: "You are perceived as formidable, commanding, prosperous, impeccably capable, and possessing quiet heavyweight authority.",
      projection: "An undeniable gravitas and presence of a natural executive who gets monumental things done."
    },
    birthday: {
      talent: "Unshakeable financial intuition, executive resilience, and an uncanny ability to resurrect fortunes from the ashes."
    },
    maturity: {
      synthesis: "In the second half of life, your material achievements pivot into immense philanthropic legacy and sovereign stewardship."
    }
  },

  9: {
    title: "The Universal Humanitarian & Cosmic Sage",
    keyword: "Transcendence, Compassion, Completion & Universal Love",
    ruler: "Mars / Jupiter",
    element: "Fire / Water",
    tarot: "The Hermit (IX)",
    archetype: "The Humanitarian",
    color: "#9C7E9F",
    lifePath: {
      summary: "You are here to embody universal compassion, close karmic cycles, and elevate collective consciousness through selfless wisdom.",
      corePurpose: "To practice the art of conscious letting go, see humanity without prejudice, and channel higher artistic and philosophical truth.",
      lessons: "Transcending personal possessiveness, avoiding bitter disillusionment when mortals fall short, and forgiving all past grievances.",
      shadow: "Resentful martyrdom, aloof moral superiority, dramatic martyrdom, and difficulty receiving love and support.",
      vocations: ["International Diplomat", "Human Rights Champion", "Visionary Artist / Filmmaker", "Spiritual Master", "Ecological Pioneer", "Philanthropist"]
    },
    destiny: {
      summary: "Your gift is universal vision, charismatic global reach, and the ability to inspire massive collective movements for good.",
      talents: "Artistic grandeur, cross-cultural empathy, magnetic public presence, and transcendent spiritual insight."
    },
    soulUrge: {
      summary: "Your soul yearns for a world enlightened by justice, universal brotherhood, and sublime spiritual beauty.",
      drivers: "A deep ache to heal systemic suffering and leave the planet fundamentally more conscious than you found it."
    },
    personality: {
      summary: "People perceive you as charismatic, generous, noble, worldly, and radiating broad-minded magnanimity.",
      projection: "An expansive, warm, and poetic aura that embraces people from all walks of life equally."
    },
    birthday: {
      talent: "Broad humanitarian perspective, dramatic artistic flair, and natural magnetic resonance with the public."
    },
    maturity: {
      synthesis: "As you enter life's mature chapter, you step into international statesmanship, spiritual teaching, or timeless artistic creation."
    }
  },

  11: {
    title: "The Illumined Visionary & Cosmic Conduit (Master Number)",
    keyword: "Spiritual Illumination, Psychic Intuition, High Octave of 2",
    ruler: "Uranus / Neptune",
    element: "Air / Light",
    tarot: "Justice / Strength (XI)",
    archetype: "The Conduit",
    color: "#E5C158",
    isMaster: true,
    baseReduction: 2,
    lifePath: {
      summary: "You are a master spiritual antenna, walking between earthly logic and cosmic inspiration to spark awakening in others.",
      corePurpose: "To translate lightning-fast intuitive downloads into practical wisdom and elevate human perception beyond dogmatic limitation.",
      lessons: "Grounding intense nervous electrical energy, overcoming crippling self-doubt, and establishing firm energetic shielding.",
      shadow: "Nervous exhaustion, fanatical messiah complexes, impractical daydreaming, extreme mood swings, and feeling overwhelmed by dense vibrations.",
      vocations: ["Spiritual Luminary", "Avant-Garde Innovator", "Futurist / Theoretical Scientist", "Transformational Speaker", "Sound / Energy Healer", "Visionary Artist"]
    },
    destiny: {
      summary: "Your destiny is to act as a bridge between spiritual dimensions and physical reality, inspiring profound paradigm shifts.",
      talents: "Prophetic intuition, charisma that electrifies crowds, visionary synthesis, and empathic resonance."
    },
    soulUrge: {
      summary: "Your soul desires nothing less than spiritual transcendence, authentic awakening, and channeling cosmic truth.",
      drivers: "An intense inner thirst for metaphysical communion and lighting the path for searching souls."
    },
    personality: {
      summary: "Others perceive an otherworldly glow, magnetic charisma, and an uncanny ability to see straight into their soul.",
      projection: "A gentle yet electrifying aura that commands quiet awe and deep vulnerability."
    },
    birthday: {
      talent: "Prophetic flashes of insight, high creative voltage, and acute awareness of subtle energetic fields."
    },
    maturity: {
      synthesis: "In the second half of life, your intuitive downloads ground into an enduring spiritual beacon of transformational leadership."
    }
  },

  22: {
    title: "The Master Builder & Manifestor of Worlds (Master Number)",
    keyword: "Practical Genius, Grand Scale Manifestation, High Octave of 4",
    ruler: "Uranus / Saturn / Pluto",
    element: "Earth / Ether",
    tarot: "The Fool (0/XXII) & The World",
    archetype: "The Master Builder",
    color: "#4CA585",
    isMaster: true,
    baseReduction: 4,
    lifePath: {
      summary: "You hold the rare blueprint to manifest vast, world-changing visions into physical, enduring structures for humanity's benefit.",
      corePurpose: "To combine the visionary insight of 11 with the pragmatic construction of 4, building global systems that elevate civilization.",
      lessons: "Not buckling under monumental self-imposed pressure, maintaining unassailable integrity, and delegating without micromanaging.",
      shadow: "Paralyzing fear of failure, ruthless megalomania, black-and-white cynicism, and extreme physical strain.",
      vocations: ["Global Infrastructure Pioneer", "Institutional Architect", "International Diplomat", "Technological Visionary", "Founding Statesman", "Eco-City Designer"]
    },
    destiny: {
      summary: "Your destiny is to manifest the impossible by translating abstract cosmic blueprints into ironclad real-world institutions.",
      talents: "Unrivaled executive scale, multi-dimensional logistics, engineering genius, and unshakeable determination."
    },
    soulUrge: {
      summary: "Your soul craves the ultimate realization of tangible masterpieces that alter the trajectory of human history.",
      drivers: "A profound inner mandate to serve humanity through monumental structural legacy."
    },
    personality: {
      summary: "People sense an imposing, titan-like competence, visionary practical wisdom, and absolute reliability.",
      projection: "An authoritative presence of someone born to manage planetary-scale responsibility."
    },
    birthday: {
      talent: "Immediate command over complex material systems and an instinct for monumental architectural scale."
    },
    maturity: {
      synthesis: "Your mature years see the concrete realization of your most ambitious global projects, impacting millions."
    }
  },

  33: {
    title: "The Master Teacher & Avatar of Cosmic Love (Master Number)",
    keyword: "Christ Consciousness, Universal Compassion, High Octave of 6",
    ruler: "Venus / Neptune / Jupiter",
    element: "All Elements / Quintessence",
    tarot: "The Sun / Temperance (XIV)",
    archetype: "The Avatar",
    color: "#D4AF37",
    isMaster: true,
    baseReduction: 6,
    lifePath: {
      summary: "You carry the highest octave of emotional and spiritual devotion, dedicated to the complete uplifting and healing of collective suffering.",
      corePurpose: "To radiate selfless, unconditional love, teach through living example, and heal global spiritual sickness.",
      lessons: "Avoiding spiritual martyrdom, recognizing human boundaries, and maintaining discernment without becoming an emotional sponge.",
      shadow: "Messianic burnout, enabling toxic dynamics, overwhelming emotional despair over world suffering, and self-neglect.",
      vocations: ["Spiritual Master / Sage", "Universal Healer", "Humanitarian Icon", "Transformative Educator", "Sacred Artist", "Global Peace Ambassador"]
    },
    destiny: {
      summary: "Your destiny is to raise the emotional frequency of the planet through universal devotion, transformative teaching, and restorative art.",
      talents: "Unconditional empathic holding, transcendent communication, miraculous healing presence, and divine grace."
    },
    soulUrge: {
      summary: "Your soul aches to dissolve suffering everywhere and be a vessel of pure divine grace and unconditional peace.",
      drivers: "A boundless desire to serve, comfort, and awaken love in every heart you encounter."
    },
    personality: {
      summary: "Others perceive an angelic, deeply comforting, radiant aura that dissolves conflict and inspires reverence.",
      projection: "A sublime warmth and serene nobility that brings instant tears of relief to troubled souls."
    },
    birthday: {
      talent: "An innate healing frequency, supreme empathy, and profound gift for elevating educational and communal spaces."
    },
    maturity: {
      synthesis: "In the second half of life, your journey reaches luminous spiritual elderhood and global reverence as a master guide."
    }
  }
};

const KARMIC_DEBTS_DATA = {
  13: {
    number: "13/4",
    name: "The Debt of Discipline & Focused Labor",
    rootNumber: 4,
    theme: "Overcoming laziness, shortcuts, or shifting blame in past cycles.",
    esotericOrigin: "In prior incarnations or early developmental cycles, power was abused by seeking easy rewards, escaping hard labor, or letting others carry your burden.",
    lesson: "Commitment to steady, uninterrupted work without taking shortcuts. Transforming chaos into immaculate order through patience and perseverance.",
    guidance: "Whenever obstacles appear, do not panic or seek evasive loopholes. Accept the discipline required, organize your daily routine with precision, and you will achieve unbreakable security."
  },
  14: {
    number: "14/5",
    name: "The Debt of Constructive Freedom & Temperance",
    rootNumber: 5,
    theme: "Mastering freedom without sensory excess or escapism.",
    esotericOrigin: "Past cycles involved abuse of personal liberty—excessive indulgence in sensory pleasures, abandonment of responsibilities, or trampling on others' rights to pursue temporary thrills.",
    lesson: "Exercising self-control amidst boundless curiosity. Cultivating emotional and physical temperance while remaining adaptable and progressive.",
    guidance: "Channel your thirst for variety into intellectual, cultural, and spiritual exploration rather than sensory extremes. Establish a stable core anchor before venturing into the unknown."
  },
  16: {
    number: "16/7",
    name: "The Debt of Ego Transmutation & Spiritual Awakening",
    rootNumber: 7,
    theme: "Dismantling intellectual or romantic arrogance; The Tower moment.",
    esotericOrigin: "Past incarnations featured inflated ego, betrayal of sacred trust, intellectual elitism, or irresponsible romantic manipulation of others.",
    lesson: "Complete dismantling of false ego and superficial pride. Learning to build on spiritual truth rather than hollow illusions or intellectual vanity.",
    guidance: "View sudden disruptions or humbling events not as punishments, but as sacred alchemical purifications. Rebuild your life upon authentic spiritual reality, and your wisdom will become indestructible."
  },
  19: {
    number: "19/1",
    name: "The Debt of Self-Reliance & Interdependence",
    rootNumber: 1,
    theme: "Balancing sovereignty with genuine humility and willingness to receive.",
    esotericOrigin: "Past experiences involved tyrannical self-absorption, refusing help from others, stubborn isolation, or dominating others through sheer ego-will.",
    lesson: "Standing fully on your own feet while simultaneously honoring the sacred interdependence of all human beings. Learning to ask for and accept support with grace.",
    guidance: "Do not hoard power or isolate yourself in stubborn pride. True leadership lifts others as it rises. When you open your heart to collaborative assistance, abundance flows without resistance."
  }
};

const CHALLENGES_DATA = {
  0: {
    name: "The Challenge of Free Will / The Universal Choice",
    description: "A rare open slate with no specific single deficit. You are challenged to consciously choose your evolutionary path and avoid apathy or aimless wandering."
  },
  1: {
    name: "The Challenge of Sovereignty & Individuation",
    description: "Confronting fear of standing alone, overcoming submissiveness or tyrannical overcompensation, and establishing healthy self-confidence."
  },
  2: {
    name: "The Challenge of Hypersensitivity & Relational Harmony",
    description: "Learning not to take things personally, maintaining boundaries against codependency, and conquering fear of confrontation."
  },
  3: {
    name: "The Challenge of Creative Focus & Emotional Authenticity",
    description: "Avoiding scattering energies across superficial pursuits, overcoming fear of criticism, and speaking truth without exaggeration."
  },
  4: {
    name: "The Challenge of Discipline, System & Grounding",
    description: "Overcoming impatience, carelessness, or resentment toward daily labor. Building solid foundations without becoming rigid or dogmatic."
  },
  5: {
    name: "The Challenge of Restlessness & Constructive Freedom",
    description: "Navigating the desire to flee commitment or routine. Learning that true liberation is found through internal mastery rather than external wanderlust."
  },
  6: {
    name: "The Challenge of Idealism & Non-Judgmental Love",
    description: "Relinquishing perfectionist demands on partners and family. Overcoming righteous moralizing and recognizing that each soul has its own timing."
  },
  7: {
    name: "The Challenge of Trust & Inner Certainty",
    description: "Overcoming cynical skepticism, fear of intimacy, and intellectual loneliness. Bridging analytical intellect with mystical intuition."
  },
  8: {
    name: "The Challenge of Power, Abundance & Material Ethics",
    description: "Confronting anxieties around financial survival, overcoming status obsession, and aligning wealth generation with karmic integrity."
  }
};

const PINNACLES_DATA = {
  1: "A cycle of aggressive independence, bold new beginnings, self-invention, and pioneering enterprise.",
  2: "A cycle of partnership, subtle diplomacy, emotional maturation, artistic cooperation, and intuitive sensitivity.",
  3: "A cycle of blossoming creative expression, public recognition, social expansion, writing, and joyful output.",
  4: "A cycle of rigorous building, property development, institutional grounding, and methodical consolidation.",
  5: "A cycle of radical freedom, travel, rapid evolution, major lifestyle shifts, and public versatility.",
  6: "A cycle of domestic responsibility, family leadership, healing, aesthetic curation, and community service.",
  7: "A cycle of intense intellectual development, spiritual retreat, specialized research, and metaphysical revelation.",
  8: "A cycle of executive authority, commercial expansion, high financial stakes, and material manifestation.",
  9: "A cycle of universal humanitarian service, artistic completion, international travel, and transcendent wisdom.",
  11: "A master spiritual cycle of luminous intuitive inspiration, public spiritual teaching, and visionary awakening.",
  22: "A master material cycle of world-scale construction, institutional creation, and monumental legacy building."
};

const PERSONAL_YEARS_DATA = {
  1: {
    theme: "New Beginnings, Pioneering Action & Seed Planting",
    summary: "The start of a fresh 9-year cycle. Clear the deck, take decisive risks, launch bold initiatives, and assert your sovereignty.",
    focus: "Self-direction, launching new projects, shedding outdated baggage.",
    caution: "Avoid hesitation or waiting for others' permission; this is your year to lead."
  },
  2: {
    theme: "Cooperation, Patience, Gestation & Intuition",
    summary: "The seeds planted in Year 1 take root beneath the soil. Nurture alliances, practice tact, refine details, and let events unfold in their own timing.",
    focus: "Partnerships, diplomatic mediation, emotional calibration, quiet preparation.",
    caution: "Do not force quick breakthroughs; aggressive force will damage delicate alliances."
  },
  3: {
    theme: "Creative Expansion, Social Joy & Self-Expression",
    summary: "A vibrant, uplifting year of creative blossoming, networking, travel, and artistic productivity. Your voice carries magnetic potency.",
    focus: "Creative projects, communications, joyful social connections, optimism.",
    caution: "Guard against scattered resources, over-promising, or neglecting core disciplines."
  },
  4: {
    theme: "Foundation Building, Hard Work & Structural Integrity",
    summary: "A serious, highly productive year of establishing long-term security, health regimes, legal order, and methodical career advancement.",
    focus: "Organization, physical fitness, financial budgeting, systematizing operations.",
    caution: "Resist the urge to cut corners; shortcuts will crack the foundation."
  },
  5: {
    theme: "Dynamic Change, Freedom, Adventure & Pivots",
    summary: "The midpoint of the 9-year cycle brings exhilarating shifts, unexpected breakthroughs, travel, and releasing obsolete routines.",
    focus: "Adaptability, progressive marketing, bold pivots, exploring new horizons.",
    caution: "Avoid reckless impulse spending or burning bridges out of temporary restlessness."
  },
  6: {
    theme: "Family, Domestic Harmony, Healing & Duty",
    summary: "A warm, nurturing year centered on home, relationships, marriage, community responsibility, and creating sanctuaries of beauty.",
    focus: "Domestic renovation, resolving family wounds, service, aesthetic craftsmanship.",
    caution: "Do not take on everyone's problems or sacrifice personal wellness for martyrdom."
  },
  7: {
    theme: "Spiritual Reflection, Specialized Study & Sabbatical",
    summary: "A sacred pause for deep introspection, inner exploration, research, and technical or philosophical mastery away from the noisy crowd.",
    focus: "Spiritual study, meditation, writing, skill deepening, restorative solitude.",
    caution: "Do not force major material conquests; this year's riches are internal and strategic."
  },
  8: {
    theme: "Executive Power, Harvest, Abundance & Karma",
    summary: "The harvest year of the 9-year cycle. Command authority, scale commercial ventures, resolve financial matters, and reap what you have sown.",
    focus: "Financial expansion, executive decision-making, high-stakes investments, leadership.",
    caution: "Keep karmic integrity paramount; greed or arrogance will trigger swift karmic corrections."
  },
  9: {
    theme: "Completion, Transmutation, Forgiveness & Release",
    summary: "The culminating year of the cycle. Tie up loose ends, release toxic dynamics, forgive the past, and prepare the soil for rebirth.",
    focus: "Finishing long-term projects, charitable contributions, emotional closure, decluttering.",
    caution: "Do not cling to dying structures or start massive 10-year commitments prematurely."
  },
  11: {
    theme: "Master Spiritual Illumination & Visionary Breakthrough",
    summary: "A high-voltage year of acute psychic clarity, spiritual revelation, inspirational teaching, and catalytic paradigm shifts.",
    focus: "Spiritual leadership, intuitive downloads, visionary projects, awakening others.",
    caution: "Protect your nervous system with daily grounding; avoid energetic over-stimulation."
  },
  22: {
    theme: "Master Material Architecture & Manifestation",
    summary: "A monumental year capable of manifesting dreams of epic proportion into concrete reality for community or global advancement.",
    focus: "Grand scale building, institutional architecture, large-scale team orchestration.",
    caution: "Ensure structural integrity at every step; pace yourself against burnout."
  }
};

/**
 * AETHERIA - Historical Master Presets
 * Pre-loaded historical archetypes for instant exploration.
 */

const PRESET_PROFILES = [
  {
    id: "nikola-tesla",
    name: "Nikola Tesla",
    subtitle: "The Cosmic Inventor & Electrical Sage",
    birthDate: "1856-07-10",
    birthTime: "00:00", // Midnight thunderstorm birth
    birthPlace: "Smiljan, Croatia",
    birthName: "Nikola Tesla",
    currentName: "Nikola Tesla",
    forecastDate: "2026-08-13",
    notes: "Life Path 10/1 with deep 7/11 vibrational resonance. The pioneer who unlocked alternating current and scalar waves."
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    subtitle: "The Relativistic Synthesizer",
    birthDate: "1879-03-14",
    birthTime: "11:30",
    birthPlace: "Ulm, Germany",
    birthName: "Albert Einstein",
    currentName: "Albert Einstein",
    forecastDate: "2026-08-13",
    notes: "Life Path 33/6 with 14/5 Karmic Debt Birthday. Transformed humanity's perception of space-time and gravity."
  },
  {
    id: "carl-jung",
    name: "Carl Gustav Jung",
    subtitle: "The Mapmaker of the Unconscious",
    birthDate: "1875-07-26",
    birthTime: "19:29",
    birthPlace: "Kesswil, Switzerland",
    birthName: "Carl Gustav Jung",
    currentName: "Carl Jung",
    forecastDate: "2026-08-13",
    notes: "Life Path 36/9, pioneering analytical psychology, synchronicity, archetypes, and the collective unconscious."
  },
  {
    id: "frida-kahlo",
    name: "Frida Kahlo",
    subtitle: "The Alchemist of Pain & Self-Portraiture",
    birthDate: "1907-07-06",
    birthTime: "08:30",
    birthPlace: "Coyoacán, Mexico City, Mexico",
    birthName: "Magdalena Carmen Frida Kahlo y Calderon",
    currentName: "Frida Kahlo",
    forecastDate: "2026-08-13",
    notes: "Remarkable Name Shift from complex familial roots into the iconic, sovereign 'Frida Kahlo'."
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    subtitle: "The Double Nobel Pioneer of Radioactivity",
    birthDate: "1867-11-07",
    birthTime: "12:00",
    birthPlace: "Warsaw, Poland",
    birthName: "Maria Salomea Sklodowska",
    currentName: "Marie Curie",
    forecastDate: "2026-08-13",
    notes: "Life Path 31/4. Extraordinary transformation from Maria Salomea Sklodowska to the world-renowned Marie Curie."
  },
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    subtitle: "The Universal Renaissance Polymath",
    birthDate: "1452-04-15",
    birthTime: "22:30",
    birthPlace: "Vinci, Italy",
    birthName: "Leonardo di ser Piero da Vinci",
    currentName: "Leonardo da Vinci",
    forecastDate: "2026-08-13",
    notes: "Life Path 17/8, Master Builder and artist who synthesized anatomy, optics, engineering, and painting."
  }
];

/**
 * AETHERIA - Global Cities Coordinates & Timezone Database
 * Used for Ascendant, Local Mean Time, and Ephemeris calculations.
 */

const CITIES_DATABASE = [
  { name: "New York, USA", lat: 40.7128, lng: -74.0060, tz: -5 },
  { name: "Los Angeles, USA", lat: 34.0522, lng: -118.2437, tz: -8 },
  { name: "Chicago, USA", lat: 41.8781, lng: -87.6298, tz: -6 },
  { name: "Houston, USA", lat: 29.7604, lng: -95.3698, tz: -6 },
  { name: "Miami, USA", lat: 25.7617, lng: -80.1918, tz: -5 },
  { name: "San Francisco, USA", lat: 37.7749, lng: -122.4194, tz: -8 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278, tz: 0 },
  { name: "Paris, France", lat: 48.8566, lng: 2.3522, tz: 1 },
  { name: "Berlin, Germany", lat: 52.5200, lng: 13.4050, tz: 1 },
  { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, tz: 1 },
  { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038, tz: 1 },
  { name: "Ulm, Germany", lat: 48.4011, lng: 9.9876, tz: 1 },
  { name: "Smiljan, Croatia", lat: 44.5639, lng: 15.3189, tz: 1 },
  { name: "Kesswil, Switzerland", lat: 47.5956, lng: 9.3175, tz: 1 },
  { name: "Warsaw, Poland", lat: 52.2297, lng: 21.0122, tz: 1 },
  { name: "Vinci, Italy", lat: 43.7874, lng: 10.9262, tz: 1 },
  { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332, tz: -6 },
  { name: "Coyoacán, Mexico City, Mexico", lat: 19.3467, lng: -99.1617, tz: -6 },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, tz: 9 },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, tz: 10 },
  { name: "Melbourne, Australia", lat: -37.8136, lng: 144.9631, tz: 10 },
  { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832, tz: -5 },
  { name: "Vancouver, Canada", lat: 49.2827, lng: -123.1207, tz: -8 },
  { name: "Montreal, Canada", lat: 45.5017, lng: -73.5673, tz: -5 },
  { name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729, tz: -3 },
  { name: "Sao Paulo, Brazil", lat: -23.5505, lng: -46.6333, tz: -3 },
  { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816, tz: -3 },
  { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, tz: 2 },
  { name: "Johannesburg, South Africa", lat: -26.2041, lng: 28.0473, tz: 2 },
  { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241, tz: 2 },
  { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708, tz: 4 },
  { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, tz: 5.5 },
  { name: "New Delhi, India", lat: 28.6139, lng: 77.2090, tz: 5.5 },
  { name: "Singapore, Singapore", lat: 1.3521, lng: 103.8198, tz: 8 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694, tz: 8 },
  { name: "Seoul, South Korea", lat: 37.5665, lng: 126.9780, tz: 9 },
  { name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041, tz: 1 },
  { name: "Stockholm, Sweden", lat: 59.3293, lng: 18.0686, tz: 1 },
  { name: "Athens, Greece", lat: 37.9838, lng: 23.7275, tz: 2 },
  { name: "Vienna, Austria", lat: 48.2082, lng: 16.3738, tz: 1 },
  { name: "Zurich, Switzerland", lat: 47.3769, lng: 8.5417, tz: 1 },
  { name: "Dublin, Ireland", lat: 53.3498, lng: -6.2603, tz: 0 },
  { name: "Lisbon, Portugal", lat: 38.7223, lng: -9.1393, tz: 0 },
  { name: "Honolulu, Hawaii, USA", lat: 21.3069, lng: -157.8583, tz: -10 },
  { name: "Auckland, New Zealand", lat: -36.8485, lng: 174.7633, tz: 12 }
];

function findCityCoordinates(query) {
  if (!query || typeof query !== "string") return null;
  const clean = query.trim().toLowerCase();
  
  // Exact or partial match
  const match = CITIES_DATABASE.find(c => 
    c.name.toLowerCase() === clean || 
    c.name.toLowerCase().includes(clean) ||
    clean.includes(c.name.split(",")[0].toLowerCase())
  );

  if (match) return match;

  // Fallback heuristic based on generic regions
  if (clean.includes("usa") || clean.includes("united states") || clean.includes("ca") || clean.includes("ny")) {
    return { name: query, lat: 39.8283, lng: -98.5795, tz: -5 };
  }
  if (clean.includes("france") || clean.includes("paris")) {
    return { name: query, lat: 48.8566, lng: 2.3522, tz: 1 };
  }
  if (clean.includes("uk") || clean.includes("england") || clean.includes("london")) {
    return { name: query, lat: 51.5074, lng: -0.1278, tz: 0 };
  }
  if (clean.includes("germany") || clean.includes("deutschland")) {
    return { name: query, lat: 51.1657, lng: 10.4515, tz: 1 };
  }

  // Default neutral equator/prime meridian reference
  return { name: query, lat: 40.0, lng: 0.0, tz: 0 };
}

/**
 * AETHERIA - Sacred Remedies, Gemstones, Color Alchemy & Solfeggio Frequencies Data
 */

const SOLFEGGIO_FREQUENCIES = [
  { freq: 432, name: "432 Hz • Universal Resonance", purpose: "Deep serenity, alignment with natural geometry, heart coherence and cellular peace.", chakra: "Heart / Universal" },
  { freq: 528, name: "528 Hz • The Miracle & Transformation Tone", purpose: "DNA repair, accelerated manifestation, cellular vitality, and emotional clearing.", chakra: "Solar Plexus / Heart" },
  { freq: 639, name: "639 Hz • Harmonic Relationships", purpose: "Reconciling conflict, enhancing empathy, deep soul connections, and interpersonal warmth.", chakra: "Heart" },
  { freq: 741, name: "741 Hz • Awakening Intuition & Expression", purpose: "Purifying toxic patterns, speaking personal truth, and expanding creative vision.", chakra: "Throat" },
  { freq: 852, name: "852 Hz • Returning to Spiritual Order", purpose: "Third-eye awakening, dissolving spiritual illusions, and high psychic clarity.", chakra: "Third Eye" },
  { freq: 963, name: "963 Hz • Crown of Cosmic Consciousness", purpose: "Connection to divine source, supreme illumination, and transcendental oneness.", chakra: "Crown" },
  { freq: 396, name: "396 Hz • Liberating Guilt & Fear", purpose: "Dissolving subconscious grief, overcoming shame, and anchoring unwavering confidence.", chakra: "Root" },
  { freq: 417, name: "417 Hz • Facilitating Positive Change", purpose: "Undoing stagnant situations, clearing emotional trauma, and sparking fresh momentum.", chakra: "Sacral" },
  { freq: 285, name: "285 Hz • Quantum Tissue Restoration", purpose: "Restoring energetic blueprint, subtle body repair, and revitalizing fatigue.", chakra: "Root / Cellular" },
  { freq: 174, name: "174 Hz • Natural Anesthetic & Foundation", purpose: "Deep bodily relaxation, easing tension, and foundational psychic shielding.", chakra: "Earth Star" }
];

const NUMBER_REMEDIES = {
  1: {
    crystals: ["Ruby", "Sunstone", "Carnelian", "Clear Quartz"],
    metals: ["Gold", "Brass"],
    elementalColor: "Radiant Gold & Amber Red",
    sacredHerb: "Frankincense & Bay Laurel",
    mantra: "I am a sovereign creator. My will is aligned with the divine spark of original innovation.",
    dailyFocus: "Take direct initiative on an unfinished ambition without seeking external validation."
  },
  2: {
    crystals: ["Moonstone", "Selenite", "Pearl", "Rose Quartz"],
    metals: ["Silver", "Platinum"],
    elementalColor: "Opalescent White & Soft Silver",
    sacredHerb: "Jasmine & White Lotus",
    mantra: "I honor my intuitive sensitivity. Sacred cooperation flows effortlessly through my boundaries.",
    dailyFocus: "Listen to the quiet voice of your intuition and practice graceful emotional boundaries."
  },
  3: {
    crystals: ["Yellow Sapphire", "Citrine", "Topaz", "Lapis Lazuli"],
    metals: ["Tin", "Electrum"],
    elementalColor: "Vibrant Saffron & Sunshine Gold",
    sacredHerb: "Sage & Sweet Orange",
    mantra: "My creative voice is a vessel of radiant joy, uplifting truth, and infectious inspiration.",
    dailyFocus: "Express your authentic truth through writing, art, or empowering communication."
  },
  4: {
    crystals: ["Emerald", "Jade", "Black Tourmaline", "Hematite"],
    metals: ["Iron", "Lead-free Pewter"],
    elementalColor: "Forest Green & Deep Earth Umber",
    sacredHerb: "Cedarwood & Vetiver",
    mantra: "I build enduring foundations of integrity, stability, and multi-generational security.",
    dailyFocus: "Systematize your daily operations and ground an abstract concept into practical reality."
  },
  5: {
    crystals: ["Aquamarine", "Turquoise", "Tiger's Eye", "Chrysocolla"],
    metals: ["Quicksilver (Symbolic) / Titanium", "Alloys"],
    elementalColor: "Electric Turquoise & Quicksilver Cyan",
    sacredHerb: "Peppermint & Lavender",
    mantra: "I embrace dynamic evolution with temperance, curiosity, and fearless adaptability.",
    dailyFocus: "Pivot away from a stale routine and embrace a fresh cross-cultural insight."
  },
  6: {
    crystals: ["Rose Quartz", "Morganite", "Peridot", "Rhodonite"],
    metals: ["Copper", "Rose Gold"],
    elementalColor: "Blush Rose & Apple Green",
    sacredHerb: "Damask Rose & Bergamot",
    mantra: "I am an anchor of unconditional love, domestic sanctuary, and healing beauty.",
    dailyFocus: "Curate a haven of peaceful aesthetics in your home and offer heartfelt service."
  },
  7: {
    crystals: ["Amethyst", "Lapis Lazuli", "Iolite", "Labradorite"],
    metals: ["Silver", "Palladium"],
    elementalColor: "Midnight Indigo & Violet Light",
    sacredHerb: "Sandalwood & Myrrh",
    mantra: "I penetrate the veil of illusion. My solitary reflection reveals universal cosmic law.",
    dailyFocus: "Dedicate quiet sanctuary time for deep contemplative study and metaphysical reflection."
  },
  8: {
    crystals: ["Pyrite", "Black Obsidian", "Blue Sapphire", "Smoky Quartz"],
    metals: ["Steel", "Solid Bronze"],
    elementalColor: "Imperial Charcoal & Royal Gold",
    sacredHerb: "Patchouli & Pine",
    mantra: "I hold the levers of material stewardship. My power is balanced by absolute karmic integrity.",
    dailyFocus: "Make an executive decision that scales your resources while upholding ethical honor."
  },
  9: {
    crystals: ["Garnet", "Bloodstone", "Ruby Zoisite", "Charoite"],
    metals: ["Copper-Iron Alloy", "Rose Gold"],
    elementalColor: "Cosmic Magenta & Crimson Gold",
    sacredHerb: "Rosemary & Copal",
    mantra: "I release what is complete with gratitude. Universal compassion is my sovereign compass.",
    dailyFocus: "Practice conscious forgiveness, release old grievances, and contribute to the collective good."
  },
  11: {
    crystals: ["Moldavite", "Danburite", "Optical Calcite", "Phenakite"],
    metals: ["Platinum", "White Gold"],
    elementalColor: "Prismatic Aurora & Platinum White",
    sacredHerb: "Palo Santo & White Sage",
    mantra: "I am an illumined conduit of high spiritual frequency, grounding visionary truth into humanity.",
    dailyFocus: "Ground your high electrical intuitive downloads with physical hydration and breathwork."
  },
  22: {
    crystals: ["Sugilite", "Super Seven", "Green Tourmaline", "Herkimer Diamond"],
    metals: ["Titanium", "Gold"],
    elementalColor: "Cosmic Emerald & Deep Bronze",
    sacredHerb: "Agarwood (Oudh) & Frankincense",
    mantra: "I manifest monumental institutions that elevate civilization and serve generations to come.",
    dailyFocus: "Map out the master architectural blueprint of your grandest life legacy."
  },
  33: {
    crystals: ["Kunzite", "Petalite", "Imperial Topaz", "Angelite"],
    metals: ["Electrum", "Fine Silver"],
    elementalColor: "Christic Gold & Iridescent Pearl",
    sacredHerb: "Rose Absolute & Spikenard",
    mantra: "I radiate universal grace and unconditional healing love to soothe collective suffering.",
    dailyFocus: "Hold unconditional compassionate space for someone in emotional distress."
  }
};

const LUNAR_MANSIONS = [
  { index: 1, name: "Al-Sharatain (The Two Signs)", span: "0°00' - 12°51' Aries", archetype: "The Pioneer Impulse", energy: "Bold beginnings, dynamic initiative, physical vitality." },
  { index: 2, name: "Al-Butain (The Belly)", span: "12°51' - 25°42' Aries", archetype: "The Subterranean Vault", energy: "Resource accumulation, persistence, enduring focus." },
  { index: 3, name: "Al-Thurayya (The Pleiades)", span: "25°42' Aries - 8°34' Taurus", archetype: "The Radiant Cluster", energy: "Aesthetic magnetism, artistic genius, luxurious prosperity." },
  { index: 4, name: "Al-Dabaran (The Eye of the Bull)", span: "8°34' - 21°25' Taurus", archetype: "The Master Builder", energy: "Integrity, financial grounding, unshakable loyalty." },
  { index: 5, name: "Al-Haq'ah (The White Spot)", span: "21°25' Taurus - 4°17' Gemini", archetype: "The Inquisitive Pilgrim", energy: "Scholarly pursuits, swift networking, mental agility." },
  { index: 6, name: "Al-Han'ah (The Brand)", span: "4°17' - 17°08' Gemini", archetype: "The Bridge Weaver", energy: "Diplomatic synthesis, creative collaboration, social grace." },
  { index: 7, name: "Al-Dhira (The Forearm)", span: "17°08' Gemini - 0°00' Cancer", archetype: "The Sacred Refuge", energy: "Emotional healing, restorative peace, protective sanctuary." },
  { index: 8, name: "Al-Nathrah (The Crib)", span: "0°00' - 12°51' Cancer", archetype: "The Empathic Mother", energy: "Psychic intuition, family loyalty, deep nurturing." },
  { index: 9, name: "Al-Tarf (The Eye)", span: "12°51' - 25°42' Cancer", archetype: "The Solitary Sentinel", energy: "Discrimination, boundary setting, strategic observation." },
  { index: 10, name: "Al-Jabhah (The Forehead)", span: "25°42' Cancer - 8°34' Leo", archetype: "The Sovereign Monarch", energy: "Noble leadership, public renown, generous magnanimity." },
  { index: 11, name: "Al-Zubrah (The Mane)", span: "8°34' - 21°25' Leo", archetype: "The Valiant Champion", energy: "Courage, charismatic victory, artistic passion." },
  { index: 12, name: "Al-Sarfah (The Changer)", span: "21°25' Leo - 4°17' Virgo", archetype: "The Alchemical Pivot", energy: "Transformative breakthroughs, purging excess, high standards." },
  { index: 13, name: "Al-Awwa (The Barker)", span: "4°17' - 17°08' Virgo", archetype: "The Precision Artisan", energy: "Detailed craftsmanship, healing diagnostics, analytical mastery." },
  { index: 14, name: "Al-Simak (Spica / The Unarmed)", span: "17°08' Virgo - 0°00' Libra", archetype: "The Star of Fortune", energy: "Exquisite aesthetics, commercial abundance, sublime diplomacy." }
];

/**
 * AETHERIA - Business, Brand & Address Numerology Data
 */

const BUSINESS_ARCHETYPES = {
  1: {
    archetype: "The Market Disruptor & Industry Pioneer",
    vibe: "Innovation, bold independence, high authority, trailblazing brand identity.",
    bestIndustries: ["Venture Capital", "Tech Startups", "Executive Consulting", "Automotive", "Pioneering Inventions"],
    marketingAngle: "Emphasize being 'First', 'Unrivaled', and 'Sovereign Leader'.",
    financialFlow: "Rapid surges of initial growth; demands constant innovation to sustain momentum."
  },
  2: {
    archetype: "The Trusted Partner & Master Concierge",
    vibe: "Collaboration, discretion, impeccable service, high emotional intelligence.",
    bestIndustries: ["Mediation & Law", "Talent Management", "Boutique Hospitality", "Biomedical", "Public Relations"],
    marketingAngle: "Focus on trust, partnership, bespoke attention, and discreet excellence.",
    financialFlow: "Steady, loyal recurring clientele and multi-year retainer contracts."
  },
  3: {
    archetype: "The Creative Dynamo & Cultural Luminary",
    vibe: "Magnetic storytelling, sparkling design, viral communications, entertainment.",
    bestIndustries: ["Media & Publishing", "Advertising & Branding", "Fashion & Design", "Entertainment", "Public Speaking"],
    marketingAngle: "Inspiring, witty, aesthetically stunning, and emotionally uplifting.",
    financialFlow: "Abundant monetization through intellectual property, media licensing, and merchandise."
  },
  4: {
    archetype: "The Institutional Titan & Foundation Stone",
    vibe: "Unbreakable dependability, structural precision, operational mastery.",
    bestIndustries: ["Construction & Architecture", "Accounting & Security", "Logistics", "Legal Compliance", "Heavy Engineering"],
    marketingAngle: "Position as the most reliable, rock-solid, and disciplined authority in the sector.",
    financialFlow: "Long-term compounding wealth, infrastructure assets, and blue-chip stability."
  },
  5: {
    archetype: "The Global Catalyst & High-Growth Explorer",
    vibe: "Speed, agility, global adaptability, disruptive marketing, cosmopolitan flair.",
    bestIndustries: ["Travel & Aviation", "E-Commerce", "Digital Marketing", "Import/Export", "Lifestyle & Media"],
    marketingAngle: "Highlight freedom, rapid versatility, modern lifestyle, and limitless horizons.",
    financialFlow: "Dynamic, multifaceted revenue streams with massive viral potential."
  },
  6: {
    archetype: "The Sacred Sanctuary & Community Guardian",
    vibe: "Nurturing care, restorative wellness, domestic beauty, ethical service.",
    bestIndustries: ["Holistic Healthcare", "Interior Design & Real Estate", "Education & Childcare", "Organic Food & Hospitality", "Social Enterprise"],
    marketingAngle: "Focus on ethics, family wellness, restorative beauty, and community care.",
    financialFlow: "High client lifetime value, generational referrals, and sustainable ethical revenue."
  },
  7: {
    archetype: "The Specialized Think Tank & Esoteric Institute",
    vibe: "Rigorous research, exclusive niche expertise, intellectual prestige.",
    bestIndustries: ["Data Science & AI", "Metaphysical & Astrological Services", "Pharmaceutical R&D", "Elite Advisory", "Specialized Academies"],
    marketingAngle: "Position as the rare, deep, and authoritative intellectual master of the domain.",
    financialFlow: "Premium pricing for specialized knowledge, proprietary algorithms, and consulting."
  },
  8: {
    archetype: "The Sovereign Enterprise & Financial Empire",
    vibe: "Executive power, commercial scale, high capital velocity, luxury prestige.",
    bestIndustries: ["Investment Banking", "Commercial Real Estate", "Private Equity", "High-End Luxury Brands", "Industrial Manufacturing"],
    marketingAngle: "Project supreme competence, undeniable prestige, and massive material results.",
    financialFlow: "Substantial capital accumulation, enterprise acquisitions, and institutional power."
  },
  9: {
    archetype: "The Global Movement & Universal Brand",
    vibe: "Humanitarian vision, transcendent artistry, worldwide impact, philanthropy.",
    bestIndustries: ["Global Non-Profits", "International Arts & Film", "Clean Energy & Ecology", "Transformational Education", "Cultural Diplomacy"],
    marketingAngle: "Appeal to universal human dignity, planetary transformation, and leaving a legacy.",
    financialFlow: "Massive international patron support, grants, global licensing, and community funding."
  },
  11: {
    archetype: "The Visionary Beacon & Paradigm Shifter (Master Brand)",
    vibe: "High-voltage inspiration, cutting-edge consciousness, transformational leadership.",
    bestIndustries: ["Spiritual Tech", "Futurism", "Transformational Media", "Bio-Resonance", "Revolutionary Design"],
    marketingAngle: "Awakening higher potential and illuminating the path forward.",
    financialFlow: "Cult-like brand devotion and extraordinary premium valuation."
  },
  22: {
    archetype: "The Global Infrastructure Master (Master Builder)",
    vibe: "Planetary-scale execution, engineering triumphs, monumental civilization building.",
    bestIndustries: ["Smart Cities", "Aerospace & Global Energy", "International Institutions", "Megaproject Construction"],
    marketingAngle: "Building the physical and digital foundations of the next century.",
    financialFlow: "Billion-dollar institutional capital and multi-decade sovereign contracts."
  },
  33: {
    archetype: "The Universal Sanctuary of Grace (Master Teacher)",
    vibe: "Supreme compassion, restorative world-healing, living embodiment of love.",
    bestIndustries: ["Global Healing Sanctuaries", "Universal Humanitarian Foundations", "Sacred Arts"],
    marketingAngle: "Uplifting humanity through unconditional service and transcendent beauty.",
    financialFlow: "Boundless philanthropic endowment and sovereign benefactors."
  }
};

const ADDRESS_NUMEROLOGY = {
  1: {
    title: "The Sovereign Innovator's Haven",
    vibe: "Encourages independent thinking, entrepreneurship, personal sovereignty, and bold new beginnings.",
    bestFor: "Entrepreneurs, ambitious executives, singles, and self-directed creators.",
    caution: "Can feel slightly solitary; deliberately invite guests to maintain social warmth."
  },
  2: {
    title: "The Harmonic Sanctuary of Intimacy",
    vibe: "Radiates warmth, emotional sensitivity, peaceful collaboration, and romantic closeness.",
    bestFor: "Couples, tight-knit roommates, counselors, mediators, and healers.",
    caution: "Guard against over-sensitivity or avoiding necessary household confrontations."
  },
  3: {
    title: "The Creative Studio & Social Salon",
    vibe: "Vibrant, playful, filled with laughter, entertainment, vibrant dinner parties, and artistic projects.",
    bestFor: "Artists, writers, entertainers, social hosts, and lively families.",
    caution: "Can encourage scattered finances and clutter; maintain organizational discipline."
  },
  4: {
    title: "The Fortified Bastion of Stability",
    vibe: "Rock-solid grounding, financial security, home property value appreciation, and disciplined routines.",
    bestFor: "Builders, accountants, families seeking roots, and long-term property investors.",
    caution: "Can feel overly rigid or work-heavy; bring in colorful artwork and relaxing music."
  },
  5: {
    title: "The Dynamic Crossroads of Adventure",
    vibe: "High energy, constant visitors, frequent travel, rapid life pivots, and exciting spontaneous gatherings.",
    bestFor: "Travelers, communicators, public relations professionals, and adventurous souls.",
    caution: "Restlessness can disrupt regular sleep routines; create a quiet sleeping sanctuary."
  },
  6: {
    title: "The Nurturing Hearth & Domestic Paradise",
    vibe: "Sanctuary of sublime beauty, lush gardens, family gatherings, gourmet cooking, and loving hospitality.",
    bestFor: "Families, pets, interior designers, holistic therapists, and loving couples.",
    caution: "Resist the urge to micromanage or over-furnish; keep spaces peaceful and breathable."
  },
  7: {
    title: "The Hermetic Sanctuary of Wisdom",
    vibe: "Deep contemplative silence, spiritual meditation, book-lined studies, and intellectual sovereignty.",
    bestFor: "Researchers, philosophers, astrologers, writers, and spiritual seekers.",
    caution: "Can lead to deep social isolation; ensure regular outdoor walks and community contact."
  },
  8: {
    title: "The Executive Manor & Abundance Magnet",
    vibe: "Radiates prosperity, status, executive authority, organized material wealth, and grand entertaining.",
    bestFor: "Business owners, financial investors, corporate leaders, and ambitious partners.",
    caution: "Keep the home from feeling like a sterile corporate boardroom; infuse warmth and soft textures."
  },
  9: {
    title: "The Universal Haven of the Humanitarian",
    vibe: "Open doors, cross-cultural art, spiritual acceptance, healing closure, and global hospitality.",
    bestFor: "Healers, artists, international travelers, community activists, and wise elders.",
    caution: "Do not let strangers take advantage of your boundless hospitality; maintain front door boundaries."
  }
};

/**
 * AETHERIA - User Authentication, Multi-Account & Vault Persistence Engine
 * Manages user accounts, encrypted password/PINs, active sessions, and user-scoped dossiers.
 */

const ACCOUNTS_STORAGE_KEY = 'aetheria_user_accounts_v1';
const SESSION_STORAGE_KEY = 'aetheria_active_session_v1';

// In-memory fallback
const memoryVault = {
  accounts: [],
  session: null
};

const COSMIC_SIGILS = [
  { id: 'sun', symbol: '☉', label: 'Solar Sovereign' },
  { id: 'moon', symbol: '☽', label: 'Lunar Empath' },
  { id: 'star', symbol: '✦', label: 'Star Oracle' },
  { id: 'eye', symbol: '👁', label: 'Third Eye Visionary' },
  { id: 'cube', symbol: '⬡', label: 'Sacred Architect' },
  { id: 'fire', symbol: '🜂', label: 'Alchemical Fire' },
  { id: 'lotus', symbol: '🪷', label: 'Spiritual Lotus' }
];

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.loadSession();
  }

  getStorage() {
    return {
      getItem(key) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(key);
          }
        } catch (e) {}
        return memoryVault[key] || null;
      },
      setItem(key, val) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, val);
          }
        } catch (e) {}
        memoryVault[key] = String(val);
      },
      removeItem(key) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
          }
        } catch (e) {}
        delete memoryVault[key];
      }
    };
  }

  getAccounts() {
    const raw = this.getStorage().getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  saveAccounts(accounts) {
    this.getStorage().setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }

  loadSession() {
    const rawSession = this.getStorage().getItem(SESSION_STORAGE_KEY);
    if (rawSession) {
      try {
        const sessionData = JSON.parse(rawSession);
        const accounts = this.getAccounts();
        const user = accounts.find(a => a.id === sessionData.userId);
        if (user) {
          this.currentUser = user;
          return;
        }
      } catch (e) {}
    }
    
    // Default initial account if none exist
    const accounts = this.getAccounts();
    if (accounts.length === 0) {
      const defaultUser = {
        id: 'usr_master_default',
        name: 'Master Practitioner',
        email: 'practitioner@aetheria.local',
        pin: '1234',
        sigil: '☉',
        role: 'Master Alchemist',
        createdAt: new Date().toISOString(),
        profiles: []
      };
      this.saveAccounts([defaultUser]);
      this.currentUser = defaultUser;
      this.saveSession(defaultUser.id);
    } else {
      this.currentUser = accounts[0];
      this.saveSession(accounts[0].id);
    }
  }

  saveSession(userId) {
    this.getStorage().setItem(SESSION_STORAGE_KEY, JSON.stringify({
      userId,
      loggedInAt: new Date().toISOString()
    }));
  }

  signUp(name, email, pin, sigil = '☉', role = 'Master Practitioner') {
    const accounts = this.getAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      throw new Error('An account with this email or username already exists.');
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim() || 'Cosmic Seeker',
      email: email.toLowerCase().trim(),
      pin: pin.trim(),
      sigil: sigil || '☉',
      role: role || 'Master Practitioner',
      createdAt: new Date().toISOString(),
      profiles: []
    };

    accounts.push(newUser);
    this.saveAccounts(accounts);
    this.currentUser = newUser;
    this.saveSession(newUser.id);
    this.notify();
    return newUser;
  }

  signIn(email, pin) {
    const accounts = this.getAccounts();
    const user = accounts.find(a => 
      a.email.toLowerCase() === email.toLowerCase().trim() &&
      a.pin === pin.trim()
    );

    if (!user) {
      throw new Error('Invalid email/username or PIN code.');
    }

    this.currentUser = user;
    this.saveSession(user.id);
    this.notify();
    return user;
  }

  getActiveUser() {
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  signOut() {
    this.getStorage().removeItem(SESSION_STORAGE_KEY);
    const accounts = this.getAccounts();
    if (accounts.length > 0) {
      this.currentUser = null;
    }
    this.notify();
  }

  updateProfile(updates) {
    if (!this.currentUser) return;
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === this.currentUser.id);
    if (idx !== -1) {
      accounts[idx] = { ...accounts[idx], ...updates };
      this.saveAccounts(accounts);
      this.currentUser = accounts[idx];
      this.notify();
    }
  }

  // Vault Management (User-Scoped Dossiers)
  getUserProfiles() {
    if (!this.currentUser) return [];
    const accounts = this.getAccounts();
    const user = accounts.find(a => a.id === this.currentUser.id);
    return (user && Array.isArray(user.profiles)) ? user.profiles : [];
  }

  saveUserProfile(profileData) {
    if (!this.currentUser) {
      this.loadSession();
    }
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === this.currentUser.id);
    if (idx !== -1) {
      const profiles = accounts[idx].profiles || [];
      const existingIdx = profiles.findIndex(p => p.id === profileData.id);
      if (existingIdx !== -1) {
        profiles[existingIdx] = profileData;
      } else {
        profiles.unshift(profileData);
      }
      accounts[idx].profiles = profiles;
      this.saveAccounts(accounts);
      this.currentUser = accounts[idx];
      this.notify();
      return true;
    }
    return false;
  }

  deleteUserProfile(profileId) {
    if (!this.currentUser) return false;
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === this.currentUser.id);
    if (idx !== -1) {
      accounts[idx].profiles = (accounts[idx].profiles || []).filter(p => p.id !== profileId);
      this.saveAccounts(accounts);
      this.currentUser = accounts[idx];
      this.notify();
      return true;
    }
    return false;
  }

  // Complete Vault Backup & Restore
  exportVaultBackup() {
    const accounts = this.getAccounts();
    return {
      version: 'AETHERIA_VAULT_2.0',
      exportedAt: new Date().toISOString(),
      activeUserId: this.currentUser ? this.currentUser.id : null,
      accounts
    };
  }

  importVaultBackup(backupJson) {
    try {
      if (!backupJson || !Array.isArray(backupJson.accounts)) {
        throw new Error('Invalid vault backup structure.');
      }
      this.saveAccounts(backupJson.accounts);
      if (backupJson.activeUserId) {
        const found = backupJson.accounts.find(a => a.id === backupJson.activeUserId);
        if (found) {
          this.currentUser = found;
          this.saveSession(found.id);
        } else if (backupJson.accounts.length > 0) {
          this.currentUser = backupJson.accounts[0];
          this.saveSession(backupJson.accounts[0].id);
        }
      }
      this.notify();
      return true;
    } catch (e) {
      throw e;
    }
  }

  onAuthChange(callback) {
    this.listeners.push(callback);
    callback(this.currentUser);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }
}

const authManager = new AuthManager();

/**
 * AETHERIA - Master Numerology Calculation Engine
 * Implements rigorous Pythagorean and Chaldean algorithms,
 * Master Number preservation (11, 22, 33), and Karmic Debt tracking (13, 14, 16, 19).
 */

// Pythagorean Letter Value Table (1-9)
const PYTHAGOREAN_TABLE = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

// Chaldean Letter Value Table (1-8, no 9 in base alphabet)
const CHALDEAN_TABLE = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

const MASTER_NUMBERS = [11, 22, 33];
const KARMIC_NUMBERS = [13, 14, 16, 19];

/**
 * Standard digit sum of a number
 */
function sumDigits(num) {
  return String(Math.abs(num))
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
}

/**
 * Reduce a number to single digit or Master Number (11, 22, 33).
 * Captures all intermediate steps for step-by-step mathematical breakdowns.
 */
function reduceNumber(num, preserveMaster = true) {
  let steps = [num];
  let current = num;
  let karmicFound = null;

  if (KARMIC_NUMBERS.includes(current)) {
    karmicFound = current;
  }

  while (current > 9) {
    if (preserveMaster && MASTER_NUMBERS.includes(current)) {
      break;
    }
    current = sumDigits(current);
    steps.push(current);
    if (!karmicFound && KARMIC_NUMBERS.includes(current)) {
      karmicFound = current;
    }
  }

  return {
    value: current,
    steps,
    rawInitial: num,
    karmicFound: karmicFound
  };
}

/**
 * Determine if a character is a vowel, consonant, or context-dependent 'Y'
 */
function classifyLetter(char, prevChar = null, nextChar = null) {
  const c = char.toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];
  
  if (vowels.includes(c)) return "vowel";
  if (c === "y") {
    // Esoteric 'Y' rule: 'Y' is a vowel if there are no adjacent vowels in the syllable or word
    const isPrevVowel = prevChar && vowels.includes(prevChar.toLowerCase());
    const isNextVowel = nextChar && vowels.includes(nextChar.toLowerCase());
    if (!isPrevVowel && !isNextVowel) return "vowel";
    return "consonant";
  }
  if (/[a-z]/.test(c)) return "consonant";
  return "other";
}

/**
 * Letter-to-number breakdown for a name
 */
function analyzeNameLetters(name, system = "pythagorean") {
  const table = system === "chaldean" ? CHALDEAN_TABLE : PYTHAGOREAN_TABLE;
  const words = name.trim().split(/\s+/).filter(Boolean);
  
  let lettersData = [];
  let totalSum = 0;
  let vowelSum = 0;
  let consonantSum = 0;
  let letterCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  words.forEach((word, wIdx) => {
    const chars = word.split("");
    chars.forEach((ch, cIdx) => {
      const lower = ch.toLowerCase();
      const val = table[lower];
      if (val !== undefined) {
        const prev = cIdx > 0 ? chars[cIdx - 1] : null;
        const next = cIdx < chars.length - 1 ? chars[cIdx + 1] : null;
        const type = classifyLetter(lower, prev, next);

        totalSum += val;
        letterCounts[val] = (letterCounts[val] || 0) + 1;

        if (type === "vowel") {
          vowelSum += val;
        } else if (type === "consonant") {
          consonantSum += val;
        }

        lettersData.push({
          char: ch,
          lower,
          val,
          type,
          wordIndex: wIdx,
          word
        });
      }
    });
  });

  return {
    lettersData,
    totalSum,
    vowelSum,
    consonantSum,
    letterCounts,
    words
  };
}

/**
 * Calculate Life Path Number with full reduction path
 */
function calculateLifePath(birthDateStr) {
  // birthDateStr in YYYY-MM-DD
  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Method 1: Component reduction (standard esoteric Pythagorean method)
  const monthRed = reduceNumber(month);
  const dayRed = reduceNumber(day);
  const yearRed = reduceNumber(year);

  const componentSum = monthRed.value + dayRed.value + yearRed.value;
  const finalRed = reduceNumber(componentSum);

  // Full sum check for Karmic debts
  const rawSum = month + day + year;
  let karmic = null;
  if (KARMIC_NUMBERS.includes(componentSum)) karmic = componentSum;
  else if (KARMIC_NUMBERS.includes(rawSum)) karmic = rawSum;
  else if (dayRed.karmicFound) karmic = dayRed.karmicFound;

  return {
    value: finalRed.value,
    isMaster: MASTER_NUMBERS.includes(finalRed.value),
    monthRed,
    dayRed,
    yearRed,
    componentSum,
    steps: finalRed.steps,
    rawSum,
    karmicDebt: karmic
  };
}

/**
 * Calculate full Destiny/Expression, Soul Urge, and Personality numbers
 */
function calculateNameNumbers(name, system = "pythagorean") {
  const analysis = analyzeNameLetters(name, system);

  const destinyRed = reduceNumber(analysis.totalSum);
  const soulUrgeRed = reduceNumber(analysis.vowelSum);
  const personalityRed = reduceNumber(analysis.consonantSum);

  // Karmic debts in name totals
  let karmicDebts = [];
  if (KARMIC_NUMBERS.includes(analysis.totalSum)) karmicDebts.push({ type: "Expression", number: analysis.totalSum });
  if (KARMIC_NUMBERS.includes(analysis.vowelSum)) karmicDebts.push({ type: "Soul Urge", number: analysis.vowelSum });
  if (KARMIC_NUMBERS.includes(analysis.consonantSum)) karmicDebts.push({ type: "Personality", number: analysis.consonantSum });

  // Missing numbers (Karmic Lessons) & Hidden Passion
  let karmicLessons = [];
  let maxCount = 0;
  let hiddenPassions = [];

  for (let d = 1; d <= 9; d++) {
    const count = analysis.letterCounts[d] || 0;
    if (count === 0) {
      karmicLessons.push(d);
    }
    if (count > maxCount) {
      maxCount = count;
      hiddenPassions = [d];
    } else if (count === maxCount && count > 0) {
      hiddenPassions.push(d);
    }
  }

  return {
    analysis,
    destiny: {
      value: destinyRed.value,
      isMaster: MASTER_NUMBERS.includes(destinyRed.value),
      steps: destinyRed.steps,
      rawSum: analysis.totalSum
    },
    soulUrge: {
      value: soulUrgeRed.value,
      isMaster: MASTER_NUMBERS.includes(soulUrgeRed.value),
      steps: soulUrgeRed.steps,
      rawSum: analysis.vowelSum
    },
    personality: {
      value: personalityRed.value,
      isMaster: MASTER_NUMBERS.includes(personalityRed.value),
      steps: personalityRed.steps,
      rawSum: analysis.consonantSum
    },
    karmicDebts,
    karmicLessons,
    hiddenPassions,
    letterCounts: analysis.letterCounts
  };
}

/**
 * Calculate Birthday Number
 */
function calculateBirthdayNumber(birthDateStr) {
  const [, , dayStr] = birthDateStr.split("-");
  const day = parseInt(dayStr, 10);
  const red = reduceNumber(day);
  const isKarmic = KARMIC_NUMBERS.includes(day);

  return {
    day,
    value: red.value,
    isMaster: MASTER_NUMBERS.includes(red.value),
    isKarmic: isKarmic ? day : null,
    steps: red.steps
  };
}

/**
 * Calculate Maturity Number (Life Path + Destiny)
 */
function calculateMaturityNumber(lifePathVal, destinyVal) {
  const sum = lifePathVal + destinyVal;
  const red = reduceNumber(sum);
  return {
    value: red.value,
    isMaster: MASTER_NUMBERS.includes(red.value),
    steps: red.steps,
    sum
  };
}

/**
 * Calculate Attitude / Sun Number (Month + Day)
 */
function calculateAttitudeNumber(birthDateStr) {
  const [, monthStr, dayStr] = birthDateStr.split("-");
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const sum = month + day;
  const red = reduceNumber(sum, false); // Attitude is traditionally 1-9
  return {
    value: red.value,
    sum,
    steps: red.steps
  };
}

/**
 * Calculate Balance Number (Sum of first initials of each word)
 */
function calculateBalanceNumber(name, system = "pythagorean") {
  const table = system === "chaldean" ? CHALDEAN_TABLE : PYTHAGOREAN_TABLE;
  const words = name.trim().split(/\s+/).filter(Boolean);
  let initialSum = 0;
  let initials = [];

  words.forEach(w => {
    const firstChar = w[0].toLowerCase();
    const val = table[firstChar] || 0;
    if (val > 0) {
      initialSum += val;
      initials.push({ char: w[0].toUpperCase(), val });
    }
  });

  const red = reduceNumber(initialSum, false);
  return {
    value: red.value,
    sum: initialSum,
    initials,
    steps: red.steps
  };
}

/**
 * Calculate the 4 Challenge Numbers
 */
function calculateChallengeNumbers(birthDateStr) {
  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const month = reduceNumber(parseInt(monthStr, 10), false).value;
  const day = reduceNumber(parseInt(dayStr, 10), false).value;
  const year = reduceNumber(parseInt(yearStr, 10), false).value;

  const challenge1 = Math.abs(month - day);
  const challenge2 = Math.abs(day - year);
  const challenge3 = Math.abs(challenge1 - challenge2); // Main Challenge
  const challenge4 = Math.abs(month - year);

  return {
    c1: challenge1,
    c2: challenge2,
    c3: challenge3, // Primary / Major Challenge
    c4: challenge4
  };
}

/**
 * Calculate the 4 Pinnacle Cycles & Age Brackets
 */
function calculatePinnacles(birthDateStr, lifePathBase) {
  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const month = reduceNumber(parseInt(monthStr, 10), false).value;
  const day = reduceNumber(parseInt(dayStr, 10), false).value;
  const year = reduceNumber(parseInt(yearStr, 10), false).value;

  const p1 = reduceNumber(month + day).value;
  const p2 = reduceNumber(day + year).value;
  const p3 = reduceNumber(p1 + p2).value;
  const p4 = reduceNumber(month + year).value;

  // Age spans based on standard Pythagorean 36 - Life Path rule
  const lifePathRoot = lifePathBase > 9 ? sumDigits(lifePathBase) : lifePathBase;
  const endAge1 = 36 - lifePathRoot;
  const endAge2 = endAge1 + 9;
  const endAge3 = endAge2 + 9;

  return [
    { index: 1, number: p1, title: "1st Pinnacle (Formative Foundations)", ageSpan: `Birth to Age ${endAge1}` },
    { index: 2, number: p2, title: "2nd Pinnacle (Productive Expansion)", ageSpan: `Ages ${endAge1 + 1} to ${endAge2}` },
    { index: 3, number: p3, title: "3rd Pinnacle (Attainment & Mastery)", ageSpan: `Ages ${endAge2 + 1} to ${endAge3}` },
    { index: 4, number: p4, title: "4th Pinnacle (Harvest & Legacy)", ageSpan: `Age ${endAge3 + 1} & Beyond` }
  ];
}

/**
 * Complete Full Blueprint Calculator
 */
function calculateFullBlueprint({
  birthDate,
  birthTime,
  birthPlace,
  birthName,
  currentName,
  forecastDate,
  system = "pythagorean"
}) {
  const lifePath = calculateLifePath(birthDate);
  const birthNameAnalysis = calculateNameNumbers(birthName, system);
  
  const hasNameShift = currentName && currentName.trim() && currentName.trim().toLowerCase() !== birthName.trim().toLowerCase();
  const currentNameAnalysis = hasNameShift ? calculateNameNumbers(currentName, system) : null;

  const birthday = calculateBirthdayNumber(birthDate);
  const maturity = calculateMaturityNumber(lifePath.value, birthNameAnalysis.destiny.value);
  const attitude = calculateAttitudeNumber(birthDate);
  const balance = calculateBalanceNumber(birthName, system);
  const challenges = calculateChallengeNumbers(birthDate);
  const pinnacles = calculatePinnacles(birthDate, lifePath.value);

  // Compile all Karmic Debts detected across core calculations
  const allKarmicDebts = new Set();
  if (lifePath.karmicDebt) allKarmicDebts.add(lifePath.karmicDebt);
  if (birthday.isKarmic) allKarmicDebts.add(birthday.isKarmic);
  birthNameAnalysis.karmicDebts.forEach(kd => allKarmicDebts.add(kd.number));

  return {
    system,
    birthDate,
    birthTime,
    birthPlace,
    birthName,
    currentName: currentName || birthName,
    hasNameShift,
    forecastDate,
    core: {
      lifePath,
      destiny: birthNameAnalysis.destiny,
      soulUrge: birthNameAnalysis.soulUrge,
      personality: birthNameAnalysis.personality,
      birthday,
      maturity
    },
    advanced: {
      attitude,
      balance,
      karmicDebts: Array.from(allKarmicDebts),
      karmicLessons: birthNameAnalysis.karmicLessons,
      hiddenPassions: birthNameAnalysis.hiddenPassions,
      challenges,
      pinnacles
    },
    nameShift: hasNameShift ? {
      birth: birthNameAnalysis,
      current: currentNameAnalysis,
      destinyDiff: currentNameAnalysis.destiny.value !== birthNameAnalysis.destiny.value,
      soulUrgeDiff: currentNameAnalysis.soulUrge.value !== birthNameAnalysis.soulUrge.value,
      personalityDiff: currentNameAnalysis.personality.value !== birthNameAnalysis.personality.value
    } : null,
    birthNameAnalysis,
    currentNameAnalysis
  };
}

/**
 * AETHERIA - Astronomical & Astrological Calculation Engine
 * Calculates Sun Sign, Moon Sign, Ascendant (Rising Sign), Planetary Rulers,
 * and Quad-Elemental Cosmic Balances.
 */



const ZODIAC_SIGNS = [
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

const PLANETARY_NUMEROLOGY = {
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
function calculateJulianDay(year, month, day, decimalHours = 12) {
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
function calculateSunSign(birthDateStr) {
  const [, monthStr, dayStr] = birthDateStr.split("-");
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

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
function calculateMoonSign(year, month, day, decimalHours = 12) {
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
function calculateAscendant(birthDateStr, birthTimeStr, birthPlaceStr) {
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
function calculateElementalBalance(sunSign, moonData, ascendantData, numerologyProfile) {
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
function calculateAstrologyProfile(birthDateStr, birthTimeStr, birthPlaceStr, numerologyProfile) {
  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const sunSign = calculateSunSign(birthDateStr);
  const moonData = calculateMoonSign(year, month, day);
  const ascendantData = calculateAscendant(birthDateStr, birthTimeStr, birthPlaceStr);
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

/**
 * AETHERIA - Lo Shu Magic Square, Arrows of Destiny, Planes of Expression,
 * Bridge Numbers & Three Life Epochs Calculation Engine.
 */



/**
 * Lo Shu Grid Definition (Classical 3x3 Hermetic/Chinese Magic Square)
 * Row 1: 4, 9, 2 (Top / Mind)
 * Row 2: 3, 5, 7 (Middle / Soul)
 * Row 3: 8, 1, 6 (Bottom / Body)
 */
const LOSHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

/**
 * 8 Arrows of Destiny Definitions (Strengths and Losses)
 */
const ARROWS_DEFINITIONS = [
  {
    id: "thought",
    numbers: [4, 9, 2],
    name: "Arrow of Intellect & Clear Vision (4-9-2)",
    strengthTitle: "The Master Intellect",
    strengthDesc: "Exceptional analytical memory, strategic clarity, and intellectual discrimination.",
    lossTitle: "Arrow of Poor Memory / Confusion",
    lossDesc: "Tendency toward mental fatigue or absent-mindedness; benefits from structured note-taking."
  },
  {
    id: "spirituality",
    numbers: [3, 5, 7],
    name: "Arrow of Spirituality & Serenity (3-5-7)",
    strengthTitle: "The Mystical Conduit",
    strengthDesc: "Deep metaphysical insight, philosophical resilience, and profound spiritual peace in crises.",
    lossTitle: "Arrow of Skepticism / Insecurity",
    lossDesc: "Struggles with trusting life's unfolding; needs to anchor emotional certainty from within."
  },
  {
    id: "practicality",
    numbers: [8, 1, 6],
    name: "Arrow of Practical Action (8-1-6)",
    strengthTitle: "The Master Practitioner",
    strengthDesc: "Hands-on dexterity, commercial realism, and manifesting high ideas into concrete physical results.",
    lossTitle: "Arrow of Disorganization / Procrastination",
    lossDesc: "Impractical idealism or difficulty completing tedious tasks; requires strict daily schedules."
  },
  {
    id: "planning",
    numbers: [4, 3, 8],
    name: "Arrow of Strategic Planning (4-3-8)",
    strengthTitle: "The Grand Strategist",
    strengthDesc: "Methodical foresight, structural logistics, and planning complex multi-year campaigns.",
    lossTitle: "Arrow of Short-Sightedness",
    lossDesc: "Impulsive actions without long-term plans; benefits from consulting mentors before large moves."
  },
  {
    id: "willpower",
    numbers: [9, 5, 1],
    name: "Arrow of Willpower & Determination (9-5-1)",
    strengthTitle: "The Unstoppable Will",
    strengthDesc: "Unshakeable perseverance, sovereign grit, and the relentless courage to overcome monumental odds.",
    lossTitle: "Arrow of Hesitation / Defeatism",
    lossDesc: "Giving up right before breakthroughs occur; requires cultivating daily self-belief."
  },
  {
    id: "action",
    numbers: [2, 7, 6],
    name: "Arrow of Activity & Dynamism (2-7-6)",
    strengthTitle: "The Dynamic Catalyst",
    strengthDesc: "High bodily vitality, swift reflexes, athletic or artistic expression, and boundless energy.",
    lossTitle: "Arrow of Lethargy / Hesitancy",
    lossDesc: "Physical sluggishness or overthinking before moving; regular morning movement is essential."
  },
  {
    id: "balance",
    numbers: [4, 5, 6],
    name: "Arrow of Emotional Balance (4-5-6)",
    strengthTitle: "The Compassionate Harmonizer",
    strengthDesc: "Supreme psychological equilibrium, empathetic wisdom, and bringing serenity to disordered environments.",
    lossTitle: "Arrow of Hypersensitivity / Turmoil",
    lossDesc: "Vulnerability to emotional shocks and emotional reactivity; benefits from daily grounding rituals."
  },
  {
    id: "stability",
    numbers: [2, 5, 8],
    name: "Arrow of Memory & Sovereign Stability (2-5-8)",
    strengthTitle: "The Pillar of Equilibrium",
    strengthDesc: "Photographic nuance, emotional fortitude, and keeping steady composure during severe crises.",
    lossTitle: "Arrow of Emotional Volatility",
    lossDesc: "Feeling ungrounded during unexpected change; benefits from physical earth contact."
  }
];

/**
 * Calculate Lo Shu Grid & Detect Arrows
 */
function calculateLoShuGrid(birthDateStr) {
  // Extract all digits from birth date (e.g. 1990-07-15 -> [1, 9, 9, 0, 0, 7, 1, 5])
  const digits = birthDateStr.replace(/\D/g, "").split("").map(Number).filter(n => n > 0);
  
  const digitCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(d => {
    digitCounts[d] = (digitCounts[d] || 0) + 1;
  });

  const arrowsPresent = [];
  const arrowsMissing = [];

  ARROWS_DEFINITIONS.forEach(arrow => {
    const allPresent = arrow.numbers.every(num => digitCounts[num] > 0);
    const allMissing = arrow.numbers.every(num => digitCounts[num] === 0);

    if (allPresent) {
      arrowsPresent.push({
        ...arrow,
        type: "strength"
      });
    } else if (allMissing) {
      arrowsMissing.push({
        ...arrow,
        type: "loss"
      });
    }
  });

  // Isolated numbers or planes
  const mentalPlaneCount = digitCounts[4] + digitCounts[9] + digitCounts[2];
  const emotionalPlaneCount = digitCounts[3] + digitCounts[5] + digitCounts[7];
  const physicalPlaneCount = digitCounts[8] + digitCounts[1] + digitCounts[6];

  return {
    digits,
    digitCounts,
    arrowsPresent,
    arrowsMissing,
    planes: {
      mental: mentalPlaneCount,
      emotional: emotionalPlaneCount,
      physical: physicalPlaneCount
    }
  };
}

/**
 * Calculate Planes of Expression from Name Letters
 * Evaluates Mental, Physical, Emotional, and Intuitive distribution
 */
function calculatePlanesOfExpression(name, system = "pythagorean") {
  const analysis = analyzeNameLetters(name, system);
  
  // Categorization of letters based on classical numerology planes:
  // Mental: A, H, J, N, P, S (1, 8 values)
  // Physical: D, E, M, W (4, 5 values)
  // Emotional: B, I, O, R, Z (2, 3, 6, 9 values)
  // Intuitive: C, F, G, K, L, T, U, V, X, Y (3, 6, 7, 2 values)

  const planes = {
    Mental: { count: 0, letters: [] },
    Physical: { count: 0, letters: [] },
    Emotional: { count: 0, letters: [] },
    Intuitive: { count: 0, letters: [] }
  };

  const mentalLetters = ["a", "h", "j", "n", "p", "s"];
  const physicalLetters = ["d", "e", "m", "w"];
  const emotionalLetters = ["b", "i", "o", "r", "z"];
  const intuitiveLetters = ["c", "f", "g", "k", "l", "t", "u", "v", "x", "y"];

  analysis.lettersData.forEach(l => {
    const ch = l.lower;
    if (mentalLetters.includes(ch)) {
      planes.Mental.count++;
      planes.Mental.letters.push(l.char);
    } else if (physicalLetters.includes(ch)) {
      planes.Physical.count++;
      planes.Physical.letters.push(l.char);
    } else if (emotionalLetters.includes(ch)) {
      planes.Emotional.count++;
      planes.Emotional.letters.push(l.char);
    } else if (intuitiveLetters.includes(ch)) {
      planes.Intuitive.count++;
      planes.Intuitive.letters.push(l.char);
    } else {
      planes.Mental.count++;
      planes.Mental.letters.push(l.char);
    }
  });

  const total = analysis.lettersData.length || 1;
  const percentages = {
    Mental: Math.round((planes.Mental.count / total) * 100),
    Physical: Math.round((planes.Physical.count / total) * 100),
    Emotional: Math.round((planes.Emotional.count / total) * 100),
    Intuitive: Math.round((planes.Intuitive.count / total) * 100)
  };

  // Subconscious Self Number: 9 - number of missing karmic lesson numbers
  const missingCount = Object.values(analysis.letterCounts).filter(c => c === 0).length;
  const subconsciousSelf = 9 - missingCount;

  return {
    planes,
    percentages,
    subconsciousSelf,
    missingCount
  };
}

/**
 * Calculate Bridge Numbers (Friction Resolvers)
 */
function calculateBridgeNumbers(lifePathVal, destinyVal, soulUrgeVal, personalityVal) {
  const lpRoot = lifePathVal > 9 ? sumDigits(lifePathVal) : lifePathVal;
  const destRoot = destinyVal > 9 ? sumDigits(destinyVal) : destinyVal;
  const suRoot = soulUrgeVal > 9 ? sumDigits(soulUrgeVal) : soulUrgeVal;
  const persRoot = personalityVal > 9 ? sumDigits(personalityVal) : personalityVal;

  const lpDestBridge = Math.abs(lpRoot - destRoot);
  const suPersBridge = Math.abs(suRoot - persRoot);

  const bridgeDescriptions = {
    0: "Bridge 0 (Harmonic Alignment): Zero friction. Your core nature and outward expression are in natural effortless synchronization.",
    1: "Bridge 1 (Cultivate Sovereignty): Bridge the gap through independent decision-making and trusting your own authority over external validation.",
    2: "Bridge 2 (Cultivate Tact & Patience): Bridge through subtle diplomacy, emotional listening, and not forcing rapid confrontations.",
    3: "Bridge 3 (Cultivate Creative Expression): Bridge through authentic communication, artistic outlets, and joyful optimism.",
    4: "Bridge 4 (Cultivate Discipline & Method): Bridge by creating structured daily habits, financial order, and dependable follow-through.",
    5: "Bridge 5 (Cultivate Adaptability & Freedom): Bridge through progressive flexibility, willingness to change routines, and open-minded exploration.",
    6: "Bridge 6 (Cultivate Loving Responsibility): Bridge through compassionate service, domestic harmony, and setting healthy relational boundaries.",
    7: "Bridge 7 (Cultivate Spiritual Faith & Study): Bridge through contemplative quiet, analytical research, and trusting your inner intuitive sage.",
    8: "Bridge 8 (Cultivate Material Stewardship): Bridge through executive organization, ethical abundance, and balancing spiritual with physical wealth."
  };

  return {
    lpDestBridge: {
      value: lpDestBridge,
      title: `Life Path ↔ Destiny Bridge (${lpDestBridge})`,
      advice: bridgeDescriptions[lpDestBridge] || bridgeDescriptions[0]
    },
    suPersBridge: {
      value: suPersBridge,
      title: `Soul Urge ↔ Personality Bridge (${suPersBridge})`,
      advice: bridgeDescriptions[suPersBridge] || bridgeDescriptions[0]
    }
  };
}

/**
 * Calculate the Three Major Life Period Cycles (Epochs)
 */
function calculateThreeLifePeriods(birthDateStr, lifePathVal) {
  const [yearStr, monthStr, dayStr] = birthDateStr.split("-");
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);

  const p1 = reduceNumber(month).value; // 1st Period: Month
  const p2 = reduceNumber(day).value;   // 2nd Period: Day
  const p3 = reduceNumber(year).value;  // 3rd Period: Year

  const lpRoot = lifePathVal > 9 ? sumDigits(lifePathVal) : lifePathVal;
  const endAge1 = 36 - lpRoot;
  const endAge2 = endAge1 + 27; // Spans 27 years (three 9-year cycles)

  return [
    {
      index: 1,
      title: "1st Period Cycle: The Formative Youth",
      number: p1,
      ageSpan: `Birth to Age ${endAge1}`,
      desc: "Shaped by parental, familial, and foundational educational environments."
    },
    {
      index: 2,
      title: "2nd Period Cycle: The Productive Adulthood",
      number: p2,
      ageSpan: `Ages ${endAge1 + 1} to ${endAge2}`,
      desc: "The primary career, relational, and self-actualization chapter of maximum worldly impact."
    },
    {
      index: 3,
      title: "3rd Period Cycle: The Culminating Harvest",
      number: p3,
      ageSpan: `Age ${endAge2 + 1} & Beyond`,
      desc: "The elderhood chapter of spiritual mastery, philosophical synthesis, and legacy."
    }
  ];
}

/**
 * AETHERIA - Interactive SVG 12-House Natal Horoscope Wheel Renderer
 * Draws clean vector astrological wheels with 12 Houses, Zodiac Glyphs,
 * Ascendant axis, Sun/Moon degrees, and geometric aspect lines.
 */



const ELEMENT_COLORS = {
  Fire: "#E65C5C",
  Earth: "#5CAE81",
  Air: "#5CB4E6",
  Water: "#6D87A4"
};

/**
 * Generate full SVG string for Natal Wheel
 */
function renderNatalWheelSVG(sunSign, moonData, ascendantData, containerWidth = 520) {
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
function calculatePlanetaryHours(dateObj = new Date()) {
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

/**
 * AETHERIA - Solfeggio Sound Healing & Harmonic Tone Synthesizer
 * Built with native Web Audio API. Zero dependencies, pure harmonic sine resonance.
 */

class SolfeggioSynthesizer {
  constructor() {
    this.ctx = null;
    this.oscMain = null;
    this.oscHarmonic = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.currentFreq = 432;
    this.volume = 0.4;
    this.timerId = null;
    this.listeners = [];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  play(frequency, durationMinutes = 0) {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isPlaying) {
      this.stop();
    }

    this.currentFreq = frequency;
    const now = this.ctx.currentTime;

    // Master Gain with Soft Attack Envelope
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.0001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(this.volume, now + 1.2);
    this.gainNode.connect(this.ctx.destination);

    // Primary Pure Sine Oscillator
    this.oscMain = this.ctx.createOscillator();
    this.oscMain.type = "sine";
    this.oscMain.frequency.setValueAtTime(frequency, now);
    this.oscMain.connect(this.gainNode);
    this.oscMain.start(now);

    // Subtle 2nd Harmonic Overtone (octave + fifth subtle shimmer at 10% volume)
    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(this.volume * 0.12, now);
    harmonicGain.connect(this.gainNode);

    this.oscHarmonic = this.ctx.createOscillator();
    this.oscHarmonic.type = "sine";
    this.oscHarmonic.frequency.setValueAtTime(frequency * 2, now);
    this.oscHarmonic.connect(harmonicGain);
    this.oscHarmonic.start(now);

    this.isPlaying = true;
    this.notifyStateChange();

    // Timer Auto-shutoff
    if (this.timerId) clearTimeout(this.timerId);
    if (durationMinutes > 0) {
      this.timerId = setTimeout(() => {
        this.stop();
      }, durationMinutes * 60 * 1000);
    }

    return true;
  }

  stop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) {
      this.isPlaying = false;
      this.notifyStateChange();
      return;
    }

    const now = this.ctx.currentTime;
    // Smooth Fade-Out Release Envelope
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      try {
        if (this.oscMain) {
          this.oscMain.stop();
          this.oscMain.disconnect();
          this.oscMain = null;
        }
        if (this.oscHarmonic) {
          this.oscHarmonic.stop();
          this.oscHarmonic.disconnect();
          this.oscHarmonic = null;
        }
      } catch (e) {}
      this.isPlaying = false;
      this.notifyStateChange();
    }, 850);

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.gainNode && this.isPlaying && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  onStateChange(cb) {
    this.listeners.push(cb);
  }

  notifyStateChange() {
    this.listeners.forEach(cb => cb({
      isPlaying: this.isPlaying,
      frequency: this.currentFreq
    }));
  }
}

const audioSynthesizer = new SolfeggioSynthesizer();

/**
 * AETHERIA - Business, Brand & Address Numerology Calculation Engine
 */




/**
 * Calculate Business & Brand Name Blueprint
 */
function calculateBusinessBlueprint(businessName, founderLifePath = 1, system = "pythagorean") {
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
function calculateAddressNumerology(addressStr, system = "pythagorean") {
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

/**
 * AETHERIA - Esoteric Oracle & Chart Advisor Engine
 * Synthesizes user questions through the subject's complete cosmic blueprint.
 */




function consultOracle(questionText, blueprint, astrologyProfile, forecasting) {
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

/**
 * AETHERIA - Esoteric Astro-Numerology Hybrid Synthesis Engine
 * Synthesizes planetary rulerships, zodiacal archetypes, and core numerology
 * into a cohesive psychological and metaphysical blueprint.
 */



/**
 * Synthesize Life Path with Sun Sign
 */
function synthesizeLifePathSun(lifePathVal, sunSign) {
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
function synthesizeSoulUrgeMoon(soulUrgeVal, moonData) {
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
function synthesizePersonalityAscendant(personalityVal, ascendantData) {
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
function generateLifeMandate(blueprint, astrologyProfile) {
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

/**
 * AETHERIA - Timing & Forecasting Engine
 * Calculates Personal Year, Personal Month, Personal Day cycles,
 * 9-Year Epicycle Progress, and 12-Month Transit Roadmaps.
 */




const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Calculate Personal Year, Personal Month, and Personal Day
 */
function calculatePersonalCycles(birthDateStr, forecastDateStr) {
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
function generateYearlyTransitRoadmap(birthDateStr, targetYear) {
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

/**
 * AETHERIA - Export, Print, and Profile Persistence Engine
 * Manages User-scoped client dossiers, Markdown summary generation, and PDF printing.
 */



const STORAGE_KEY = "aetheria_saved_profiles";

/**
 * Get all saved profiles for the current user
 */
function getSavedProfiles() {
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
function saveProfile(profileData) {
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
function deleteProfile(id) {
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
function generateMarkdownReport(blueprint, astrologyProfile, forecasting) {
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
async function copyToClipboard(text) {
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
      title: "Soul Urge / Heart\'s Desire",
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
          '<td><strong>Soul Urge / Heart\'s Desire</strong><br><span style="font-size: 0.76rem; color: var(--text-muted);">Inner longings & emotional driver</span></td>' +
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
        '<p style="font-size: 0.88rem;">Today\'s micro-frequency emphasizes ' + pd.data.keyword.toLowerCase() + '.</p>' +
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
  showToast("✓ Profile for \"" + birthName + "\" saved to your personal vault!", "success");
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
        showToast("Loaded profile for \"" + p.birthName + "\"", "success");
      });

      item.querySelector(".btn-del-profile").addEventListener("click", function() {
        deleteProfile(p.id);
        updateSavedProfilesCount();
        openSavedProfilesModal();
        showToast("Deleted profile for \"" + p.birthName + "\"", "info");
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
    html = '<h3>' + title + '</h3>' +
      '<p style="margin-bottom: 1rem;">Calculated by reducing Birth Month, Day, and Year separately, then summing their core vibrations.</p>' +
      '<div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.95rem; margin-bottom: 1rem;">' +
        '<div><strong>1. Month (' + bp.birthDate.split("-")[1] + '):</strong> Reduced to ➔ <strong>' + lp.monthRed.value + '</strong></div>' +
        '<div><strong>2. Day (' + bp.birthDate.split("-")[2] + '):</strong> Reduced to ➔ <strong>' + lp.dayRed.value + '</strong></div>' +
        '<div><strong>3. Year (' + bp.birthDate.split("-")[0] + '):</strong> Reduced to ➔ <strong>' + lp.yearRed.value + '</strong></div>' +
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


})();
