"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LampScene from "@/components/LampScene";
import StudioName from "@/components/StudioName";
import HeroButton from "@/components/HeroButton";
import StoryCircle from "@/components/StoryCircle";
import ServiceCards from "@/components/ServiceCards";
import Dock from "@/components/Dock";
import { useLampControls } from "@/hooks/useLampControls";
import { useHeroTimelines } from "@/hooks/useHeroTimelines";
import { createLampSceneState } from "@/lib/lamp-state";
import type { HeroMode } from "@/lib/constants";

/**
 * The whole site: one screen, one lamp. Owns the brand/services mode state
 * and composes the WebGL scene with the DOM overlays.
 */
export default function LampHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<HeroMode>("brand");
  const lampState = useMemo(() => createLampSceneState(), []);

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

  const brandHidden = mode === "services";

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
          <StoryCircle side="left" label="Our Story" hint="where we came from" href="#our-story" />
          <StoryCircle side="right" label="Your Story" hint="where you're going" href="#your-story" />
        </div>

        <ServiceCards active={mode === "services"} />

        <div className="absolute inset-x-0 top-[76%] flex justify-center md:top-[70%]">
          <HeroButton
            mode={mode}
            onToggle={() => setMode((m) => (m === "brand" ? "services" : "brand"))}
          />
        </div>

        <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center md:bottom-6">
          <Dock />
        </div>
      </div>
    </main>
  );
}
