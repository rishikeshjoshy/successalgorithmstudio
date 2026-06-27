"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const CARDS = [
  {
    id: "brand",
    num: "01",
    accent: "#ffc97c",
    title: "Brand Engines",
    sub: "Identity & Positioning",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    tag: "Identity",
  },
  {
    id: "visual",
    num: "02",
    accent: "#e8b840",
    title: "Visual Language",
    sub: "Design Systems",
    body: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.",
    tag: "Design",
  },
  {
    id: "web",
    num: "03",
    accent: "#a0b8d0",
    title: "Interactive Web",
    sub: "WebGL & Motion",
    body: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis molestie dictum semper, quam quam congue erat, vel rutrum nisi arcu ac diam. Praesent volutpat ligula eget libero interdum condimentum. Nam auctor, libero vel sodales pellentesque, lacus nisi ornare erat.",
    tag: "Engineering",
  },
  {
    id: "growth",
    num: "04",
    accent: "#c8a060",
    title: "Growth Funnels",
    sub: "Conversion & Retention",
    body: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo.",
    tag: "Growth",
  },
  {
    id: "content",
    num: "05",
    accent: "#90b890",
    title: "Content Studio",
    sub: "Copy & Direction",
    body: "Etiam porta sem malesuada magna mollis euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    tag: "Content",
  },
  {
    id: "analytics",
    num: "06",
    accent: "#9080c8",
    title: "Analytics Lab",
    sub: "Data & Experiments",
    body: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis.",
    tag: "Data",
  },
  {
    id: "social",
    num: "07",
    accent: "#c87878",
    title: "Social Velocity",
    sub: "Community & Distribution",
    body: "Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio dapibus facilisis egestas.",
    tag: "Social",
  },
];

export default function BottomTray() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const prevActiveId = useRef<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCard = CARDS.find((c) => c.id === activeId) ?? null;

  const open = useCallback((id: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveId(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveId(null), 90);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    const wasOpen = prevActiveId.current !== null;
    const isOpen = activeId !== null;

    if (isOpen && wasOpen) {
      // Switching cards — overlay stays, just crossfade content
      gsap.fromTo(
        content,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.32, ease: "power2.out", overwrite: true }
      );
    } else if (isOpen) {
      // Opening — wipe up from bottom
      gsap.fromTo(
        overlay,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.65, ease: "expo.out", overwrite: true }
      );
      gsap.set(content, { opacity: 0, y: 32 });
      gsap.to(content, { opacity: 1, y: 0, duration: 0.45, delay: 0.28, ease: "power3.out" });
    } else {
      // Closing — wipe back down
      gsap.to(overlay, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.38,
        ease: "power3.in",
        overwrite: true,
      });
    }

    prevActiveId.current = activeId;
  }, [activeId]);

  return (
    <>
      {/* Fullscreen overlay — sits below the tray row */}
      <div
        ref={overlayRef}
        className="tray-overlay"
        style={
          {
            clipPath: "inset(100% 0 0 0)",
            "--overlay-accent": activeCard?.accent ?? "#ffc97c",
          } as React.CSSProperties
        }
        onPointerEnter={cancelClose}
        onPointerLeave={scheduleClose}
      >
        <div ref={contentRef} className="tray-overlay__inner">
          <p className="tray-overlay__body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Card tabs — always on top */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-center gap-2 px-3">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={`tray-card${activeId === card.id ? " tray-card--active" : ""}`}
            style={{ "--card-accent": card.accent } as React.CSSProperties}
            onPointerEnter={() => { cancelClose(); open(card.id); }}
            onPointerLeave={scheduleClose}
          >
            <div className="tray-card__header">
              <span className="tray-card__num">{card.num}</span>
              <span className="tray-card__title">{card.title}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
