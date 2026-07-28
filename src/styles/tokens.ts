/**
 * Black & White — single source for non-CSS contexts (WebGL, canvas).
 * Keep in sync with `src/index.css` @theme primitives.
 * Token keys match Maroon & Steel for component compatibility.
 */
export const color = {
  ink: '#111111',
  wine: '#000000',
  maroon: '#111111',
  steel: '#5C5C5C',
  coolGrey: '#D4D4D4',
  snow: '#F5F5F5',
  white: '#FFFFFF',
  /** White label on black fills — never ink or steel */
  onMaroon: '#FFFFFF',
} as const

export type BrandColor = keyof typeof color
