interface Dims {
  width: number;
  height: number;
}

/** Matches the sizes produced by scripts/generate-placeholders.mjs. */
export function imageDims(src: string): Dims {
  if (src.includes("instagram-")) return { width: 600, height: 600 };
  if (src.includes("/destinations/")) return { width: 1600, height: 900 };
  if (src.includes("/hero/")) return { width: 1600, height: 1200 };
  if (src.includes("/misc/")) return { width: 1200, height: 1000 };
  return { width: 1200, height: 800 };
}
