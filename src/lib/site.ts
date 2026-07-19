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
// Shown as icon buttons in the bottom-right corner.
// Leave a value as "" to hide that platform's icon.

export const SOCIAL = {
  instagram: "#",
  youtube: "#",
  linkedin: "#",
};

// ── Services ──────────────────────────────────────────────────────────────────
// Shown on the "Explore Our Services" cards (max 3).
// Click a card to open its case study drawer.

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
    id: "social-media",
    name: "Social Media",
    outcome: "We architect the content systems that turn feeds into inbound pipelines.",
    caseStudies: [
      {
        id: "sm-edtech",
        title: "EdTech Platform — Feed to Pipeline",
        client: "EdTech Platform, Pune",
        year: "2024",
        tags: ["Content Architecture", "LinkedIn"],
        summary: "Followers 177 → 2,400+ in 6 months, engagement rate 0.8% → 4.1%, entirely from documented content strategy.",
        href: "#",
      },
      {
        id: "sm-founder",
        title: "Founder-Led Authority Build",
        client: "Solo D2C Founder",
        year: "2024",
        tags: ["Personal Brand", "Voice"],
        summary: "Turned a founder with no following into a recognized voice in their category inside one quarter.",
        href: "#",
      },
      {
        id: "sm-community",
        title: "Community-Led Launch",
        client: "Wellness Studio Chain",
        year: "2023",
        tags: ["Community", "Cadence"],
        summary: "Editorial cadence + community management framework replaced ad-hoc posting across 4 locations.",
        href: "#",
      },
    ],
  },
  {
    id: "business-consulting",
    name: "Business Consulting",
    outcome: "We engineer sales infrastructure that converts effort into predictable revenue.",
    caseStudies: [
      {
        id: "bc-bpo",
        title: "BPO — Sales Cycle Compression",
        client: "BPO, Mumbai",
        year: "2024",
        tags: ["Sales Process", "Coaching"],
        summary: "Sales cycle 41 days → 26 days, conversion rate 12% → 19% within one quarter of framework deployment.",
        href: "#",
      },
      {
        id: "bc-saas",
        title: "SaaS Revenue Architecture Rebuild",
        client: "B2B SaaS, Bengaluru",
        year: "2023",
        tags: ["CRM", "Scripts"],
        summary: "Documented stage-gated methodology replaced tribal-knowledge selling across an 8-rep team.",
        href: "#",
      },
    ],
  },
  {
    id: "educational-workshops",
    name: "Educational Workshops",
    outcome: "We deliver curriculum-grade programs that transfer skill, not just information.",
    caseStudies: [
      {
        id: "ew-mastery",
        title: "Sales Mastery Cohort",
        client: "Regional Distribution Firm",
        year: "2024",
        tags: ["Mastery Program", "Behavioral Transfer"],
        summary: "Multi-week certification-style program measured by on-the-job behavior change, not attendance.",
        href: "#",
      },
      {
        id: "ew-enterprise",
        title: "Enterprise Strategy Intensive",
        client: "Mid-Market Manufacturer",
        year: "2023",
        tags: ["Enterprise", "Leadership"],
        summary: "Organization-wide strategy program co-designed with leadership, built backward from a defined outcome.",
        href: "#",
      },
    ],
  },
];
