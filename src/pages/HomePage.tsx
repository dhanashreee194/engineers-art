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
import { HorizontalSpaces } from '@/components/sections/HorizontalSpaces'
import { RoomTicker } from '@/components/sections/RoomTicker'
import { SketchToRoom } from '@/components/sections/SketchToRoom'
import { ProcessBlueprint } from '@/components/sections/ProcessBlueprint'

export function HomePage() {
  return (
    <>
      <SketchToRoom />
      <RoomTicker />
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
