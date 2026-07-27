import { cn } from '@/lib/cn'

export function SkipLink({
  href = '#main',
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]',
        'rounded-md bg-navy-950 px-4 py-2 text-sm font-medium text-white',
        className,
      )}
    >
      Skip to main content
    </a>
  )
}
