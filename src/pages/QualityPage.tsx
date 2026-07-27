import { ButtonLink } from '@/components/ui/ButtonLink'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { ContactBand } from '@/components/sections/ContactBand'
import { InfrastructureSnapshot } from '@/components/sections/InfrastructureSnapshot'
import { QualitySystem } from '@/components/sections/QualitySystem'
import { FadeIn } from '@/components/motion/Reveal'
import { qualityPage } from '@/content/pages'
import { media } from '@/content/site'

export function QualityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Quality' }]} />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Quality">
            {qualityPage.hero.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {qualityPage.hero.description}
          </Text>
          <ButtonLink to="/contact?intent=enquiry" className="mt-8">
            Schedule discussion
          </ButtonLink>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-6">
            <Heading level={2}>Standards & materials</Heading>
            <ul className="mt-4 space-y-3 text-secondary">
              {qualityPage.standards.map((item) => (
                <li key={item} className="border-l-2 border-copper-600 pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn className="lg:col-span-6" delay={0.06}>
            <Media
              src={media.quality}
              alt="Quality and finish discipline at Artistic Engineers"
              aspect="4/3"
            />
          </FadeIn>
        </div>
      </Section>

      <QualitySystem compact={false} />
      <InfrastructureSnapshot />
      <ContactBand />
    </>
  )
}
