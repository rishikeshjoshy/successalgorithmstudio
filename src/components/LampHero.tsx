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
  const { openStory, openYourStory, openKnowledge } = useStory();

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

        <ServiceCards active={mode === "services"} />

        {/* Bottom cluster: story pills share one line with the services
            toggle on desktop, stack under it on mobile. The pills fade out
            in services mode (js-brand-el) but keep their layout slot, so
            the toggle never shifts. */}
        <div className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 md:bottom-24 md:flex-row md:justify-center md:gap-8">
          <div className="order-2 md:order-1" inert={brandHidden}>
            <StoryCircle
              label="Our Story"
              href="#our-story"
              mode={mode}
              onClick={(event) => {
                event.preventDefault();
                openStory();
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <HeroButton mode={mode} onToggle={handleToggle} />
          </div>
          <div className="order-3" inert={brandHidden}>
            <StoryCircle
              label="Your Story"
              href="/your-story"
              mode={mode}
              onClick={(event) => {
                event.preventDefault();
                openYourStory();
              }}
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <a
            ref={knowledgeRef}
            href="/knowledge"
            className="button button--compact"
            onClick={(event) => {
              event.preventDefault();
              openKnowledge();
            }}
          >
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
