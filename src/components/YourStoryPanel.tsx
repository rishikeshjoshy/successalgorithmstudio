"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import YourStoryQuiz from "@/components/YourStoryQuiz";

interface YourStoryPanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "Your Story" side sheet: mirrors OurStoryPanel from the right third of
 * the viewport, hosting the six-question quiz. The standalone /your-story
 * route still exists for direct links; this drawer is the in-place path.
 */
export default function YourStoryPanel({ open, onClose }: YourStoryPanelProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    const content = contentRef.current;
    if (!drawer || !content) return;

    if (open) {
      gsap.to(drawer, { xPercent: 0, duration: 0.55, ease: "expo.out", overwrite: true });
      gsap.set(content, { opacity: 0, y: 24 });
      gsap.to(content, { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power3.out" });
    } else {
      gsap.to(drawer, { xPercent: 100, duration: 0.4, ease: "power3.in", overwrite: true });
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
    <aside
      ref={drawerRef}
      className="story-drawer story-drawer--right"
      style={{ transform: "translateX(100%)" } as React.CSSProperties}
      inert={!open}
      aria-label="Your Story"
    >
      <div ref={contentRef} className="story-drawer__content">
        <button onClick={onClose} className="case-drawer__close" aria-label="Close">
          ✕ Close
        </button>
        <YourStoryQuiz inPanel />
      </div>
    </aside>
  );
}
