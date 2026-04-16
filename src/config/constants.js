// ─── Achievement definitions ───────────────────────────────────────────────
export const ACHIEVEMENTS = {
  SPIDER_VERSE:       "spiderVerse",
  MUSIC_ENTHUSIASTIC: "musicEnthusiastic",
  KNOW_ME:            "knowMe",
  MEMORY_MASTER:      "memoryMaster",
  SPEED_TYPIST:       "speedTypist",
  OMNITRIX_TIMEOUT:   "omnitrixTimeout",
};

export const ACHIEVEMENT_LABELS = {
  spiderVerse:        "Spider-Verse Traveler",
  musicEnthusiastic:  "Music Enthusiastic",
  knowMe:             "Know About Me",
  memoryMaster:       "Memory Master",
  speedTypist:        "Speed Typist",
  omnitrixTimeout:    "Omnitrix Master",
};

export const ACHIEVEMENT_ICONS = {
  spiderVerse:        "🌐",
  musicEnthusiastic:  "🎶",
  knowMe:             "🔗",
  memoryMaster:       "🧠",
  speedTypist:        "⌨️",
  omnitrixTimeout:    "🟢",
};

export const ACHIEVEMENT_DESCRIPTIONS = {
  spiderVerse:        "Activate all 8 themes across Spider-Verse, Pokémon, and Ben 10 in the Theme Explorer.",
  musicEnthusiastic:  "Open Spotify.",
  knowMe:             "Unlock by visiting my LinkedIn profile.",
  memoryMaster:       "Complete the Memory Web card match game.",
  speedTypist:        `Type at ${60}+ WPM in Spider-Type.`,
  omnitrixTimeout:    "Complete all 3 rounds of Countdown to Timeout before the Omnitrix beeps.",
};

// ─── Character lore for Theme Explorer ────────────────────────────────────
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
  pikachu: {
    universe: "Kanto Region · Route 1",
    power:    "Thunderbolt · Agility · Iron Tail",
    quote:    "Pika pika!",
  },
  gengar: {
    universe: "Lavender Town · Ghost Tower",
    power:    "Shadow Ball · Dream Eater · Hypnosis",
    quote:    "In the darkness, I am the shadow that haunts you.",
  },
  diamondhead: {
    universe: "Petropia · Omnitrix DNA",
    power:    "Crystal Shards · Diamond Armor · Refraction",
    quote:    "Harder than diamond, sharper than any blade.",
  },
};

// ─── EmailJS ───────────────────────────────────────────────────────────────
export const EMAILJS = {
  SERVICE_ID:  "service_m0s9iua",
  TEMPLATE_ID: "template_jb90i8k",
  PUBLIC_KEY:  "fGcJmfwiWhzMYyGf5",
};

// ─── Social & contact links ────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/pavandantu18/",
  github:   "https://github.com/pavandantu18",
  email:    "pavandantu18@gmail.com",
  phone:    "(728) 212-2693",
  phoneTel: "+17282122693",
};

// ─── Personal information ──────────────────────────────────────────────────
export const PERSONAL_INFO = {
  FULL_NAME:        "PAVAN KUMAR REDDY DANTU",
  USERNAME:         "pavankumar",
  TITLE:            "Senior Software Engineer | System Architect",
  TAGLINE:          "With great code comes great responsibility.",
  YEARS_EXP:        "5+",
  EDUCATION_DEGREE: "Master's in Computer Science",
  EDUCATION_SCHOOL: "University of North Carolina Charlotte",
  GPA:              "4.0",
  CURRENT_ROLE:     "Senior Software Engineer",
  CURRENT_COMPANY:  "Molina Healthcare",
};

// ─── Terminal commands ─────────────────────────────────────────────────────
export const CLI_COMMANDS = {
  WHOAMI:   "whoami",
  POWERS:   "powers",
  MISSIONS: "missions",
  TRAINING: "training",
  CONTACT:  "contact",
  STATS:    "stats",
  HELP:     "help",
  CLEAR:    "clear",
};

export const CLI_PROMPT = "pavan@web-dev:~$ ";

// ─── Spotify ───────────────────────────────────────────────────────────────
export const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/playlist/5muSk2zfQ3LI70S64jbrX7?utm_source=generator&theme=0";

// ─── Window sizes (spread onto MacWindow as props) ─────────────────────────
export const WINDOW_SIZES = {
  CLI:            { initialWidth: 700, initialHeight: 500 },
  GAMES_FOLDER:   { initialWidth: 780, initialHeight: 270 },
  MEMORY_WEB:     { initialWidth: 680, initialHeight: 580 },
  SPIDER_TYPE:    { initialWidth: 640, initialHeight: 390 },
  OMNITRIX:       { initialWidth: 600, initialHeight: 530, minWidth: 600, minHeight: 480 },
  THEME_EXPLORER: { initialWidth: 820, initialHeight: 480 },
  CONTACT:        { initialWidth: 460, initialHeight: 470 },
  FINDER:         { initialWidth: 860, initialHeight: 540, minWidth: 620, minHeight: 400 },
};

