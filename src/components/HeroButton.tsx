"use client";

import type { HeroMode } from "@/lib/constants";

interface HeroButtonProps {
  mode: HeroMode;
  onToggle: () => void;
}

/**
 * Central mode toggle, styled as the neobrutalist "services" pill. The GSAP
 * hooks (intro slide-in, idle pulse) live on the wrapper so they animate the
 * wrapper's transform, leaving the button's own 3D-offset transform intact.
 */
export default function HeroButton({ mode, onToggle }: HeroButtonProps) {
  const services = mode === "services";

  return (
    <div className="js-hero-button">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={services}
        aria-label={services ? "Return to the studio view" : "Reveal our services"}
        className="services-toggle"
      >
        <div>
          <span key={mode} className="animate-[fade-in_0.35s_ease] uppercase tracking-[0.18em]">
            {services ? "Back to the board" : "Switch on services"}
          </span>
        </div>
      </button>
    </div>
  );
}
