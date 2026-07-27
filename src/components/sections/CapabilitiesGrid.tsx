import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { capabilities } from '@/content/home'

export function CapabilitiesGrid({
  compact = false,
}: {
  compact?: boolean
}) {
  return (
    <Section aria-labelledby="capabilities-heading">
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Heading
            level={2}
            eyebrow={capabilities.eyebrow}
            id="capabilities-heading"
          >
            {capabilities.title}
          </Heading>
          <Text className="mt-4">{capabilities.description}</Text>
        </div>
        {!compact ? (
          <ButtonLink to={capabilities.cta.href} variant="ghost">
            {capabilities.cta.label}
          </ButtonLink>
        ) : null}
      </FadeIn>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.items.map((item) => (
          <StaggerItem key={item.slug}>
            <Link
              to={item.href}
              className="group flex h-full flex-col rounded-md border border-border bg-page p-5 transition-shadow hover:shadow-md focus-visible:outline-focus"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <ArrowUpRight
                  className="size-5 text-subtle transition group-hover:text-copper-600"
                  aria-hidden
                />
              </div>
              <Text className="mt-3 flex-1">{item.body}</Text>
              <span className="mt-5 text-sm font-medium text-copper-600">
                Learn more
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {compact ? (
        <FadeIn className="mt-10">
          <ButtonLink to={capabilities.cta.href}>
            {capabilities.cta.label}
          </ButtonLink>
        </FadeIn>
      ) : null}
    </Section>
  )
}
