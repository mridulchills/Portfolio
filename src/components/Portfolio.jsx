import { useScrollReveal } from '../hooks/useScrollReveal'
import { CometCard } from './CometCard'

export default function Portfolio() {
  const sectionRef = useScrollReveal({ stagger: 130 })

  return (
    <section id="portfolio" ref={sectionRef}>
      <div className="portfolio-layout">
        {/* Left column */}
        <div className="portfolio-left">
          <div className="section-label reveal">
            <span className="dash">—</span>
            <span className="word">Portfolio</span>
          </div>
          <h2 className="display-heading reveal">
            All Projects,<br />Selected Works.
          </h2>
          <p className="about-body-text reveal">
            From legal AI agents to hackathon-winning Web3 tools — here's what I've built.
          </p>
          <a href="https://github.com/mridulchills" target="_blank" rel="noopener noreferrer" className="yellow-link reveal">
            Explore more <span className="arr">→</span>
          </a>
        </div>

        {/* Right column: asymmetric grid */}
        <div className="project-grid reveal">
          {/* FDTS — spans full height on left */}
          <CometCard wrapperClassName="project-card--seone" className="project-card" href="https://fdp-theta.vercel.app" target="_blank" rel="noopener noreferrer">
            <div className="project-card-inner">
              <div className="project-card-front">
                <div className="project-card-header">
                  <span className="project-card-name">Faculty Development Tracker System..</span>
                  <span className="project-card-tags">Full Stack ·<br />React · SQL</span>
                </div>
                <div className="project-card-image">
                  <img src="/mockup-seone.png" alt="FDTS dashboard" />
                </div>
              </div>
              <div className="project-card-back">
                <p className="about-body-text" style={{ margin: 0, color: 'var(--text-body-light)', fontSize: '15px', lineHeight: '1.6' }}>
                  <strong style={{ color: 'var(--accent)' }}>Faculty Development Tracking System</strong><br /><br />
                  Built a full-stack Faculty Development Tracking System (FDTS) for
                  500+ faculty across 10+ departments, automating end-to-end FDP submission, approvals, document handling, and
                  delivering real-time data analysis insights.
                </p>
              </div>
            </div>
          </CometCard>

          {/* Verdicto — top right */}
          <CometCard wrapperClassName="project-card--beserver" className="project-card" href="https://github.com/mridulchills/Verdicto" target="_blank" rel="noopener noreferrer">
            <div className="project-card-inner">
              <div className="project-card-front">
                <div className="project-card-header">
                  <span className="project-card-name">Verdicto.</span>
                  <span className="project-card-tags">AI · Python<br />· FastAPI</span>
                </div>
                <div className="project-card-image">
                  <img src="/mockup-beserver.png" alt="Verdicto product" />
                </div>
              </div>
              <div className="project-card-back">
                <p className="about-body-text" style={{ margin: 0, color: 'var(--text-body-light)', fontSize: '14px', lineHeight: '1.6' }}>
                  <strong style={{ color: 'var(--accent)' }}>Agentic Multi-Agent Legal AI System</strong><br /><br />
                  Architected and designed a scalable Python-based agentic AI system for legal case analysis, implementing a custom scheduler for dynamic multi-agent orchestration and iterative workflows. Built modular agent pipelines and backend services using FastAPI, enabling adaptive decision-making, explainability, and efficient handling of complex reasoning tasks.
                </p>
              </div>
            </div>
          </CometCard>

          {/* Spendora — bottom right */}
          <CometCard wrapperClassName="project-card--tumbler" className="project-card" href="https://spendora-wallet.vercel.app/" target="_blank" rel="noopener noreferrer">
            <div className="project-card-inner">
              <div className="project-card-front">
                <div className="project-card-header">
                  <span className="project-card-name">
                    <div style={{ background: '#f5c01a', color: '#252535', fontSize: '9px', borderRadius: '4px', padding: '2px 6px', fontWeight: 'bold', display: 'inline-block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      🏆 1st Place
                    </div>
                    <br />Spendora.
                  </span>
                  <span className="project-card-tags">Web3 · AI<br />· Hackathon</span>
                </div>
                <div className="project-card-image">
                  <img src="/mockup-tumbler.png" alt="Spendora" />
                </div>
              </div>
              <div className="project-card-back">
                <p className="about-body-text" style={{ margin: 0, color: 'var(--text-body-light)', fontSize: '15px', lineHeight: '1.6' }}>
                  <strong style={{ color: 'var(--accent)' }}>Wallet Persona</strong><br /><br />
                  Developed a full-stack app leveraging artificial intelligence to transform Ethereum wallets into AI-driven personas and financial insights, winning 1st place in Decode Select S01, a national-level online bounty hackathon.
                </p>
              </div>
            </div>
          </CometCard>
        </div>
      </div>
    </section>
  )
}
