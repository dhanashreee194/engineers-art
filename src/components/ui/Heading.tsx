import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const levelClass = {
  1: 'font-display text-h1 font-semibold tracking-tight text-primary',
  2: 'font-display text-h2 font-semibold tracking-tight text-primary',
  3: 'font-display text-h3 font-semibold tracking-tight text-primary',
} as const

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3'
  level?: 1 | 2 | 3
  eyebrow?: string
  inverse?: boolean
  children: ReactNode
}

export function Heading({
  as,
  level = 2,
  eyebrow,
  inverse = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Comp = as ?? (`h${level}` as 'h1' | 'h2' | 'h3')

  return (
    <div className={cn('space-y-3', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'text-xs font-medium uppercase tracking-[0.06em]',
            inverse ? 'text-white/70' : 'text-copper-600',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Comp
        className={cn(levelClass[level], inverse && 'text-white')}
        {...props}
      >
        {children}
      </Comp>
    </div>
  )
}
