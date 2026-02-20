import { PartnershipOverviewSection } from '../sections/PartnershipOverviewSection'
import { HeroSection } from '../sections/HeroSection'
import { KpiSection } from '../sections/KpiSection'
import { GallerySection } from '../sections/GallerySection'
import { SupportProcessSection } from '../sections/SupportProcessSection'
import { FaqSection } from '../sections/FaqSection'
import { TeamsSection } from '../sections/TeamsSection'

const logoSources = ['/logo/hero1.jpg']

function LogoStrip() {

  return (
    <section className="layout-section logo-strip-section">
      <div className="logo-strip-inner">
        <div className="logo-strip-header">WORKING WITH :</div>
        <div className="logo-strip-viewport">
          <div className="logo-strip-track">
            {logoSources.map((src, index) => (
              <div key={`logo-a-${index}`} className="logo-strip-item">
                <img src={src} alt="Partner logo" />
              </div>
            ))}
            {logoSources.map((src, index) => (
              <div key={`logo-b-${index}`} className="logo-strip-item">
                <img src={src} alt="Partner logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <PartnershipOverviewSection />
      <KpiSection />
      <GallerySection />
      <SupportProcessSection />
      <FaqSection />
      <TeamsSection />
      <LogoStrip />
    </>
  )
}
