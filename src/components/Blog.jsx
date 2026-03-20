import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SkillsTimeline from './SkillsTimeline'
import SkillsMarquee from './SkillsMarquee'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

const cmThresholdPlugin = {
  id: 'cmThreshold',
  beforeDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales.y) return;
    const yVal = scales.y.getPixelForValue(1900);
    if (yVal > chartArea.bottom || yVal < chartArea.top) return;
    
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(245, 192, 26, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.moveTo(chartArea.left, yVal);
    ctx.lineTo(chartArea.right, yVal);
    ctx.stroke();
    
    ctx.fillStyle = '#f5c01a';
    ctx.font = '9px Arial';
    ctx.fillText('CM', chartArea.left, yVal - 4);
    ctx.restore();
  }
}

function getGradient(ctx, chartArea) {
  let gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
  gradient.addColorStop(0, 'rgba(245, 192, 26, 0.15)')
  gradient.addColorStop(1, 'rgba(245, 192, 26, 0)')
  return gradient
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
}

export default function Blog() {
  const sectionRef = useScrollReveal({ stagger: 110 })
  
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [ratings, setRatings] = useState([])
  const [stats, setStats] = useState({ total: 0, today: 0 })
  const [truckDone, setTruckDone] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const handle = 'BoomTiwari';
        
        // Timeout wrapper
        const fetchWithTimeout = (url, ms = 5000) => {
          return Promise.race([
            fetch(url),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
          ]);
        };
        
        const [infoRes, ratingRes, statusRes] = await Promise.all([
          fetchWithTimeout(`https://codeforces.com/api/user.info?handles=${handle}`),
          fetchWithTimeout(`https://codeforces.com/api/user.rating?handle=${handle}`),
          fetchWithTimeout(`https://codeforces.com/api/user.status?handle=${handle}`)
        ])
        
        if (!infoRes.ok || !ratingRes.ok || !statusRes.ok) throw new Error('API failed')
        
        const infoData = await infoRes.json()
        const ratingData = await ratingRes.json()
        const statusData = await statusRes.json()
        
        if (infoData.status !== 'OK' || ratingData.status !== 'OK') throw new Error('API return not OK')
        
        if (isMounted) {
          setProfile(infoData.result[0])
          setRatings(ratingData.result)
          
          let solvedTotal = 0
          let solvedToday = 0
          if (statusData.status === 'OK') {
            const solvedNames = new Set()
            const todayStart = new Date().setHours(0,0,0,0) / 1000
            
            statusData.result.forEach(sub => {
              if (sub.verdict === 'OK') {
                const id = sub.problem.contestId + '-' + sub.problem.name
                if (!solvedNames.has(id)) {
                  solvedNames.add(id)
                  if (sub.creationTimeSeconds >= todayStart) {
                    solvedToday++
                  }
                }
              }
            })
            solvedTotal = solvedNames.size
          }
          setStats({ total: solvedTotal, today: solvedToday })
          
          setLoading(false)
        }
        
      } catch (err) {
        // Fallback state on error
        if (isMounted) {
          setProfile({
            rank: 'candidate master',
            rating: 1912,
            maxRank: 'candidate master',
            maxRating: 1967
          })
          const fakeData = []
          let curr = 1200
          for(let i = 0; i < 20; i++){
            curr += Math.random()*150 - 50
            if (i === 15) curr = 1967 // max
            if (i === 19) curr = 1912 // current
            fakeData.push({ contestName: `Codeforces Round ${i+500}`, newRating: Math.round(curr) })
          }
          setRatings(fakeData)
          setStats({ total: 495, today: 3 })
          setLoading(false)
        }
      }
    }
    
    fetchData()
    return () => { isMounted = false }
  }, [])

  const currentRank = profile ? `${capitalize(profile.rank)} — ${profile.rating}` : ''
  const maxRank = profile ? `${capitalize(profile.maxRank)} — ${profile.maxRating}` : ''

  const chartData = {
    labels: ratings.map((r, i) => r.contestName),
    datasets: [
      {
        label: 'Rating',
        data: ratings.map(r => r.newRating),
        borderColor: '#f5c01a',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null
          return getGradient(ctx, chartArea)
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: true,
        tension: 0.1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1e28',
        titleFont: { size: 12, weight: 'normal' },
        bodyFont: { size: 13, weight: 'bold' },
        bodyColor: '#f5c01a',
        displayColors: false,
        padding: { top: 6, bottom: 6, left: 10, right: 10 },
        callbacks: {
          title: (items) => {
            const name = items[0].label || ''
            return name.length > 28 ? name.substring(0, 25) + '...' : name
          },
          label: (item) => item.raw
        }
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        // dynamic min to allow lower ratings without breaking view,
        // but showing 1200 upwards is good.
        border: { display: false },
        grid: {
          color: 'rgba(255,255,255,0.04)',
          drawTicks: false
        },
        ticks: {
          color: '#555570',
          font: { size: 10 },
          stepSize: 200,
          padding: 10
        }
      }
    }
  }

  return (
    <section id="blog" ref={sectionRef}>
      {/* ===== SKILLS SECTION ===== */}
      <div className="skills-section">
        <div className="skills-header">
          <div className="section-label reveal">
            <span className="dash">—</span>
            <span className="word">Skills</span>
          </div>
          <h2 className="display-heading reveal">
            Skills I've built,<br />year by year.
          </h2>
        </div>

        <SkillsTimeline onComplete={() => setTruckDone(true)} />

        <AnimatePresence>
          {truckDone && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillsMarquee />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== COMPETITIVE PROGRAMMING ===== */}
      {/* Header + List */}
      <div className="blog-layout">
        <div>
          <div className="section-label reveal">
            <span className="dash">—</span>
            <span className="word">Competitive Programming</span>
          </div>
          <h2 className="display-heading reveal">
            Solving hard problems,<br />every day.
          </h2>
          
          <div className="reveal" style={{ marginTop: '30px', display: 'flex', gap: '40px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>
                {loading ? <span style={{opacity: 0.5}}>...</span> : stats.total}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>Total Solved</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>
                {loading ? <span style={{opacity: 0.5}}>...</span> : stats.today}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '6px' }}>Solved Today</div>
            </div>
          </div>
        </div>
        <div className="blog-list">
          {loading ? (
             <>
               <div className="blog-item reveal" style={{ transitionDelay: '0ms' }}>
                 <div className="shimmer-bar" style={{ width: '100%' }}></div>
               </div>
               <div className="blog-item reveal" style={{ transitionDelay: '100ms' }}>
                 <div className="shimmer-bar" style={{ width: '100%' }}></div>
               </div>
               <div className="blog-item reveal" style={{ transitionDelay: '200ms' }}>
                 <div className="shimmer-bar" style={{ width: '100%' }}></div>
               </div>
             </>
          ) : (
             [...ratings].reverse().slice(0, 3).map((contest, index) => {
               const isUp = contest.newRating > contest.oldRating;
               const diff = Math.abs(contest.newRating - contest.oldRating);
               const diffStr = isUp ? `+${diff}` : `-${diff}`;
               const dateStr = new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
               
               return (
                 <a key={contest.contestId} href={`https://codeforces.com/contest/${contest.contestId}`} target="_blank" rel="noopener noreferrer" className="blog-item reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                   <span className="blog-meta">Codeforces · {dateStr}</span>
                   <span className="blog-title" style={{ display: 'flex', flexDirection: 'column' }}>
                     <span style={{ fontSize: '15px' }}>{contest.contestName}</span>
                     <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
                       Rank: {contest.rank} · Rating: {contest.oldRating} <span style={{ color: isUp ? '#4ade80' : '#ef4444' }}>→ {contest.newRating}</span> ({diffStr})
                     </span>
                   </span>
                   <span className="blog-arrow">→</span>
                 </a>
               )
             })
          )}
        </div>
      </div>

      {/* Rating Graph Block */}
      <div className="reveal" style={{ width: '100%', height: '300px', position: 'relative' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#7a7a95', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Rating over time
        </p>
        <div style={{ position: 'relative', height: '100%', width: '100%', background: 'transparent' }}>
          {loading ? (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', color: '#7a7a95' }}>Fetching contest history...</span>
            </div>
          ) : (
            <Line ref={chartRef} data={chartData} options={chartOptions} plugins={[cmThresholdPlugin]} />
          )}
        </div>
      </div>
    </section>
  )
}
