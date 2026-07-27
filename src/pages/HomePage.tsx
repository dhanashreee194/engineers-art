import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'

/** Temporary home until Phase 6 sections land. */
export function HomePage() {
  return (
    <Section tone="navy" contained={false} className="relative overflow-hidden">
      <div className="container-ae relative py-16 md:py-24 lg:py-28">
        <Heading level={1} as="h1" inverse eyebrow="Artistic Engineers">
          Precision engineered for the spaces you perform in
        </Heading>
        <Text variant="inverse" className="mt-5 max-w-xl">
          Metal fabrication, smart furniture systems, and custom engineering from
          Nashik — built for durability, fit, and finish.
        </Text>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/contact?intent=quote">Request Quote</ButtonLink>
          <ButtonLink
            to="/design-system"
            variant="ghost"
            className="border-white/30 text-white hover:border-white/50 hover:bg-white/10"
          >
            View design system
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
