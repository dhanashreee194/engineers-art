import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Badge } from '@/components/ui/Badge'
import { Heading } from '@/components/ui/Heading'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { CurtainReveal } from '@/components/motion/CurtainReveal'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { featuredProjects } from '@/content/home'

export function ProjectsGrid({ featured = true }: { featured?: boolean }) {
  return (
    <Section
      tone="charcoal"
      aria-labelledby="projects-heading"
      className="blueprint-grid"
    >
      <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Heading
            level={2}
            eyebrow={featuredProjects.eyebrow}
            inverse
            id="projects-heading"
          >
            {featuredProjects.title}
          </Heading>
          <Text variant="inverse" className="mt-4">
            {featuredProjects.description}
          </Text>
        </div>
        <ButtonLink to={featuredProjects.cta.href}>{featuredProjects.cta.label}</ButtonLink>
      </FadeIn>

      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredProjects.items.map((project) => (
          <StaggerItem key={project.slug}>
            <Link
              to={`/projects/${project.slug}`}
              className="group block focus-visible:outline-focus"
            >
              <CurtainReveal>
                <Media
                  src={project.image}
                  alt={`${project.title} — ${project.outcome}`}
                  aspect="3/2"
                  className="transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
                />
              </CurtainReveal>
              <div className="mt-4 space-y-2">
                <Badge tone="inverse">{project.sector}</Badge>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="text-sm text-steel">{project.outcome}</p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {featured ? null : null}
    </Section>
  )
}
