import { motion } from 'framer-motion'

const skillImages = [
  '/skills/html.png',
  '/skills/css.png',
  '/skills/cpp.png',
  '/skills/maths.png',
  '/skills/cp.png',
  '/skills/react.png',
  '/skills/js.png',
  '/skills/linux.png',
  '/skills/problem-solving.png',
  '/skills/os.png',
  '/skills/dbms.png',
  '/skills/cn.png',
  '/skills/shell.png',
  '/skills/algo.png',
]

// Repeat 6 times for continuous infinity scroll illusion
const allImages = Array(6).fill(skillImages).flat()

export default function SkillsMarquee() {
  const chunkSize = Math.floor(allImages.length / 4)
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    // force all chunks to identical length
    return allImages.slice(start, start + chunkSize)
  })

  return (
    <div className="skills-marquee-outer">
      <div className="skills-marquee-viewport">
        <div className="skills-marquee-stage">
          <div className="skills-marquee-grid">
            {chunks.map((col, colIndex) => (
              <motion.div
                key={colIndex}
                className="skills-marquee-col"
                animate={{ y: colIndex % 2 === 0 ? [0, -1000] : [-1000, 0] }}
                transition={{
                  duration: colIndex % 2 === 0 ? 30 : 35,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
              >
                <div className="skills-marquee-gridline-v" />
                {col.map((img, imgIndex) => (
                  <div className="skills-marquee-card" key={imgIndex + img}>
                    <div className="skills-marquee-gridline-h" />
                    <motion.img
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      src={img}
                      alt={`Skill ${imgIndex + 1}`}
                      className="skills-marquee-img"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
