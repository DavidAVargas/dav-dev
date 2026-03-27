import { HudFrame } from "@/components/ui/HudFrame";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    id: "01",
    title: "Project Alpha",
    description:
      "Placeholder — add your real project description here. What problem did it solve? What did you build?",
    tech: ["React", "Node.js", "PostgreSQL"],
    status: "DEPLOYED",
    links: { live: "#", github: "#" },
  },
  {
    id: "02",
    title: "Project Beta",
    description:
      "Placeholder — describe the project, your role, and the outcome. Keep it concise and results-focused.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    status: "DEPLOYED",
    links: { live: "#", github: "#" },
  },
  {
    id: "03",
    title: "Project Gamma",
    description:
      "Placeholder — this could be a personal tool, a side project, a hackathon build, or a client project.",
    tech: ["Python", "FastAPI", "Redis"],
    status: "IN DEVELOPMENT",
    links: { live: null, github: "#" },
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const isDeployed = project.status === "DEPLOYED";

  return (
    <HudFrame
      className={cn(
        "bg-hud-surface p-6 flex flex-col gap-4",
        "border border-hud-border overflow-hidden",
        "transition-all duration-300 group",
        "hover:border-hud-cyan/40 hover:glow-cyan"
      )}
    >
      {/* Scan line — sweeps on hover via CSS */}
      <span className="card-scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-hud-cyan to-transparent pointer-events-none top-0 opacity-0" />
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-hud-muted tracking-[0.2em]">
          PROJECT ·{project.id}
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

      {/* Links */}
      <div className="flex gap-4 pt-2 border-t border-hud-border">
        <a
          href={project.links.github}
          className="font-mono text-xs text-hud-muted hover:text-hud-cyan transition-colors tracking-[0.1em]"
        >
          GITHUB ↗
        </a>
        {project.links.live && (
          <a
            href={project.links.live}
            className="font-mono text-xs text-hud-muted hover:text-hud-gold transition-colors tracking-[0.1em]"
          >
            LIVE ↗
          </a>
        )}
      </div>
    </HudFrame>
  );
}

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 px-6 hud-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
            MODULE 02
          </p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
            <span className="text-hud-cyan text-glow-cyan">/</span> PROJECTS
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-cyan to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
