import { useState, useEffect, useRef } from "react";
import MacWindow from "../MacWindow";
import { PERSONAL_INFO, SOCIAL_LINKS, WINDOW_SIZES, FINDER_PROJECTS } from "../../../config/constants";
import "./Finder.scss";

// ── Sidebar config ───────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: "projects",       icon: "📁", label: "Projects"       },
  { id: "about",          icon: "👤", label: "About"           },
  { id: "experience",     icon: "💼", label: "Experience"      },
  { id: "education",      icon: "🎓", label: "Education"       },
  { id: "certifications", icon: "🏅", label: "Certifications"  },
  { id: "skills",         icon: "🛠", label: "Skills"          },
  { id: "contact",        icon: "📞", label: "Contact"         },
];

// ── Status colours — use only theme vars ─────────────────────────────────────
const STATUS_STYLE = {
  Live:       { bg: "var(--t-glow1h)", color: "var(--t-primary)"   },
  Production: { bg: "var(--t-glow2h)", color: "var(--t-secondary)" },
  Shipped:    { bg: "var(--t-glow1h)", color: "var(--t-accent)"    },
  Internal:   { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.42)" },
};

// ── Animated counter ─────────────────────────────────────────────────────────
function CountStat({ label, target, suffix, decimals = 0, active }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur   = 1500;
    const tick  = (now) => {
      const t     = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(+(target * eased).toFixed(decimals));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, decimals]);

  return (
    <div className="f-stat">
      <span className="f-stat__value">{val}{suffix}</span>
      <span className="f-stat__label">{label}</span>
    </div>
  );
}

// ── Level → pip count (1–5) ───────────────────────────────────────────────────
const LEVEL_TIERS = [
  { min: 90, pips: 5, label: "MASTERED" },
  { min: 78, pips: 4, label: "EXPERT"   },
  { min: 65, pips: 3, label: "ADVANCED" },
  { min: 50, pips: 2, label: "SKILLED"  },
  { min: 0,  pips: 1, label: "LEARNING" },
];
const getTier = (level) => LEVEL_TIERS.find(t => level >= t.min) ?? LEVEL_TIERS[4];

// ── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ name, level, colorVar, active, delay }) {
  const [width,    setWidth]    = useState(0);
  const [pipsLit,  setPipsLit]  = useState(0);
  const tier = getTier(level);

  useEffect(() => {
    if (!active) return;
    // Bar fill
    const t1 = setTimeout(() => setWidth(level), delay);
    // Pips light up one by one after bar starts
    const timers = Array.from({ length: tier.pips }, (_, i) =>
      setTimeout(() => setPipsLit(i + 1), delay + 200 + i * 120)
    );
    return () => { clearTimeout(t1); timers.forEach(clearTimeout); };
  }, [active, level, delay, tier.pips]);

  return (
    <div className="f-sbar">
      <div className="f-sbar__info">
        <span className="f-sbar__name">{name}</span>
        <div className="f-sbar__pips">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`f-sbar__pip${i < pipsLit ? " f-sbar__pip--lit" : ""}`}
              style={i < pipsLit ? { "--pip-color": `var(${colorVar})` } : undefined}
            />
          ))}
          <span className="f-sbar__tier" style={{ color: `var(${colorVar})` }}>
            {tier.label}
          </span>
        </div>
      </div>
      <div className="f-sbar__track">
        <div
          className="f-sbar__fill"
          style={{
            width: `${width}%`,
            background: `var(${colorVar})`,
            boxShadow: `0 0 12px var(${colorVar})`,
          }}
        />
      </div>
    </div>
  );
}

// ── Panel: Projects ──────────────────────────────────────────────────────────
const PROJECT_TABS = [
  { id: "personal",     label: "Personal",     icon: "🧑‍💻" },
  { id: "professional", label: "Professional", icon: "🏢"    },
];

