"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const DOCS = [
  { id: "brand",    type: "PDF", typeColor: "#9080c8", title: "Brand Guidelines",    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod." },
  { id: "case",     type: "PDF", typeColor: "#90b890", title: "Case Study",           desc: "Pellentesque habitant morbi tristique senectus et netus malesuada fames." },
  { id: "reel",     type: "VID", typeColor: "#c8a060", title: "Showreel",             desc: "Curabitur pretium tincidunt lacus nulla gravida orci a odio nullam varius." },
  { id: "deck",     type: "PDF", typeColor: "#a0b8d0", title: "Capabilities Deck",   desc: "Fusce dapibus tellus ac cursus commodo tortor mauris condimentum nibh." },
  { id: "assets",   type: "ZIP", typeColor: "#c87878", title: "Asset Pack",           desc: "Etiam porta sem malesuada magna mollis euismod cum sociis natoque penatibus." },
  { id: "playbook", type: "DOC", typeColor: "#e8b840", title: "Growth Playbook",      desc: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet morbi." },
  { id: "system",   type: "PDF", typeColor: "#ffc97c", title: "Design System",        desc: "Maecenas sed diam eget risus varius blandit sit amet non magna donec." },
  { id: "report",   type: "PDF", typeColor: "#9080c8", title: "Analytics Report",     desc: "Nullam quis risus eget urna mollis ornare vel eu leo vestibulum ligula." },
];

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
            {DOCS.map((doc) => (
              <div key={doc.id} className="doc-card">
                <span className="doc-card__type" style={{ color: doc.typeColor, borderColor: doc.typeColor }}>
                  {doc.type}
                </span>
                <h3 className="doc-card__title">{doc.title}</h3>
                <p className="doc-card__desc">{doc.desc}</p>
                <a href="#" className="doc-card__dl" aria-label={`Download ${doc.title}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Single tab */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-3">
        <div
          className={`tray-card tray-card--single${open ? " tray-card--active" : ""}`}
          onPointerEnter={() => { cancelClose(); openTray(); }}
          onPointerLeave={scheduleClose}
        >
          <div className="tray-card__header">
            <span className="tray-card__title">Knowledge Repository</span>
          </div>
        </div>
      </div>
    </>
  );
}
