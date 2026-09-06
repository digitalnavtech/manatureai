// Generates local, license-free SVG placeholder photography for the site.
// Run with: npm run placeholders
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "images");

const PALETTES = {
  forest: { sky: ["#EFE7D4", "#D7E4D1"], far: "#4a6b52", near: "#1f3a2c", accent: "#c98a3d" },
  lake: { sky: ["#E7EEE7", "#CFE2E2"], far: "#3c6e71", near: "#1f3a2c", accent: "#d9cdb4" },
  city: { sky: ["#F3ECDC", "#E4DAC4"], far: "#52584a", near: "#23281f", accent: "#c98a3d" },
  lapland: { sky: ["#EAF1F4", "#D3E3EA"], far: "#7d93a0", near: "#2f3e46", accent: "#5b8266" },
  islands: { sky: ["#EFF3EA", "#D9E6DE"], far: "#5b8266", near: "#1f3a2c", accent: "#3c6e71" },
  sauna: { sky: ["#F5EBDA", "#EAD9BE"], far: "#8a5a35", near: "#3a2c1f", accent: "#c98a3d" },
};

function hills(w, h, color, baseline, amplitude, seed) {
  const points = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y =
      baseline +
      Math.sin(i * 0.9 + seed) * amplitude +
      Math.cos(i * 0.4 + seed * 2) * (amplitude * 0.4);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M0,${h} L${points.join(" L")} L${w},${h} Z`;
}

function trees(x, y, scale, color) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" fill="${color}" opacity="0.85">
      <path d="M0,-40 L14,-10 L6,-10 L18,14 L8,14 L20,40 L-20,40 L-8,14 L-18,14 L-6,-10 L-14,-10 Z" />
    </g>`;
}

