import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Link } from '@/components/ui/Link'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { media } from '@/content/site'

const panels = [
  {
    title: 'Bedrooms',
    body: 'Calm suites with fitted storage and refined metal detailing.',
    image: media.bedroom,
    href: '/products/interior',
    code: '01',
  },
  {
    title: 'Living rooms',
    body: 'Space-saving systems engineered for everyday living.',
    image: media.living,
    href: '/products/interior',
    code: '02',
  },
  {
    title: 'Smart interiors',
    body: 'Modular furniture for compact modern homes.',
    image: media.interior,
    href: '/products/interior',
    code: '03',
  },
  {
    title: 'Custom spaces',
    body: 'Site-specific layouts when a catalog SKU is not enough.',
    image: media.about,
    href: '/products/custom',
    code: '04',
  },
] as const

function SpaceCard({
  panel,
  progress,
  index,
}: {
  panel: (typeof panels)[number]
  progress: MotionValue<number>
  index: number
}) {
  const start = index / panels.length
  const mid = (index + 0.45) / panels.length
  const end = (index + 1) / panels.length
  const scale = useTransform(progress, [start, mid, end], [0.92, 1.04, 0.94])
  const y = useTransform(progress, [start, mid, end], [28, 0, 18])
  const glow = useTransform(progress, [start, mid, end], [0.35, 1, 0.45])

  return (
    <motion.div style={{ scale, y, opacity: glow }} className="will-change-transform">
      <Link
        to={panel.href}
        className="group relative block w-[min(78vw,420px)] shrink-0 border border-border bg-page focus-visible:outline-focus"
      >
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={panel.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-xs tracking-[0.14em] text-on-maroon/80">
            {panel.code}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-on-maroon">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {panel.title}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-on-maroon/85">{panel.body}</p>
          <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-on-maroon/70 transition group-hover:tracking-[0.2em]">
            Enter room →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

/**
 * Horizontal room runway with focus-scale “wow” on the active panel.
 */
export function HorizontalSpaces() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.4,
  })
  const x = useTransform(smooth, [0, 1], ['0%', '-72%'])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  if (reduced) {
    return (
      <section
        aria-labelledby="spaces-heading"
        className="border-y border-border bg-page py-8 md:py-10"
      >
        <div className="container-ae">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-steel">
            Spaces
          </p>
          <h2
            id="spaces-heading"
            className="mt-3 font-display text-h2 font-semibold text-ink"
          >
            Designed for how you live
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {panels.map((panel) => (
              <Link
                key={panel.title}
                to={panel.href}
                className="group block focus-visible:outline-focus"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={panel.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {panel.title}
                </h3>
                <p className="mt-2 text-sm text-steel">{panel.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      aria-labelledby="spaces-heading"
      className="relative h-[320vh] bg-page"
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <div className="container-ae shrink-0 pb-6 pt-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-steel">
                Spaces · Blueprint scroll
              </p>
              <h2
                id="spaces-heading"
                className="mt-3 max-w-2xl font-display text-h2 font-semibold text-ink"
              >
                Designed for how you live
              </h2>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.16em] text-steel md:block">
              Scroll to tour
            </p>
          </div>
          <div className="mt-6 h-px w-full bg-border">
            <motion.div className="h-full bg-ink" style={{ width: bar }} />
          </div>
        </div>

        <motion.div
          className="flex w-max gap-5 px-4 pb-10 sm:gap-6 sm:px-6 lg:px-8"
          style={{ x }}
        >
          {panels.map((panel, index) => (
            <SpaceCard
              key={panel.title}
              panel={panel}
              progress={smooth}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