function Projects() {
  const [tab, setTab]   = useState("personal");
  const gridRef         = useRef(null);

  const filtered = FINDER_PROJECTS.filter(p =>
    tab === "professional" ? p.type === "company" : p.type === tab
  );

  // Re-run reveal whenever the tab switches
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll(".f-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay ?? "0", 10);
        setTimeout(() => entry.target.classList.add("is-visible"), delay);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -8px 0px" });
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [tab]);

  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${y * -14}deg`);
    e.currentTarget.style.setProperty("--ry", `${x * 14}deg`);
  };
  const resetTilt = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <>
      <div className="f-proj-tabs">
        {PROJECT_TABS.map(t => (
          <button
            key={t.id}
            className={`f-proj-tab${tab === t.id ? " f-proj-tab--active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      <div className="f-projects" ref={gridRef}>
        {filtered.map((p, i) => {
          const ss = STATUS_STYLE[p.status] ?? STATUS_STYLE.Internal;
          return (
            <div
              key={p.name}
              className="f-card f-reveal"
              data-delay={i * 75}
              onMouseMove={tilt}
              onMouseLeave={resetTilt}
            >
              <div className="f-card__corner f-card__corner--tl" />
              <div className="f-card__corner f-card__corner--br" />
              <div className="f-card__scan" />
              <div className="f-card__glow" />

              <div className="f-card__header">
                <span className="f-card__emoji">{p.emoji}</span>
                <span className="f-status" style={{ background: ss.bg, color: ss.color }}>
                  ● {p.status}
                </span>
              </div>
              <div className="f-card__name">{p.name}</div>
              <p className="f-card__desc">{p.desc}</p>
              <div className="f-card__tags">
                {p.tags.map((t) => <span key={t} className="f-tag">{t}</span>)}
              </div>
              <div className="f-card__foot">
                <div className="f-card__links">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="f-link">GitHub ↗</a>}
                  {p.demo   && <a href={p.demo}   target="_blank" rel="noopener noreferrer" className="f-link f-link--demo">Demo ↗</a>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Panel: About — bento grid ─────────────────────────────────────────────────
function About() {
  const statsRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="f-bento-grid">
      {/* Avatar cell */}
      <div className="f-bento f-bento--avatar f-reveal">
        <div className="f-about__avatar-wrap">
          <div className="f-about__avatar-ring" />
          <div className="f-about__avatar">👨‍💻</div>
        </div>
      </div>

      {/* Name / title cell */}
      <div className="f-bento f-bento--info f-reveal" data-delay="60">
        <div className="f-about__name">{PERSONAL_INFO.FULL_NAME}</div>
        <div className="f-about__title">{PERSONAL_INFO.TITLE}</div>
        <p className="f-about__tagline">{PERSONAL_INFO.TAGLINE}</p>
        <div className="f-about__badge">
          <span className="f-badge">● Available</span>
          <span className="f-badge f-badge--dim">{PERSONAL_INFO.CURRENT_COMPANY}</span>
        </div>
      </div>

      {/* Stats cell */}
      <div className="f-bento f-bento--stats f-reveal" data-delay="110" ref={statsRef}>
        <CountStat label="Yrs Exp"    target={5}   suffix="+"  active={active} />
        <CountStat label="Projects"   target={20}  suffix="+"  active={active} />
        <CountStat label="GPA"        target={4.0} suffix=""   decimals={1} active={active} />
        <CountStat label="APIs"       target={30}  suffix="+"  active={active} />
      </div>

      {/* Bio cell */}
      <div className="f-bento f-bento--bio f-reveal" data-delay="160">
        <p className="f-para">
          {PERSONAL_INFO.YEARS_EXP} years building scalable backend systems and full-stack solutions.
          Specializing in <span className="f-hl">microservices</span>,{" "}
          <span className="f-hl">cloud infrastructure</span>, and{" "}
          <span className="f-hl">high-performance APIs</span> that handle millions of requests.
        </p>
      </div>

      {/* Meta cell */}
      <div className="f-bento f-bento--meta f-reveal" data-delay="210">
        {[
          { icon: "📍", text: "United States" },
          { icon: "🏢", text: `@ ${PERSONAL_INFO.CURRENT_COMPANY}` },
          { icon: "🎓", text: PERSONAL_INFO.EDUCATION_SCHOOL },
          { icon: "✉️", text: SOCIAL_LINKS.email },
        ].map(({ icon, text }) => (
          <div key={text} className="f-meta-row">
            <span className="f-meta-icon">{icon}</span>
            <span className="f-meta-label">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Panel: Experience — cinematic timeline ────────────────────────────────────
function Experience() {
  const jobs = [
    {
      icon: "🏢", company: PERSONAL_INFO.CURRENT_COMPANY,
      period: "Sep 2025 – Present", role: PERSONAL_INFO.CURRENT_ROLE,
      colorVar: "--t-primary",
      bullets: [
        "Leading architecture of scalable healthcare solutions",
        "Mentoring junior engineers on best practices & system design",
        "Building robust backend systems for patient data management",
        "Implementing microservices for healthcare workflows",
      ],
    },
    {
      icon: "🏦", company: "Truist",
      period: "May 2022 – Jul 2024", role: "Software Developer",
      colorVar: "--t-secondary",
      bullets: [
        "Developed full-stack applications for financial services",
        "Built RESTful APIs handling high-volume transactions",
        "Improved query performance by 40% via DB optimization",
        "Contributed to CI/CD pipeline improvements",
      ],
    },
    {
      icon: "🛍️", company: "Fred Meyer",
      period: "Dec 2019 – Apr 2022", role: "Junior Software Engineer",
      colorVar: "--t-accent",
      bullets: [
        "Built e-commerce web apps serving thousands of users",
        "Participated in backend API development & maintenance",
        "Implemented responsive frontend interfaces",
      ],
    },
  ];

  return (
    <div className="f-timeline">
      {jobs.map((job, i) => (
        <div key={job.company} className="f-tl-item f-reveal" data-delay={i * 120}>
          <div className="f-tl-left">
            <div
              className="f-tl-dot"
              style={{ background: `var(${job.colorVar})`, boxShadow: `0 0 14px var(${job.colorVar})` }}
            >
              <div className="f-tl-dot-ring" style={{ borderColor: `var(${job.colorVar})` }} />
            </div>
            <div className="f-tl-line" style={{ background: `linear-gradient(to bottom, var(${job.colorVar}), transparent)` }} />
          </div>
          <div className="f-tl-content">
            <div className="f-tl-header">
              <span className="f-tl-company">{job.icon} {job.company}</span>
              <span className="f-tl-period">{job.period}</span>
            </div>
            <div className="f-tl-role" style={{ color: `var(${job.colorVar})` }}>{job.role}</div>
            <ul className="f-entry__list">
              {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Panel: Education ─────────────────────────────────────────────────────────
function Education() {
  return (
    <div className="f-section">
      <div className="f-edu-card f-reveal">
        <div className="f-edu-card__icon">🏛</div>
        <div className="f-edu-card__school">{PERSONAL_INFO.EDUCATION_SCHOOL}</div>
        <div className="f-edu-card__degree">{PERSONAL_INFO.EDUCATION_DEGREE}</div>
        <div className="f-strip" style={{ marginTop: "1rem" }}>
          <div className="f-strip__item"><span className="f-strip__label">GPA</span><span className="f-strip__val">{PERSONAL_INFO.GPA} / 4.0</span></div>
          <div className="f-strip__item"><span className="f-strip__label">Field</span><span className="f-strip__val">Computer Science</span></div>
          <div className="f-strip__item"><span className="f-strip__label">Grad</span><span className="f-strip__val">Dec 2025</span></div>
        </div>

      </div>

      <div className="f-block f-reveal" data-delay="100">
        <div className="f-block__label">Specialized Training</div>
        <div className="f-pills">
          {["Full-Stack Development", "DevOps Engineering", "Distributed Systems",
            "Cloud Computing", "System Design", "Performance Optimization"].map(s => (
            <span key={s} className="f-pill">{s}</span>
          ))}
        </div>
      </div>

      <div className="f-block f-reveal" data-delay="170">
        <div className="f-block__label">Courses & Training</div>
        <div className="f-pills">
          {["Spring Boot Mastery", "Kubernetes Fundamentals",
            "System Design for Scale", "React Advanced Patterns"].map(s => (
            <span key={s} className="f-pill">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Panel: Certifications ────────────────────────────────────────────────────
function Certifications() {
  const certs = [
    {
      id: "aws-dev-associate",
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      issued: "2024",
      level: "Associate",
      colorVar: "--t-primary",
      credly: "https://www.credly.com/badges/d799dbd3-1a91-4a32-a2ac-5c523d4190a3",
      skills: ["Lambda", "DynamoDB", "S3", "API Gateway", "CloudFormation", "IAM", "SQS/SNS"],
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
          <path d="M14 34 Q24 38 34 34" stroke="var(--t-primary)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <path d="M31 31 L34 34 L31 37" stroke="var(--t-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M13 28 L16 18 L19.5 26 L23 18 L26 28" stroke="var(--t-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M28 18 L28 28 M28 22 L33 22 M33 18 L33 28" stroke="var(--t-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="f-section">
      <div className="f-certs-header f-reveal">
        <p className="f-para">Industry-recognized credentials validating cloud and software expertise.</p>
      </div>

      {certs.map((cert, i) => (
        <div key={cert.id} className="f-cert-full f-reveal" data-delay={i * 100}
          style={{ "--cert-color": `var(${cert.colorVar})`, "--cert-glow": `var(--t-glow1h)` }}>

          {/* Top row */}
          <div className="f-cert-full__top">
            <div className="f-cert-full__icon">{cert.icon}</div>
            <div className="f-cert-full__meta">
              <div className="f-cert-full__name">{cert.name}</div>
              <div className="f-cert-full__issuer">{cert.issuer}</div>
            </div>
            <div className="f-cert-full__right">
              <span className="f-cert-full__level">{cert.level}</span>
              <span className="f-cert-full__year">{cert.issued}</span>
            </div>
          </div>

          {/* Skill tags */}
          <div className="f-cert-full__skills">
            {cert.skills.map(s => (
              <span key={s} className="f-cert-full__tag">{s}</span>
            ))}
          </div>

          {/* Footer */}
          <div className="f-cert-full__foot">
            <span className="f-cert-full__verified">✓ Verified Credential</span>
            <a href={cert.credly} target="_blank" rel="noopener noreferrer"
              className="f-cert-full__link">
              View on Credly ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Panel: Skills — animated bars ────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    label: "⚡ Backend", colorVar: "--t-primary",
    items: [
      { name: "Java / Spring Boot",    level: 95 },
      { name: "Node.js / Express",     level: 85 },
      { name: "Microservices / gRPC",  level: 88 },
      { name: "Kafka / RabbitMQ",      level: 80 },
    ],
  },
  {
    label: "🎯 Frontend", colorVar: "--t-secondary",
    items: [
      { name: "React.js",   level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Angular",    level: 78 },
    ],
  },
  {
    label: "☁️ Cloud & Infra", colorVar: "--t-accent",
    items: [
      { name: "AWS (EC2/S3/Lambda/ECS)",     level: 88 },
      { name: "Docker / Kubernetes",          level: 82 },
      { name: "CI/CD (Jenkins/GH Actions)",  level: 85 },
    ],
  },
  {
    label: "🛡️ Data & Security", colorVar: "--t-primary",
    items: [
      { name: "PostgreSQL / MySQL", level: 90 },
      { name: "MongoDB / DynamoDB", level: 80 },
      { name: "OAuth2 / JWT",       level: 85 },
    ],
  },
];

function Skills() {
  const ref    = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="f-skills" ref={ref}>
      {SKILL_CATEGORIES.map((cat, ci) => (
        <div key={cat.label} className="f-skills__cat f-reveal" data-delay={ci * 85}>
          <div className="f-block__label" style={{ color: `var(${cat.colorVar})` }}>{cat.label}</div>
          {cat.items.map((item, ii) => (
            <SkillBar
              key={item.name}
              name={item.name}
              level={item.level}
              colorVar={cat.colorVar}
              active={active}
              delay={ci * 85 + ii * 95}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Panel: Contact ───────────────────────────────────────────────────────────
function Contact() {
  return (
    <div className="f-section">
      <div className="f-contact-list">
        {[
          { icon: "📧", label: "Email",    href: `mailto:${SOCIAL_LINKS.email}`,        text: SOCIAL_LINKS.email },
          { icon: "📱", label: "Phone",    href: `tel:${SOCIAL_LINKS.phoneTel}`,         text: SOCIAL_LINKS.phone },
          { icon: "💼", label: "LinkedIn", href: SOCIAL_LINKS.linkedin, target: "_blank", text: "linkedin.com/in/pavandantu18" },
          { icon: "🐙", label: "GitHub",   href: SOCIAL_LINKS.github,   target: "_blank", text: "github.com/pavandantu18" },
        ].map(({ icon, label, href, target, text }, i) => (
          <a
            key={label}
            href={href}
            target={target}
            rel={target ? "noopener noreferrer" : undefined}
            className="f-contact-row f-reveal"
            data-delay={i * 95}
          >
            <span className="f-contact-row__icon">{icon}</span>
            <span className="f-contact-row__label">{label}</span>
            <span className="f-contact-row__text">{text}</span>
            <span className="f-contact-row__arrow">↗</span>
          </a>
        ))}
      </div>
      <p className="f-para f-para--accent f-reveal" data-delay="400" style={{ marginTop: "1.4rem" }}>
        Open to new opportunities — let's build something great together.
      </p>
    </div>
  );
}

// ── Panel map — functions so each switch creates fresh instances ───────────────
const PANEL_MAP = {
  projects:       () => <Projects />,
  about:          () => <About />,
  experience:     () => <Experience />,
  education:      () => <Education />,
  certifications: () => <Certifications />,
  skills:         () => <Skills />,
  contact:        () => <Contact />,
};

// ── Main component ───────────────────────────────────────────────────────────
export default function Finder({ windowName, setwindowState, zIndex, onFocus }) {
  const [selected,  setSelected]  = useState("projects");
  const [typedPath, setTypedPath] = useState("~ / Projects");
  const panelRef = useRef(null);
  const current  = SIDEBAR_ITEMS.find(s => s.id === selected);

  // Typewriter path animation on panel switch
  useEffect(() => {
    const full = `~ / ${current?.label ?? ""}`;
    let i = 0;
    setTypedPath("");
    const timer = setInterval(() => {
      setTypedPath(full.slice(0, ++i));
      if (i >= full.length) clearInterval(timer);
    }, 32);
    return () => clearInterval(timer);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll-reveal: watch all .f-reveal after each panel switch
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const items = panel.querySelectorAll(".f-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay ?? "0", 10);
        setTimeout(() => entry.target.classList.add("is-visible"), delay);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -8px 0px" });

    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selected]);

  return (
    <MacWindow
      windowName={windowName}
      setwindowState={setwindowState}
      zIndex={zIndex}
      onFocus={onFocus}
      {...WINDOW_SIZES.FINDER}
    >
      <div className="finder">
        {/* Sidebar */}
        <aside className="finder__sidebar">
          <span className="finder__sidebar-label">PORTFOLIO</span>
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.id}
              className={`finder__sidebar-item${selected === item.id ? " finder__sidebar-item--active" : ""}`}
              onClick={() => setSelected(item.id)}
            >
              <span className="finder__sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main */}
        <div className="finder__main">
          <div className="finder__toolbar">
            <span className="finder__path">{typedPath}</span>
          </div>
          {/* key resets DOM so .f-reveal starts hidden on each switch */}
          <div className="finder__panel" ref={panelRef} key={selected}>
            {PANEL_MAP[selected]?.()}
          </div>
        </div>
      </div>
    </MacWindow>
  );
}
