import { useRef, type ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/cn'

/** Subtle scroll zoom / rise for interior photography */
export function ScrollZoom({
  children,
  className,
  from = 1.12,
  to = 1,
}: {
  children: ReactNode
  className?: string
  from?: number
  to?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  })
  const scale = useTransform(smooth, [0, 0.5, 1], [from, to, 1.04])
  const y = useTransform(smooth, [0, 1], ['6%', '-6%'])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        className="h-full w-full will-change-transform"
        style={reduced ? undefined : { scale, y }}
      >
        {children}
      </motion.div>
    </div>
  )
}
