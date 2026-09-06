"use client";

import { useRef } from "react";
import { ensureGsapPlugins, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap/plugins";

ensureGsapPlugins();

/**
 * Wraps server-rendered section content and fades/slides it in once when it
 * scrolls into view. Content is fully present and visible without JS.
 */
export function ScrollReveal({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;

      gsap.from(scope.current, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
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
