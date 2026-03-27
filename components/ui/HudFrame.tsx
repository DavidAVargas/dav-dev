"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface HudFrameProps {
  children: React.ReactNode;
  className?: string;
  cornerColor?: "cyan" | "gold";
  animate?: boolean;
}

export const HudFrame = forwardRef<HTMLDivElement, HudFrameProps>(function HudFrame({
  children,
  className,
  cornerColor = "cyan",
  animate = false,
}, ref) {
  const cornerClass =
    cornerColor === "gold"
      ? "border-hud-gold"
      : "border-hud-cyan";

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        animate && "animate-glow-cyan",
        className
      )}
    >
      {/* Top-left */}
      <span
        className={cn(
          "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 pointer-events-none z-10",
          cornerClass
        )}
      />
      {/* Top-right */}
      <span
        className={cn(
          "absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 pointer-events-none z-10",
          cornerClass
        )}
      />
      {/* Bottom-left */}
      <span
        className={cn(
          "absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 pointer-events-none z-10",
          cornerClass
        )}
      />
      {/* Bottom-right */}
      <span
        className={cn(
          "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 pointer-events-none z-10",
          cornerClass
        )}
      />
      {children}
    </div>
  );
});

