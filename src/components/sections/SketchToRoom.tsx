import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Magnetic } from '@/components/motion/Magnetic'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { homeHero } from '@/content/home'
import { media, site } from '@/content/site'
import { color } from '@/styles/tokens'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'

/** Slower opening timeline so the draw can be read */
const DRAW_MS = 5600
const REVEAL_MS = 2400
const TOTAL_S = (DRAW_MS + REVEAL_MS) / 1000
const SLIDE_MS = 5200

type PanelConfig = {
  id: string
  label: string
  code: string
  image: string
  alt: string
  guide: string
  paths: readonly string[]
  delay: number
}

const PANELS: PanelConfig[] = [
  {
    id: 'bedroom',
    label: 'Bedroom',
    code: '01 · SUITE',
    image: media.bedroom,
    alt: 'Finished bedroom interior',
    delay: 0,
    guide:
      'M 70 430 L 730 430 L 730 80 L 70 80 L 70 430 M 120 140 L 300 140 L 300 300 L 120 300 Z M 350 340 C 400 280 520 280 570 340 L 590 400 L 330 400 Z M 620 120 L 700 120 L 700 400 L 620 400 Z',
    paths: [
      'M 70 80 H 730 V 430 H 70 Z',
      'M 70 410 H 730',
      'M 120 140 H 300 V 300 H 120 Z M 210 140 V 300',
      'M 350 400 L 370 340 C 410 290 510 290 550 340 L 570 400 Z',
      'M 380 360 H 440 M 460 360 H 530',
      'M 620 120 H 700 V 400 H 620 Z M 620 220 H 700 M 620 310 H 700',
      'M 390 80 V 120 M 370 120 H 410',
      'M 70 450 H 730',
    ],
  },
  {
    id: 'living',
    label: 'Living',
    code: '02 · LOUNGE',
    image: media.living,
    alt: 'Finished living interior',
    delay: 0.2,
    guide:
      'M 80 420 L 720 420 L 720 90 L 80 90 L 80 420 M 140 160 L 320 160 L 320 280 L 140 280 L 140 160 M 380 300 C 420 260 500 260 540 300 L 560 360 L 360 360 L 380 300 M 600 140 L 680 140 L 680 360 L 600 360 Z',
    paths: [
      'M 80 90 H 720 V 420 H 80 Z',
      'M 80 400 H 720',
      'M 140 160 H 320 V 280 H 140 Z M 230 160 V 280 M 140 220 H 320',
      'M 130 280 H 330',
      'M 360 360 L 380 300 C 420 260 500 260 540 300 L 560 360 Z M 370 360 H 550',
      'M 400 320 H 450 M 470 320 H 520',
      'M 600 140 H 680 V 360 H 600 Z M 600 220 H 680 M 600 300 H 680',
      'M 380 90 V 130 M 360 130 H 400',
      'M 80 440 H 720',
    ],
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    code: '03 · WORK',
    image: media.plant,
    alt: 'Finished kitchen interior',
    delay: 0.4,
    guide:
      'M 60 440 L 740 440 L 740 70 L 60 70 L 60 440 M 90 120 L 740 120 M 90 280 L 740 280 M 200 120 L 200 280 M 360 120 L 360 280 M 520 120 L 520 280 M 90 320 L 740 320 L 740 440 L 90 440 Z',
    paths: [
      'M 60 70 H 740 V 440 H 60 Z',
      'M 60 420 H 740',
      'M 90 120 H 740 V 280 H 90 Z',
      'M 200 120 V 280 M 360 120 V 280 M 520 120 V 280',
      'M 90 200 H 740',
      'M 90 320 H 740 V 420 H 90 Z',
      'M 160 340 H 220 V 400 H 160 Z M 400 340 H 460 V 400 H 400 Z',
      'M 60 460 H 740',
    ],
  },
]

/** Extra rooms for the revolving slider after sketch resolve */
const SLIDES = [
  ...PANELS.map((p) => ({
    id: p.id,
    label: p.label,
    code: p.code,
    image: p.image,
    alt: p.alt,
  })),
  {
    id: 'lounge',
    label: 'Lounge',
    code: '04 · LOUNGE',
    image: media.about,
    alt: 'Finished lounge interior',
  },
  {
    id: 'suite',
    label: 'Suite',
    code: '05 · SUITE',
    image: media.workshop,
    alt: 'Finished suite interior',
  },
]

