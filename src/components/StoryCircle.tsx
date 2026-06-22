"use client";

interface StoryCircleProps {
  label: string;
  side: "left" | "right";
  href: string;
  hint?: string;
}

/**
 * Large circular anchor ("carrom coin") flanking the board. Outer wrapper
 * handles positioning so GSAP can freely animate the inner anchor's transform.
 * Brightness and glow respond to the lamp via --lit (set by useLampControls).
 */
export default function StoryCircle({ label, side, href, hint }: StoryCircleProps) {
  return (
    <div
      className={`absolute inset-y-0 z-20 flex items-center ${
        side === "left" ? "left-[3.5vw]" : "right-[3.5vw]"
      }`}
    >
      <a
        href={href}
        data-lit-target
        className="js-circle js-brand-el group relative grid aspect-square w-[clamp(6.5rem,15vw,13rem)] place-items-center rounded-full border border-bone/15 bg-[radial-gradient(circle_at_50%_30%,#171210_0%,#0b0806_70%)]"
        style={{
          boxShadow:
            "inset 0 16px 36px rgb(0 0 0 / 0.6), inset 0 -8px 22px rgb(255 201 124 / 0.05), 0 0 calc(18px + var(--lit, 0) * 70px) rgb(255 201 124 / calc(0.04 + var(--lit, 0) * 0.45))",
        }}
      >
        <span
          aria-hidden
          className="anim-when-motion absolute -inset-2 rounded-full border border-dashed border-bone/15 opacity-60 transition-[border-color,opacity] duration-300 group-hover:animate-[spin_18s_linear_infinite] group-hover:border-lamp/50 group-hover:opacity-100 group-focus-visible:border-lamp/50"
        />
        <span
          aria-hidden
          className="anim-when-motion pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:animate-[spin_5s_linear_infinite] group-hover:opacity-100"
        >
          <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-lamp shadow-[0_0_10px_rgba(255,201,124,0.8)]" />
        </span>
        <span
          className="grid place-items-center text-center transition-[filter,transform] duration-300 group-hover:scale-[1.06]"
          style={{ filter: "brightness(calc(1 + var(--lit, 0) * 1.1))" }}
        >
          <span className="story-label font-display text-[clamp(0.95rem,1.6vw,1.45rem)] uppercase tracking-[0.18em]">
            {label}
          </span>
          {hint && (
            <span className="mt-1.5 text-[9px] uppercase tracking-[0.3em] text-bone-dim opacity-70">
              {hint}
            </span>
          )}
        </span>
      </a>
    </div>
  );
}
