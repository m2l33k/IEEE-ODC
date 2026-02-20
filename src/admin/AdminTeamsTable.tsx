import { useState } from 'react'

type TeamMember = {
  id: string
  name: string
  role: string
  group?: string
  visible: boolean
}

type DialogMode = 'add' | 'edit'

export function AdminTeamsTable() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    group: '',
    visible: true
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function openAddDialog() {
    setDialogMode('add')
    setEditingId(null)
    setDraft({ name: '', role: '', group: '', visible: true })
    setErrors({})
    setIsDialogOpen(true)
  }

  function openEditDialog(member: TeamMember) {
    setDialogMode('edit')
    setEditingId(member.id)
    setDraft({
      name: member.name,
      role: member.role,
      group: member.group,
      visible: member.visible
    })
    setErrors({})
    setIsDialogOpen(true)
  }

  function validate() {
    const nextErrors: Record<string, string> = {}
    if (!draft.name.trim()) nextErrors.name = 'Name is required.'
    if (!draft.role.trim()) nextErrors.role = 'Role is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function saveMember() {
    if (!validate()) return

    if (dialogMode === 'add') {
      const id = 'member-' + (members.length + 1).toString().padStart(2, '0')
      setMembers((list) => [...list, { id, ...draft }])
    } else if (editingId) {
      setMembers((list) => list.map((m) => (m.id === editingId ? { ...m, ...draft } : m)))
    }

    setIsDialogOpen(false)
  }

  function deleteMember(id: string) {
    setMembers((list) => list.filter((m) => m.id !== id))
  }

  return (
    <div className="admin-module">
      <div className="admin-toolbar">
        <button type="button" className="btn btn-primary" onClick={openAddDialog}>
          Add team member
        </button>
      </div>
      {members.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No team members</div>
          <div className="empty-description">
            Create team entries to display contacts on the public site.
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Group</th>
                <th>Visible</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.group}</td>
                  <td>{member.visible ? 'Yes' : 'No'}</td>
                  <td className="admin-table-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => openEditDialog(member)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => deleteMember(member.id)}
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
              <h2>{dialogMode === 'add' ? 'Add team member' : 'Edit team member'}</h2>
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
                <label htmlFor="member-name">
                  Name <span className="field-required">*</span>
                </label>
                <input
                  id="member-name"
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="member-role">
                  Role <span className="field-required">*</span>
                </label>
                <input
                  id="member-role"
                  type="text"
                  value={draft.role}
                  onChange={(e) => setDraft((prev) => ({ ...prev, role: e.target.value }))}
                  aria-invalid={Boolean(errors.role)}
                />
                {errors.role && <div className="field-error">{errors.role}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="member-group">Group</label>
                <input
                  id="member-group"
                  type="text"
                  value={draft.group ?? ''}
                  onChange={(e) => setDraft((prev) => ({ ...prev, group: e.target.value }))}
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
              <button type="button" className="btn btn-primary" onClick={saveMember}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

