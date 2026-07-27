import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { ContactBand } from '@/components/sections/ContactBand'
import { IndustriesGrid } from '@/components/sections/IndustriesGrid'
import { FadeIn } from '@/components/motion/Reveal'
import { industries } from '@/content/home'
import { industriesPage } from '@/content/pages'

export function IndustriesPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
      />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Industries">
            {industriesPage.hero.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {industriesPage.hero.description}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Request Quote
          </ButtonLink>
        </FadeIn>
      </Section>
      <IndustriesGrid />
      <ContactBand />
    </>
  )
}

export function IndustryDetailPage() {
  const { slug } = useParams()
  const item = industries.items.find(
    (i) => i.href.split('/').pop() === slug,
  )

  if (!item) {
    return (
      <Section>
        <Heading level={1}>Industry not found</Heading>
        <ButtonLink to="/industries" className="mt-6">
          Back to industries
        </ButtonLink>
      </Section>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: item.title },
        ]}
      />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse>
            {item.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {item.blurb}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Sector enquiry
          </ButtonLink>
        </FadeIn>
      </Section>
      <Section>
        <Heading level={2}>Needs we solve</Heading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-secondary">
          <li>Durable systems for high daily use</li>
          <li>Space-efficient layouts and fittings</li>
          <li>Custom sizes when standard SKUs fall short</li>
        </ul>
        <Text className="mt-8">
          Explore related{' '}
          <Link className="text-blue-600 hover:underline" to="/capabilities">
            capabilities
          </Link>{' '}
          and{' '}
          <Link className="text-blue-600 hover:underline" to="/projects">
            projects
          </Link>
          .
        </Text>
      </Section>
      <ContactBand />
    </>
  )
}
