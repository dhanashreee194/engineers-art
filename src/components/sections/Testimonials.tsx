import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { testimonials } from '@/content/home'

export function Testimonials() {
  return (
    <Section tone="muted" aria-labelledby="testimonials-heading">
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Heading
          level={2}
          eyebrow={testimonials.eyebrow}
          id="testimonials-heading"
        >
          {testimonials.title}
        </Heading>
        <ButtonLink to={testimonials.cta.href}>{testimonials.cta.label}</ButtonLink>
      </FadeIn>

      <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
        {testimonials.items.map((item) => (
          <StaggerItem key={item.name}>
            <blockquote className="flex h-full flex-col border-t-2 border-copper-600 bg-page p-6">
              <Text className="flex-1">“{item.quote}”</Text>
              <footer className="mt-6">
                <cite className="not-italic font-display text-lg font-semibold text-primary">
                  {item.name}
                </cite>
              </footer>
            </blockquote>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
