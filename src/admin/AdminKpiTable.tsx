import { useState } from 'react'

type Kpi = {
  id: string
  label: string
  value: number
  unit?: string
  visible: boolean
}

type DialogMode = 'add' | 'edit'

export function AdminKpiTable() {
  const [items, setItems] = useState<Kpi[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Kpi, 'id'>>({
    label: '',
    value: 0,
    unit: '',
    visible: true
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function openAddDialog() {
    setDialogMode('add')
    setEditingId(null)
    setDraft({ label: '', value: 0, unit: '', visible: true })
    setErrors({})
    setIsDialogOpen(true)
  }

  function openEditDialog(item: Kpi) {
    setDialogMode('edit')
    setEditingId(item.id)
    setDraft({
      label: item.label,
      value: item.value,
      unit: item.unit,
      visible: item.visible
    })
    setErrors({})
    setIsDialogOpen(true)
  }

  function validate() {
    const nextErrors: Record<string, string> = {}
    if (!draft.label.trim()) nextErrors.label = 'Label is required.'
    if (Number.isNaN(draft.value)) nextErrors.value = 'Value must be a number.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function saveItem() {
    if (!validate()) return

    if (dialogMode === 'add') {
      const id = 'kpi-' + (items.length + 1).toString().padStart(2, '0')
      setItems((list) => [...list, { id, ...draft }])
    } else if (editingId) {
      setItems((list) => list.map((m) => (m.id === editingId ? { ...m, ...draft } : m)))
    }
    setIsDialogOpen(false)
  }

  function deleteItem(id: string) {
    setItems((list) => list.filter((m) => m.id !== id))
  }

  return (
    <div className="admin-module">
      <div className="admin-toolbar">
        <button type="button" className="btn btn-primary" onClick={openAddDialog}>
          Add KPI
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No KPIs</div>
          <div className="empty-description">
            Define KPIs to surface impact on the public landing page.
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Visible</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  <td>{item.value}</td>
                  <td>{item.unit}</td>
                  <td>{item.visible ? 'Yes' : 'No'}</td>
                  <td className="admin-table-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => openEditDialog(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isDialogOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h2>{dialogMode === 'add' ? 'Add KPI' : 'Edit KPI'}</h2>
              <button
                type="button"
                className="btn btn-ghost modal-close"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label htmlFor="kpi-label">
                  Label <span className="field-required">*</span>
                </label>
                <input
                  id="kpi-label"
                  type="text"
                  value={draft.label}
                  onChange={(e) => setDraft((prev) => ({ ...prev, label: e.target.value }))}
                  aria-invalid={Boolean(errors.label)}
                />
                {errors.label && <div className="field-error">{errors.label}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="kpi-value">
                  Value <span className="field-required">*</span>
                </label>
                <input
                  id="kpi-value"
                  type="number"
                  value={draft.value}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, value: Number(e.target.value) || 0 }))
                  }
                  aria-invalid={Boolean(errors.value)}
                />
                {errors.value && <div className="field-error">{errors.value}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="kpi-unit">Unit</label>
                <input
                  id="kpi-unit"
                  type="text"
                  value={draft.unit ?? ''}
                  onChange={(e) => setDraft((prev) => ({ ...prev, unit: e.target.value }))}
                />
              </div>
              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={draft.visible}
                    onChange={(e) => setDraft((prev) => ({ ...prev, visible: e.target.checked }))}
                  />
                  Visible on public site
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={saveItem}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

