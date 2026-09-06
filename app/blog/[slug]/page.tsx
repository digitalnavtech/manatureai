import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { RelatedArticles } from "@/components/content/RelatedArticles";
import { JsonLd } from "@/components/content/JsonLd";
import {
  getAllArticles,
  getArticleBySlug,
  getDestinationBySlug,
  getRelatedArticles,
} from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { imageDims } from "@/lib/utils/imageDims";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    path: `/blog/${slug}`,
    ogTag: article.frontmatter.category,
    type: "article",
    publishedTime: article.frontmatter.publishedAt,
    modifiedTime: article.frontmatter.updatedAt,
    authors: [article.frontmatter.author],
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter } = article;
  const dims = imageDims(frontmatter.featuredImage);
  const related = getRelatedArticles(article, 3);
  const destination = frontmatter.destination ? getDestinationBySlug(frontmatter.destination) : undefined;

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: frontmatter.title,
          description: frontmatter.description,
          path: `/blog/${slug}`,
          image: frontmatter.featuredImage,
          datePublished: frontmatter.publishedAt,
          dateModified: frontmatter.updatedAt,
          author: frontmatter.author,
        })}
      />
      <ContentPageLayout
        breadcrumbs={[
          { name: "Travel Guides", path: "/blog" },
          { name: frontmatter.title, path: `/blog/${slug}` },
        ]}
        category={frontmatter.category}
        badges={destination ? [destination.frontmatter.title] : undefined}
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
        headings={article.headings}
        source={article.content}
        keyFacts={frontmatter.keyFacts}
        faqs={frontmatter.faqs}
        mapLabel={destination?.frontmatter.title}
        mapQuery={destination ? `${destination.frontmatter.title}, Finland` : undefined}
        related={related.length > 0 ? <RelatedArticles items={related} /> : undefined}
        affiliateContent={frontmatter.affiliateContent}
        quickAnswer={frontmatter.quickAnswer}
      />
    </>
  );
}
