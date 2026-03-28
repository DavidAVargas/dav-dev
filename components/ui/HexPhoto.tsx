import { cn } from "@/lib/utils";

interface HexPhotoProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function HexPhoto({ src, alt = "David A. Vargas", className }: HexPhotoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer rotating ring */}
      <div
        className="absolute w-[280px] h-[280px] rounded-full border border-hud-cyan/30"
        style={{ animation: "arc-spin 20s linear infinite" }}
      >
        {/* Ring tick marks */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <span
            key={deg}
            className="absolute w-1.5 h-1.5 rounded-full bg-hud-cyan/60"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateX(138px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Middle ring — reverse */}
      <div
        className="absolute w-[248px] h-[248px] rounded-full border border-hud-gold/20"
        style={{ animation: "arc-spin-reverse 14s linear infinite" }}
      />

      {/* Hex clip container */}
      <div
        className="relative w-[200px] h-[220px] overflow-hidden"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder when no photo yet */
          <div className="w-full h-full bg-hud-surface flex flex-col items-center justify-center gap-2 border border-hud-cyan/20">
            <span className="font-mono text-4xl text-hud-cyan/30">DAV</span>
            <span className="font-mono text-[9px] text-hud-muted/50 tracking-[0.2em]">PHOTO PENDING</span>
          </div>
        )}

        {/* Scan overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.015) 3px, rgba(0,212,255,0.015) 4px)",
          }}
        />
      </div>

      {/* Status labels — desktop only */}
      <div className="hidden md:flex absolute -right-4 top-8 flex-col gap-2 translate-x-full">
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-hud-cyan/40" />
          <span className="font-mono text-[9px] text-hud-cyan/60 tracking-[0.15em] whitespace-nowrap">
            STATUS: ONLINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-hud-gold/40" />
          <span className="font-mono text-[9px] text-hud-gold/60 tracking-[0.15em] whitespace-nowrap">
            CLEARANCE: ENGINEER
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-hud-muted/30" />
          <span className="font-mono text-[9px] text-hud-muted/50 tracking-[0.15em] whitespace-nowrap">
            ID: DAV-001
          </span>
        </div>
      </div>
    </div>
  );
}
