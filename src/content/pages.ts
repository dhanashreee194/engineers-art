import { site } from '@/content/site'

export const aboutPage = {
  hero: {
    title: 'Engineering smart spaces from Nashik',
    description: site.tagline,
  },
  story: {
    title: 'Our story',
    body: [
      `Artistic Engineers was established in February ${site.established}. We manufacture and trade smart furniture and metal systems with a focus on high quality, space saving, easy handling, and durability.`,
      'Our range includes wall-mounted metal shoe racks, multipurpose smart tables, portable office tables, fabricated safety doors, laser-cut metalwork, residential and commercial shades, and custom engineered solutions.',
    ],
  },
  vision: {
    title: 'Vision',
    body: 'To be a trusted Indian leader in smart, space-saving, and effort-saving engineered systems — remembered for precision, reliability, and thoughtful design.',
  },
  mission: {
    title: 'Mission',
    body: `"${site.tagline}" — by delivering quality products and adopting practical technologies that meet the demands of modern homes, workplaces, and institutions.`,
  },
  values: [
    { title: 'Precision', body: 'Clean detailing and disciplined fabrication.' },
    { title: 'Durability', body: 'Systems built for daily, long-term use.' },
    { title: 'Customization', body: 'Adapted to site constraints and user needs.' },
    { title: 'Service', body: 'Clear communication from enquiry to support.' },
  ],
} as const

export const capabilitiesPage = {
  hero: {
    title: 'Engineering. Fabrication. Delivery.',
    description:
      'Five capability pillars that turn site needs into manufactured outcomes.',
  },
} as const

export const productsPage = {
  hero: {
    title: 'Engineered products for interior and exterior spaces',
    description:
      'Browse interior systems, exterior fabrication, or start a custom enquiry.',
  },
  categories: [
    {
      title: 'Interior systems',
      href: '/products/interior',
      body: 'Smart, space-saving furniture engineered in metal and hybrid constructions.',
      image: '/images/space-living.jpg',
    },
    {
      title: 'Exterior & fabrication',
      href: '/products/exterior',
      body: 'Safety doors, laser cutting, shades, and fabricated exterior systems.',
      image: '/images/space-office.jpg',
    },
    {
      title: 'Custom engineering',
      href: '/products/custom',
      body: 'When the catalog is not enough — we engineer to your brief.',
      image: '/images/hero-living.jpg',
    },
  ],
} as const

export const interiorProducts = [
  { slug: 'metal-shoerack', name: 'Metal Shoerack', image: 'https://www.artisticengineers.in/public/img/products/metal-shoerack.jpg' },
  { slug: 'clothes-dryer', name: 'Clothes Dryer', image: 'https://www.artisticengineers.in/public/img/products/clothes-dryer.jpg' },
  { slug: 'sitting-cube', name: '5-in-1 Sitting Cube', image: 'https://www.artisticengineers.in/public/img/products/sitting-cube.jpg' },
  { slug: 'regular-tables', name: 'Regular Tables', image: 'https://www.artisticengineers.in/public/img/products/regular-tables.jpg' },
  { slug: 'trolly-sofa', name: 'Trolly Sofa', image: 'https://www.artisticengineers.in/public/img/products/trolly-sofa.png' },
  { slug: 'metal-sofa', name: 'Metal Sofa', image: 'https://www.artisticengineers.in/public/img/products/metal-sofa.jpg' },
  { slug: 'sofa-cum-bed', name: 'Sofa-cum-bed', image: 'https://www.artisticengineers.in/public/img/products/sofa-cum-bed-1.png' },
] as const

export const exteriorProducts = [
  { slug: 'laser-cutting', name: 'Laser Cutting', image: 'https://www.artisticengineers.in/public/img/banner/2_2.jpg' },
  { slug: 'ms-safety-door', name: 'MS Fabricated Safety Door', image: 'https://www.artisticengineers.in/public/img/banner/2_2.jpg' },
  { slug: 'gi-french-door', name: 'Galvanized GI Sheet French Door', image: 'https://www.artisticengineers.in/public/img/banner/2_2.jpg' },
  { slug: 'polycarbonate-shade', name: 'Polycarbonate Sheet Shade', image: 'https://www.artisticengineers.in/public/img/banner/2_2.jpg' },
  { slug: 'metal-sheet-shade', name: 'Metal Sheet Shade', image: 'https://www.artisticengineers.in/public/img/banner/2_2.jpg' },
  { slug: 'commercial-shade', name: 'Commercial Shade', image: 'https://www.artisticengineers.in/public/img/banner/2_2.jpg' },
] as const

export const qualityPage = {
  hero: {
    title: 'Quality as an engineering discipline',
    description:
      'Standards, inspection rhythm, and infrastructure signals that protect fit, finish, and durability.',
  },
  standards: [
    'Material selection matched to use-case and environment',
    'Dimension and fit checks at critical stages',
    'Finish review before dispatch',
    'Clear communication on customization constraints',
  ],
} as const

export const industriesPage = {
  hero: {
    title: 'Built for the spaces you operate',
    description: 'Sector-focused solutions across living, working, hosting, and institutional environments.',
  },
} as const

export const projectsPage = {
  hero: {
    title: 'Delivered work, documented clearly',
    description: 'Representative projects across interior systems and exterior fabrication.',
  },
} as const
