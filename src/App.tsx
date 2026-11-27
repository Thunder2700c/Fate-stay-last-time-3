import { useEffect, useRef } from 'react'

function RiftScene() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const probe = document.createElement('canvas')
    const canUseWebGL = Boolean(window.WebGLRenderingContext && (probe.getContext('webgl2') || probe.getContext('webgl')))
    if (reducedMotion.matches || !canUseWebGL || !('IntersectionObserver' in window)) return

    let dispose: (() => void) | undefined
    let cancelled = false
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      import('./scene/BrandArtifact')
        .then(({ mountBrandArtifact }) => {
          if (!cancelled) dispose = mountBrandArtifact(element)
        })
        .catch(() => element.classList.remove('is-rendered'))
    }, { rootMargin: '120px' })

    observer.observe(element)
    return () => {
      cancelled = true
      observer.disconnect()
      dispose?.()
    }
  }, [])

  return (
    <div className="rift-scene" aria-hidden="true">
      <div className="rift-aura" />
      <div className="rift-fallback">
        <span className="fallback-shard shard-one" />
        <span className="fallback-shard shard-two" />
        <span className="fallback-shard shard-three" />
      </div>
      <div className="rift-canvas" ref={host} />
      <div className="scene-coordinate scene-coordinate-top">F / SLT <span>—</span> 001</div>
      <div className="scene-coordinate scene-coordinate-bottom">ANOTHER POSSIBILITY</div>
    </div>
  )
}

function App() {
  return (
    <main className="gateway">
      <div className="gateway-grid" aria-hidden="true" />
      <div className="gateway-grain" aria-hidden="true" />
      <header className="gateway-header">
        <a className="gateway-mark" href="/" aria-label="Fate Stay Last Time home">
          <span className="mark-symbol">F<span>/</span>SLT</span>
          <span className="mark-caption">AN ALTERNATE FATE UNIVERSE</span>
        </a>
        <div className="header-note">
          <span className="live-dot" />
          <span>UNOFFICIAL FAN PROJECT</span>
        </div>
      </header>

      <section className="gateway-hero" aria-labelledby="brand-title">
        <RiftScene />
        <div className="hero-copy">
          <p className="hero-eyebrow"><span>01</span> THE STORY BEGINS ELSEWHERE</p>
          <h1 id="brand-title">
            <span className="title-fate">FATE</span>
            <span className="title-stay">STAY LAST</span>
            <span className="title-time">TIME<span className="title-mark">.</span></span>
          </h1>
          <div className="hero-description">
            <span className="description-line" />
            <p>A fan-created story, set in a different Fate universe.</p>
          </div>
          <div className="hero-footnote">
            <span>FAN-MADE FICTION</span>
            <span className="footnote-divider" />
            <span>AN UNOFFICIAL PROJECT</span>
          </div>
        </div>
        <div className="hero-side-label">FATE / STAY LAST TIME</div>
        <div className="hero-scroll-mark" aria-hidden="true"><span /></div>
      </section>

      <footer className="gateway-footer">
        <span>F / SLT</span>
        <span>NOT AFFILIATED WITH TYPE-MOON</span>
        <span>EST. 2026</span>
      </footer>
    </main>
  )
}

export default App
