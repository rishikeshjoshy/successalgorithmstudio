"use client";

import { useRef, useEffect } from "react";
import type { HeroMode } from "@/lib/constants";

interface StoryCircleProps {
  label: string;
  href: string;
  mode?: HeroMode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A neobrutalist story pill (Our Story / Your Story). Pure button — layout
 * belongs to the hero's bottom cluster, which lines these up with the
 * services toggle.
 */
export default function StoryCircle({ label, href, mode, onClick }: StoryCircleProps) {
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
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className="js-circle js-brand-el button"
      data-active={mode === "services" ? "true" : undefined}
    >
      <div>
        <div>
          <div className="uppercase tracking-[0.12em]">{label}</div>
        </div>
      </div>
    </a>
  );
}
