import { useState } from 'react'

type VoucherStatus = 'submitted' | 'approved' | 'rejected'

type VoucherClaim = {
  id: string
  applicant: string
  submittedAt: string
  status: VoucherStatus
}

type DialogMode = 'view' | 'status'

export function AdminVouchersTable() {
  const [claims, setClaims] = useState<VoucherClaim[]>([])
  const [filterStatus, setFilterStatus] = useState<VoucherStatus | 'all'>('all')
  const [dialogMode, setDialogMode] = useState<DialogMode | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function openStatusDialog(id: string) {
    setSelectedId(id)
    setDialogMode('status')
  }

  function closeDialog() {
    setDialogMode(null)
    setSelectedId(null)
  }

  function updateStatus(id: string, status: VoucherStatus) {
    setClaims((list) => list.map((c) => (c.id === id ? { ...c, status } : c)))
    closeDialog()
  }

  function filteredClaims() {
    if (filterStatus === 'all') return claims
    return claims.filter((c) => c.status === filterStatus)
  }

  function renderBadge(status: VoucherStatus) {
    if (status === 'approved') {
      return <span className="status-badge status-badge-success">Approved</span>
    }
    if (status === 'rejected') {
      return <span className="status-badge status-badge-error">Rejected</span>
    }
    return <span className="status-badge status-badge-neutral">Submitted</span>
  }

  return (
    <div className="admin-module">
      <div className="admin-toolbar">
        <div className="admin-filter-group">
          <label htmlFor="voucher-status-filter">Status</label>
          <select
            id="voucher-status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as VoucherStatus | 'all')}
          >
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {claims.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No voucher claims</div>
          <div className="empty-description">
            Voucher claims will appear here after members submit forms on the public site.
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Applicant</th>
                <th>Submitted</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredClaims().map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>{claim.applicant}</td>
                  <td>{claim.submittedAt}</td>
                  <td>{renderBadge(claim.status)}</td>
                  <td className="admin-table-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => openStatusDialog(claim.id)}
                    >
                      Update status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {dialogMode === 'status' && selectedId && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h2>Update status</h2>
              <button
                type="button"
                className="btn btn-ghost modal-close"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              <p>Select the new status for claim {selectedId}.</p>
              <div className="status-button-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => updateStatus(selectedId, 'submitted')}
                >
                  Set to submitted
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => updateStatus(selectedId, 'approved')}
                >
                  Set to approved
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => updateStatus(selectedId, 'rejected')}
                >
                  Set to rejected
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeDialog}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