// ─── Finder — Projects ─────────────────────────────────────────────────────
export const FINDER_PROJECTS = [
  {
    name:   "Orbit Chat",
    emoji:  "💬",
    type:   "personal",
    desc:   "Slack-style multitenant B2B team chat app where each company gets its own workspace with channels and direct messaging. Built with real-time Convex backend, Clerk for auth and org management, and subscription-gated Free vs Pro plans.",
    tags:   ["Next.js", "React", "Convex", "Clerk", "TypeScript"],
    github: "https://github.com/pavandantu18/Orbitchat",
    demo:   "https://orbitchatdev.vercel.app/",
    status: "Live",
  },
  {
    name:   "Tab Group Cleaner",
    emoji:  "🗂️",
    type:   "personal",
    desc:   "Chrome extension to declutter and organise browser tabs. Groups tabs by domain, detects duplicates, lets you search and filter, saves sessions as JSON snapshots, supports undo for closed tabs, and ships with light and dark themes.",
    tags:   ["Chrome Extension", "JavaScript", "Chrome APIs", "HTML", "CSS"],
    github: null,
    demo:   "https://chromewebstore.google.com/detail/tab-group-cleaner/ofmpmhknmfcfdahjmoonkcjnkbmjpkna",
    status: "Live",
  },
  {
    name:   "Dev Tinder",
    emoji:  "❤️‍🔥",
    type:   "personal",
    desc:   "Tinder-style developer matchmaking platform with a full microservices backend. Swipe on dev profiles, match with collaborators, and connect with engineers who share your stack.",
    tags:   ["Node.js", "React", "Microservices", "MongoDB", "Express"],
    github: "https://github.com/pavandantu18/Tinder-for-devs",
    demo:   null,
    status: "Shipped",
  },
  {
    name:   "Renewable Energy Analyzer",
    emoji:  "🌱",
    type:   "personal",
    desc:   "Hackathon project. Full-stack energy analytics dashboard pulling live data from EIA and FRED APIs. Features AI-powered insights via Gemini API, interactive maps with Leaflet, and animated charts built with Recharts.",
    tags:   ["Next.js", "Convex", "Gemini API", "Recharts", "Leaflet", "EIA API", "FRED API"],
    github: null,
    demo:   "https://renewable-energy-analyis.vercel.app/",
    status: "Live",
  },
  {
    name:   "Spider Portfolio",
    emoji:  "🕷",
    type:   "personal",
    desc:   "Interactive macOS-style portfolio featuring Spider-Man themes, mini-games, an achievement system, and a built-in CLI terminal.",
    tags:   ["React", "Vite", "SCSS", "CSS Animations", "EmailJS"],
    github: "https://github.com/pavandantu18",
    demo:   null,
    status: "Live",
  },
  {
    name:   "Healthcare Patient Portal",
    emoji:  "🏥",
    type:   "company",
    desc:   "Enterprise-scale microservices portal for managing patient records, appointments, and healthcare workflows with real-time data sync and role-based access control.",
    tags:   ["Java", "Spring Boot", "React", "Kafka", "PostgreSQL", "AWS ECS", "Docker"],
    github: null,
    demo:   null,
    status: "Production",
  },
  {
    name:   "FinTech Transaction Engine",
    emoji:  "💳",
    type:   "company",
    desc:   "High-volume RESTful API processing financial transactions at scale. Delivered a 40% query performance improvement through targeted DB optimisation and indexing strategies.",
    tags:   ["Java", "Spring Boot", "PostgreSQL", "AWS RDS", "Jenkins", "Docker"],
    github: null,
    demo:   null,
    status: "Shipped",
  },
  {
    name:   "Distributed Event Bus",
    emoji:  "⚡",
    type:   "company",
    desc:   "Event-driven messaging layer using Kafka and RabbitMQ for decoupled, async communication between microservices across multiple services and regions.",
    tags:   ["Java", "Kafka", "RabbitMQ", "AWS SQS/SNS", "Spring Boot"],
    github: null,
    demo:   null,
    status: "Production",
  },
  {
    name:   "CI/CD Automation Suite",
    emoji:  "🔧",
    type:   "company",
    desc:   "End-to-end CI/CD pipeline that cut release time by 2x with automated testing, containerisation, and cloud deployment across multiple environments.",
    tags:   ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "AWS", "JUnit"],
    github: null,
    demo:   null,
    status: "Internal",
  },
];

// ─── Games folder list ─────────────────────────────────────────────────────
export const GAMES_LIST = [
  { key: "themeExplorer",   emoji: "🌐", name: "Theme Explorer", desc: "Explore all Spider-Verse universes" },
  { key: "memory",          emoji: "🕸",  name: "Memory Web",     desc: "Match the cards" },
  { key: "spiderType",      emoji: "⌨️", name: "Spider-Type",    desc: "Type to test speed" },
  { key: "omnitrixTimeout", emoji: "🟢", name: "Code Scan",       desc: "Identify the tech behind this portfolio before the Omnitrix times out" },
  { key: "achievement",     emoji: "🏆", name: "Achievements",    desc: "View trophies earned while exploring" },
];

