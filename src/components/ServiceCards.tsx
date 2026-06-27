"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SERVICES } from "@/lib/constants";

interface ServiceCardsProps {
  active: boolean;
}

const CARD_VARIANTS = ["gold", "silver", "copper"] as const;

export default function ServiceCards({ active }: ServiceCardsProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const wrap = wrapRef.current;
      if (!wrap || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>(".js-service-card", wrap);
      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
        gsap.set(card, { transformPerspective: 900 });
        const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" });
        const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" });

        const onMove = contextSafe((event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotY(px * 7);
          rotX(-py * 7);
        });
        const onEnter = contextSafe(() => {
          gsap.to(card, { scale: 1.03, y: -6, duration: 0.35, ease: "power3.out" });
        });
        const onLeave = contextSafe(() => {
          rotX(0);
          rotY(0);
          gsap.to(card, { scale: 1, y: 0, duration: 0.45, ease: "power3.out" });
        });

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: wrapRef }
  );

  return (
    <div
      ref={wrapRef}
      inert={!active}
      aria-hidden={!active}
      className={`js-service-cards absolute inset-x-0 top-[43%] z-20 flex -translate-y-1/2 justify-center px-5 md:top-[46%] ${
        active ? "" : "pointer-events-none"
      }`}
    >
      <ul className="mx-auto flex w-full max-w-sm flex-col items-stretch justify-center gap-8 md:max-w-4xl md:flex-row md:gap-10">
        {SERVICES.map((service, index) => (
          <li key={service.id} className="md:flex-1">
            <div
              className={`service-card service-card--${CARD_VARIANTS[index]} js-service-card group`}
            >
              <div
                data-lit-target
                className="service-card__face"
                style={{
                  boxShadow:
                    "0 30px 60px rgb(0 0 0 / 0.6), 0 0 calc(var(--lit, 0) * 44px) rgb(255 201 124 / calc(var(--lit, 0) * 0.2))",
                  filter: "brightness(calc(0.82 + var(--lit, 0) * 0.55))",
                }}
              >
                <span className="text-[11px] tracking-[0.3em] text-white/50">
                  0{index + 1}
                </span>
                <h3 className="font-accent text-lg text-white md:text-xl">
                  {service.name}
                </h3>
                <p className="text-xs leading-snug text-white/75 md:text-sm md:leading-relaxed">
                  {service.outcome}
                </p>
                <a
                  href={service.caseHref}
                  tabIndex={active ? 0 : -1}
                  className="mt-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-white focus-visible:text-white"
                >
                  See a real case
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
