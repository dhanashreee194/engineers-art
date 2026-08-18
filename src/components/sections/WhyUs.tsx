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
import { whyUs } from '@/content/home'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'

function WhyRow({
  item,
  index,
}: {
  item: (typeof whyUs.items)[number]
  index: number
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.4,
  })
  const imgY = useTransform(smooth, [0, 1], ['12%', '-12%'])
  const imgScale = useTransform(smooth, [0, 0.5, 1], [1.1, 1, 1.06])
  const reverse = index % 2 === 1

  return (
    <div
      ref={ref}
      className={cn(
        'grid items-stretch gap-0 overflow-hidden border border-border md:grid-cols-2',
        reverse && 'md:[&>*:first-child]:order-2',
      )}
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:min-h-[320px]"
        initial={reduced ? false : { clipPath: 'inset(12% 12% 12% 12%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.05, ease: easeOutExpo }}
      >
        <motion.img
          src={item.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={reduced ? undefined : { y: imgY, scale: imgScale }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-xs tracking-[0.14em] text-on-maroon/85">
          0{index + 1}
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col justify-center bg-page px-6 py-8 md:px-10 md:py-12"
        initial={reduced ? false : { opacity: 0, x: reverse ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.1 }}
      >
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {item.title}
        </h3>
        <Text className="mt-3 max-w-md">{item.body}</Text>
      </motion.div>
    </div>
  )
}

export function WhyUs() {
  return (
    <Section tone="muted" aria-labelledby="why-us-heading" className="overflow-hidden">
      <FadeIn className="max-w-3xl">
        <Heading level={2} eyebrow={whyUs.eyebrow} id="why-us-heading">
          {whyUs.title}
        </Heading>
        <Text variant="subhead" className="mt-4">
          {whyUs.description}
        </Text>
      </FadeIn>

      <div className="mt-10 space-y-5 md:mt-12 md:space-y-6">
        {whyUs.items.map((item, index) => (
          <WhyRow key={item.title} item={item} index={index} />
        ))}
      </div>

      <FadeIn className="mt-10">
        <ButtonLink to={whyUs.cta.href}>{whyUs.cta.label}</ButtonLink>
      </FadeIn>
    </Section>
  )
}
