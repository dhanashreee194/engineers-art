import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { clients } from '@/content/home'

export function ClientsLogoWall() {
  return (
    <Section aria-labelledby="clients-heading">
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Heading level={2} eyebrow={clients.eyebrow} id="clients-heading">
          {clients.title}
        </Heading>
        <ButtonLink to={clients.cta.href} variant="ghost">
          {clients.cta.label}
        </ButtonLink>
      </FadeIn>

      <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {clients.logos.map((logo) => (
          <StaggerItem key={logo.name}>
            <div className="flex h-24 items-center justify-center rounded-md border border-border bg-page px-4">
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-12 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                loading="lazy"
                decoding="async"
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
