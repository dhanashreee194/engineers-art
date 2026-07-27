import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

const mechanical = [0.16, 1, 0.3, 1] as const

export function SplitHeading({
  text,
  as: Comp = 'h1',
  className,
  delay = 0,
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <Comp className={className}>{text}</Comp>
  }

  return (
    <Comp className={cn('flex flex-wrap gap-x-[0.28em] gap-y-1', className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden pb-[0.12em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%', rotate: 0.4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.055,
              ease: mechanical,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Comp>
  )
}
