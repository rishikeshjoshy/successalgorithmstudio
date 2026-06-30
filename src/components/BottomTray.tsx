"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { KNOWLEDGE_DOCS } from "@/lib/site";

export default function BottomTray() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTray = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 90);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (open) {
      gsap.fromTo(overlay,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "expo.out", overwrite: true }
      );
      gsap.set(content, { opacity: 0, y: 28 });
      gsap.to(content, { opacity: 1, y: 0, duration: 0.45, delay: 0.25, ease: "power3.out" });
    } else {
      gsap.to(overlay, { clipPath: "inset(100% 0 0 0)", duration: 0.38, ease: "power3.in", overwrite: true });
    }
  }, [open]);

  return (
    <>
      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        className="tray-overlay"
        style={{ clipPath: "inset(100% 0 0 0)" } as React.CSSProperties}
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
      >
        <div ref={contentRef} className="knowledge-drawer">
          <p className="knowledge-drawer__eyebrow">Knowledge Repository</p>
          <div className="knowledge-grid">
            {KNOWLEDGE_DOCS.map((doc) => (
              <div key={doc.id} className="doc-card">
                <span className="doc-card__type" style={{ color: doc.typeColor, borderColor: doc.typeColor }}>
                  {doc.type}
                </span>
                <h3 className="doc-card__title">{doc.title}</h3>
                <p className="doc-card__desc">{doc.desc}</p>
                <a href={doc.href} className="doc-card__dl" aria-label={`Link to G-Drive for ${doc.title}`} target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M6 2H2.5A1.5 1.5 0 0 0 1 3.5v8A1.5 1.5 0 0 0 2.5 13h8A1.5 1.5 0 0 0 12 11.5V8M8 1h5v5M12.5 1.5 6.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Link to G-Drive
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Single tab — half-pill shape, Explore Our Services visual style */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center">
        <div
          className="knowledge-tab"
          onPointerEnter={() => { cancelClose(); openTray(); }}
          onPointerLeave={scheduleClose}
        >
          <div>
            <span>Knowledge Repository</span>
          </div>
        </div>
      </div>
    </>
  );
}
