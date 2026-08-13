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
import { color, wireOpacity } from '@/styles/tokens'
import { cn } from '@/lib/cn'

const BlueprintScene = lazy(() =>
  import('@/components/hero/BlueprintScene').then((m) => ({
    default: m.BlueprintScene,
  })),
)

/** Floor-plan + elevation line sketches — interior design, not structural */
function InteriorSvgOverlay({ reduced }: { reduced: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
    >
      {/* Living floor plan (left) */}
      <motion.path
        d="M90 160 H380 V420 H90 Z M90 290 H380 M220 160 V420 M140 320 H200 V380 H140 Z M250 200 H340 V280 H250 Z"
        stroke={color.wire}
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity={wireOpacity.mid}
        initial={reduced ? false : { pathLength: 0, opacity: 0.1 }}
        animate={{ pathLength: 1, opacity: wireOpacity.mid }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
      <motion.circle
        cx="300"
        cy="340"
        r="28"
        stroke={color.wire}
        strokeWidth="1"
        opacity={wireOpacity.faint}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      />

      {/* Room elevation (right) — sofa + window wall */}
      <motion.path
        d="M980 180 H1320 V480 H980 Z M1040 260 H1260 V360 H1040 Z M1080 220 H1220 V260 M1140 180 V220"
        stroke={color.wire}
        strokeWidth="1.15"
        strokeLinejoin="round"
        opacity={wireOpacity.strong}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />
      <motion.path
        d="M1060 400 H1240 V455 H1060 Z M1060 400 V370 H1090 V400 M1240 400 V370 H1210 V400"
        stroke={color.wire}
        strokeWidth="1"
        opacity={wireOpacity.mid}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
      />

      {/* Soft labels */}
      <motion.g
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <text
          x="90"
          y="148"
          fill={color.ink}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.08em"
        >
          LIVING · PLAN
        </text>
        <text
          x="980"
          y="168"
          fill={color.ink}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.08em"
        >
          ELEVATION
        </text>
        <line
          x1="90"
          y1="440"
          x2="380"
          y2="440"
          stroke={color.ink}
          strokeWidth="0.8"
          opacity={0.35}
        />
        <text
          x="200"
          y="458"
          fill={color.ink}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          opacity={0.45}
        >
          4200 mm
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
      <p className="font-display text-3xl font-semibold text-ink tabular-nums md:text-4xl">
        {n}
        {label.includes('+') ? '+' : ''}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-steel">
        {label.replace('+', '')}
      </p>
    </div>
  )
}

/** Light studio hero — interior design line animation */
export function HeroBlueprint() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [webglReady, setWebglReady] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25])
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
      const px = (e.clientX / window.innerWidth - 0.5) * 20
      const py = (e.clientY / window.innerHeight - 0.5) * 14
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
      className="relative isolate min-h-[min(100vh,960px)] overflow-hidden bg-page text-ink"
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
          className="h-full w-full object-cover opacity-[0.1] mix-blend-multiply"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-page via-page/92 to-page/50" />
      </motion.div>

      <InteriorSvgOverlay reduced={reduced} />

      {!reduced && webglReady ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <Suspense fallback={null}>
            <BlueprintScene />
          </Suspense>
        </div>
      ) : null}

      <div className="container-ae relative z-10 flex min-h-[min(100vh,960px)] flex-col justify-center py-24 md:py-28">
        <div className="max-w-3xl">
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.12em] text-steel"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow} · Interior studio
          </motion.p>

          <div className="mt-5" id="home-hero-heading">
            <SplitHeading
              text={title}
              className="font-display text-hero font-semibold tracking-tight text-ink"
              delay={0.15}
            />
          </div>

          <motion.p
            className="mt-6 max-w-xl text-body-lg text-steel"
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
                className={cn(
                  'border-steel text-ink hover:bg-steel hover:text-on-maroon',
                )}
              >
                {secondaryCta.label}
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8"
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
