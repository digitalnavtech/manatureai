import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type {
  AnyFrontmatter,
  ArticleFrontmatter,
  ArticleItem,
  ContentItem,
  ContentType,
  DestinationFrontmatter,
  DestinationItem,
  ItineraryFrontmatter,
  ItineraryItem,
  TocHeading,
} from "@/types/content";

const CONTENT_ROOT = join(process.cwd(), "content");
const WORDS_PER_MINUTE = 200;

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function extractHeadings(content: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}

function readContentDir(type: ContentType): string[] {
  try {
    return readdirSync(join(CONTENT_ROOT, type)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

function loadOne<F extends AnyFrontmatter>(type: ContentType, filename: string): ContentItem<F> {
  const raw = readFileSync(join(CONTENT_ROOT, type, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as F;
  const slug = frontmatter.slug ?? filename.replace(/\.mdx$/, "");

  return {
    frontmatter,
    slug,
    type,
    content,
    readingTime: frontmatter.readingTime ?? computeReadingTime(content),
    headings: extractHeadings(content),
  };
}

const isProd = process.env.NODE_ENV === "production";

function withoutDrafts<F extends AnyFrontmatter>(items: ContentItem<F>[]): ContentItem<F>[] {
  return isProd ? items.filter((item) => !item.frontmatter.draft) : items;
}

export const getAllArticles = cache((): ArticleItem[] => {
  const files = readContentDir("articles");
  const items = files.map((f) => loadOne<ArticleFrontmatter>("articles", f));
  return withoutDrafts(sortByDate(items));
});

export const getAllDestinations = cache((): DestinationItem[] => {
  const files = readContentDir("destinations");
  const items = files.map((f) => loadOne<DestinationFrontmatter>("destinations", f));
  return withoutDrafts(sortByDate(items));
});

export const getAllItineraries = cache((): ItineraryItem[] => {
  const files = readContentDir("itineraries");
  const items = files.map((f) => loadOne<ItineraryFrontmatter>("itineraries", f));
  return withoutDrafts(sortByDate(items));
});

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return getAllArticles().find((item) => item.slug === slug);
}

export function getDestinationBySlug(slug: string): DestinationItem | undefined {
  return getAllDestinations().find((item) => item.slug === slug);
}

export function getItineraryBySlug(slug: string): ItineraryItem | undefined {
  return getAllItineraries().find((item) => item.slug === slug);
}

export function sortByDate<F extends AnyFrontmatter>(items: ContentItem<F>[]): ContentItem<F>[] {
  return [...items].sort(
    (a, b) => new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
  );
}

export function filterByDestination<F extends AnyFrontmatter>(
  items: ContentItem<F>[],
  destinationSlug: string
): ContentItem<F>[] {
  return items.filter((item) => item.frontmatter.destination === destinationSlug);
}

export function filterByCategory<F extends AnyFrontmatter>(
  items: ContentItem<F>[],
  category: string
): ContentItem<F>[] {
  return items.filter((item) => item.frontmatter.category.toLowerCase() === category.toLowerCase());
}

export function getFeatured<F extends AnyFrontmatter>(
  items: ContentItem<F>[],
  limit = 3
): ContentItem<F>[] {
  const featured = items.filter((item) => item.frontmatter.featured);
  const pool = featured.length > 0 ? featured : items;
  return pool.slice(0, limit);
}

export function getRelatedArticles(current: ArticleItem, limit = 3): ArticleItem[] {
  const all = getAllArticles().filter((item) => item.slug !== current.slug);

  const scored = all.map((item) => {
    let score = 0;
    if (item.frontmatter.destination && item.frontmatter.destination === current.frontmatter.destination) {
      score += 2;
    }
    if (item.frontmatter.category === current.frontmatter.category) {
      score += 1;
    }
    return { item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}

export function getRelatedDestinations(current: DestinationItem, limit = 3): DestinationItem[] {
  return getAllDestinations()
    .filter((item) => item.slug !== current.slug && item.frontmatter.region === current.frontmatter.region)
    .slice(0, limit)
    .concat(getAllDestinations().filter((item) => item.slug !== current.slug))
    .filter((item, index, arr) => arr.findIndex((i) => i.slug === item.slug) === index)
    .slice(0, limit);
}
