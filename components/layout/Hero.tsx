import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { HeroReveal } from "@/components/animation/HeroReveal";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  heading: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  image: { src: string; alt: string; width: number; height: number };
}

export function Hero({ heading, description, primaryCta, secondaryCta, image }: HeroProps) {
  return (
    <section className="border-b border-border bg-paper">
      <Container>
        <HeroReveal className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p
              data-hero-text
              className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-moss"
            >
              Finland travel, done right
            </p>
            <h1
              data-hero-text
              className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-[3.25rem]"
            >
              {heading}
            </h1>
            <p data-hero-text className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              {description}
            </p>
            <div data-hero-text className="mt-8 flex flex-wrap gap-4">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              {secondaryCta ? (
                <Button href={secondaryCta.href} size="lg" variant="secondary">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>

          <div data-hero-image className="overflow-hidden rounded-3xl border border-border">
            <ResponsiveImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-4/3"
            />
          </div>
        </HeroReveal>
      </Container>
    </section>
  );
}
