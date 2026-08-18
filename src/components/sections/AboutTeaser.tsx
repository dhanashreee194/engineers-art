import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { Text } from '@/components/ui/Text'
import { CurtainReveal } from '@/components/motion/CurtainReveal'
import { FadeIn } from '@/components/motion/Reveal'
import { ParallaxFrame } from '@/components/motion/ParallaxFrame'
import { aboutTeaser } from '@/content/home'

export function AboutTeaser() {
  const { eyebrow, title, body, cta, image } = aboutTeaser

  return (
    <Section aria-labelledby="about-teaser-heading">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <FadeIn className="lg:col-span-5">
          <Heading level={2} eyebrow={eyebrow} id="about-teaser-heading">
            {title}
          </Heading>
          <Text className="mt-4">{body}</Text>
          <ButtonLink to={cta.href} variant="secondary" className="mt-8">
            {cta.label}
          </ButtonLink>
        </FadeIn>
        <FadeIn className="lg:col-span-7" delay={0.08}>
          <ParallaxFrame strength={10}>
            <CurtainReveal className="border border-border shadow-md">
              <Media
                src={image.src}
                alt={image.alt}
                aspect="3/2"
                rounded={false}
                className="shadow-none"
              />
            </CurtainReveal>
          </ParallaxFrame>
        </FadeIn>
      </div>
    </Section>
  )
}
