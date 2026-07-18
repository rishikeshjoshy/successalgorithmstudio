"use client";

import { useEffect } from "react";
import { playClick } from "@/lib/sfx";

/** Every button-like control across the site, in one delegated selector.
    Plain <button> covers the hamburger, services toggle, tabs, quiz options
    and drawer close; the rest are links styled as buttons. */
const CLICKABLE =
  "button, .button, .nav__call-btn, .nav-overlay__link, .pillar-cta, " +
  ".footer__cta, .footer__knowledge-strip, .page-close, .case-card__link";

/**
 * Global click SFX: one pointerdown listener on the document plays the
 * synthesized tick for anything button-shaped. Delegation means components
 * added later (menus, drawers) are covered without wiring each one.
 */
export default function ClickSfx() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(CLICKABLE)) playClick();
    };
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
