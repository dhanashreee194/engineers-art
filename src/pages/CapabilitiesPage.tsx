import { ButtonLink } from '@/components/ui/ButtonLink'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { ContactBand } from '@/components/sections/ContactBand'
import { FadeIn } from '@/components/motion/Reveal'
import { capabilitiesPage } from '@/content/pages'
import { capabilities } from '@/content/home'
import { useParams, Link } from 'react-router-dom'

export function CapabilitiesPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Capabilities' }]}
      />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Capabilities">
            {capabilitiesPage.hero.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {capabilitiesPage.hero.description}
          </Text>
          <ButtonLink to="/contact?intent=enquiry" className="mt-8">
            Talk to Engineering
          </ButtonLink>
        </FadeIn>
      </Section>
      <CapabilitiesGrid />
      <ProcessSteps />
      <ProjectsGrid />
      <ContactBand />
    </>
  )
}

export function CapabilityDetailPage() {
  const { slug } = useParams()
  const item = capabilities.items.find((c) => c.slug === slug)

  if (!item) {
    return (
      <Section>
        <Heading level={1}>Capability not found</Heading>
        <ButtonLink to="/capabilities" className="mt-6">
          Back to capabilities
        </ButtonLink>
      </Section>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Capabilities', href: '/capabilities' },
          { label: item.title },
        ]}
      />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Capability">
            {item.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {item.body}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Get a quote on this capability
          </ButtonLink>
        </FadeIn>
      </Section>
      <Section>
        <Heading level={2}>Scope</Heading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-secondary">
          <li>Requirement capture and practical detailing</li>
          <li>Material and finish recommendations</li>
          <li>Manufacture aligned to agreed specifications</li>
          <li>Delivery coordination and service conversation</li>
        </ul>
        <Text className="mt-8">
          Looking for related work? Explore{' '}
          <Link className="text-blue-600 underline-offset-4 hover:underline" to="/projects">
            projects
          </Link>{' '}
          or{' '}
          <Link className="text-blue-600 underline-offset-4 hover:underline" to="/products">
            products
          </Link>
          .
        </Text>
      </Section>
      <ContactBand />
    </>
  )
}
