/**
 * Prefix public asset paths for GitHub Pages (`/engineers-art/`) and local (`/`).
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = path.replace(/^\//, '')
  return `${base}${normalized}`
}

export const site = {
  name: 'Artistic Engineers',
  tagline: 'Expanding The Space To Perform',
  phoneDisplay: '+91-87665 26860',
  phoneTel: '+918766526860',
  email: 'sales@artisticengineers.in',
  whatsapp: '918766526860',
  address:
    '1, Kothari Plaza, Near Bali Maharaj Mandir, Mumbai Agra Highway, Panchavati, Nashik-422003, Maharashtra (India)',
  established: 2018,
  city: 'Nashik',
} as const

/**
 * First-party local imagery (unique — not the shared stock TV-wall render).
 * Served from /public/images.
 */
export const media = {
  hero: assetUrl('images/hero-bedroom.jpg'),
  living: assetUrl('images/hero-living.jpg'),
  about: assetUrl('images/space-lounge.jpg'),
  plant: assetUrl('images/space-kitchen.jpg'),
  quality: assetUrl('images/space-office.jpg'),
  workshop: assetUrl('images/space-suite.jpg'),
  exterior: assetUrl('images/space-office.jpg'),
  interior: assetUrl('images/space-living.jpg'),
  bedroom: assetUrl('images/space-bedroom.jpg'),
} as const
