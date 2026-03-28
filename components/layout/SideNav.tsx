"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero",       label: "HOME" },
  { id: "projects",   label: "PROJECTS" },
  { id: "initiative", label: "INITIATIVE" },
  { id: "skills",     label: "SKILLS" },
  { id: "about",      label: "ABOUT" },
  { id: "services",   label: "SIDE MISSIONS" },
  { id: "contact",    label: "CONTACT" },
];

export function SideNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const getActive = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closest = NAV_ITEMS[0].id;
      let closestDist = Infinity;

      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const elCenter = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.abs(center - elCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      });

      setActive(closest);
    };

    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-7">
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-4 justify-end"
            aria-label={label}
          >
            {/* Label — slides in on hover */}
            <span
              className={cn(
                "font-mono text-xs tracking-[0.2em] transition-all duration-200",
                "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                isActive
                  ? "text-hud-cyan"
                  : "text-hud-muted group-hover:text-hud-cyan"
              )}
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={cn(
                "block rounded-full transition-all duration-300 flex-shrink-0",
                isActive
                  ? "w-4 h-4 bg-hud-cyan animate-glow-cyan"
                  : "w-2.5 h-2.5 bg-hud-muted/60 group-hover:bg-hud-cyan group-hover:w-3.5 group-hover:h-3.5"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