function PencilTip() {
  return (
    <g transform="rotate(-28)" aria-hidden>
      <path d="M0 0 L5 -12 L8 -10 L3 2 Z" fill={color.ink} />
      <path d="M5 -12 L14 -32 L19 -30 L8 -10 Z" fill="#C4A574" />
      <path d="M14 -32 L24 -56 L29 -54 L19 -30 Z" fill={color.ink} />
      <path d="M24 -56 L27 -64 L32 -62 L29 -54 Z" fill="#B85C5C" />
    </g>
  )
}

function SketchStroke({
  d,
  progress,
  start,
  end,
}: {
  d: string
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const pathLength = useTransform(progress, [start, end], [0, 1])
  const opacity = useTransform(progress, [start, start + 0.02, end], [0, 1, 1])

  return (
    <motion.path
      d={d}
      stroke={color.wire}
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={{ pathLength, opacity }}
    />
  )
}

function SketchPanel({
  panel,
  reduced,
  sharedProgress,
}: {
  panel: PanelConfig
  reduced: boolean
  sharedProgress: MotionValue<number>
}) {
  const guideRef = useRef<SVGPathElement>(null)
  const pencilRef = useRef<SVGGElement>(null)
  const pencilOpacity = useMotionValue(0)

  const local = useTransform(sharedProgress, (v) => {
    if (reduced) return 1
    const start = panel.delay / TOTAL_S
    const span = 1 - start
    if (span <= 0) return 1
    return Math.max(0, Math.min(1, (v - start) / span))
  })

  const drawProgress = useTransform(local, [0, 0.58], [0, 1])
  const photoOpacity = useTransform(local, [0.5, 0.82], [0, 1])
  const photoScale = useTransform(local, [0.5, 1], [1.08, 1])
  const sketchOpacity = useTransform(local, [0.58, 0.88], [1, 0])
  const paperWash = useTransform(local, [0.52, 0.85], [1, 0])
  const labelSketch = useTransform(local, [0, 0.55, 0.7], [1, 1, 0])
  const labelPhoto = useTransform(local, [0.62, 0.78], [0, 1])

  useMotionValueEvent(drawProgress, 'change', (v) => {
    const path = guideRef.current
    const pencil = pencilRef.current
    if (!path || !pencil) return
    const len = path.getTotalLength()
    const pt = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len)
    pencil.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    pencilOpacity.set(v <= 0.015 || v >= 0.985 ? 0 : 1)
  })

  useEffect(() => {
    const path = guideRef.current
    const pencil = pencilRef.current
    if (!path || !pencil) return
    const pt = path.getPointAtLength(0)
    pencil.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    if (reduced) pencilOpacity.set(0)
  }, [reduced, pencilOpacity])

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden border border-border bg-white">
      <motion.img
        src={panel.image}
        alt={panel.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={
          reduced
            ? { opacity: 1, scale: 1 }
            : { opacity: photoOpacity, scale: photoScale }
        }
        fetchPriority={panel.id === 'living' ? 'high' : 'auto'}
        decoding="async"
      />

      {!reduced ? (
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-page"
          style={{ opacity: paperWash }}
        />
      ) : null}

      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 500"
        fill="none"
        aria-hidden
        style={reduced ? { opacity: 0.2 } : { opacity: sketchOpacity }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g opacity={0.1} stroke={color.steel} strokeWidth="0.55">
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={120 + i * 100}
              y1={50}
              x2={120 + i * 100}
              y2={450}
            />
          ))}
        </g>

        <path ref={guideRef} d={panel.guide} fill="none" stroke="none" />

        {panel.paths.map((d, i) => {
          const start = i / panel.paths.length
          const end = Math.min(1, (i + 0.9) / panel.paths.length)
          return (
            <SketchStroke
              key={`${panel.id}-${i}`}
              d={d}
              progress={drawProgress}
              start={start}
              end={end}
            />
          )
        })}

        {!reduced ? (
          <motion.g ref={pencilRef} style={{ opacity: pencilOpacity }}>
            <PencilTip />
          </motion.g>
        ) : null}

        <text
          x="70"
          y="55"
          fill={color.steel}
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.1em"
        >
          {panel.code}
        </text>
      </motion.svg>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
        style={reduced ? { opacity: 1 } : { opacity: photoOpacity }}
      />

      {!reduced ? (
        <>
          <motion.span
            className="absolute left-3 top-3 z-10 bg-page/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur-sm"
            style={{ opacity: labelSketch }}
          >
            Sketch
          </motion.span>
          <motion.span
            className="absolute left-3 top-3 z-10 bg-ink/80 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-on-maroon backdrop-blur-sm"
            style={{ opacity: labelPhoto }}
          >
            {panel.label}
          </motion.span>
        </>
      ) : (
        <span className="absolute left-3 top-3 z-10 bg-ink/80 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-on-maroon backdrop-blur-sm">
          {panel.label}
        </span>
      )}
    </div>
  )
}

