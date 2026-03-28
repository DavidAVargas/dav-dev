"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";
import { X } from "lucide-react";

type Mission = {
  id: string;
  title: string;
  category: string;
  status: string;
  statusColor: "cyan" | "gold" | "muted";
  short: string;
  detail: string;
  tags: string[];
  link?: { label: string; url: string };
};

const MISSIONS: Mission[] = [
  {
    id: "MSN-001",
    title: "Tex N Wash Services LLC",
    category: "BUSINESS",
    status: "FULLY OPERATIONAL",
    statusColor: "cyan",
    short: "Pressure washing business based in Fort Worth, TX. Established, structured, and profitable.",
    detail:
      "Running a business before writing my first line of code taught me more about clients, operations, and money than any bootcamp could. Tex N Wash Services LLC is a pressure washing company I built from the ground up in Fort Worth, TX — complete with its own LLC, dedicated bank account, business credit card, and a live website. It runs. It makes money. And doing my own taxes for it is what pushed me to get my PTIN and start down the EA path.",
    tags: ["LLC", "FORT WORTH TX", "PRESSURE WASHING", "ESTABLISHED"],
    link: { label: "TEXNWASH.COM ↗", url: "https://texnwash.com" },
  },
  {
    id: "MSN-002",
    title: "Tax Services",
    category: "FINANCIAL",
    status: "PTIN ACQUIRED · EA PENDING",
    statusColor: "gold",
    short: "Licensed to prepare taxes. Currently serving friends and family while studying for the EA designation.",
    detail:
      "I got my PTIN and started preparing taxes for friends and family. The goal was never to become a full-time tax professional — it was to understand my own financials at a level most business owners don't. Being your own CPA means not needing one. It means understanding every deduction, every structure, every decision. I'm working toward my EA designation now, and when I get there, this becomes a real side revenue stream — tax season is only four months a year anyway.",
    tags: ["PTIN LICENSED", "EA IN PROGRESS", "FRIENDS & FAMILY", "SIDE VENTURE"],
  },
  {
    id: "MSN-003",
    title: "Ultra Marathon",
    category: "ENDURANCE",
    status: "MISSION COMPLETE",
    statusColor: "gold",
    short: "First ever marathon — an ultra. Signed up 3 weeks before. No training. Finished.",
    detail:
      "I signed up for an ultra marathon three weeks before race day. No training. No preparation. No idea what I was really getting into. I just wanted to know if I could do it. I wanted to test my endurance and my grit — not in a controlled environment, but in real conditions with no safety net. I finished. It's not the fastest time on the board, but crossing that line was one of the most honest things I've ever done. It proved something to me that no certificate ever could.",
    tags: ["ULTRA MARATHON", "FIRST EVER", "NO TRAINING", "COMPLETED"],
  },
  {
    id: "MSN-004",
    title: "Military Simulation Airsoft",
    category: "TACTICAL",
    status: "ACTIVE DEPLOYMENT",
    statusColor: "cyan",
    short: "72-hour Airsoft and camping events with infantry exercises, minimal sleep, and constant movement.",
    detail:
      "These are 72-hour military simulation events — Airsoft mixed with camping, infantry exercises, and almost no sleep. You're always moving. The physical and mental fatigue is real. It's the kind of thing that's exhausting in the best possible way. I do it because I like to be uncomfortable on purpose. The same mindset that helps me push through a long debugging session at 2am is the same one that keeps me moving when I've had 3 hours of sleep and it's raining.",
    tags: ["72-HOUR EVENTS", "INFANTRY SIMULATION", "AIRSOFT", "ACTIVE"],
  },
  {
    id: "MSN-005",
    title: "Credit Optimization",
    category: "FINANCIAL",
    status: "ACTIVE",
    statusColor: "cyan",
    short: "Credit score: 520 → 720+ in 2 years. 8 cards, fully optimized. Chase Sapphire Reserve. Amex Gold.",
    detail:
      "There was a rough year. Credit dropped to 520. A lot of people stay there — I didn't. In two years I rebuilt it to over 720, got approved for the Chase Sapphire Reserve (the travel card I was working toward), and now hold 8 cards fully optimized for everyday spending, travel rewards, and business expenses. I learned the system, fixed the score, and now I use it strategically. I'm not obsessed — I'd call myself medium-level. I know enough to maximize the benefits, travel smarter, and run my business the right way. Good credit is just leverage. I treat it like one.",
    tags: ["520 → 720+", "8 CARDS", "CHASE SAPPHIRE RESERVE", "AMEX GOLD", "TRAVEL REWARDS"],
  },
];

