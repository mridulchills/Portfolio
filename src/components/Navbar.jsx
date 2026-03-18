import { useState, useEffect } from 'react'

const LogoIcon = () => (
  <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })

    // trigger animation entry
    const t = setTimeout(() => setLoaded(true), 100)

    // track section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }, { threshold: 0.5 })

      ;['about', 'portfolio', 'blog'].forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t)
      observer.disconnect()
    }
  }, [])

  const handleNav = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#about" className={`nav-logo nav-reveal ${loaded ? 'loaded' : ''}`} style={{ transitionDelay: '0ms' }} onClick={handleNav('about')}>
        <LogoIcon />
      </a>
      <ul className="nav-links">
        <li className={`nav-reveal ${loaded ? 'loaded' : ''}`} style={{ transitionDelay: '100ms' }}>
          <a href="#about" onClick={handleNav('about')} className={active === 'about' ? 'active' : ''}>About</a>
        </li>
        <li className={`nav-reveal ${loaded ? 'loaded' : ''}`} style={{ transitionDelay: '200ms' }}>
          <span className="nav-sep">/</span>
        </li>
        <li className={`nav-reveal ${loaded ? 'loaded' : ''}`} style={{ transitionDelay: '300ms' }}>
          <a href="#portfolio" onClick={handleNav('portfolio')} className={active === 'portfolio' ? 'active' : ''}>Works</a>
        </li>
        <li className={`nav-reveal ${loaded ? 'loaded' : ''}`} style={{ transitionDelay: '400ms', marginLeft: 24 }}>
          <a href="#blog" onClick={handleNav('blog')} className={active === 'blog' ? 'active' : ''}>CP</a>
        </li>
      </ul>
    </nav>
  )
}
