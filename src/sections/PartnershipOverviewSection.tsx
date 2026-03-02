const PILLARS = [
  {
    id: 'objectives', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: '#ff7900',
    title: 'Objectives',
    text: 'Support technical communities, student branches, and professional activities aligned with IEEE and ODC strategic priorities.',
  },
  {
    id: 'scope', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#6c2bd9',
    title: 'Scope',
    text: 'Funding and voucher-based support, co-branded events, and structured post-event reporting for all supported initiatives.',
  },
  {
    id: 'outcomes', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: '#10b981',
    title: 'Outcomes',
    text: 'Demonstrable KPIs, a visual record of activities, and a transparent support-request and voucher-claim pipeline.',
  },
]

export function PartnershipOverviewSection() {
  return (
    <section id="overview" className="pub-section pub-overview">
      <div className="pub-container">
        <div className="pub-section-label">About</div>
        <h2 className="pub-section-title">Partnership Overview</h2>
        <p className="pub-section-sub">
          A strategic collaboration between IEEE and Orange Digital Center, focused on enabling
          high-impact initiatives and growing the tech ecosystem across Tunisia and the region.
        </p>

        <div className="pub-overview-grid">
          {PILLARS.map((p) => (
            <div key={p.id} className="pub-overview-card" style={{ '--ov-color': p.color } as React.CSSProperties}>
              <div className="pub-overview-icon" style={{ background: `${p.color}1a`, color: p.color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d={p.icon} />
                </svg>
              </div>
              <h3 className="pub-overview-card-title">{p.title}</h3>
              <p className="pub-overview-card-text">{p.text}</p>
              <div className="pub-overview-card-bar" style={{ background: p.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
