import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

type Mode = 'default' | 'pointer' | 'crosshair'

/**
 * Living Blueprint signature: precision crosshair / dot cursor on desktop.
 * Disabled for touch and prefers-reduced-motion.
 */
export function BlueprintCursor() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('default')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.45 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.45 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine && !reduced)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('blueprint-cursor-on')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const target = (e.target as HTMLElement | null)?.closest(
        'a, button, [data-cursor], input, textarea, select',
      )
      if (target) {
        setMode(target.getAttribute('data-cursor') === 'crosshair' ? 'crosshair' : 'pointer')
      } else {
        setMode('default')
      }
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('blueprint-cursor-on')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference',
        !visible && 'opacity-0',
      )}
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      {mode === 'crosshair' ? (
        <span className="relative block size-10">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/90" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/90" />
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon" />
        </span>
      ) : (
        <span
          className={cn(
            'block rounded-full border border-white/90 transition-[width,height,background] duration-150',
            mode === 'pointer' ? 'size-10 bg-white/10' : 'size-2.5 bg-white',
          )}
        />
      )}
    </motion.div>
  )
}
