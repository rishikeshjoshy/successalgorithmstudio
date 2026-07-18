"use client";

import { useEffect } from "react";

interface OurStoryPanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "Our Story" side sheet: slides in from the left and takes the left third
 * of the viewport (up to the lamp), leaving the rest of the page intact and
 * interactive. Full-width on mobile. The slide is a pure CSS transition
 * driven by the --open class, so it works even where rAF-based animation
 * (GSAP) is throttled — embedded previews, background tabs.
 *
 * Section C (founder story) is intentionally omitted — the source copy doc
 * marks it a bracketed placeholder with no real founder narrative yet ("do
 * not publish placeholders live"). Insert it here once written. The doc's
 * "See full Master Brand Blueprint" CTA is also omitted — marked internal/
 * team-only in the source doc.
 */
export default function OurStoryPanel({ open, onClose }: OurStoryPanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <aside
      className={"story-drawer story-drawer--left" + (open ? " story-drawer--open" : "")}
      inert={!open}
      aria-label="Our Story"
    >
      <div className="story-drawer__content">
        <button onClick={onClose} className="case-drawer__close" aria-label="Close">
          ✕ Close
        </button>

        <p className="case-drawer__eyebrow">The SAS Origin</p>
        <h2 className="our-story-overlay__heading">Why We Built the Algorithm</h2>

        <p className="our-story-overlay__body">
          Most founders don&rsquo;t have a talent problem. They have a systems problem. We watched
          brilliant operators — technically gifted, relentlessly hardworking — lose ground not
          because their product was weak, but because their brand, their sales process, and
          their own capability development were left to instinct instead of architecture.
          Success Algorithm Studios was built to close that gap.
        </p>

        <blockquote className="our-story-overlay__quote">
          &ldquo;Success is not a matter of chance — it is a matter of design. SAS builds the
          algorithm.&rdquo;
        </blockquote>

        <p className="our-story-overlay__body">
          We hold three convictions without exception: success is architectural, not accidental;
          customization is not optional — it is the product; and measurement is integrity. A
          strategy without a defined metric isn&rsquo;t a strategy. It&rsquo;s an opinion.
        </p>

        <p className="our-story-overlay__body">
          Within five years, SAS becomes the definitive authority on algorithmic success design —
          anchored by Success Algorithm University, a proprietary analytics platform, and a
          global footprint across South Asia, the Middle East, and English-speaking markets. This
          is not a services company. It&rsquo;s an institution being built in public.
        </p>
      </div>
    </aside>
  );
}
