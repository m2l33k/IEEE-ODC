import { useState } from 'react'

type GalleryItem = {
  id: string
  title: string
  description?: string
  year?: string
}

type DialogMode = 'add' | 'edit'

export function AdminGalleryGrid() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>('add')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    description: '',
    year: ''
  })

  function openAddDialog() {
    setDialogMode('add')
    setEditingId(null)
    setDraft({ title: '', description: '', year: '' })
    setIsDialogOpen(true)
  }

  function openEditDialog(item: GalleryItem) {
    setDialogMode('edit')
    setEditingId(item.id)
    setDraft({
      title: item.title,
      description: item.description,
      year: item.year
    })
    setIsDialogOpen(true)
  }

  function saveItem() {
    if (!draft.title.trim()) return

    if (dialogMode === 'add') {
      const id = 'image-' + (items.length + 1).toString().padStart(2, '0')
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
          Add image
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No gallery items</div>
          <div className="empty-description">
            Add images to build the public events and gallery section.
          </div>
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {items.map((item) => (
            <article key={item.id} className="admin-gallery-card">
              <div className="gallery-image-placeholder" />
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {item.year && <p className="gallery-meta-year">{item.year}</p>}
              <div className="admin-gallery-actions">
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
              </div>
            </article>
          ))}
        </div>
      )}

      {isDialogOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <h2>{dialogMode === 'add' ? 'Add image' : 'Edit image'}</h2>
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
                <label htmlFor="image-title">Title</label>
                <input
                  id="image-title"
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="form-field">
                <label htmlFor="image-description">Description</label>
                <textarea
                  id="image-description"
                  rows={3}
                  value={draft.description ?? ''}
                  onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="form-field">
                <label htmlFor="image-year">Year</label>
                <input
                  id="image-year"
                  type="text"
                  value={draft.year ?? ''}
                  onChange={(e) => setDraft((prev) => ({ ...prev, year: e.target.value }))}
                />
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

