import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Manature AI for trip questions, partnership inquiries, or corrections to our Finland travel guides.",
  path: "/contact",
  ogTag: "Contact",
});

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            title="Get in touch"
            description="Questions about planning a trip, a correction on one of our guides, or a partnership inquiry — we read every message."
          />
          <div className="mt-8 space-y-6 text-sm text-ink-muted">
            <div>
              <p className="font-semibold text-ink">Email</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="font-semibold text-ink">Instagram</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-forest underline">
                {INSTAGRAM_HANDLE}
              </a>
            </div>
            <div>
              <p className="font-semibold text-ink">Response time</p>
              <p>We typically reply within a few business days.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
