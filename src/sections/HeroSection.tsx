import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'

const wallpaperModules = import.meta.glob('/src/assets/wallpaper/*.{jpg,png,jpeg}', {
  eager: true,
}) as Record<string, { default: string }>

let heroImages = Object.values(wallpaperModules).map((m) => m.default)
if (heroImages.length === 0) heroImages = []

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (heroImages.length <= 1) return
    const id = window.setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActiveIndex((p) => (p + 1) % heroImages.length)
        setFading(false)
      }, 600)
    }, 7000)
    return () => window.clearInterval(id)
  }, [])

  const bgStyle: CSSProperties | undefined = heroImages.length > 0
    ? { backgroundImage: `url("${heroImages[activeIndex]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : undefined

  return (
    <section className={`pub-hero${fading ? ' pub-hero--fading' : ''}`} style={bgStyle}>
      {/* overlay */}
      <div className="pub-hero-overlay" />

      <div className="pub-hero-inner">
        {/* Badge */}
        <div className="pub-hero-badge">
          <span className="pub-hero-badge-dot" />
          Three-year strategic partnership · IEEE × ODC
        </div>

        <h1 className="pub-hero-title">
          Bridging Innovation<br />
          <span className="pub-hero-title-accent">&amp; Connectivity</span>
        </h1>

        <p className="pub-hero-subtitle">
          Engineering-grade focus with telecom energy — connecting technology, communities,
          and opportunity across the IEEE&nbsp;/&nbsp;ODC ecosystem.
        </p>

        {/* Trust indicators */}
        <div className="pub-hero-trust">
          <span className="pub-hero-trust-item">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            70+ Supported events
          </span>
          <span className="pub-hero-trust-sep" />
          <span className="pub-hero-trust-item">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            3 000+ Participants
          </span>
          <span className="pub-hero-trust-sep" />
          <span className="pub-hero-trust-item">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            51+ Student branches
          </span>
        </div>

        <div className="pub-hero-actions">
          <a href="#kpis" className="btn btn-primary pub-hero-cta">
            Explore our impact
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </a>
          <Link to="/vouchers/claim" className="btn pub-hero-btn-outline">
            Claim a voucher
          </Link>
        </div>

        {/* Slide dots */}
        {heroImages.length > 1 && (
          <div className="pub-hero-dots">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`pub-hero-dot${i === activeIndex ? ' pub-hero-dot--active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
