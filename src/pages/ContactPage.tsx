import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { QuoteForm } from '@/components/forms/QuoteForm'
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

export function ContactPage() {
  const [params] = useSearchParams()
  const raw = params.get('intent')
  const defaultIntent = intents.includes(raw as QuoteFormValues['intent'])
    ? (raw as QuoteFormValues['intent'])
    : 'quote'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />
      <Section>
        <Heading level={1} eyebrow="Contact">
          Request a quote
        </Heading>
        <Text className="mt-3 max-w-xl">
          Tell us about your project. We respond from Nashik via phone, email, or
          WhatsApp.
        </Text>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <QuoteForm defaultIntent={defaultIntent} />
          <div className="space-y-4 rounded-md border border-border bg-muted p-6">
            <Text variant="subhead" as="h2">
              Direct channels
            </Text>
            <ul className="space-y-3 text-body text-secondary">
              <li>
                <a className="font-medium text-navy-950 hover:underline" href="tel:+918766526860">
                  +91-87665 26860
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-navy-950 hover:underline"
                  href="mailto:sales@artisticengineers.in"
                >
                  sales@artisticengineers.in
                </a>
              </li>
              <li>
                1, Kothari Plaza, Near Bali Maharaj Mandir, Mumbai Agra Highway,
                Panchavati, Nashik-422003
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
