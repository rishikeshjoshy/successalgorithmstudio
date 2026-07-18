"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SERVICES } from "@/lib/site";

interface ServiceCardsProps {
  active: boolean;
}

const CARD_VARIANTS = ["gold", "silver", "copper"] as const;

export default function ServiceCards({ active }: ServiceCardsProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevActiveIdRef = useRef<string | null>(null);
  const activeIdRef = useRef<string | null>(null); // stale-closure-safe read inside GSAP
  const overlayOpenRef = useRef(false);
  const cooldownRef = useRef(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  // Keep activeIdRef in sync for GSAP closures
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  // Immediately close the overlay (used by close button and card re-click)
  const closeOverlay = useCallback(() => {
    overlayOpenRef.current = false;
    setActiveId(null);
  }, []);

  // Close overlay when switching out of services mode
  useEffect(() => {
    if (!active) {
      if (cooldownTimer.current) { clearTimeout(cooldownTimer.current); cooldownTimer.current = null; }
      overlayOpenRef.current = false;
      cooldownRef.current = false;
      setActiveId(null);
    }
  }, [active]);

  // GSAP overlay open/close — only animates on null↔service transitions
  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const wasOpen = prevActiveIdRef.current !== null;
    const isOpen = activeId !== null;
    prevActiveIdRef.current = activeId;

    if (isOpen && !wasOpen) {
      gsap.fromTo(overlay,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "expo.out", overwrite: true }
      );
      gsap.set(content, { opacity: 0, y: 28 });
      gsap.to(content, { opacity: 1, y: 0, duration: 0.45, delay: 0.25, ease: "power3.out" });
    } else if (!isOpen && wasOpen) {
      overlayOpenRef.current = false;
      cooldownRef.current = true;
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => { cooldownRef.current = false; }, 500);
      const cards = gsap.utils.toArray<HTMLElement>(".js-service-card", wrapRef.current);
      gsap.to(cards, { scale: 1, y: 0, rotationX: 0, rotationY: 0, duration: 0.45, ease: "power3.out" });
      gsap.to(overlay, { clipPath: "inset(100% 0 0 0)", duration: 0.38, ease: "power3.in", overwrite: true });
    }
  }, [activeId]);

  // 3D tilt + case study hover/tap state
  useGSAP(
    (_, contextSafe) => {
      const wrap = wrapRef.current;
      if (!wrap || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>(".js-service-card", wrap);
      const cleanups: Array<() => void> = [];

      cards.forEach((card, i) => {
        const service = SERVICES[i];
        gsap.set(card, { transformPerspective: 900 });
        const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" });
        const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" });

        const onMove = contextSafe((event: PointerEvent) => {
          if (overlayOpenRef.current) return;
          if (event.pointerType === "touch") return; // no tilt on touch
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotY(px * 7);
          rotX(-py * 7);
        });

        // Hover is affordance only (lift + tilt); opening is a real click.
        const onEnter = contextSafe((event: PointerEvent) => {
          if (overlayOpenRef.current || cooldownRef.current) return;
          if (event.pointerType !== "touch") {
            gsap.to(card, { scale: 1.03, y: -6, duration: 0.35, ease: "power3.out" });
          }
        });

        const onLeave = contextSafe(() => {
          if (overlayOpenRef.current) return;
          rotX(0);
          rotY(0);
          gsap.to(card, { scale: 1, y: 0, duration: 0.45, ease: "power3.out" });
        });

        const onClick = contextSafe(() => {
          if (cooldownRef.current) return;
          // Clicking the open card's slot again toggles it closed.
          if (overlayOpenRef.current && activeIdRef.current === service.id) {
            closeOverlay();
            return;
          }
          overlayOpenRef.current = true;
          setActiveId(service.id);
        });

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        card.addEventListener("click", onClick);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
          card.removeEventListener("click", onClick);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: wrapRef }
  );

  const activeService = SERVICES.find((s) => s.id === activeId) ?? null;

  return (
    <>
      {/* Case study overlay */}
      <div
        ref={overlayRef}
        className="case-overlay"
        style={{ clipPath: "inset(100% 0 0 0)" } as React.CSSProperties}
      >
        <div ref={contentRef} className="case-drawer">
          <button onClick={closeOverlay} className="case-drawer__close" aria-label="Close">
            ✕ Close
          </button>
          {activeService && (
            <>
              <p className="case-drawer__eyebrow">{activeService.name} — Case Studies</p>
              <div className="case-grid">
                {activeService.caseStudies.map((cs) => (
                  <div key={cs.id} className="case-card">
                    <div className="case-card__tags">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="case-card__tag">{tag}</span>
                      ))}
                    </div>
                    <p className="case-card__client">{cs.client} · {cs.year}</p>
                    <h3 className="case-card__title">{cs.title}</h3>
                    <p className="case-card__summary">{cs.summary}</p>
                    <a
                      href={cs.href}
                      className="case-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M6 2H2.5A1.5 1.5 0 0 0 1 3.5v8A1.5 1.5 0 0 0 2.5 13h8A1.5 1.5 0 0 0 12 11.5V8M8 1h5v5M12.5 1.5 6.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View Case Study
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Service cards
          Mobile: fixed top/bottom, scrollable so all 3 cards fit any screen
          Desktop: absolute-centered with -translate-y-1/2 */}
      <div
        ref={wrapRef}
        inert={!active}
        aria-hidden={!active}
        className={[
          "js-service-cards absolute inset-x-0 z-20 flex justify-center px-5",
          // Mobile: fixed range + scrollable
          "top-[8%] bottom-[30%] overflow-y-auto items-start",
          // Desktop: centered
          "md:top-[46%] md:bottom-auto md:overflow-visible md:-translate-y-1/2 md:items-center",
          active ? "" : "pointer-events-none",
        ].join(" ")}
      >
        <ul className="mx-auto flex w-full max-w-sm flex-col items-stretch justify-start gap-5 py-3 md:w-[92vw] md:max-w-[1500px] md:flex-row md:gap-10 md:py-0 md:justify-center">
          {SERVICES.map((service, index) => (
            <li key={service.id} className="md:flex-1">
              <div
                data-open={activeId === service.id ? "true" : undefined}
                className={`service-card service-card--${CARD_VARIANTS[index]} js-service-card`}
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
                  <span className="mt-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/30">
                    {isTouch ? "Tap to explore" : "Click to explore"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
