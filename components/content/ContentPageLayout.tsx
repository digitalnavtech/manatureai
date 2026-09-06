import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Breadcrumbs } from "./Breadcrumbs";
import { AuthorBox } from "./AuthorBox";
import { TableOfContents } from "./TableOfContents";
import { KeyFacts } from "./KeyFacts";
import { FAQ } from "./FAQ";
import { MapPlaceholder } from "./MapPlaceholder";
import { AffiliateDisclosure } from "./AffiliateDisclosure";
import { mdxComponents } from "./mdxComponents";
import type { BreadcrumbEntry } from "@/lib/seo/schema";
import type { FaqItem, KeyFact, TocHeading } from "@/types/content";

interface ContentPageLayoutProps {
  breadcrumbs: BreadcrumbEntry[];
  category: string;
  badges?: string[];
  title: string;
  intro: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: { src: string; alt: string; width: number; height: number };
  headings: TocHeading[];
  source: string;
  keyFacts?: KeyFact[];
  faqs?: FaqItem[];
  mapLabel?: string;
  mapQuery?: string;
  related?: React.ReactNode;
  affiliateContent?: boolean;
  quickAnswer?: string;
}

export function ContentPageLayout({
  breadcrumbs,
  category,
  badges,
  title,
  intro,
  author,
  publishedAt,
  updatedAt,
  image,
  headings,
  source,
  keyFacts,
  faqs,
  mapLabel,
  mapQuery,
  related,
  affiliateContent,
  quickAnswer,
}: ContentPageLayoutProps) {
  return (
    <article>
      <Container className="pt-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge tone="forest">{category}</Badge>
          {badges?.map((badge) => (
            <Badge key={badge} tone="outline">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</p>
        <div className="mt-6 max-w-xl">
          <AuthorBox author={author} publishedAt={publishedAt} updatedAt={updatedAt} />
        </div>
      </Container>

      <Container className="mt-8">
        <div className="overflow-hidden rounded-3xl border border-border">
          <ResponsiveImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="100vw"
            className="aspect-16/9"
          />
        </div>
      </Container>

      {quickAnswer ? (
        <Container className="mt-8">
          <p className="rounded-2xl border border-forest/25 bg-forest/5 px-6 py-5 text-base leading-relaxed text-ink">
            <strong className="font-semibold text-forest">In short: </strong>
            {quickAnswer}
          </p>
        </Container>
      ) : null}

      <Container className="prose-article mt-10 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <MDXRemote
            source={source}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />

          {mapLabel ? (
            <div className="mt-10">
              <MapPlaceholder label={mapLabel} mapsQuery={mapQuery} />
            </div>
          ) : null}

          {faqs && faqs.length > 0 ? (
            <div className="mt-10">
              <FAQ items={faqs} />
            </div>
          ) : null}

          {affiliateContent ? (
            <div className="mt-10">
              <AffiliateDisclosure />
            </div>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents headings={headings} />
          {keyFacts && keyFacts.length > 0 ? <KeyFacts facts={keyFacts} /> : null}
        </aside>
      </Container>

      {related ? <Container className="mt-16">{related}</Container> : null}

      <Container className="my-16">
        <div className="rounded-3xl border border-border bg-paper-warm p-8 sm:p-10">
          <h2 className="font-display text-2xl text-ink">Get more Finland travel guides</h2>
          <p className="mt-2 max-w-lg text-sm text-ink-muted">
            Practical itineraries and hidden gems, straight to your inbox. No spam, unsubscribe
            anytime.
          </p>
          <div className="mt-6 max-w-xl">
            <NewsletterForm compact />
          </div>
        </div>
      </Container>
    </article>
  );
}
