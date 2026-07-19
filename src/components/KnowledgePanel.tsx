"use client";

import { useEffect } from "react";
import KnowledgeRepository from "@/components/KnowledgeRepository";

interface KnowledgePanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Knowledge Repository bottom sheet: rises from the bottom edge and stops
 * just below the lamp, covering the studio name and the button row while
 * the lamp keeps burning above it. Same CSS-transition mechanism as the
 * story drawers — no rAF dependency. The standalone /knowledge route stays
 * for direct links and the nav menu.
 */
export default function KnowledgePanel({ open, onClose }: KnowledgePanelProps) {
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
      className={"knowledge-sheet" + (open ? " knowledge-sheet--open" : "")}
      inert={!open}
      aria-label="Knowledge Repository"
    >
      <div className="knowledge-sheet__content">
        <button onClick={onClose} className="case-drawer__close" aria-label="Close">
          ✕ Close
        </button>
        <KnowledgeRepository inPanel />
      </div>
    </aside>
  );
}
