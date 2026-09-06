import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ItineraryCard } from "@/components/content/ItineraryCard";
import { CardsReveal } from "@/components/animation/CardsReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllItineraries } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Finland Itineraries",
  description:
    "Day-by-day Finland itineraries, from a relaxed 3-day Helsinki trip to a full week from the capital to Lapland.",
  path: "/itineraries",
  ogTag: "Itineraries",
});

export default function ItinerariesPage() {
  const itineraries = getAllItineraries();

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Itineraries", path: "/itineraries" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Finland itineraries"
          description="Ready-to-follow day-by-day plans, built around realistic travel times and pacing."
        />
      </div>

      {itineraries.length > 0 ? (
        <CardsReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((item) => (
            <ItineraryCard key={item.slug} item={item} />
          ))}
        </CardsReveal>
      ) : (
        <div className="mt-10">
          <EmptyState title="No itineraries yet" description="Check back soon." />
        </div>
      )}
    </Container>
  );
}
