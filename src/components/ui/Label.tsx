import type { LabelHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
  children: ReactNode
}

export function Label({
  className,
  required,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn('mb-1.5 block text-sm font-medium text-primary', className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="text-error" aria-hidden>
          {' '}
          *
        </span>
      ) : null}
    </label>
  )
}
