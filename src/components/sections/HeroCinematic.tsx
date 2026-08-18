import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Magnetic } from '@/components/motion/Magnetic'
import { ParallaxFrame } from '@/components/motion/ParallaxFrame'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { homeHero } from '@/content/home'
import { site } from '@/content/site'
import { color, wireOpacity } from '@/styles/tokens'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'

function ArchitectOverlay({ reduced }: { reduced: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M70 140 H340 V380 H70 Z M70 260 H340 M180 140 V380 M120 290 H200 V350 H120 Z"
        stroke={color.wire}
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity={wireOpacity.faint}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: easeOutExpo, delay: 0.35 }}
      />
      <motion.path
        d="M1080 150 H1360 V420 H1080 Z M1140 220 H1300 V320 H1140 Z M1180 180 H1260"
        stroke={color.wire}
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity={wireOpacity.mid}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.9, ease: easeOutExpo, delay: 0.6 }}
      />
      <motion.path
        d="M420 720 H620 M520 680 V760 M820 700 H980"
        stroke={color.wire}
        strokeWidth="1"
        opacity={wireOpacity.faint}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.9 }}
      />
      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.25, duration: 0.5 }}
      >
        <text
          x="70"
          y="128"
          fill={color.ink}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.08em"
        >
          PLAN
        </text>
        <text
          x="1080"
          y="138"
          fill={color.ink}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.08em"
        >
          ELEVATION
        </text>
        <text
          x="480"
          y="780"
          fill={color.ink}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity={0.7}
        >
          3600 mm
        </text>
      </motion.g>
    </svg>
  )
}

/**
 * Architect studio + interior photo + cinematic scroll + entrance wow.
 */
export function HeroCinematic() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(reduced)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.35,
  })

  const imageScale = useTransform(smooth, [0, 0.7, 1], [1, 1.1, 1.16])
  const brandOpacity = useTransform(smooth, [0, 0.35, 0.55], [1, 1, 0])
  const brandY = useTransform(smooth, [0, 0.55], [0, -36])
  const brandScale = useTransform(smooth, [0, 0.55], [1, 0.94])
  const sketchOpacity = useTransform(smooth, [0, 0.4, 0.65], [1, 0.7, 0])
  const ctaOpacity = useTransform(smooth, [0, 0.25, 0.5], [1, 0.85, 0])
  const cueOpacity = useTransform(smooth, [0, 0.2, 0.4], [0.9, 0.55, 0])
  const contentRise = useTransform(smooth, [0.45, 0.95], ['44%', '0%'])
  const contentOpacity = useTransform(smooth, [0.42, 0.65], [0, 1])
  const paperWash = useTransform(smooth, [0, 0.5, 0.9], [0.18, 0.32, 0.48])
  const frameRadius = useTransform(smooth, [0, 0.5], [0, 0])

  const shutter = useMotionValue(reduced ? 0 : 1)
  const shutterSpring = useSpring(shutter, { stiffness: 60, damping: 20 })
  const clipLeft = useTransform(shutterSpring, [1, 0], ['48%', '0%'])
  const clipRight = useTransform(shutterSpring, [1, 0], ['48%', '0%'])
  const photoClip = useTransform(
    [clipLeft, clipRight],
    ([l, r]) => `inset(0 ${r} 0 ${l})`,
  )

  useEffect(() => {
    if (reduced) {
      setEntered(true)
      return
    }
    const id = window.setTimeout(() => {
      shutter.set(0)
      setEntered(true)
    }, 180)
    return () => window.clearTimeout(id)
  }, [reduced, shutter])

  const { title, description, primaryCta, secondaryCta, image } = homeHero

  return (
    <section
      ref={ref}
      aria-label={`${site.name} — interior studio`}
      className="relative h-[220vh] bg-page"
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-page">
        <div className="hero-mesh absolute inset-0" aria-hidden />
        <div
          className="blueprint-grid-dark absolute inset-0 opacity-60"
          aria-hidden
        />

        <ParallaxFrame className="absolute inset-[4%] md:inset-[5%_6%]" strength={14}>
          <motion.div
            className="relative h-full w-full overflow-hidden border border-border"
            style={
              reduced
                ? undefined
                : { scale: imageScale, clipPath: photoClip, borderRadius: frameRadius }
            }
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
              initial={reduced ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.15 }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-page mix-blend-soft-light"
              style={reduced ? { opacity: 0.22 } : { opacity: paperWash }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-page/80 via-transparent to-page/35"
            />

            {/* Soft light sweep across the room */}
            {!reduced ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: '-40%', opacity: 0 }}
                animate={{ x: '280%', opacity: [0, 0.7, 0] }}
                transition={{ duration: 2.2, ease: easeOutExpo, delay: 0.5 }}
              />
            ) : null}
          </motion.div>
        </ParallaxFrame>

        <motion.div
          className="absolute inset-0 z-[5]"
          style={reduced ? undefined : { opacity: sketchOpacity }}
        >
          <ArchitectOverlay reduced={reduced} />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          style={
            reduced
              ? undefined
              : { opacity: brandOpacity, y: brandY, scale: brandScale }
          }
        >
          <motion.div
            className="glass-light max-w-xl px-8 py-8 md:px-12 md:py-10"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
            animate={entered ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.45 }}
          >
            <motion.p
              className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-steel"
              initial={reduced ? false : { opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.55 }}
            >
              Interior studio · Nashik
            </motion.p>
            <div className="mt-4">
              <SplitHeading
                as="h1"
                text={site.name}
                className="justify-center font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold tracking-tight text-ink"
                delay={0.65}
              />
            </div>
            <motion.p
              className="mt-3 font-display text-lg text-steel md:text-xl"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 1 }}
            >
              {site.tagline}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-24 left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-3 px-6 md:bottom-28"
          style={reduced ? undefined : { opacity: ctaOpacity }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 1.15 }}
        >
          <Magnetic>
            <ButtonLink to={primaryCta.href}>{primaryCta.label}</ButtonLink>
          </Magnetic>
          <Magnetic strength={0.2}>
            <ButtonLink
              to={secondaryCta.href}
              variant="secondary"
              className="border-steel bg-page/70 text-ink backdrop-blur-sm hover:bg-steel hover:text-on-maroon"
            >
              {secondaryCta.label}
            </ButtonLink>
          </Magnetic>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-steel"
          style={reduced ? undefined : { opacity: cueOpacity }}
          aria-hidden
        >
          <span className="text-[0.65rem] uppercase tracking-[0.22em]">
            Keep scroll
          </span>
          <ChevronDown className="size-4 animate-bounce" />
        </motion.div>

        <motion.div
          className={cn(
            'absolute inset-x-0 bottom-0 z-30 border-t border-border bg-page px-6 py-10 blueprint-grid md:px-10 md:py-14',
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
                Living spaces · Blueprint
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
