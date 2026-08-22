import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { site } from '@/content/site'

const nav = [
  { to: '/about', label: 'About' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/products', label: 'Products' },
  { to: '/projects', label: 'Projects' },
  { to: '/quality', label: 'Quality' },
  { to: '/industries', label: 'Industries' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const cinematicHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overHero = cinematicHome && !scrolled && !open
  const ink = 'text-ink'
  const muted = 'text-secondary hover:text-ink'

  return (
    <header
      className={cn(
        'z-50 transition-colors duration-300',
        cinematicHome ? 'fixed inset-x-0 top-0' : 'sticky top-0',
        overHero
          ? 'border-b border-border/40 bg-page/70 backdrop-blur-[12px]'
          : 'border-b border-border/80 bg-page/90 backdrop-blur-[12px]',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <NavLink
          to="/"
          className="inline-flex shrink-0 items-center focus-visible:outline-focus"
          aria-label={site.name}
        >
          <img
            src={site.logoLight}
            alt={site.name}
            width={160}
            height={160}
            className="h-11 w-auto object-contain md:h-12"
            decoding="async"
          />
        </NavLink>

        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
                  muted,
                  isActive && ink,
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-ink hover:bg-white focus-visible:outline-focus"
          >
            <Phone className="size-4" aria-hidden />
            Call
          </a>
          <ButtonLink to="/contact?intent=quote" size="sm">
            Request Quote
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-border text-ink xl:hidden focus-visible:outline-focus"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-page xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-white"
              >
                {item.label}
              </NavLink>
            ))}
            <ButtonLink
              to="/contact?intent=quote"
              className="mt-2"
              onClick={() => setOpen(false)}
            >
              Request Quote
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
