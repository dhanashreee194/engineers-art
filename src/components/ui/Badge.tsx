import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'neutral' | 'copper' | 'navy' | 'inverse'
  children: ReactNode
}

const tones = {
  neutral: 'bg-muted text-primary',
  copper: 'bg-copper-100 text-abyss',
  navy: 'bg-pine/10 text-abyss',
  inverse: 'bg-bone/10 text-bone',
} as const

export function Badge({
  tone = 'neutral',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
