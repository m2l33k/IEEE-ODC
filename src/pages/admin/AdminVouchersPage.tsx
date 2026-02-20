import { AdminVouchersTable } from '../../admin/AdminVouchersTable'

export function AdminVouchersPage() {
  return (
    <div>
      <h1>Voucher Claims</h1>
      <p className="page-intro">
        Review, update, and track voucher claims submitted by IEEE members.
      </p>
      <AdminVouchersTable />
    </div>
  )
}

