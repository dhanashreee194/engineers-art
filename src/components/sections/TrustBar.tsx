import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { Section } from '@/components/ui/Section'
import { trustStats } from '@/content/home'

export function TrustBar() {
  return (
    <Section tone="muted" className="!py-6 md:!py-8" aria-label="Company highlights">
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat) => (
          <StaggerItem key={stat.label}>
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-subtle">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-primary md:text-2xl">
                {stat.value}
              </p>
            </FadeIn>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
