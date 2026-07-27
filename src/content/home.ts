import { media, site } from '@/content/site'

export const homeHero = {
  eyebrow: site.name,
  title: 'Precision engineered for the spaces you perform in',
  description:
    'Metal fabrication, smart furniture systems, and custom engineering from Nashik — built for durability, fit, and finish.',
  primaryCta: { label: 'Request Quote', href: '/contact?intent=quote' },
  secondaryCta: { label: 'Explore Capabilities', href: '/capabilities' },
  image: {
    src: media.hero,
    alt: 'Artistic Engineers fabricated metal work and engineered interiors',
  },
} as const

export const trustStats = [
  { label: 'Established', value: String(site.established) },
  { label: 'Base', value: site.city },
  { label: 'Product lines', value: 'Interior · Exterior · Custom' },
  { label: 'Focus', value: 'Precision · Durability' },
] as const

export const aboutTeaser = {
  eyebrow: 'About us',
  title: 'Engineering smart spaces since 2018',
  body: 'Artistic Engineers manufactures and delivers high-quality, space-saving, and durable metal systems — from smart furniture to fabricated doors, shades, and custom work.',
  cta: { label: 'About Artistic Engineers', href: '/about' },
  image: {
    src: media.about,
    alt: 'Artistic Engineers smart furniture and metal craftsmanship',
  },
} as const

export const whyUs = {
  eyebrow: 'Why us',
  title: 'Built like an engineering company, not a catalog shop',
  description:
    'Every enquiry is treated as a specification problem — materials, fit, finish, and delivery.',
  items: [
    {
      title: 'Engineering mindset',
      body: 'Clear scope, practical detailing, and finishes that hold up in daily use.',
    },
    {
      title: 'Full customization',
      body: 'Sizes, layouts, and fabrication adapted to your site and workflow.',
    },
    {
      title: 'Durable construction',
      body: 'Metal systems designed for longevity, handling, and real-world wear.',
    },
    {
      title: 'End-to-end delivery',
      body: 'From design discussion to manufacture, install support, and service.',
    },
  ],
  cta: { label: 'Talk to Engineering', href: '/contact?intent=enquiry' },
} as const

export const capabilities = {
  eyebrow: 'Capabilities',
  title: 'What we engineer and deliver',
  description:
    'A focused set of manufacturing and service capabilities for residential, commercial, and institutional work.',
  items: [
    {
      slug: 'metal-fabrication',
      title: 'Metal fabrication',
      body: 'MS and GI fabrication for doors, frames, and structural fittings.',
      href: '/capabilities/metal-fabrication',
    },
    {
      slug: 'laser-cutting',
      title: 'Laser cutting',
      body: 'Precision profiles and safety-door detailing with clean edges.',
      href: '/capabilities/laser-cutting',
    },
    {
      slug: 'smart-furniture-systems',
      title: 'Smart furniture systems',
      body: 'Space-saving interior systems engineered for compact modern living.',
      href: '/capabilities/smart-furniture-systems',
    },
    {
      slug: 'custom-engineering',
      title: 'Custom engineering',
      body: 'Site-specific solutions when standard SKUs are not enough.',
      href: '/capabilities/custom-engineering',
    },
    {
      slug: 'installation-service',
      title: 'Installation & service',
      body: 'Support from fitment through after-sales service conversations.',
      href: '/capabilities/installation-service',
    },
  ],
  cta: { label: 'View all capabilities', href: '/capabilities' },
} as const

export const industries = {
  eyebrow: 'Industries',
  title: 'Built for the spaces you operate',
  items: [
    { title: 'Residential', href: '/industries/residential', blurb: 'Homes that need smarter storage and durable fittings.' },
    { title: 'Office', href: '/industries/office', blurb: 'Workspaces that demand modular, easy-to-maintain systems.' },
    { title: 'Hospitality', href: '/industries/hospitality', blurb: 'Guest-facing durability with refined presentation.' },
    { title: 'Institutional', href: '/industries/institutional', blurb: 'Schools, clinics, and campuses with heavy daily use.' },
    { title: 'Commercial', href: '/industries/commercial', blurb: 'Retail and commercial sites needing reliable fabrication.' },
    { title: 'Custom OEM', href: '/industries/custom-oem', blurb: 'Partner builds and specialized production runs.' },
  ],
  cta: { label: 'See industries', href: '/industries' },
} as const

