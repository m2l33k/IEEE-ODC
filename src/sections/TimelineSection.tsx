const MILESTONES = [
    { year: '2023', color: '#ff7900', title: 'Partnership Signed', desc: 'IEEE Region 8 and Orange Digital Center formalize a 3-year strategic collaboration agreement.' },
    { year: '2023', color: '#6c2bd9', title: 'First Events Supported', desc: 'Initial wave of IEEE student branch events funded and co-branded under the partnership framework.' },
    { year: '2024', color: '#10b981', title: '1 500+ Participants', desc: 'Mid-year milestone: over 1,500 engineers and students have engaged in partnership-backed activities.' },
    { year: '2024', color: '#3b82f6', title: 'Training Catalogue V1', desc: 'Orange Digital Center launches its first formal training catalogue with 20+ programs for IEEE members.' },
    { year: '2025', color: '#f59e0b', title: '51 Student Branches', desc: 'All 51 active IEEE student branches in Tunisia onboarded and eligible for partnership support.' },
    { year: '2026', color: '#ef4444', title: 'Catalogue 2026 — 30+ Programs', desc: 'Expanded catalogue featuring AI, DevOps, Mobile, Web, and Game Dev tracks, with 3 000+ participants reached.' },
]

export function TimelineSection() {
    return (
        <section id="timeline" className="pub-section pub-timeline">
            <div className="pub-container">
                <div className="pub-section-label">Journey</div>
                <h2 className="pub-section-title">Partnership Milestones</h2>
                <p className="pub-section-sub">
                    Key moments in the IEEE / Orange Digital Center collaboration from 2023 to 2026.
                </p>

                <div className="pub-timeline-track">
                    {MILESTONES.map((m, idx) => (
                        <div key={idx} className={`pub-timeline-item${idx % 2 === 0 ? '' : ' pub-timeline-item--alt'}`}>
                            <div className="pub-timeline-dot" style={{ background: m.color, boxShadow: `0 0 12px ${m.color}80` }} />
                            <div className="pub-timeline-card" style={{ '--tl-color': m.color } as React.CSSProperties}>
                                <div className="pub-timeline-year" style={{ color: m.color }}>{m.year}</div>
                                <h3 className="pub-timeline-title">{m.title}</h3>
                                <p className="pub-timeline-desc">{m.desc}</p>
                            </div>
                        </div>
                    ))}
                    {/* center spine */}
                    <div className="pub-timeline-spine" />
                </div>
            </div>
        </section>
    )
}
