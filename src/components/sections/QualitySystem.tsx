import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { qualityCompact } from '@/content/home'

export function QualitySystem({
  compact = true,
}: {
  compact?: boolean
}) {
  return (
    <Section tone="muted" aria-labelledby="quality-heading">
      <FadeIn className="max-w-2xl">
        <Heading level={2} eyebrow={qualityCompact.eyebrow} id="quality-heading">
          {qualityCompact.title}
        </Heading>
      </FadeIn>

      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {qualityCompact.steps.map((step, index) => (
          <StaggerItem key={step.title}>
            <p className="font-display text-sm font-semibold text-copper-600">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-primary">
              {step.title}
            </h3>
            <Text className="mt-2">{step.body}</Text>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn className="mt-10">
        <ButtonLink to={qualityCompact.cta.href} variant={compact ? 'ghost' : 'secondary'}>
          {qualityCompact.cta.label}
        </ButtonLink>
      </FadeIn>
    </Section>
  )
}
