import { HudFrame } from "@/components/ui/HudFrame";

const SOCIAL_LINKS = [
  { label: "GITHUB", handle: "@davidavargas", href: "#" },
  { label: "LINKEDIN", handle: "David A. Vargas", href: "#" },
];

export function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 px-6 bg-hud-surface flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
            MODULE 06
          </p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
            <span className="text-hud-gold text-glow-gold">/</span> CONTACT
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-gold to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — message */}
          <div className="flex flex-col gap-6">
            <p className="text-hud-text text-lg leading-relaxed">
              Whether you&apos;re a recruiter, a collaborator, or just curious — the comms are open.
            </p>
            <p className="text-hud-muted leading-relaxed">
              I&apos;m currently open to full-time software engineering roles and interesting
              side projects. Let&apos;s build something.
            </p>

            {/* Terminal-style email */}
            <HudFrame className="p-5 border border-hud-cyan/20">
              <p className="font-mono text-xs text-hud-muted mb-2 tracking-[0.2em]">
                // DIRECT CHANNEL
              </p>
              <a
                href="mailto:your.email@example.com"
                className="font-mono text-hud-cyan text-glow-cyan hover:opacity-80 transition-opacity text-sm tracking-wide"
              >
                your.email@example.com
              </a>
              <p className="font-mono text-[10px] text-hud-muted mt-2 tracking-[0.1em]">
                — update this with your real email
              </p>
            </HudFrame>
          </div>

          {/* Right — social links */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs tracking-[0.2em] text-hud-muted mb-2">
              // SOCIAL CHANNELS
            </p>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center justify-between border border-hud-border p-4 hover:border-hud-cyan/40 hover:glow-cyan transition-all duration-300"
              >
                <div>
                  <p className="font-mono text-xs text-hud-muted tracking-[0.2em]">
                    {link.label}
                  </p>
                  <p className="font-mono text-sm text-hud-text group-hover:text-hud-cyan transition-colors mt-0.5">
                    {link.handle}
                  </p>
                </div>
                <span className="text-hud-muted group-hover:text-hud-cyan transition-colors font-mono text-xs">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-24 pt-8 border-t border-hud-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-hud-muted tracking-[0.2em]">
            DAVID A. VARGAS ·  MARK I ·  {new Date().getFullYear()}
          </p>
          <p className="font-mono text-xs text-hud-muted tracking-[0.15em]">
            BUILT WITH NEXT.JS ·  DEPLOYED ON VERCEL
          </p>
        </div>
      </div>
    </section>
  );
}
