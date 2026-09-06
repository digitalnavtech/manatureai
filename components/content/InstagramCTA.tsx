import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CardsReveal } from "@/components/animation/CardsReveal";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/seo/config";

const shots = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/misc/instagram-${i + 1}.svg`,
  alt: `Manature AI Instagram preview photo ${i + 1}`,
}));

export function InstagramCTA() {
  return (
    <section aria-label="Follow Manature AI on Instagram" className="bg-paper-warm py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Follow along"
            title={`Real trips, real places — ${INSTAGRAM_HANDLE}`}
            description="Daily nature photos, hidden spots and behind-the-scenes travel notes from across Finland."
          />
          <Button href={INSTAGRAM_URL} external variant="secondary">
            Follow on Instagram
          </Button>
        </div>

        <CardsReveal className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
          {shots.map((shot) => (
            <a
              key={shot.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden rounded-xl"
            >
              <ResponsiveImage
                src={shot.src}
                alt={shot.alt}
                width={600}
                height={600}
                sizes="(min-width: 1024px) 16vw, 30vw"
                className="transition-transform duration-300 hover:scale-105"
              />
            </a>
          ))}
        </CardsReveal>
      </Container>
    </section>
  );
}
