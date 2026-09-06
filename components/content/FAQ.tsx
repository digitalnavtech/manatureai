import { JsonLd } from "./JsonLd";
import { faqPageSchema } from "@/lib/seo/schema";
import type { FaqItem } from "@/types/content";

export function FAQ({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading">
      <JsonLd data={faqPageSchema(items)} />
      <h2 id="faq-heading" className="font-display text-2xl text-ink">
        {title}
      </h2>
      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
        {items.map((item) => (
          <div key={item.question} className="p-5">
            <dt className="font-semibold text-ink">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
