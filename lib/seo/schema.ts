import { absoluteUrl, INSTAGRAM_URL, SITE_NAME, SITE_URL } from "./config";

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/** Passes absolute URLs through unchanged; resolves site-relative paths. */
function toAbsolute(url: string): string {
  return url.startsWith("http") ? url : absoluteUrl(url);
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/apple-icon"),
    sameAs: [INSTAGRAM_URL],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function personSchema(name: string, url?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(url ? { url } : {}),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface ArticleSchemaInput {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  isBlogPosting?: boolean;
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
  author,
  isBlogPosting = true,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": isBlogPosting ? "BlogPosting" : "Article",
    headline,
    description,
    image: [toAbsolute(image)],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-icon"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
  };
}

interface TouristDestinationSchemaInput {
  name: string;
  description: string;
  path: string;
  image: string;
  region: string;
}

export function touristDestinationSchema({
  name,
  description,
  path,
  image,
  region,
}: TouristDestinationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name,
    description,
    image: toAbsolute(image),
    url: absoluteUrl(path),
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: region,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "FI",
      addressRegion: region,
    },
  };
}

interface TouristAttractionSchemaInput {
  name: string;
  description: string;
  image: string;
  path: string;
}

export function touristAttractionSchema({
  name,
  description,
  image,
  path,
}: TouristAttractionSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    image: toAbsolute(image),
    url: absoluteUrl(path),
  };
}

interface VideoObjectSchemaInput {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function videoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
}: VideoObjectSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [toAbsolute(thumbnailUrl)],
    uploadDate,
    ...(contentUrl ? { contentUrl } : {}),
    ...(embedUrl ? { embedUrl } : {}),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
