export const SITE_URL = 'https://www.artisticengineers.in'

export type PageSeo = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
}

export const defaultOgImage = '/images/hero-bedroom.jpg'

export const pageSeo: Record<string, PageSeo> = {
  '/': {
    title: 'Artistic Engineers | Precision Metal Engineering & Smart Space Systems',
    description:
      'Nashik-based manufacturer of smart furniture systems, metal fabrication, laser cutting, and custom engineering. Request a quote from Artistic Engineers.',
    path: '/',
  },
  '/about': {
    title: 'About Artistic Engineers | Engineering Smart Spaces Since 2018',
    description:
      'Learn about Artistic Engineers — precision metal engineering and smart space systems from Nashik. Mission: Expanding The Space To Perform.',
    path: '/about',
  },
  '/capabilities': {
    title: 'Capabilities | Fabrication, Laser Cutting & Custom Engineering',
    description:
      'Explore Artistic Engineers capabilities: metal fabrication, laser cutting, smart furniture systems, custom engineering, and installation support.',
    path: '/capabilities',
  },
  '/products': {
    title: 'Products | Interior Systems, Exterior Fabrication & Custom',
    description:
      'Browse engineered interior systems, exterior fabrication products, and custom engineering solutions from Artistic Engineers.',
    path: '/products',
  },
  '/products/interior': {
    title: 'Interior Systems | Smart Furniture by Artistic Engineers',
    description:
      'Space-saving metal furniture and interior systems engineered for durability, fit, and finish.',
    path: '/products/interior',
  },
  '/products/exterior': {
    title: 'Exterior & Fabrication | Doors, Shades & Laser Cutting',
    description:
      'Safety doors, laser cutting, shades, and fabricated exterior systems from Artistic Engineers, Nashik.',
    path: '/products/exterior',
  },
  '/products/custom': {
    title: 'Custom Engineering | Site-Specific Metal Solutions',
    description:
      'Request custom engineering for sizes, finishes, and fabricated systems tailored to your site.',
    path: '/products/custom',
  },
  '/projects': {
    title: 'Projects | Delivered Work by Artistic Engineers',
    description:
      'See representative projects across interior systems and exterior fabrication delivered by Artistic Engineers.',
    path: '/projects',
  },
  '/quality': {
    title: 'Quality & Infrastructure | Engineering Discipline',
    description:
      'How Artistic Engineers approaches materials, inspection, and infrastructure for durable manufactured outcomes.',
    path: '/quality',
  },
  '/industries': {
    title: 'Industries | Residential, Office, Hospitality & More',
    description:
      'Sector solutions for residential, office, hospitality, institutional, commercial, and custom OEM needs.',
    path: '/industries',
  },
  '/contact': {
    title: 'Contact & Request a Quote | Artistic Engineers Nashik',
    description:
      'Request a quote or talk to engineering. Call, WhatsApp, or visit Artistic Engineers in Panchavati, Nashik.',
    path: '/contact',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Artistic Engineers',
    description: 'How Artistic Engineers handles enquiry and contact information.',
    path: '/privacy-policy',
  },
  '/disclaimer': {
    title: 'Disclaimer | Artistic Engineers',
    description: 'Website content and service representation disclaimer.',
    path: '/disclaimer',
  },
  '/design-system': {
    title: 'Design System | Artistic Engineers',
    description: 'Internal design system gallery for the Artistic Engineers website.',
    path: '/design-system',
    noindex: true,
  },
}

export function resolvePageSeo(pathname: string): PageSeo {
  if (pageSeo[pathname]) return pageSeo[pathname]

  if (pathname.startsWith('/capabilities/')) {
    return {
      title: 'Capability | Artistic Engineers',
      description:
        'Capability detail from Artistic Engineers — fabrication, laser cutting, smart systems, and custom engineering.',
      path: pathname,
    }
  }
  if (pathname.startsWith('/products/')) {
    return {
      title: 'Product | Artistic Engineers',
      description:
        'Engineered product detail from Artistic Engineers. Enquire for sizes, finishes, and customization.',
      path: pathname,
      type: 'product',
    }
  }
  if (pathname.startsWith('/projects/')) {
    return {
      title: 'Project | Artistic Engineers',
      description:
        'Project case from Artistic Engineers covering challenge, solution, and outcome.',
      path: pathname,
    }
  }
  if (pathname.startsWith('/industries/')) {
    return {
      title: 'Industry | Artistic Engineers',
      description:
        'Industry-focused solutions from Artistic Engineers for your operating environment.',
      path: pathname,
    }
  }

  return {
    title: 'Artistic Engineers',
    description: pageSeo['/'].description,
    path: pathname,
  }
}
