"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Debug handle for driving timelines from the console / headless previews.
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  (window as unknown as { gsap?: typeof gsap }).gsap = gsap;
}

export { gsap, useGSAP };
