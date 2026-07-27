import { useReducedMotion } from 'framer-motion'
import { motion, type MotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, reducedMotionVariants, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/cn'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
} & MotionProps

export function FadeIn({ children, className, delay = 0, ...props }: FadeInProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={reduce ? reducedMotionVariants : fadeUp}
      transition={reduce ? undefined : { delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={reduce ? undefined : staggerContainer}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={reduce ? reducedMotionVariants : fadeUp}
    >
      {children}
    </motion.div>
  )
}
