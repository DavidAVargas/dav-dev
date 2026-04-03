"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const MARKS = [
  {
    id: "MARK I",
    label: "Foundation",
    lines: [
      "HUD design system & color tokens",
      "Hero, Projects, Skills, About, Contact sections",
      "Boot sequence, cursor trail, scroll progress",
      "Side Nav & Mobile Nav",
      "Arc Reactor background animation",
    ],
  },
  {
    id: "MARK II",
    label: "Real Content",
    lines: [
      "QVIL Studios, Tech Tutors, Pixel Coder, Tex N Wash projects",
      "Real skills with power bars & expandable modals",
      "Side Missions: Healthcare, Reading List (40+ books)",
      "Initiative: Hope Auto Check-In",
      "Real contact info with email anti-spam reveal",
      "Headshot & Tony Stark easter egg",
    ],
  },
  {
    id: "MARK III",
    label: "Polish & Deploy",
    lines: [
      "Mobile viewport fix — no more zoom",
      "Custom arc reactor favicon",
      "Hero name centering & equal CTA buttons",
      "SEO metadata & OG image",
      "Particle network (in progress)",
      "Deployed to davidavargas.com",
    ],
  },
];

const SECTION_LABELS: Record<string, string> = {
  hero:       "HOME",
  projects:   "PROJECTS",
  initiative: "INITIATIVE",
  skills:     "CAPABILITIES",
  about:      "ABOUT",
  services:   "SIDE MISSIONS",
  contact:    "CONTACT",
};

const SECTIONS = Object.keys(SECTION_LABELS);

export function HudReadout() {
  const [active, setActive] = useState("hero");
  const [flash, setFlash] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastActive = "";

    const getActive = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closest = SECTIONS[0];
      let closestDist = Infinity;

      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const elCenter = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(center - elCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      });

      if (closest !== lastActive) {
        lastActive = closest;
        setActive(closest);
        setFlash(true);
        setTimeout(() => setFlash(false), 400);
      }
    };

    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  return (
    <>
      <div className="hidden md:flex fixed top-6 left-6 z-40 select-none flex-col gap-1">
        <div
          className={cn(
            "font-mono text-[10px] tracking-[0.25em] transition-opacity duration-200 pointer-events-none",
            flash ? "text-hud-cyan" : "text-hud-muted/60"
          )}
        >
          // MODULE: {SECTION_LABELS[active]}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="font-mono text-[10px] tracking-[0.15em] text-hud-gold border border-hud-gold/40 hover:border-hud-gold hover:bg-hud-gold/10 transition-all duration-200 px-3 py-1 flex items-center gap-1.5"
        >
          <span>◆</span> MARK III <span className="text-hud-gold/60">↗</span>
        </button>
      </div>

      {/* Patch notes modal */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-hud-dark/90 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-hud-surface border border-hud-gold/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hud-gold" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hud-gold" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hud-gold" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hud-gold" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-hud-border">
              <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">SUIT UPGRADE LOG</span>
              <button onClick={() => setOpen(false)} className="text-hud-muted hover:text-hud-gold transition-colors p-1">
                <X size={16} />
              </button>
            </div>

            {/* Marks */}
            <div className="p-6 flex flex-col gap-6">
              {MARKS.map((mark) => (
                <div key={mark.id}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "font-mono font-bold text-sm tracking-[0.15em]",
                      mark.id === "MARK III" ? "text-hud-gold" : "text-hud-muted/60"
                    )}>
                      {mark.id}
                    </span>
                    <span className="font-mono text-[10px] text-hud-muted tracking-[0.1em]">— {mark.label}</span>
                    {mark.id === "MARK III" && (
                      <span className="font-mono text-[9px] text-hud-gold border border-hud-gold/40 px-1.5 py-0.5 tracking-wide">CURRENT</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 pl-3 border-l border-hud-border">
                    {mark.lines.map((line) => (
                      <p key={line} className="font-mono text-[10px] text-hud-muted/70 tracking-[0.05em]">
                        · {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
