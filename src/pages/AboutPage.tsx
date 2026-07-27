import { ButtonLink } from '@/components/ui/ButtonLink'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { ContactBand } from '@/components/sections/ContactBand'
import { ClientsLogoWall } from '@/components/sections/ClientsLogoWall'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { aboutPage } from '@/content/pages'
import { Media } from '@/components/ui/Media'
import { media } from '@/content/site'

export function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="About">
            {aboutPage.hero.title}
          </Heading>
          <Text variant="inverse" className="mt-4 text-subhead">
            {aboutPage.hero.description}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Request Quote
          </ButtonLink>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-6">
            <Heading level={2}>{aboutPage.story.title}</Heading>
            <div className="mt-4 space-y-4">
              {aboutPage.story.body.map((p) => (
                <Text key={p}>{p}</Text>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-6" delay={0.06}>
            <Media src={media.about} alt="Artistic Engineers craftsmanship" aspect="4/3" />
          </FadeIn>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn>
            <Heading level={2}>{aboutPage.vision.title}</Heading>
            <Text className="mt-4">{aboutPage.vision.body}</Text>
          </FadeIn>
          <FadeIn delay={0.06}>
            <Heading level={2}>{aboutPage.mission.title}</Heading>
            <Text className="mt-4">{aboutPage.mission.body}</Text>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <Heading level={2} eyebrow="What we stand for">
          Principles that shape every build
        </Heading>
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPage.values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="border-t-2 border-copper-600 pt-4">
                <h3 className="font-display text-xl font-semibold text-primary">
                  {value.title}
                </h3>
                <Text className="mt-2">{value.body}</Text>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <ButtonLink to="/capabilities" variant="secondary" className="mt-10">
          View capabilities
        </ButtonLink>
      </Section>

      <ClientsLogoWall />
      <ContactBand />
    </>
  )
}
