import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'btn-primary shadow-sm focus-visible:outline-focus',
  secondary:
    'bg-transparent text-steel border border-steel hover:bg-steel hover:text-on-maroon focus-visible:outline-focus',
  ghost:
    'bg-transparent text-ink border border-cool-grey hover:border-steel hover:bg-white',
} as const

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-body',
  lg: 'h-12 px-6 text-body-lg',
} as const

export type ButtonLinkProps = RouterLinkProps & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonLinkProps) {
  return (
    <RouterLink
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150',
        variants[variant],
        sizes[size],
        /* White on black — never inherit mid-grey body text */
        variant === 'primary' && 'text-on-maroon hover:text-on-maroon',
        className,
      )}
      {...props}
    />
  )
}
