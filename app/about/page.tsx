import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/content/JsonLd";
import { personSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { INSTAGRAM_URL } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "About Manature AI",
  description:
    "Manature AI is a Helsinki-based Finland travel guide focused on practical, field-tested information — real transport times, real costs, honest recommendations.",
  path: "/about",
  ogTag: "About",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema("Aino Koskinen", undefined)} />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About us"
              title="Finland travel guides written by people who actually go there"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                Manature AI started as a simple frustration: most Finland travel content online is
                either recycled from the same three sources, or written by people who visited once,
                years ago. We wanted something more useful — guides built from repeated, current
                trips, with real transport times, real costs, and honest opinions about what&apos;s
                actually worth your limited vacation days.
              </p>
              <p>
                We&apos;re based in Helsinki and focus heavily on the capital and the destinations within
                easy reach of it — Porvoo, Nuuksio National Park, Suomenlinna and Turku — while also
                covering Finnish Lapland for travelers planning a longer trip north. Every guide is
                checked and updated periodically, with a visible last-updated date so you know how
                current the information is.
              </p>
              <p>
                We keep the site intentionally focused rather than trying to cover every corner of
                Finland at once. If a destination or itinerary isn&apos;t on the site yet, it&apos;s because we
                haven&apos;t researched it thoroughly enough to recommend it with confidence — not because
                we ran out of ideas.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact">Get in touch</Button>
              <Button href={INSTAGRAM_URL} external variant="secondary">
                Follow on Instagram
              </Button>
            </div>
          </div>

          <div className="aspect-4/3 overflow-hidden rounded-3xl border border-border">
            <ResponsiveImage
              src="/images/misc/about-manature-ai.svg"
              alt="Manature AI founder exploring the Finnish forest"
              width={1200}
              height={1000}
              priority
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg text-ink">Field-tested</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Every guide is based on trips we&apos;ve actually taken, not aggregated from other
              websites.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg text-ink">Kept current</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Guides are periodically reviewed and updated, with a visible last-updated date on
              every page.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg text-ink">Honestly monetized</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              We use clearly labelled affiliate links and never let sponsorship shape a
              recommendation. See our{" "}
              <a href="/affiliate-disclosure" className="underline hover:text-forest">
                affiliate disclosure
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
