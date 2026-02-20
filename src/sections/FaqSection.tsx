type Faq = {
  id: string
  question: string
  answer: string
}

const faqs: Faq[] = [
  {
    id: 'eligibility',
    question: 'Who can request support under the IEEE / ODC partnership?',
    answer:
      'Eligibility rules are defined by the partnership and typically include IEEE organizational units and related communities.'
  },
  {
    id: 'vouchers',
    question: 'How are vouchers related to supported activities?',
    answer:
      'Vouchers may be available for specific supported activities, following successful completion and reporting.'
  }
]

export function FaqSection() {
  return (
    <section id="faq" className="layout-section section-contained">
      <header className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Guidance for common questions related to support, reporting, and vouchers.</p>
      </header>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.id} className="faq-item">
            <summary className="faq-question">{faq.question}</summary>
            <p className="faq-answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

