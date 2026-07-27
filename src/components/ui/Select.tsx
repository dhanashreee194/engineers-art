import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'h-11 w-full rounded-md border border-grey-300 bg-page px-3 text-body text-primary',
        'focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/30',
        invalid && 'border-error focus-visible:ring-error/30',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
})
