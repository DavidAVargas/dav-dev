import { HudFrame } from "@/components/ui/HudFrame";
import { cn } from "@/lib/utils";

const SYSTEMS = [
  {
    id: "SYS-01",
    name: "Tax Services",
    status: "INITIALIZING",
    description: "Professional tax preparation for individuals and small businesses. Details coming soon.",
    icon: "◈",
    online: false,
  },
  {
    id: "SYS-02",
    name: "Consulting",
    status: "INITIALIZING",
    description: "Tech consulting, web builds, and digital strategy for small businesses. Details coming soon.",
    icon: "◇",
    online: false,
  },
  {
    id: "SYS-03",
    name: "More TBD",
    status: "STANDBY",
    description: "Always building something new. Check back soon.",
    icon: "◉",
    online: false,
  },
];

export function Services() {
  return (
    <section id="services" className="min-h-screen py-24 px-6 hud-grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
            MODULE 04
          </p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
            <span className="text-hud-cyan text-glow-cyan">/</span> SERVICES
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-cyan to-transparent" />
          <p className="mt-4 text-hud-muted text-sm max-w-lg">
            Beyond the day job. These systems are coming online soon.
          </p>
        </div>

        {/* Systems grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEMS.map((sys) => (
            <HudFrame
              key={sys.id}
              className="bg-hud-surface border border-hud-border p-6 flex flex-col gap-4"
            >
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-hud-muted tracking-[0.2em]">
                  {sys.id}
                </span>
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.1em] flex items-center gap-1.5",
                    sys.online ? "text-hud-cyan" : "text-hud-gold"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block w-1.5 h-1.5 rounded-full",
                      sys.online
                        ? "bg-hud-cyan animate-glow-cyan"
                        : "bg-hud-gold opacity-60"
                    )}
                  />
                  {sys.status}
                </span>
              </div>

              {/* Icon + name */}
              <div>
                <span className="text-3xl text-hud-gold">{sys.icon}</span>
                <h3 className="font-mono font-bold text-lg text-hud-text mt-2 tracking-wide">
                  {sys.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-hud-muted leading-relaxed flex-1">
                {sys.description}
              </p>

              {/* Bottom divider */}
              <div className="pt-4 border-t border-hud-border">
                <span className="font-mono text-[10px] tracking-[0.2em] text-hud-muted">
                  ETA: SOON™
                </span>
              </div>
            </HudFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
