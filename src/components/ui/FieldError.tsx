import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement> & {
  id?: string
  children?: ReactNode
}

export function FieldError({ id, className, children, ...props }: FieldErrorProps) {
  if (!children) return null

  return (
    <p
      id={id}
      role="alert"
      className={cn('mt-1.5 text-sm text-error', className)}
      {...props}
    >
      {children}
    </p>
  )
}
