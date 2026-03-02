import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

type Theme = 'dark' | 'light'

const NAV_SECTIONS = [
  { label: 'Impact', id: 'kpis' },
  { label: 'Events', id: 'gallery' },
  { label: 'Support', id: 'support' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Teams', id: 'teams' },
]

// Scroll back-to-top hook
function useScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible
}

export function PublicLayout() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobile] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isCatalogue = location.pathname === '/catalogue'
  const showBackTop = useScrollTop()

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

  /* Scroll-shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => { setMobile(false) }, [location.pathname])

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function scrollToSection(id: string) {
    setMobile(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 180)
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
      {/* ── SEO & meta (applied per layout, pages override via useEffect) ── */}
      <header ref={headerRef} className={`public-header${scrolled ? ' public-header--scrolled' : ''}`}>
        <div className="public-header-inner">
          <div className="public-nav-shell">

            {/* Logo */}
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

            <span className="public-nav-divider public-nav-divider--desktop" aria-hidden />

            {/* Desktop nav links */}
            <nav className="public-nav public-nav--desktop" aria-label="Main navigation">
              {NAV_SECTIONS.map(({ label, id }) => (
                <button key={id} type="button" id={`nav-${id}`} className="public-nav-link"
                  onClick={() => scrollToSection(id)}>
                  {label}
                </button>
              ))}
              <Link to="/catalogue" id="nav-catalogue"
                className={`public-nav-link public-nav-link--page${isCatalogue ? ' public-nav-link--active' : ''}`}>
                Formations
              </Link>
            </nav>

            <span className="public-nav-divider public-nav-divider--desktop" aria-hidden />

            {/* Desktop actions */}
            <div className="public-header-actions public-header-actions--desktop">
              <button type="button" id="theme-toggle" className="btn btn-ghost theme-toggle"
                onClick={toggleTheme} aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
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

            {/* Mobile: theme + hamburger */}
            <div className="public-header-actions public-header-actions--mobile">
              <button type="button" className="btn btn-ghost theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                )}
              </button>
              <button
                type="button"
                id="nav-hamburger"
                className={`pub-hamburger${mobileOpen ? ' pub-hamburger--open' : ''}`}
                onClick={() => setMobile(v => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <span /><span /><span />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="pub-mobile-overlay" onClick={() => setMobile(false)} aria-hidden />
      )}
      <div className={`pub-mobile-drawer${mobileOpen ? ' pub-mobile-drawer--open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <div className="pub-mobile-drawer-header">
          <div className="pub-mobile-logo">
            <img src="/OIP-1215431747.jpg" alt="IEEE" className="pub-mobile-logo-img" />
            <span className="pub-mobile-logo-sep">×</span>
            <img src="/ODC-RGB-black-Orange-4057230769.png" alt="ODC" className="pub-mobile-logo-img pub-mobile-logo-img--odc" />
          </div>
          <button type="button" className="pub-mobile-close" onClick={() => setMobile(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="pub-mobile-nav" aria-label="Mobile navigation">
          {NAV_SECTIONS.map(({ label, id }) => (
            <button key={id} type="button" className="pub-mobile-link"
              onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
          <Link to="/catalogue" className="pub-mobile-link" onClick={() => setMobile(false)}>
            Formations
          </Link>
        </nav>

        <div className="pub-mobile-footer">
          <Link to="/vouchers/claim" className="btn btn-primary pub-mobile-cta" onClick={() => setMobile(false)}>
            Claim Voucher
          </Link>
        </div>
      </div>

      <main className="layout-main">
        <Outlet />
      </main>

      {/* ── Back to top button ── */}
      <button
        type="button"
        id="back-to-top"
        className={`pub-back-top${showBackTop ? ' pub-back-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}