// ─── SpiderType game ───────────────────────────────────────────────────────
export const SPIDER_TYPE_SENTENCES = [
  "React and TypeScript are my weapons of choice as a developer.",
  "I build fast, accessible, and beautiful web applications.",
  "With great power comes great responsibility in software engineering.",
  "Every bug is a villain and clean code is my superpower.",
  "Full-stack development from database design to pixel-perfect UI.",
  "Node.js, Python, and React form the core of my tech stack.",
  "I craft user experiences as smooth as web-slinging across Manhattan.",
  "Spider-Man swings through the city and I navigate through codebases.",
];

export const SPIDER_TYPE_RANKS = [
  { min: 100, label: "Spider-Sense",  emoji: "⚡", color: "#ef4444" },
  { min: 70,  label: "Spider-Man",    emoji: "🕷",  color: "#dc2626" },
  { min: 50,  label: "S.H.I.E.L.D.", emoji: "🛡️", color: "#3b82f6" },
  { min: 30,  label: "Daily Bugler",  emoji: "📰", color: "#f59e0b" },
  { min: 0,   label: "Civilian",      emoji: "🐌", color: "#6b7280" },
];

export const SPIDER_TYPE_WPM_THRESHOLD = 60;

// ─── MemoryWeb game ────────────────────────────────────────────────────────
export const MEMORY_CARD_DEFS = [
  { id: "react",  emoji: "⚛️",  label: "React"      },
  { id: "js",     emoji: "🟨",  label: "JavaScript" },
  { id: "css",    emoji: "🎨",  label: "CSS"        },
  { id: "git",    emoji: "🐙",  label: "GitHub"     },
  { id: "node",   emoji: "🟢",  label: "Node.js"    },
  { id: "ts",     emoji: "📘",  label: "TypeScript" },
  { id: "python", emoji: "🐍",  label: "Python"     },
  { id: "html",   emoji: "🔶",  label: "HTML"       },
];

export const MEMORY_FLIP_DELAY = 850;

// ─── OmnitrixTimeout game ──────────────────────────────────────────────────
export const OMNITRIX_QUESTIONS = [
  {
    clue: "This portfolio is a single-page app. Which JavaScript library renders the entire UI as a component tree?",
    answer: "React",
    wrong: ["Vue", "Angular", "Svelte"],
  },
  {
    clue: "Achievements unlock everywhere without prop drilling. Which built-in React feature shares that state globally?",
    answer: "Context API",
    wrong: ["Redux", "Zustand", "Recoil"],
  },
  {
    clue: "'npm run dev' starts THIS — it serves the project with near-instant hot module replacement.",
    answer: "Vite",
    wrong: ["Webpack", "Create React App", "Parcel"],
  },
  {
    clue: "\"Have you visited this Spider-Verse universe before?\" The answer is stored HERE and survives a page refresh.",
    answer: "localStorage",
    wrong: ["sessionStorage", "Cookies", "React state"],
  },
  {
    clue: "Every window — terminal, games, contact — is draggable AND resizable thanks to this ONE npm package.",
    answer: "react-rnd",
    wrong: ["react-draggable", "framer-motion", "react-dnd"],
  },
  {
    clue: "Styles are authored in this CSS superset. It enables nesting, variables, and mixins — compiled by Vite.",
    answer: "SCSS",
    wrong: ["Tailwind CSS", "styled-components", "Less"],
  },
  {
    clue: "Clicking 'Send Message' fires an email with NO backend server at all. Which service makes that possible?",
    answer: "EmailJS",
    wrong: ["Nodemailer", "SendGrid", "Supabase"],
  },
  {
    clue: "The dock tilts in 3D as your cursor moves. This browser API drives that smooth animation loop with lerp.",
    answer: "requestAnimationFrame",
    wrong: ["CSS transitions", "GSAP", "Web Animations API"],
  },
  {
    clue: "The terminal, Spotify, GitHub, and mail icons in the dock all come from this React icon library.",
    answer: "@remixicon/react",
    wrong: ["react-icons", "lucide-react", "heroicons"],
  },
  {
    clue: "If a game crashes, only that window breaks — not the whole app. Which React pattern isolates the error?",
    answer: "ErrorBoundary",
    wrong: ["Suspense", "try-catch block", "React.memo"],
  },
  {
    clue: "The desktop spider web animates each frame using THIS browser API, drawing directly onto an HTML element.",
    answer: "Canvas API",
    wrong: ["SVG", "Three.js", "WebGL"],
  },
  {
    clue: "The CLI supports commands like 'whoami', 'powers', and 'missions' via this terminal emulator package.",
    answer: "react-console-emulator",
    wrong: ["xterm.js", "node-pty", "ink"],
  },
];

export const OMNITRIX_ROUNDS = [
  { questions: 4, time: 45 },
  { questions: 5, time: 40 },
  { questions: 6, time: 35 },
];

export const OMNITRIX_URGENT_MS  = 5000;
export const OMNITRIX_HINT_DELAY = 4500;
