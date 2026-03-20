import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimationControls } from 'framer-motion'

const yearSkills = [
  { year: '1st Year', skills: ['HTML', 'CSS', 'C++', 'Maths'] },
  { year: '2nd Year', skills: ['CP', 'React', 'JS', 'Linux', 'Problem Solving'] },
  { year: '3rd Year', skills: ['OS', 'DBMS', 'CN', 'Shell', 'Algo Thinking'] },
]

const TOTAL_DURATION = 8 // seconds for truck to traverse

function TruckSVG() {
  return (
    <svg viewBox="0 0 120 50" fill="none" className="skills-truck-svg">
      {/* Truck body */}
      <rect x="30" y="10" width="60" height="28" rx="4" fill="#f5c01a" />
      {/* Carrier / cargo area */}
      <rect x="32" y="12" width="56" height="16" rx="2" fill="#252535" opacity="0.85" />
      {/* Cabin */}
      <rect x="88" y="16" width="26" height="22" rx="4" fill="#d4a814" />
      {/* Cabin window */}
      <rect x="92" y="19" width="14" height="10" rx="2" fill="#252535" opacity="0.6" />
      {/* Wheels */}
      <circle cx="48" cy="42" r="7" fill="#333" stroke="#555" strokeWidth="2" />
      <circle cx="48" cy="42" r="3" fill="#888" />
      <circle cx="98" cy="42" r="7" fill="#333" stroke="#555" strokeWidth="2" />
      <circle cx="98" cy="42" r="3" fill="#888" />
      {/* Exhaust */}
      <rect x="30" y="32" width="3" height="8" rx="1" fill="#777" />
    </svg>
  )
}

export default function SkillsTimeline({ onComplete }) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0.75, once: true })
  const truckControls = useAnimationControls()
  const [animationPhase, setAnimationPhase] = useState('waiting') // waiting | driving | minimizing | done
  const [visibleSkills, setVisibleSkills] = useState([[], [], []])
  const [currentYear, setCurrentYear] = useState(-1)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (!isInView || animationPhase !== 'waiting') return

    setAnimationPhase('driving')

    // Phase timings: truck stops at each year mark
    const yearPositions = [22, 50, 78] // % positions for each year on the axis
    const pauseAtYear = 1200 // ms pause at each year to load skills
    const driveTime = 1800 // ms to drive between stops

    let elapsed = 0

    const runSequence = async () => {
      for (let i = 0; i < 3; i++) {
        // Drive to year mark
        await truckControls.start({
          left: `${yearPositions[i]}%`,
          transition: { duration: driveTime / 1000, ease: 'easeInOut' }
        })

        setCurrentYear(i)

        // Load skills one by one
        for (let j = 0; j < yearSkills[i].skills.length; j++) {
          await new Promise(r => setTimeout(r, 200))
          setVisibleSkills(prev => {
            const next = [...prev]
            next[i] = [...next[i], yearSkills[i].skills[j]]
            return next
          })
        }

        // Pause at year mark
        await new Promise(r => setTimeout(r, pauseAtYear - yearSkills[i].skills.length * 200))
      }

      // Drive to end
      await truckControls.start({
        left: '95%',
        transition: { duration: 0.8, ease: 'easeOut' }
      })

      // Signal completion early so the marquee starts transitioning in precisely as the timeline minimizes
      if (onComplete) onComplete()

      // Start minimizing immediately
      setAnimationPhase('minimizing')
      setIsMinimized(true)

      // Mark done later, which adds the absolute class
      await new Promise(r => setTimeout(r, 600))
      setAnimationPhase('done')
    }

    runSequence()
  }, [isInView])

  return (
    <motion.div
      ref={containerRef}
      className={`skills-timeline ${isMinimized ? 'skills-timeline--minimized' : ''} ${animationPhase === 'done' ? 'skills-timeline--done' : ''}`}
      layout
    >
      {/* Year markers */}
      <div className="skills-axis">
        <div className="skills-axis-line" />
        {yearSkills.map((ys, i) => (
          <div
            key={ys.year}
            className={`skills-axis-marker ${currentYear >= i ? 'skills-axis-marker--active' : ''}`}
            style={{ left: `${22 + i * 28}%` }}
          >
            <div className="skills-axis-dot" />
            <span className="skills-axis-label">{ys.year}</span>

            {/* Skill tags floating above */}
            <div className="skills-tags-container">
              {visibleSkills[i].map((skill, j) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, type: 'spring', stiffness: 300 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}

        {/* Truck */}
        <motion.div
          className="skills-truck"
          initial={{ left: '2%' }}
          animate={truckControls}
        >
          <TruckSVG />
          {/* Smoke particles while driving */}
          {animationPhase === 'driving' && (
            <div className="truck-smoke">
              <span /><span /><span />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
