"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    skills: "SKILLS", about: "ABOUT", services: "SERVICES", contact: "CONTACT",
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
  { id: "services",   label: "SERVICES",   module: "05" },
  { id: "contact",    label: "CONTACT",    module: "06" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

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
          NAVIGATION · MARK I
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

        {/* Bottom label */}
        <p className="font-mono text-[10px] text-hud-muted/40 tracking-[0.2em] mt-12 relative">
          DAVID A. VARGAS · SOFTWARE ENGINEER
        </p>
      </div>

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
