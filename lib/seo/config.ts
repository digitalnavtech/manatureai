export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://manatureai.com";

export const SITE_NAME = "Manature AI";

export const SITE_TAGLINE = "Discover Finland Beyond the Usual Tourist Routes";

export const SITE_DESCRIPTION =
  "Practical Finland travel guides, hidden places and unforgettable nature experiences from Helsinki to Lapland.";

export const INSTAGRAM_URL = "https://www.instagram.com/manatureai/";
export const INSTAGRAM_HANDLE = "@manatureai";

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@manatureai.com";

export const DEFAULT_AUTHOR = "Manature AI Editorial Team";

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}
