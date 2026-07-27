import { ButtonLink } from '@/components/ui/ButtonLink'
import { FadeIn } from '@/components/motion/Reveal'
import { homeHero } from '@/content/home'

export function HeroIndustrial() {
  const { eyebrow, title, description, primaryCta, secondaryCta, image } =
    homeHero

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate min-h-[min(92vh,880px)] overflow-hidden bg-navy-950 text-white"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/88 to-navy-950/45"
        aria-hidden
      />
      <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden />

      <div className="container-ae relative flex min-h-[min(92vh,880px)] items-center py-20 md:py-28">
        <FadeIn className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-copper-500">
            {eyebrow}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-4 font-display text-hero font-semibold tracking-tight text-white"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-body-lg text-white/85">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink
              to={secondaryCta.href}
              variant="ghost"
              className="border-white/30 text-white hover:border-white/50 hover:bg-white/10"
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
