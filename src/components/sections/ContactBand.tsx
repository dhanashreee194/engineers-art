import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn } from '@/components/motion/Reveal'
import { contactBand } from '@/content/home'

export function ContactBand() {
  return (
    <Section
      tone="navy"
      aria-labelledby="contact-band-heading"
      className="blueprint-grid"
    >
      <FadeIn className="mx-auto max-w-3xl text-center">
        <Heading level={2} inverse id="contact-band-heading">
          {contactBand.title}
        </Heading>
        <Text variant="inverse" className="mt-4">
          {contactBand.description}
        </Text>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink to={contactBand.primaryCta.href}>
            {contactBand.primaryCta.label}
          </ButtonLink>
          <a
            href={contactBand.secondaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-steel px-5 text-body font-medium text-ink transition hover:bg-steel hover:text-on-maroon focus-visible:outline-focus"
          >
            {contactBand.secondaryCta.label}
          </a>
        </div>
      </FadeIn>
    </Section>
  )
}
