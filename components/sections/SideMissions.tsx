"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";
import { X } from "lucide-react";

type BookEntry = { title: string; author?: string };
type BookShelf = { category: string; items: BookEntry[] };

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
  books?: BookShelf[];
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
    status: "PTIN ACQUIRED · AFSP NEXT",
    statusColor: "gold",
    short: "Licensed to prepare taxes. AFSP certification coming June. EA and CPA on the roadmap.",
    detail:
      "I got my PTIN and started preparing taxes for friends and family. The goal was never to become a full-time tax professional — it was to understand my own financials at a level most business owners don't. Being your own CPA means not needing one. It means understanding every deduction, every structure, every decision. Next up: AFSP certification in June, then the EA designation, then maybe the CPA. Each level unlocks more. Tax season is only four months a year anyway.",
    tags: ["PTIN LICENSED", "AFSP · JUNE", "EA ROADMAP", "FRIENDS & FAMILY"],
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
  {
    id: "MSN-007",
    title: "Acting · IMDb · 3 Short Films",
    category: "PERFORMANCE",
    status: "ON HIATUS · CREDITS REAL",
    statusColor: "gold",
    short: "Took acting classes, got cast, and appeared in three short films. Each with a named character. Credits listed on IMDb.",
    detail:
      "I wanted to try something completely outside my lane — so I took acting classes and actually followed through. That turned into three short film credits: Jared Collins in The Reconcile, Kevin in Who's That Knocking?, and Nick Ramon in Two Robbers and A Mad Man. On that last one I got to act alongside Dan Hewitt Owens — an award-winning director, actor, producer, and screenwriter with over 50 years in the film industry. Three different characters, three different productions. I'm not pivoting to Hollywood — I just wanted to see if I could do it, and I did. Haven't had the time to get back into it, but the experience is real and the credits are there. You can look me up.",
    tags: ["THE RECONCILE", "WHO'S THAT KNOCKING?", "TWO ROBBERS AND A MAD MAN", "3 CREDITS"],
    link: { label: "VIEW IMDB PROFILE ↗", url: "https://www.imdb.com/name/nm13791743/" },
  },
  {
    id: "MSN-008",
    title: "Private Pilot License",
    category: "AVIATION",
    status: "FLIGHT DISCOVERY INCOMING",
    statusColor: "cyan",
    short: "Learning to fly. Flight discovery coming up. Goal: earn a Private Pilot License (PPL) and own the skies.",
    detail:
      "I decided I want to learn how to fly a plane. Flight discovery is coming up soon — that's the first real step, where you actually get in a small aircraft and take the controls. After that, the goal is to work toward a Private Pilot License. It's not a quick process. It takes hours, training, written exams, and checkrides. But that's the point. The same reason I ran an ultra marathon with no training is the same energy that gets me interested in this — I like to do hard things on purpose. The sky is just the next hard thing.",
    tags: ["FLIGHT DISCOVERY SOON", "PPL ROADMAP", "STUDENT PILOT", "IN PROGRESS"],
  },
  {
    id: "MSN-009",
    title: "Watch Collection · Trophy Philosophy",
    category: "HOROLOGY",
    status: "ALWAYS EARNING THE NEXT ONE",
    statusColor: "gold",
    short: "~8 watches. Each one earned, not bought. They're trophies — I only get one when I've done something that deserves it.",
    detail:
      "A watch isn't just a timepiece. It's a conversation starter, a reflection of character, and for me — a trophy. I only buy one when I've genuinely earned it. My most recent piece is the Bulova Series X Marc Anthony, bought after a year of 65-hour work weeks, every single week. Before that, I picked up the first-ever Bulova Curv Monograph during my first cruise on Icon of the Seas — the largest cruise ship in the world at the time — after 2 to 3 years without a real vacation. That watch earned itself twice. I'm not a hype buyer. I don't chase trends. I go for unique pieces with art and heritage behind them. Favorite brand is Audemars Piguet — the goal isn't just to buy one, it's to walk into an AD, build a real relationship, and earn that purchase the right way. Next up: Cartier Tank, Cartier Santos, then the Omega Seamaster Ultra Deep. That dial is a 1:1 scale of the actual floor of the Mariana Trench — the deepest point on earth. Dark blue. Shaped like a wave. When I deserve it, I'll get it.",
    tags: ["~8 WATCHES", "TROPHIES NOT TRENDS", "BULOVA · SERIES X", "AP GOAL", "SEAMASTER ULTRA DEEP NEXT"],
  },
  {
    id: "MSN-006",
    title: "The Reading List",
    category: "KNOWLEDGE",
    status: "ALWAYS READING",
    statusColor: "gold",
    short: "Never liked reading until Rich Dad Poor Dad changed everything. 40+ books in — all business, mindset, and self-improvement. No fiction. No fluff.",
    detail:
      "I was never a reader. The only book I actually finished in school was Ender's Game. Everything else just didn't stick. Then I picked up Rich Dad Poor Dad — and something shifted. I realized books weren't boring. I was just reading the wrong ones. Now I can't stop. Every book on this list changed how I think about money, business, mindset, health, or people. I don't read to say I read. I read because there's no faster way to download someone else's decades of experience in a few hours. Knowledge is leverage — and I treat it like one.",
    tags: ["40+ BOOKS READ", "2 CURRENTLY READING", "18 IN QUEUE", "ALWAYS GROWING"],
    books: [
      {
        category: "BUSINESS & MONEY",
        items: [
          { title: "Rich Dad, Poor Dad", author: "Robert Kiyosaki" },
          { title: "Cashflow Quadrant", author: "Robert Kiyosaki" },
          { title: "Retire Young, Retire Rich", author: "Robert Kiyosaki" },
          { title: "Profit First", author: "Mike Michalowicz" },
          { title: "Million Dollar Weekend", author: "Noah Kagan" },
          { title: "12 Months to $1 Million", author: "Ryan Daniel Moran" },
          { title: "The Art of Selling Your Business", author: "John Warrillow" },
          { title: "The 4-Hour Work Week", author: "Tim Ferriss" },
          { title: "I Will Teach You to Be Rich", author: "Ramit Sethi" },
          { title: "The Law of Success in 16 Lessons", author: "Napoleon Hill" },
          { title: "Think and Grow Rich", author: "Napoleon Hill" },
          { title: "A Simple Path to Wealth", author: "JL Collins" },
          { title: "Dropshipping Make Money Online", author: "Marcus Baumann" },
          { title: "Move Fast and Fix Things", author: "Frances Frei & Anne Morriss" },
        ],
      },
      {
        category: "MINDSET & SELF-DEVELOPMENT",
        items: [
          { title: "Can't Hurt Me", author: "David Goggins" },
          { title: "Never Finished", author: "David Goggins" },
          { title: "Hustle Harder, Hustle Smarter", author: "Curtis '50 Cent' Jackson" },
          { title: "Atomic Habits", author: "James Clear" },
          { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
          { title: "The Mountain Is You", author: "Brianna Wiest" },
          { title: "Do Hard Things", author: "Steve Magness" },
          { title: "The One Thing", author: "Gary Keller" },
          { title: "48 Laws of Power", author: "Robert Greene" },
          { title: "Winning", author: "Tim Grover" },
          { title: "The Secret", author: "Rhonda Byrne" },
          { title: "The Power", author: "Rhonda Byrne" },
          { title: "Hero", author: "Rhonda Byrne" },
          { title: "Redeeming Your Time", author: "Jordan Raynor" },
          { title: "Discipline for Entrepreneurs", author: "Martin Meadows" },
          { title: "Stop Lying", author: "Dr. Bennett Pologe" },
          { title: "How to Find Yourself", author: "Nick Trenton" },
          { title: "How to Train Your Mind", author: "Chris Bailey" },
        ],
      },
      {
        category: "SALES & INFLUENCE",
        items: [
          { title: "Choose Your Enemies Wisely", author: "Patrick Bet-David & Greg Dinkin" },
          { title: "The Way of the Wolf", author: "Jordan Belfort" },
          { title: "How to Win Friends and Influence People", author: "Dale Carnegie" },
          { title: "1 Million Followers", author: "Brendan Kane" },
          { title: "Influencer", author: "Brittany Hennessy" },
          { title: "Crushing It", author: "Gary Vaynerchuk" },
          { title: "Reverse Engineering of Sales", author: "J. Dehar" },
        ],
      },
      {
        category: "MILITARY & GRIT",
        items: [
          { title: "Lone Survivor", author: "Marcus Luttrell" },
          { title: "American Sniper", author: "Chris Kyle" },
          { title: "The Last Punisher", author: "Kevin Lacz" },
        ],
      },
      {
        category: "HEALTH & PERFORMANCE",
        items: [
          { title: "Bigger Leaner Stronger", author: "Michael Matthews" },
          { title: "The Way of the Superior Man", author: "David Deida" },
        ],
      },
      {
        category: "OTHER",
        items: [
          { title: "The Five Love Languages", author: "Gary Chapman" },
          { title: "Beyond the Wand", author: "Tom Felton" },
          { title: "Remote Work Revolution", author: "Tsedal Neeley" },
          { title: "Ender's Game", author: "Orson Scott Card" },
        ],
      },
      {
        category: "◉ CURRENTLY READING",
        items: [
          { title: "Surrounded by Psychopaths", author: "Thomas Erikson" },
          { title: "No More Mr. Nice Guy", author: "Robert Glover" },
        ],
      },
      {
        category: "◇ QUEUE",
        items: [
          { title: "Never Eat Alone", author: "Keith Ferrazzi" },
          { title: "The Operator", author: "Robert O'Neill" },
          { title: "The Choice", author: "Edith Eger" },
          { title: "Unafraid", author: "Eddie Penney & Keith Wood" },
          { title: "Dare to Lead", author: "Brené Brown" },
          { title: "Unapologetic Ambition", author: "Shellye Archambeau" },
          { title: "Leading with Heart", author: "John Baird & Edward Sullivan" },
          { title: "Your Next Five Moves", author: "Patrick Bet-David" },
          { title: "The Phoenix Economy", author: "Felix Salmon" },
          { title: "The Power of One More", author: "Ed Mylett" },
          { title: "What's Your Dream", author: "Simon Squibb" },
          { title: "The Total Money Makeover", author: "Dave Ramsey" },
          { title: "Extreme Ownership", author: "Jocko Willink & Leif Babin" },
          { title: "Power vs. Force", author: "David Hawkins" },
          { title: "Never Split the Difference", author: "Chris Voss" },
          { title: "Smarter Faster Better", author: "Charles Duhigg" },
          { title: "The Triple Package", author: "Amy Chua & Jed Rubenfeld" },
          { title: "The Personal MBA", author: "Josh Kaufman" },
        ],
      },
    ],
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

        {/* Content — scrollable */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
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

          {/* Book list */}
          {m.books && (
            <div className="flex flex-col gap-5">
              <p className={cn(
                "font-mono text-[10px] tracking-[0.2em]",
                m.statusColor === "gold" ? "text-hud-gold" : "text-hud-cyan"
              )}>// READING LOG</p>
              {m.books.map((shelf) => (
                <div key={shelf.category}>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-hud-muted mb-2">
                    {shelf.category}
                  </p>
                  <div className="h-px w-full bg-hud-border mb-3" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                    {shelf.items.map((book) => (
                      <div key={book.title} className="flex flex-col">
                        <span className={cn(
                          "font-mono text-xs",
                          m.statusColor === "gold" ? "text-hud-gold/80" : "text-hud-text"
                        )}>
                          {book.title}
                        </span>
                        {book.author && (
                          <span className="font-mono text-[9px] text-hud-muted/60">{book.author}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

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
        "h-full relative border p-5 cursor-pointer flex flex-col gap-3",
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
      <p className="text-hud-muted text-xs leading-relaxed flex-1">{mission.short}</p>

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
            <div className="mb-16 flex flex-col lg:flex-row lg:items-center gap-10">
              {/* Left — text */}
              <div className="flex-1">
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

              {/* Right — cinematic photo */}
              <div className="relative flex-shrink-0 flex justify-center lg:justify-end">
                <div className="relative w-[280px] sm:w-[360px]">
                  {/* Gold corner brackets */}
                  <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-hud-gold z-10" />
                  <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-hud-gold z-10" />
                  <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-hud-gold z-10" />
                  <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-hud-gold z-10" />
                  {/* Scan line overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.02) 3px, rgba(0,212,255,0.02) 4px)",
                    }}
                  />
                  {/* Gold tint overlay */}
                  <div className="absolute inset-0 bg-hud-gold/5 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/dav-stark.png"
                    alt="David A Vargas"
                    className="w-full object-cover grayscale-[20%] contrast-[1.05]"
                  />
                  {/* ID label */}
                  <div className="absolute bottom-0 inset-x-0 bg-hud-dark/70 backdrop-blur-sm px-3 py-1.5 z-20">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-hud-gold text-center">
                      SUBJECT: DAV-001 · ALWAYS BUILDING
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {MISSIONS.map((m, i) => (
              <FadeIn key={m.id} delay={i * 100} className="h-full">
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
