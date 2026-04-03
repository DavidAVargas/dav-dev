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
    // Only show once per session
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDone(true);
      return;
    }

    let lineIdx = 0;

    const addLine = () => {
      if (lineIdx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[lineIdx]]);
        lineIdx++;
        setTimeout(addLine, LINE_DELAY);
      } else {
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setDone(true);
            sessionStorage.setItem(SESSION_KEY, "1");
          }, 600);
        }, HOLD_DURATION);
      }
    };

    const start = setTimeout(addLine, 200);
    return () => clearTimeout(start);
  }, []);

  if (done) return null;

  return (
    <div
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
