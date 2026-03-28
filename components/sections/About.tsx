"use client";

import { useEffect, useRef, useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { HexPhoto } from "@/components/ui/HexPhoto";

const STATS = [
  { label: "YEARS IN HEALTHCARE", value: 5,    suffix: "+",  display: "5+"    },
  { label: "BOOTCAMP GRAD",        value: 2024, suffix: "",   display: "2024"  },
  { label: "MARATHONS RUN",        value: 1,    suffix: "+",  display: "1+"    },
  { label: "PROJECTS BUILT",       value: 10,   suffix: "+",  display: "10+"   },
];

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const start = performance.now();

    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [started, value]);

  return (
    <HudFrame className="p-5 border border-hud-border bg-hud-dark text-center" ref={ref as React.Ref<HTMLDivElement>}>
      <p className="font-mono font-bold text-2xl text-hud-cyan text-glow-cyan">
        {count}{suffix}
      </p>
      <p className="font-mono text-[10px] tracking-[0.15em] text-hud-muted mt-1">
        {label}
      </p>
    </HudFrame>
  );
}

export function About() {
  return (
    <section id="about" className="min-h-screen py-24 px-6 bg-hud-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
            MODULE 04
          </p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
            <span className="text-hud-gold text-glow-gold">/</span> ABOUT
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-gold to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Story */}
          <div className="flex flex-col gap-8">
            {/* Tony Stark moment */}
            <HudFrame cornerColor="gold" className="p-6 border border-hud-gold/20">
              <p className="font-mono text-xs tracking-[0.2em] text-hud-gold mb-4">
                // ORIGIN STORY
              </p>
              <blockquote className="text-hud-text text-lg leading-relaxed italic">
                &ldquo;Tony Stark had errors too. He just kept building.&rdquo;
              </blockquote>
            </HudFrame>

            <p className="text-hud-muted leading-relaxed">
              When I was deep in my bootcamp, staring at broken code at 2am, I almost convinced
              myself I wasn&apos;t cut out for this. Then I started watching Iron Man. Tony Stark
              didn&apos;t build a perfect suit on the first try — he built Mark I in a cave, with
              scraps, and kept iterating. That shifted everything for me.{" "}
              <span className="text-hud-text">
                Errors aren&apos;t failure. They&apos;re just the next thing to fix.
              </span>
            </p>

            <p className="text-hud-muted leading-relaxed">
              Before software engineering, I worked in healthcare — a world where communication,
              care, and attention to detail matter at a level most fields never demand. I bring that
              same standard to code.
            </p>

            {/* The creator mindset */}
            <HudFrame className="p-5 border border-hud-cyan/20">
              <p className="font-mono text-xs tracking-[0.2em] text-hud-cyan mb-3">
                // MINDSET.LOG
              </p>
              <p className="text-hud-muted leading-relaxed">
                Some people watch TV. Some play video games. Nothing wrong with that.{" "}
                <span className="text-hud-text">
                  Me? I create things and work on becoming the best version of myself.
                </span>{" "}
                That&apos;s just what&apos;s fun for me — building, learning, running, growing.
              </p>
            </HudFrame>
          </div>

          {/* Stats + Timeline */}
          <div className="flex flex-col gap-8">
            {/* Hex photo */}
            <div className="flex justify-center mb-4">
              <HexPhoto />
            </div>

          {/* Stats grid — count-up on scroll */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <CountUpStat
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                />
              ))}
            </div>

            {/* Journey timeline */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs tracking-[0.2em] text-hud-muted">
                // CAREER TIMELINE
              </p>
              {[
                {
                  date: "PRESENT",
                  role: "Software Engineer",
                  note: "Building, growing, shipping.",
                  color: "cyan",
                },
                {
                  date: "2024",
                  role: "Bootcamp Graduate",
                  note: "Full-stack development, the Tony Stark way.",
                  color: "gold",
                },
                {
                  date: "BEFORE",
                  role: "Healthcare Professional",
                  note: "Communication, care, and precision under pressure.",
                  color: "muted",
                },
              ].map((item) => (
                <div key={item.date} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className={
                        item.color === "cyan"
                          ? "w-2 h-2 rounded-full bg-hud-cyan mt-1.5"
                          : item.color === "gold"
                            ? "w-2 h-2 rounded-full bg-hud-gold mt-1.5"
                            : "w-2 h-2 rounded-full bg-hud-muted mt-1.5"
                      }
                    />
                    <div className="w-px flex-1 bg-hud-border mt-1" />
                  </div>
                  <div className="pb-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-hud-muted">
                      {item.date}
                    </span>
                    <p className="font-mono text-sm text-hud-text mt-0.5">{item.role}</p>
                    <p className="text-xs text-hud-muted mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
