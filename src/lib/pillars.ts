// =============================================================================
// SERVICE PILLAR PAGES
// Content for /social-media, /consulting, /workshops.
// The three pillars aren't structurally identical in the source copy —
// Social Media has an "included" list, Consulting has "outcomes tracked",
// Workshops has a formats table + pricing tiers instead of either. Optional
// fields below reflect that honestly rather than forcing a false shape.
// =============================================================================

export interface ProcessStep {
  title: string;
  body: string;
}

export interface PillarFormat {
  label: string;
  body: string;
}

export interface CaseStudySnapshot {
  label: string;
  body: string;
}

export interface ServicePillarData {
  slug: string;
  pillarLabel: string; // "PILLAR ONE" etc.
  title: string;
  subhead: string;
  problemStatement: string;
  processHeading: string;
  process: ProcessStep[];
  included?: string[]; // Social Media only
  outcomesTracked?: string[]; // Consulting only
  formats?: PillarFormat[]; // Workshops only
  pricingTiers?: string[]; // Workshops only
  caseStudySnapshot?: CaseStudySnapshot;
  ctaLabel: string;
  ctaHref: string;
}

export const SOCIAL_MEDIA_PAGE: ServicePillarData = {
  slug: "social-media",
  pillarLabel: "PILLAR ONE",
  title: "Social Content, Engineered as a System.",
  subhead:
    "Social media is not a channel. It's the arena where trust is built before a single sales conversation happens. We treat it as a brand-building science — not a content calendar.",
  problemStatement:
    "Most brands post. Few build. The difference is architecture: a documented content strategy, a defined voice, and a system that compounds authority instead of chasing algorithm trends week to week.",
  processHeading: "How we solve it — Content Architecture process:",
  process: [
    {
      title: "Social Brand Audit",
      body: "a diagnostic of current presence, competitive landscape, and audience behavior",
    },
    {
      title: "Content Architecture",
      body: "documented voice, content pillars, platform priorities, posting cadence, creative direction",
    },
    {
      title: "Execution",
      body: "every asset reviewed against the strategic brief before publication",
    },
    {
      title: "Measurement",
      body: "reach, engagement rate, follower growth, content-attributed leads, tracked monthly, reviewed quarterly",
    },
  ],
  included: [
    "Brand identity for social platforms",
    "Editorial calendar architecture",
    "Copywriting and creative direction",
    "Community management frameworks",
    "Analytics reporting",
    "Paid amplification strategy",
  ],
  caseStudySnapshot: {
    label: "EdTech platform, Pune",
    body: "Followers 177 → 2,400+ in 6 months. Engagement rate 0.8% → 4.1%. Inbound DM inquiries: 0 tracked → 22/month, sourced entirely from LinkedIn carousel content.",
  },
  ctaLabel: "Start With a Social Brand Audit →",
  ctaHref: "/book",
};

export const CONSULTING_PAGE: ServicePillarData = {
  slug: "consulting",
  pillarLabel: "PILLAR TWO",
  title: "Revenue Is Not Talent. It's Architecture.",
  subhead:
    "Sales failure is almost never a talent problem. It's the absence of a documented, repeatable process. We install one.",
  problemStatement:
    "Most sales organizations operate without a defined stage-gated methodology, without structured onboarding, without metrics tied to specific behaviors, and without ongoing coaching. Every one of these gaps is fixable — and SAS fixes all of them in a single integrated engagement.",
  processHeading: "The SAS Revenue Architecture — five components:",
  process: [
    {
      title: "Sales Process Design",
      body: "a documented, stage-gated methodology built for your specific product and market",
    },
    {
      title: "Persuasion & Influence Training",
      body: "buyer psychology, objection handling, closing mechanics",
    },
    {
      title: "Script & Messaging Engineering",
      body: "precision-built sales scripts, email sequences, call frameworks",
    },
    {
      title: "Tracking & Performance Systems",
      body: "CRM protocols, dashboards, defined metrics",
    },
    {
      title: "Coaching & Reinforcement",
      body: "structured ongoing coaching so the system doesn't drift back to old habits",
    },
  ],
  outcomesTracked: [
    "Pipeline velocity",
    "Conversion rate by stage",
    "Average deal size",
    "Sales cycle length",
    "Revenue per rep",
  ],
  caseStudySnapshot: {
    label: "BPO, Mumbai",
    body: "Sales cycle: 41 days → 26 days. Conversion rate: 12% → 19% within one quarter of framework deployment.",
  },
  ctaLabel: "Request a Revenue Diagnostic →",
  ctaHref: "/book",
};

export const WORKSHOPS_PAGE: ServicePillarData = {
  slug: "workshops",
  pillarLabel: "PILLAR THREE",
  title: "Learning Built to Change Behavior, Not Just Inform It.",
  subhead:
    "SAS workshops are not seminars. They are structured, multi-module learning systems engineered for measurable professional transformation.",
  problemStatement:
    "Most training is consumed and forgotten inside a week. Knowledge without behavioral transfer is waste. Every SAS program is built backward from a defined outcome — no filler, no padding.",
  processHeading: "Curriculum design principles:",
  process: [
    {
      title: "Outcome Engineering",
      body: "learning outcomes defined before curriculum is built",
    },
    {
      title: "Behavioral Transfer",
      body: "designed for application, not information retention",
    },
    {
      title: "Progressive Architecture",
      body: "each module compounds on the last",
    },
    {
      title: "High-Touch Delivery",
      body: "real exercises, real feedback, never passive video",
    },
  ],
  formats: [
    {
      label: "Foundation Workshops",
      body: "Single-day or multi-session, one skill domain (e.g. Sales Fundamentals, Personal Brand Architecture)",
    },
    {
      label: "Mastery Programs",
      body: "Multi-week curricula — SAS's equivalent of a professional certification",
    },
    {
      label: "Enterprise Strategy Programs",
      body: "Bespoke, organization-wide deployments co-designed with leadership",
    },
  ],
  pricingTiers: [
    "Standard (self-paced)",
    "Professional (+ live facilitation & coaching)",
    "Enterprise (fully customized, on-site option)",
  ],
  ctaLabel: "Explore Workshop Formats →",
  ctaHref: "/book",
};

export const PILLAR_PAGES = [SOCIAL_MEDIA_PAGE, CONSULTING_PAGE, WORKSHOPS_PAGE];
