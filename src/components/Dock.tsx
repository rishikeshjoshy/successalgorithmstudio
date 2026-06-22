"use client";

import { useRef } from "react";
import type { ReactElement } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DOCK_ITEMS, DOCK_MAGNIFY } from "@/lib/constants";
import type { DockIconId, DockItemData } from "@/lib/constants";

const ICONS: Record<DockIconId, ReactElement> = {
  "case-studies": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3.5 6.5a2 2 0 0 1 2-2h3l2 2.5h7.5a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
    </svg>
  ),
  process: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <polyline points="21 3 21 8 16 8" />
    </svg>
  ),
  experiments: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M10 3v6l-5 8.5A2 2 0 0 0 6.7 21h10.6a2 2 0 0 0 1.7-3.5L14 9V3" />
      <path d="M8.5 3h7" />
      <path d="M7.5 15h9" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3l-7 18-3.5-7.5L3 10z" />
    </svg>
  ),
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface DockProps {
  items?: DockItemData[];
}

/**
 * macOS-style dock: neighbouring icons magnify around the cursor, hovered
 * icons tilt and bounce, labels float above. Keyboard users get focus rings
 * and visible labels via :focus-visible.
 */
export default function Dock({ items = DOCK_ITEMS }: DockProps) {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const nav = navRef.current;
      if (!nav || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const buttons = gsap.utils.toArray<HTMLAnchorElement>(".js-dock-item", nav);
      gsap.set(buttons, { transformOrigin: "50% 100%" });

      const scaleTos = buttons.map((el) =>
        gsap.quickTo(el, "scale", { duration: 0.25, ease: "power2.out" })
      );
      const yTos = buttons.map((el) =>
        gsap.quickTo(el, "y", { duration: 0.25, ease: "power2.out" })
      );

      const onMove = contextSafe((event: PointerEvent) => {
        buttons.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const raw = Math.max(0, 1 - Math.abs(event.clientX - center) / DOCK_MAGNIFY.radius);
          const t = smoothstep(raw);
          scaleTos[i](1 + DOCK_MAGNIFY.scale * t);
          yTos[i](-DOCK_MAGNIFY.lift * t);
        });
      });
      const onLeave = contextSafe(() => {
        scaleTos.forEach((to) => to(1));
        yTos.forEach((to) => to(0));
      });

      const wiggles = buttons.map((el) =>
        contextSafe(() => {
          gsap.fromTo(
            el,
            { rotation: 0 },
            {
              keyframes: [
                { rotation: -7, duration: 0.1 },
                { rotation: 5, duration: 0.16 },
                { rotation: 0, duration: 0.4, ease: "elastic.out(1.2, 0.35)" },
              ],
              overwrite: "auto",
            }
          );
        })
      );

      nav.addEventListener("pointermove", onMove);
      nav.addEventListener("pointerleave", onLeave);
      buttons.forEach((el, i) => {
        el.addEventListener("pointerenter", wiggles[i]);
        el.addEventListener("click", wiggles[i]);
      });

      return () => {
        nav.removeEventListener("pointermove", onMove);
        nav.removeEventListener("pointerleave", onLeave);
        buttons.forEach((el, i) => {
          el.removeEventListener("pointerenter", wiggles[i]);
          el.removeEventListener("click", wiggles[i]);
        });
      };
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      aria-label="Studio dock"
      data-lit-target
      className="js-dock pointer-events-auto flex items-end gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      style={{ filter: "brightness(calc(0.85 + var(--lit, 0) * 0.45))" }}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="js-dock-item group relative grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-bone-dim transition-colors duration-200 hover:bg-white/[0.1] hover:text-lamp-bright focus-visible:bg-white/[0.1] focus-visible:text-lamp-bright md:h-12 md:w-12"
        >
          {ICONS[item.id]}
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/75 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-bone opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
