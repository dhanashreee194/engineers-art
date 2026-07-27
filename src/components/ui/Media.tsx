import { forwardRef, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const aspects = {
  auto: '',
  video: 'aspect-video',
  square: 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
} as const

export type MediaProps = ImgHTMLAttributes<HTMLImageElement> & {
  aspect?: keyof typeof aspects
  rounded?: boolean
  /** Use for LCP images above the fold */
  priority?: boolean
}

export const Media = forwardRef<HTMLImageElement, MediaProps>(function Media(
  {
    className,
    aspect = 'auto',
    rounded = true,
    loading,
    decoding = 'async',
    alt,
    priority = false,
    ...props
  },
  ref,
) {
  return (
    <img
      ref={ref}
      alt={alt ?? ''}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      decoding={decoding}
      fetchPriority={priority ? 'high' : undefined}
      className={cn(
        'h-full w-full object-cover',
        aspects[aspect],
        rounded && 'rounded-md',
        className,
      )}
      {...props}
    />
  )
})
