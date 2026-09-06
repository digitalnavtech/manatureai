import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: `How ${SITE_NAME} uses affiliate links, sponsored content and advertising, and how that affects our recommendations.`,
  path: "/affiliate-disclosure",
  ogTag: "Affiliate Disclosure",
});

const lastUpdated = "July 1, 2026";

export default function AffiliateDisclosurePage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Affiliate Disclosure", path: "/affiliate-disclosure" }]} />

      <div className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Affiliate Disclosure</h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated: {lastUpdated}</p>

        <div className="prose-article mt-8 space-y-8 text-base leading-relaxed text-ink-muted">
          <section>
            <p>
              {SITE_NAME} is reader-supported. Some links on this site — including hotel, tour and
              travel insurance links — are affiliate links. If you click through and make a booking
              or purchase, we may earn a small commission at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">How this affects our recommendations</h2>
            <p className="mt-3">
              We only recommend products, services and partners we believe are genuinely useful for
              travelers. Affiliate relationships never determine which destinations, itineraries or
              places we choose to cover — editorial content is written first, and monetization is
              added afterward where it fits naturally.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Sponsored content</h2>
            <p className="mt-3">
              If we ever publish sponsored content, it will be clearly labelled as &quot;Sponsored&quot; at
              the point it appears on the page, in line with standard disclosure practice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Advertising</h2>
            <p className="mt-3">
              We may display advertising in reserved ad slots on some pages. Advertising is served
              independently of our editorial recommendations and does not influence the content of
              our guides.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Questions</h2>
            <p className="mt-3">
              If you have questions about a specific link or partnership, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
