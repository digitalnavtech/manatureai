export interface FaqItem {
  question: string;
  answer: string;
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface BaseFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: string;
  destination?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  featuredImage: string;
  featuredImageAlt: string;
  readingTime?: number;
  featured?: boolean;
  draft?: boolean;
  keyFacts?: KeyFact[];
  faqs?: FaqItem[];
  affiliateContent?: boolean;
  quickAnswer?: string;
}

export type ArticleFrontmatter = BaseFrontmatter;

export interface DestinationFrontmatter extends BaseFrontmatter {
  region: string;
  bestTimeToVisit: string;
  gettingThere?: string;
}

export interface ItineraryFrontmatter extends BaseFrontmatter {
  days: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  destinations: string[];
}

export type ContentType = "articles" | "destinations" | "itineraries";

export type AnyFrontmatter =
  | ArticleFrontmatter
  | DestinationFrontmatter
  | ItineraryFrontmatter;

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ContentItem<F extends BaseFrontmatter = BaseFrontmatter> {
  frontmatter: F;
  slug: string;
  type: ContentType;
  content: string;
  readingTime: number;
  headings: TocHeading[];
}

export type ArticleItem = ContentItem<ArticleFrontmatter>;
export type DestinationItem = ContentItem<DestinationFrontmatter>;
export type ItineraryItem = ContentItem<ItineraryFrontmatter>;
