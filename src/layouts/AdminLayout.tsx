import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'

type Theme = 'dark' | 'light'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', end: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/admin/teams', label: 'Teams', end: false, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { to: '/admin/kpis', label: 'KPIs', end: false, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { to: '/admin/faqs', label: 'FAQs', end: false, icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/admin/gallery', label: 'Gallery', end: false, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { to: '/admin/vouchers', label: 'Voucher Claims', end: false, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
]

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/teams': 'Teams',
  '/admin/kpis': 'KPIs & Metrics',
  '/admin/faqs': 'FAQs',
  '/admin/gallery': 'Gallery',
  '/admin/vouchers': 'Voucher Claims',
}

export function AdminLayout() {
  const { pathname } = useLocation()
  const pageTitle = PAGE_TITLES[pathname] ?? 'Admin'
  const [sidebarOpen, setSidebar] = useState(true)
  const [profileOpen, setProfile] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = window.localStorage.getItem('ieee_odc_theme')
    return (stored === 'light' || stored === 'dark') ? stored : 'dark'
  })
  const [notifCount] = useState(3)
  const [msgCount] = useState(5)

  /* Close profile dropdown when clicking outside */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfile(false)
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [profileOpen])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('ieee_odc_theme', next)
  }

  return (
    <div className={`adm-layout${sidebarOpen ? '' : ' adm-layout--hidden'}`}>

      {/* ── Sidebar ── */}
      <aside className={`adm-sidebar${sidebarOpen ? '' : ' adm-sidebar--hidden'}`} aria-hidden={!sidebarOpen}>

        {/* Brand — static, no link redirect */}
        <div className="adm-brand">
          <div className="adm-brand-logos">
            <img src="/OIP-1215431747.jpg" alt="IEEE" className="adm-brand-img" />
            <span className="adm-brand-sep">×</span>
            <img src="/ODC-RGB-black-Orange-4057230769.png" alt="ODC" className="adm-brand-img adm-brand-img--odc" />
          </div>
          <div className="adm-brand-text">
            <span className="adm-brand-label">IEEE / ODC</span>
            <span className="adm-brand-sub">Admin Panel</span>
          </div>
        </div>

        <div className="adm-sidebar-section-label">Navigation</div>

        <nav className="adm-nav" aria-label="Admin navigation">
          {NAV_ITEMS.map(({ to, label, end, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `adm-nav-link${isActive ? ' adm-nav-link--active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden>
                <path d={icon} />
              </svg>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <Link to="/" className="adm-back-link">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to site
          </Link>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      <div
        className={`adm-sidebar-overlay${sidebarOpen ? ' adm-sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebar(false)}
        aria-hidden
      />

      {/* ── Main ── */}
      <div className="adm-main">

        {/* Top bar */}
        <header className="adm-topbar">

          {/* Left: hamburger + search + title */}
          <div className="adm-topbar-left">
            <button
              type="button"
              id="adm-sidebar-toggle"
              className="adm-icon-btn"
              onClick={() => setSidebar(v => !v)}
              aria-label="Toggle sidebar"
              title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Expandable search */}
            <div className="adm-search-wrap">
              <svg className="adm-search-icon" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                className="adm-search"
                placeholder="Search…"
                aria-label="Search admin panel"
              />
            </div>

            <h1 className="adm-topbar-title">{pageTitle}</h1>
          </div>

          {/* Right: icons + avatar */}
          <div className="adm-topbar-right">

            {/* Theme */}
            <button type="button" id="adm-theme-toggle" className="adm-icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            <button type="button" id="adm-notifications" className="adm-icon-btn adm-icon-btn--badge" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              {notifCount > 0 && <span className="adm-badge">{notifCount}</span>}
            </button>

            {/* Messages */}
            <button type="button" id="adm-messages" className="adm-icon-btn adm-icon-btn--badge" aria-label="Messages">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {msgCount > 0 && <span className="adm-badge adm-badge--blue">{msgCount}</span>}
            </button>

            {/* Divider */}
            <div className="adm-topbar-divider" />

            {/* Profile trigger + dropdown */}
            <div className="adm-profile-wrap" ref={profileRef}>
              <button
                type="button"
                id="adm-profile-btn"
                className={`adm-topbar-user${profileOpen ? ' adm-topbar-user--open' : ''}`}
                onClick={() => setProfile(v => !v)}
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <div className="adm-topbar-avatar">A</div>
                <div className="adm-topbar-user-info">
                  <span className="adm-topbar-user-name">Admin</span>
                  <span className="adm-topbar-user-role">Administrator</span>
                </div>
                <svg className="adm-profile-chevron" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="adm-profile-dropdown" role="menu">
                  {/* Header */}
                  <div className="adm-profile-header">
                    <div className="adm-profile-avatar-lg">A</div>
                    <div className="adm-profile-info">
                      <div className="adm-profile-name">Administrator</div>
                      <div className="adm-profile-email">admin@ieee-odc.org</div>
                    </div>
                  </div>

                  <div className="adm-profile-divider" />

                  {/* Menu items */}
                  <div className="adm-profile-menu">
                    <button type="button" className="adm-profile-item" role="menuitem">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      My Profile
                    </button>
                    <button type="button" className="adm-profile-item" role="menuitem">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Settings
                    </button>
                    <button type="button" className="adm-profile-item" role="menuitem">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      Help & Support
                    </button>
                  </div>

                  <div className="adm-profile-divider" />

                  <div className="adm-profile-menu">
                    <Link to="/" className="adm-profile-item" role="menuitem" onClick={() => setProfile(false)}>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Public Site
                    </Link>
                    <button type="button" className="adm-profile-item adm-profile-item--danger" role="menuitem">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        <main className="adm-content">
          {/* Breadcrumb */}
          <nav className="adm-breadcrumb" aria-label="Breadcrumb">
            <NavLink to="/admin" className="adm-breadcrumb-link" end>Home</NavLink>
            {pathname !== '/admin' && (
              <>
                <span className="adm-breadcrumb-sep">›</span>
                <span className="adm-breadcrumb-current">{pageTitle}</span>
              </>
            )}
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
