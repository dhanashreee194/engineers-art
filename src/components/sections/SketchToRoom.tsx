import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
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

/**
 * Immersive circular gallery: wide center viewport + orbital side peeks.
 * Drag / swipe rotates scenes; no large arrow chrome.
 */
function ImmersiveWorld({
  reduced,
  active,
  onChange,
  brand,
}: {
  reduced: boolean
  active: number
  onChange: (index: number) => void
  brand: ReactNode
}) {
  const len = SLIDES.length
  const prevIndex = (active - 1 + len) % len
  const nextIndex = (active + 1) % len
  const slide = SLIDES[active]
  const prevSlide = SLIDES[prevIndex]
  const nextSlide = SLIDES[nextIndex]

  const stageRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const dragX = useMotionValue(0)
  const dragSpring = useSpring(dragX, { stiffness: 220, damping: 28, mass: 0.4 })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.4 })
  const smy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.4 })
  const parallaxX = useTransform(smx, [-0.5, 0.5], [8, -8])
  const parallaxY = useTransform(smy, [-0.5, 0.5], [5, -5])

  function go(delta: number) {
    onChange((active + delta + len) % len)
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current == null) return
    dragX.set((e.clientX - dragStartX.current) * 0.45)
  }

  function onPointerUp() {
    if (dragStartX.current == null) return
    const dx = dragX.get() / 0.45
    dragStartX.current = null
    setDragging(false)
    dragX.set(0)
    if (Math.abs(dx) > 56) go(dx < 0 ? 1 : -1)
  }

  function onStageMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || dragging || !stageRef.current) return
    const r = stageRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 overflow-hidden bg-ink select-none"
      onMouseMove={onStageMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={`wash-${slide.id}`}
            src={slide.image}
            alt=""
            className="h-full w-full object-cover blur-3xl brightness-[0.35] saturate-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(10,10,10,0.72)_100%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <motion.div
          className="absolute h-[min(78%,640px)] w-[min(118%,1100px)] rounded-[50%] border border-white/15"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={
            reduced
              ? undefined
              : { duration: 56, ease: 'linear', repeat: Infinity }
          }
        />
        <motion.div
          className="absolute h-[min(58%,480px)] w-[min(92%,860px)] rounded-[50%] border border-dashed border-white/20"
          animate={reduced ? undefined : { rotate: -360 }}
          transition={
            reduced
              ? undefined
              : { duration: 72, ease: 'linear', repeat: Infinity }
          }
        />
      </div>

      <motion.div
        className={cn(
          'absolute inset-x-0 top-[4%] bottom-[7.5rem] px-2 md:top-[5%] md:bottom-[8.5rem] md:px-4',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{
          perspective: 1400,
          x: reduced ? 0 : parallaxX,
          y: reduced ? 0 : parallaxY,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div
          className="mx-auto flex h-full w-full max-w-[1400px] items-center gap-2 md:gap-3"
          style={{
            transformStyle: 'preserve-3d',
            x: dragSpring,
          }}
        >
          {/* Previous peek — left orbit */}
          <motion.button
            type="button"
            aria-label={`Previous: ${prevSlide.label}`}
            onClick={() => onChange(prevIndex)}
            className="relative hidden h-[72%] w-[12%] shrink-0 overflow-hidden rounded-2xl border border-white/15 focus-visible:outline-focus md:block"
            initial={false}
            animate={
              reduced
                ? { opacity: 0.55, rotateY: 0, scale: 0.92 }
                : { opacity: 0.7, rotateY: 22, scale: 0.92 }
            }
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            style={{ transformOrigin: 'right center' }}
          >
            <img
              src={prevSlide.image}
              alt=""
              className="h-full w-full object-cover brightness-75"
              draggable={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/35" />
          </motion.button>

          {/* Center viewport — dominant */}
          <motion.article
            key={slide.id}
            className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-white/25 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
            initial={
              reduced
                ? false
                : { opacity: 0.6, scale: 0.96, rotateY: 8 }
            }
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 20 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                fetchPriority="high"
                initial={
                  reduced
                    ? false
                    : { opacity: 0, scale: 1.08 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.65, ease: easeOutExpo }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/20" />

            <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 md:p-7">
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.16em] text-on-maroon/75">
                  {slide.code}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-on-maroon md:text-4xl">
                  {slide.label}
                </h2>
              </div>
              <svg
                className="size-11 text-on-maroon/65 md:size-12"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.25"
                />
                <motion.circle
                  key={`arc-${active}`}
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="2.4"
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

            <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-16 md:px-8 md:pb-7">
              {brand}
            </div>
          </motion.article>

          {/* Next peek — right orbit */}
          <motion.button
            type="button"
            aria-label={`Next: ${nextSlide.label}`}
            onClick={() => onChange(nextIndex)}
            className="relative hidden h-[72%] w-[12%] shrink-0 overflow-hidden rounded-2xl border border-white/15 focus-visible:outline-focus md:block"
            initial={false}
            animate={
              reduced
                ? { opacity: 0.55, rotateY: 0, scale: 0.92 }
                : { opacity: 0.7, rotateY: -22, scale: 0.92 }
            }
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            style={{ transformOrigin: 'left center' }}
          >
            <img
              src={nextSlide.image}
              alt=""
              className="h-full w-full object-cover brightness-75"
              draggable={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/35" />
          </motion.button>
        </motion.div>

        <button
          type="button"
          aria-label="Previous space"
          onClick={() => go(-1)}
          className="absolute left-1 top-1/2 z-50 -translate-y-1/2 text-on-maroon/45 transition hover:text-on-maroon focus-visible:outline-focus md:left-2"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next space"
          onClick={() => go(1)}
          className="absolute right-1 top-1/2 z-50 -translate-y-1/2 text-on-maroon/45 transition hover:text-on-maroon focus-visible:outline-focus md:right-2"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      </motion.div>

      <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center gap-2 md:bottom-6">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to ${s.label}`}
            aria-current={i === active}
            onClick={() => onChange(i)}
            className={cn(
              'rounded-full transition focus-visible:outline-focus',
              i === active
                ? 'h-2 w-5 bg-on-maroon'
                : 'size-2 bg-on-maroon/35 hover:bg-on-maroon/60',
            )}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Opening: three pencils draw → photos resolve → immersive circular gallery.
 */
export function SketchToRoom() {
  const reduced = usePrefersReducedMotion()
  const [showBrand, setShowBrand] = useState(reduced)
  const [sliderMode, setSliderMode] = useState(false)
  const [active, setActive] = useState(0)
  const progress = useMotionValue(reduced ? 1 : 0)
  const enteredSlider = useRef(false)
  const pauseAuto = useRef(false)

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

  useEffect(() => {
    if (!sliderMode || reduced) return
    const id = window.setInterval(() => {
      if (pauseAuto.current) return
      setActive((i) => (i + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [sliderMode, reduced, active])

  const { primaryCta, secondaryCta } = homeHero

  function handleChange(index: number) {
    pauseAuto.current = true
    setActive(index)
    window.setTimeout(() => {
      pauseAuto.current = false
    }, SLIDE_MS)
  }

  const brandBlock = showBrand ? (
    <motion.div
      className="mx-auto flex max-w-xl flex-col items-center text-center"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeOutExpo }}
    >
      <div>
        <SplitHeading
          as="h1"
          text={site.name}
          className={cn(
            'justify-center font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold tracking-tight',
            sliderMode ? 'text-on-maroon' : 'text-ink',
          )}
          delay={0.05}
        />
      </div>
      <p
        className={cn(
          'mt-1.5 max-w-lg font-display text-sm md:text-base',
          sliderMode ? 'text-on-maroon/85' : 'text-steel',
        )}
      >
        {site.tagline}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Magnetic>
          <ButtonLink to={primaryCta.href}>{primaryCta.label}</ButtonLink>
        </Magnetic>
        <Magnetic strength={0.2}>
          <ButtonLink
            to={secondaryCta.href}
            variant="secondary"
            className={
              sliderMode
                ? 'border-on-maroon/45 bg-page/15 text-on-maroon backdrop-blur-sm hover:bg-page hover:text-ink'
                : undefined
            }
          >
            {secondaryCta.label}
          </ButtonLink>
        </Magnetic>
      </div>
    </motion.div>
  ) : null

  return (
    <section
      aria-label={`${site.name} — sketch to finished interiors`}
      className={cn(
        'relative flex min-h-dvh flex-col overflow-hidden pt-[4.5rem] md:pt-20',
        sliderMode ? 'bg-ink' : 'bg-page',
      )}
    >
      {!sliderMode ? (
        <>
          <div className="hero-mesh absolute inset-0" aria-hidden />
          <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden />
        </>
      ) : null}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <AnimatePresence mode="wait">
          {!sliderMode ? (
            <motion.div
              key="trio"
              className="flex min-h-0 flex-1 flex-col px-3 pb-4 sm:px-5 lg:px-8"
              exit={
                reduced
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.92,
                      filter: 'blur(10px)',
                      transition: { duration: 0.7, ease: easeOutExpo },
                    }
              }
            >
              <div className="mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 flex-col gap-3 md:gap-4">
                <div className="relative mt-2 min-h-[58vh] w-full flex-1 sm:mt-3 md:min-h-[62vh]">
                  <div className="absolute inset-0 grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3">
                    {PANELS.map((panel) => (
                      <SketchPanel
                        key={panel.id}
                        panel={panel}
                        reduced={reduced}
                        sharedProgress={progress}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative flex min-h-[6.5rem] shrink-0 items-center justify-center pb-1 pt-1 md:min-h-[8rem]">
                  <motion.div
                    style={
                      reduced
                        ? undefined
                        : { opacity: brandOpacity, y: brandY }
                    }
                  >
                    {brandBlock}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="world"
              className="relative min-h-0 flex-1"
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      clipPath: 'circle(0% at 50% 50%)',
                    }
              }
              animate={{
                opacity: 1,
                clipPath: 'circle(160% at 50% 50%)',
              }}
              transition={{ duration: 1.2, ease: easeOutExpo }}
            >
              <ImmersiveWorld
                reduced={reduced}
                active={active}
                onChange={handleChange}
                brand={brandBlock}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
