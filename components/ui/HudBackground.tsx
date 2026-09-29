"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionPref } from "@/lib/motion-pref";

type Glow = { color: string; left: string; top: string };

const CYAN = (a: number) => `rgba(0, 212, 255, ${a})`;
const GOLD = (a: number) => `rgba(201, 162, 39, ${a})`;
const GREEN = (a: number) => `rgba(57, 229, 140, ${a})`;

// Two soft glows per section — color and position drift as you scroll
const MOODS: Record<string, [Glow, Glow]> = {
  hero:       [{ color: CYAN(0.045), left: "50%", top: "45%" }, { color: GOLD(0.03),  left: "85%", top: "90%" }],
  projects:   [{ color: CYAN(0.09),  left: "80%", top: "30%" }, { color: CYAN(0.05),  left: "15%", top: "80%" }],
  initiative: [{ color: GOLD(0.08),  left: "15%", top: "35%" }, { color: GOLD(0.05),  left: "85%", top: "80%" }],
  skills:     [{ color: GREEN(0.07), left: "80%", top: "25%" }, { color: CYAN(0.06),  left: "20%", top: "75%" }],
  about:      [{ color: GOLD(0.08),  left: "75%", top: "40%" }, { color: CYAN(0.05),  left: "20%", top: "85%" }],
  "side-missions": [{ color: GOLD(0.07),  left: "25%", top: "30%" }, { color: CYAN(0.05),  left: "80%", top: "75%" }],
  contact:    [{ color: CYAN(0.09),  left: "50%", top: "55%" }, { color: GOLD(0.05),  left: "20%", top: "20%" }],
};

const SECTIONS = Object.keys(MOODS);
const GRID = 48; // must match hud-grid-bg background-size

/* ─── Section motifs: one large faint HUD graphic each, never tiled ─── */

// Projects — arc-reactor style rings with a tick dial
function Rings() {
  return (
    <svg viewBox="0 0 800 800" className="w-full h-full text-hud-cyan" fill="none" stroke="currentColor">
      <circle cx="400" cy="400" r="380" strokeOpacity="0.5" />
      <circle cx="400" cy="400" r="300" strokeDasharray="2 10" />
      <circle cx="400" cy="400" r="220" strokeOpacity="0.6" />
      <circle cx="400" cy="400" r="140" strokeDasharray="40 12" strokeOpacity="0.7" />
      {Array.from({ length: 72 }, (_, i) => (
        <line
          key={i}
          x1="400" y1="8" x2="400" y2={i % 6 === 0 ? 36 : 20}
          transform={`rotate(${i * 5} 400 400)`}
          strokeOpacity={i % 6 === 0 ? 0.9 : 0.4}
        />
      ))}
    </svg>
  );
}

// Static label that sits in the middle of the spinning rings
function RingsLabel() {
  return (
    <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full text-hud-cyan" fill="currentColor">
      <text x="400" y="392" textAnchor="middle" className="font-mono" fontSize="16" letterSpacing="6" fill="currentColor" stroke="none">J.A.R.V.I.S.</text>
      <text x="400" y="418" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="4" fill="currentColor" stroke="none" fillOpacity="0.7">PROJECT INDEX · 09</text>
    </svg>
  );
}

// Initiative — J.A.R.V.I.S. voice waveform, like the AI is talking
const BARS = 56;
const BAR_HEIGHTS = Array.from({ length: BARS }, (_, i) => {
  // smooth envelope (tall in the middle) with a little per-bar variation
  const t = i / (BARS - 1);
  const env = Math.sin(Math.PI * t) ** 1.5;
  const wobble = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
  return Math.round(20 + 200 * env * wobble); // rounded so server and client render identical markup
});

function Waveform({ still }: { still: boolean }) {
  const gap = 1200 / BARS;
  return (
    <svg viewBox="0 0 1200 320" className="w-full h-full text-hud-gold" fill="currentColor" stroke="currentColor">
      <line x1="0" y1="160" x2="1200" y2="160" strokeOpacity="0.35" />
      {BAR_HEIGHTS.map((h, i) => (
        <motion.rect
          key={i}
          x={Math.round((i * gap + gap * 0.3) * 10) / 10}
          y={160 - h / 2}
          width={Math.round(gap * 0.4 * 10) / 10}
          height={h}
          rx={2}
          stroke="none"
          fillOpacity={Math.round((0.35 + 0.65 * (h / 220)) * 100) / 100}
          style={{ transformBox: "fill-box", originY: 0.5 }}
          animate={still ? undefined : { scaleY: [1, 0.35 + ((i * 7) % 5) * 0.08, 1] }}
          transition={{ duration: 1.1 + ((i * 13) % 7) * 0.12, repeat: Infinity, ease: "easeInOut", delay: (i % 9) * 0.07 }}
        />
      ))}
      <text x="0" y="24" className="font-mono" fontSize="14" letterSpacing="4" stroke="none" fillOpacity="0.8">
        J.A.R.V.I.S. · VOICE LINK ACTIVE
      </text>
      <text x="1200" y="310" textAnchor="end" className="font-mono" fontSize="12" letterSpacing="3" stroke="none" fillOpacity="0.6">
        ANALYZING INITIATIVE LOG ▸ 05 FILES
      </text>
    </svg>
  );
}

// Skills — data field of dots, faded into a soft patch
function DotField() {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: "radial-gradient(rgba(57, 229, 140, 0.9) 1px, transparent 1.5px)",
        backgroundSize: "26px 26px",
        maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 10%, transparent 100%)",
      }}
    />
  );
}

