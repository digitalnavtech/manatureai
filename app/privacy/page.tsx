import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your data, including analytics, cookies and newsletter signups.`,
  path: "/privacy",
  ogTag: "Privacy Policy",
  noIndex: false,
});

const lastUpdated = "July 1, 2026";

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy" }]} />

      <div className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated: {lastUpdated}</p>

        <div className="prose-article mt-8 space-y-8 text-base leading-relaxed text-ink-muted">
          <section>
            <h2 className="font-display text-xl text-ink">1. Who we are</h2>
            <p className="mt-3">
              {SITE_NAME} (&quot;we&quot;, &quot;us&quot;) publishes travel guides about Finland at manatureai.com. For
              privacy questions or requests, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. What data we collect</h2>
            <p className="mt-3">We collect the following categories of data:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-ink">Contact form submissions</strong> — the name, email
                address, subject and message you provide when contacting us.
              </li>
              <li>
                <strong className="text-ink">Newsletter signups</strong> — your name and email
                address, used to send you travel guides and updates you&apos;ve opted into.
              </li>
              <li>
                <strong className="text-ink">Analytics data</strong> — anonymized or pseudonymized
                usage data (pages visited, general location, device type) collected via tools such
                as Google Analytics and Microsoft Clarity, where enabled.
              </li>
              <li>
                <strong className="text-ink">Advertising identifiers</strong> — if enabled, the Meta
                Pixel may collect data used for advertising measurement, subject to your cookie
                consent choices.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. How we use your data</h2>
            <p className="mt-3">
              We use your data to respond to inquiries, send newsletter content you&apos;ve subscribed
              to, understand how visitors use the site so we can improve it, and — where analytics
              or advertising tools are active — measure the performance of our content and any
              advertising.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">4. Cookies and tracking tools</h2>
            <p className="mt-3">
              This site may use cookies and similar technologies for analytics (Google Analytics,
              Microsoft Clarity) and advertising measurement (Meta Pixel). These tools are only
              loaded when explicitly configured, and load client-side after the page has rendered.
              You can control cookies through your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">5. Third-party links and affiliate links</h2>
            <p className="mt-3">
              Some pages contain affiliate links to third-party booking, tour or insurance
              providers. Clicking these links may set cookies on the destination site, governed by
              that site&apos;s own privacy policy. See our{" "}
              <a href="/affiliate-disclosure" className="text-forest underline">
                affiliate disclosure
              </a>{" "}
              for more detail.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">6. Data retention</h2>
            <p className="mt-3">
              Contact form submissions and newsletter subscriber data are retained only as long as
              needed to respond to your inquiry or maintain your subscription. You may request
              deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">7. Your rights</h2>
            <p className="mt-3">
              If you are located in the European Economic Area, you have the right to access,
              correct, delete or export your personal data, and to withdraw consent for marketing
              communications at any time. To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">8. Changes to this policy</h2>
            <p className="mt-3">
              We may update this policy periodically. The &quot;last updated&quot; date at the top of this
              page reflects the most recent revision.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
