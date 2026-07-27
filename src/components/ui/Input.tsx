import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, type = 'text', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        'h-11 w-full rounded-md border border-grey-300 bg-page px-3 text-body text-primary',
        'placeholder:text-subtle',
        'focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/30',
        invalid && 'border-error focus-visible:ring-error/30',
        className,
      )}
      {...props}
    />
  )
})
