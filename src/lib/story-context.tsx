"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import OurStoryPanel from "@/components/OurStoryPanel";
import YourStoryPanel from "@/components/YourStoryPanel";
import KnowledgePanel from "@/components/KnowledgePanel";

interface StoryContextValue {
  openStory: () => void;
  openYourStory: () => void;
  openKnowledge: () => void;
}

const StoryContext = createContext<StoryContextValue | null>(null);

/**
 * Owns both story drawers globally: "Our Story" slides in from the left,
 * "Your Story" (the quiz) from the right. Openable from the hero pills or
 * the nav menu on any route; each drawer covers a third of the viewport on
 * desktop and leaves the rest of the page intact.
 */
export function StoryProvider({ children }: { children: ReactNode }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [yourStoryOpen, setYourStoryOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  return (
    <StoryContext.Provider
      value={{
        openStory: () => setStoryOpen(true),
        openYourStory: () => setYourStoryOpen(true),
        openKnowledge: () => setKnowledgeOpen(true),
      }}
    >
      {children}
      <OurStoryPanel open={storyOpen} onClose={() => setStoryOpen(false)} />
      <YourStoryPanel open={yourStoryOpen} onClose={() => setYourStoryOpen(false)} />
      <KnowledgePanel open={knowledgeOpen} onClose={() => setKnowledgeOpen(false)} />
    </StoryContext.Provider>
  );
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error("useStory must be used within StoryProvider");
  return ctx;
}
