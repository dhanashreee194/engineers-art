import { useRef, type ReactNode, type MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

/** Soft pointer parallax — like looking through a room aperture */
export function ParallaxFrame({
  children,
  className,
  strength = 18,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.35 })
  const y = useSpring(my, { stiffness: 90, damping: 18, mass: 0.35 })
  const rotateX = useTransform(y, [-strength, strength], [2.2, -2.2])
  const rotateY = useTransform(x, [-strength, strength], [-2.2, 2.2])

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(px * strength)
    my.set(py * strength)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{ x, y, rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
