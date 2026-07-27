import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { Link } from '@/components/ui/Link'

export function LegalPage({
  title,
  summary,
}: {
  title: string
  summary: string
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />
      <Section>
        <div className="mx-auto max-w-[45rem]">
          <Heading level={1}>{title}</Heading>
          <Text className="mt-4">{summary}</Text>
          <Text className="mt-6">
            For questions about this policy or your enquiry data, contact{' '}
            <a
              className="text-blue-600 hover:underline"
              href="mailto:sales@artisticengineers.in"
            >
              sales@artisticengineers.in
            </a>
            .
          </Text>
          <Text className="mt-6">
            <Link to="/contact">Back to contact</Link>
          </Text>
        </div>
      </Section>
    </>
  )
}
