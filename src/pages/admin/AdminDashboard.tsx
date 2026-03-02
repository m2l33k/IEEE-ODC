import { Link } from 'react-router-dom'

const STATS = [
  { label: 'Team Members', value: '–', color: '#3b82f6', path: '/admin/teams', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'KPIs Tracked', value: '–', color: '#10b981', path: '/admin/kpis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'FAQs', value: '–', color: '#a855f7', path: '/admin/faqs', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Voucher Claims', value: '–', color: '#f59e0b', path: '/admin/vouchers', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
]

const QUICK = [
  { label: 'Add team member', path: '/admin/teams', desc: 'Create a new team profile' },
  { label: 'New KPI', path: '/admin/kpis', desc: 'Track a new impact metric' },
  { label: 'New FAQ', path: '/admin/faqs', desc: 'Add a support question' },
  { label: 'Review claims', path: '/admin/vouchers', desc: 'Process pending vouchers' },
]

export function AdminDashboard() {
  return (
    <div className="adm-dashboard">
      <p className="adm-page-intro">
        Overview of content modules and voucher claims for the IEEE / ODC partnership.
      </p>

      {/* Stats */}
      <div className="adm-stat-grid">
        {STATS.map((s) => (
          <Link key={s.label} to={s.path} className="adm-stat-card" style={{ '--stat-color': s.color } as React.CSSProperties}>
            <div className="adm-stat-icon" style={{ background: `${s.color}18`, color: s.color }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d={s.icon} />
              </svg>
            </div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-bar" style={{ background: s.color }} />
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="adm-section-title">Quick Actions</div>
      <div className="adm-quick-grid">
        {QUICK.map((q) => (
          <Link key={q.label} to={q.path} className="adm-quick-card">
            <div className="adm-quick-label">{q.label}</div>
            <div className="adm-quick-desc">{q.desc}</div>
            <svg className="adm-quick-arrow" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Info banner */}
      <div className="adm-info-banner">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        All content changes are reflected immediately on the public site. Use the navigation to manage each module.
      </div>
    </div>
  )
}
