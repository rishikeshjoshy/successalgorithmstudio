"use client";

import { useMemo, useRef } from "react";
import LampScene from "@/components/LampScene";
import { useLampControls } from "@/hooks/useLampControls";
import { createLampSceneState } from "@/lib/lamp-state";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The lamp as ambient background for the long-form content pages: same
 * WebGL room pinned behind the scrolling text, aim still following the
 * pointer. Runs slightly dimmer than the hero so body copy stays first.
 * Mounted once by the (content) route-group layout.
 */
export default function ContentLamp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lampState = useMemo(() => createLampSceneState(), []);

  useLampControls(containerRef, lampState);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.to(lampState, { intensityScale: 0.9, duration: 0.6, ease: "none" });
        return;
      }

      // Quick switch-on blink, then the same idle breathing as the hero.
      gsap.to(lampState, {
        keyframes: [
          { intensityScale: 0.6, duration: 0.08 },
          { intensityScale: 0.2, duration: 0.09 },
          { intensityScale: 0.9, duration: 0.4, ease: "power2.out" },
        ],
      });
      gsap.to(lampState, {
        idleSwayX: 0.013,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      });
      gsap.to(lampState, {
        idleSwayZ: -0.017,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.1,
      });
      gsap.fromTo(
        lampState,
        { glow: 0.97 },
        { glow: 1.03, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4 }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <LampScene state={lampState} />
    </div>
  );
}
