"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/nav";
import { ensureGsapPlugins, gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap/plugins";

ensureGsapPlugins();

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the menu on navigation. Adjusting state during render (rather than
  // in an Effect) avoids an extra render pass after each route change.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useGSAP(
    () => {
      if (!panelRef.current) return;

      if (open) {
        panelRef.current.style.display = "block";

        if (prefersReducedMotion()) return;

        const items = panelRef.current.querySelectorAll("[data-menu-item]");
        gsap
          .timeline()
          .fromTo(panelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" })
          .fromTo(
            items,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" },
            "-=0.05"
          );
      } else if (panelRef.current.style.display === "block") {
        if (prefersReducedMotion()) {
          panelRef.current.style.display = "none";
          return;
        }
        gsap.to(panelRef.current, {
          opacity: 0,
          duration: 0.15,
          ease: "power1.in",
          onComplete: () => {
            if (panelRef.current) panelRef.current.style.display = "none";
          },
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu-panel"
        ref={panelRef}
        hidden={!open}
        style={{ display: "none" }}
        className="fixed inset-x-0 top-[73px] bottom-0 z-40 overflow-y-auto bg-paper"
      >
        <nav aria-label="Mobile" className="px-6 py-8">
          <ul className="flex flex-col gap-1">
            {links.map((link, index) => (
              <li key={link.href} data-menu-item>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  className="block rounded-lg px-3 py-3.5 font-display text-2xl text-ink hover:bg-paper-warm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8" data-menu-item>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper"
            >
              Plan Your Trip
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
