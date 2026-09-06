export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Helsinki", href: "/destinations/helsinki" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "Travel Guides", href: "/blog" },
  { label: "About", href: "/about" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Guides", href: "/blog" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
];
