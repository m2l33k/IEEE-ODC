export function AdminDashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p className="page-intro">
        Overview of content modules and voucher claims for the IEEE / ODC partnership.
      </p>
      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-label">Teams</div>
          <div className="admin-dashboard-value">–</div>
        </div>
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-label">KPIs</div>
          <div className="admin-dashboard-value">–</div>
        </div>
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-label">FAQs</div>
          <div className="admin-dashboard-value">–</div>
        </div>
        <div className="admin-dashboard-card">
          <div className="admin-dashboard-label">Voucher Claims</div>
          <div className="admin-dashboard-value">–</div>
        </div>
      </div>
    </div>
  )
}

