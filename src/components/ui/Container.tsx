import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Width = 'default' | 'narrow' | 'wide'

const widthClass: Record<Width, string> = {
  default: 'container-ae',
  narrow: 'container-ae-narrow',
  wide: 'container-ae-wide',
}

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'article'
  width?: Width
  children: ReactNode
}

export function Container({
  as: Comp = 'div',
  width = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp className={cn(widthClass[width], className)} {...props}>
      {children}
    </Comp>
  )
}
