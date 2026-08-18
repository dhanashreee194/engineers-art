import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { easeOutExpo } from '@/lib/motion'

/**
 * Interior “room opening” reveal — photo unveils like a curtain / door.
 */
export function CurtainReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0 0% 0 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.15, delay, ease: easeOutExpo }}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.35, delay, ease: easeOutExpo }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
