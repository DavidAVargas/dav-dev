"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useDialog } from "@/lib/use-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type ProjectData = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  status: string;
  badge?: string;
  demo?: string; // screenshot (or GIF) path under /public
  links: { live: string | null; github: string };
};

/** Tech tag highlighted in the accessibility accent color */
export const A11Y_TAG = "Accessibility (A11Y)";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  position?: { index: number; total: number };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectModal({ project, onClose, onPrev, onNext, position }: ProjectModalProps) {
  const [phase, setPhase] = useState<"accessing" | "open" | "closing" | "closed">("closed");
  const [displayed, setDisplayed] = useState<ProjectData | null>(null);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  });

  // Open flow — switching between projects while open skips the "accessing" intro
  useEffect(() => {
    if (!project) return;
    setDisplayed(project);
    if (phaseRef.current === "open") {
      dialogRef.current?.scrollTo({ top: 0 });
      return;
    }
    setPhase("accessing");
    const t = setTimeout(() => setPhase("open"), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const dialogRef = useDialog(phase !== "closed", handleClose);
  const titleId = useId();

  // Left / Right arrow keys move between projects
  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onPrev) { e.preventDefault(); onPrev(); }
      if (e.key === "ArrowRight" && onNext) { e.preventDefault(); onNext(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, onPrev, onNext]);

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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-busy={phase === "accessing"}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto outline-none",
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
            <h2 id={titleId} className="sr-only">
              {displayed.title}
            </h2>
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
            {/* Announces the project after prev/next navigation */}
            <p className="sr-only" aria-live="polite">
              {position ? `Project ${position.index + 1} of ${position.total}: ` : ""}
              {displayed.title}
            </p>

            {/* Top bar — sticky so prev/next stay reachable while scrolling */}
            <div className="sticky top-0 z-20 bg-hud-surface flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-hud-border">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4 min-w-0">
                <span className="font-mono text-[10px] text-hud-muted tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
                  <span className="hidden sm:inline">FILE: </span>{displayed.id}
                </span>
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 border whitespace-nowrap",
                    displayed.status === "DEPLOYED"
                      ? "text-hud-cyan border-hud-cyan/40"
                      : "text-hud-gold border-hud-gold/40"
                  )}
                >
                  {displayed.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {onPrev && onNext && position && (
                  <>
                    <button
                      onClick={onPrev}
                      aria-label="Previous project"
                      className="w-8 h-8 flex items-center justify-center border border-hud-border text-hud-muted hover:text-hud-cyan hover:border-hud-cyan/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hud-cyan"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="font-mono text-[10px] text-hud-muted hidden sm:inline tracking-[0.2em] tabular-nums whitespace-nowrap text-center" aria-hidden="true">
                      {pad(position.index + 1)} / {pad(position.total)}
                    </span>
                    <button
                      onClick={onNext}
                      aria-label="Next project"
                      className="w-8 h-8 flex items-center justify-center border border-hud-border text-hud-muted hover:text-hud-cyan hover:border-hud-cyan/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hud-cyan"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="w-px h-5 bg-hud-border mx-1" aria-hidden="true" />
                  </>
                )}
                <button
                  onClick={handleClose}
                  aria-label="Close project details"
                  className="text-hud-muted hover:text-hud-cyan transition-colors p-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div key={displayed.id} className="animate-in fade-in-0 duration-300">
              {/* Demo area */}
              <div className="relative w-full aspect-video bg-hud-dark border-b border-hud-border overflow-hidden">
                {displayed.demo ? (
                  <Image
                    src={displayed.demo}
                    alt={`Screenshot of the ${displayed.title} homepage`}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 896px, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    {/* Placeholder HUD */}
                    <div className="relative w-20 h-20 border border-hud-cyan/20 flex items-center justify-center">
                      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-hud-cyan/40" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-hud-cyan/40" />
                      <span aria-hidden="true" className="font-mono text-2xl text-hud-cyan/30">▶</span>
                    </div>
                    <p className="font-mono text-xs text-hud-muted tracking-[0.2em]">
                      <span aria-hidden="true">// </span>PREVIEW PENDING
                    </p>
                    <p className="font-mono text-[10px] text-hud-muted/40 tracking-[0.15em]">
                      SCREENSHOT COMING SOON
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
                  <h2 id={titleId} className="font-mono font-bold text-xl text-hud-text tracking-wide">
                    {displayed.title}
                  </h2>
                  <p className="text-hud-muted text-sm leading-relaxed">
                    {displayed.fullDescription}
                  </p>
                </div>

                {/* Right — tech + links */}
                <div className="p-6 flex flex-col gap-6">
                  <div>
                    <h3 className="font-mono text-[10px] text-hud-cyan tracking-[0.2em] mb-3">
                      <span aria-hidden="true">// </span>TECH STACK
                    </h3>
                    <ul role="list" className="flex flex-wrap gap-2">
                      {displayed.tech.map((t) => (
                        <li
                          key={t}
                          className={cn(
                            "font-mono text-[10px] border px-2 py-0.5 tracking-wide",
                            t === A11Y_TAG
                              ? "text-hud-green border-hud-green/50"
                              : "text-hud-cyan border-hud-cyan/30"
                          )}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] text-hud-cyan tracking-[0.2em] mb-3">
                      <span aria-hidden="true">// </span>ACCESS LINKS
                    </h3>
                    <div className="flex flex-col gap-2">
                      {displayed.links.github ? (
                        <a
                          href={displayed.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-hud-muted hover:text-hud-cyan transition-colors tracking-[0.1em] flex items-center gap-2"
                        >
                          <span aria-hidden="true" className="text-hud-cyan">◎</span> GITHUB<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in new tab)</span>
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-hud-muted/40 tracking-[0.1em] flex items-center gap-2">
                          <span aria-hidden="true">◎</span> PRIVATE REPO
                        </span>
                      )}
                      {displayed.links.live ? (
                        <a
                          href={displayed.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-hud-muted hover:text-hud-gold transition-colors tracking-[0.1em] flex items-center gap-2"
                        >
                          <span aria-hidden="true" className="text-hud-gold">◆</span> LIVE SITE<span aria-hidden="true"> ↗</span><span className="sr-only"> (opens in new tab)</span>
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-hud-muted/40 tracking-[0.1em] flex items-center gap-2">
                          <span aria-hidden="true">◇</span> LIVE SITE PENDING
                        </span>
                      )}
                    </div>
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
