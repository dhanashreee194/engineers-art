import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Magnetic } from '@/components/motion/Magnetic'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { homeHero } from '@/content/home'
import { color } from '@/styles/tokens'
import { cn } from '@/lib/cn'

const BlueprintScene = lazy(() =>
  import('@/components/hero/BlueprintScene').then((m) => ({
    default: m.BlueprintScene,
  })),
)

function BlueprintSvgOverlay({ reduced }: { reduced: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M80 120 H420 M80 120 V320 M420 120 V200 H560"
        stroke={color.steel}
        strokeWidth="1"
        initial={reduced ? false : { pathLength: 0, opacity: 0.25 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      <motion.path
        d="M980 160 H1320 M1320 160 V380 M1180 380 H1320"
        stroke={color.maroon}
        strokeWidth="1.2"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      />
      <motion.path
        d="M120 720 H360 M240 680 V760 M1000 640 H1280 M1140 600 V720"
        stroke={color.coolGrey}
        strokeWidth="1"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      />
      <motion.g
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <line
          x1="80"
          y1="340"
          x2="420"
          y2="340"
          stroke={color.maroon}
          strokeWidth="1"
        />
        <text
          x="200"
          y="330"
          fill={color.coolGrey}
          fontSize="12"
          fontFamily="monospace"
        >
          3400 mm
        </text>
      </motion.g>
    </svg>
  )
}

function CountUp({
  value,
  label,
  reduced,
}: {
  value: number
  label: string
  reduced: boolean
}) {
  const [n, setN] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, reduced])

  return (
    <div>
      <p className="font-display text-3xl font-semibold text-snow tabular-nums md:text-4xl">
        {n}
        {label.includes('+') ? '+' : ''}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-cool-grey">
        {label.replace('+', '')}
      </p>
    </div>
  )
}

/** Black & White Living Blueprint hero */
export function HeroBlueprint() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [webglReady, setWebglReady] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15])
  const gridX = useMotionValue(0)
  const gridY = useMotionValue(0)
  const springX = useSpring(gridX, { stiffness: 60, damping: 20 })
  const springY = useSpring(gridY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reduced) return
    const id = window.setTimeout(() => setWebglReady(true), 120)
    return () => window.clearTimeout(id)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 24
      const py = (e.clientY / window.innerHeight - 0.5) * 16
      gridX.set(px)
      gridY.set(py)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, gridX, gridY])

  const { eyebrow, title, description, primaryCta, secondaryCta } = homeHero

  return (
    <section
      ref={ref}
      aria-labelledby="home-hero-heading"
      data-cursor="crosshair"
      className="relative isolate min-h-[min(100vh,960px)] overflow-hidden bg-ink text-snow"
    >
      <div className="hero-mesh absolute inset-0" aria-hidden />

      <motion.div
        aria-hidden
        className="absolute inset-[-10%] blueprint-grid-dark opacity-70"
        style={
          reduced
            ? undefined
            : { x: springX, y: springY, translateY: parallaxY }
        }
      />

      <motion.div className="absolute inset-0" style={reduced ? undefined : { opacity: fade }}>
        <img
          src={homeHero.image.src}
          alt=""
          className="h-full w-full object-cover opacity-20 mix-blend-luminosity"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-wine/50" />
      </motion.div>

      <BlueprintSvgOverlay reduced={reduced} />

      {!reduced && webglReady ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block">
          <Suspense fallback={null}>
            <BlueprintScene />
          </Suspense>
        </div>
      ) : null}

      <div className="container-ae relative z-10 flex min-h-[min(100vh,960px)] flex-col justify-center py-24 md:py-28">
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.12em] text-maroon"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow} · Living Blueprint
          </motion.p>

          <div className="mt-5" id="home-hero-heading">
            <SplitHeading
              text={title}
              className="font-display text-hero font-semibold tracking-tight text-snow"
              delay={0.15}
            />
          </div>

          <motion.p
            className="mt-6 max-w-xl text-body-lg text-cool-grey"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <ButtonLink to={primaryCta.href}>{primaryCta.label}</ButtonLink>
            </Magnetic>
            <Magnetic strength={0.2}>
              <ButtonLink
                to={secondaryCta.href}
                variant="secondary"
                className={cn('border-cool-grey text-snow hover:bg-steel hover:text-on-maroon')}
              >
                {secondaryCta.label}
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-cool-grey/30 pt-8"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <CountUp value={2018} label="Est." reduced={reduced} />
            <CountUp value={5} label="Capabilities" reduced={reduced} />
            <CountUp value={3} label="Product lines" reduced={reduced} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
