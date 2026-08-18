import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { industries } from '@/content/home'
import { easeOutExpo } from '@/lib/motion'

export function IndustriesGrid() {
  const reduced = useReducedMotion()

  return (
    <Section
      tone="muted"
      aria-labelledby="industries-heading"
      className="overflow-hidden"
    >
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Heading level={2} eyebrow={industries.eyebrow} id="industries-heading">
          {industries.title}
        </Heading>
        <ButtonLink to={industries.cta.href} variant="ghost">
          {industries.cta.label}
        </ButtonLink>
      </FadeIn>

      <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {industries.items.map((item, i) => (
          <StaggerItem key={item.title}>
            <Link
              to={item.href}
              className="group relative block aspect-[4/5] overflow-hidden border border-border focus-visible:outline-focus sm:aspect-[5/6]"
            >
              <motion.img
                src={item.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.08]"
                loading="lazy"
                initial={
                  reduced
                    ? false
                    : { clipPath: 'inset(100% 0 0 0)', scale: 1.08 }
                }
                whileInView={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 1,
                  delay: i * 0.05,
                  ease: easeOutExpo,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent transition duration-500 group-hover:from-ink/90" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="font-mono text-[0.65rem] tracking-[0.16em] text-on-maroon/70">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-on-maroon md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-on-maroon/85 opacity-90 transition group-hover:opacity-100">
                  {item.blurb}
                </p>
                <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-on-maroon/65 transition group-hover:tracking-[0.2em]">
                  Enter →
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
