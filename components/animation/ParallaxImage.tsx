"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";
import {
  ensureGsapPlugins,
  gsap,
  isDesktopViewport,
  prefersReducedMotion,
  useGSAP,
} from "@/lib/gsap/plugins";

ensureGsapPlugins();

/**
 * Subtle vertical parallax on the wrapped image, desktop-only. The child
 * <Image> should be sized slightly larger than its box (e.g. scale-110) so
 * the translation never reveals empty edges.
 */
export function ParallaxImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !isDesktopViewport() || !scope.current) return;

      const image = scope.current.querySelector("img");
      if (!image) return;

      gsap.fromTo(
        image,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <div ref={scope} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
