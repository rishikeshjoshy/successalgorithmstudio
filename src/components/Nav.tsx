"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASES } from "@/lib/constants";
import { useStory } from "@/lib/story-context";

const MENU_LINKS = [
  { label: "Social Media", href: "/social-media" },
  { label: "Business Consulting", href: "/consulting" },
  { label: "Educational Workshops", href: "/workshops" },
  { label: "Our Story", href: "#our-story" },
  { label: "Your Story", href: "/your-story" },
  { label: "Knowledge Repository", href: "/knowledge" },
  { label: "Book a Call with Leadership", href: "/book" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { openStory } = useStory();

  useGSAP(
    (_, contextSafe) => {
      const overlay = overlayRef.current;
      if (!overlay || !contextSafe) return;

      if (menuOpen) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.fromTo(
          ".js-nav-link",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: EASES.back, stagger: 0.07 }
        );
      } else {
        gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: EASES.inOut });
      }
    },
    { dependencies: [menuOpen], scope: overlayRef }
  );

  const openStoryFromMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    openStory();
  };

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav__wordmark">
          <Image
            src="/sas-monogram-brass-tile.svg"
            alt="Success Algorithm Studios"
            width={48}
            height={48}
            className="nav__tile"
            priority
          />
        </Link>

        <div className="nav__right">
          <Link href="/book" className="nav__call-btn" aria-label="Book a call with leadership">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2Z" />
            </svg>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="nav__hamburger"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="nav-overlay"
        style={{ opacity: 0, visibility: "hidden" } as React.CSSProperties}
        inert={!menuOpen}
      >
        <ul className="nav-overlay__list">
          {MENU_LINKS.map((link) =>
            link.label === "Our Story" ? (
              <li key={link.label}>
                <a href={link.href} onClick={openStoryFromMenu} className="js-nav-link nav-overlay__link">
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="js-nav-link nav-overlay__link"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
