import { DestinationCard } from "./DestinationCard";
import type { DestinationItem } from "@/types/content";

export function RelatedDestinations({
  items,
  title = "Related destinations",
}: {
  items: DestinationItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-destinations-heading">
      <h2 id="related-destinations-heading" className="font-display text-2xl text-ink">
        {title}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <DestinationCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
