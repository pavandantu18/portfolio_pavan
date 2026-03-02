import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";
import { PERSONAL_INFO, SOCIAL_LINKS, CLI_PROMPT, WINDOW_SIZES } from "../../config/constants";
import { useTheme } from "../../context/ThemeContext";
import { SPIDER_CHARS } from "../../config/spiderChars";
import "./Cli.scss";

const Cli = ({windowName, setwindowState, zIndex, onFocus}) => {
  const terminalRef = React.useRef(null);
  const { themeId } = useTheme();
  const char = SPIDER_CHARS[themeId] ?? SPIDER_CHARS.classic;

  const commands = {
    help: {
      description: "Show available commands",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '1rem' }}>
              🕸️ AVAILABLE COMMANDS
            </div>
            <div style={{ color: 'var(--t-accent)', marginBottom: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>whoami</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Identity reveal</span>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>powers</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Technical abilities</span>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>missions</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Battle-tested experience</span>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>training</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Academic background</span>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>contact</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Call for backup</span>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>stats</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Quick stats overview</span>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>clear</span>
              <span style={{ color: 'var(--t-text-dim)' }}> - </span>
              <span style={{ color: 'var(--t-text)' }}>Empty the terminal window</span>
            </div>
          </div>
        );
      }
    },

    clear: {
      description: "Empty the terminal window",
      fn: () => {
        if (terminalRef.current) {
          terminalRef.current.clearStdout();
        }
        return null;
      }
    },

    whoami: {
      description: "Identity reveal",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', marginBottom: '1rem' }}>
              ╔═══════════════════════════════════════╗<br/>
              ║ {PERSONAL_INFO.FULL_NAME}<br/>
              ║ <span style={{ color: 'var(--t-secondary)' }}>{PERSONAL_INFO.TITLE}</span><br/>
              ╚═══════════════════════════════════════╝
            </div>
            <div style={{ color: 'var(--t-accent)', marginBottom: '1rem' }}>
              {PERSONAL_INFO.TAGLINE}
            </div>
            <div style={{ color: 'var(--t-text)', marginBottom: '1rem' }}>
              {PERSONAL_INFO.YEARS_EXP} years building scalable backend systems and full-stack solutions.<br/>
              Specializing in <span style={{ color: 'var(--t-secondary)' }}>microservices</span>, <span style={{ color: 'var(--t-secondary)' }}>cloud infrastructure</span>, and <span style={{ color: 'var(--t-secondary)' }}>high-performance APIs</span>.
            </div>
            <div style={{ color: 'var(--t-text)' }}>
              {PERSONAL_INFO.EDUCATION_DEGREE} @ {PERSONAL_INFO.EDUCATION_SCHOOL} <span style={{ color: 'var(--t-accent)' }}>({PERSONAL_INFO.GPA} GPA)</span><br/>
              Currently: <span style={{ color: 'var(--t-primary)', fontWeight: '600' }}>{PERSONAL_INFO.CURRENT_ROLE} @ {PERSONAL_INFO.CURRENT_COMPANY}</span>
            </div>
          </div>
        );
      }
    },

    powers: {
      description: "Technical abilities",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem' }}>
              🕸️ CORE ABILITIES
            </div>
            <div style={{ color: 'var(--t-accent)' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>⚡ Backend Mastery</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              → Java (8, 11, 17) | Spring Boot | Node.js | Express<br/>
              → Microservices Architecture | RESTful APIs | gRPC<br/>
              → Event-Driven Systems: Kafka, RabbitMQ, AWS SQS/SNS
            </div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>🎯 Frontend Arsenal</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              → React.js | Angular | Redux | TypeScript<br/>
              → Component-driven architecture<br/>
              → Real-time dashboards & data visualization
            </div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>☁️ Cloud & Infrastructure</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              → AWS: EC2, S3, Lambda, RDS, DynamoDB, CloudWatch, ECS<br/>
              → Docker | Kubernetes | CI/CD (Jenkins, GitHub Actions)<br/>
              → Infrastructure as Code
            </div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>🛡️ Data & Security</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              → PostgreSQL | MongoDB | MySQL | DynamoDB<br/>
              → OAuth2 | JWT | SSL/TLS | SSO<br/>
              → JPA | Hibernate | Query Optimization
            </div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>🔧 DevOps Toolkit</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              → Jenkins | GitHub Actions | Docker | Kubernetes<br/>
              → Automated testing (JUnit, Mockito, Jest)<br/>
              → CloudWatch monitoring & alerting
            </div>
          </div>
        );
      }
    },

    missions: {
      description: "Battle-tested experience",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem' }}>
              🦸 MISSION LOG
            </div>
            <div style={{ color: 'var(--t-accent)' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>
              🏢 {PERSONAL_INFO.CURRENT_COMPANY} <span style={{ color: 'var(--t-text-dim)' }}>(Sep 2025 - Present)</span>
            </div>
            <div style={{ color: 'var(--t-accent)', marginLeft: '1rem' }}>{PERSONAL_INFO.CURRENT_ROLE}</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem', marginTop: '0.5rem' }}>
              ⚡ Responsibilities:<br/>
              • Leading architecture and design of scalable healthcare solutions<br/>
              • Mentoring junior engineers on best practices and system design<br/>
              • Building robust backend systems for patient data management<br/>
              • Implementing microservices for healthcare workflows<br/>
              • Optimizing performance and ensuring high availability<br/>
              • Collaborating with cross-functional teams for enterprise solutions
            </div>

            <div style={{ color: 'var(--t-accent)', marginTop: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>
              🏦 Truist <span style={{ color: 'var(--t-text-dim)' }}>(May 2022 - Jul 2024)</span>
            </div>
            <div style={{ color: 'var(--t-accent)', marginLeft: '1rem' }}>Software Developer</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem', marginTop: '0.5rem' }}>
              ⚡ Achievements:<br/>
              • Developed and maintained full-stack applications for financial services<br/>
              • Built RESTful APIs handling <span style={{ color: 'var(--t-accent)' }}>high-volume transactions</span><br/>
              • Implemented database optimization improving query performance by <span style={{ color: 'var(--t-accent)' }}>40%</span><br/>
              • Collaborated with teams to deliver features on schedule<br/>
              • Conducted code reviews and ensured code quality standards<br/>
              • Participated in CI/CD pipeline improvements
            </div>

            <div style={{ color: 'var(--t-accent)', marginTop: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-secondary)', fontWeight: '600', marginTop: '1rem' }}>
              🛍️ Fred Meyer <span style={{ color: 'var(--t-text-dim)' }}>(Dec 2019 - Apr 2022)</span>
            </div>
            <div style={{ color: 'var(--t-accent)', marginLeft: '1rem' }}>Junior Software Engineer</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem', marginTop: '0.5rem' }}>
              ⚡ Achievements:<br/>
              • Built web applications using modern frameworks and technologies<br/>
              • Developed features for e-commerce platform serving thousands of users<br/>
              • Participated in backend API development and maintenance<br/>
              • Fixed bugs and contributed to platform stability<br/>
              • Collaborated with senior engineers to grow technical skills<br/>
              • Implemented responsive frontend interfaces
            </div>
          </div>
        );
      }
    },

    training: {
      description: "Academic background",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem' }}>
              🎓 TRAINING GROUNDS
            </div>
            <div style={{ color: 'var(--t-accent)' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-text)', marginTop: '1rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>{PERSONAL_INFO.EDUCATION_DEGREE}</span><br/>
              {PERSONAL_INFO.EDUCATION_SCHOOL}<br/>
              GPA: <span style={{ color: 'var(--t-accent)', fontWeight: '600' }}>{PERSONAL_INFO.GPA}/4.0</span>
            </div>

            <div style={{ color: 'var(--t-secondary)', marginTop: '1rem' }}>Specialized Training:</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              • <span style={{ color: 'var(--t-accent)' }}>Full-Stack Development</span> - End-to-end application architecture<br/>
              • <span style={{ color: 'var(--t-accent)' }}>DevOps Engineering</span> - CI/CD, containerization, cloud automation<br/>
              • <span style={{ color: 'var(--t-secondary)' }}>Distributed Systems</span> - Microservices & scalable architectures<br/>
              • <span style={{ color: 'var(--t-secondary)' }}>Cloud Computing</span> - AWS infrastructure & deployment strategies<br/>
              • Software Engineering Best Practices<br/>
              • System Design & Performance Optimization
            </div>

            <div style={{ color: 'var(--t-secondary)', marginTop: '1rem' }}>Technical Expertise Built:</div>
            <div style={{ color: 'var(--t-text)', marginLeft: '1rem' }}>
              → Frontend: React, Angular, TypeScript, Redux<br/>
              → Backend: Spring Boot, Node.js, RESTful APIs, Microservices<br/>
              → DevOps: Docker, Kubernetes, Jenkins, GitHub Actions, AWS<br/>
              → Databases: PostgreSQL, MongoDB, DynamoDB
            </div>
          </div>
        );
      }
    },

    contact: {
      description: "Call for backup",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem' }}>
              📡 COMMUNICATION CHANNELS
            </div>
            <div style={{ color: 'var(--t-accent)' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-text)', marginTop: '1rem' }}>
              📧 Email:     <a href={`mailto:${SOCIAL_LINKS.email}`} style={{ color: 'var(--t-secondary)', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{SOCIAL_LINKS.email}</a><br/>
              📱 Phone:     <a href={`tel:${SOCIAL_LINKS.phoneTel}`} style={{ color: 'var(--t-secondary)', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{SOCIAL_LINKS.phone}</a><br/>
              💼 LinkedIn:  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--t-secondary)', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>linkedin.com/in/pavandantu18</a><br/>
              🐙 GitHub:    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--t-secondary)', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>github.com/pavandantu18</a>
            </div>

            <div style={{ color: 'var(--t-accent)', marginTop: '1rem' }}>
              Ready to collaborate on your next mission.
            </div>
          </div>
        );
      }
    },

    stats: {
      description: "Quick stats overview",
      fn: () => {
        return (
          <div>
            <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem' }}>
              📊 POWER LEVEL
            </div>
            <div style={{ color: 'var(--t-accent)' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: 'var(--t-text)', marginTop: '1rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>Professional Stats:</span><br/>
              Experience:          <span style={{ color: 'var(--t-accent)' }}>{PERSONAL_INFO.YEARS_EXP} years</span> in Full-Stack & DevOps<br/>
              System Uptime:       <span style={{ color: 'var(--t-accent)' }}>99.9%</span> across production environments<br/>
              Performance Gains:   <span style={{ color: 'var(--t-accent)' }}>Up to 60%</span> optimization achieved<br/>
              Release Speed:       <span style={{ color: 'var(--t-accent)' }}>2x faster</span> with CI/CD automation<br/>
            </div>

            <div style={{ color: 'var(--t-text)', marginTop: '1rem' }}>
              <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>Core Competencies:</span><br/>
              → Full-Stack Development (Frontend + Backend + APIs)<br/>
              → DevOps & Cloud Engineering (AWS, Docker, Kubernetes)<br/>
              → Microservices & Distributed Systems Architecture<br/>
              → CI/CD Pipeline Design & Automation<br/>
              → Database Design & Performance Optimization
            </div>

            <div style={{ color: 'var(--t-text)', marginTop: '1rem' }}>
              <span style={{ color: 'var(--t-accent)', fontWeight: '600' }}>Superpower:</span> <span style={{ color: 'var(--t-text)' }}>Building scalable full-stack applications with robust DevOps practices</span>
            </div>
          </div>
        );
      }
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
              <div style={{ color: 'var(--t-accent)', fontWeight: '500' }}>
                ╔═══════════════════════════════════════╗<br/>
                ║  🕷️  {char.name} — {char.sub}<br/>
                ║  {PERSONAL_INFO.TAGLINE}<br/>
                ╚═══════════════════════════════════════╝
              </div>
              <div style={{ color: 'var(--t-text)', marginTop: '1rem', marginBottom: '1rem' }}>
                Welcome, web-slinger! 👋
              </div>
              <div style={{ color: 'var(--t-primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '1rem' }}>
                🕸️ AVAILABLE COMMANDS (help - To get all commands)
              </div>
              <div style={{ color: 'var(--t-accent)', marginBottom: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>whoami</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Identity reveal</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>powers</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Technical abilities</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>missions</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Battle-tested experience</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>training</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Academic background</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>contact</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Call for backup</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>stats</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Quick stats overview</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--t-secondary)', fontWeight: '600' }}>clear</span>
                <span style={{ color: 'var(--t-text-dim)' }}> - </span>
                <span style={{ color: 'var(--t-text)' }}>Empty the terminal window</span>
              </div>

              <div style={{ color: 'var(--t-accent)', marginTop: '1rem' }}>
                Type any command to begin your mission 🕷️
              </div>
            </>
          }
          promptLabel={CLI_PROMPT}
          autoFocus={true}
          noAutomaticStdout={false}
          styleEchoBack="none"
          noDefaults={true}
          promptLabelStyle={{
            color: 'var(--t-primary)',
            fontWeight: '600',
            display: 'inline',
          }}
          inputTextStyle={{
            color: 'var(--t-secondary)',
            fontFamily: "'Exo 2', system-ui, sans-serif",
          }}
          contentStyle={{
            fontFamily: "'Exo 2', system-ui, sans-serif",
            fontSize: '0.9rem',
            lineHeight: '1.8',
            overflowX: 'hidden',
          }}
          messageStyle={{
            color: 'var(--t-text)'
          }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;