export const featuredProjects = {
  eyebrow: 'Projects',
  title: 'Proof in delivered work',
  description: 'Representative scopes across interior systems and exterior fabrication.',
  items: [
    {
      slug: 'smart-interior-fitout',
      title: 'Smart interior systems',
      sector: 'Residential',
      outcome: 'Space-saving metal furniture suite',
      image: media.interior,
    },
    {
      slug: 'fabricated-entry-systems',
      title: 'Fabricated entry systems',
      sector: 'Commercial',
      outcome: 'Safety doors and precision cutting',
      image: media.exterior,
    },
    {
      slug: 'site-custom-metalwork',
      title: 'Site-custom metalwork',
      sector: 'Institutional',
      outcome: 'Custom sizes, finishes, install support',
      image: media.workshop,
    },
  ],
  cta: { label: 'View all projects', href: '/projects' },
} as const

export const infrastructure = {
  eyebrow: 'Infrastructure',
  title: 'Capability you can inspect',
  body: 'From shop-floor fabrication to finish discipline, our infrastructure is organized around repeatable quality — not one-off craft alone.',
  signals: [
    { title: 'Fabrication shop', body: 'Metal cutting, forming, and assembly workflows.' },
    { title: 'Finish readiness', body: 'Attention to edges, coatings, and handling.' },
    { title: 'Delivery readiness', body: 'Packaging and site coordination for install.' },
  ],
  image: {
    src: media.plant,
    alt: 'Artistic Engineers workshop and fabrication context',
  },
  cta: { label: 'Quality & infrastructure', href: '/quality' },
} as const

export const qualityCompact = {
  eyebrow: 'Quality',
  title: 'Quality as an engineering discipline',
  steps: [
    { title: 'Incoming', body: 'Material checks before work begins.' },
    { title: 'In-process', body: 'Fit, weld/joint, and dimension discipline.' },
    { title: 'Final', body: 'Finish review before dispatch.' },
  ],
  cta: { label: 'Our quality system', href: '/quality' },
} as const

export const clients = {
  eyebrow: 'Clients',
  title: 'Trusted by teams who need reliable delivery',
  logos: [
    { name: 'Client partner 1', src: 'https://www.artisticengineers.in/public/img/brand/logo1.jpg' },
    { name: 'Client partner 2', src: 'https://www.artisticengineers.in/public/img/brand/logo2.jpg' },
    { name: 'Client partner 3', src: 'https://www.artisticengineers.in/public/img/brand/logo3.jpg' },
    { name: 'Client partner 4', src: 'https://www.artisticengineers.in/public/img/brand/logo4.jpg' },
    { name: 'Client partner 5', src: 'https://www.artisticengineers.in/public/img/brand/logo5.jpg' },
  ],
  cta: { label: 'Request similar work', href: '/contact?intent=quote' },
} as const

export const testimonials = {
  eyebrow: 'Testimonials',
  title: 'What customers say',
  items: [
    {
      name: 'Krishna Handge',
      quote:
        'I am using the product of Artistic Engineers — good quality product, great service.',
    },
    {
      name: 'Shailesh Jadhav',
      quote:
        'One of the best furniture manufacturers. Top-notch service and professional behaviour. They deliver what they promise.',
    },
    {
      name: 'Pravin Bhile',
      quote:
        'The best furniture and personalised service make Artistic Engineers unique.',
    },
  ],
  cta: { label: 'Get a quote', href: '/contact?intent=quote' },
} as const

export const processSteps = {
  eyebrow: 'Process',
  title: 'From enquiry to installed performance',
  steps: [
    { step: '01', title: 'Enquire', body: 'Share your need, drawings, or site constraints.' },
    { step: '02', title: 'Design', body: 'We clarify scope, materials, and finishes.' },
    { step: '03', title: 'Manufacture', body: 'Fabrication and assembly with inspection points.' },
    { step: '04', title: 'Deliver', body: 'Dispatch coordinated for site readiness.' },
    { step: '05', title: 'Support', body: 'Install guidance and after-sales conversation.' },
  ],
  cta: { label: 'Start your project', href: '/contact?intent=quote' },
} as const

export const contactBand = {
  title: 'Ready to specify your next project?',
  description:
    'Request a quote, talk to engineering, or message us on WhatsApp — we respond from Nashik.',
  primaryCta: { label: 'Submit enquiry', href: '/contact?intent=quote' },
  secondaryCta: {
    label: 'WhatsApp',
    href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Artistic Engineers, I would like to request a quote.')}`,
  },
} as const
