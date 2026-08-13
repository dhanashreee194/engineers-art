import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
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
  },
  {
    title: 'Living rooms',
    body: 'Space-saving systems engineered for everyday living.',
    image: media.living,
    href: '/products/interior',
  },
  {
    title: 'Smart interiors',
    body: 'Modular furniture for compact modern homes.',
    image: media.interior,
    href: '/products/interior',
  },
  {
    title: 'Custom spaces',
    body: 'Site-specific layouts when a catalog SKU is not enough.',
    image: media.about,
    href: '/products/custom',
  },
] as const

/**
 * Horizontal scroll runway inspired by Tandjung Sari’s panel storytelling.
 * Vertical wheel progress translates into a cinematic sideways gallery.
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
      className="relative h-[300vh] bg-page"
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <div className="container-ae shrink-0 pb-8 pt-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-steel">
            Spaces · Scroll sideways
          </p>
          <h2
            id="spaces-heading"
            className="mt-3 max-w-2xl font-display text-h2 font-semibold text-ink"
          >
            Designed for how you live
          </h2>
        </div>

        <motion.div
          className="flex w-max gap-5 px-4 pb-10 sm:gap-6 sm:px-6 lg:px-8"
          style={{ x }}
        >
          {panels.map((panel) => (
            <Link
              key={panel.title}
              to={panel.href}
              className="group relative block w-[min(78vw,420px)] shrink-0 focus-visible:outline-focus"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={panel.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-on-maroon">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {panel.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-on-maroon/85">
                  {panel.body}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
