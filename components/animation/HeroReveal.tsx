"use client";

import { useRef } from "react";
import { ensureGsapPlugins, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap/plugins";

ensureGsapPlugins();

/**
 * Fades/slides in [data-hero-text] children and reveals [data-hero-image].
 * All content renders normally in SSR HTML; the initial "hidden" state is
 * only ever applied by GSAP on mount, so nothing is hidden without JS.
 */
export function HeroReveal({
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

      const textEls = scope.current.querySelectorAll("[data-hero-text]");
      const imageEl = scope.current.querySelector("[data-hero-image]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (textEls.length > 0) {
        tl.from(textEls, { opacity: 0, y: 22, duration: 0.7, stagger: 0.12 });
      }
      if (imageEl) {
        tl.from(imageEl, { opacity: 0, scale: 1.04, duration: 0.9 }, "-=0.5");
      }
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
