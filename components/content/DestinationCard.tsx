import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Badge } from "@/components/ui/Badge";
import { imageDims } from "@/lib/utils/imageDims";
import type { DestinationItem } from "@/types/content";

export function DestinationCard({ item }: { item: DestinationItem }) {
  const { frontmatter, slug } = item;
  const dims = imageDims(frontmatter.featuredImage);

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md">
      <Link href={`/destinations/${slug}`} className="flex h-full flex-col">
        <div className="aspect-4/3 overflow-hidden">
          <ResponsiveImage
            src={frontmatter.featuredImage}
            alt={frontmatter.featuredImageAlt}
            width={dims.width}
            height={dims.height}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Badge tone="sand">{frontmatter.region}</Badge>
          <h3 className="mt-3 font-display text-xl text-ink">{frontmatter.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {frontmatter.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
