import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'neutral' | 'copper' | 'navy' | 'inverse'
  children: ReactNode
}

const tones = {
  neutral: 'bg-muted text-primary border border-border',
  copper: 'bg-copper-100 text-ink',
  navy: 'bg-cool-grey/50 text-ink',
  inverse: 'bg-page text-steel border border-border',
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
