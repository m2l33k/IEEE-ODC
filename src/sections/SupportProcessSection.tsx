const steps = [
  {
    id: 1,
    title: 'Plan activity',
    description: 'Define objectives, scope, and alignment with IEEE / ODC priorities.'
  },
  {
    id: 2,
    title: 'Submit support request',
    description: 'Provide event details and requested support via the defined process.'
  },
  {
    id: 3,
    title: 'Execute and document',
    description: 'Deliver the activity and collect reporting data and documentation.'
  },
  {
    id: 4,
    title: 'Submit voucher claim',
    description: 'Provide final documentation and claim vouchers as applicable.'
  }
]

export function SupportProcessSection() {
  return (
    <section id="support" className="layout-section section-contained section-activities">
      <header className="section-header">
        <h2>Support Request Process</h2>
        <p>Step-by-step guidance for planning, requesting support, and claiming vouchers.</p>
      </header>
      <div className="support-steps">
        {steps.map((step) => (
          <article key={step.id} className="support-step-card">
            <div className="support-step-number">{step.id}</div>
            <div className="support-step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
