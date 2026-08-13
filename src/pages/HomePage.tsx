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
import { HeroCinematic } from '@/components/sections/HeroCinematic'
import { HorizontalSpaces } from '@/components/sections/HorizontalSpaces'
import { ProcessBlueprint } from '@/components/sections/ProcessBlueprint'

export function HomePage() {
  return (
    <>
      <HeroCinematic />
      <HorizontalSpaces />
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
