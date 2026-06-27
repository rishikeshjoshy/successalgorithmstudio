"use client";

import { useRef, useEffect } from "react";
import type { HeroMode } from "@/lib/constants";

interface StoryCircleProps {
  label: string;
  side: "left" | "right";
  href: string;
  hint?: string;
  mode?: HeroMode;
}

export default function StoryCircle({ label, side, href, mode }: StoryCircleProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => el.classList.add("button--pressed");
    const off = () => el.classList.remove("button--pressed");
    el.addEventListener("pointerdown", on);
    el.addEventListener("pointerup", off);
    el.addEventListener("pointercancel", off);
    el.addEventListener("pointerleave", off);
    return () => {
      el.removeEventListener("pointerdown", on);
      el.removeEventListener("pointerup", off);
      el.removeEventListener("pointercancel", off);
      el.removeEventListener("pointerleave", off);
    };
  }, []);

  return (
    <div
      className={`absolute inset-y-0 z-20 flex items-center ${
        side === "left" ? "left-[3.5vw]" : "right-[3.5vw]"
      }`}
    >
      <a
        ref={ref}
        href={href}
        className="js-circle js-brand-el button"
        data-active={mode === "services" ? "true" : undefined}
      >
        <div>
          <div>
            <div className="uppercase tracking-[0.12em]">{label}</div>
          </div>
        </div>
      </a>
    </div>
  );
}
