"use client";

import { useEffect } from "react";
import YourStoryQuiz from "@/components/YourStoryQuiz";

interface YourStoryPanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "Your Story" side sheet: mirrors OurStoryPanel from the right third of
 * the viewport, hosting the six-question quiz. Same CSS-transition slide —
 * no rAF dependency. The standalone /your-story route still exists for
 * direct links; this drawer is the in-place path.
 */
export default function YourStoryPanel({ open, onClose }: YourStoryPanelProps) {
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
      className={"story-drawer story-drawer--right" + (open ? " story-drawer--open" : "")}
      inert={!open}
      aria-label="Your Story"
    >
      <div className="story-drawer__content">
        <button onClick={onClose} className="case-drawer__close" aria-label="Close">
          ✕ Close
        </button>
        <YourStoryQuiz inPanel />
      </div>
    </aside>
  );
}
