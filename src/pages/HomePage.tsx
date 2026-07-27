import {
  AboutTeaser,
  CapabilitiesGrid,
  ClientsLogoWall,
  ContactBand,
  IndustriesGrid,
  InfrastructureSnapshot,
  ProjectsGrid,
  QualitySystem,
  Testimonials,
  TrustBar,
  WhyUs,
} from '@/components/sections'
import { HeroBlueprint } from '@/components/sections/HeroBlueprint'
import { ProcessBlueprint } from '@/components/sections/ProcessBlueprint'

export function HomePage() {
  return (
    <>
      <HeroBlueprint />
      <TrustBar />
      <AboutTeaser />
      <WhyUs />
      <CapabilitiesGrid compact />
      <IndustriesGrid />
      <ProjectsGrid />
      <InfrastructureSnapshot />
      <QualitySystem />
      <ClientsLogoWall />
      <Testimonials />
      <ProcessBlueprint />
      <ContactBand />
    </>
  )
}
