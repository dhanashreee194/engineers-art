import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Width = 'default' | 'narrow' | 'wide'

const widthClass: Record<Width, string> = {
  default: 'container-ae',
  narrow: 'container-ae-narrow',
  wide: 'container-ae-wide',
}

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
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
