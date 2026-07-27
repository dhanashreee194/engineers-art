import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'neutral' | 'copper' | 'navy' | 'inverse'
  children: ReactNode
}

const tones = {
  neutral: 'bg-grey-100 text-grey-700',
  copper: 'bg-copper-100 text-copper-600',
  navy: 'bg-navy-950/5 text-navy-950',
  inverse: 'bg-white/10 text-white',
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