function scene({ w, h, palette, seed, motif, label, tag }) {
  const p = PALETTES[palette];
  const treeGroup =
    motif === "forest"
      ? [0.18, 0.32, 0.62, 0.78, 0.88].map((f, i) =>
          trees(w * f, h * 0.78, 0.9 + (i % 3) * 0.35, i % 2 === 0 ? p.near : p.far)
        ).join("")
      : "";

  const waterLines =
    motif === "lake" || motif === "islands"
      ? Array.from({ length: 6 })
          .map((_, i) => {
            const y = h * 0.8 + i * 6;
            return `<line x1="${w * 0.08}" y1="${y}" x2="${w * 0.92}" y2="${y}" stroke="${p.sky[1]}" stroke-width="2" opacity="${0.5 - i * 0.06}" />`;
          })
          .join("")
      : "";

  const snow =
    motif === "lapland"
      ? Array.from({ length: 26 })
          .map(() => {
            const x = Math.random() * w;
            const y = h * 0.15 + Math.random() * h * 0.5;
            const r = 1 + Math.random() * 1.8;
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="0.8" />`;
          })
          .join("")
      : "";

  const sauna =
    motif === "sauna"
      ? `<g transform="translate(${w * 0.72} ${h * 0.5})" opacity="0.9">
           <rect x="-40" y="-10" width="90" height="70" rx="4" fill="${p.near}" />
           <polygon points="-50,-10 5,-52 60,-10" fill="${p.far}" />
           <rect x="-8" y="20" width="26" height="40" fill="${p.sky[0]}" opacity="0.7" />
         </g>`
      : "";

  const sun = `<circle cx="${w * (motif === "sauna" ? 0.16 : 0.82)}" cy="${h * 0.24}" r="${h * 0.09}" fill="${p.accent}" opacity="0.85" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="sky-${seed}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${p.sky[0]}" />
      <stop offset="100%" stop-color="${p.sky[1]}" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky-${seed})" />
  ${sun}
  ${snow}
  <path d="${hills(w, h, p.far, h * 0.62, h * 0.045, seed)}" fill="${p.far}" opacity="0.55" />
  <path d="${hills(w, h, p.near, h * 0.74, h * 0.03, seed + 3)}" fill="${p.near}" opacity="0.9" />
  ${waterLines}
  ${treeGroup}
  ${sauna}
  <g transform="translate(${w * 0.04} ${h - h * 0.09})">
    <rect x="0" y="-30" width="${Math.min(w * 0.62, 8 + tag.length * 9.5)}" height="26" rx="13" fill="rgba(35,40,31,0.55)" />
    <text x="14" y="-12" font-family="Arial, sans-serif" font-size="13" fill="#faf7f1" font-weight="600">${tag}</text>
  </g>
</svg>`;
}

const images = [
  { file: "hero/finland-nature-hero.svg", w: 1600, h: 1200, palette: "lake", motif: "lake", label: "Misty Finnish lake shoreline at sunrise", tag: "Manature AI — placeholder" },

  { file: "destinations/helsinki-hero.svg", w: 1600, h: 900, palette: "city", motif: "none", label: "Helsinki waterfront skyline", tag: "Helsinki — placeholder" },
  { file: "destinations/porvoo-hero.svg", w: 1600, h: 900, palette: "lake", motif: "lake", label: "Porvoo's red ochre riverside warehouses", tag: "Porvoo — placeholder" },
  { file: "destinations/nuuksio-national-park-hero.svg", w: 1600, h: 900, palette: "forest", motif: "forest", label: "Forest trail in Nuuksio National Park", tag: "Nuuksio — placeholder" },
  { file: "destinations/finnish-lapland-hero.svg", w: 1600, h: 900, palette: "lapland", motif: "lapland", label: "Snow-covered fells in Finnish Lapland", tag: "Lapland — placeholder" },
  { file: "destinations/turku-hero.svg", w: 1600, h: 900, palette: "lake", motif: "islands", label: "Turku archipelago coastline", tag: "Turku — placeholder" },
  { file: "destinations/suomenlinna-hero.svg", w: 1600, h: 900, palette: "islands", motif: "islands", label: "Sea fortress island of Suomenlinna", tag: "Suomenlinna — placeholder" },

  { file: "articles/best-things-to-do-in-helsinki.svg", w: 1200, h: 800, palette: "city", motif: "none", label: "Helsinki city harbour view", tag: "Article — placeholder" },
  { file: "articles/helsinki-hidden-gems.svg", w: 1200, h: 800, palette: "forest", motif: "forest", label: "Quiet hidden courtyard path in Helsinki", tag: "Article — placeholder" },
  { file: "articles/three-days-in-helsinki.svg", w: 1200, h: 800, palette: "lake", motif: "lake", label: "Helsinki seaside promenade", tag: "Article — placeholder" },
  { file: "articles/best-public-saunas-in-helsinki.svg", w: 1200, h: 800, palette: "sauna", motif: "sauna", label: "Wood-fired public sauna by the sea", tag: "Article — placeholder" },
  { file: "articles/helsinki-to-porvoo-day-trip.svg", w: 1200, h: 800, palette: "lake", motif: "lake", label: "Riverside road between Helsinki and Porvoo", tag: "Article — placeholder" },
  { file: "articles/helsinki-public-transport-guide.svg", w: 1200, h: 800, palette: "city", motif: "none", label: "Helsinki tram in the city centre", tag: "Article — placeholder" },
  { file: "articles/best-free-things-to-do-in-helsinki.svg", w: 1200, h: 800, palette: "forest", motif: "forest", label: "Public park in central Helsinki", tag: "Article — placeholder" },
  { file: "articles/how-to-visit-nuuksio-national-park-from-helsinki.svg", w: 1200, h: 800, palette: "forest", motif: "forest", label: "Boardwalk trail through Nuuksio forest", tag: "Article — placeholder" },

  { file: "itineraries/three-days-in-helsinki-itinerary.svg", w: 1200, h: 800, palette: "city", motif: "none", label: "Three day Helsinki itinerary cover image", tag: "Itinerary — placeholder" },
  { file: "itineraries/helsinki-to-lapland-one-week-itinerary.svg", w: 1200, h: 800, palette: "lapland", motif: "lapland", label: "One week Finland itinerary cover image", tag: "Itinerary — placeholder" },
  { file: "itineraries/helsinki-day-trips-itinerary.svg", w: 1200, h: 800, palette: "lake", motif: "islands", label: "Helsinki day trips itinerary cover image", tag: "Itinerary — placeholder" },

  { file: "misc/about-manature-ai.svg", w: 1200, h: 1000, palette: "forest", motif: "forest", label: "Manature AI founder exploring the Finnish forest", tag: "About — placeholder" },
  { file: "misc/instagram-1.svg", w: 600, h: 600, palette: "forest", motif: "forest", label: "Instagram preview: forest trail", tag: "@manatureai" },
  { file: "misc/instagram-2.svg", w: 600, h: 600, palette: "lake", motif: "lake", label: "Instagram preview: lakeside view", tag: "@manatureai" },
  { file: "misc/instagram-3.svg", w: 600, h: 600, palette: "city", motif: "none", label: "Instagram preview: Helsinki street", tag: "@manatureai" },
  { file: "misc/instagram-4.svg", w: 600, h: 600, palette: "lapland", motif: "lapland", label: "Instagram preview: Lapland snow", tag: "@manatureai" },
  { file: "misc/instagram-5.svg", w: 600, h: 600, palette: "islands", motif: "islands", label: "Instagram preview: archipelago island", tag: "@manatureai" },
  { file: "misc/instagram-6.svg", w: 600, h: 600, palette: "sauna", motif: "sauna", label: "Instagram preview: lakeside sauna", tag: "@manatureai" },
];

let count = 0;
for (const img of images) {
  const svg = scene({ ...img, seed: count });
  const outPath = join(publicDir, img.file);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, svg, "utf8");
  count++;
}

console.log(`Generated ${count} placeholder images in public/images/`);
