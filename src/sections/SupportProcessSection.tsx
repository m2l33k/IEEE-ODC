const STEPS = [
  {
    id: 1, color: '#ff7900',
    title: 'Plan your activity',
    desc: 'Define the event objectives, scope, expected attendance, and how it aligns with IEEE and ODC joint priorities.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    id: 2, color: '#6c2bd9',
    title: 'Submit support request',
    desc: 'Provide your event details, budget estimate, and requested ODC support via the official submission process.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    id: 3, color: '#10b981',
    title: 'Execute & document',
    desc: 'Deliver the activity, collect attendance data, photos, and any required reporting documentation.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    id: 4, color: '#3b82f6',
    title: 'Claim your voucher',
    desc: 'Submit final documentation and claim applicable vouchers via the online claim form within the deadline.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

export function SupportProcessSection() {
  return (
    <section id="support" className="pub-section pub-process">
      <div className="pub-container">
        <div className="pub-section-label">How it works</div>
        <h2 className="pub-section-title">Support Request Process</h2>
        <p className="pub-section-sub">
          A clear four-step journey — from planning your activity to receiving voucher reimbursement.
        </p>

        <div className="pub-process-steps">
          {STEPS.map((step, idx) => (
            <article key={step.id} className="pub-process-card">
              {/* connector line */}
              {idx < STEPS.length - 1 && <div className="pub-process-connector" />}

              <div className="pub-process-num" style={{ background: `${step.color}18`, color: step.color, borderColor: `${step.color}35` }}>
                {String(step.id).padStart(2, '0')}
              </div>
              <div className="pub-process-icon" style={{ color: step.color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d={step.icon} />
                </svg>
              </div>
              <h3 className="pub-process-title">{step.title}</h3>
              <p className="pub-process-desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
