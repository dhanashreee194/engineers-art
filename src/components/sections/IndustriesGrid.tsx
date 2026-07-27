import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { industries } from '@/content/home'

export function IndustriesGrid() {
  return (
    <Section tone="muted" aria-labelledby="industries-heading">
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Heading level={2} eyebrow={industries.eyebrow} id="industries-heading">
          {industries.title}
        </Heading>
        <ButtonLink to={industries.cta.href} variant="ghost">
          {industries.cta.label}
        </ButtonLink>
      </FadeIn>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.items.map((item) => (
          <StaggerItem key={item.title}>
            <Link
              to={item.href}
              className="block h-full border-l-2 border-copper-600 bg-page px-5 py-6 transition hover:bg-grey-50 focus-visible:outline-focus"
            >
              <h3 className="font-display text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <Text className="mt-2">{item.blurb}</Text>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
