import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

type Theme = 'dark' | 'light'

const NAV_SECTIONS = [
  { label: 'Impact', id: 'kpis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'Events', id: 'gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Support', id: 'support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'FAQ', id: 'faq', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Teams', id: 'teams', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
]

const PAGE_LINKS = [
  { label: 'Formations', to: '/catalogue' },
  { label: 'Gallery', to: '/gallery' },
]

/* ── Scroll progress hook ── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

/* ── Scroll back-to-top hook ── */
function useScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible
}

/* ── Active section tracking hook ── */
function useActiveSection(sectionIds: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) { setActive(null); return }
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (els.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds.join(','), enabled])
  return active
}

export function PublicLayout() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobile] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const showBackTop = useScrollTop()
  const scrollProgress = useScrollProgress()
  const activeSection = useActiveSection(
    NAV_SECTIONS.map(s => s.id),
    isHome
  )

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

  const scrollToSection = useCallback((id: string) => {
    setMobile(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 180)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [isHome, navigate])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('ieee_odc_theme', next)
  }

  function isPageActive(path: string) {
    return location.pathname === path
  }

  return (
    <div className="layout-root">
      {/* ── Scroll progress bar ── */}
      <div className="pub-scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

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

            {/* Desktop nav links — sections */}
            <nav className="public-nav public-nav--desktop" aria-label="Main navigation">
              {NAV_SECTIONS.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  id={`nav-${id}`}
                  className={`public-nav-link${activeSection === id ? ' public-nav-link--section-active' : ''}`}
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </button>
              ))}

              <span className="public-nav-divider public-nav-divider--inline" aria-hidden />

              {/* Page route links */}
              {PAGE_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  id={`nav-${label.toLowerCase()}`}
                  className={`public-nav-link public-nav-link--page${isPageActive(to) ? ' public-nav-link--active' : ''}`}
                >
                  {label}
                </Link>
              ))}
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
              <Link to="/vouchers/claim" id="nav-claim-voucher"
                className={`btn btn-primary${isPageActive('/vouchers/claim') ? ' btn-primary--current' : ''}`}>
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
      <div
        className={`pub-mobile-overlay${mobileOpen ? ' pub-mobile-overlay--visible' : ''}`}
        onClick={() => setMobile(false)}
        aria-hidden
      />
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

        <div className="pub-mobile-section-label">Sections</div>
        <nav className="pub-mobile-nav" aria-label="Mobile navigation">
          {NAV_SECTIONS.map(({ label, id, icon }, i) => (
            <button
              key={id}
              type="button"
              className={`pub-mobile-link${activeSection === id ? ' pub-mobile-link--active' : ''}`}
              onClick={() => scrollToSection(id)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18" className="pub-mobile-link-icon">
                <path d={icon} />
              </svg>
              {label}
            </button>
          ))}
        </nav>

        <div className="pub-mobile-section-label">Pages</div>
        <nav className="pub-mobile-nav pub-mobile-nav--pages" aria-label="Page navigation">
          {PAGE_LINKS.map(({ label, to }, i) => (
            <Link
              key={to}
              to={to}
              className={`pub-mobile-link${isPageActive(to) ? ' pub-mobile-link--active' : ''}`}
              onClick={() => setMobile(false)}
              style={{ animationDelay: `${(NAV_SECTIONS.length + i) * 50}ms` }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18" className="pub-mobile-link-icon">
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {label}
            </Link>
          ))}
        </nav>

        <div className="pub-mobile-footer">
          <Link to="/vouchers/claim" className="btn btn-primary pub-mobile-cta" onClick={() => setMobile(false)}>
            Claim Voucher
          </Link>
          <Link to="/vouchers/status" className="pub-mobile-status-link" onClick={() => setMobile(false)}>
            Check voucher status
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
