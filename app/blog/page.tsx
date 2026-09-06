import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ArticleCard } from "@/components/content/ArticleCard";
import { CardsReveal } from "@/components/animation/CardsReveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils/cn";
import { filterByCategory, getAllArticles } from "@/lib/content/mdx";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Finland Travel Guides",
  description:
    "Practical Finland travel guides covering Helsinki, day trips, saunas, transport and more — written from real trips, not recycled listicles.",
  path: "/blog",
  ogTag: "Travel Guides",
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const allArticles = getAllArticles();
  const categories = Array.from(new Set(allArticles.map((item) => item.frontmatter.category)));
  const articles = category ? filterByCategory(allArticles, category) : allArticles;

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Travel Guides", path: "/blog" }]} />
      <div className="mt-6">
        <SectionHeading
          title="Finland travel guides"
          description="Practical, field-tested guides — city highlights, day trips, transport and culture."
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/blog">
          <Badge tone={!category ? "forest" : "outline"}>All</Badge>
        </Link>
        {categories.map((cat) => (
          <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}>
            <Badge tone={category === cat ? "forest" : "outline"}>{cat}</Badge>
          </Link>
        ))}
      </div>

      {articles.length > 0 ? (
        <CardsReveal className={cn("mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3")}>
          {articles.map((item) => (
            <ArticleCard key={item.slug} item={item} />
          ))}
        </CardsReveal>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="No guides in this category yet"
            description="Try a different category, or view all guides."
            action={
              <Link href="/blog" className="text-sm font-semibold text-forest underline">
                View all guides
              </Link>
            }
          />
        </div>
      )}
    </Container>
  );
}
