import { HeroSection } from '../sections/HeroSection'
import { KpiSection } from '../sections/KpiSection'
import { PartnershipOverviewSection } from '../sections/PartnershipOverviewSection'
import { GallerySection } from '../sections/GallerySection'
import { SupportProcessSection } from '../sections/SupportProcessSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { TimelineSection } from '../sections/TimelineSection'
import { FaqSection } from '../sections/FaqSection'
import { TeamsSection } from '../sections/TeamsSection'
import { NewsletterSection } from '../sections/NewsletterSection'
import { useEffect } from 'react'

const logoModules = import.meta.glob('/src/assets/logo/*.{jpg,jpeg,png,svg}', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const logoSources = Object.values(logoModules)

function LogoStrip() {
  const secondsPerLogo = 5
  const dur = Math.max(logoSources.length, 1) * secondsPerLogo
  if (logoSources.length === 0) return null
  return (
    <section className="pub-logo-strip">
      <div className="pub-logo-strip-label">Working with</div>
      <div className="pub-logo-strip-viewport">
        <div className="pub-logo-strip-track" style={{ animationDuration: `${dur}s` }}>
          {[...logoSources, ...logoSources].map((src, i) => (
            <div key={i} className="pub-logo-strip-item">
              <img src={src} alt="Partner logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedTrainingBanner() {
  return (
    <section className="pub-featured-banner">
      <div className="pub-container pub-featured-banner-inner">
        <div className="pub-featured-banner-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="pub-featured-banner-text">
          <span className="pub-featured-banner-badge">New 2026</span>
          <strong>Training Catalogue 2026 is live</strong>
          <span className="pub-featured-banner-sub">
            30+ ODC programs in Mobile, Web, AI, DevOps & Game Dev — open to all IEEE members
          </span>
        </div>
        <a href="/catalogue" className="pub-featured-banner-cta btn btn-primary">
          View Catalogue →
        </a>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="pub-footer">
      <div className="pub-footer-inner">
        <div className="pub-footer-brand">
          <div className="pub-footer-logos">
            <img src="/OIP-1215431747.jpg" alt="IEEE" className="pub-footer-logo" />
            <span className="pub-footer-x">×</span>
            <img src="/ODC-RGB-black-Orange-4057230769.png" alt="ODC" className="pub-footer-logo pub-footer-logo--odc" />
          </div>
          <p className="pub-footer-tagline">
            Bridging innovation &amp; connectivity across the IEEE&nbsp;/&nbsp;ODC ecosystem.
          </p>
        </div>

        <div className="pub-footer-links">
          <div className="pub-footer-col">
            <div className="pub-footer-col-title">Partnership</div>
            <a href="#overview" className="pub-footer-link">Overview</a>
            <a href="#kpis" className="pub-footer-link">Impact KPIs</a>
            <a href="#timeline" className="pub-footer-link">Milestones</a>
            <a href="#teams" className="pub-footer-link">Key Contacts</a>
          </div>
          <div className="pub-footer-col">
            <div className="pub-footer-col-title">Resources</div>
            <a href="#support" className="pub-footer-link">Support Process</a>
            <a href="/vouchers/claim" className="pub-footer-link">Claim Voucher</a>
            <a href="/catalogue" className="pub-footer-link">Catalogue 2026</a>
          </div>
          <div className="pub-footer-col">
            <div className="pub-footer-col-title">Community</div>
            <a href="#testimonials" className="pub-footer-link">Testimonials</a>
            <a href="#faq" className="pub-footer-link">FAQ</a>
            <a href="#gallery" className="pub-footer-link">Events Gallery</a>
          </div>
        </div>
      </div>

      <div className="pub-footer-bottom">
        <span>© 2026 IEEE / Orange Digital Center Partnership. All rights reserved.</span>
        <span className="pub-footer-divider">·</span>
        <span>Built for the IEEE / ODC ecosystem</span>
      </div>
    </footer>
  )
}

export function LandingPage() {
  useEffect(() => {
    document.title = 'IEEE / Orange Digital Center — Strategic Partnership'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'IEEE and Orange Digital Center strategic 3-year partnership — supporting 70+ events, 3000+ participants, and 51+ student branches across Tunisia.')
  }, [])

  return (
    <>
      <HeroSection />
      <FeaturedTrainingBanner />
      <KpiSection />
      <PartnershipOverviewSection />
      <TimelineSection />
      <GallerySection />
      <SupportProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <TeamsSection />
      <NewsletterSection />
      <LogoStrip />
      <SiteFooter />
    </>
  )
}
