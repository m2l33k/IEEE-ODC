import { useState } from 'react'

type GalleryItem = { id: string; title: string; description?: string; year?: string }
type DialogMode = 'add' | 'edit'

export function AdminGalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DialogMode>('add')
  const [editId, setEditId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<GalleryItem, 'id'>>({ title: '', description: '', year: '' })

  function openAdd() { setMode('add'); setEditId(null); setDraft({ title: '', description: '', year: '' }); setOpen(true) }
  function openEdit(item: GalleryItem) { setMode('edit'); setEditId(item.id); setDraft({ title: item.title, description: item.description, year: item.year }); setOpen(true) }
  function close() { setOpen(false) }

  function save() {
    if (!draft.title.trim()) return
    if (mode === 'add') {
      setItems(l => [...l, { id: 'image-' + (l.length + 1).toString().padStart(2, '0'), ...draft }])
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
        <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add image</button>
      </div>

      {items.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div className="adm-empty-title">No gallery items yet</div>
          <div className="adm-empty-desc">Add images to build the public events and gallery section.</div>
        </div>
      ) : (
        <div className="adm-gallery-grid">
          {items.map(item => (
            <article key={item.id} className="adm-gallery-card">
              <div className="adm-gallery-thumb" />
              <div className="adm-gallery-meta">
                <h3 className="adm-gallery-title">{item.title}</h3>
                {item.description && <p className="adm-gallery-desc">{item.description}</p>}
                {item.year && <p style={{ margin: '0 0 var(--space-sm)', fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>{item.year}</p>}
                <div className="adm-gallery-actions">
                  <button type="button" className="adm-btn-edit" onClick={() => openEdit(item)}>Edit</button>
                  <button type="button" className="adm-btn-delete" onClick={() => del(item.id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {open && (
        <div className="adm-backdrop" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{mode === 'add' ? 'Add Image' : 'Edit Image'}</h2>
              <button type="button" className="adm-modal-close" onClick={close} aria-label="Close">
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-field">
                <label className="adm-label" htmlFor="img-title">Title <span className="adm-required">*</span></label>
                <input id="img-title" type="text" className="adm-input" placeholder="Event or photo title" value={draft.title} onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="img-desc">Description</label>
                <textarea id="img-desc" className="adm-input adm-textarea" rows={3} placeholder="Optional caption or description" value={draft.description ?? ''} onChange={e => setDraft(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div className="adm-field">
                <label className="adm-label" htmlFor="img-year">Year</label>
                <input id="img-year" type="text" className="adm-input" placeholder="e.g. 2025" value={draft.year ?? ''} onChange={e => setDraft(p => ({ ...p, year: e.target.value }))} />
              </div>
            </div>
            <div className="adm-modal-footer">
              <button type="button" className="adm-btn-cancel" onClick={close}>Cancel</button>
              <button type="button" className="adm-btn-save" onClick={save}>Save image</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
