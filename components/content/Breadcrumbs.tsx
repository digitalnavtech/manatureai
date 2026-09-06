import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type BreadcrumbEntry } from "@/lib/seo/schema";

export function Breadcrumbs({ items }: { items: BreadcrumbEntry[] }) {
  const trail: BreadcrumbEntry[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="hover:text-forest">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
