import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { processSteps } from '@/content/home'

export function ProcessSteps() {
  return (
    <Section aria-labelledby="process-heading">
      <FadeIn className="max-w-2xl">
        <Heading level={2} eyebrow={processSteps.eyebrow} id="process-heading">
          {processSteps.title}
        </Heading>
      </FadeIn>

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.steps.map((step) => (
          <StaggerItem key={step.step}>
            <p className="font-display text-sm font-semibold text-copper-600">
              {step.step}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-primary">
              {step.title}
            </h3>
            <Text className="mt-2 text-sm">{step.body}</Text>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn className="mt-10">
        <ButtonLink to={processSteps.cta.href}>{processSteps.cta.label}</ButtonLink>
      </FadeIn>
    </Section>
  )
}
