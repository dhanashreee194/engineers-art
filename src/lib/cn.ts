import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom type scale (`text-body`, `text-h2`, …) must not collide with
 * color utilities (`text-on-maroon`, `text-steel`, …).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-hero',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-subhead',
        'text-body',
        'text-body-lg',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
