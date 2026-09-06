import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { DestinationCard } from "@/components/content/DestinationCard";
import { CardsReveal } from "@/components/animation/CardsReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllDestinations } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Finland Destinations",
  description:
    "Explore Manature AI's Finland destination guides — Helsinki, Porvoo, Nuuksio National Park, Finnish Lapland, Turku and Suomenlinna.",
  path: "/destinations",
  ogTag: "Destinations",
});

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Destinations", path: "/destinations" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Finland destinations"
          description="From Helsinki's design streets to Lapland's Arctic fells — every place we've spent real time exploring."
        />
      </div>

      {destinations.length > 0 ? (
        <CardsReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <DestinationCard key={item.slug} item={item} />
          ))}
        </CardsReveal>
      ) : (
        <div className="mt-10">
          <EmptyState title="No destinations yet" description="Check back soon." />
        </div>
      )}
    </Container>
  );
}
