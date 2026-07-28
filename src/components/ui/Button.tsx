import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'btn-primary shadow-sm focus-visible:outline-focus hover:bg-wine',
  secondary:
    'bg-transparent text-steel border border-steel hover:bg-steel hover:text-on-maroon focus-visible:outline-focus',
  ghost:
    'bg-transparent text-ink border border-cool-grey hover:border-steel hover:bg-white',
  link: 'bg-transparent text-steel underline-offset-4 hover:underline px-0 h-auto',
} as const

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-body',
  lg: 'h-12 px-6 text-body-lg',
} as const

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          variant !== 'link' && sizes[size],
          /* White on black — AFTER size so merge never drops label color */
          variant === 'primary' && 'text-on-maroon hover:text-on-maroon',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin text-on-maroon" aria-hidden />
        ) : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
