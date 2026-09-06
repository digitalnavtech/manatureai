import type { TocHeading } from "@/types/content";
import { cn } from "@/lib/utils/cn";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-paper-warm p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-moss">On this page</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-4")}>
            <a href={`#${heading.id}`} className="text-ink-muted hover:text-forest">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
