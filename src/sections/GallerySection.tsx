const EVENTS = [
  { id: 'e1', title: 'IEEE IEEE TSYP — Technical Congress', year: '2024', type: 'Conference', color: '#ff7900' },
  { id: 'e2', title: 'National Hackathon — Innovation Sprint', year: '2024', type: 'Hackathon', color: '#6c2bd9' },
  { id: 'e3', title: 'Student Branch Leadership Summit', year: '2023', type: 'Workshop', color: '#10b981' },
  { id: 'e4', title: 'Women in Engineering Regional Day', year: '2023', type: 'Community', color: '#3b82f6' },
  { id: 'e5', title: 'IEEE Day Tunisia — Tech & Impact Fair', year: '2023', type: 'Community', color: '#f59e0b' },
  { id: 'e6', title: 'Mobile Development Intensive Bootcamp', year: '2024', type: 'Workshop', color: '#ef4444' },
]

export function GallerySection() {
  return (
    <section id="gallery" className="pub-section pub-gallery">
      <div className="pub-container">
        <div className="pub-section-label">Events</div>
        <h2 className="pub-section-title">Events & Gallery</h2>
        <p className="pub-section-sub">
          A visual record of workshops, conferences, hackathons and community initiatives supported under the partnership.
        </p>

        <div className="pub-gallery-grid">
          {EVENTS.map((ev) => (
            <article key={ev.id} className="pub-gallery-card" style={{ '--g-color': ev.color } as React.CSSProperties}>
              {/* Gradient placeholder thumb */}
              <div className="pub-gallery-thumb" style={{ background: `linear-gradient(135deg, ${ev.color}22, ${ev.color}08)` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36" style={{ color: `${ev.color}55` }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="pub-gallery-meta">
                <div className="pub-gallery-top">
                  <span className="pub-gallery-type" style={{ background: `${ev.color}18`, color: ev.color }}>{ev.type}</span>
                  <span className="pub-gallery-year">{ev.year}</span>
                </div>
                <h3 className="pub-gallery-title">{ev.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
