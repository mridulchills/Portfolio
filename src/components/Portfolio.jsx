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
            <div className="project-card-header">
              <span className="project-card-name">Faculty Development Tracker System..</span>
              <span className="project-card-tags">Full Stack ·<br />React · SQL</span>
            </div>
            <div className="project-card-image">
              <img src="/mockup-seone.png" alt="FDTS dashboard" />
            </div>
          </CometCard>

          {/* Verdicto — top right */}
          <CometCard wrapperClassName="project-card--beserver" className="project-card" href="https://github.com/mridulchills/Verdicto" target="_blank" rel="noopener noreferrer">
            <div className="project-card-header">
              <span className="project-card-name">Verdicto.</span>
              <span className="project-card-tags">AI · Python<br />· FastAPI</span>
            </div>
            <div className="project-card-image">
              <img src="/mockup-beserver.png" alt="Verdicto product" />
            </div>
          </CometCard>

          {/* Spendora — bottom right */}
          <CometCard wrapperClassName="project-card--tumbler" className="project-card" href="https://spendora-wallet.vercel.app/" target="_blank" rel="noopener noreferrer">
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
          </CometCard>
        </div>
      </div>
    </section>
  )
}
