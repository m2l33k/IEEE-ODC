import { useState } from 'react'

type Faq = { id: string; question: string; answer: string; visible: boolean }
type DialogMode = 'add' | 'edit'

export function AdminFaqTable() {
  const [items, setItems] = useState<Faq[]>([])
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<Faq, 'id'>>({ question: '', answer: '', visible: true })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function openAdd() { setMode('add'); setEditId(null); setDraft({ question: '', answer: '', visible: true }); setErrors({}); setOpen(true) }
  function openEdit(item: Faq) { setMode('edit'); setEditId(item.id); setDraft({ question: item.question, answer: item.answer, visible: item.visible }); setErrors({}); setOpen(true) }
  function close() { setOpen(false) }

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.question.trim()) e.question = 'Question is required.'
    if (!draft.answer.trim()) e.answer = 'Answer is required.'
    setErrors(e); return !Object.keys(e).length
  }

  function save() {
    if (!validate()) return
    if (mode === 'add') {
      setItems(l => [...l, { id: 'faq-' + (l.length + 1).toString().padStart(2, '0'), ...draft }])
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
        <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add FAQ</button>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="adm-empty-title">No FAQs yet</div>
          <div className="adm-empty-desc">Create FAQs to support members and visitors on the public site.</div>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Question</th><th>Visible</th><th /></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500, color: '#fff', maxWidth: 480 }}>{item.question}</td>
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
              <h2 className="adm-modal-title">{mode === 'add' ? 'Add FAQ' : 'Edit FAQ'}</h2>
              <button type="button" className="adm-modal-close" onClick={close} aria-label="Close">
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-field">
                <label className="adm-label" htmlFor="faq-q">Question <span className="adm-required">*</span></label>
                <input id="faq-q" type="text" className={`adm-input${errors.question ? ' adm-input--error' : ''}`} placeholder="What would a member ask?" value={draft.question} onChange={e => setDraft(p => ({ ...p, question: e.target.value }))} />
                {errors.question && <span className="adm-field-error">{errors.question}</span>}
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="faq-a">Answer <span className="adm-required">*</span></label>
                <textarea id="faq-a" className={`adm-input adm-textarea${errors.answer ? ' adm-input--error' : ''}`} rows={4} placeholder="Provide a clear, helpful answer…" value={draft.answer} onChange={e => setDraft(p => ({ ...p, answer: e.target.value }))} />
                {errors.answer && <span className="adm-field-error">{errors.answer}</span>}
              </div>
              <label className="adm-checkbox-row">
                <input type="checkbox" checked={draft.visible} onChange={e => setDraft(p => ({ ...p, visible: e.target.checked }))} />
                Visible on public site
              </label>
            </div>
            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-cancel" onClick={close}>Cancel</button>
              <button type="button" className="adm-btn-save" onClick={save}>Save FAQ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
