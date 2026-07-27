import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { ContactBand } from '@/components/sections/ContactBand'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import {
  exteriorProducts,
  interiorProducts,
  productsPage,
} from '@/content/pages'

export function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Products">
            {productsPage.hero.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {productsPage.hero.description}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Request Quote
          </ButtonLink>
        </FadeIn>
      </Section>

      <Section>
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {productsPage.categories.map((cat) => (
            <StaggerItem key={cat.href}>
              <Link
                to={cat.href}
                className="group block focus-visible:outline-focus"
              >
                <Media src={cat.image} alt={cat.title} aspect="4/3" />
                <h2 className="mt-4 font-display text-2xl font-semibold text-primary group-hover:text-navy-800">
                  {cat.title}
                </h2>
                <Text className="mt-2">{cat.body}</Text>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted">
        <Heading level={2}>Don’t see it? We engineer it.</Heading>
        <Text className="mt-3 max-w-xl">
          Custom sizes, finishes, and fabricated systems for your site.
        </Text>
        <ButtonLink to="/products/custom" className="mt-8">
          Custom enquiry
        </ButtonLink>
      </Section>
      <ContactBand />
    </>
  )
}

function ProductIndex({
  title,
  parentLabel,
  category,
  items,
}: {
  title: string
  parentLabel: string
  category: 'interior' | 'exterior'
  items: readonly { slug: string; name: string; image: string }[]
}) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: parentLabel },
        ]}
      />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse>
            {title}
          </Heading>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Enquire
          </ButtonLink>
        </FadeIn>
      </Section>
      <Section>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <StaggerItem key={product.slug}>
              <Link
                to={`/products/${category}/${product.slug}`}
                className="group block focus-visible:outline-focus"
              >
                <Media src={product.image} alt={product.name} aspect="4/3" />
                <h2 className="mt-3 font-display text-xl font-semibold text-primary">
                  {product.name}
                </h2>
                <span className="mt-2 inline-block text-sm font-medium text-copper-600">
                  View / Enquire
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <ContactBand />
    </>
  )
}

export function InteriorProductsPage() {
  return (
    <ProductIndex
      title="Interior systems"
      parentLabel="Interior"
      category="interior"
      items={interiorProducts}
    />
  )
}

export function ExteriorProductsPage() {
  return (
    <ProductIndex
      title="Exterior & fabrication"
      parentLabel="Exterior"
      category="exterior"
      items={exteriorProducts}
    />
  )
}

export function CustomProductsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Custom' },
        ]}
      />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse>
            Custom engineering for your site
          </Heading>
          <Text variant="inverse" className="mt-4">
            Share your need, site type, and timeline — we’ll respond with next
            steps.
          </Text>
        </FadeIn>
      </Section>
      <Section>
        <div className="mx-auto max-w-[45rem] rounded-md border border-border p-6">
          <QuoteForm defaultIntent="custom" />
        </div>
        <div className="mx-auto mt-10 max-w-[45rem]">
          <Heading level={2}>What happens next</Heading>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-secondary">
            <li>We review your brief and clarify constraints.</li>
            <li>We propose approach, materials, and indicative timeline.</li>
            <li>We confirm scope and move into manufacture.</li>
          </ol>
        </div>
      </Section>
    </>
  )
}

export function ProductDetailPage({
  category,
}: {
  category: 'interior' | 'exterior'
}) {
  const { slug } = useParams()
  const items = category === 'interior' ? interiorProducts : exteriorProducts
  const product = items.find((p) => p.slug === slug)

  if (!product) {
    return (
      <Section>
        <Heading level={1}>Product not found</Heading>
        <ButtonLink to={`/products/${category}`} className="mt-6">
          Back to catalog
        </ButtonLink>
      </Section>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          {
            label: category === 'interior' ? 'Interior' : 'Exterior',
            href: `/products/${category}`,
          },
          { label: product.name },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Media src={product.image} alt={product.name} aspect="4/3" />
          </div>
          <div className="lg:col-span-5">
            <Heading level={1}>{product.name}</Heading>
            <Text className="mt-4">
              Engineered by Artistic Engineers for durability, practical handling,
              and clean finish. Ask us about sizes, finishes, and site fitment.
            </Text>
            <ul className="mt-6 space-y-2 text-secondary">
              <li>• Customization available on request</li>
              <li>• Built for daily-use durability</li>
              <li>• Enquiry-led quoting</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={`/contact?intent=quote&category=${category}`}>
                Enquire on this product
              </ButtonLink>
              <a
                href={`https://wa.me/918766526860?text=${encodeURIComponent(`Hi, I am interested in ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md border border-navy-950/20 px-5 text-body font-medium text-navy-950 hover:bg-grey-50 focus-visible:outline-focus"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>
      <ContactBand />
    </>
  )
}
