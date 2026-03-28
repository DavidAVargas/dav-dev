"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <div className="hidden md:block fixed top-6 left-6 z-40 pointer-events-none select-none">
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
