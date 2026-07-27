import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ButtonLink } from '@/components/ui/ButtonLink'

export function PlaceholderPage({
  title,
  parent,
}: {
  title: string
  parent?: { label: string; href: string }
}) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          ...(parent ? [parent] : []),
          { label: title },
        ]}
      />
      <Section>
        <Heading level={1}>{title}</Heading>
        <Text className="mt-3 max-w-xl">
          Section content arrives in Phase 6. Navigation and design system are
          already wired.
        </Text>
        <ButtonLink to="/design-system" variant="secondary" className="mt-8">
          Open design system
        </ButtonLink>
      </Section>
    </>
  )
}
