import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { RelatedDestinations } from "@/components/content/RelatedDestinations";
import { JsonLd } from "@/components/content/JsonLd";
import { getAllDestinations, getDestinationBySlug, getRelatedDestinations } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, touristDestinationSchema } from "@/lib/seo/schema";
import { imageDims } from "@/lib/utils/imageDims";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDestinations().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};

  return buildMetadata({
    title: destination.frontmatter.title,
    description: destination.frontmatter.description,
    path: `/destinations/${slug}`,
    ogTag: destination.frontmatter.region,
    type: "article",
    publishedTime: destination.frontmatter.publishedAt,
    modifiedTime: destination.frontmatter.updatedAt,
    authors: [destination.frontmatter.author],
  });
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const { frontmatter } = destination;
  const dims = imageDims(frontmatter.featuredImage);
  const related = getRelatedDestinations(destination, 3);

  return (
    <>
      <JsonLd
        data={touristDestinationSchema({
          name: frontmatter.title,
          description: frontmatter.description,
          path: `/destinations/${slug}`,
          image: frontmatter.featuredImage,
          region: frontmatter.region,
        })}
      />
      <JsonLd
        data={articleSchema({
          headline: frontmatter.title,
          description: frontmatter.description,
          path: `/destinations/${slug}`,
          image: frontmatter.featuredImage,
          datePublished: frontmatter.publishedAt,
          dateModified: frontmatter.updatedAt,
          author: frontmatter.author,
          isBlogPosting: false,
        })}
      />
      <ContentPageLayout
        breadcrumbs={[
          { name: "Destinations", path: "/destinations" },
          { name: frontmatter.title, path: `/destinations/${slug}` },
        ]}
        category={frontmatter.category}
        badges={[frontmatter.region]}
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
        headings={destination.headings}
        source={destination.content}
        keyFacts={frontmatter.keyFacts}
        faqs={frontmatter.faqs}
        mapLabel={frontmatter.title}
        mapQuery={`${frontmatter.title}, Finland`}
        related={related.length > 0 ? <RelatedDestinations items={related} /> : undefined}
      />
    </>
  );
}
