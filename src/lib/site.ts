// =============================================================================
// SITE CONTENT
// Edit this file to update everything visible on the site.
// No other files need to be touched for content changes.
// =============================================================================

// ── Studio identity ───────────────────────────────────────────────────────────

export const STUDIO = {
  name: "Success Algorithm",
  tagline: "Studios",
  phone: "+91 00000 00000",
  email: "hello@successalgorithm.studio",
};

// ── Social media links ────────────────────────────────────────────────────────
// Leave a value as "" to hide that link.

export const SOCIAL = {
  instagram: "",
  linkedin: "",
  twitter: "",
  youtube: "",
  behance: "",
};

// ── Services ──────────────────────────────────────────────────────────────────
// Shown on the "Explore Our Services" cards (max 3).
// caseHref: deep-link to a case study section or external URL.

export interface ServiceItem {
  id: string;
  name: string;
  outcome: string;
  caseHref: string;
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

// ── Knowledge Repository ──────────────────────────────────────────────────────
// Shown in the Knowledge Repository drawer (max 8).
// type:      badge label — PDF / DOC / VID / ZIP / LNK
// typeColor: hex accent for the badge
// href:      Google Drive share link (or any URL)

export interface KnowledgeDoc {
  id: string;
  type: "PDF" | "DOC" | "VID" | "ZIP" | "LNK";
  typeColor: string;
  title: string;
  desc: string;
  href: string;
}

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  {
    id: "brand",
    type: "PDF",
    typeColor: "#9080c8",
    title: "Brand Guidelines",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    href: "#",
  },
  {
    id: "case",
    type: "PDF",
    typeColor: "#90b890",
    title: "Case Study",
    desc: "Pellentesque habitant morbi tristique senectus et netus malesuada fames.",
    href: "#",
  },
  {
    id: "reel",
    type: "VID",
    typeColor: "#c8a060",
    title: "Showreel",
    desc: "Curabitur pretium tincidunt lacus nulla gravida orci a odio nullam varius.",
    href: "#",
  },
  {
    id: "deck",
    type: "PDF",
    typeColor: "#a0b8d0",
    title: "Capabilities Deck",
    desc: "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh.",
    href: "#",
  },
  {
    id: "assets",
    type: "ZIP",
    typeColor: "#c87878",
    title: "Asset Pack",
    desc: "Etiam porta sem malesuada magna mollis euismod cum sociis natoque penatibus.",
    href: "#",
  },
  {
    id: "playbook",
    type: "DOC",
    typeColor: "#e8b840",
    title: "Growth Playbook",
    desc: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet morbi.",
    href: "#",
  },
  {
    id: "system",
    type: "PDF",
    typeColor: "#ffc97c",
    title: "Design System",
    desc: "Maecenas sed diam eget risus varius blandit sit amet non magna donec.",
    href: "#",
  },
  {
    id: "report",
    type: "PDF",
    typeColor: "#9080c8",
    title: "Analytics Report",
    desc: "Nullam quis risus eget urna mollis ornare vel eu leo vestibulum ligula.",
    href: "#",
  },
];
