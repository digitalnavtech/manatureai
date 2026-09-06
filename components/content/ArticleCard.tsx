import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Badge } from "@/components/ui/Badge";
import { imageDims } from "@/lib/utils/imageDims";
import { formatDate } from "@/lib/utils/date";
import type { ArticleItem } from "@/types/content";

export function ArticleCard({ item }: { item: ArticleItem }) {
  const { frontmatter, slug, readingTime } = item;
  const dims = imageDims(frontmatter.featuredImage);

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md">
      <Link href={`/blog/${slug}`} className="flex h-full flex-col">
        <div className="aspect-3/2 overflow-hidden">
          <ResponsiveImage
            src={frontmatter.featuredImage}
            alt={frontmatter.featuredImageAlt}
            width={dims.width}
            height={dims.height}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Badge tone="forest">{frontmatter.category}</Badge>
          <h3 className="mt-3 font-display text-lg leading-snug text-ink">
            {frontmatter.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {frontmatter.description}
          </p>
          <p className="mt-auto pt-4 text-xs text-ink-muted">
            <time dateTime={frontmatter.publishedAt}>{formatDate(frontmatter.publishedAt)}</time>
            {" · "}
            {readingTime} min read
          </p>
        </div>
      </Link>
    </article>
  );
}
