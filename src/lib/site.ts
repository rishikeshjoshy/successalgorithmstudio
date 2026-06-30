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
// Hover a card to open its case study drawer.

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  summary: string;
  href: string; // link to full case study / portfolio item
}

export interface ServiceItem {
  id: string;
  name: string;
  outcome: string;
  caseStudies: CaseStudy[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "brand-engines",
    name: "Brand Engines",
    outcome: "Identity systems engineered to make small studios impossible to forget.",
    caseStudies: [
      {
        id: "be-noir",
        title: "Studio Noir Rebrand",
        client: "Studio Noir",
        year: "2024",
        tags: ["Identity", "Motion"],
        summary: "Complete visual identity overhaul that turned a 2-person studio into a category-of-one.",
        href: "#",
      },
      {
        id: "be-flux",
        title: "Flux Creative Identity",
        client: "Flux Creative",
        year: "2023",
        tags: ["Identity", "Print"],
        summary: "Brand system built for scale — from business cards to billboard without losing the soul.",
        href: "#",
      },
      {
        id: "be-alto",
        title: "Alto Launch Campaign",
        client: "Alto",
        year: "2024",
        tags: ["Brand", "Digital"],
        summary: "Zero-to-one brand for a new D2C product line, live in 6 weeks.",
        href: "#",
      },
    ],
  },
  {
    id: "interactive-web",
    name: "Interactive Web",
    outcome: "WebGL-grade websites that turn idle visitors into believers.",
    caseStudies: [
      {
        id: "iw-cascade",
        title: "Cascade — WebGL Showcase",
        client: "Cascade Studio",
        year: "2024",
        tags: ["WebGL", "GSAP"],
        summary: "Full-site 3D experience with particle physics and scroll-driven storytelling.",
        href: "#",
      },
      {
        id: "iw-mesa",
        title: "Mesa Portfolio",
        client: "Mesa Design",
        year: "2023",
        tags: ["Three.js", "Motion"],
        summary: "Award-winning portfolio with live shader-based transitions between pages.",
        href: "#",
      },
    ],
  },
  {
    id: "growth-algorithms",
    name: "Growth Algorithms",
    outcome: "Funnels, experiments and automation tuned until the numbers sing.",
    caseStudies: [
      {
        id: "ga-orbit",
        title: "Orbit SaaS — 3× MQL Growth",
        client: "Orbit",
        year: "2024",
        tags: ["Funnel", "CRO"],
        summary: "Rebuilt top-of-funnel and A/B tested 14 variants; tripled qualified leads in 90 days.",
        href: "#",
      },
      {
        id: "ga-volta",
        title: "Volta Automation Stack",
        client: "Volta",
        year: "2023",
        tags: ["Automation", "Email"],
        summary: "Full marketing automation overhaul — 60% less manual ops, 2× email open rates.",
        href: "#",
      },
      {
        id: "ga-bloom",
        title: "Bloom — Retention Engine",
        client: "Bloom",
        year: "2024",
        tags: ["Retention", "Analytics"],
        summary: "Churn prediction model + personalised touchpoints cut monthly churn from 8% to 3%.",
        href: "#",
      },
    ],
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
