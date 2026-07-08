"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import OurStoryPanel from "@/components/OurStoryPanel";

interface StoryContextValue {
  openStory: () => void;
}

const StoryContext = createContext<StoryContextValue | null>(null);

/**
 * Owns the "Our Story" panel's open state. Lives above both Nav (hamburger
 * menu entry) and LampHero (flanking hero button) so either can trigger the
 * same panel without a direct parent/child relationship.
 */
export function StoryProvider({ children }: { children: ReactNode }) {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <StoryContext.Provider value={{ openStory: () => setStoryOpen(true) }}>
      {children}
      <OurStoryPanel open={storyOpen} onClose={() => setStoryOpen(false)} />
    </StoryContext.Provider>
  );
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
}
