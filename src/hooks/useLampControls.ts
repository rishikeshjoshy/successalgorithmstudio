"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { AIM, BEAM, LIGHT_POOL } from "@/lib/constants";
import type { LampSceneState } from "@/lib/lamp-state";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const quantize = (value: number, step: number) => Math.round(value / step) * step;

const RAD_TO_DEG = 180 / Math.PI;

/**
 * Maps pointer position to the lamp and mirrors the resulting light cone into
 * the DOM. Eases a normalized aim vector into the shared LampSceneState (read
 * by the WebGL head/spotlight every frame), publishes the cone geometry as
 * CSS variables (--beam-*) for the reveal mask, and lights every
 * [data-lit-target] by actually intersecting it with the cone: angular
 * penumbra falloff, distance falloff, and the live bulb power.
 */
export function useLampControls(
  containerRef: RefObject<HTMLElement | null>,
  state: LampSceneState
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetX = 0;
    let targetY = 0;
    let raf = 0;
    let frame = 0;
    let litTargets: HTMLElement[] = [];

    // Quantized last-written values: CSS var writes invalidate the masked
    // layer, so only touch them when a change would be visible.
    let lastApexY = NaN;
    let lastSweep = NaN;
    let lastSpread = NaN;
    let lastPower = NaN;

    const collectTargets = () => {
      litTargets = Array.from(
        container.querySelectorAll<HTMLElement>("[data-lit-target]")
      );
    };
    collectTargets();

    const onPointerMove = (event: PointerEvent) => {
      targetX = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      targetY = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
    };

    const tick = () => {
      const k = reduced ? 1 : AIM.ease;
      state.aimX += (targetX - state.aimX) * k;
      state.aimY += (targetY - state.aimY) * k;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Cone apex = the lamp head; the beam swings toward the floor pool.
      const apexYPct =
        width / height < 0.8 ? BEAM.apexYPortrait : BEAM.apexYLandscape;
      const apexX = (BEAM.apexX / 100) * width;
      const apexY = (apexYPct / 100) * height;
      const poolX =
        ((LIGHT_POOL.baseX + state.aimX * LIGHT_POOL.rangeX) / 100) * width;
      const poolY =
        ((LIGHT_POOL.baseY + state.aimY * LIGHT_POOL.rangeY) / 100) * height;

      // 0 = straight down, positive = leaning right.
      const sweepRad = Math.atan2(poolX - apexX, poolY - apexY);
      const spreadRad = (BEAM.spreadDeg / RAD_TO_DEG) * state.coneScale;
      const power = clamp(state.glow * state.intensityScale, 0, 1);

      // Conic-gradient angles run clockwise from north, so a screen-space
      // lean toward -X (left) is a positive rotation past 180deg: negate.
      const sweepDeg = quantize(-sweepRad * RAD_TO_DEG, 0.2);
      if (sweepDeg !== lastSweep) {
        container.style.setProperty("--beam-sweep", `${sweepDeg.toFixed(1)}deg`);
        lastSweep = sweepDeg;
      }
      const spreadDeg = quantize(spreadRad * RAD_TO_DEG, 0.2);
      if (spreadDeg !== lastSpread) {
        container.style.setProperty("--beam-spread", `${spreadDeg.toFixed(1)}deg`);
        lastSpread = spreadDeg;
      }
      const quantPower = quantize(power, 0.02);
      if (quantPower !== lastPower) {
        container.style.setProperty("--beam-power", quantPower.toFixed(2));
        lastPower = quantPower;
      }
      if (apexYPct !== lastApexY) {
        container.style.setProperty("--beam-x", `${BEAM.apexX}%`);
        container.style.setProperty("--beam-y", `${apexYPct}%`);
        lastApexY = apexYPct;
      }

      // The DOM mutates rarely; re-collect occasionally instead of observing.
      if (++frame % 90 === 0) collectTargets();

      const reach = (BEAM.reachVh / 100) * height;

      // Batch all reads before all writes to avoid layout thrash.
      const rects = litTargets.map((el) => el.getBoundingClientRect());
      rects.forEach((rect, i) => {
        const vx = rect.left + rect.width / 2 - apexX;
        const vy = rect.top + rect.height / 2 - apexY;
        let lit = 0;
        if (vy > 0) {
          // Angular falloff: fully lit inside 60% of the cone, penumbra
          // fading out at 160%.
          const delta = Math.abs(Math.atan2(vx, vy) - sweepRad);
          const angular = 1 - smoothstep(spreadRad * 0.6, spreadRad * 1.6, delta);
          const distance = clamp(1.25 - Math.hypot(vx, vy) / reach, 0, 1);
          lit = clamp(angular * distance * power, 0, 1);
        }
        litTargets[i].style.setProperty("--lit", quantize(lit, 0.01).toFixed(2));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [containerRef, state]);
}
