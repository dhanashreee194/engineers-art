import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  body: 'text-body text-primary',
  lead: 'text-body-lg text-secondary',
  muted: 'text-body text-secondary',
  subhead: 'text-subhead font-medium text-secondary',
  inverse: 'text-body text-cool-grey',
} as const

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3'
  variant?: keyof typeof variants
  children: ReactNode
}

export function Text({
  as: Comp = 'p',
  variant = 'body',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Comp className={cn(variants[variant], className)} {...props}>
      {children}
    </Comp>
  )
}
