import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  const sectionRef = useScrollReveal({ stagger: 120 })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/mridultiwari1708@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            message: data.get('message')
        })
      })
      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch(err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-layout">
        {/* Left */}
        <div>
          <div className="section-label reveal">
            <span className="dash">—</span>
            <span className="word">Contact</span>
          </div>
          <h2 className="display-heading reveal" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            Got an opportunity?<br />Let's talk.
          </h2>
          <p className="about-body-text reveal">
            Open to internships, collaborations, and interesting problems. Based in Bengaluru, India.
          </p>
          <a href="mailto:mridultiwari1708@gmail.com" className="yellow-link reveal">
            mridultiwari1708@gmail.com <span className="arr">→</span>
          </a>
        </div>

        {/* Right — Form */}
        <div>
          <h3 className="contact-form-heading reveal">
            Send me a message.<br />I read every one.
          </h3>
          {status === 'success' ? (
            <div className="reveal" style={{ textAlign: 'center', padding: '40px 0', opacity: 0, animation: 'fadeIn 0.5s forwards' }}>
              <div style={{ color: '#f5c01a', fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <p style={{ color: '#fff', fontSize: '16px', fontFamily: 'var(--font-body)' }}>Message sent. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-field reveal">
                <input type="text" id="name" name="name" placeholder="What's your name?" autoComplete="name" required />
              </div>
              <div className="form-field reveal">
                <input type="email" id="email" name="email" placeholder="Your fancy email" autoComplete="email" required />
              </div>
              <div className="form-field reveal">
                <textarea id="message" name="message" rows={4} placeholder="Tell me what's on your mind" required />
              </div>
              <div className="form-actions reveal">
                {/*<span className="attach-icon" title="Attach file">📎</span>*/}
                <button type="submit" className="submit-btn" aria-label="Submit" disabled={status === 'sending'}>
                  {status === 'sending' ? '...' : '→'}
                </button>
              </div>
              {status === 'error' && <p style={{ color: 'red', marginTop: '10px' }}>Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
