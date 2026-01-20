import React from "react";
import MacWindow from "./MacWindow";
import Terminal from "react-console-emulator";
import "./cli.scss";

const Cli = ({windowName, setwindowState}) => {
  const terminalRef = React.useRef(null);

  const commands = {
    help: {
      description: "Show available commands",
      fn: () => {
        return (
          <div>
            <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem', marginBottom: '1rem' }}>
              🕸️ AVAILABLE COMMANDS
            </div>
            <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>whoami</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Identity reveal</span>
            </div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>powers</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Technical abilities</span>
            </div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>missions</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Battle-tested experience</span>
            </div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>training</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Academic background</span>
            </div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>contact</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Call for backup</span>
            </div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>stats</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Quick stats overview</span>
            </div>
            
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>clear</span>
              <span style={{ color: '#a1a1aa' }}> - </span>
              <span style={{ color: '#e5e7eb' }}>Empty the terminal window</span>
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
            <div style={{ color: '#ef4444', fontWeight: '600', marginBottom: '1rem' }}>
              ╔═══════════════════════════════════════════════════════════════╗<br/>
              ║ PAVAN KUMAR REDDY DANTU                                       ║<br/>
              ║ <span style={{ color: '#60a5fa' }}>Software Engineer | System Architect</span>                          ║<br/>
              ╚═══════════════════════════════════════════════════════════════╝
            </div>
            <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>
              With great code comes great responsibility.
            </div>
            <div style={{ color: '#e5e7eb', marginBottom: '1rem' }}>
              4+ years building scalable backend systems and full-stack solutions.<br/>
              Specializing in <span style={{ color: '#60a5fa' }}>microservices</span>, <span style={{ color: '#60a5fa' }}>cloud infrastructure</span>, and <span style={{ color: '#60a5fa' }}>high-performance APIs</span>.
            </div>
            <div style={{ color: '#e5e7eb' }}>
              Masters in Computer Science @ UNC Charlotte <span style={{ color: '#fbbf24' }}>(4.0 GPA)</span><br/>
              Currently: <span style={{ color: '#ef4444', fontWeight: '600' }}>Software Engineer @ Bread Financial</span>
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
            <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem' }}>
              🕸️ CORE ABILITIES
            </div>
            <div style={{ color: '#fbbf24' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            
            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>⚡ Backend Mastery</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
              → Java (8, 11, 17) | Spring Boot | Node.js | Express<br/>
              → Microservices Architecture | RESTful APIs | gRPC<br/>
              → Event-Driven Systems: Kafka, RabbitMQ, AWS SQS/SNS
            </div>

            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>🎯 Frontend Arsenal</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
              → React.js | Angular | Redux | TypeScript<br/>
              → Component-driven architecture<br/>
              → Real-time dashboards & data visualization
            </div>

            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>☁️ Cloud & Infrastructure</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
              → AWS: EC2, S3, Lambda, RDS, DynamoDB, CloudWatch, ECS<br/>
              → Docker | Kubernetes | CI/CD (Jenkins, GitHub Actions)<br/>
              → Infrastructure as Code
            </div>

            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>🛡️ Data & Security</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
              → PostgreSQL | MongoDB | MySQL | DynamoDB<br/>
              → OAuth2 | JWT | SSL/TLS | SSO<br/>
              → JPA | Hibernate | Query Optimization
            </div>

            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>🔧 DevOps Toolkit</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
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
            <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem' }}>
              🦸 MISSION LOG
            </div>
            <div style={{ color: '#fbbf24' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            
            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>
              🏢 Bread Financial | Columbus, OH <span style={{ color: '#a1a1aa' }}>(Jan 2025 - Present)</span>
            </div>
            <div style={{ color: '#fbbf24', marginLeft: '1rem' }}>Software Engineer</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem', marginTop: '0.5rem' }}>
              ⚡ Achievements:<br/>
              • Built Spring Boot microservices handling high-volume finance transactions<br/>
              • Engineered event-driven pipelines with AWS SQS/SNS<br/>
              • <span style={{ color: '#fbbf24' }}>Reduced release cycle time by 50%</span> with CI/CD automation<br/>
              • <span style={{ color: '#fbbf24' }}>Optimized PostgreSQL queries - 55% faster</span> report generation<br/>
              • Deployed containerized apps on AWS ECS<br/>
              • Implemented OAuth 2.0 & JWT secured REST APIs
            </div>

            <div style={{ color: '#fbbf24', marginTop: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

            <div style={{ color: '#60a5fa', fontWeight: '600', marginTop: '1rem' }}>
              🚗 Uhnder Inc. | Chennai, India <span style={{ color: '#a1a1aa' }}>(Nov 2021 - Aug 2024)</span>
            </div>
            <div style={{ color: '#fbbf24', marginLeft: '1rem' }}>Software Engineer</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem', marginTop: '0.5rem' }}>
              ⚡ Achievements:<br/>
              • Scaled microservices to process <span style={{ color: '#fbbf24' }}>10M+ sensor packets daily</span><br/>
              • Built ProViz: Data visualization platform with <span style={{ color: '#fbbf24' }}>45% lower latency</span><br/>
              • Achieved <span style={{ color: '#fbbf24' }}>99.9% uptime</span> across 5 environments using Kubernetes<br/>
              • <span style={{ color: '#fbbf24' }}>Reduced release times by 60%</span> with Jenkins/Docker CI/CD<br/>
              • Implemented RabbitMQ message-driven ingestion system<br/>
              • <span style={{ color: '#fbbf24' }}>Optimized MongoDB aggregation queries by 60%</span><br/>
              • Cut incident response time by 30% with CloudWatch metrics
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
            <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem' }}>
              🎓 TRAINING GROUNDS
            </div>
            <div style={{ color: '#fbbf24' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            
            <div style={{ color: '#e5e7eb', marginTop: '1rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>Master's in Computer Science</span><br/>
              University of North Carolina Charlotte<br/>
              GPA: <span style={{ color: '#fbbf24', fontWeight: '600' }}>4.0/4.0</span>
            </div>

            <div style={{ color: '#60a5fa', marginTop: '1rem' }}>Specialized Training:</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
              • <span style={{ color: '#fbbf24' }}>Full-Stack Development</span> - End-to-end application architecture<br/>
              • <span style={{ color: '#fbbf24' }}>DevOps Engineering</span> - CI/CD, containerization, cloud automation<br/>
              • <span style={{ color: '#60a5fa' }}>Distributed Systems</span> - Microservices & scalable architectures<br/>
              • <span style={{ color: '#60a5fa' }}>Cloud Computing</span> - AWS infrastructure & deployment strategies<br/>
              • Software Engineering Best Practices<br/>
              • System Design & Performance Optimization
            </div>

            <div style={{ color: '#60a5fa', marginTop: '1rem' }}>Technical Expertise Built:</div>
            <div style={{ color: '#e5e7eb', marginLeft: '1rem' }}>
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
            <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem' }}>
              📡 COMMUNICATION CHANNELS
            </div>
            <div style={{ color: '#fbbf24' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            
            <div style={{ color: '#e5e7eb', marginTop: '1rem' }}>
              📧 Email:     <a href="mailto:pavandantu2507@gmail.com" style={{ color: '#60a5fa', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>pavandantu2507@gmail.com</a><br/>
              📱 Phone:     <a href="tel:+19803935394" style={{ color: '#60a5fa', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>(980) 393-5394</a><br/>
              💼 LinkedIn:  <a href="https://www.linkedin.com/in/pavandantu18/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>linkedin.com/in/pavandantu18</a><br/>
              🐙 GitHub:    <a href="https://github.com/pavandantu18" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>github.com/pavandantu18</a>
            </div>

            <div style={{ color: '#fbbf24', marginTop: '1rem' }}>
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
            <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem' }}>
              📊 POWER LEVEL
            </div>
            <div style={{ color: '#fbbf24' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            
            <div style={{ color: '#e5e7eb', marginTop: '1rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>Professional Stats:</span><br/>
              Experience:          <span style={{ color: '#fbbf24' }}>4+ years</span> in Full-Stack & DevOps<br/>
              System Uptime:       <span style={{ color: '#fbbf24' }}>99.9%</span> across production environments<br/>
              Performance Gains:   <span style={{ color: '#fbbf24' }}>Up to 60%</span> optimization achieved<br/>
              Release Speed:       <span style={{ color: '#fbbf24' }}>2x faster</span> with CI/CD automation<br/>
            </div>

            <div style={{ color: '#e5e7eb', marginTop: '1rem' }}>
              <span style={{ color: '#60a5fa', fontWeight: '600' }}>Core Competencies:</span><br/>
              → Full-Stack Development (Frontend + Backend + APIs)<br/>
              → DevOps & Cloud Engineering (AWS, Docker, Kubernetes)<br/>
              → Microservices & Distributed Systems Architecture<br/>
              → CI/CD Pipeline Design & Automation<br/>
              → Database Design & Performance Optimization
            </div>

            <div style={{ color: '#e5e7eb', marginTop: '1rem' }}>
              <span style={{ color: '#fbbf24', fontWeight: '600' }}>Superpower:</span> <span style={{ color: '#e5e7eb' }}>Building scalable full-stack applications with robust DevOps practices</span>
            </div>
          </div>
        );
      }
    },

  };

  return (
    <MacWindow windowName={windowName} setwindowState={setwindowState}>
      <div className="cli-window">
        <Terminal
          ref={terminalRef}
          commands={commands}
          welcomeMessage={
            <>
              <div style={{ color: '#fcd34d', fontWeight: '500' }}>
                ╔═══════════════════════════════════════════════════════════════╗<br/>
                ║                                                               ║<br/>
                ║        🕷️  SPIDER-VERSE TERMINAL v4.0                         ║<br/>
                ║                                                               ║<br/>
                ║        "With great code comes great responsibility"          ║<br/>
                ║                                                               ║<br/>
                ╚═══════════════════════════════════════════════════════════════╝
              </div>
              <div style={{ color: '#e5e7eb', marginTop: '1rem', marginBottom: '1rem' }}>
                Welcome, web-slinger! 👋
              </div>
              <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '1rem', marginBottom: '1rem' }}>
                🕸️ AVAILABLE COMMANDS (help - To get all commands)
              </div>
              <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>whoami</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Identity reveal</span>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>powers</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Technical abilities</span>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>missions</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Battle-tested experience</span>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>training</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Academic background</span>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>contact</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Call for backup</span>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>stats</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Quick stats overview</span>
              </div>
              
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#60a5fa', fontWeight: '600' }}>clear</span>
                <span style={{ color: '#a1a1aa' }}> - </span>
                <span style={{ color: '#e5e7eb' }}>Empty the terminal window</span>
              </div>
              
              <div style={{ color: '#fbbf24', marginTop: '1rem' }}>
                Type any command to begin your mission 🕷️
              </div>
            </>
          }
          promptLabel="pavan@web-dev:~$ "
          autoFocus={true}
          noAutomaticStdout={false}
          styleEchoBack="none"
          noDefaults={true}
          promptLabelStyle={{
            color: '#ef4444',
            fontWeight: '600',
            display: 'inline',
          }}
          inputTextStyle={{
            color: '#60a5fa',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace'
          }}
          contentStyle={{
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.8'
          }}
          messageStyle={{
            color: '#e5e7eb'
          }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;