"use client";

import { useEffect, useState } from "react";

const COORDS = "40.7128° N  74.0060° W";

export function SystemClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
      setDate(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).toUpperCase()
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block fixed top-6 right-16 z-40 pointer-events-none select-none text-right">
      <p className="font-mono text-sm text-hud-cyan tracking-widest">
        {time}
      </p>
      <p className="font-mono text-[10px] text-hud-muted/70 tracking-[0.15em] mt-0.5">
        {date}
      </p>
      <p className="font-mono text-[9px] text-hud-muted/40 tracking-[0.1em] mt-0.5">
        {COORDS}
      </p>
    </div>
  );
}
