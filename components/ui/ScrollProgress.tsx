"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (scrolled / total) * 100 : 0;
      if (barRef.current) barRef.current.style.height = `${progress}%`;
      if (tipRef.current) tipRef.current.style.top = `${progress}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed left-0 top-0 w-px h-full z-50 pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-hud-cyan/10" />
      {/* Fill */}
      <div
        ref={barRef}
        className="absolute top-0 left-0 w-full bg-hud-cyan"
        style={{
          height: "0%",
          boxShadow: "0 0 6px rgba(0,212,255,0.8), 0 0 12px rgba(0,212,255,0.4)",
        }}
      />
      {/* Glowing tip */}
      <div
        ref={tipRef}
        className="absolute left-0 w-2.5 h-2.5 rounded-full bg-hud-cyan -translate-x-[5px] -translate-y-1/2"
        style={{
          top: "0%",
          boxShadow: "0 0 8px rgba(0,212,255,1), 0 0 16px rgba(0,212,255,0.6)",
        }}
      />
    </div>
  );
}
