// =============================================================================
// "YOUR STORY" — /your-story, the interactive intake quiz.
// 6 questions, single-select. Result is branched off Q4 (the bottleneck)
// alone — it maps cleanest to the three pillars, per design. Every answer is
// stored, but only Q4 drives which result shows; this is intentional, not a
// shortcut (a full combinatorial branch across all 6 answers isn't warranted
// for a "90 second" diagnostic).
// =============================================================================

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "identity",
    prompt: "Which best describes where you're building from?",
    options: [
      "Startup founder (B2B or B2C)",
      "Technology company leader",
      "Educational institution / L&D leader",
      "Independent professional / executive",
    ],
  },
  {
    id: "stage",
    prompt: "How long has this been live?",
    options: ["Early-stage (0–2 years)", "Growth-stage (2–5 years)", "Established (5+ years)"],
  },
  {
    id: "primary-goal",
    prompt: "If SAS could fix one thing in the next 90 days, what would move the needle most?",
    options: [
      "Build authority and inbound demand on social",
      "Fix a broken or nonexistent sales process",
      "Develop my own or my team's capability",
      "All three — I want the full system",
    ],
  },
  {
    id: "bottleneck",
    prompt: "What's actually in the way right now?",
    options: [
      "Inconsistent content, no real strategy behind it",
      "Leads come in, but conversion is weak or unpredictable",
      "No documented process — everything relies on one or two people",
      "Clarity. I don't know what to prioritize first",
    ],
  },
  {
    id: "timeline",
    prompt: "How fast do you need to see movement?",
    options: ["Immediately — 30 days", "This quarter — 90 days", "This year — 6–12 months"],
  },
  {
    id: "investment-readiness",
    prompt: "Where does this sit on your priority list right now?",
    options: [
      "This is the priority — budget is allocated",
      "Serious interest — need to see the case first",
      "Exploring — early research phase",
    ],
  },
];

export interface QuizResult {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

// Indexed to match Question 4 ("bottleneck")'s 4 options, in order.
export const RESULTS: QuizResult[] = [
  {
    heading: "Here's your read.",
    body: "Based on what you've told us, the content is going out but it isn't compounding into anything — no documented voice, no pillars, nothing building on the last post. That's a Content Architecture problem before it's a growth problem. We'd start with a Social Brand Audit, the same first step in every SAS social engagement, before proposing a calendar.",
    ctaLabel: "Book Your Diagnostic Call →",
    ctaHref: "/book",
    secondaryLabel: "See the Social Media pillar →",
    secondaryHref: "/social-media",
  },
  {
    heading: "Here's your read.",
    body: "Based on what you've told us, you're a growth-stage founder whose biggest leak is conversion, not traffic. That's a Sales Expansion problem before it's a content problem. We'd start with a Diagnostic Report — the same first step in every SAS engagement — before proposing anything.",
    ctaLabel: "Book Your Diagnostic Call →",
    ctaHref: "/book",
    secondaryLabel: "See the Business Consulting pillar →",
    secondaryHref: "/consulting",
  },
  {
    heading: "Here's your read.",
    body: "Based on what you've told us, the business runs on one or two people's memory, not a documented system — which means it can't scale past them. That's a capability-transfer problem before it's a hiring problem. We'd start by mapping what needs to become a repeatable program, not another one-off training day.",
    ctaLabel: "Book Your Diagnostic Call →",
    ctaHref: "/book",
    secondaryLabel: "See the Educational Workshops pillar →",
    secondaryHref: "/workshops",
  },
  {
    heading: "Here's your read.",
    body: "Based on what you've told us, the real bottleneck isn't any single pillar — it's sequencing. That's exactly what a Diagnostic Report is for: we look across content, sales process, and capability together, and tell you which one to fix first so the other two compound instead of compete for attention.",
    ctaLabel: "Book Your Diagnostic Call →",
    ctaHref: "/book",
  },
];
