// =============================================================================
// KNOWLEDGE REPOSITORY — /knowledge, six tabs.
// Each tab has its own honest shape (a channel isn't a book isn't a mantra) —
// see the per-tab interfaces below rather than one forced-generic card type.
//
// Editorial note (from the source copy doc, kept here for future editors):
// Case Studies (tab 1) and Spirituality (tab 6) carry the highest
// reputational sensitivity — route any new entries through brand/legal
// review before publishing. Rotate case studies quarterly (8-12 entries);
// rotate spirituality reflections as short paraphrased reflections, never
// sermons, 2-4 sentences max per entry.
// =============================================================================

export type KnowledgeTabId =
  | "case-studies"
  | "books"
  | "channels"
  | "mantras"
  | "university"
  | "spirituality";

export interface KnowledgeTabMeta {
  id: KnowledgeTabId;
  num: string;
  label: string;
}

export const KNOWLEDGE_TABS: KnowledgeTabMeta[] = [
  { id: "case-studies", num: "01", label: "Profiles" },
  { id: "books", num: "02", label: "Books" },
  { id: "channels", num: "03", label: "Channels" },
  { id: "mantras", num: "04", label: "Mantras" },
  { id: "university", num: "05", label: "University" },
  { id: "spirituality", num: "06", label: "Spirituality" },
];

// ── Tab 1 — Case Studies of Successful People ──────────────────────────────

export interface SuccessProfile {
  name: string;
  principle: string;
  takeaway: string;
}

export const CASE_STUDY_PROFILES: SuccessProfile[] = [
  {
    name: "Falguni Nayar (Nykaa)",
    principle: "Late starts don't disqualify you.",
    takeaway:
      "Left a four-decade banking career at 50 to build an e-commerce company from category-selection logic, not impulse. The lesson SAS teaches from this: category discipline beats speed to market.",
  },
  {
    name: "Ritesh Agarwal (OYO)",
    principle: "Systems scale faster than heroics.",
    takeaway:
      "Built a hospitality standardization system before chasing property count. The lesson: process precedes scale, every time.",
  },
  {
    name: "Sara Blakely (Spanx)",
    principle: "Constraint is a design input.",
    takeaway:
      "Bootstrapped with no outside capital, which forced ruthless prioritization of what actually mattered to the customer.",
  },
  {
    name: "Kiran Mazumdar-Shaw (Biocon)",
    principle: "Credibility compounds before capital does.",
    takeaway:
      "Built scientific and institutional trust for years before the revenue curve reflected it.",
  },
];

// ── Tab 2 — Books on Success ────────────────────────────────────────────────

export interface BookEntry {
  title: string;
  author: string;
  description: string;
}

export const BOOKS: BookEntry[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "How small, systemized behaviors compound into outsized outcomes over time.",
  },
  {
    title: "The Straight Line System philosophy",
    author: "Jordan Belfort",
    description: "The psychology of persuasion applied to structured sales conversation.",
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    description: "What separates companies that sustain excellence from those that plateau after early success.",
  },
  {
    title: "Never Split the Difference",
    author: "Chris Voss",
    description: "Negotiation reframed as a psychological, not positional, discipline.",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    description: "Wealth and happiness as separate, learnable systems rather than luck.",
  },
  {
    title: "Blue Ocean Strategy",
    author: "W. Chan Kim & Renée Mauborgne",
    description: "Competing by redefining the market instead of fighting inside it.",
  },
];

// ── Tab 3 — Social Media Channels on Success ────────────────────────────────

export interface ChannelEntry {
  name: string;
  platform: string;
  reason: string;
}

export const CHANNELS: ChannelEntry[] = [
  {
    name: "Patrick Bet-David / Valuetainment",
    platform: "YouTube",
    reason: "Business strategy and entrepreneurial psychology at operator-level depth.",
  },
  {
    name: "Alex Hormozi",
    platform: "Instagram/YouTube",
    reason: "Blunt, framework-driven breakdowns of offer and business-model economics.",
  },
  {
    name: "Ankur Warikoo",
    platform: "LinkedIn/Instagram",
    reason: "Personal finance and career-building content calibrated for the South Asian professional.",
  },
  {
    name: "Sahil Bloom",
    platform: "Twitter/X",
    reason: "Mental models and frameworks distilled into single, shareable ideas.",
  },
  {
    name: "First 100 by Aaron Dinin",
    platform: "Podcast",
    reason: "Tactical, unglamorous early-stage founder lessons.",
  },
];

// ── Tab 4 — Our Success Mantras ─────────────────────────────────────────────
// Standalone quotable lines — safe for social captions, presentation
// dividers, and merchandise.

export const MANTRAS: string[] = [
  "Success is architectural, not accidental.",
  "Diagnose before you prescribe.",
  "A strategy without a metric is an opinion.",
  "Customization is not optional — it is the product.",
  "Constraint reveals priority.",
  "Consistency is the authority signal.",
  "Systems scale. Heroics burn out.",
  "The gap between what you claim and what you show is the only gap that matters.",
  "Measurement is integrity.",
  "Build the algorithm once. Let it compound forever.",
];

// ── Tab 5 — Success Algorithm University ────────────────────────────────────
// A single structured block, not a list.

export interface UniversityTrack {
  name: string;
  description: string;
}

export const UNIVERSITY = {
  whatItIs:
    "SAS's forthcoming formalized education arm — accredited-grade professional development in sales mastery, brand architecture, and organizational strategy. Built on the same Outcome Engineering and Behavioral Transfer principles as our workshop pillar, delivered at institutional scale.",
  tracks: [
    {
      name: "Sales Mastery Certification",
      description: "Full deployment of the SAS Revenue Architecture, delivered as a certifiable program",
    },
    {
      name: "Brand Architecture Certification",
      description: "The Content Architecture methodology, taught end-to-end",
    },
    {
      name: "Organizational Strategy Program",
      description: "Enterprise-level strategic leadership curriculum",
    },
  ] as UniversityTrack[],
  deliveryModel:
    "Hybrid — on-demand digital modules plus live residential intensives, positioned at the intersection of commercial effectiveness and academic rigor.",
  status: "In development — launching within the current growth roadmap.",
  waitlistHref: "#",
};

// ── Tab 6 — Glimpse of Spirituality ──────────────────────────────────────────
// Framed as clarity and discipline, not doctrine — deliberately
// non-denominational reflective grounding, not religious instruction.

export interface SpiritReflection {
  heading: string;
  body: string;
}

export const SPIRITUALITY: SpiritReflection[] = [
  {
    heading: "On detachment from outcome",
    body: "Act with full discipline, release your grip on the result. Anxiety about outcomes clouds the judgment that produces good outcomes in the first place — a principle found in Stoic philosophy and in the Bhagavad Gita's teaching on committed, non-attached action alike.",
  },
  {
    heading: "On stillness before decisions",
    body: "The clearest strategic decisions are rarely made in the loudest moment. A brief, deliberate pause before a high-stakes call is not hesitation — it's precision.",
  },
  {
    heading: "On daily discipline",
    body: "Small, repeated acts of order — a morning routine, a reflection ritual, a single hour of undistracted focus — build the same compounding effect in a person that a documented process builds in a business.",
  },
];
