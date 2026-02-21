import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import wallpaperFallback from '../assets/wallpaper/229A3013.jpg'

const wallpaperModules = import.meta.glob('/src/assets/wallpaper/*.{jpg,png,jpeg}', {
  eager: true
}) as Record<string, { default: string }>

let heroImages = Object.values(wallpaperModules).map((module) => module.default)

if (heroImages.length === 0) {
  heroImages = [wallpaperFallback]
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (heroImages.length === 0) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [])

  const hasWallpapers = heroImages.length > 0

  const heroSectionStyle: CSSProperties | undefined = hasWallpapers
    ? {
        backgroundImage: `url("${heroImages[activeIndex]}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : undefined

  return (
    <section className="layout-section hero-section" style={heroSectionStyle}>
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
            <div className="hero-panorama-overlay">
              <div className="hero-panel-title">IEEE / ODC global initiatives</div>
              <div className="hero-panel-footer">
                Rotating view of partnership activities, communities, and opportunities.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
