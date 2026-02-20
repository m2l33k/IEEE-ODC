import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const images = import.meta.glob('/src/assets/logo/*.{jpg,png,jpeg}', {
  eager: true,
}) as Record<string, { default: string }>;

const heroImages = Object.values(images).map((module) => module.default);


export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="layout-section hero-section">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-tag">Three-year strategic partnership</div>
          <h1>Bridging Innovation &amp; Connectivity</h1>
          <p className="hero-subtitle">
            Engineering-grade focus with telecom energy, connecting technology, communities, and
            opportunity across the IEEE / ODC ecosystem.
          </p>
          <div className="hero-actions">
            <a href="#kpis" className="btn btn-primary">
              Explore impact
            </a>
            <Link to="/vouchers/claim" className="btn btn-secondary">
              Claim voucher
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-panel hero-panorama">
            {heroImages.map((src, index) => (
              <div
                key={src}
                className={`hero-panorama-slide${
                  index === activeIndex ? ' hero-panorama-slide-active' : ''
                }`}
                style={{ backgroundImage: `url("${src}")` }}
              />
            ))}
            <div className="hero-panorama-overlay">
              <div className="hero-panel-title">IEEE / ODC global initiatives</div>
              <div className="hero-panel-footer">
                Rotating view of partnership activities, communities, and opportunities.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="logo-spin-strip">
        <div className="logo-spin-pill">
          <div className="logo-spin-circle">
            <img src="/OIP-1215431747.jpg" alt="IEEE" />
          </div>
          <div className="logo-spin-x">×</div>
          <div className="logo-spin-circle">
            <img src="/ODC-RGB-black-Orange-4057230769.png" alt="ODC" />
          </div>
        </div>
      </div>
    </section>
  )
}
