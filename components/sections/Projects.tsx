"use client";

import { useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { ProjectModal, type ProjectData } from "@/components/ui/ProjectModal";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

const PROJECTS: ProjectData[] = [
  {
    id: "PRJ-001",
    title: "Project Alpha",
    description: "Placeholder — add your real project description here.",
    fullDescription:
      "Placeholder — describe the project in detail. What problem did it solve? What decisions did you make and why? What did you learn? This is your chance to show how you think, not just what you built.",
    tech: ["React", "Node.js", "PostgreSQL"],
    status: "DEPLOYED",
    demo: undefined,
    links: { live: "#", github: "#" },
  },
  {
    id: "PRJ-002",
    title: "Project Beta",
    description: "Placeholder — describe the project, your role, and the outcome.",
    fullDescription:
      "Placeholder — go deeper here than the card. Talk about architecture decisions, challenges you hit, how you solved them. Recruiters who click the card are already interested — give them the full story.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    status: "DEPLOYED",
    demo: undefined,
    links: { live: "#", github: "#" },
  },
  {
    id: "PRJ-003",
    title: "Project Gamma",
    description: "Placeholder — a personal tool, side project, or hackathon build.",
    fullDescription:
      "Placeholder — even if this project isn't finished, describe what it is, why you started it, and where it's going. Work in progress is still work.",
    tech: ["Python", "FastAPI", "Redis"],
    status: "IN DEVELOPMENT",
    demo: undefined,
    links: { live: null, github: "#" },
  },
];

function ProjectCard({
  project,
  onClick,
}: {
  project: ProjectData;
  onClick: () => void;
}) {
  const isDeployed = project.status === "DEPLOYED";

  return (
    <HudFrame
      className={cn(
        "bg-hud-surface p-6 flex flex-col gap-4 cursor-pointer",
        "border border-hud-border overflow-hidden",
        "transition-all duration-300 group",
        "hover:border-hud-cyan/40 hover:glow-cyan"
      )}
      onClick={onClick}
    >
      {/* Scan line on hover */}
      <span className="card-scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-hud-cyan to-transparent pointer-events-none top-0 opacity-0" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-hud-muted tracking-[0.2em]">
          {project.id}
        </span>
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.15em] px-2 py-0.5 border",
            isDeployed
              ? "text-hud-cyan border-hud-cyan/50"
              : "text-hud-gold border-hud-gold/50"
          )}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-mono font-bold text-lg text-hud-text group-hover:text-hud-cyan transition-colors duration-200 tracking-wide">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-hud-muted leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] text-hud-cyan border border-hud-cyan/30 px-2 py-0.5 tracking-wide"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Click hint */}
      <div className="pt-2 border-t border-hud-border flex items-center justify-between">
        <span className="font-mono text-[10px] text-hud-muted/50 tracking-[0.1em]">
          CLICK TO ACCESS FILE
        </span>
        <span className="font-mono text-xs text-hud-cyan opacity-0 group-hover:opacity-100 transition-opacity">
          ↗
        </span>
      </div>
    </HudFrame>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<ProjectData | null>(null);

  return (
    <>
      <section id="projects" className="min-h-screen py-24 px-6 hud-grid-bg">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <FadeIn>
            <div className="mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
                MODULE 02
              </p>
              <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
                <span className="text-hud-cyan text-glow-cyan">/</span> PROJECTS
              </h2>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-cyan to-transparent" />
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <ProjectCard
                  project={p}
                  onClick={() => setSelected(p)}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