function RevolvingSlider({
  reduced,
  active,
  onChange,
}: {
  reduced: boolean
  active: number
  onChange: (index: number) => void
}) {
  const slide = SLIDES[active]
  const prev = (active - 1 + SLIDES.length) % SLIDES.length
  const next = (active + 1) % SLIDES.length

  return (
    <div className="relative flex h-full min-h-[58vh] w-full flex-col md:min-h-[62vh]">
      {/* Evolving orbital ring */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="absolute size-[min(92vmin,560px)] rounded-full border border-border"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced
              ? undefined
              : { duration: 26, ease: 'linear', repeat: Infinity }
          }
        >
          <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
          <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-steel" />
          <span className="absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel" />
          <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-steel" />
        </motion.div>
        <motion.div
          className="absolute size-[min(74vmin,440px)] rounded-full border border-dashed border-steel/40"
          animate={reduced ? undefined : { rotate: -360 }}
          transition={
            reduced
              ? undefined
              : { duration: 38, ease: 'linear', repeat: Infinity }
          }
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 items-center gap-3 md:gap-5">
        <button
          type="button"
          aria-label="Previous room"
          onClick={() => onChange(prev)}
          className="relative hidden h-[48%] w-[13%] shrink-0 overflow-hidden border border-border opacity-75 transition hover:opacity-100 focus-visible:outline-focus md:block"
        >
          <img
            src={SLIDES[prev].image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/30" />
        </button>

        <div className="relative min-h-0 flex-1 self-stretch py-2">
          <div className="relative mx-auto h-full min-h-[42vh] w-full max-w-4xl overflow-hidden border border-border bg-muted shadow-md md:min-h-[48vh]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={
                  reduced
                    ? false
                    : {
                        clipPath: 'circle(0% at 50% 50%)',
                        scale: 1.2,
                        rotate: -10,
                        opacity: 0.45,
                      }
                }
                animate={{
                  clipPath: 'circle(145% at 50% 50%)',
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                }}
                exit={
                  reduced
                    ? undefined
                    : {
                        clipPath: 'circle(0% at 50% 50%)',
                        scale: 0.9,
                        rotate: 12,
                        opacity: 0.35,
                      }
                }
                transition={{ duration: 1.05, ease: easeOutExpo }}
              >
                <motion.img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  initial={reduced ? false : { scale: 1.14 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: easeOutExpo }}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-page/10" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${slide.id}`}
                className="absolute bottom-4 left-4 z-10 md:bottom-6 md:left-6"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
              >
                <p className="font-mono text-[0.65rem] tracking-[0.16em] text-on-maroon/85">
                  {slide.code}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-on-maroon md:text-3xl">
                  {slide.label}
                </p>
              </motion.div>
            </AnimatePresence>

            <svg
              className="pointer-events-none absolute inset-2 text-on-maroon/50 md:inset-3"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="0.35"
                opacity="0.35"
              />
              <motion.circle
                key={`arc-${active}`}
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reduced ? 0 : SLIDE_MS / 1000,
                  ease: 'linear',
                }}
                style={{ rotate: -90, transformOrigin: '50% 50%' }}
              />
            </svg>
          </div>
        </div>

        <button
          type="button"
          aria-label="Next room"
          onClick={() => onChange(next)}
          className="relative hidden h-[48%] w-[13%] shrink-0 overflow-hidden border border-border opacity-75 transition hover:opacity-100 focus-visible:outline-focus md:block"
        >
          <img
            src={SLIDES[next].image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/30" />
        </button>
      </div>

      <div className="relative z-10 mt-3 flex shrink-0 items-center justify-center gap-4 pb-1">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => onChange(prev)}
          className="inline-flex size-10 items-center justify-center border border-border bg-page text-ink transition hover:bg-ink hover:text-on-maroon focus-visible:outline-focus"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show ${s.label}`}
              aria-current={i === active}
              onClick={() => onChange(i)}
              className={cn(
                'size-2.5 rounded-full transition',
                i === active ? 'scale-125 bg-ink' : 'bg-steel/40 hover:bg-steel',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next"
          onClick={() => onChange(next)}
          className="inline-flex size-10 items-center justify-center border border-border bg-page text-ink transition hover:bg-ink hover:text-on-maroon focus-visible:outline-focus"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Opening: three pencils draw → photos resolve → revolving circular slider.
 */
export function SketchToRoom() {
  const reduced = usePrefersReducedMotion()
  const [showBrand, setShowBrand] = useState(reduced)
  const [sliderMode, setSliderMode] = useState(false)
  const [active, setActive] = useState(0)
  const progress = useMotionValue(reduced ? 1 : 0)
  const enteredSlider = useRef(false)

  const brandOpacity = useTransform(progress, [0.82, 0.96], [0, 1])
  const brandY = useTransform(progress, [0.82, 0.96], [20, 0])

  function enterSlider() {
    if (enteredSlider.current) return
    enteredSlider.current = true
    setShowBrand(true)
    setSliderMode(true)
  }

  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= 0.82) setShowBrand(true)
    if (v >= 0.98) {
      window.setTimeout(() => enterSlider(), 400)
    }
  })

  useEffect(() => {
    if (reduced) {
      progress.set(1)
      enterSlider()
      return
    }

    const controls = animate(progress, 1, {
      duration: TOTAL_S,
      ease: [0.33, 0.1, 0.25, 1],
      delay: 0.35,
    })

    // Hard fallback — don't rely only on animate onComplete (Strict Mode can cancel it)
    const fallback = window.setTimeout(
      () => enterSlider(),
      Math.round((0.35 + TOTAL_S) * 1000 + 500),
    )

    return () => {
      controls.stop()
      window.clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once for opener timeline
  }, [])

  // Auto-advance revolving slider
  useEffect(() => {
    if (!sliderMode || reduced) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [sliderMode, reduced, active])

  const { primaryCta, secondaryCta } = homeHero

  return (
    <section
      aria-label={`${site.name} — sketch to finished interiors`}
      className="relative flex min-h-dvh flex-col overflow-hidden bg-page pt-[4.5rem] md:pt-20"
    >
      <div className="hero-mesh absolute inset-0" aria-hidden />
      <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pb-4 sm:px-5 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 flex-col gap-3 md:gap-4">
          <div className="relative mt-2 min-h-[58vh] w-full flex-1 sm:mt-3 md:min-h-[62vh]">
            <AnimatePresence mode="wait">
              {!sliderMode ? (
                <motion.div
                  key="trio"
                  className="absolute inset-0 grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3"
                  exit={
                    reduced
                      ? undefined
                      : {
                          opacity: 0,
                          scale: 0.82,
                          rotate: -6,
                          filter: 'blur(8px)',
                          transition: { duration: 0.75, ease: easeOutExpo },
                        }
                  }
                >
                  {PANELS.map((panel) => (
                    <SketchPanel
                      key={panel.id}
                      panel={panel}
                      reduced={reduced}
                      sharedProgress={progress}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="slider"
                  className="absolute inset-0 flex flex-col"
                  initial={
                    reduced
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.78,
                          clipPath: 'circle(0% at 50% 50%)',
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    clipPath: 'circle(160% at 50% 50%)',
                  }}
                  transition={{ duration: 1.15, ease: easeOutExpo }}
                >
                  <RevolvingSlider
                    reduced={reduced}
                    active={active}
                    onChange={(i) => {
                      setActive(i)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative flex min-h-[6.5rem] shrink-0 items-center justify-center pb-1 pt-1 md:min-h-[8rem]">
            {showBrand ? (
              <motion.div
                className="flex flex-col items-center text-center"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                style={
                  reduced || sliderMode
                    ? undefined
                    : { opacity: brandOpacity, y: brandY }
                }
              >
                <div>
                  <SplitHeading
                    as="h1"
                    text={site.name}
                    className="justify-center font-display text-[clamp(1.6rem,3.8vw,2.75rem)] font-semibold tracking-tight text-ink"
                    delay={0.05}
                  />
                </div>
                <p className="mt-1.5 max-w-lg font-display text-sm text-steel md:text-base">
                  {site.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <Magnetic>
                    <ButtonLink to={primaryCta.href}>{primaryCta.label}</ButtonLink>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <ButtonLink to={secondaryCta.href} variant="secondary">
                      {secondaryCta.label}
                    </ButtonLink>
                  </Magnetic>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
