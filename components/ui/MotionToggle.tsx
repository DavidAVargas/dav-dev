"use client";

import { cn } from "@/lib/utils";
import { useMotionToggle } from "@/lib/motion-pref";

/** Pauses all animation site-wide (WCAG 2.2.2). Remembered across visits. */
export function MotionToggle({ className }: { className?: string }) {
  const { off, toggle } = useMotionToggle();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!off}
      onClick={toggle}
      className={cn(
        "font-mono text-[10px] tracking-[0.15em] border transition-colors duration-200 px-3 py-1 flex items-center gap-1.5 whitespace-nowrap",
        off
          ? "text-hud-muted border-hud-border hover:text-hud-cyan hover:border-hud-cyan/60"
          : "text-hud-cyan border-hud-cyan/40 hover:border-hud-cyan hover:bg-hud-cyan/10",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("inline-block w-1.5 h-1.5 rounded-full", off ? "bg-hud-muted" : "bg-hud-cyan")}
      />
      <span>
        MOTION<span aria-hidden="true">: {off ? "OFF" : "ON"}</span>
      </span>
    </button>
  );
}
