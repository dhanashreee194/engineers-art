import { CheckCircle2 } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { whyUs } from '@/content/home'

export function WhyUs() {
  return (
    <Section tone="muted" aria-labelledby="why-us-heading">
      <FadeIn className="max-w-3xl">
        <Heading level={2} eyebrow={whyUs.eyebrow} id="why-us-heading">
          {whyUs.title}
        </Heading>
        <Text variant="subhead" className="mt-4">
          {whyUs.description}
        </Text>
      </FadeIn>

      <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
        {whyUs.items.map((item) => (
          <StaggerItem key={item.title}>
            <div className="flex gap-4 rounded-md border border-border bg-page p-5">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-copper-600"
                aria-hidden
              />
              <div>
                <h3 className="font-display text-xl font-semibold text-primary">
                  {item.title}
                </h3>
                <Text className="mt-2">{item.body}</Text>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn className="mt-10">
        <ButtonLink to={whyUs.cta.href}>{whyUs.cta.label}</ButtonLink>
      </FadeIn>
    </Section>
  )
}
