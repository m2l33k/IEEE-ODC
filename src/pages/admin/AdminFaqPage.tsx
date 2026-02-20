import { AdminFaqTable } from '../../admin/AdminFaqTable'

export function AdminFaqPage() {
  return (
    <div>
      <h1>FAQs</h1>
      <p className="page-intro">
        Manage frequently asked questions that guide IEEE members and visitors.
      </p>
      <AdminFaqTable />
    </div>
  )
}

