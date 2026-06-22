"use client";

import { useCallback, useRef } from "react";
import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATIONS, EASES } from "@/lib/constants";
import type { HeroMode } from "@/lib/constants";
import type { LampSceneState } from "@/lib/lamp-state";

interface UseHeroTimelinesArgs {
  scopeRef: RefObject<HTMLDivElement | null>;
  lampState: LampSceneState;
}

/**
 * Owns every GSAP timeline of the hero:
 *  - switch-on intro (lamp flicker, UI stepping into the light)
 *  - idle breathing (lamp sway, glow flicker, hero button pulse)
 *  - brand <-> services mode transition (play / reverse)
 * Honors prefers-reduced-motion with simplified fades.
 */
export function useHeroTimelines({ scopeRef, lampState }: UseHeroTimelinesArgs) {
  const modeTlRef = useRef<gsap.core.Timeline | null>(null);
  const pulseRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduce = Boolean(ctx.conditions?.reduce);

          gsap.set(".js-service-card", { autoAlpha: 0 });

          // --- entrance: the lamp switches on, the UI steps into the light ---
          const intro = gsap.timeline({ defaults: { ease: EASES.out } });
          if (reduce) {
            intro
              .to(lampState, { intensityScale: 1, duration: 0.6, ease: "none" })
              .to(".js-ui-root", { autoAlpha: 1, duration: 0.4, ease: "none" }, "<");
          } else {
            intro
              .to(lampState, {
                keyframes: [
                  { intensityScale: 0, duration: 0.3 },
                  { intensityScale: 0.5, duration: 0.07 },
                  { intensityScale: 0.1, duration: 0.1 },
                  { intensityScale: 0.8, duration: 0.06 },
                  { intensityScale: 0.25, duration: 0.12 },
                  { intensityScale: 1, duration: 0.55, ease: "power2.out" },
                ],
              })
              .set(".js-ui-root", { autoAlpha: 1 }, "-=0.5")
              .from(".js-studio-name", { y: 28, autoAlpha: 0, duration: 0.9 }, "<")
              .from(".js-hero-button", { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.55")
              .from(
                ".js-circle",
                { scale: 0.85, autoAlpha: 0, duration: 0.8, ease: EASES.back, stagger: 0.12 },
                "-=0.5"
              )
              .from(".js-dock", { y: 34, autoAlpha: 0, duration: 0.7 }, "-=0.55");
          }

          // --- idle: lamp breathing + button pulse ---
          if (!reduce) {
            gsap.to(lampState, {
              idleSwayX: 0.013,
              duration: 3.6,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1.4,
            });
            gsap.to(lampState, {
              idleSwayZ: -0.017,
              duration: 4.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1.8,
            });
            gsap.to(lampState, {
              glow: () => gsap.utils.random(0.94, 1.06),
              duration: () => gsap.utils.random(0.7, 1.8),
              ease: "sine.inOut",
              repeat: -1,
              repeatRefresh: true,
              delay: 2.2,
            });
            pulseRef.current = gsap.to(".js-hero-button", {
              scale: 1.04,
              duration: 1.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              repeatDelay: 2.4,
              delay: 4,
            });
          }

          // --- brand <-> services: played forward and in reverse ---
          const tl = gsap.timeline({ paused: true, defaults: { ease: EASES.inOut } });
          if (reduce) {
            tl.to(".js-brand-el", { autoAlpha: 0, duration: 0.2, ease: "none" }).to(
              ".js-service-card",
              { autoAlpha: 1, duration: 0.25, ease: "none" }
            );
          } else {
            tl.to(".js-brand-el", {
              autoAlpha: 0,
              scale: 0.92,
              filter: "blur(6px)",
              duration: DURATIONS.brandOut,
              ease: "power2.in",
              stagger: 0.05,
            })
              .to(lampState, { coneScale: 1.6, duration: 1, ease: "sine.inOut" }, 0)
              .fromTo(
                ".js-service-card",
                { y: 44, scale: 0.95, autoAlpha: 0 },
                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: DURATIONS.cardIn,
                  ease: EASES.out,
                  stagger: DURATIONS.cardStagger,
                },
                "-=0.08"
              );
          }
          modeTlRef.current = tl;

          return () => {
            modeTlRef.current = null;
            pulseRef.current = null;
          };
        }
      );
    },
    { scope: scopeRef }
  );

  const applyMode = useCallback((mode: HeroMode) => {
    const tl = modeTlRef.current;
    if (!tl) return;
    if (mode === "services") {
      tl.play();
      pulseRef.current?.pause(0);
    } else {
      tl.reverse();
      pulseRef.current?.play();
    }
  }, []);

  return { applyMode };
}
