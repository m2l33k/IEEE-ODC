import { useState } from 'react'

export function NewsletterSection() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmit] = useState(false)
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
        setError('')
        setSubmit(true)
    }

    return (
        <section className="pub-section pub-newsletter">
            <div className="pub-container">
                <div className="pub-newsletter-card">
                    {/* background glow */}
                    <div className="pub-newsletter-glow" />

                    <div className="pub-newsletter-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    {submitted ? (
                        <div className="pub-newsletter-success">
                            <div className="pub-newsletter-success-icon">
                                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="pub-newsletter-success-title">You're subscribed! 🎉</h3>
                            <p className="pub-newsletter-success-sub">
                                We'll notify you about new programs, events and voucher opportunities.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h2 className="pub-newsletter-title">Stay in the loop</h2>
                            <p className="pub-newsletter-sub">
                                Get notified about new ODC training programs, IEEE events, and voucher opportunities — straight to your inbox.
                            </p>
                            <form className="pub-newsletter-form" onSubmit={handleSubmit} noValidate>
                                <div className="pub-newsletter-input-wrap">
                                    <input
                                        type="email"
                                        className={`pub-newsletter-input${error ? ' pub-newsletter-input--error' : ''}`}
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                                        aria-label="Email address"
                                        required
                                    />
                                    <button type="submit" className="pub-newsletter-btn btn btn-primary">
                                        Subscribe
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {error && <p className="pub-newsletter-error">{error}</p>}
                                <p className="pub-newsletter-note">No spam. Unsubscribe anytime.</p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
