"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useDialog } from "@/lib/use-dialog";
import { FadeIn } from "@/components/ui/FadeIn";
import { X } from "lucide-react";

type Skill = {
  name: string;
  level: number;
  label: string;
  icon: string;
};

type Tone = "cyan" | "gold" | "green";

// Full class strings so Tailwind can see them
const TONES: Record<Tone, {
  text: string; textSoft: string; bg: string; border: string; borderSoft: string;
  barGlow: string; outline: string;
}> = {
  cyan:  { text: "text-hud-cyan",  textSoft: "text-hud-muted",    bg: "bg-hud-cyan",  border: "border-hud-cyan",  borderSoft: "border-hud-cyan/30",  barGlow: "0 0 8px rgba(0,212,255,0.6)",   outline: "has-[:focus-visible]:outline-hud-cyan" },
  gold:  { text: "text-hud-gold",  textSoft: "text-hud-gold/70",  bg: "bg-hud-gold",  border: "border-hud-gold",  borderSoft: "border-hud-gold/30",  barGlow: "0 0 8px rgba(201,162,39,0.6)",  outline: "has-[:focus-visible]:outline-hud-gold" },
  green: { text: "text-hud-green", textSoft: "text-hud-green/70", bg: "bg-hud-green", border: "border-hud-green", borderSoft: "border-hud-green/30", barGlow: "0 0 8px rgba(57,229,140,0.6)",  outline: "has-[:focus-visible]:outline-hud-green" },
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  color: Tone;
  description: string;
  usedIn: string[];
  skills: Skill[];
  featured?: boolean;
  wide?: boolean; // full-width row, skills laid out in three columns
  callout?: string;
};

const CATEGORIES: Category[] = [
  {
    id: "a11y",
    title: "ACCESSIBILITY (A11Y)",
    subtitle: "BUILT FOR EVERYONE — WCAG 2.1 AA",
    color: "green",
    featured: true,
    callout:
      "1 in 4 U.S. adults lives with a disability. Thousands of ADA website lawsuits are filed every year. Most teams treat accessibility as an afterthought — I build it in from the start.",
    description:
      "An interface isn't finished until everyone can use it — with a keyboard, a screen reader, low vision, or a shaky hand. I build to WCAG 2.1 AA: real semantic HTML, focus that goes where it should and comes back when it should, ARIA only where native HTML falls short, and color contrast that actually passes. It protects the business legally, widens the audience, and makes the product better for every user.",
    usedIn: ["All Projects"],
    skills: [
      { name: "WCAG 2.1 AA",               level: 60, label: "PROFICIENT", icon: "◎" },
      { name: "Semantic HTML",             level: 72, label: "PROFICIENT", icon: "</>" },
      { name: "Keyboard & Focus Mgmt",     level: 65, label: "PROFICIENT", icon: "⇥" },
      { name: "ARIA & Screen Readers",     level: 55, label: "DEVELOPING", icon: "◉" },
      { name: "Color Contrast",            level: 62, label: "PROFICIENT", icon: "◐" },
      { name: "Accessibility Auditing",    level: 58, label: "DEVELOPING", icon: "⌕" },
    ],
  },
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
      { name: "Sanity CMS",  level: 50, label: "DEVELOPING", icon: "◧" },
      { name: "Neon",        level: 55, label: "PROFICIENT", icon: "⊕" },
      { name: "Postman",     level: 55, label: "FAMILIAR",   icon: "⊳" },
    ],
  },
  {
    id: "motion",
    title: "MOTION & MOBILE",
    subtitle: "EXPERIENCE LAYER",
    color: "cyan",
    description:
      "Motion is what makes an interface feel alive instead of static. I use GSAP for timeline-driven animation and Motion for React component transitions — always purposeful, never in the way, and respectful of reduced-motion settings. Capacitor lets me take a React web app and ship it as a native iOS or Android app, and Mobbin is where I study real-world mobile patterns and user flows before I design one.",
    usedIn: [],
    skills: [
      { name: "GSAP",       level: 50, label: "DEVELOPING", icon: "≫" },
      { name: "Motion",     level: 55, label: "DEVELOPING", icon: "↝" },
      { name: "Capacitor",  level: 45, label: "FAMILIAR",   icon: "⧉" },
      { name: "Mobbin",     level: 60, label: "PROFICIENT", icon: "▦" },
    ],
  },
  {
    id: "ai",
    title: "J.A.R.V.I.S. PROTOCOLS",
    subtitle: "AI-AUGMENTED DEVELOPMENT",
    color: "gold",
    wide: true,
    description:
      "AI-assisted development is not a shortcut — it's a force multiplier. Claude Code is my main workstation — I wire in MCP servers so it can reach docs, the browser, and my tools, and I engineer the context (project rules, memory, skills) so it actually understands the codebase it's working in. Gemini rounds out the toolkit. The result: I move faster, think bigger, and ship better. The engineer still drives. The AI removes the speed limits.",
    usedIn: ["All Projects"],
    skills: [
      { name: "Claude Code",         level: 92, label: "ENHANCED",   icon: "◆" },
      { name: "MCP Servers",         level: 75, label: "PROFICIENT", icon: "⧓" },
      { name: "Context Engineering", level: 80, label: "PROFICIENT", icon: "✦" },
      { name: "Gemini",              level: 70, label: "PROFICIENT", icon: "✧" },
      { name: "AI-Assisted Dev",     level: 88, label: "ENHANCED",   icon: "∞" },
      { name: "Prompt Engineering",  level: 80, label: "PROFICIENT", icon: "⌘" },
    ],
  },
];

