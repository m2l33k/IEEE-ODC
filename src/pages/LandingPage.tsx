import { PartnershipOverviewSection } from '../sections/PartnershipOverviewSection'
import { HeroSection } from '../sections/HeroSection'
import { KpiSection } from '../sections/KpiSection'
import { GallerySection } from '../sections/GallerySection'
import { SupportProcessSection } from '../sections/SupportProcessSection'
import { FaqSection } from '../sections/FaqSection'
import { TeamsSection } from '../sections/TeamsSection'

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
    </>
  )
}

