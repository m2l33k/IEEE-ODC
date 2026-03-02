import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

type Theme = 'dark' | 'light'

const NAV_SECTIONS = [
  { label: 'KPIs & Impact', id: 'kpis' },
  { label: 'Events & Gallery', id: 'gallery' },
  { label: 'Support & Vouchers', id: 'support' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Teams', id: 'teams' },
]

export function PublicLayout() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isCatalogue = location.pathname === '/catalogue'

  /* Persist & init theme */
  useEffect(() => {
    const stored = window.localStorage.getItem('ieee_odc_theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      document.documentElement.dataset.theme = stored
    } else {
      document.documentElement.dataset.theme = 'dark'
    }
  }, [])

  /* Scroll-shadow effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToSection(id: string) {
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('ieee_odc_theme', next)
  }

  return (
    <div className="layout-root">
      <header ref={headerRef} className={`public-header${scrolled ? ' public-header--scrolled' : ''}`}>
        <div className="public-header-inner">
          <div className="public-nav-shell">

            {/* ── Logo ── */}
            <Link to="/" className="public-logo" aria-label="Home">
              <div className="public-logo-mark">
                <img src="/OIP-1215431747.jpg" alt="IEEE" className="public-logo-image" />
                <span className="public-logo-separator">×</span>
                <img src="/ODC-RGB-black-Orange-4057230769.png" alt="ODC" className="public-logo-image" />
              </div>
              <div className="public-logo-text">
                <span className="public-logo-label">Strategic partnership</span>
                <span className="public-logo-sub">IEEE / ODC</span>
              </div>
            </Link>

            {/* ── Divider ── */}
            <span className="public-nav-divider" aria-hidden />

            {/* ── Section links ── */}
            <nav className="public-nav" aria-label="Main navigation">
              {NAV_SECTIONS.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  id={`nav-${id}`}
                  className="public-nav-link"
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </button>
              ))}

              {/* Catalogue page link */}
              <Link
                to="/catalogue"
                id="nav-catalogue"
                className={`public-nav-link public-nav-link--page${isCatalogue ? ' public-nav-link--active' : ''}`}
              >
                Formations
              </Link>
            </nav>

            {/* ── Divider ── */}
            <span className="public-nav-divider" aria-hidden />

            {/* ── Actions ── */}
            <div className="public-header-actions">
              <button
                type="button"
                id="theme-toggle"
                className="btn btn-ghost theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>

              <Link to="/vouchers/claim" id="nav-claim-voucher" className="btn btn-primary">
                Claim Voucher
              </Link>
            </div>

          </div>
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="public-footer-inner">
          <span>© IEEE / ODC Partnership</span>
          <span className="public-footer-location">2023–2026</span>
        </div>
      </footer>
    </div>
  )
}
