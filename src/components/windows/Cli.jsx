import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";
import { PERSONAL_INFO, SOCIAL_LINKS, CLI_PROMPT, WINDOW_SIZES } from "../../config/constants";
import { useTheme } from "../../context/ThemeContext";
import { SPIDER_CHARS } from "../../config/spiderChars";
import "./Cli.scss";

const CMD_LIST = [
  ["whoami",   "Identity reveal"],
  ["powers",   "Technical abilities"],
  ["missions", "Battle-tested experience"],
  ["training", "Academic background"],
  ["contact",  "Call for backup"],
  ["stats",    "Quick stats overview"],
  ["clear",    "Empty the terminal"],
];

const HelpOutput = () => (
  <div className="cli-card">
    <div className="cli-title">🕸 Available Commands</div>
    <div className="cli-rule" />
    <div className="cli-cmd-grid">
      {CMD_LIST.map(([cmd, desc]) => (
        <div key={cmd} className="cli-cmd-row">
          <span className="cli-cmd-name">{cmd}</span>
          <span className="cli-cmd-desc">{desc}</span>
        </div>
      ))}
    </div>
  </div>
);

const Cli = ({ windowName, setwindowState, zIndex, onFocus }) => {
  const terminalRef = React.useRef(null);
  const { themeId } = useTheme();
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic; // eslint-disable-line no-unused-vars

  const commands = {
    help: {
      description: "Show available commands",
      fn: () => <HelpOutput />,
    },

    clear: {
      description: "Empty the terminal window",
      fn: () => {
        if (terminalRef.current) terminalRef.current.clearStdout();
        return null;
      },
    },

    whoami: {
      description: "Identity reveal",
      fn: () => (
        <div className="cli-card">
          <span className="cli-who-name">{PERSONAL_INFO.FULL_NAME}</span>
          <span className="cli-who-role">{PERSONAL_INFO.TITLE}</span>
          <p className="cli-para cli-para--accent">{PERSONAL_INFO.TAGLINE}</p>
          <p className="cli-para">
            {PERSONAL_INFO.YEARS_EXP} years building scalable backend systems and full-stack solutions.
            Specializing in <span className="cli-hl">microservices</span>,{" "}
            <span className="cli-hl">cloud infrastructure</span>, and{" "}
            <span className="cli-hl">high-performance APIs</span>.
          </p>
          <div className="cli-strip">
            <div className="cli-strip__item">
              <span className="cli-strip__label">Degree</span>
              <span className="cli-strip__val">{PERSONAL_INFO.EDUCATION_DEGREE}</span>
            </div>
            <div className="cli-strip__item">
              <span className="cli-strip__label">GPA</span>
              <span className="cli-strip__val">{PERSONAL_INFO.GPA} / 4.0</span>
            </div>
            <div className="cli-strip__item">
              <span className="cli-strip__label">Currently</span>
              <span className="cli-strip__val">
                {PERSONAL_INFO.CURRENT_ROLE} @ {PERSONAL_INFO.CURRENT_COMPANY}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    powers: {
      description: "Technical abilities",
      fn: () => (
        <div className="cli-card">
          <div className="cli-title">🕸 Core Abilities</div>
          <div className="cli-rule" />
          {[
            {
              label: "⚡ Backend",
              skills: ["Java", "Spring Boot", "Node.js", "Express", "Microservices", "gRPC", "Kafka", "RabbitMQ", "AWS SQS/SNS"],
            },
            {
              label: "🎯 Frontend",
              skills: ["React.js", "Angular", "Redux", "TypeScript", "Real-time Dashboards"],
            },
            {
              label: "☁️ Cloud",
              skills: ["AWS EC2", "S3", "Lambda", "RDS", "DynamoDB", "ECS", "CloudWatch", "Docker", "Kubernetes"],
            },
            {
              label: "🛡️ Data & Security",
              skills: ["PostgreSQL", "MongoDB", "MySQL", "OAuth2", "JWT", "SSL/TLS", "JPA", "Hibernate"],
            },
            {
              label: "🔧 DevOps",
              skills: ["Jenkins", "GitHub Actions", "CI/CD", "JUnit", "Mockito", "Jest", "IaC"],
            },
          ].map(({ label, skills }) => (
            <div key={label} className="cli-block">
              <div className="cli-block__label">{label}</div>
              <div className="cli-pills">
                {skills.map((s) => (
                  <span key={s} className="cli-pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },

    missions: {
      description: "Battle-tested experience",
      fn: () => (
        <div className="cli-card">
          <div className="cli-title">🦸 Mission Log</div>
          <div className="cli-rule" />
          {[
            {
              icon: "🏢",
              company: PERSONAL_INFO.CURRENT_COMPANY,
              period: "Sep 2025 – Present",
              role: PERSONAL_INFO.CURRENT_ROLE,
              bullets: [
                "Leading architecture of scalable healthcare solutions",
                "Mentoring junior engineers on best practices & system design",
                "Building robust backend systems for patient data management",
                "Implementing microservices for healthcare workflows",
                "Collaborating with cross-functional teams for enterprise delivery",
              ],
            },
            {
              icon: "🏦",
              company: "Truist",
              period: "May 2022 – Jul 2024",
              role: "Software Developer",
              bullets: [
                "Developed full-stack applications for financial services",
                "Built RESTful APIs handling high-volume transactions",
                "Improved query performance by 40% via DB optimization",
                "Conducted code reviews and ensured quality standards",
                "Contributed to CI/CD pipeline improvements",
              ],
            },
            {
              icon: "🛍️",
              company: "Fred Meyer",
              period: "Dec 2019 – Apr 2022",
              role: "Junior Software Engineer",
              bullets: [
                "Built e-commerce web apps serving thousands of users",
                "Participated in backend API development & maintenance",
                "Implemented responsive frontend interfaces",
                "Collaborated with senior engineers to grow technical skills",
              ],
            },
          ].map((job) => (
            <div key={job.company} className="cli-entry">
              <div className="cli-entry__head">
                <span className="cli-entry__company">{job.icon} {job.company}</span>
                <span className="cli-entry__period">{job.period}</span>
              </div>
              <div className="cli-entry__role">{job.role}</div>
              <ul className="cli-entry__list">
                {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ),
    },

    training: {
      description: "Academic background",
      fn: () => (
        <div className="cli-card">
          <div className="cli-title">🎓 Training Grounds</div>
          <div className="cli-rule" />
          <div className="cli-entry">
            <div className="cli-entry__head">
              <span className="cli-entry__company">🏛 {PERSONAL_INFO.EDUCATION_SCHOOL}</span>
            </div>
            <div className="cli-entry__role">{PERSONAL_INFO.EDUCATION_DEGREE}</div>
            <div className="cli-strip">
              <div className="cli-strip__item">
                <span className="cli-strip__label">GPA</span>
                <span className="cli-strip__val">{PERSONAL_INFO.GPA} / 4.0</span>
              </div>
            </div>
          </div>
          <div className="cli-block">
            <div className="cli-block__label">Specialized Training</div>
            <div className="cli-pills">
              {[
                "Full-Stack Development",
                "DevOps Engineering",
                "Distributed Systems",
                "Cloud Computing",
                "System Design",
                "Performance Optimization",
              ].map((s) => <span key={s} className="cli-pill">{s}</span>)}
            </div>
          </div>
          <div className="cli-block">
            <div className="cli-block__label">Technical Expertise</div>
            <div className="cli-pills">
              {[
                "React", "Angular", "TypeScript",
                "Spring Boot", "Node.js", "RESTful APIs",
                "Docker", "Kubernetes", "AWS", "Jenkins",
                "PostgreSQL", "MongoDB", "DynamoDB",
              ].map((s) => <span key={s} className="cli-pill">{s}</span>)}
            </div>
          </div>
        </div>
      ),
    },

    contact: {
      description: "Call for backup",
      fn: () => (
        <div className="cli-card">
          <div className="cli-title">📡 Communication Channels</div>
          <div className="cli-rule" />
          <div className="cli-contact-list">
            {[
              { icon: "📧", label: "Email",    node: <a href={`mailto:${SOCIAL_LINKS.email}`}>{SOCIAL_LINKS.email}</a> },
              { icon: "📱", label: "Phone",    node: <a href={`tel:${SOCIAL_LINKS.phoneTel}`}>{SOCIAL_LINKS.phone}</a> },
              { icon: "💼", label: "LinkedIn", node: <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/pavandantu18</a> },
              { icon: "🐙", label: "GitHub",   node: <a href={SOCIAL_LINKS.github}   target="_blank" rel="noopener noreferrer">github.com/pavandantu18</a> },
            ].map(({ icon, label, node }) => (
              <div key={label} className="cli-contact-row">
                <span className="cli-contact-row__icon">{icon}</span>
                <span className="cli-contact-row__label">{label}</span>
                {node}
              </div>
            ))}
          </div>
          <p className="cli-para cli-para--accent" style={{ marginTop: "0.65rem" }}>
            Ready to collaborate on your next mission.
          </p>
        </div>
      ),
    },

    stats: {
      description: "Quick stats overview",
      fn: () => (
        <div className="cli-card">
          <div className="cli-title">📊 Power Level</div>
          <div className="cli-rule" />
          <div className="cli-stats-grid">
            {[
              ["Experience",       `${PERSONAL_INFO.YEARS_EXP} years — Full-Stack & DevOps`],
              ["System Uptime",    "99.9% across production environments"],
              ["Performance Gain", "Up to 60% optimization achieved"],
              ["Release Speed",    "2× faster with CI/CD automation"],
            ].map(([label, val]) => (
              <div key={label} className="cli-stat-row">
                <span className="cli-stat-row__label">{label}</span>
                <span className="cli-stat-row__val">{val}</span>
              </div>
            ))}
          </div>
          <div className="cli-block">
            <div className="cli-block__label">Core Competencies</div>
            <div className="cli-pills">
              {[
                "Full-Stack Dev", "DevOps & Cloud", "Microservices",
                "CI/CD Automation", "DB Optimization", "System Design",
              ].map((s) => <span key={s} className="cli-pill">{s}</span>)}
            </div>
          </div>
          <p className="cli-para" style={{ marginTop: "0.4rem" }}>
            <span className="cli-hl">Superpower:</span> Building scalable full-stack apps with robust DevOps practices.
          </p>
        </div>
      ),
    },
  };

  // Case-insensitive: add UPPER and Title variants for every command
  const ciCommands = Object.fromEntries(
    Object.entries(commands).flatMap(([key, val]) => [
      [key, val],
      [key.toUpperCase(), val],
      [key.charAt(0).toUpperCase() + key.slice(1), val],
    ])
  );

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState} zIndex={zIndex} onFocus={onFocus} {...WINDOW_SIZES.CLI}>
      <div className="cli-window">
        <Terminal
          ref={terminalRef}
          commands={ciCommands}
          welcomeMessage={
            <>
              <p className="cli-para cli-para--accent" style={{ marginBottom: "0.6rem" }}>
                👋 Welcome — type a command to explore the portfolio.
              </p>
              <HelpOutput />
            </>
          }
          promptLabel={CLI_PROMPT}
          autoFocus={true}
          noAutomaticStdout={false}
          styleEchoBack="none"
          noDefaults={true}
          promptLabelStyle={{
            color: "var(--t-primary)",
            fontWeight: "600",
            display: "inline",
          }}
          inputTextStyle={{
            color: "var(--t-secondary)",
            fontFamily: "'Exo 2', system-ui, sans-serif",
          }}
          contentStyle={{
            fontFamily: "'Exo 2', system-ui, sans-serif",
            fontSize: "0.9rem",
            lineHeight: "1.8",
            overflowX: "hidden",
          }}
          messageStyle={{
            color: "var(--t-text)",
          }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;
