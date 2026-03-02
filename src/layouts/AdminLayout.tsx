import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

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
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = window.localStorage.getItem('ieee_odc_theme')
    return (stored === 'light' || stored === 'dark') ? stored : 'dark'
  })
  const [notifCount] = useState(3)
  const [msgCount] = useState(5)

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('ieee_odc_theme', next)
  }

  return (
    <div className={`adm-layout${collapsed ? ' adm-layout--collapsed' : ''}`}>

      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">

        {/* Brand — no redirect, just a static block */}
        <div className="adm-brand">
          <div className="adm-brand-logos">
            <img
              src="/OIP-1215431747.jpg"
              alt="IEEE"
              className="adm-brand-img"
            />
            <span className="adm-brand-sep">×</span>
            <img
              src="/ODC-RGB-black-Orange-4057230769.png"
              alt="ODC"
              className="adm-brand-img adm-brand-img--odc"
            />
          </div>
          {!collapsed && (
            <div className="adm-brand-text">
              <span className="adm-brand-label">IEEE / ODC</span>
              <span className="adm-brand-sub">Admin Panel</span>
            </div>
          )}
        </div>

        {!collapsed && <div className="adm-sidebar-section-label">Navigation</div>}

        <nav className="adm-nav" aria-label="Admin navigation">
          {NAV_ITEMS.map(({ to, label, end, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={collapsed ? label : undefined}
              className={({ isActive }) => `adm-nav-link${isActive ? ' adm-nav-link--active' : ''}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden>
                <path d={icon} />
              </svg>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          {!collapsed && (
            <NavLink
              to="/"
              className="adm-back-link"
              title="Public site"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to site
            </NavLink>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="adm-main">

        {/* Top bar */}
        <header className="adm-topbar">
          {/* Left: hamburger + title */}
          <div className="adm-topbar-left">
            <button
              type="button"
              id="adm-sidebar-toggle"
              className="adm-icon-btn"
              onClick={() => setCollapsed(c => !c)}
              aria-label="Toggle sidebar"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                /* open icon */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              ) : (
                /* close/collapse icon */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                  <line x1="3" y1="6" x2="15" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="15" y2="18" />
                </svg>
              )}
            </button>
            <h1 className="adm-topbar-title">{pageTitle}</h1>
          </div>

          {/* Right: icons + avatar */}
          <div className="adm-topbar-right">

            {/* Theme toggle */}
            <button
              type="button"
              id="adm-theme-toggle"
              className="adm-icon-btn"
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

            {/* Avatar */}
            <div className="adm-topbar-user">
              <div className="adm-topbar-avatar">A</div>
              <div className="adm-topbar-user-info">
                <span className="adm-topbar-user-name">Admin</span>
                <span className="adm-topbar-user-role">Administrator</span>
              </div>
            </div>

          </div>
        </header>

        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
