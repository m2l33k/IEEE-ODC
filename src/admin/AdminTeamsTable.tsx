import { useState } from 'react'

type TeamMember = { id: string; name: string; role: string; group?: string; visible: boolean }
type DialogMode = 'add' | 'edit'

export function AdminTeamsTable() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<TeamMember, 'id'>>({ name: '', role: '', group: '', visible: true })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function openAdd() { setMode('add'); setEditId(null); setDraft({ name: '', role: '', group: '', visible: true }); setErrors({}); setOpen(true) }
  function openEdit(m: TeamMember) { setMode('edit'); setEditId(m.id); setDraft({ name: m.name, role: m.role, group: m.group, visible: m.visible }); setErrors({}); setOpen(true) }
  function close() { setOpen(false) }

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.name.trim()) e.name = 'Name is required.'
    if (!draft.role.trim()) e.role = 'Role is required.'
    setErrors(e); return !Object.keys(e).length
  }

  function save() {
    if (!validate()) return
    if (mode === 'add') {
      setMembers(l => [...l, { id: 'member-' + (l.length + 1).toString().padStart(2, '0'), ...draft }])
    } else if (editId) {
      setMembers(l => l.map(m => m.id === editId ? { ...m, ...draft } : m))
    }
    close()
  }

  function del(id: string) { setMembers(l => l.filter(m => m.id !== id)) }

  return (
    <div>
      <div className="adm-toolbar">
        <div />
        <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add member</button>
      </div>

      {members.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div className="adm-empty-title">No team members yet</div>
          <div className="adm-empty-desc">Create team entries to display contacts on the public site.</div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Name</th><th>Role</th><th>Group</th><th>Visible</th><th /></tr></thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{m.name}</td>
                  <td>{m.role}</td>
                  <td>{m.group || '—'}</td>
                  <td>{m.visible ? <span className="adm-badge-yes">Yes</span> : <span className="adm-badge-no">No</span>}</td>
                  <td className="adm-td-actions">
                    <button type="button" className="adm-btn-edit" onClick={() => openEdit(m)}>Edit</button>
                    {' '}
                    <button type="button" className="adm-btn-delete" onClick={() => del(m.id)}>Delete</button>
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
              <h2 className="adm-modal-title">{mode === 'add' ? 'Add Team Member' : 'Edit Team Member'}</h2>
              <button type="button" className="adm-modal-close" onClick={close} aria-label="Close">
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-field">
                <label className="adm-label" htmlFor="m-name">Name <span className="adm-required">*</span></label>
                <input id="m-name" type="text" className={`adm-input${errors.name ? ' adm-input--error' : ''}`} placeholder="Full name" value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))} />
                {errors.name && <span className="adm-field-error">{errors.name}</span>}
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="m-role">Role <span className="adm-required">*</span></label>
                <input id="m-role" type="text" className={`adm-input${errors.role ? ' adm-input--error' : ''}`} placeholder="Job title / role" value={draft.role} onChange={e => setDraft(p => ({ ...p, role: e.target.value }))} />
                {errors.role && <span className="adm-field-error">{errors.role}</span>}
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="m-group">Group</label>
                <input id="m-group" type="text" className="adm-input" placeholder="IEEE or ODC" value={draft.group ?? ''} onChange={e => setDraft(p => ({ ...p, group: e.target.value }))} />
              </div>
              <label className="adm-checkbox-row">
                <input type="checkbox" checked={draft.visible} onChange={e => setDraft(p => ({ ...p, visible: e.target.checked }))} />
                Visible on public site
              </label>
            </div>
            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-cancel" onClick={close}>Cancel</button>
              <button type="button" className="adm-btn-save" onClick={save}>Save member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
