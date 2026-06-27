"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DOCK_MAGNIFY } from "@/lib/constants";

interface CardItem {
  id: string;
  emoji: string;
  title: string;
  price: string;
  oldPrice: string;
  tag: string;
  cta: string;
}

// Placeholder product cards — multiplied across the bottom as a macOS-style dock.
const CARDS: CardItem[] = [
  { id: "lounge", emoji: "🛋️", title: "Lounge Chair", price: "$129", oldPrice: "$159", tag: "-20%", cta: "Add to cart" },
  { id: "cans", emoji: "🎧", title: "Studio Cans", price: "$89", oldPrice: "$120", tag: "Sale", cta: "Add to cart" },
  { id: "watch", emoji: "⌚", title: "Minimal Watch", price: "$199", oldPrice: "$240", tag: "New", cta: "Add to cart" },
  { id: "camera", emoji: "📷", title: "Range Finder", price: "$349", oldPrice: "$420", tag: "Hot", cta: "Add to cart" },
  { id: "pad", emoji: "🕹️", title: "Arcade Pad", price: "$59", oldPrice: "$79", tag: "-25%", cta: "Add to cart" },
  { id: "lamp", emoji: "💡", title: "Desk Lamp", price: "$74", oldPrice: "$99", tag: "Sale", cta: "Add to cart" },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * A row of product cards along the bottom, behaving like the macOS dock:
 * cards swell around the cursor (smoothstep falloff over DOCK_MAGNIFY.radius)
 * and lift slightly, easing via gsap.quickTo. Each card keeps its own CSS
 * hover (image shrinks, the buy button rises into view). The whole row scales
 * down to fit narrow viewports (the GSAP intro lives on the inner <nav>, so
 * the fit-scale on the wrapper never fights it).
 */
export default function Dock() {
  const fitRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Scale the whole dock down so it always fits the viewport width.
  useEffect(() => {
    const fit = fitRef.current;
    const nav = navRef.current;
    if (!fit || !nav) return;
    const apply = () => {
      const content = nav.scrollWidth;
      const scale = Math.min(1, (window.innerWidth - 24) / content);
      fit.style.transform = `scale(${scale})`;
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useGSAP(
    (_, contextSafe) => {
      const nav = navRef.current;
      if (!nav || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>(".js-dock-item", nav);
      gsap.set(cards, { transformOrigin: "50% 100%" });

      const scaleTos = cards.map((el) =>
        gsap.quickTo(el, "scale", { duration: 0.25, ease: "power2.out" })
      );
      const yTos = cards.map((el) =>
        gsap.quickTo(el, "y", { duration: 0.25, ease: "power2.out" })
      );

      const onMove = contextSafe((event: PointerEvent) => {
        cards.forEach((el, i) => {
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

      nav.addEventListener("pointermove", onMove);
      nav.addEventListener("pointerleave", onLeave);
      return () => {
        nav.removeEventListener("pointermove", onMove);
        nav.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: navRef }
  );

  return (
    <div ref={fitRef} className="origin-bottom">
      <nav
        ref={navRef}
        aria-label="Featured items"
        className="js-dock pointer-events-auto flex items-end justify-center gap-3"
      >
        {CARDS.map((card) => (
          <div key={card.id} className="js-dock-item dock-card">
            <span className="tag">{card.tag}</span>
            <div className="wrapper">
              <div className="card-image" aria-hidden>
                {card.emoji}
              </div>
              <div className="content">
                <span className="title">{card.title}</span>
                <span className="price">
                  {card.price} <span className="old-price">{card.oldPrice}</span>
                </span>
              </div>
            </div>
            <button type="button" className="card-btn">
              {card.cta}
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
}
