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
    <footer className="border-t border-border bg-ink text-on-maroon">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="space-y-4">
          <p className="font-display text-xl font-semibold text-on-maroon">
            {site.name}
          </p>
          <p className="text-sm leading-relaxed text-on-maroon/75">
            Precision metal engineering and smart space systems from {site.city}.{' '}
            {site.tagline}.
          </p>
        </div>

        <FooterCol title="Company" links={company} />
        <FooterCol title="Solutions" links={solutions} />
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.06em] text-on-maroon/60">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-on-maroon/80">
            <li>{site.address}</li>
            <li>
              <a className="hover:text-on-maroon" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-on-maroon" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="space-y-2">
            {support.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-on-maroon/80 hover:text-on-maroon"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-on-maroon/15">
        <Container className="flex flex-col gap-2 py-4 text-sm text-on-maroon/60 sm:flex-row sm:items-center sm:justify-between">
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
      <p className="text-sm font-semibold uppercase tracking-[0.06em] text-on-maroon/60">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-on-maroon/80 hover:text-on-maroon"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
