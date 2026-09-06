import { ArticleCard } from "./ArticleCard";
import type { ArticleItem } from "@/types/content";

export function RelatedArticles({
  items,
  title = "Related guides",
}: {
  items: ArticleItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-guides-heading">
      <h2 id="related-guides-heading" className="font-display text-2xl text-ink">
        {title}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ArticleCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