function PowerBar({
  level,
  color,
  animate,
}: {
  level: number;
  color: Tone;
  animate: boolean;
}) {
  return (
    <div aria-hidden="true" className="relative h-1.5 w-full bg-hud-border rounded-none overflow-hidden">
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
          TONES[color].bg
        )}
        style={{
          width: animate ? `${level}%` : "0%",
          boxShadow: TONES[color].barGlow,
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
  color: Tone;
  animate: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "font-mono text-lg w-7 text-center leading-none",
              TONES[color].text
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
              TONES[color].textSoft
            )}
          >
            {skill.label}
          </span>
          <span
            className={cn(
              "font-mono text-xs font-bold",
              TONES[color].text
            )}
          >
            <span aria-hidden="true">{animate ? `${skill.level}%` : "---"}</span>
            <span className="sr-only">, {skill.level}%</span>
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

  const dialogRef = useDialog(category !== null || displayed !== null, handleClose);
  const titleId = useId();

  if (!category && !displayed) return null;
  const c = displayed ?? category!;
  const tone = TONES[c.color];

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
          "relative w-full max-w-2xl bg-hud-surface border outline-none transition-all duration-300",
          tone.borderSoft,
          visible && category ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
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
              tone.border
            )}
          />
        ))}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hud-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">{c.subtitle}</span>
          </div>
          <button onClick={handleClose} aria-label="Close skill details" className="text-hud-muted hover:text-hud-cyan transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <div>
            <h2 id={titleId} className={cn(
              "font-mono font-bold text-xl tracking-wide",
              tone.text
            )}>
              {c.title}
            </h2>
            <p className="text-hud-muted text-sm leading-relaxed mt-3">{c.description}</p>
          </div>

          {/* Used in */}
          {c.usedIn.length > 0 && (
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-hud-muted mb-2"><span aria-hidden="true">// </span>DEPLOYED IN</h3>
              <ul role="list" className="flex flex-wrap gap-2">
                {c.usedIn.map((p) => (
                  <li key={p} className={cn(
                    "font-mono text-[10px] px-2 py-0.5 border tracking-wide",
                    tone.text, tone.borderSoft
                  )}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-hud-muted mb-4"><span aria-hidden="true">// </span>POWER LEVELS</h3>
            <ul role="list" className="flex flex-col gap-4">
              {c.skills.map((skill) => (
                <li key={skill.name}>
                  <SkillRow skill={skill} color={c.color} animate={true} />
                </li>
              ))}
            </ul>
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
  const tone = TONES[category.color];

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-full p-6 border flex flex-col gap-5 cursor-pointer transition-all duration-300 group",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4",
        tone.outline,
        category.featured
          ? "border-hud-green/60 bg-hud-surface glow-green hover:border-hud-green"
          : isGold
            ? "border-hud-gold/30 bg-hud-surface hover:border-hud-gold/60"
            : "border-hud-border bg-hud-surface hover:border-hud-cyan/40"
      )}
    >
      {/* Corner accents */}
      <span className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2", tone.border)} />
      <span className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2", tone.border)} />

      {/* Featured: full corner brackets + priority badge */}
      {category.featured && (
        <>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-hud-green" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-hud-green" />
          <span className="absolute -top-3 left-6 bg-hud-dark px-2 font-mono text-[10px] tracking-[0.2em] text-hud-gold border border-hud-gold/60">
            <span aria-hidden="true">★ </span>PRIORITY SYSTEM
          </span>
        </>
      )}

      {/* Category header */}
      <div>
        <p className="font-mono text-[9px] tracking-[0.3em] text-hud-muted mb-1">
          {category.subtitle}
        </p>
        <h3 className={cn(
          "font-mono font-bold tracking-[0.2em] transition-opacity duration-200",
          category.featured ? "text-lg sm:text-xl text-glow-green" : "text-sm",
          tone.text
        )}>
          <button
            type="button"
            onClick={onClick}
            aria-haspopup="dialog"
            className="text-left outline-none after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {category.title}
          </button>
        </h3>
        {isGold && (
          <p className="font-mono text-[9px] text-hud-gold/50 tracking-[0.1em] mt-1">
            <span aria-hidden="true">// </span>AI-assisted development is not a shortcut — it&apos;s a force multiplier
          </p>
        )}
        {category.callout && (
          <p className="text-sm text-hud-text leading-relaxed mt-3 max-w-3xl border-l-2 border-hud-green pl-3">
            <span aria-hidden="true">// </span>{category.callout}
          </p>
        )}
      </div>

      {/* Skills */}
      <ul role="list" className={cn(
        "flex flex-col gap-4",
        category.featured && "md:grid md:grid-cols-2 md:gap-x-10",
        category.wide && "md:grid md:grid-cols-3 md:gap-x-8"
      )}>
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <SkillRow skill={skill} color={category.color} animate={animate} />
          </li>
        ))}
      </ul>

      {/* Click hint */}
      <div aria-hidden="true" className="flex justify-end mt-auto">
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
      <section id="skills" aria-labelledby="skills-heading" className="min-h-screen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
              MODULE 03
            </p>
            <h2 id="skills-heading" className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
              <span aria-hidden="true" className="text-hud-cyan text-glow-cyan">/</span> CAPABILITIES
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
          <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat, i) => (
              <li key={cat.id} className={cn((cat.featured || cat.wide) && "md:col-span-2")}>
                <FadeIn delay={i * 120} className="h-full">
                  <CategoryBlock category={cat} onClick={() => setSelected(cat)} />
                </FadeIn>
              </li>
            ))}
          </ul>

          <p className="font-mono text-[10px] text-hud-muted/50 tracking-[0.15em] mt-8 text-center">
            <span aria-hidden="true">// </span>J.A.R.V.I.S. PROTOCOLS: AI doesn&apos;t replace the engineer — it amplifies one. I use it to move faster, think bigger, and build better.
          </p>
        </div>
      </section>

      <SkillModal category={selected} onClose={() => setSelected(null)} />
    </>
  );
}
