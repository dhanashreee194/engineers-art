import { SITE_URL } from '@/content/seo'
import { site } from '@/content/site'
import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: SITE_URL,
    email: site.email,
    telephone: site.phoneDisplay,
    foundingDate: String(site.established),
    slogan: site.tagline,
    logo: `${SITE_URL}/images/brand/logo-light.png`,
    sameAs: [
      'https://www.facebook.com/ArtisticEngineers',
      'https://www.youtube.com/@artisticengineers5659',
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: site.name,
    image: `${SITE_URL}/public/img/slider/slider1.jpg`,
    url: SITE_URL,
    telephone: site.phoneDisplay,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '1, Kothari Plaza, Near Bali Maharaj Mandir, Mumbai Agra Highway, Panchavati',
      addressLocality: 'Nashik',
      postalCode: '422003',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.0203,
      longitude: 73.8298,
    },
    priceRange: '$$',
    areaServed: 'IN',
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: SITE_URL,
    potentialAction: {
      '@type': 'CommunicateAction',
      target: `${SITE_URL}/contact`,
    },
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${SITE_URL}${item.href === '/' ? '' : item.href}` }
        : {}),
    })),
  }
}

export function faqSchema(
  items: { title: string; content: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.content,
      },
    })),
  }
}
