import { useEffect, useRef } from 'react'

function BrandArtifact() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const probe = document.createElement('canvas')
    const canUseWebGL = Boolean(
      window.WebGLRenderingContext &&
      (probe.getContext('webgl2') || probe.getContext('webgl')),
    )
    if (reducedMotion.matches || !canUseWebGL || !('IntersectionObserver' in window)) return

    let dispose: (() => void) | undefined
    let cancelled = false
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      requestAnimationFrame(() => {
        if (cancelled) return
        import('./scene/BrandArtifact')
          .then(({ mountBrandArtifact }) => {
            if (cancelled) return
            dispose = mountBrandArtifact(element)
          })
          .catch(() => {
            element.classList.remove('is-rendered')
          })
      })
    }, { rootMargin: '120px' })

    observer.observe(element)
    return () => {
      cancelled = true
      observer.disconnect()
      dispose?.()
    }
  }, [])

  return (
    <div className="artifact-stage" aria-hidden="true">
      <div className="artifact-halo" />
      <div className="artifact-poster">
        <span className="poster-ring" />
        <span className="poster-seam" />
      </div>
      <div className="artifact-host" ref={host} />
      <div className="artifact-coordinate coordinate-top">FIG. 01 <i /> THE UNFINISHED FORM</div>
      <div className="artifact-coordinate coordinate-bottom">F / SLT <i /> 01—∞</div>
    </div>
  )
}

function App() {
  return (
    <main className="gateway">
      <header className="gateway-header">
        <a className="gateway-mark" href="/" aria-label="Fate Stay Last Time home">
          <span>F<span className="mark-slash">/</span>SLT</span>
          <small>AN ALTERNATE FATE UNIVERSE</small>
        </a>
        <div className="header-edition">
          <span className="edition-dot" />
          <span>AN UNOFFICIAL FAN STORY</span>
          <span className="edition-number">001 / ∞</span>
        </div>
      </header>

      <section className="gateway-hero" aria-labelledby="brand-title">
        <div className="gateway-copy">
          <p className="gateway-kicker"><span>01</span> A DIFFERENT FATE UNIVERSE</p>
          <h1 id="brand-title">
            <span className="title-line title-fate">FATE</span>
            <span className="title-line title-stay">STAY LAST</span>
            <span className="title-line title-time">TIME<span className="title-period">.</span></span>
          </h1>
          <div className="gateway-description">
            <span className="description-rule" />
            <p>A fan-created story, set in a different Fate universe.</p>
          </div>
        </div>

        <BrandArtifact />

        <div className="gateway-side-note">
          <span>ANOTHER POSSIBILITY</span>
          <span className="side-note-line" />
          <span>ANOTHER UNIVERSE</span>
        </div>
      </section>

      <footer className="gateway-footer">
        <span>FATE / STAY LAST TIME</span>
        <span className="footer-center">A FAN-MADE FICTION PROJECT</span>
        <span>EST. 2026 <i /> THE BEGINNING</span>
      </footer>
    </main>
  )
}

export default App
