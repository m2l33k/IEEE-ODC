import { HeroSection } from '../sections/HeroSection'
import { KpiSection } from '../sections/KpiSection'
import { PartnershipOverviewSection } from '../sections/PartnershipOverviewSection'
import { GallerySection } from '../sections/GallerySection'
import { SupportProcessSection } from '../sections/SupportProcessSection'
import { FaqSection } from '../sections/FaqSection'
import { TeamsSection } from '../sections/TeamsSection'

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
            <a href="#teams" className="pub-footer-link">Key Contacts</a>
          </div>
          <div className="pub-footer-col">
            <div className="pub-footer-col-title">Resources</div>
            <a href="#support" className="pub-footer-link">Support Process</a>
            <a href="/vouchers/claim" className="pub-footer-link">Claim Voucher</a>
            <a href="/catalogue" className="pub-footer-link">Catalogue</a>
          </div>
          <div className="pub-footer-col">
            <div className="pub-footer-col-title">Connect</div>
            <a href="#faq" className="pub-footer-link">FAQ</a>
            <a href="#gallery" className="pub-footer-link">Events Gallery</a>
          </div>
        </div>
      </div>

      <div className="pub-footer-bottom">
        <span>© 2026 IEEE / Orange Digital Center Partnership. All rights reserved.</span>
        <span className="pub-footer-divider">·</span>
        <span>Built for the IEEE / ODC ecosystem</span>
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <KpiSection />
      <PartnershipOverviewSection />
      <GallerySection />
      <SupportProcessSection />
      <FaqSection />
      <TeamsSection />
      <LogoStrip />
      <SiteFooter />
    </>
  )
}
