import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

const items = [
  'Bedrooms',
  'Living rooms',
  'Wardrobes',
  'Modular kitchens',
  'Work nooks',
  'Metal fittings',
  'Custom joinery',
  'Smart storage',
]

/** Endless material/room ticker — interior studio signature */
export function RoomTicker({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const row = [...items, ...items]

  return (
    <section
      aria-label="Interior specialities"
      className={cn(
        'overflow-hidden border-y border-border bg-white py-4',
        className,
      )}
    >
      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-10 whitespace-nowrap px-6"
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={
            reduced
              ? undefined
              : { duration: 28, ease: 'linear', repeat: Infinity }
          }
        >
          {row.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex items-center gap-10 font-display text-sm font-medium tracking-[0.06em] text-ink md:text-base"
            >
              {label}
              <span className="inline-block size-1.5 rounded-full bg-steel/50" aria-hidden />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
