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
  hero: '/images/hero-bedroom.jpg',
  living: '/images/hero-living.jpg',
  about: '/images/space-lounge.jpg',
  plant: '/images/space-kitchen.jpg',
  quality: '/images/space-office.jpg',
  workshop: '/images/space-suite.jpg',
  exterior: '/images/space-office.jpg',
  interior: '/images/space-living.jpg',
  bedroom: '/images/space-bedroom.jpg',
} as const
