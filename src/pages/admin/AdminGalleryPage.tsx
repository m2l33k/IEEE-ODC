import { AdminGalleryGrid } from '../../admin/AdminGalleryGrid'

export function AdminGalleryPage() {
  return (
    <div>
      <h1>Gallery</h1>
      <p className="page-intro">
        Curate the visual record of events supported under the IEEE / ODC partnership.
      </p>
      <AdminGalleryGrid />
    </div>
  )
}

