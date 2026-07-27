import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-action text-on-action hover:bg-action-hover focus-visible:outline-focus shadow-sm',
  secondary:
    'bg-abyss text-bone hover:bg-pine focus-visible:outline-focus',
  ghost:
    'bg-transparent text-abyss border border-abyss/20 hover:border-abyss hover:bg-muted',
  link: 'bg-transparent text-verdigris underline-offset-4 hover:underline px-0 h-auto',
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
          className,
        )}
        {...props}
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