function MissionModal({
  mission,
  onClose,
}: {
  mission: Mission | null;
  onClose: () => void;
}) {
  const [displayed, setDisplayed] = useState<Mission | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (mission) {
      setDisplayed(mission);
      setTimeout(() => setVisible(true), 50);
    }
  }, [mission]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setDisplayed(null);
      onClose();
    }, 300);
  };

  if (!mission && !displayed) return null;
  const m = displayed ?? mission!;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
      onClick={handleClose}
    >
      <div
        className="absolute inset-0 bg-hud-dark/90 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: mission ? 1 : 0 }}
      />
      <div
        className={cn(
          "relative w-full max-w-2xl bg-hud-surface border transition-all duration-300",
          m.statusColor === "gold" ? "border-hud-gold/30" : "border-hud-cyan/30",
          visible && mission ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
              m.statusColor === "gold" ? "border-hud-gold" : "border-hud-cyan"
            )}
          />
        ))}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hud-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">{m.id}</span>
            <span className="font-mono text-[10px] text-hud-muted tracking-[0.2em]">{m.category}</span>
          </div>
          <button onClick={handleClose} className="text-hud-muted hover:text-hud-cyan transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <div>
            <span
              className={cn(
                "font-mono text-[9px] tracking-[0.15em] flex items-center gap-1.5 mb-3",
                m.statusColor === "gold" ? "text-hud-gold" : "text-hud-cyan"
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", m.statusColor === "gold" ? "bg-hud-gold" : "bg-hud-cyan")} />
              {m.status}
            </span>
            <h3 className="font-mono font-bold text-xl text-hud-text tracking-wide">{m.title}</h3>
          </div>

          <p className="text-hud-muted text-sm leading-relaxed">{m.detail}</p>

          <div className="flex flex-wrap gap-2">
            {m.tags.map((t) => (
              <span key={t} className={cn(
                "font-mono text-[10px] px-2 py-0.5 border tracking-wide",
                m.statusColor === "gold"
                  ? "text-hud-gold border-hud-gold/30"
                  : "text-hud-cyan border-hud-cyan/30"
              )}>{t}</span>
            ))}
          </div>

          {m.link && (
            <a
              href={m.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-hud-cyan hover:opacity-80 transition-opacity tracking-[0.1em]"
            >
              {m.link.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function MissionCard({ mission, onClick }: { mission: Mission; onClick: () => void }) {
  const isGold = mission.statusColor === "gold";

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative border p-5 cursor-pointer flex flex-col gap-3",
        "transition-all duration-300 group",
        isGold
          ? "border-hud-gold/20 hover:border-hud-gold/50 bg-hud-surface"
          : "border-hud-border hover:border-hud-cyan/40 bg-hud-surface hover:glow-cyan"
      )}
    >
      {/* Corner accents */}
      <span className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2", isGold ? "border-hud-gold" : "border-hud-cyan")} />
      <span className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2", isGold ? "border-hud-gold" : "border-hud-cyan")} />

      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-hud-muted tracking-[0.2em]">{mission.id} · {mission.category}</span>
        <span className={cn(
          "font-mono text-[9px] tracking-[0.1em] flex items-center gap-1.5",
          isGold ? "text-hud-gold" : "text-hud-cyan"
        )}>
          <span className={cn("w-1 h-1 rounded-full", isGold ? "bg-hud-gold" : "bg-hud-cyan animate-glow-cyan")} />
          {mission.status}
        </span>
      </div>

      {/* Title */}
      <h3 className={cn(
        "font-mono font-bold text-base tracking-wide transition-colors duration-200",
        isGold
          ? "text-hud-text group-hover:text-hud-gold"
          : "text-hud-text group-hover:text-hud-cyan"
      )}>
        {mission.title}
      </h3>

      {/* Short desc */}
      <p className="text-hud-muted text-xs leading-relaxed">{mission.short}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {mission.tags.slice(0, 3).map((t) => (
          <span key={t} className={cn(
            "font-mono text-[9px] px-1.5 py-0.5 border tracking-wide",
            isGold ? "text-hud-gold/70 border-hud-gold/20" : "text-hud-cyan/70 border-hud-cyan/20"
          )}>{t}</span>
        ))}
      </div>

      {/* Click hint */}
      <div className="flex justify-end mt-1">
        <span className="font-mono text-[9px] text-hud-muted/40 group-hover:text-hud-muted tracking-[0.1em] transition-colors">
          CLICK TO EXPAND ↗
        </span>
      </div>
    </div>
  );
}

export function SideMissions() {
  const [selected, setSelected] = useState<Mission | null>(null);

  return (
    <>
      <section id="services" className="min-h-screen py-24 px-6 bg-hud-surface">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <FadeIn>
            <div className="mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
                MODULE 05
              </p>
              <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
                <span className="text-hud-gold text-glow-gold">/</span> SIDE MISSIONS
              </h2>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-gold to-transparent" />
              <div className="mt-6 border-l-2 border-hud-gold pl-4 max-w-xl">
                <p className="text-hud-muted text-sm leading-relaxed">
                  The code is one system.{" "}
                  <span className="text-hud-text">These are the others.</span>{" "}
                  Business owner, endurance runner, financial strategist — I don&apos;t just build software.
                  I build everything.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MISSIONS.map((m, i) => (
              <FadeIn key={m.id} delay={i * 100}>
                <MissionCard mission={m} onClick={() => setSelected(m)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <MissionModal mission={selected} onClose={() => setSelected(null)} />
    </>
  );
}
