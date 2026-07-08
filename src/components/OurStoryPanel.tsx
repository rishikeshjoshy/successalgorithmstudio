"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface OurStoryPanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "Our Story" slide-out panel, opened from Nav on any route. Reuses the same
 * clip-path wipe technique as the hero's case-study overlay, but positioned
 * fixed (not absolute) since it isn't scoped inside the hero's own <main>.
 *
 * Section C (founder story) is intentionally omitted — the source copy doc
 * marks it a bracketed placeholder with no real founder narrative yet ("do
 * not publish placeholders live"). Insert it here once written. The doc's
 * "See full Master Brand Blueprint" CTA is also omitted — marked internal/
 * team-only in the source doc.
 */
export default function OurStoryPanel({ open, onClose }: OurStoryPanelProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (open) {
      gsap.fromTo(
        overlay,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "expo.out", overwrite: true }
      );
      gsap.set(content, { opacity: 0, y: 28 });
      gsap.to(content, { opacity: 1, y: 0, duration: 0.45, delay: 0.25, ease: "power3.out" });
    } else {
      gsap.to(overlay, { clipPath: "inset(100% 0 0 0)", duration: 0.38, ease: "power3.in", overwrite: true });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      ref={overlayRef}
      className="our-story-overlay"
      style={{ clipPath: "inset(100% 0 0 0)" } as React.CSSProperties}
      inert={!open}
    >
      <div ref={contentRef} className="case-drawer">
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
    </div>
  );
}
