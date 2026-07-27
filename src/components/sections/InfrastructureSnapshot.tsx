import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { infrastructure } from '@/content/home'

export function InfrastructureSnapshot() {
  return (
    <Section aria-labelledby="infrastructure-heading">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <FadeIn className="lg:col-span-6">
          <Media
            src={infrastructure.image.src}
            alt={infrastructure.image.alt}
            aspect="4/3"
            className="shadow-md"
          />
        </FadeIn>
        <FadeIn className="lg:col-span-6" delay={0.06}>
          <Heading
            level={2}
            eyebrow={infrastructure.eyebrow}
            id="infrastructure-heading"
          >
            {infrastructure.title}
          </Heading>
          <Text className="mt-4">{infrastructure.body}</Text>
          <Stagger className="mt-8 space-y-4">
            {infrastructure.signals.map((signal) => (
              <StaggerItem key={signal.title}>
                <div className="border-t border-border pt-4">
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {signal.title}
                  </h3>
                  <Text className="mt-1">{signal.body}</Text>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <ButtonLink
            to={infrastructure.cta.href}
            variant="secondary"
            className="mt-8"
          >
            {infrastructure.cta.label}
          </ButtonLink>
        </FadeIn>
      </div>
    </Section>
  )
}
