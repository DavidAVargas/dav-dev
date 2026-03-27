"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SECTION_LABELS: Record<string, string> = {
  hero:     "HOME",
  projects: "PROJECTS",
  about:    "ABOUT",
  services: "SERVICES",
  contact:  "CONTACT",
};

const SECTIONS = Object.keys(SECTION_LABELS);

export function HudReadout() {
  const [active, setActive] = useState("hero");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
            setFlash(true);
            setTimeout(() => setFlash(false), 400);
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="fixed top-6 left-6 z-40 pointer-events-none select-none">
      <div
        className={cn(
          "font-mono text-[10px] tracking-[0.25em] transition-opacity duration-200",
          flash ? "text-hud-cyan" : "text-hud-muted/60"
        )}
      >
        // MODULE: {SECTION_LABELS[active]}
      </div>
    </div>
  );
}
