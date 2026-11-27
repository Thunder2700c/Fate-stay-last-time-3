import { useEffect, useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="site" id="page1">
      <header className="header">
        <a className="logo" href="#page1" onClick={closeMenu} aria-label="Fate / Stay Last Time home">
          <span className="logo-mark">F<span>/</span>SLT</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#page1">Home</a>
          <a href="#project">The project</a>
        </nav>

        <div className="header-side">
          <span className="project-label">Unofficial fan story</span>
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <i aria-hidden="true"><b /><b /></i>
          </button>
        </div>
      </header>

      <section className="home" aria-labelledby="home-title">
        <img
          className="home-artwork"
          src="/images/fate-stay-last-time.png"
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        <div className="artwork-shade" aria-hidden="true" />
        <div className="artwork-grain" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-heading" id="project">
            <p className="eyebrow"><span /> An alternate Fate universe</p>
            <h1 id="home-title">
              <span className="title-first">Fate</span>
              <span className="title-second">Stay Last Time</span>
            </h1>
          </div>

          <div className="hero-bottom">
            <p>A fan-created story, set in a different Fate universe.</p>
            <a className="back-to-top" href="#page1" aria-label="Back to top">
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <div className={`mobile-menu ${menuOpen ? 'is-visible' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <a href="#page1" onClick={closeMenu}>Home <span>01</span></a>
          <a href="#project" onClick={closeMenu}>The project <span>02</span></a>
        </nav>
        <p>Fate / Stay Last Time · Unofficial fan story</p>
      </div>
    </main>
  )
}

export default App
