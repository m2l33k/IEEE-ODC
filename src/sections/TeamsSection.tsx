type TeamMember = {
  id: string
  name: string
  role: string
  group?: string
  organization: 'ieee' | 'odc'
}

const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'IEEE Representative',
    role: 'Steering Committee',
    group: 'Governance · IEEE is an international organisation',
    organization: 'ieee'
  },
  {
    id: 'member-2',
    name: 'ODC',
    role: 'ODC Representative',
    group: 'Partnership Lead · Orange is a sponsor',
    organization: 'odc'
  }
]

export function TeamsSection() {
  return (
    <section id="teams" className="layout-section section-alt section-teams">
      <header className="section-header">
        <h2>Teams</h2>
        <p>Key IEEE and ODC contacts responsible for the partnership and supported activities.</p>
      </header>
      <div className="team-grid">
        {teamMembers.map((member) => {
          const logoSrc =
            member.organization === 'ieee'
              ? '/OIP-1215431747.jpg'
              : '/ODC-RGB-black-Orange-4057230769.png'

          return (
            <article key={member.id} className="team-card">
              <div className="team-avatar">
                <img
                  src={logoSrc}
                  alt={member.organization === 'ieee' ? 'IEEE' : 'ODC'}
                  className="team-avatar-image"
                />
              </div>
              <div className="team-meta">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                {member.group ? <p className="team-group">{member.group}</p> : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
