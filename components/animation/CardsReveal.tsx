"use client";

import { useRef } from "react";
import { ensureGsapPlugins, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap/plugins";

ensureGsapPlugins();

/**
 * Staggers the direct children of the wrapped grid/list on scroll-in.
 * Intended for destination, article and itinerary card grids.
 */
export function CardsReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;

      const items = gsap.utils.toArray<HTMLElement>(scope.current.children);
      if (items.length === 0) return;

      gsap.from(items, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