// About — honeycomb cluster (echoes the hex photo)
function Hexes() {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  const r = 90;
  const w = Math.sqrt(3) * r;
  const cells: [number, number, number][] = [
    [400, 400, 1], [400 + w, 400, 0.6], [400 - w, 400, 0.6],
    [400 + w / 2, 400 - 1.5 * r, 0.8], [400 - w / 2, 400 - 1.5 * r, 0.4],
    [400 + w / 2, 400 + 1.5 * r, 0.5], [400 - w / 2, 400 + 1.5 * r, 0.8],
    [400 + 1.5 * w, 400 - 1.5 * r, 0.3], [400 - 1.5 * w, 400 + 1.5 * r, 0.3],
  ];
  return (
    <svg viewBox="0 0 800 800" className="w-full h-full text-hud-gold" fill="none" stroke="currentColor">
      {cells.map(([cx, cy, o], i) => (
        <polygon key={i} points={hex(cx, cy, r - 6)} strokeOpacity={o} />
      ))}
      <text x="400" y="396" textAnchor="middle" className="font-mono" fontSize="13" letterSpacing="4" fill="currentColor" stroke="none">BIO-SCAN</text>
      <text x="400" y="416" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="3" fill="currentColor" stroke="none" fillOpacity="0.7">SUBJECT DAV-001</text>
    </svg>
  );
}

// Side Missions — flowing contour lines, like terrain on a mission map
function Contours() {
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="none" className="w-full h-full text-hud-gold" fill="none" stroke="currentColor">
      {Array.from({ length: 7 }, (_, i) => {
        const y = 140 + i * 55;
        const amp = 40 + i * 6;
        return (
          <path
            key={i}
            d={`M0 ${y} C 200 ${y - amp}, 400 ${y + amp}, 600 ${y} S 1000 ${y - amp}, 1200 ${y}`}
            strokeOpacity={0.25 + (i % 3) * 0.2}
          />
        );
      })}
      <text x="24" y="40" className="font-mono" fontSize="14" letterSpacing="5" fill="currentColor" stroke="none">MISSION MAP · SECTOR 05</text>
    </svg>
  );
}

// Contact — outgoing signal arcs from the bottom
function Signal() {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-full text-hud-cyan" fill="none" stroke="currentColor">
      {[80, 170, 260, 350, 440].map((r, i) => (
        <path key={r} d={`M${500 - r} 500 A ${r} ${r} 0 0 1 ${500 + r} 500`} strokeOpacity={0.9 - i * 0.15} strokeDasharray={i % 2 ? "4 10" : undefined} />
      ))}
      <line x1="500" y1="500" x2="780" y2="220" strokeOpacity="0.6" />
      <text x="500" y="40" textAnchor="middle" className="font-mono" fontSize="14" letterSpacing="6" fill="currentColor" stroke="none">COMMS CHANNEL OPEN</text>
    </svg>
  );
}

const MOTIFS: Record<string, { el: React.ReactNode; className: string; spin?: number; overlay?: React.ReactNode }> = {
  projects:   { el: <Rings />,    overlay: <RingsLabel />,    className: "w-[95vmin] h-[95vmin] -right-[25vmin] top-1/2 -translate-y-1/2", spin: 240 },
  initiative: { el: null,         className: "w-[85vw] h-[40vh] left-[7.5vw] top-[30%]" },
  skills:     { el: <DotField />, className: "w-[90vw] h-[90vh] left-[5vw] top-[5vh]" },
  about:      { el: <Hexes />,    className: "w-[85vmin] h-[85vmin] -right-[15vmin] top-[10%]" },
  "side-missions": { el: <Contours />, className: "w-full h-[60vh] left-0 bottom-0" },
  contact:    { el: <Signal />,   className: "w-[110vmin] h-[55vmin] left-1/2 -translate-x-1/2 bottom-0" },
};

export function HudBackground() {
  const [active, setActive] = useState("hero");
  const reduce = useReducedMotionPref();
  const { scrollY } = useScroll();
  // Grid drifts slower than the page (parallax); wraps every grid cell so it never runs out
  const gridY = useTransform(scrollY, (v) => (reduce ? 0 : -((v * 0.15) % GRID)));

  useEffect(() => {
    const getActive = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closest = SECTIONS[0];
      let closestDist = Infinity;
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(center - (el.offsetTop + el.offsetHeight / 2));
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      });
      setActive(closest);
    };
    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  const drift = reduce ? { duration: 0 } : { duration: 1.8, ease: [0.4, 0, 0.2, 1] as const };
  const fade = reduce ? { duration: 0 } : { duration: 1.2, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-hud-dark">
      {/* Ambient glows */}
      {MOODS[active].map((glow, i) => (
        <motion.div
          key={i}
          className="absolute w-[70vmax] h-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          initial={false}
          animate={{ backgroundColor: glow.color, left: glow.left, top: glow.top }}
          transition={drift}
        />
      ))}

      {/* Hero grid — the signature look, only on the hero */}
      <motion.div
        className="absolute inset-x-0 hud-grid-bg"
        style={{ top: -GRID, bottom: -GRID, y: gridY }}
        initial={false}
        animate={{ opacity: active === "hero" ? 1 : 0 }}
        transition={fade}
      />

      {/* Per-section motifs — cross-fade as sections change */}
      {Object.entries(MOTIFS).map(([id, m]) => (
        <motion.div
          key={id}
          className={`absolute ${m.className}`}
          initial={false}
          animate={{ opacity: active === id ? 0.14 : 0, scale: active === id ? 1 : 0.94 }}
          transition={fade}
        >
          {id === "initiative" ? (
            <Waveform still={!!reduce || active !== "initiative"} />
          ) : m.spin && !reduce ? (
            <motion.div
              className="w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: m.spin, repeat: Infinity, ease: "linear" }}
            >
              {m.el}
            </motion.div>
          ) : (
            m.el
          )}
          {m.overlay}
        </motion.div>
      ))}
    </div>
  );
}
