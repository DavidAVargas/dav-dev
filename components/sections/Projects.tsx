"use client";

import { useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { ProjectModal, type ProjectData } from "@/components/ui/ProjectModal";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

const PROJECTS: ProjectData[] = [
  {
    id: "PRJ-001",
    title: "QVIL Studios",
    description: "Full-stack fashion portfolio and event hub for a college fashion student. Built to showcase work, promote events, and connect with collaborators.",
    fullDescription:
      "A friend studying fashion needed more than a portfolio — he needed a platform. QVIL Studios is a full-stack web app where he can display his design work, post upcoming events, and share collaborations with other creatives. I built the entire thing: auth with Clerk, file/image uploads with UploadThing, content management with Payload CMS, and deployed on Vercel. The stack is Next.js, TypeScript, Tailwind, and shadcn/ui — the same foundation I use for my own work. The goal was to give him something that looks professional, scales with him as he grows, and he can actually manage himself without touching code.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Clerk", "UploadThing", "Payload CMS", "shadcn/ui", "Vercel"],
    status: "DEPLOYED",
    demo: undefined,
    links: { live: "https://qvilstudios.com", github: "https://github.com/DavidAVargas/qvil-studios" },
  },
  {
    id: "PRJ-002",
    title: "DAV Portfolio",
    description: "This site. A JARVIS-inspired HUD portfolio built to stand out — not just show code, but show how I think and who I am.",
    fullDescription:
      "Most developer portfolios look the same — white background, three project cards, a contact form. I wanted something that felt like me. I built a full Iron Man JARVIS HUD aesthetic from scratch using Next.js, TypeScript, and Tailwind CSS v4. Every detail was intentional: the boot sequence on first load, the cursor trail, the arc reactor, the scroll progress bar, the side nav that tracks your position in real time. The sections aren't just placeholders — they tell a real story. This project is as much about design thinking and personal brand as it is about technical skill.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Vercel"],
    status: "DEPLOYED",
    demo: undefined,
    links: { live: "#", github: "https://github.com/DavidAVargas/dav-dev" },
  },
  {
    id: "PRJ-003",
    title: "Tech Tutor",
    description: "Final bootcamp capstone — a tutor marketplace for developers. Best project in the class. Led frontend and UX/UI. Hid a farewell easter egg: every classmate, teacher, and tutor on the expert tab with their LinkedIn.",
    fullDescription:
      "The last project of the bootcamp, built with two collaborators — and the best-looking site in the entire class. I owned the frontend, UX/UI, and API integrations. The site lets developers search for tutors by skill level — beginner, intermediate, expert. My collaborators handled Stripe payments and backend authentication. But the part I'm most proud of had nothing to do with the requirements. For the expert tier, instead of using random stock photos and fake names from the API, I manually added every single person from the class — every classmate, my tutor, my teachers — with their real LinkedIn profiles linked. So on the last day, when we presented, everyone in the room saw themselves on the screen. It was a farewell, a thank you, and a way to keep everyone connected and discoverable to recruiters all in one move. Nobody asked me to do it. That's just how I build.",
    tech: ["JavaScript", "HTML", "CSS", "Stripe", "REST APIs"],
    status: "DEPLOYED",
    badge: "BEST IN CLASS",
    demo: undefined,
    links: { live: "https://tech-tutor.onrender.com/", github: "https://github.com/JesusMLares/tech-tutor" },
  },
  {
    id: "PRJ-004",
    title: "Pixel Coder",

    description: "First solo bootcamp project — a browser game where you answer coding questions to dress your character for a software engineering interview. Built everything: code, art, design.",
    fullDescription:
      "Most bootcamp solo projects are a simple webpage. I built a game. Pixel Coder is a browser-based interactive game where players answer coding interview questions to progressively dress their character — starting in pajamas, earning each piece of professional attire with every correct answer, until they're suited up and ready for the interview. I created everything: the code, the pixel art, the character design, the question bank, the logic. Vanilla JavaScript, HTML, and CSS — no frameworks, no shortcuts. It was one of the top projects in my class. This is also where I figured out what I actually love — not just building things, but making them look and feel right. The UI, the UX, the experience a user has in the first three seconds. Because if it doesn't look good, nobody's going to use it. And if it's confusing, same result. I've kept it exactly as I shipped it — a time capsule of where it all started. The code isn't perfect. That's the point.",
    tech: ["JavaScript", "HTML", "CSS"],
    status: "DEPLOYED",
    badge: "BEST IN CLASS",
    demo: undefined,
    links: { live: "https://davidavargas.github.io/Pixel-Coder.github.io/", github: "https://github.com/DavidAVargas/Pixel-Coder.github.io" },
  },
  {
    id: "PRJ-005",
    title: "Tex N Wash",
    description: "Full-stack site for a live, operating pressure washing business in Fort Worth, TX. Real customers. Real revenue. Fully deployed.",
    fullDescription:
      "This isn't a demo — it's a fully operational business platform with real customers and active operations behind it. The site has two login paths: an admin dashboard for managing the business side, and a community login so customers can sign up, join, and stay connected. Built with Next.js, TypeScript, Tailwind, Clerk for auth, UploadThing for media, and Brevo for email marketing and CRM. Deployed on Vercel. Every feature was built to serve a real need — not because it looked good in a tutorial. When stakes are real, the code has to be too.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Clerk", "UploadThing", "Brevo", "Vercel"],
    status: "DEPLOYED",
    demo: undefined,
    links: { live: "https://texnwash.com", github: "https://github.com/DavidAVargas/TexnWash" },
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
        "h-full bg-hud-surface p-6 flex flex-col gap-4 cursor-pointer",
        "border border-hud-border overflow-hidden",
        "transition-all duration-300 group",
        "hover:border-hud-cyan/40 hover:glow-cyan"
      )}
      onClick={onClick}
    >
      {/* Scan line on hover */}
      <span className="card-scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-hud-cyan to-transparent pointer-events-none top-0 opacity-0" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-hud-muted tracking-[0.2em]">
            {project.id}
          </span>
          {project.badge && (
            <span className="font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 border text-hud-gold border-hud-gold/50">
              ★ {project.badge}
            </span>
          )}
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100} className="h-full">
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
