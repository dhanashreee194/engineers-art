import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Badge } from '@/components/ui/Badge'
import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { featuredProjects } from '@/content/home'
import { easeOutExpo } from '@/lib/motion'

function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects.items)[number]
  index: number
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.35,
  })
  const y = useTransform(smooth, [0, 1], ['10%', '-10%'])
  const scale = useTransform(smooth, [0, 0.5, 1], [1.12, 1, 1.05])

  return (
    <StaggerItem>
      <Link
        ref={ref}
        to={`/projects/${project.slug}`}
        className="group block focus-visible:outline-focus"
      >
        <motion.div
          className="relative aspect-[4/5] overflow-hidden border border-border bg-muted"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            delay: index * 0.08,
            ease: easeOutExpo,
          }}
        >
          <motion.img
            src={project.image}
            alt={`${project.title} — ${project.outcome}`}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:brightness-110"
            style={reduced ? undefined : { y, scale }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-on-maroon">
            <Badge tone="inverse">{project.sector}</Badge>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-on-maroon/85">{project.outcome}</p>
            <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.14em] text-on-maroon/70 transition group-hover:tracking-[0.2em]">
              View project →
            </span>
          </div>
        </motion.div>
      </Link>
    </StaggerItem>
  )
}

export function ProjectsGrid({ featured = true }: { featured?: boolean }) {
  return (
    <Section
      tone="charcoal"
      aria-labelledby="projects-heading"
      className="blueprint-grid overflow-hidden"
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
        <ButtonLink to={featuredProjects.cta.href}>
          {featuredProjects.cta.label}
        </ButtonLink>
      </FadeIn>

      <Stagger className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {featuredProjects.items.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </Stagger>

      {featured ? null : null}
    </Section>
  )
}
