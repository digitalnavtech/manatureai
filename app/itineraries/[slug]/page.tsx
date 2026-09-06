import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { JsonLd } from "@/components/content/JsonLd";
import { getAllItineraries, getItineraryBySlug } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { imageDims } from "@/lib/utils/imageDims";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllItineraries().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);
  if (!itinerary) return {};

  return buildMetadata({
    title: itinerary.frontmatter.title,
    description: itinerary.frontmatter.description,
    path: `/itineraries/${slug}`,
    ogTag: `${itinerary.frontmatter.days}-day itinerary`,
    type: "article",
    publishedTime: itinerary.frontmatter.publishedAt,
    modifiedTime: itinerary.frontmatter.updatedAt,
    authors: [itinerary.frontmatter.author],
  });
}

export default async function ItineraryPage({ params }: PageProps) {
  const { slug } = await params;
  const itinerary = getItineraryBySlug(slug);
  if (!itinerary) notFound();

  const { frontmatter } = itinerary;
  const dims = imageDims(frontmatter.featuredImage);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: frontmatter.title,
          description: frontmatter.description,
          path: `/itineraries/${slug}`,
          image: frontmatter.featuredImage,
          datePublished: frontmatter.publishedAt,
          dateModified: frontmatter.updatedAt,
          author: frontmatter.author,
        })}
      />
      <ContentPageLayout
        breadcrumbs={[
          { name: "Itineraries", path: "/itineraries" },
          { name: frontmatter.title, path: `/itineraries/${slug}` },
        ]}
        category={frontmatter.category}
        badges={[`${frontmatter.days} ${frontmatter.days === 1 ? "day" : "days"}`, frontmatter.difficulty]}
        title={frontmatter.title}
        intro={frontmatter.description}
        author={frontmatter.author}
        publishedAt={frontmatter.publishedAt}
        updatedAt={frontmatter.updatedAt}
        image={{
          src: frontmatter.featuredImage,
          alt: frontmatter.featuredImageAlt,
          width: dims.width,
          height: dims.height,
        }}
        headings={itinerary.headings}
        source={itinerary.content}
        keyFacts={frontmatter.keyFacts}
        faqs={frontmatter.faqs}
        quickAnswer={frontmatter.quickAnswer}
      />
    </>
  );
}
