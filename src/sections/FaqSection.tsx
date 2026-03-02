import { useState } from 'react'

type Faq = { id: string; question: string; answer: string; tag: string }

const FAQS: Faq[] = [
  {
    id: 'eligibility', tag: 'Eligibility',
    question: 'Who can request support under the IEEE / ODC partnership?',
    answer: 'Eligibility is open to IEEE organisational units — student branches, technical chapters, affinity groups, and sections — operating within the ODC partnership scope. Each request is reviewed based on activity type and expected impact.',
  },
  {
    id: 'vouchers', tag: 'Vouchers',
    question: 'How do vouchers work and who qualifies?',
    answer: 'Vouchers are issued after successful delivery of a supported activity and submission of the post-event report. Qualifying activities must align with the partnership objectives and meet minimum attendance thresholds.',
  },
  {
    id: 'timeline', tag: 'Timeline',
    question: 'How long does a support request take to process?',
    answer: 'Most requests are reviewed and acknowledged within 10 business days. Full approval, including budget confirmation, may take up to 3–4 weeks depending on complexity and available funding.',
  },
  {
    id: 'reporting', tag: 'Reporting',
    question: 'What documentation is required after my event?',
    answer: 'You must submit a post-event report including attendance list, event photos, a brief summary, and any media coverage. This must be submitted within 30 days of the event date.',
  },
  {
    id: 'budget', tag: 'Budget',
    question: 'Is there a maximum budget per activity?',
    answer: 'Support limits vary by activity type and event scale. Budgets are discussed during the review phase. Co-branded events with direct ODC involvement may receive additional support.',
  },
]

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('eligibility')

  return (
    <section id="faq" className="pub-section pub-faq">
      <div className="pub-container">
        <div className="pub-section-label">FAQ</div>
        <h2 className="pub-section-title">Frequently Asked Questions</h2>
        <p className="pub-section-sub">
          Guidance for the most common questions about support requests, reporting, and vouchers.
        </p>

        <div className="pub-faq-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className={`pub-faq-item${isOpen ? ' pub-faq-item--open' : ''}`}
              >
                <button
                  type="button"
                  className="pub-faq-trigger"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="pub-faq-tag">{faq.tag}</span>
                  <span className="pub-faq-question">{faq.question}</span>
                  <span className="pub-faq-chevron">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="pub-faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
