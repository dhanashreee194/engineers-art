import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SectionTone = 'light' | 'muted' | 'navy' | 'charcoal'

const toneClass: Record<SectionTone, string> = {
  light: 'bg-page text-secondary',
  muted: 'bg-muted text-secondary',
  navy: 'bg-abyss text-bone blueprint-grid',
  charcoal: 'bg-pine text-bone',
}

export type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'article'
  tone?: SectionTone
  contained?: boolean
  children: ReactNode
}

export function Section({
  as: Comp = 'section',
  tone = 'light',
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp
      className={cn('py-8 md:py-9 lg:py-10', toneClass[tone], className)}
      {...props}
    >
      {contained ? <div className="container-ae">{children}</div> : children}
    </Comp>
  )
}
