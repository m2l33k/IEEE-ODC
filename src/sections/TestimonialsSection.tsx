const TESTIMONIALS = [
    {
        id: 't1',
        quote: "The ODC partnership enabled us to reach over 400 students in a single technical bootcamp — resources we simply couldn't have accessed alone.",
        author: 'Rania B.',
        role: 'IEEE Student Branch President, ENIT',
        org: 'ieee',
    },
    {
        id: 't2',
        quote: "Through the joint training catalogue, our branch members gained hands-on experience in Flutter and React Native. The quality of the programs exceeded our expectations.",
        author: 'Yassine M.',
        role: 'IEEE WIE Affinity Group Chair',
        org: 'ieee',
    },
    {
        id: 't3',
        quote: "The rigorous reporting and voucher claim process gives us confidence that every franc of support goes directly to real, measurable community impact.",
        author: 'Nour K.',
        role: 'IEEE Tunisia Section Treasurer',
        org: 'ieee',
    },
    {
        id: 't4',
        quote: "Partnering with IEEE gives Orange Digital Center direct access to Tunisia's most engaged student technical communities. It's a multiplier for our developer ecosystem.",
        author: 'Hatem A.',
        role: 'Partnership Lead, Orange Digital Center',
        org: 'odc',
    },
]

import { useEffect, useState } from 'react'

export function TestimonialsSection() {
    const [active, setActive] = useState(0)

    useEffect(() => {
        const id = window.setInterval(() => {
            setActive((p) => (p + 1) % TESTIMONIALS.length)
        }, 6000)
        return () => window.clearInterval(id)
    }, [])

    const t = TESTIMONIALS[active]

    return (
        <section id="testimonials" className="pub-section pub-testimonials">
            <div className="pub-container">
                <div className="pub-section-label">Community voices</div>
                <h2 className="pub-section-title">What people say</h2>

                <div className="pub-testi-wrap">
                    {/* Quote */}
                    <div className="pub-testi-card" key={t.id}>
                        <div className="pub-testi-quote-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                        </div>
                        <p className="pub-testi-text">"{t.quote}"</p>
                        <div className="pub-testi-author">
                            <div className={`pub-testi-avatar pub-testi-avatar--${t.org}`}>
                                {t.author.charAt(0)}
                            </div>
                            <div>
                                <div className="pub-testi-name">{t.author}</div>
                                <div className="pub-testi-role">{t.role}</div>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="pub-testi-dots">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`pub-hero-dot${i === active ? ' pub-hero-dot--active' : ''}`}
                                onClick={() => setActive(i)}
                                aria-label={`Testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
