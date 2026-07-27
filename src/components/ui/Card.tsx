import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'a'
  interactive?: boolean
  children: ReactNode
}

export function Card({
  as: Comp = 'div',
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(
        'rounded-md border border-border bg-page p-5',
        interactive &&
          'shadow-sm transition-shadow duration-150 hover:shadow-md focus-visible:outline-focus',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
