/**
 * Architect's studio (light) — non-CSS contexts (WebGL, canvas).
 * Keep in sync with `src/index.css` @theme primitives.
 */
export const color = {
  ink: '#141414',
  wine: '#2A2926',
  maroon: '#141414',
  steel: '#5A5A55',
  coolGrey: '#E2DFD8',
  snow: '#F7F6F3',
  white: '#FFFFFF',
  /** Paper label on accent fills */
  onMaroon: '#F7F6F3',
  /** Technical drawing stroke on paper */
  wire: '#1E1E1E',
} as const

/** Faint blueprint line opacity on light paper (18–28%) */
export const wireOpacity = {
  faint: 0.18,
  mid: 0.22,
  strong: 0.28,
} as const

export type BrandColor = keyof typeof color
