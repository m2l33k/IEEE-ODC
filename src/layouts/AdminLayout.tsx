import { NavLink, Outlet } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">IEEE / ODC Admin</div>
        <nav className="admin-nav">
          <NavLink end to="/admin" className="admin-nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/teams" className="admin-nav-link">
            Teams
          </NavLink>
          <NavLink to="/admin/kpis" className="admin-nav-link">
            KPIs
          </NavLink>
          <NavLink to="/admin/faqs" className="admin-nav-link">
            FAQs
          </NavLink>
          <NavLink to="/admin/gallery" className="admin-nav-link">
            Gallery
          </NavLink>
          <NavLink to="/admin/vouchers" className="admin-nav-link">
            Voucher Claims
          </NavLink>
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">Content Management</div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

