import { useState } from 'react'

type Kpi = { id: string; label: string; value: number; unit?: string; visible: boolean }
type DialogMode = 'add' | 'edit'

export function AdminKpiTable() {
  const [items, setItems] = useState<Kpi[]>([])
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Kpi, 'id'>>({ label: '', value: 0, unit: '', visible: true })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function openAdd() { setMode('add'); setEditId(null); setDraft({ label: '', value: 0, unit: '', visible: true }); setErrors({}); setOpen(true) }
  function openEdit(item: Kpi) { setMode('edit'); setEditId(item.id); setDraft({ label: item.label, value: item.value, unit: item.unit, visible: item.visible }); setErrors({}); setOpen(true) }
  function close() { setOpen(false) }

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.label.trim()) e.label = 'Label is required.'
    if (Number.isNaN(draft.value)) e.value = 'Value must be a number.'
    setErrors(e); return !Object.keys(e).length
  }

  function save() {
    if (!validate()) return
    if (mode === 'add') {
      setItems(l => [...l, { id: 'kpi-' + (l.length + 1).toString().padStart(2, '0'), ...draft }])
    } else if (editId) {
      setItems(l => l.map(m => m.id === editId ? { ...m, ...draft } : m))
    }
    close()
  }

  function del(id: string) { setItems(l => l.filter(m => m.id !== id)) }

  return (
    <div>
      <div className="adm-toolbar">
        <div />
        <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add KPI</button>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div className="adm-empty-title">No KPIs defined</div>
          <div className="adm-empty-desc">Define KPIs to surface partnership impact on the public landing page.</div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Label</th><th>Value</th><th>Unit</th><th>Visible</th><th /></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{item.label}</td>
                  <td>{item.value}</td>
                  <td>{item.unit || '—'}</td>
                  <td>{item.visible ? <span className="adm-badge-yes">Yes</span> : <span className="adm-badge-no">No</span>}</td>
                  <td className="adm-td-actions">
                    <button type="button" className="adm-btn-edit" onClick={() => openEdit(item)}>Edit</button>
                    {' '}
                    <button type="button" className="adm-btn-delete" onClick={() => del(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="adm-backdrop" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{mode === 'add' ? 'Add KPI' : 'Edit KPI'}</h2>
              <button type="button" className="adm-modal-close" onClick={close} aria-label="Close">
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-field">
                <label className="adm-label" htmlFor="kpi-label">Label <span className="adm-required">*</span></label>
                <input id="kpi-label" type="text" className={`adm-input${errors.label ? ' adm-input--error' : ''}`} placeholder="e.g. Communities Supported" value={draft.label} onChange={e => setDraft(p => ({ ...p, label: e.target.value }))} />
                {errors.label && <span className="adm-field-error">{errors.label}</span>}
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="kpi-value">Value <span className="adm-required">*</span></label>
                <input id="kpi-value" type="number" className={`adm-input${errors.value ? ' adm-input--error' : ''}`} value={draft.value} onChange={e => setDraft(p => ({ ...p, value: Number(e.target.value) || 0 }))} />
                {errors.value && <span className="adm-field-error">{errors.value}</span>}
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="kpi-unit">Unit</label>
                <input id="kpi-unit" type="text" className="adm-input" placeholder="e.g. %, K, members" value={draft.unit ?? ''} onChange={e => setDraft(p => ({ ...p, unit: e.target.value }))} />
              </div>
              <label className="adm-checkbox-row">
                <input type="checkbox" checked={draft.visible} onChange={e => setDraft(p => ({ ...p, visible: e.target.checked }))} />
                Visible on public site
              </label>
            </div>
            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-cancel" onClick={close}>Cancel</button>
              <button type="button" className="adm-btn-save" onClick={save}>Save KPI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
