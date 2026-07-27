import {
  AboutTeaser,
  CapabilitiesGrid,
  ClientsLogoWall,
  ContactBand,
  HeroIndustrial,
  IndustriesGrid,
  InfrastructureSnapshot,
  ProcessSteps,
  ProjectsGrid,
  QualitySystem,
  Testimonials,
  TrustBar,
  WhyUs,
} from '@/components/sections'

export function HomePage() {
  return (
    <>
      <HeroIndustrial />
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
      <ProcessSteps />
      <ContactBand />
    </>
  )
}
