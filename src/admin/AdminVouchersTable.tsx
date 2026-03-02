import { useState } from 'react'

type VoucherStatus = 'submitted' | 'approved' | 'rejected'
type VoucherClaim = { id: string; applicant: string; submittedAt: string; status: VoucherStatus }

export function AdminVouchersTable() {
  const [claims, setClaims] = useState<VoucherClaim[]>([])
  const [filterStatus, setFilter] = useState<VoucherStatus | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const open = selectedId !== null

  function openDialog(id: string) { setSelectedId(id) }
  function close() { setSelectedId(null) }

  function updateStatus(id: string, status: VoucherStatus) {
    setClaims(l => l.map(c => c.id === id ? { ...c, status } : c))
    close()
  }

  const filtered = filterStatus === 'all' ? claims : claims.filter(c => c.status === filterStatus)

  function badge(s: VoucherStatus) {
    if (s === 'approved') return <span className="adm-status-approved">Approved</span>
    if (s === 'rejected') return <span className="adm-status-rejected">Rejected</span>
    return <span className="adm-status-submitted">Submitted</span>
  }

  return (
    <div>
      <div className="adm-toolbar">
        <div className="adm-filter">
          <span>Status:</span>
          <select value={filterStatus} onChange={e => setFilter(e.target.value as VoucherStatus | 'all')}>
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {claims.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <div className="adm-empty-title">No voucher claims yet</div>
          <div className="adm-empty-desc">Claims submitted on the public site will appear here for review.</div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Claim ID</th><th>Applicant</th><th>Submitted</th><th>Status</th><th /></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{c.id}</td>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{c.applicant}</td>
                  <td>{c.submittedAt}</td>
                  <td>{badge(c.status)}</td>
                  <td className="adm-td-actions">
                    <button type="button" className="adm-btn-status" onClick={() => openDialog(c.id)}>Update status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && selectedId && (
        <div className="adm-backdrop" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">Update Claim Status</h2>
              <button type="button" className="adm-modal-close" onClick={close} aria-label="Close">
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(148,163,184,0.8)' }}>
                Select the new status for claim <strong style={{ color: '#fff' }}>{selectedId}</strong>.
              </p>
              <div className="adm-status-btn-group">
                <button type="button" className="adm-status-btn adm-status-btn--submitted" onClick={() => updateStatus(selectedId, 'submitted')}>
                  <span className="adm-status-submitted">Submitted</span>
                  Mark as submitted / pending review
                </button>
                <button type="button" className="adm-status-btn adm-status-btn--approved" onClick={() => updateStatus(selectedId, 'approved')}>
                  <span className="adm-status-approved">Approved</span>
                  Approve this claim
                </button>
                <button type="button" className="adm-status-btn adm-status-btn--rejected" onClick={() => updateStatus(selectedId, 'rejected')}>
                  <span className="adm-status-rejected">Rejected</span>
                  Reject this claim
                </button>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-cancel" onClick={close}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
