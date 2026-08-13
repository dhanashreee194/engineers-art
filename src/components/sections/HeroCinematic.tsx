import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Magnetic } from '@/components/motion/Magnetic'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { homeHero } from '@/content/home'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

/**
 * Tandjung Sari–inspired first view:
 * full-bleed living interior, centered brand, pin + zoom on scroll.
 */
export function HeroCinematic() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.35,
  })

  const imageScale = useTransform(smooth, [0, 0.7, 1], [1, 1.12, 1.18])
  const brandOpacity = useTransform(smooth, [0, 0.35, 0.55], [1, 1, 0])
  const brandY = useTransform(smooth, [0, 0.55], [0, -40])
  const brandScale = useTransform(smooth, [0, 0.55], [1, 0.92])
  const veilOpacity = useTransform(smooth, [0, 0.45, 0.85], [0.18, 0.32, 0.48])
  const ctaOpacity = useTransform(smooth, [0, 0.25, 0.5], [1, 0.85, 0])
  const cueOpacity = useTransform(smooth, [0, 0.2, 0.4], [0.85, 0.5, 0])
  const contentRise = useTransform(smooth, [0.45, 0.95], ['42%', '0%'])
  const contentOpacity = useTransform(smooth, [0.42, 0.65], [0, 1])

  const { title, description, primaryCta, secondaryCta, image } = homeHero

  return (
    <section
      ref={ref}
      aria-labelledby="home-hero-heading"
      className="relative h-[220vh] bg-ink"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Full-bleed living interior */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale: imageScale }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute inset-0 bg-ink"
          style={reduced ? { opacity: 0.32 } : { opacity: veilOpacity }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/15"
        />

        {/* Centered brand — hotel-style first view */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          style={
            reduced
              ? undefined
              : { opacity: brandOpacity, y: brandY, scale: brandScale }
          }
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-on-maroon/80">
            Interior studio · Nashik
          </p>
          <h1
            id="home-hero-heading"
            className="mt-5 font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold tracking-tight text-on-maroon"
          >
            {site.name}
          </h1>
          <p className="mt-4 max-w-md font-display text-lg text-on-maroon/85 md:text-xl">
            {site.tagline}
          </p>
        </motion.div>

        {/* Bottom CTA row — fades as you scroll into story */}
        <motion.div
          className="absolute bottom-24 left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-3 px-6 md:bottom-28"
          style={reduced ? undefined : { opacity: ctaOpacity }}
        >
          <Magnetic>
            <ButtonLink
              to={primaryCta.href}
              className="bg-on-maroon text-ink hover:bg-snow hover:text-ink"
            >
              {primaryCta.label}
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.2}>
            <ButtonLink
              to={secondaryCta.href}
              variant="secondary"
              className="border-on-maroon/55 text-on-maroon hover:bg-on-maroon hover:text-ink"
            >
              {secondaryCta.label}
            </ButtonLink>
          </Magnetic>
        </motion.div>

        {/* Keep scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-on-maroon/75"
          style={reduced ? undefined : { opacity: cueOpacity }}
          aria-hidden
        >
          <span className="text-[0.65rem] uppercase tracking-[0.22em]">
            Keep scroll
          </span>
          <ChevronDown className="size-4 animate-bounce" />
        </motion.div>

        {/* Rising story card — reveals as hero zooms */}
        <motion.div
          className={cn(
            'absolute inset-x-0 bottom-0 z-30 border-t border-border bg-page px-6 py-10 md:px-10 md:py-14',
          )}
          style={
            reduced
              ? { opacity: 1 }
              : { y: contentRise, opacity: contentOpacity }
          }
        >
          <div className="container-ae grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-steel">
                Living spaces
              </p>
              <p className="mt-3 max-w-2xl font-display text-h2 font-semibold tracking-tight text-ink">
                {title}
              </p>
            </div>
            <p className="max-w-md text-body-lg text-steel md:justify-self-end">
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
