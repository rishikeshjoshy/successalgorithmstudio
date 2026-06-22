"use client";

import type { HeroMode } from "@/lib/constants";

interface HeroButtonProps {
  mode: HeroMode;
  onToggle: () => void;
}

/**
 * Central mode toggle. Stays on screen in both modes (it is the way back);
 * GSAP pulses it gently while idling in brand mode.
 */
export default function HeroButton({ mode, onToggle }: HeroButtonProps) {
  const services = mode === "services";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={services}
      aria-label={services ? "Return to the studio view" : "Reveal our services"}
      data-lit-target
      className="js-hero-button group relative inline-flex items-center gap-3 rounded-full border border-lamp/25 bg-lamp/[0.06] px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] text-bone backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 hover:border-lamp/60 hover:bg-lamp/[0.14] hover:shadow-[0_0_42px_rgba(255,201,124,0.25)] focus-visible:border-lamp active:bg-lamp/[0.2] md:text-xs"
      style={{ filter: "brightness(calc(0.8 + var(--lit, 0) * 0.5))" }}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] transition-colors duration-300 ${
          services ? "bg-ember text-ember" : "bg-lamp text-lamp"
        }`}
      />
      <span key={mode} className="animate-[fade-in_0.35s_ease]">
        {services ? "Back to the board" : "Switch on services"}
      </span>
    </button>
  );
}
