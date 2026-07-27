import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full rounded-md border border-grey-300 bg-page px-3 py-2.5 text-body text-primary',
          'placeholder:text-subtle',
          'focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/30',
          invalid && 'border-error focus-visible:ring-error/30',
          className,
        )}
        {...props}
      />
    )
  },
)
