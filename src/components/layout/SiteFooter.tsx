import { Link } from '@/components/ui/Link'
import { Container } from '@/components/ui/Container'
import { site } from '@/content/site'

const company = [
  { to: '/about', label: 'About' },
  { to: '/quality', label: 'Quality' },
  { to: '/projects', label: 'Projects' },
]

const solutions = [
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/products/custom', label: 'Custom engineering' },
]

const support = [
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy' },
  { to: '/disclaimer', label: 'Disclaimer' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="space-y-4">
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="text-sm leading-relaxed text-white/75">
            Precision metal engineering and smart space systems from {site.city}.{' '}
            {site.tagline}.
          </p>
        </div>

        <FooterCol title="Company" links={company} />
        <FooterCol title="Solutions" links={solutions} />
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white/60">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>{site.address}</li>
            <li>
              <a className="hover:text-white" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="space-y-2">
            {support.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>
            {site.city}, India
          </p>
        </Container>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { to: string; label: string }[]
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white/60">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-white/80 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
