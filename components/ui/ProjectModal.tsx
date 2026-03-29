"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type ProjectData = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  status: string;
  badge?: string;
  demo?: string; // GIF or video URL
  links: { live: string | null; github: string };
};

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [phase, setPhase] = useState<"accessing" | "open" | "closing" | "closed">("closed");
  const [displayed, setDisplayed] = useState<ProjectData | null>(null);

  // Open flow
  useEffect(() => {
    if (project) {
      setDisplayed(project);
      setPhase("accessing");
      const t = setTimeout(() => setPhase("open"), 800);
      return () => clearTimeout(t);
    }
  }, [project]);

  // Close with animation
  const handleClose = () => {
    setPhase("closing");
    setTimeout(() => {
      setPhase("closed");
      setDisplayed(null);
      onClose();
    }, 350);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Lock body scroll without layout shift
  useEffect(() => {
    if (project) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [project]);

  if (phase === "closed" || !displayed) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hud-dark/90 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: phase === "closing" ? 0 : 1 }}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto",
          "bg-hud-surface border border-hud-cyan/30",
          "transition-all duration-350",
          phase === "closing"
            ? "opacity-0 scale-95 translate-y-2"
            : "opacity-100 scale-100 translate-y-0"
        )}
        style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-hud-cyan z-10" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-hud-cyan z-10" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-hud-cyan z-10" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-hud-cyan z-10" />

        {/* ACCESSING FILE phase */}
        {phase === "accessing" && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="font-mono text-xs text-hud-muted tracking-[0.3em]">
              ACCESSING FILE...
            </p>
            <div className="w-48 h-px bg-hud-border overflow-hidden">
              <div
                className="h-full bg-hud-cyan"
                style={{ animation: "scan-card 0.8s ease-out forwards" }}
              />
            </div>
            <p className="font-mono text-[10px] text-hud-cyan tracking-[0.2em]">
              {displayed.id}
            </p>
          </div>
        )}

        {/* Full content */}
        {phase === "open" && (
          <div className="flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-hud-border">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">
                  FILE: {displayed.id}
                </span>
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 border",
                    displayed.status === "DEPLOYED"
                      ? "text-hud-cyan border-hud-cyan/40"
                      : "text-hud-gold border-hud-gold/40"
                  )}
                >
                  {displayed.status}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-hud-muted hover:text-hud-cyan transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Demo area */}
            <div className="relative w-full aspect-video bg-hud-dark border-b border-hud-border overflow-hidden">
              {displayed.demo ? (
                <img
                  src={displayed.demo}
                  alt={`${displayed.title} demo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  {/* Placeholder HUD */}
                  <div className="relative w-20 h-20 border border-hud-cyan/20 flex items-center justify-center">
                    <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-hud-cyan/40" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-hud-cyan/40" />
                    <span className="font-mono text-2xl text-hud-cyan/30">▶</span>
                  </div>
                  <p className="font-mono text-xs text-hud-muted tracking-[0.2em]">
                    // DEMO RECORDING PENDING
                  </p>
                  <p className="font-mono text-[10px] text-hud-muted/40 tracking-[0.15em]">
                    GIF OR VIDEO WILL LOAD HERE
                  </p>
                </div>
              )}

              {/* Scan line overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.015) 3px, rgba(0,212,255,0.015) 4px)",
                }}
              />
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-hud-border">
              {/* Left — description */}
              <div className="md:col-span-2 p-6 flex flex-col gap-4">
                <h3 className="font-mono font-bold text-xl text-hud-text tracking-wide">
                  {displayed.title}
                </h3>
                <p className="text-hud-muted text-sm leading-relaxed">
                  {displayed.fullDescription}
                </p>
              </div>

              {/* Right — tech + links */}
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[10px] text-hud-cyan tracking-[0.2em] mb-3">
                    // TECH STACK
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {displayed.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-hud-cyan border border-hud-cyan/30 px-2 py-0.5 tracking-wide"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] text-hud-cyan tracking-[0.2em] mb-3">
                    // ACCESS LINKS
                  </p>
                  <div className="flex flex-col gap-2">
                    {displayed.links.github ? (
                      <a
                        href={displayed.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-hud-muted hover:text-hud-cyan transition-colors tracking-[0.1em] flex items-center gap-2"
                      >
                        <span className="text-hud-cyan">◎</span> GITHUB ↗
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-hud-muted/40 tracking-[0.1em] flex items-center gap-2">
                        <span>◎</span> PRIVATE REPO
                      </span>
                    )}
                    {displayed.links.live ? (
                      <a
                        href={displayed.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-hud-muted hover:text-hud-gold transition-colors tracking-[0.1em] flex items-center gap-2"
                      >
                        <span className="text-hud-gold">◆</span> LIVE SITE ↗
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-hud-muted/40 tracking-[0.1em] flex items-center gap-2">
                        <span>◇</span> LIVE SITE PENDING
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
