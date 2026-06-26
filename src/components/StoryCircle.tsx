"use client";

interface StoryCircleProps {
  label: string;
  side: "left" | "right";
  href: string;
  hint?: string;
}

/**
 * Navigation anchor flanking the board (OUR STORY / YOUR STORY), rendered as a
 * 3D "cube" button (styles in globals.css). The outer wrapper handles edge
 * positioning so GSAP can animate the anchor freely; js-circle is the intro
 * hook and js-brand-el hides it when services mode takes over.
 */
export default function StoryCircle({ label, side, href }: StoryCircleProps) {
  return (
    <div
      className={`absolute inset-y-0 z-20 flex items-center ${
        side === "left" ? "left-[3.5vw]" : "right-[3.5vw]"
      }`}
    >
      <a href={href} className="js-circle js-brand-el btn w-fit">
        <div className="cube">
          <div className="bg-top" aria-hidden>
            <div className="bg-inner" />
          </div>
          <div className="bg-right" aria-hidden>
            <div className="bg-inner" />
          </div>
          <div className="bg" aria-hidden>
            <div className="bg-inner" />
          </div>
          <div className="text uppercase">{label}</div>
        </div>
      </a>
    </div>
  );
}
