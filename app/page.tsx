import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/layout/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DestinationCard } from "@/components/content/DestinationCard";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ItineraryCard } from "@/components/content/ItineraryCard";
import { InstagramCTA } from "@/components/content/InstagramCTA";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { CardsReveal } from "@/components/animation/CardsReveal";
import { ParallaxImage } from "@/components/animation/ParallaxImage";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  getAllArticles,
  getAllDestinations,
  getAllItineraries,
  getFeatured,
} from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_TAGLINE} | Manature AI`,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  const destinations = getFeatured(getAllDestinations(), 4);
  const articles = getFeatured(getAllArticles(), 3);
  const itineraries = getAllItineraries().slice(0, 3);
  const helsinkiArticles = getAllArticles()
    .filter((item) => item.frontmatter.destination === "helsinki")
    .slice(0, 3);
  const hiddenGem = getAllArticles().find((item) => item.slug === "helsinki-hidden-gems");

  return (
    <>
      <Hero
        heading="Discover Finland Beyond the Usual Tourist Routes"
        description="Practical guides, hidden places and unforgettable nature experiences from Helsinki to Lapland."
        primaryCta={{ label: "Explore Finland", href: "/destinations" }}
        secondaryCta={{ label: "Plan Your Trip", href: "/contact" }}
        image={{
          src: "/images/hero/finland-nature-hero.svg",
          alt: "Misty Finnish lake shoreline at sunrise",
          width: 1600,
          height: 1200,
        }}
      />

      {/* Featured destinations */}
      <section className="py-16 sm:py-20" aria-labelledby="featured-destinations-heading">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                as="h2"
                eyebrow="Where to go"
                title="Featured destinations"
                description="From the capital's design streets to Arctic fells, these are the places we recommend first."
              />
              <Button href="/destinations" variant="secondary">
                View all destinations
              </Button>
            </div>
          </ScrollReveal>

          {destinations.length > 0 ? (
            <CardsReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((item) => (
                <DestinationCard key={item.slug} item={item} />
              ))}
            </CardsReveal>
          ) : (
            <div className="mt-10">
              <EmptyState title="Destinations coming soon" />
            </div>
          )}
        </Container>
      </section>

      {/* Explore Helsinki */}
      <section className="bg-paper-warm py-16 sm:py-20" aria-labelledby="explore-helsinki-heading">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <SectionHeading
              as="h2"
              eyebrow="City focus"
              title="Explore Helsinki"
              description="Our main focus is Finland's compact, walkable capital — design streets, sea forts, saunas and market halls, all within a short tram ride of each other."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/destinations/helsinki">Helsinki travel guide</Button>
              <Button href="/blog" variant="secondary">
                All Helsinki guides
              </Button>
            </div>
          </ScrollReveal>

          <ParallaxImage className="aspect-4/3 rounded-3xl border border-border">
            <ResponsiveImage
              src="/images/destinations/helsinki-hero.svg"
              alt="Helsinki waterfront skyline with the cathedral and harbour"
              width={1600}
              height={900}
              className="scale-110"
            />
          </ParallaxImage>
        </Container>

        {helsinkiArticles.length > 0 ? (
          <Container className="mt-12">
            <CardsReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {helsinkiArticles.map((item) => (
                <ArticleCard key={item.slug} item={item} />
              ))}
            </CardsReveal>
          </Container>
        ) : null}
      </section>

      {/* Latest travel guides */}
      <section className="py-16 sm:py-20" aria-labelledby="latest-guides-heading">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                as="h2"
                eyebrow="Fresh from the journal"
                title="Latest travel guides"
                description="Practical, up-to-date guides for planning your Finland trip."
              />
              <Button href="/blog" variant="secondary">
                View all guides
              </Button>
            </div>
          </ScrollReveal>

          {articles.length > 0 ? (
            <CardsReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item) => (
                <ArticleCard key={item.slug} item={item} />
              ))}
            </CardsReveal>
          ) : (
            <div className="mt-10">
              <EmptyState title="Guides coming soon" />
            </div>
          )}
        </Container>
      </section>

      {/* Itineraries */}
      <section className="bg-paper-warm py-16 sm:py-20" aria-labelledby="itineraries-heading">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                as="h2"
                eyebrow="Plan it out"
                title="Finland itineraries"
                description="Day-by-day plans, from a Helsinki weekend to a full week from the capital to Lapland."
              />
              <Button href="/itineraries" variant="secondary">
                View all itineraries
              </Button>
            </div>
          </ScrollReveal>

          {itineraries.length > 0 ? (
            <CardsReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {itineraries.map((item) => (
                <ItineraryCard key={item.slug} item={item} />
              ))}
            </CardsReveal>
          ) : (
            <div className="mt-10">
              <EmptyState title="Itineraries coming soon" />
            </div>
          )}
        </Container>
      </section>

      {/* Hidden gems */}
      {hiddenGem ? (
        <section className="py-16 sm:py-20" aria-labelledby="hidden-gems-heading">
          <Container className="grid items-center gap-10 overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-2">
            <ScrollReveal className="p-8 sm:p-12">
              <SectionHeading
                as="h2"
                eyebrow="Off the main route"
                title="Find Finland's hidden gems"
                description="Quiet courtyards, neighborhood saunas and forest paths most visitors never find — we go looking for them so you don't have to guess."
              />
              <div className="mt-6">
                <Button href={`/blog/${hiddenGem.slug}`}>Read the hidden gems guide</Button>
              </div>
            </ScrollReveal>
            <div className="aspect-4/3 lg:aspect-auto lg:h-full">
              <ResponsiveImage
                src={hiddenGem.frontmatter.featuredImage}
                alt={hiddenGem.frontmatter.featuredImageAlt}
                width={1200}
                height={800}
                className="h-full"
              />
            </div>
          </Container>
        </section>
      ) : null}

      <InstagramCTA />

      {/* Newsletter */}
      <section className="py-16 sm:py-20" aria-labelledby="newsletter-heading">
        <Container className="max-w-2xl text-center">
          <ScrollReveal>
            <SectionHeading
              as="h2"
              align="center"
              eyebrow="Stay in the loop"
              title="Get our best Finland guides by email"
              description="New destination guides, itineraries and hidden gems, roughly twice a month. No spam."
            />
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* About Manature AI */}
      <section className="bg-forest py-16 text-paper sm:py-20" aria-labelledby="about-heading">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-sand">
              About Manature AI
            </p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Finland travel guides written by people who actually go there
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/85">
              Manature AI is a Helsinki-based travel guide focused on practical, well-tested
              information — real transport times, real costs, and honest opinions about what&apos;s
              worth your limited vacation days.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/about" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-forest">
                About us
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm font-medium text-paper underline underline-offset-4"
              >
                Get in touch
              </Link>
            </div>
          </ScrollReveal>
          <div className="aspect-4/3 overflow-hidden rounded-3xl">
            <ResponsiveImage
              src="/images/misc/about-manature-ai.svg"
              alt="Manature AI founder exploring the Finnish forest"
              width={1200}
              height={1000}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
