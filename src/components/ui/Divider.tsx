import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode
}

export function Divider({ label, className, ...props }: DividerProps) {
  if (!label) {
    return (
      <hr
        className={cn('border-0 border-t border-border', className)}
        {...props}
      />
    )
  }

  return (
    <div
      className={cn('flex items-center gap-4 text-sm text-subtle', className)}
      role="separator"
      {...props}
    >
      <span className="h-px flex-1 bg-border" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}
