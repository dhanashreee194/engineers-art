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

const options = [
  {
    id: 'A',
    name: 'Graphite & Chartreuse',
    feel: 'Industrial-tech, high-energy accent. Ownable via chartreuse.',
    swatches: [
      { name: 'Ink', hex: '#0E1116', note: 'Dark base' },
      { name: 'Graphite', hex: '#1C222B', note: 'Dark cards' },
      { name: 'Steel', hex: '#3A4552', note: 'Borders / muted' },
      { name: 'Fog', hex: '#F4F6F8', note: 'Light bg' },
      { name: 'Signal', hex: '#C6F135', note: 'CTA / data (≤10%)' },
      { name: 'Copper', hex: '#B06B3A', note: 'Warm secondary' },
    ],
  },
  {
    id: 'B',
    name: 'Deep Teal & Molten Copper',
    feel: 'Premium materials — patina + molten metal. Selected.',
    selected: true,
    swatches: [
      { name: 'Abyss', hex: '#06231F', note: 'Dark base' },
      { name: 'Pine', hex: '#0F3D35', note: 'Dark surfaces' },
      { name: 'Verdigris', hex: '#2E7D6E', note: 'Links / oxidized' },
      { name: 'Bone', hex: '#F3F1EC', note: 'Light bg (60%)' },
      { name: 'Molten', hex: '#E0632A', note: 'Accent (≤10%)' },
      { name: 'Brass', hex: '#C9A45C', note: 'Blueprint lines' },
    ],
  },
  {
    id: 'C',
    name: 'Slate & Ion Blue + Amber',
    feel: 'Restrained; fresher than navy defaults. Safest politically.',
    swatches: [
      { name: 'Onyx', hex: '#14171C', note: 'Dark base' },
      { name: 'Slate', hex: '#2A2F38', note: 'Dark surfaces' },
      { name: 'Mist', hex: '#EEF1F4', note: 'Light bg' },
      { name: 'Ion', hex: '#4D7CFE', note: 'Electric blue' },
      { name: 'Amber', hex: '#F5A524', note: 'Warm accent' },
      { name: 'Aluminum', hex: '#9AA3AE', note: 'Metallic mute' },
    ],
  },
] as const

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
        <Heading level={1} inverse eyebrow="Color system">
          Deep Teal & Molten Copper
        </Heading>
        <Text variant="inverse" className="mt-4 max-w-2xl">
          Option B selected — materials-driven, ownable, WCAG-audited. Living
          Blueprint lines use Brass; CTAs use Molten with Abyss type.
        </Text>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/contact?intent=quote">Request Quote</ButtonLink>
          <ButtonLink
            to="/"
            variant="ghost"
            className="border-brass/40 text-bone hover:border-brass hover:bg-white/5"
          >
            Back to Home
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <Heading level={2} eyebrow="Options">
          Palette proposals
        </Heading>
        <div className="mt-10 space-y-12">
          {options.map((opt) => (
            <div
              key={opt.id}
              className={
                'selected' in opt && opt.selected
                  ? 'rounded-lg border-2 border-molten p-6'
                  : 'rounded-lg border border-border p-6'
              }
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-primary">
                  Option {opt.id} — {opt.name}
                </h3>
                {'selected' in opt && opt.selected ? (
                  <Badge tone="copper">Selected</Badge>
                ) : null}
              </div>
              <Text className="mt-2 max-w-2xl">{opt.feel}</Text>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {opt.swatches.map((s) => (
                  <div key={s.hex} className="space-y-2">
                    <div
                      className="h-20 rounded-md border border-border"
                      style={{ backgroundColor: s.hex }}
                    />
                    <p className="text-sm font-medium text-primary">{s.name}</p>
                    <p className="font-mono text-xs text-subtle">{s.hex}</p>
                    <p className="text-xs text-subtle">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <Heading level={2} eyebrow="Active tokens">
          Semantic map (Option B)
        </Heading>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Swatch name="bg / page" className="bg-page text-primary" light />
          <Swatch name="surface-alt" className="bg-muted text-primary" light />
          <Swatch name="inverse / abyss" className="bg-abyss" />
          <Swatch name="dark / pine" className="bg-pine" />
          <Swatch name="accent / molten" className="bg-molten text-abyss" />
          <Swatch name="brass" className="bg-brass text-abyss" />
          <Swatch name="verdigris" className="bg-verdigris" />
          <Swatch name="hero mesh" className="hero-mesh" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="metallic-brass h-16 rounded-md" aria-hidden />
          <div className="metallic-molten h-16 rounded-md" aria-hidden />
        </div>
        <Text className="mt-3 text-sm">Metallic brass + molten gradient tokens</Text>
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
          <Badge tone="copper">Molten</Badge>
          <Badge tone="navy">Teal</Badge>
        </div>

        <Divider className="my-10" label="Cards" />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Factory, title: 'Fabrication', body: 'MS / GI precision work.' },
            { icon: Wrench, title: 'Custom', body: 'Engineered to site needs.' },
            { icon: ShieldCheck, title: 'Quality', body: 'Inspection discipline.' },
          ].map((item) => (
            <Card key={item.title} interactive>
              <item.icon className="size-6 text-molten" aria-hidden />
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
        <Container
          width="narrow"
          className="mt-8 rounded-lg border border-border bg-page p-6 !px-6"
        >
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
      className={`flex h-24 items-end rounded-md p-3 text-sm font-medium ${light ? 'border border-border text-primary' : 'text-bone'} ${className}`}
    >
      {name}
    </div>
  )
}
