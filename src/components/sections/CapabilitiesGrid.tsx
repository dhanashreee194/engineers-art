import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
} from 'framer-motion'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { capabilities } from '@/content/home'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'

export function CapabilitiesGrid({
  compact = false,
}: {
  compact?: boolean
}) {
  const reduced = useReducedMotion()
  const items = compact ? capabilities.items.slice(0, 5) : capabilities.items

  return (
    <Section aria-labelledby="capabilities-heading" className="overflow-hidden">
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Heading
            level={2}
            eyebrow={capabilities.eyebrow}
            id="capabilities-heading"
          >
            {capabilities.title}
          </Heading>
          <Text className="mt-4">{capabilities.description}</Text>
        </div>
        {!compact ? (
          <ButtonLink to={capabilities.cta.href} variant="ghost">
            {capabilities.cta.label}
          </ButtonLink>
        ) : null}
      </FadeIn>

      <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const wide = i === 0 || i === 3
          return (
            <StaggerItem
              key={item.slug}
              className={cn(wide && 'sm:col-span-2 lg:col-span-1', i === 0 && 'lg:col-span-2')}
            >
              <Link
                to={item.href}
                className="group relative block h-full min-h-[240px] overflow-hidden border border-border focus-visible:outline-focus md:min-h-[280px]"
              >
                <motion.img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"
                  loading="lazy"
                  initial={reduced ? false : { scale: 1.08, opacity: 0.7 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.1, ease: easeOutExpo }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs tracking-[0.16em] text-on-maroon/75">
                      {item.code}
                    </span>
                    <ArrowUpRight
                      className="size-5 text-on-maroon/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-on-maroon md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-on-maroon/85">
                      {item.body}
                    </p>
                    <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-on-maroon/70 transition group-hover:tracking-[0.2em]">
                      Learn more
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>

      {compact ? (
        <FadeIn className="mt-10">
          <ButtonLink to={capabilities.cta.href}>
            {capabilities.cta.label}
          </ButtonLink>
        </FadeIn>
      ) : null}
    </Section>
  )
}
