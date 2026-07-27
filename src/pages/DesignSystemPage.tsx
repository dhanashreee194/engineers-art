import { Factory, ShieldCheck, Wrench } from 'lucide-react'
import {
  Accordion,
  Badge,
  Breadcrumbs,
  Button,
  ButtonLink,
  Card,
  Container,
  Divider,
  Heading,
  Input,
  Section,
  Text,
} from '@/components/ui'
import { QuoteForm } from '@/components/forms/QuoteForm'

export function DesignSystemPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Design System' },
        ]}
      />

      <Section tone="navy" className="!py-8 md:!py-9">
        <Heading level={1} inverse eyebrow="Phase 5">
          Design system
        </Heading>
        <Text variant="inverse" className="mt-4 max-w-2xl">
          Tokens, primitives, layout chrome, and form foundations for Artistic
          Engineers — Modern Industrial Luxury.
        </Text>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/contact?intent=quote">Request Quote</ButtonLink>
          <ButtonLink to="/" variant="ghost" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Back to Home
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <Heading level={2} eyebrow="Color">
          Palette
        </Heading>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch name="Navy 950" className="bg-navy-950" />
          <Swatch name="Blue 600" className="bg-blue-600" />
          <Swatch name="Copper 600" className="bg-copper-600" />
          <Swatch name="Charcoal 900" className="bg-charcoal-900" />
          <Swatch name="Grey 50" className="bg-grey-50 text-primary" light />
          <Swatch name="Grey 500" className="bg-grey-500" />
          <Swatch name="Success" className="bg-success" />
          <Swatch name="Error" className="bg-error" />
        </div>
      </Section>

      <Section tone="muted">
        <Heading level={2} eyebrow="Typography">
          Type scale
        </Heading>
        <div className="mt-8 space-y-6">
          <p className="font-display text-hero font-semibold text-primary">
            Hero — Space Grotesk
          </p>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Text variant="subhead">Subhead — engineering clarity</Text>
          <Text variant="lead">
            Lead body for supporting sentences under section titles.
          </Text>
          <Text>
            Body copy at 16–18px with comfortable line height for long-form trust
            content and specifications.
          </Text>
          <Text variant="muted">Muted meta and secondary labels.</Text>
        </div>
      </Section>

      <Section>
        <Heading level={2} eyebrow="Components">
          Buttons & badges
        </Heading>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
          <Badge>Neutral</Badge>
          <Badge tone="copper">Copper</Badge>
          <Badge tone="navy">Navy</Badge>
        </div>

        <Divider className="my-10" label="Cards" />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Factory, title: 'Fabrication', body: 'MS / GI precision work.' },
            { icon: Wrench, title: 'Custom', body: 'Engineered to site needs.' },
            { icon: ShieldCheck, title: 'Quality', body: 'Inspection discipline.' },
          ].map((item) => (
            <Card key={item.title} interactive>
              <item.icon className="size-6 text-copper-600" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <Text className="mt-2">{item.body}</Text>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <Heading level={2} eyebrow="Forms">
          Quote form
        </Heading>
        <Text className="mt-3 max-w-xl">
          React Hook Form + Zod with accessible labels, errors, and honeypot.
        </Text>
        <Container width="narrow" className="mt-8 rounded-lg border border-border bg-page p-6 !px-6">
          <QuoteForm />
        </Container>
      </Section>

      <Section>
        <Heading level={2} eyebrow="Disclosure">
          Accordion
        </Heading>
        <div className="mt-8 max-w-2xl">
          <Accordion
            items={[
              {
                title: 'What is included in a quote?',
                content:
                  'Scope, materials, finish options, and indicative lead time based on your enquiry.',
              },
              {
                title: 'Do you customize sizes?',
                content:
                  'Yes. Custom engineering is a core capability — share drawings or site constraints.',
              },
            ]}
          />
        </div>

        <div className="mt-10">
          <Text variant="muted" className="mb-2">
            Focusable input sample
          </Text>
          <Input className="max-w-sm" placeholder="Focus to see ring" />
        </div>
      </Section>
    </>
  )
}

function Swatch({
  name,
  className,
  light,
}: {
  name: string
  className: string
  light?: boolean
}) {
  return (
    <div
      className={`flex h-24 items-end rounded-md p-3 text-sm font-medium ${light ? 'border border-border text-primary' : 'text-white'} ${className}`}
    >
      {name}
    </div>
  )
}
