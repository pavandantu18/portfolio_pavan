// Achievement definitions
export const ACHIEVEMENTS = {
  SPIDER_VERSE: "spiderVerse",
  MUSIC_ENTHUSIASTIC: "musicEnthusiastic",
  KNOW_ME: "knowMe",
  MEMORY_MASTER: "memoryMaster",
  SPEED_TYPIST: "speedTypist",
  OMNITRIX_TIMEOUT: "omnitrixTimeout",
};

export const ACHIEVEMENT_LABELS = {
  spiderVerse: "Spider-Verse Traveler",
  musicEnthusiastic: "Music Enthusiastic",
  knowMe: "Know About Me",
  memoryMaster: "Memory Master",
  speedTypist: "Speed Typist",
  omnitrixTimeout: "Omnitrix Master",
};

export const ACHIEVEMENT_ICONS = {
  spiderVerse: "🌐",
  musicEnthusiastic: "🎶",
  knowMe: "🔗",
  memoryMaster: "🧠",
  speedTypist: "⌨️",
  omnitrixTimeout: "🟢",
};

export const ACHIEVEMENT_DESCRIPTIONS = {
  spiderVerse: "Activate all 10 themes across Spider-Verse, Pokémon, and Ben 10 in the Theme Explorer.",
  musicEnthusiastic: "Open Spotify.",
  knowMe: "Unlock by visiting my LinkedIn profile.",
  memoryMaster: "Complete the Memory Web card match game.",
  speedTypist: "Type at 60+ WPM in Spider-Type.",
  omnitrixTimeout: "Complete all 3 rounds of Countdown to Timeout before the Omnitrix beeps.",
};

// Character lore for Theme Explorer
export const THEME_LORE = {
  classic: {
    universe: "Earth-616",
    power:    "Strength · Spider-Sense · Web-Slingers",
    quote:    "With great power comes great responsibility.",
  },
  miles: {
    universe: "Earth-1610B",
    power:    "Venom Blast · Camouflage · Spider-Sense",
    quote:    "Anyone can wear the mask.",
  },
  gwen: {
    universe: "Earth-65",
    power:    "Spider-Sense · Acrobatics · Web Fluid",
    quote:    "She could be anybody.",
  },
  noir: {
    universe: "Earth-90214",
    power:    "Stealth · Strength · Detective Skills",
    quote:    "Wrong neighbourhood, pal.",
  },
  scarlet: {
    universe: "Earth-616B",
    power:    "Enhanced Healing · Strength · Web Fluid",
    quote:    "There can be more than one.",
  },

  // Pokémon
  pikachu: {
    universe: "Kanto Region · Route 1",
    power:    "Thunderbolt · Agility · Iron Tail",
    quote:    "Pika pika!",
  },
  mewtwo: {
    universe: "Cerulean Cave · Kanto",
    power:    "Psychic · Shadow Ball · Aura Storm",
    quote:    "The circumstances of one's birth are irrelevant.",
  },
  gengar: {
    universe: "Lavender Town · Ghost Tower",
    power:    "Shadow Ball · Dream Eater · Hypnosis",
    quote:    "In the darkness, I am the shadow that haunts you.",
  },

  // Ben 10
  fourarms: {
    universe: "Khoros · Omnitrix DNA",
    power:    "Super Strength · Quake Slam · Multi-Strike",
    quote:    "Four arms are better than two!",
  },
  diamondhead: {
    universe: "Petropia · Omnitrix DNA",
    power:    "Crystal Shards · Diamond Armor · Refraction",
    quote:    "Harder than diamond, sharper than any blade.",
  },
};

// EmailJS — fill these in after setting up https://www.emailjs.com
// Service ID: Dashboard → Email Services → your service
// Template ID: Dashboard → Email Templates → your template
// Public Key:  Dashboard → Account → Public Key
export const EMAILJS = {
  SERVICE_ID:  "service_m0s9iua",
  TEMPLATE_ID: "template_jb90i8k",
  PUBLIC_KEY:  "fGcJmfwiWhzMYyGf5",
};

// Social & Contact URLs
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/pavandantu18/",
  github: "https://github.com/pavandantu18",
  email: "pavandantu18@gmail.com",
};

// Terminal commands
export const CLI_COMMANDS = {
  WHOAMI: "whoami",
  POWERS: "powers",
  MISSIONS: "missions",
  TRAINING: "training",
  CONTACT: "contact",
  STATS: "stats",
  HELP: "help",
  CLEAR: "clear",
};

// Theme colors
export const THEME_COLORS = {
  primary: "#ff6b6b",
  secondary: "#4ecdc4",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  text: "#ffffff",
};
