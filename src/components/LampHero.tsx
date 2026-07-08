"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LampScene from "@/components/LampScene";
import StudioName from "@/components/StudioName";
import HeroButton from "@/components/HeroButton";
import StoryCircle from "@/components/StoryCircle";
import ServiceCards from "@/components/ServiceCards";
import SocialLinks from "@/components/SocialLinks";

import { useLampControls } from "@/hooks/useLampControls";
import { useHeroTimelines } from "@/hooks/useHeroTimelines";
import { createLampSceneState } from "@/lib/lamp-state";
import { useStory } from "@/lib/story-context";
import type { HeroMode } from "@/lib/constants";

/**
 * The whole site: one screen, one lamp. Owns the brand/services mode state
 * and composes the WebGL scene with the DOM overlays.
 */
export default function LampHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<HeroMode>("brand");
  const lampState = useMemo(() => createLampSceneState(), []);
  const { openStory } = useStory();

  useLampControls(containerRef, lampState);
  const { applyMode } = useHeroTimelines({ scopeRef: containerRef, lampState });

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    applyMode(mode);
  }, [mode, applyMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode("brand");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const knowledgeRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = knowledgeRef.current;
    if (!el) return;
    const on = () => el.classList.add("button--pressed");
    const off = () => el.classList.remove("button--pressed");
    el.addEventListener("pointerdown", on);
    el.addEventListener("pointerup", off);
    el.addEventListener("pointercancel", off);
    el.addEventListener("pointerleave", off);
    return () => {
      el.removeEventListener("pointerdown", on);
      el.removeEventListener("pointerup", off);
      el.removeEventListener("pointercancel", off);
      el.removeEventListener("pointerleave", off);
    };
  }, []);

  const brandHidden = mode === "services";
  const handleToggle = () => setMode((m) => (m === "brand" ? "services" : "brand"));

  return (
    <main
      ref={containerRef}
      className="relative h-dvh w-full overflow-hidden bg-ink text-bone"
    >
      <LampScene state={lampState} />

      <div aria-hidden className="vignette pointer-events-none absolute inset-0 z-10" />
      <div aria-hidden className="noise-overlay pointer-events-none absolute inset-0 z-10" />

      {/* UI root starts invisible; the intro timeline brings it into the light. */}
      <div className="js-ui-root relative z-20 h-full opacity-0">
        {/* The name is painted on the backdrop: only the beam reveals it. The
            wrapper spans the viewport so the mask geometry matches the cone. */}
        <div
          aria-hidden={brandHidden}
          className="light-mask pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-x-0 top-[44%] flex -translate-y-1/2 flex-col items-center px-4 md:top-[50%]">
            <StudioName />
          </div>
        </div>

        <div inert={brandHidden} className={brandHidden ? "pointer-events-none" : undefined}>
          <StoryCircle
            side="left"
            label="Our Story"
            href="#our-story"
            mode={mode}
            onClick={(event) => {
              event.preventDefault();
              openStory();
            }}
          />
          <StoryCircle side="right" label="Your Story" href="/your-story" mode={mode} />
        </div>

        <ServiceCards active={mode === "services"} />

        <div className="absolute inset-x-0 bottom-20 flex justify-center md:bottom-24">
          <HeroButton mode={mode} onToggle={handleToggle} />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <a ref={knowledgeRef} href="/knowledge" className="button button--compact">
            <div>
              <div>
                <div className="uppercase tracking-[0.1em]">Knowledge Repository</div>
              </div>
            </div>
          </a>
        </div>

        <SocialLinks />
      </div>
    </main>
  );
}
