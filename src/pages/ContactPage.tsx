import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { Accordion } from '@/components/ui/Accordion'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { FadeIn } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqSchema } from '@/components/seo/schema'
import { site } from '@/content/site'
import { useSearchParams } from 'react-router-dom'
import type { QuoteFormValues } from '@/lib/schemas/quote'

const intents: QuoteFormValues['intent'][] = [
  'quote',
  'enquiry',
  'custom',
  'support',
  'suggestion',
  'other',
]

const faqs = [
  {
    title: 'What information helps you quote faster?',
    content:
      'Product or capability needed, approximate sizes, quantity, finish preferences, location, and timeline.',
  },
  {
    title: 'Do you customize beyond the catalog?',
    content:
      'Yes. Custom engineering is a core capability — share drawings or site constraints.',
  },
  {
    title: 'Can we visit?',
    content:
      'Yes. Contact us to schedule a discussion at our Nashik location.',
  },
]

export function ContactPage() {
  const [params] = useSearchParams()
  const raw = params.get('intent')
  const defaultIntent = intents.includes(raw as QuoteFormValues['intent'])
    ? (raw as QuoteFormValues['intent'])
    : 'quote'

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Contact">
            Request a quote / Talk to engineering
          </Heading>
          <Text variant="inverse" className="mt-4">
            Tell us about your project. We respond from {site.city} via phone,
            email, or WhatsApp.
          </Text>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Heading level={2}>Send an enquiry</Heading>
            <div className="mt-6">
              <QuoteForm defaultIntent={defaultIntent} />
            </div>
          </div>
          <div className="space-y-6 rounded-md border border-border bg-muted p-6">
            <Heading level={3}>Direct channels</Heading>
            <ul className="space-y-4 text-body text-secondary">
              <li>
                <a
                  className="font-medium text-navy-950 hover:underline"
                  href={`tel:${site.phoneTel}`}
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-navy-950 hover:underline"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </li>
              <li>{site.address}</li>
            </ul>
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Artistic Engineers, I would like to enquire.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-md bg-navy-950 px-5 text-body font-medium text-white hover:bg-navy-800 focus-visible:outline-focus"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Section>

      <Section tone="muted" contained={false}>
        <div className="container-ae">
          <Heading level={2}>Find us in Nashik</Heading>
          <div className="mt-6 overflow-hidden rounded-md border border-border">
            <iframe
              title="Artistic Engineers location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.719111140945!2d73.82975511536239!3d20.02030032681173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb501cde3497%3A0x8a5972cd49de00c!2sArtistic%20Engineers!5e0!3m2!1sen!2sin!4v1672319192292!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </Section>

      <Section>
        <Heading level={2}>FAQ</Heading>
        <div className="mt-6 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  )
}
