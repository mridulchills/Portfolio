import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.querySelectorAll('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = Array.from(entry.target.querySelectorAll('.reveal'))
            items.forEach((item, i) => {
              setTimeout(() => {
                item.classList.add('visible')
              }, i * (options.stagger || 120))
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: options.threshold || 0.1 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}
