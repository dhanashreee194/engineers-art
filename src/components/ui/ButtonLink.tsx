import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-action text-on-action hover:bg-action-hover focus-visible:outline-focus shadow-sm',
  secondary:
    'bg-abyss text-bone hover:bg-pine focus-visible:outline-focus',
  ghost:
    'bg-transparent text-abyss border border-abyss/20 hover:border-abyss hover:bg-muted',
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
