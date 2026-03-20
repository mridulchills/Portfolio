import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let hasIntersected = false

    const revealItems = (items) => {
      items.forEach((item, i) => {
        if (item.classList.contains('visible')) return
        setTimeout(() => {
          item.classList.add('visible')
        }, i * (options.stagger || 120))
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasIntersected = true
            const items = Array.from(entry.target.querySelectorAll('.reveal:not(.visible)'))
            revealItems(items)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: options.threshold || 0.1 }
    )

    observer.observe(el)

    const mutObserver = new MutationObserver(() => {
      // If the parent section was already intersected, OR it's currently in the viewport, reveal new children
      const rect = el.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (hasIntersected || inViewport) {
        hasIntersected = true
        const items = Array.from(el.querySelectorAll('.reveal:not(.visible)'))
        revealItems(items)
      }
    })

    mutObserver.observe(el, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutObserver.disconnect()
    }
  }, [options.stagger, options.threshold])

  return ref
}
