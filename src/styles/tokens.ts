/**
 * Maroon & Steel — single source for non-CSS contexts (WebGL, canvas).
 * Keep in sync with `src/index.css` @theme primitives.
 */
export const color = {
  ink: '#1C2023',
  wine: '#5C1C27',
  maroon: '#822C38',
  steel: '#5E7079',
  coolGrey: '#C6CBCE',
  snow: '#F4F3F1',
  white: '#FCFBFA',
  /** Cream label on maroon / wine fills — never ink or steel */
  onMaroon: '#FCFBFA',
} as const

export type BrandColor = keyof typeof color
