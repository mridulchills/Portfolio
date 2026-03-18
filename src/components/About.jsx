import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'

const CodeIcon = () => (
  <svg className="service-icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="10 8 4 14 10 20"></polyline>
    <polyline points="18 8 24 14 18 20"></polyline>
    <line x1="16" y1="4" x2="12" y2="24"></line>
  </svg>
)

const TrophyIcon = () => (
  <svg className="service-icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h20v6a10 10 0 0 1-20 0V6z"/>
    <path d="M10 22h8"/>
    <path d="M14 16v6"/>
    <path d="M4 6V4h20v2"/>
  </svg>
)

const BrainIcon = () => (
  <svg className="service-icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2c-3 0-6 2-7 5s1 6 1 6-2 3-1 6 5 4 7 4 5-1 6-4-1-6-1-6 2-3 1-6-4-5-6-5z"/>
    <circle cx="14" cy="14" r="3"/>
    <path d="M14 17v4"/>
    <path d="M14 7v4"/>
    <path d="M11 14H7"/>
    <path d="M21 14h-4"/>
  </svg>
)

export default function About() {
  const sectionRef = useScrollReveal({ stagger: 120 })
  const { count: problems, ref: problemsRef } = useCountUp(500)

  return (
    <section id="about" ref={sectionRef}>
      {/* Top two-column text block */}
      <div className="about-top">
        {/* Left */}
        <div>
          <div className="section-label reveal">
            <span className="dash">—</span>
            <span className="word">About</span>
          </div>
          <h2 className="display-heading reveal">
            Building things that<br />matter, one commit at a time.
          </h2>
          <p className="about-body-text reveal">
            Undergraduate ISE student at Nitte Meenakshi Institute of Technology. 
            CGPA 9.21 across 5 semesters. Passionate about building real products and 
            solving hard algorithmic problems.
          </p>
          <a href="mailto:mridultiwari1708@gmail.com" className="yellow-link reveal">
            mridultiwari1708@gmail.com <span className="arr">→</span>
          </a>
        </div>

        {/* Right */}
        <div>
          <p className="about-quote reveal">
            "The best way to predict the future is to build it. I'd rather ship something imperfect than perfect nothing."
          </p>
          <p className="about-body-text reveal">
            Currently interning at Incerto Technologies, building observability features used daily by real clients. I love solving hard problems — both in production and on the leaderboard.
          </p>
          <div className="about-stats reveal">
            <div className="stat-block">
              <span className="stat-number">9.21</span>
              <span className="stat-label">CGPA —<br />NMIT, ISE</span>
            </div>
            <div className="stat-block" ref={problemsRef}>
              <span className="stat-number">{problems}+</span>
              <span className="stat-label">Problems<br />Solved, CF &amp; LC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="service-cards reveal">
        <div className="service-card service-card--active">
          <CodeIcon />
          <div>
            <div className="service-card-title">Full Stack<br />Dev.</div>
            <div className="service-card-count">React, FastAPI, SQL</div>
          </div>
        </div>
        <div className="service-card service-card--inactive">
          <TrophyIcon />
          <div>
            <div className="service-card-title">Competitive<br />Prog.</div>
            <div className="service-card-count">Candidate Master, CF</div>
          </div>
        </div>
        <div className="service-card service-card--inactive">
          <BrainIcon />
          <div>
            <div className="service-card-title">AI<br />Systems.</div>
            <div className="service-card-count">3 Projects Built</div>
          </div>
        </div>
      </div>

      {/* Experience Block */}
      <div className="reveal" style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}>
          Frontend Developer Intern · Incerto Technologies · Jun–Aug 2025 · Bengaluru
        </p>
      </div>
    </section>
  )
}
