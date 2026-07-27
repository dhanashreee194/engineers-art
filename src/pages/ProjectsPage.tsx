import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Heading } from '@/components/ui/Heading'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { ContactBand } from '@/components/sections/ContactBand'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { featuredProjects } from '@/content/home'
import { projectsPage } from '@/content/pages'

export function ProjectsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
      <Section tone="navy" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Heading level={1} inverse eyebrow="Projects">
            {projectsPage.hero.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {projectsPage.hero.description}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Discuss your project
          </ButtonLink>
        </FadeIn>
      </Section>

      <Section>
        <Stagger className="grid gap-8 md:grid-cols-3">
          {featuredProjects.items.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="group block focus-visible:outline-focus"
              >
                <Media src={project.image} alt={project.title} aspect="3/2" />
                <Badge className="mt-4">{project.sector}</Badge>
                <h2 className="mt-2 font-display text-xl font-semibold text-primary">
                  {project.title}
                </h2>
                <Text className="mt-2">{project.outcome}</Text>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <ContactBand />
    </>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = featuredProjects.items.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Section>
        <Heading level={1}>Project not found</Heading>
        <ButtonLink to="/projects" className="mt-6">
          Back to projects
        </ButtonLink>
      </Section>
    )
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />
      <Section tone="charcoal" className="blueprint-grid">
        <FadeIn className="max-w-3xl">
          <Badge tone="inverse">{project.sector}</Badge>
          <Heading level={1} inverse className="mt-4">
            {project.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {project.outcome}
          </Text>
          <ButtonLink to="/contact?intent=quote" className="mt-8">
            Request similar work
          </ButtonLink>
        </FadeIn>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Heading level={2}>Challenge</Heading>
            <Text className="mt-3">
              The client needed a durable, space-efficient solution with clean
              finish and reliable delivery timelines.
            </Text>
          </div>
          <div>
            <Heading level={2}>Solution</Heading>
            <Text className="mt-3">
              Artistic Engineers scoped materials and fabrication details,
              manufactured to agreed specifications, and coordinated delivery
              for site readiness.
            </Text>
          </div>
        </div>
        <Media
          src={project.image}
          alt={project.title}
          aspect="video"
          className="mt-10"
        />
        <Heading level={2} className="mt-10">
          Outcome
        </Heading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-secondary">
          <li>{project.outcome}</li>
          <li>Clear enquiry-to-delivery communication</li>
          <li>Finish and fit aligned to site expectations</li>
        </ul>
      </Section>
      <ContactBand />
    </>
  )
}
