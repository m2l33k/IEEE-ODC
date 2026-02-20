type GalleryItem = {
  id: string
  title: string
  subtitle: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 'event-1',
    title: 'IEEE / ODC Supported Event',
    subtitle: 'Representative event in the partnership portfolio'
  },
  {
    id: 'event-2',
    title: 'Student and Professional Engagement',
    subtitle: 'Activities connecting members and communities'
  },
  {
    id: 'event-3',
    title: 'Technical Community Initiative',
    subtitle: 'Focus on innovation and learning'
  }
]

export function GallerySection() {
  return (
    <section id="gallery" className="layout-section section-events">
      <header className="section-header">
        <h2>Events and Gallery</h2>
        <p>Visual overview of initiatives and activities supported by the partnership.</p>
      </header>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article key={item.id} className="gallery-card">
            <div className="gallery-image-placeholder" />
            <div className="gallery-meta">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
