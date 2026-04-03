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

function MobileTopBar({ active }: { active: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toTimeString().slice(0, 8));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const LABELS: Record<string, string> = {
    hero: "HOME", projects: "PROJECTS", initiative: "INITIATIVE",
    skills: "SKILLS", about: "ABOUT", services: "SIDE MISSIONS", contact: "CONTACT",
  };

  return (
    <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-hud-dark/80 backdrop-blur-sm border-b border-hud-border pointer-events-none">
      {/* Main row */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-xs text-hud-gold tracking-[0.2em]">DAV</span>
        <span className="font-mono text-[10px] text-hud-muted tracking-[0.2em]">
          // {LABELS[active] ?? "HOME"}
        </span>
        <span className="font-mono text-xs text-hud-cyan tracking-widest">{time}</span>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { id: "hero",       label: "HOME",       module: "00" },
  { id: "projects",   label: "PROJECTS",   module: "01" },
  { id: "initiative", label: "INITIATIVE", module: "02" },
  { id: "skills",     label: "SKILLS",     module: "03" },
  { id: "about",      label: "ABOUT",      module: "04" },
  { id: "services",   label: "SIDE MISSIONS", module: "05" },
  { id: "contact",    label: "CONTACT",    module: "06" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [markOpen, setMarkOpen] = useState(false);

  // Track active section
  useEffect(() => {
    const getActive = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closest = NAV_ITEMS[0].id;
      let closestDist = Infinity;
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(center - (el.offsetTop + el.offsetHeight / 2));
        if (dist < closestDist) { closestDist = dist; closest = id; }
      });
      setActive(closest);
    };
    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  // Stagger items in on open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="md:hidden">
      <MobileTopBar active={active} />
      {/* Full-screen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[9989] flex flex-col justify-center px-8",
          "bg-hud-dark/95 backdrop-blur-md",
          "transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Background grid */}
        <div className="absolute inset-0 hud-grid-bg opacity-20" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-hud-cyan/5 blur-3xl pointer-events-none" />

        {/* Top label */}
        <p className="font-mono text-[10px] text-hud-muted tracking-[0.3em] mb-12 relative">
          NAVIGATION · MARK III
        </p>

        {/* Nav items */}
        <nav className="relative flex flex-col gap-2">
          {NAV_ITEMS.map(({ id, label, module }, i) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "group flex items-center gap-4 py-3 text-left",
                  "transition-all duration-300",
                  "border-b border-hud-border/40",
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
                style={{
                  transitionDelay: visible ? `${i * 60}ms` : "0ms",
                }}
              >
                <span className="font-mono text-[10px] text-hud-muted/50 tracking-[0.2em] w-6">
                  {module}
                </span>
                <span
                  className={cn(
                    "font-mono font-bold text-3xl tracking-[0.1em] transition-colors duration-200",
                    isActive ? "text-hud-cyan text-glow-cyan" : "text-hud-text/60 group-hover:text-hud-text"
                  )}
                >
                  {label}
                </span>
                {isActive && (
                  <span className="ml-auto font-mono text-xs text-hud-cyan">◆</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="mt-12 relative flex items-center justify-between">
          <p className="font-mono text-[10px] text-hud-muted/40 tracking-[0.2em]">
            DAVID A VARGAS · SOFTWARE ENGINEER
          </p>
          <button
            onClick={() => setMarkOpen(true)}
            className="font-mono text-[10px] tracking-[0.15em] text-hud-gold border border-hud-gold/40 hover:border-hud-gold hover:bg-hud-gold/10 transition-all duration-200 px-3 py-1 flex items-center gap-1.5"
          >
            <span>◆</span> MARK III
          </button>
        </div>
      </div>

      {/* Mark patch notes modal */}
      {markOpen && (
        <div
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4"
          onClick={() => setMarkOpen(false)}
        >
          <div className="absolute inset-0 bg-hud-dark/95 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm bg-hud-surface border border-hud-gold/30 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hud-gold" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hud-gold" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hud-gold" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hud-gold" />

            <div className="flex items-center justify-between px-5 py-4 border-b border-hud-border">
              <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">SUIT UPGRADE LOG</span>
              <button onClick={() => setMarkOpen(false)} className="text-hud-muted hover:text-hud-gold transition-colors p-1">
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-5">
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

      {/* Comm badge button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-8 right-6 z-[9990] w-12 h-12",
          "flex items-center justify-center",
          "border border-hud-cyan/40 bg-hud-dark",
          "transition-all duration-300",
          open ? "border-hud-cyan glow-cyan rotate-90" : "hover:border-hud-cyan hover:glow-cyan"
        )}
        aria-label="Toggle navigation"
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-hud-cyan" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-hud-cyan" />

        {/* Icon — morphs between menu and close */}
        <div className="flex flex-col gap-1 items-center justify-center">
          <span
            className={cn(
              "block h-px bg-hud-cyan transition-all duration-300",
              open ? "w-4 rotate-45 translate-y-[5px]" : "w-4"
            )}
          />
          <span
            className={cn(
              "block h-px bg-hud-cyan transition-all duration-300",
              open ? "opacity-0 w-0" : "w-3 opacity-100"
            )}
          />
          <span
            className={cn(
              "block h-px bg-hud-cyan transition-all duration-300",
              open ? "w-4 -rotate-45 -translate-y-[5px]" : "w-4"
            )}
          />
        </div>
      </button>
    </div>
  );
}
