"use client";

import { useState, useEffect } from "react";

const BOOT_LINES = [
  "INITIALIZING MARK III PROTOCOLS...",
  "SCANNING ENVIRONMENT...",
  "CALIBRATING HUD INTERFACE...",
  "LOADING PROFILE: DAVID A VARGAS",
  "ALL SYSTEMS NOMINAL.",
  "WELCOME.",
];

const LINE_DELAY = 320; // ms between lines
const HOLD_DURATION = 500; // ms after last line before fade
const SESSION_KEY = "dav_booted";

export function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show once per session, and never when the user asked for less motion
    const reduced =
      document.documentElement.dataset.motion === "off" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem(SESSION_KEY) || reduced) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setDone(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    // Any key, click, or tap skips straight to the site
    const skip = () => {
      timers.forEach(clearTimeout);
      sessionStorage.setItem(SESSION_KEY, "1");
      setDone(true);
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    let lineIdx = 0;

    const addLine = () => {
      if (lineIdx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[lineIdx]]);
        lineIdx++;
        later(addLine, LINE_DELAY);
      } else {
        later(() => {
          setFading(true);
          later(() => {
            setDone(true);
            sessionStorage.setItem(SESSION_KEY, "1");
          }, 600);
        }, HOLD_DURATION);
      }
    };

    later(addLine, 200);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-hud-dark flex items-center justify-center"
      style={{
        transition: "opacity 0.6s ease-out",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 hud-grid-bg opacity-30" />

      <div className="relative flex flex-col gap-3 px-8 max-w-lg w-full">
        {/* Top label */}
        <p className="font-mono text-[10px] text-hud-muted tracking-[0.3em] mb-4">
          JARVIS · MARK III · BOOT SEQUENCE
        </p>

        {lines.map((line, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-hud-gold font-mono text-xs">{">"}</span>
            <span
              className="font-mono text-sm text-hud-text tracking-wide"
              style={{
                animation: "fade-up 0.3s ease-out both",
              }}
            >
              {line}
            </span>
            {/* Blinking cursor on the last line */}
            {i === lines.length - 1 && lines.length < BOOT_LINES.length && (
              <span
                className="inline-block w-2 h-4 bg-hud-cyan"
                style={{ animation: "cursor-blink 0.8s step-end infinite" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
