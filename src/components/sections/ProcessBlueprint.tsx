import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { Magnetic } from '@/components/motion/Magnetic'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { processSteps } from '@/content/home'
import { color } from '@/styles/tokens'
import { cn } from '@/lib/cn'

/**
 * Flagship Maroon & Steel + Living Blueprint process path.
 */
export function ProcessBlueprint() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })
  const raw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  })
  const pathLength = useTransform(raw, [0, 1], [0, 1])
  const calloutOpacity = useTransform(raw, [0.15, 0.35, 1], [0, 1, 1])

  return (
    <Section
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-page"
    >
      <div ref={ref} className="relative">
        <div className="max-w-2xl">
          <Heading level={2} eyebrow="Process · Blueprint" id="process-heading">
            {processSteps.title}
          </Heading>
          <Text className="mt-4" variant="lead">
            Scroll to watch the delivery path draw itself — enquiry to support,
            dimensioned like a shop drawing.
          </Text>
        </div>

        <div className="relative mt-12 md:mt-16">
          <svg
            className="pointer-events-none absolute left-0 top-8 hidden h-[120px] w-full md:block"
            viewBox="0 0 1000 120"
            fill="none"
            aria-hidden
            preserveAspectRatio="none"
          >
            <path d="M40 60 H960" stroke={color.coolGrey} strokeWidth="2" />
            <motion.path
              d="M40 60 H960"
              stroke={color.maroon}
              strokeWidth="2.5"
              style={reduced ? { pathLength: 1 } : { pathLength }}
              strokeLinecap="square"
            />
            {[40, 270, 500, 730, 960].map((x, i) => (
              <motion.g
                key={x}
                style={reduced ? undefined : { opacity: calloutOpacity }}
              >
                <circle cx={x} cy={60} r="5" fill={color.ink} />
                <circle cx={x} cy={60} r="3" fill={color.maroon} />
                <line
                  x1={x}
                  y1={20}
                  x2={x}
                  y2={48}
                  stroke={color.steel}
                  strokeWidth="1"
                  opacity={0.8}
                />
                <text
                  x={x}
                  y={14}
                  textAnchor="middle"
                  fill={color.maroon}
                  fontSize="11"
                  fontFamily="ui-monospace, monospace"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </motion.g>
            ))}
          </svg>

          <ol className="grid gap-8 md:grid-cols-5 md:gap-4 md:pt-28">
            {processSteps.steps.map((step, index) => (
              <motion.li
                key={step.step}
                className={cn(
                  'relative border-l-2 border-maroon pl-4 md:border-l-0 md:pl-0',
                )}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="font-mono text-xs font-semibold tracking-wider text-maroon md:hidden">
                  {step.step}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-primary md:mt-0">
                  {step.title}
                </h3>
                <Text className="mt-2 text-sm">{step.body}</Text>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Magnetic>
            <ButtonLink to={processSteps.cta.href}>
              {processSteps.cta.label}
            </ButtonLink>
          </Magnetic>
          <Magnetic strength={0.2}>
            <ButtonLink to="/capabilities" variant="secondary">
              View capabilities
            </ButtonLink>
          </Magnetic>
        </div>
      </div>
    </Section>
  )
}
