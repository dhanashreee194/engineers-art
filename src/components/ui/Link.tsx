import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Common = {
  className?: string
  underline?: boolean
}

type InternalLink = Common &
  Omit<RouterLinkProps, 'className'> & {
    external?: false
  }

type ExternalLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> & {
    external: true
    to: string
  }

export type LinkProps = InternalLink | ExternalLink

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref,
) {
  const { className, underline = false, ...rest } = props
  const classes = cn(
    'text-blue-600 transition-colors hover:text-navy-800 focus-visible:outline-focus',
    underline && 'underline underline-offset-4',
    className,
  )

  if ('external' in rest && rest.external) {
    const { external: _external, to, ...anchorProps } = rest
    return (
      <a
        ref={ref}
        href={to}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      />
    )
  }

  const { external: _e, ...routerProps } = rest as InternalLink
  return <RouterLink ref={ref} className={classes} {...routerProps} />
})
