"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";
import { X } from "lucide-react";

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
  description: string;
  usedIn: string[];
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    id: "frontend",
    title: "FRONTEND & UI/UX",
    subtitle: "CORE SYSTEMS — HIGH OUTPUT",
    color: "cyan",
    description:
      "Where I spend most of my time. I build UIs that feel alive — responsive, polished, and fast. The frontend is where code meets the user, and that handoff matters. If someone notices the interface, it worked.",
    usedIn: ["QVIL Studios", "DAV Portfolio", "Tex N Wash"],
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
    description:
      "Full-stack capable. I build APIs, wire up databases, and connect everything end to end. I'm not a backend specialist — but I know enough to ship a complete product without needing a second person to finish the job.",
    usedIn: ["QVIL Studios"],
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
    description:
      "The stack I reach for every time. Auth, file storage, CMS, version control, deployment — all battle-tested in real production projects. I don't reinvent what already exists. I plug in the best tools and ship.",
    usedIn: ["QVIL Studios", "DAV Portfolio", "Tex N Wash"],
    skills: [
      { name: "Vercel",      level: 70, label: "PROFICIENT", icon: "⊿" },
      { name: "Git/GitHub",  level: 65, label: "PROFICIENT", icon: "◎" },
      { name: "Clerk",       level: 60, label: "PROFICIENT", icon: "◇" },
      { name: "UploadThing", level: 60, label: "PROFICIENT", icon: "⇧" },
      { name: "Payload CMS", level: 55, label: "PROFICIENT", icon: "▣" },
      { name: "Postman",     level: 55, label: "FAMILIAR",   icon: "⊳" },
    ],
  },
  {
    id: "ai",
    title: "MARK II PROTOCOLS",
    subtitle: "AI-AUGMENTED DEVELOPMENT",
    color: "gold",
    description:
      "AI-assisted development is not a shortcut — it's a force multiplier. I use Claude Code and AI tools to move faster, think bigger, and ship better. The engineer still drives. The AI removes the speed limits.",
    usedIn: ["All Projects"],
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
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 9px)",
        }}
      />
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

function SkillModal({
  category,
  onClose,
}: {
  category: Category | null;
  onClose: () => void;
}) {
  const [displayed, setDisplayed] = useState<Category | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (category) {
      setDisplayed(category);
      setTimeout(() => setVisible(true), 50);
    }
  }, [category]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setDisplayed(null);
      onClose();
    }, 300);
  };

  if (!category && !displayed) return null;
  const c = displayed ?? category!;
  const isGold = c.color === "gold";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
      onClick={handleClose}
    >
      <div
        className="absolute inset-0 bg-hud-dark/90 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: category ? 1 : 0 }}
      />
      <div
        className={cn(
          "relative w-full max-w-2xl bg-hud-surface border transition-all duration-300",
          isGold ? "border-hud-gold/30" : "border-hud-cyan/30",
          visible && category ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        {(["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
           "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"] as const
        ).map((pos, i) => (
          <span
            key={i}
            className={cn(
              "absolute w-4 h-4",
              pos,
              isGold ? "border-hud-gold" : "border-hud-cyan"
            )}
          />
        ))}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hud-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">{c.subtitle}</span>
          </div>
          <button onClick={handleClose} className="text-hud-muted hover:text-hud-cyan transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <div>
            <h3 className={cn(
              "font-mono font-bold text-xl tracking-wide",
              isGold ? "text-hud-gold" : "text-hud-cyan"
            )}>
              {c.title}
            </h3>
            <p className="text-hud-muted text-sm leading-relaxed mt-3">{c.description}</p>
          </div>

          {/* Used in */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-hud-muted mb-2">// DEPLOYED IN</p>
            <div className="flex flex-wrap gap-2">
              {c.usedIn.map((p) => (
                <span key={p} className={cn(
                  "font-mono text-[10px] px-2 py-0.5 border tracking-wide",
                  isGold ? "text-hud-gold border-hud-gold/30" : "text-hud-cyan border-hud-cyan/30"
                )}>{p}</span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-hud-muted mb-4">// POWER LEVELS</p>
            <div className="flex flex-col gap-4">
              {c.skills.map((skill) => (
                <SkillRow key={skill.name} skill={skill} color={c.color} animate={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryBlock({
  category,
  onClick,
}: {
  category: Category;
  onClick: () => void;
}) {
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
      onClick={onClick}
      className={cn(
        "relative p-6 border flex flex-col gap-5 cursor-pointer transition-all duration-300 group",
        isGold
          ? "border-hud-gold/30 bg-hud-surface hover:border-hud-gold/60"
          : "border-hud-border bg-hud-surface hover:border-hud-cyan/40"
      )}
    >
      {/* Corner accents */}
      <span className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2", isGold ? "border-hud-gold" : "border-hud-cyan")} />
      <span className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2", isGold ? "border-hud-gold" : "border-hud-cyan")} />

      {/* Category header */}
      <div>
        <p className="font-mono text-[9px] tracking-[0.3em] text-hud-muted mb-1">
          {category.subtitle}
        </p>
        <h3 className={cn(
          "font-mono font-bold text-sm tracking-[0.2em] transition-opacity duration-200",
          isGold ? "text-hud-gold" : "text-hud-cyan"
        )}>
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
          <SkillRow key={skill.name} skill={skill} color={category.color} animate={animate} />
        ))}
      </div>

      {/* Click hint */}
      <div className="flex justify-end mt-1">
        <span className={cn(
          "font-mono text-[9px] tracking-[0.1em] transition-colors",
          isGold ? "text-hud-gold/30 group-hover:text-hud-gold/70" : "text-hud-muted/40 group-hover:text-hud-muted"
        )}>
          CLICK TO EXPAND ↗
        </span>
      </div>

      {/* Gold glow */}
      {isGold && (
        <div className="absolute inset-0 pointer-events-none rounded-none">
          <div className="absolute inset-0 bg-hud-gold/[0.02]" />
        </div>
      )}
    </div>
  );
}

export function Skills() {
  const [selected, setSelected] = useState<Category | null>(null);

  return (
    <>
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
                    If it doesn&apos;t look good, nobody uses it. If it&apos;s confusing, same result.
                    You have three seconds. I build for those three seconds.
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
                <CategoryBlock category={cat} onClick={() => setSelected(cat)} />
              </FadeIn>
            ))}
          </div>

          <p className="font-mono text-[10px] text-hud-muted/50 tracking-[0.15em] mt-8 text-center">
            // MARK II PROTOCOLS: AI doesn&apos;t replace the engineer — it amplifies one. I use it to move faster, think bigger, and build better.
          </p>
        </div>
      </section>

      <SkillModal category={selected} onClose={() => setSelected(null)} />
    </>
  );
}
