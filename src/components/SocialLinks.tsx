import type { ReactNode } from "react";
import { SOCIAL } from "@/lib/site";

type Platform = keyof typeof SOCIAL;

const LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

const ICONS: Record<Platform, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M13.5 21v-7h2.2l.3-2.6h-2.5v-1.7c0-.75.2-1.3 1.3-1.3h1.4V6.1c-.25-.03-1.1-.1-2.1-.1-2.1 0-3.5 1.28-3.5 3.63v2.02H8.3v2.6h2.3v7" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="7.3" y1="10.5" x2="7.3" y2="16.5" />
      <circle cx="7.3" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 16.5v-4.2a1.8 1.8 0 0 1 3.6 0v4.2M11 16.5v-4.8" />
    </svg>
  ),
};

/**
 * Persistent social icon dock, bottom-right. Global chrome like the
 * Knowledge Repository tab — visible in both brand and services mode, and
 * kept above the fullscreen case-study/knowledge overlays (z-40).
 */
export default function SocialLinks() {
  const platforms = (Object.keys(SOCIAL) as Platform[]).filter((key) => SOCIAL[key]);
  if (platforms.length === 0) return null;

  return (
    <div className="social-links absolute bottom-4 right-4 z-40 flex flex-col gap-2">
      {platforms.map((key) => (
        <a
          key={key}
          href={SOCIAL[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={LABELS[key]}
          className="social-links__item"
        >
          {ICONS[key]}
        </a>
      ))}
    </div>
  );
}
