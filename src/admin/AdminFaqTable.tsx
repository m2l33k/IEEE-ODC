import { useState } from 'react'

type Faq = {
  id: string
  question: string
  answer: string
  visible: boolean
}

type DialogMode = 'add' | 'edit'

export function AdminFaqTable() {
  const [items, setItems] = useState<Faq[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Faq, 'id'>>({
    question: '',
    answer: '',
    visible: true
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function openAddDialog() {
    setDialogMode('add')
    setEditingId(null)
    setDraft({ question: '', answer: '', visible: true })
    setErrors({})
    setIsDialogOpen(true)
  }

  function openEditDialog(item: Faq) {
    setDialogMode('edit')
    setEditingId(item.id)
    setDraft({
      question: item.question,
      answer: item.answer,
      visible: item.visible
    })
    setErrors({})
    setIsDialogOpen(true)
  }

  function validate() {
    const nextErrors: Record<string, string> = {}
    if (!draft.question.trim()) nextErrors.question = 'Question is required.'
    if (!draft.answer.trim()) nextErrors.answer = 'Answer is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function saveItem() {
    if (!validate()) return

    if (dialogMode === 'add') {
      const id = 'faq-' + (items.length + 1).toString().padStart(2, '0')
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
          Add FAQ
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No FAQs</div>
          <div className="empty-description">
            Create FAQs to support members and visitors on the public site.
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Visible</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.question}</td>
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
              <h2>{dialogMode === 'add' ? 'Add FAQ' : 'Edit FAQ'}</h2>
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
                <label htmlFor="faq-question">
                  Question <span className="field-required">*</span>
                </label>
                <input
                  id="faq-question"
                  type="text"
                  value={draft.question}
                  onChange={(e) => setDraft((prev) => ({ ...prev, question: e.target.value }))}
                  aria-invalid={Boolean(errors.question)}
                />
                {errors.question && <div className="field-error">{errors.question}</div>}
              </div>
              <div className="form-field">
                <label htmlFor="faq-answer">
                  Answer <span className="field-required">*</span>
                </label>
                <textarea
                  id="faq-answer"
                  rows={4}
                  value={draft.answer}
                  onChange={(e) => setDraft((prev) => ({ ...prev, answer: e.target.value }))}
                  aria-invalid={Boolean(errors.answer)}
                />
                {errors.answer && <div className="field-error">{errors.answer}</div>}
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

