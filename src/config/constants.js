// Achievement definitions
export const ACHIEVEMENTS = {
  SPIDER_VERSE: "spiderVerse",
  MUSIC_ENTHUSIASTIC: "musicEnthusiastic",
  KNOW_ME: "knowMe",
  MEMORY_MASTER: "memoryMaster",
  SPEED_TYPIST: "speedTypist",
  SPIDER_SENSE: "spiderSense",
  KONAMI: "konami",
};

export const ACHIEVEMENT_LABELS = {
  spiderVerse: "Spider-Verse Traveler",
  musicEnthusiastic: "Music Enthusiastic",
  knowMe: "Know About Me",
  memoryMaster: "Memory Master",
  speedTypist: "Speed Typist",
  spiderSense: "Spider-Sense",
  konami: "↑↑↓↓←→←→BA",
};

export const ACHIEVEMENT_ICONS = {
  spiderVerse: "🌐",
  musicEnthusiastic: "🎶",
  knowMe: "🔗",
  memoryMaster: "🧠",
  speedTypist: "⌨️",
  spiderSense: "⚡",
  konami: "🎮",
};

export const ACHIEVEMENT_DESCRIPTIONS = {
  spiderVerse: "Activate all 5 Spider-Verse themes in the Theme Explorer.",
  musicEnthusiastic: "Open Spotify.",
  knowMe: "Unlock by visiting my LinkedIn profile.",
  memoryMaster: "Complete the Memory Web card match game.",
  speedTypist: "Type at 60+ WPM in Spider-Type.",
  spiderSense: "React in under 300ms in Spider-Sense.",
  konami: "You found the secret. Legendary.",
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
