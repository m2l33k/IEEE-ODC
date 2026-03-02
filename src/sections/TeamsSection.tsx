const TEAM = [
  {
    id: 'ieee-rep', org: 'ieee' as const,
    name: 'IEEE Tunisia Section',
    role: 'Steering Committee Lead',
    tag: 'Partnership Governance',
    logo: '/OIP-1215431747.jpg',
  },
  {
    id: 'odc-rep', org: 'odc' as const,
    name: 'Orange Digital Center',
    role: 'Partnership Director',
    tag: 'Technical & Financial Sponsor',
    logo: '/ODC-RGB-black-Orange-4057230769.png',
    logoBg: true,
  },
]

export function TeamsSection() {
  return (
    <section id="teams" className="pub-section pub-teams">
      <div className="pub-container">
        <div className="pub-section-label">The Team</div>
        <h2 className="pub-section-title">Key Partnership Contacts</h2>
        <p className="pub-section-sub">
          The organisations and representatives responsible for co-ordinating the IEEE&nbsp;/&nbsp;ODC partnership activities.
        </p>

        <div className="pub-team-grid">
          {TEAM.map((m) => (
            <article key={m.id} className={`pub-team-card pub-team-card--${m.org}`}>
              <div className="pub-team-logo-wrap">
                <img
                  src={m.logo}
                  alt={m.name}
                  className={`pub-team-logo${m.logoBg ? ' pub-team-logo--bg' : ''}`}
                />
              </div>
              <div className="pub-team-body">
                <span className="pub-team-tag">{m.tag}</span>
                <h3 className="pub-team-name">{m.name}</h3>
                <p className="pub-team-role">{m.role}</p>
              </div>
              <div className={`pub-team-stripe pub-team-stripe--${m.org}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
