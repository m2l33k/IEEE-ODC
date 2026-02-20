import { AdminKpiTable } from '../../admin/AdminKpiTable'

export function AdminKpisPage() {
  return (
    <div>
      <h1>KPIs</h1>
      <p className="page-intro">
        Configure key performance indicators shown on the partnership landing page.
      </p>
      <AdminKpiTable />
    </div>
  )
}

