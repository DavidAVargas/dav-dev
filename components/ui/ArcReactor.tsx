import { cn } from "@/lib/utils";

const RINGS = [
  { inset: 0,   duration: 18, reverse: false, opacity: 0.6 },
  { inset: 30,  duration: 12, reverse: true,  opacity: 0.5 },
  { inset: 60,  duration: 22, reverse: false, opacity: 0.4 },
  { inset: 90,  duration: 9,  reverse: true,  opacity: 0.7 },
  { inset: 120, duration: 30, reverse: false, opacity: 0.3 },
];

export function ArcReactor({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        className
      )}
    >
      <div className="relative w-[280px] h-[280px] sm:w-[520px] sm:h-[520px]" style={{ opacity: 0.08 }}>
        {RINGS.map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-hud-cyan"
            style={{
              inset: ring.inset,
              opacity: ring.opacity,
              animation: `${ring.reverse ? "arc-spin-reverse" : "arc-spin"} ${ring.duration}s linear infinite`,
            }}
          >
            {/* tick marks on each ring */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-hud-cyan"
            />
          </div>
        ))}

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-hud-cyan blur-sm opacity-80" />
          <div className="absolute w-2 h-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
