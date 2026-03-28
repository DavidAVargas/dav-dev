"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";

type Skill = {
  name: string;
  level: number;
  label: string;
  icon: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  color: "cyan" | "gold";
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "FRONTEND & UI/UX",
    subtitle: "CORE SYSTEMS — HIGH OUTPUT",
    color: "cyan",
    skills: [
      { name: "React",      level: 70, label: "PROFICIENT", icon: "⚛" },
      { name: "Next.js",    level: 65, label: "PROFICIENT", icon: "▲" },
      { name: "HTML & CSS", level: 72, label: "PROFICIENT", icon: "</>" },
      { name: "JavaScript", level: 68, label: "PROFICIENT", icon: "JS" },
      { name: "Tailwind",   level: 75, label: "PROFICIENT", icon: "≋" },
      { name: "shadcn/ui",  level: 70, label: "PROFICIENT", icon: "◈" },
      { name: "TypeScript", level: 55, label: "DEVELOPING", icon: "TS" },
    ],
  },
  {
    id: "backend",
    title: "BACKEND & DATA",
    subtitle: "FULL-STACK CAPABLE",
    color: "cyan",
    skills: [
      { name: "Node.js",    level: 60, label: "PROFICIENT", icon: "⬡" },
      { name: "MongoDB",    level: 58, label: "PROFICIENT", icon: "◉" },
      { name: "PostgreSQL", level: 55, label: "PROFICIENT", icon: "⊞" },
      { name: "REST APIs",  level: 62, label: "PROFICIENT", icon: "⇌" },
      { name: "Prisma",     level: 50, label: "DEVELOPING", icon: "◭" },
      { name: "Python",     level: 42, label: "FAMILIAR",   icon: "⌁" },
    ],
  },
  {
    id: "tools",
    title: "TOOLS & PLUGINS",
    subtitle: "RAPID DEPLOYMENT SUITE",
    color: "cyan",
    skills: [
      { name: "Vercel",     level: 70, label: "PROFICIENT", icon: "⊿" },
      { name: "Git/GitHub", level: 65, label: "PROFICIENT", icon: "◎" },
      { name: "Clerk",      level: 60, label: "PROFICIENT", icon: "◇" },
      { name: "Postman",    level: 55, label: "FAMILIAR",   icon: "⊳" },
    ],
  },
  {
    id: "ai",
    title: "MARK II PROTOCOLS",
    subtitle: "AI-AUGMENTED DEVELOPMENT",
    color: "gold",
    skills: [
      { name: "Claude Code",        level: 92, label: "ENHANCED",   icon: "◆" },
      { name: "AI-Assisted Dev",    level: 88, label: "ENHANCED",   icon: "∞" },
      { name: "Prompt Engineering", level: 80, label: "PROFICIENT", icon: "⌘" },
    ],
  },
];

function PowerBar({
  level,
  color,
  animate,
}: {
  level: number;
  color: "cyan" | "gold";
  animate: boolean;
}) {
  return (
    <div className="relative h-1.5 w-full bg-hud-border rounded-none overflow-hidden">
      {/* Segmented background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 9px)",
        }}
      />
      {/* Fill bar */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 transition-all duration-1000 ease-out",
          color === "gold" ? "bg-hud-gold" : "bg-hud-cyan"
        )}
        style={{
          width: animate ? `${level}%` : "0%",
          boxShadow:
            color === "gold"
              ? "0 0 8px rgba(201,162,39,0.6)"
              : "0 0 8px rgba(0,212,255,0.6)",
          transitionDelay: "0.1s",
        }}
      />
    </div>
  );
}

function SkillRow({
  skill,
  color,
  animate,
}: {
  skill: Skill;
  color: "cyan" | "gold";
  animate: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-lg w-7 text-center leading-none",
              color === "gold" ? "text-hud-gold" : "text-hud-cyan"
            )}
          >
            {skill.icon}
          </span>
          <span className="font-mono text-sm text-hud-text tracking-wide">
            {skill.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-[9px] tracking-[0.15em]",
              color === "gold" ? "text-hud-gold/70" : "text-hud-muted"
            )}
          >
            {skill.label}
          </span>
          <span
            className={cn(
              "font-mono text-xs font-bold",
              color === "gold" ? "text-hud-gold" : "text-hud-cyan"
            )}
          >
            {animate ? `${skill.level}%` : "---"}
          </span>
        </div>
      </div>
      <PowerBar level={skill.level} color={color} animate={animate} />
    </div>
  );
}

function CategoryBlock({ category }: { category: Category }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isGold = category.color === "gold";

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-6 border flex flex-col gap-5",
        isGold
          ? "border-hud-gold/30 bg-hud-surface"
          : "border-hud-border bg-hud-surface"
      )}
    >
      {/* Corner accents */}
      <span
        className={cn(
          "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2",
          isGold ? "border-hud-gold" : "border-hud-cyan"
        )}
      />
      <span
        className={cn(
          "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2",
          isGold ? "border-hud-gold" : "border-hud-cyan"
        )}
      />

      {/* Category header */}
      <div>
        <p className="font-mono text-[9px] tracking-[0.3em] text-hud-muted mb-1">
          {category.subtitle}
        </p>
        <h3
          className={cn(
            "font-mono font-bold text-sm tracking-[0.2em]",
            isGold ? "text-hud-gold" : "text-hud-cyan"
          )}
        >
          {category.title}
        </h3>
        {isGold && (
          <p className="font-mono text-[9px] text-hud-gold/50 tracking-[0.1em] mt-1">
            // AI-assisted development is not a shortcut — it&apos;s a force multiplier
          </p>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-4">
        {category.skills.map((skill) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            color={category.color}
            animate={animate}
          />
        ))}
      </div>

      {/* Glow for gold category */}
      {isGold && (
        <div className="absolute inset-0 pointer-events-none rounded-none">
          <div className="absolute inset-0 bg-hud-gold/[0.02]" />
        </div>
      )}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 px-6 hud-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
            MODULE 03
          </p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
            <span className="text-hud-cyan text-glow-cyan">/</span> CAPABILITIES
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-cyan to-transparent" />

          {/* Full-stack callout */}
          <div className="mt-6 flex items-start gap-3 border-l-2 border-hud-cyan pl-4 max-w-xl">
            <div>
              <p className="font-mono text-xs text-hud-cyan tracking-[0.2em]">
                OPERATING MODE
              </p>
              <p className="text-hud-text text-sm mt-1 leading-relaxed">
                Full-stack — end to end. I build the backend, wire the database, handle auth, and deploy.
                I don&apos;t waste time reinventing what already exists.{" "}
                <span className="text-hud-cyan">
                  But where I truly come alive is the frontend — the UI, the feel, the experience.
                  That&apos;s my craft. The goal is always to ship fast and make it look exceptional.
                </span>
              </p>
            </div>
          </div>

          <p className="mt-4 font-mono text-[10px] text-hud-muted/50 tracking-[0.15em]">
            // power levels are self-assessed — visual representation, not a standardized score. always growing.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <FadeIn key={cat.id} delay={i * 120}>
              <CategoryBlock category={cat} />
            </FadeIn>
          ))}
        </div>

        {/* Bottom note */}
        <p className="font-mono text-[10px] text-hud-muted/50 tracking-[0.15em] mt-8 text-center">
          // MARK II PROTOCOLS: AI doesn&apos;t replace the engineer — it amplifies one. I use it to move faster, think bigger, and build better.
        </p>
      </div>
    </section>
  );
}
