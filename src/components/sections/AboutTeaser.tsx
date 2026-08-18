import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn } from '@/components/motion/Reveal'
import { ScrollZoom } from '@/components/motion/ScrollZoom'
import { aboutTeaser } from '@/content/home'
import { easeOutExpo } from '@/lib/motion'

export function AboutTeaser() {
  const { eyebrow, title, body, cta, image } = aboutTeaser
  const reduced = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.4,
  })
  const line = useTransform(smooth, [0.1, 0.55], ['0%', '100%'])

  return (
    <Section aria-labelledby="about-teaser-heading" className="overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <FadeIn className="lg:col-span-5">
          <Heading level={2} eyebrow={eyebrow} id="about-teaser-heading">
            {title}
          </Heading>
          <Text className="mt-4">{body}</Text>
          <div className="mt-6 h-px w-full max-w-xs bg-border">
            <motion.div
              className="h-full bg-ink"
              style={reduced ? { width: '100%' } : { width: line }}
            />
          </div>
          <ButtonLink to={cta.href} variant="secondary" className="mt-8">
            {cta.label}
          </ButtonLink>
        </FadeIn>

        <div ref={frameRef} className="lg:col-span-7">
          <motion.div
            className="relative border border-border bg-muted"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <ScrollZoom className="aspect-[4/3] md:aspect-[3/2]">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </ScrollZoom>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/25 via-transparent to-page/20"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8 }}
            />
            <motion.span
              className="absolute bottom-4 left-4 bg-page/90 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur-sm md:bottom-5 md:left-5"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6, ease: easeOutExpo }}
            >
              Studio · Nashik
            </motion.span>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
