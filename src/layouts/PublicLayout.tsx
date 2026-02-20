import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

type Theme = 'dark' | 'light'

export function PublicLayout() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem('ieee_odc_theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      document.documentElement.dataset.theme = stored
    } else {
      document.documentElement.dataset.theme = 'dark'
    }
  }, [])

  function scrollToSection(id: string) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      <header className="public-header">
        <div className="public-header-inner">
          <div className="public-nav-shell">
            <Link to="/" className="public-logo">
              <div className="public-logo-mark">
                <img
                  src="/OIP-1215431747.jpg"
                  alt="IEEE"
                  className="public-logo-image"
                />
                <span className="public-logo-separator">×</span>
                <img
                  src="/ODC-RGB-black-Orange-4057230769.png"
                  alt="ODC"
                  className="public-logo-image"
                />
              </div>
              <div className="public-logo-text">
                <span className="public-logo-label">Strategic partnership</span>
                <span className="public-logo-sub">IEEE / ODC</span>
              </div>
            </Link>
            <nav className="public-nav">
              <button
                type="button"
                className="public-nav-link"
                onClick={() => scrollToSection('kpis')}
              >
                KPIs & Impact
              </button>
              <button
                type="button"
                className="public-nav-link"
                onClick={() => scrollToSection('gallery')}
              >
                Events & Gallery
              </button>
              <button
                type="button"
                className="public-nav-link"
                onClick={() => scrollToSection('support')}
              >
                Support & Vouchers
              </button>
              <button
                type="button"
                className="public-nav-link"
                onClick={() => scrollToSection('faq')}
              >
                FAQ
              </button>
              <button
                type="button"
                className="public-nav-link"
                onClick={() => scrollToSection('teams')}
              >
                Teams
              </button>
            </nav>
            <div className="public-header-actions">
              <button
                type="button"
                className="btn btn-ghost theme-toggle"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? 'Light mode ☀️' : 'Dark mode 🌙'}
              </button>
              <Link to="/vouchers/claim" className="btn btn-primary">
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
