import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-action text-white hover:bg-action-hover focus-visible:outline-focus shadow-sm',
  secondary:
    'bg-navy-950 text-white hover:bg-navy-800 focus-visible:outline-focus',
  ghost:
    'bg-transparent text-navy-950 border border-navy-950/20 hover:border-navy-950 hover:bg-grey-50',
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
        className,
      )}
      {...props}
    />
  )
}
