export type HeroMode = "brand" | "services";

export interface ServiceItem {
  id: string;
  name: string;
  outcome: string;
  caseHref: string;
}

export type DockIconId = "case-studies" | "process" | "experiments" | "contact";

export interface DockItemData {
  id: DockIconId;
  label: string;
  href: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "brand-engines",
    name: "Brand Engines",
    outcome: "Identity systems engineered to make small studios impossible to forget.",
    caseHref: "#case-brand-engines",
  },
  {
    id: "interactive-web",
    name: "Interactive Web",
    outcome: "WebGL-grade websites that turn idle visitors into believers.",
    caseHref: "#case-interactive-web",
  },
  {
    id: "growth-algorithms",
    name: "Growth Algorithms",
    outcome: "Funnels, experiments and automation tuned until the numbers sing.",
    caseHref: "#case-growth-algorithms",
  },
];

export const DOCK_ITEMS: DockItemData[] = [
  { id: "case-studies", label: "Case Studies", href: "#case-studies" },
  { id: "process", label: "Process", href: "#process" },
  { id: "experiments", label: "Experiments", href: "#experiments" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/**
 * Swap in your real assets here.
 * Leave empty to use the built-in procedural carrom lamp / room environment.
 */
export const LAMP_MODEL_URL = ""; // e.g. "/models/carrom-lamp.glb" (file goes in /public/models)
export const LAMP_MODEL_SCALE = 1;
export const LAMP_MODEL_Y_OFFSET = 0; // local offset inside the lamp head group
export const HDRI_URL = ""; // e.g. "/hdri/studio_small_08_1k.hdr" (file goes in /public/hdri)

/** Mouse-to-lamp mapping: clamped head rotation (radians) and pointer easing. */
export const AIM = { maxRotX: 0.18, maxRotZ: 0.3, ease: 0.07 } as const;

/** Where the spotlight pool lands on the floor, in viewport % (drives beam aim). */
export const LIGHT_POOL = {
  baseX: 50,
  baseY: 74,
  rangeX: 20,
  rangeY: 8,
} as const;

/**
 * Screen-space model of the lamp's light cone. Everything in the DOM overlay
 * is lit by intersecting it with this wedge: apex at the lamp head, swinging
 * toward the pool, with angular penumbra and distance falloff.
 */
export const BEAM = {
  apexX: 50, // % of viewport width
  apexYLandscape: 12, // % of viewport height
  apexYPortrait: 24,
  spreadDeg: 40, // half-angle of the cone in screen space
  reachVh: 95, // characteristic distance falloff
} as const;

/** Physical spotlight settings for the lamp head. */
export const SPOT = {
  color: 0xffc97c,
  intensity: 550,
  angle: 0.72,
  penumbra: 0.45,
  decay: 1.6,
} as const;

/** macOS-style dock magnification. */
export const DOCK_MAGNIFY = { radius: 120, scale: 0.55, lift: 16 } as const;

export const EASES = {
  out: "power3.out",
  inOut: "power3.inOut",
  back: "back.out(1.7)",
} as const;

export const DURATIONS = {
  brandOut: 0.45,
  cardIn: 0.6,
  cardStagger: 0.09,
} as const;
