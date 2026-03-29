"use client";

import { useState, useEffect, useRef } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { ArcReactor } from "@/components/ui/ArcReactor";
import { cn } from "@/lib/utils";

const PHRASES = [
  "Software Engineer.",
  "Builder.",
  "Marathon Runner.",
  "Always Creating.",
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const current = phrases[phraseIdx];

    const tick = () => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
          timeoutRef.current = setTimeout(tick, 80);
        } else {
          timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
          timeoutRef.current = setTimeout(tick, 40);
        } else {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % phrases.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 100);
    return () => clearTimeout(timeoutRef.current);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

function useGlitchText(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const glitch = () => {
    let iterations = 0;
    clearInterval(frameRef.current);
    frameRef.current = setInterval(() => {
      setDisplay(
        original
          .split("")
          .map((char, i) => {
            if (char === " " || char === ".") return char;
            if (iterations > i * 0.6) return original[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
      iterations += 0.8;
      if (iterations > original.length) {
        clearInterval(frameRef.current);
        setDisplay(original);
      }
    }, 35);
  };

  return { display, glitch };
}

export function Hero() {
  const typed = useTypewriter(PHRASES);
  const [scanned, setScanned] = useState(false);
  const { display: nameDisplay, glitch } = useGlitchText("DAVID A. VARGAS");

  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hud-grid-bg"
    >
      {/* Scan line — one-time sweep on load */}
      {!scanned && (
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-hud-cyan to-transparent pointer-events-none z-20"
          style={{ animation: "scan-sweep 1.6s ease-in forwards" }}
        />
      )}

      {/* Arc reactor background */}
      <ArcReactor />

      {/* Radial glow center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-hud-cyan/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8">

        {/* HUD status line */}
        <p className="font-mono text-xs tracking-[0.3em] text-hud-muted animate-fade-up [animation-delay:0.1s] opacity-0">
          SYSTEM ONLINE ·  MARK I ·  LOADING PROFILE
        </p>

        {/* Name */}
        <HudFrame cornerColor="gold" className="px-8 py-4 cursor-none">
          <h1
            className={cn(
              "font-mono font-bold tracking-[0.15em] text-hud-gold text-glow-gold animate-flicker",
              "text-4xl sm:text-6xl lg:text-7xl select-none"
            )}
            onMouseEnter={glitch}
          >
            {nameDisplay}
          </h1>
        </HudFrame>

        {/* Drive quote */}
        <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-hud-muted/70 italic animate-fade-up [animation-delay:0.3s] opacity-0 max-w-lg text-center">
          &ldquo;Inspired and driven by the fear of unfulfilled potential.&rdquo;
        </p>

        {/* Typing tagline */}
        <div className="h-8 flex items-center gap-0.5 animate-fade-up [animation-delay:0.4s] opacity-0">
          <span className="font-mono text-lg sm:text-xl text-hud-cyan text-glow-cyan">
            {typed}
          </span>
          <span
            className="inline-block w-0.5 h-5 bg-hud-cyan"
            style={{ animation: "cursor-blink 1s step-end infinite" }}
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-fade-up [animation-delay:0.7s] opacity-0">
          <a
            href="#projects"
            className={cn(
              "font-mono text-sm tracking-[0.15em] px-8 py-3",
              "border border-hud-cyan text-hud-cyan",
              "transition-all duration-300",
              "hover:bg-hud-cyan hover:text-hud-dark hover:glow-cyan"
            )}
          >
            VIEW PROJECTS
          </a>
          <a
            href="#about"
            className={cn(
              "font-mono text-sm tracking-[0.15em] px-8 py-3",
              "border border-hud-gold text-hud-gold",
              "transition-all duration-300",
              "hover:bg-hud-gold hover:text-hud-dark hover:glow-gold"
            )}
          >
            ABOUT ME
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-8 flex flex-col items-center gap-2 animate-fade-up [animation-delay:1s] opacity-0">
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud-muted">SCROLL TO EXPLORE</span>
          <div className="w-px h-8 bg-gradient-to-b from-hud-cyan to-transparent" />
        </div>
      </div>
    </section>
  );
}
