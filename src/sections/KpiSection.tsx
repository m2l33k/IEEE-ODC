type Kpi = {
  id: string
  label: string
  value: number
  suffix?: string
}

const kpis: Kpi[] = [
  { id: 'events', label: 'Supported events', value: 70, suffix: '+' },
  { id: 'participants', label: 'Participants reached', value: 3000, suffix: '+' },
  { id: 'branches', label: 'Student Branch', value: 51, suffix: '+' },
  { id: 'years', label: 'Years of collaboration', value: 3 }
]

export function KpiSection() {
  return (
    <section id="kpis" className="layout-section section-stats">
      <header className="section-header">
        <h2>KPIs and Impact</h2>
        <p>Key performance indicators summarizing the reach and outcomes of the partnership.</p>
      </header>
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.id} className="kpi-card">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">
              <span>{kpi.value}</span>
              {kpi.suffix ? <span className="kpi-suffix">{kpi.suffix}</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
