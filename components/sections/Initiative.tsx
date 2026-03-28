import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";

type InitiativeCard = {
  id: string;
  industry: string;
  tags: string[];
  problem: string;
  built: string;
  outcome: string;
  status: string;
  statusColor: "gold" | "cyan" | "muted";
};

const INITIATIVES: InitiativeCard[] = [
  {
    id: "INI-001",
    industry: "HEALTHCARE",
    tags: ["PROTOTYPE BUILT", "PRESENTED TO LEADERSHIP", "PROBLEM IDENTIFIED"],
    problem:
      "Patients arriving at the clinic had to check in first, then answer intake questions, then wait to be seen — a three-step bottleneck that slowed down the entire flow for both staff and patients.",
    built:
      "A digital auto check-in prototype that collected intake responses (simple yes/no questions) before the patient even sat down. By the time they were called, the doctor already had context. Fewer delays. Faster visits.",
    outcome:
      "Presented the prototype to management and senior leadership. They responded positively to the concept. Implementation was paused over patient data privacy concerns — a valid call, and one that taught me how to think about security and compliance from the start.",
    status: "PROTOTYPE — PRESENTED TO LEADERSHIP",
    statusColor: "gold",
  },
  {
    id: "INI-002",
    industry: "TBD",
    tags: ["COMING SOON"],
    problem: "Placeholder — add your next real-world initiative here.",
    built: "What did you build or propose? Describe it simply and clearly.",
    outcome: "What happened as a result? Even partial outcomes count.",
    status: "IN PROGRESS",
    statusColor: "muted",
  },
];

function InitiativeItem({ card }: { card: InitiativeCard }) {
  const isPlaceholder = card.statusColor === "muted";

  return (
    <div
      className={cn(
        "relative border p-8 flex flex-col gap-6 transition-all duration-300",
        isPlaceholder
          ? "border-hud-border opacity-50"
          : "border-hud-gold/30 hover:border-hud-gold/60 group"
      )}
    >
      {/* Gold corner accents */}
      {!isPlaceholder && (
        <>
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hud-gold" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hud-gold" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hud-gold" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hud-gold" />
        </>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-hud-muted tracking-[0.3em]">
            {card.id} · {card.industry}
          </span>
          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 border",
                  isPlaceholder
                    ? "border-hud-muted/30 text-hud-muted/50"
                    : "border-hud-gold/40 text-hud-gold"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
          className={cn(
            "font-mono text-[9px] tracking-[0.15em] flex items-center gap-1.5",
            card.statusColor === "gold"
              ? "text-hud-gold"
              : card.statusColor === "cyan"
                ? "text-hud-cyan"
                : "text-hud-muted"
          )}
        >
          <span
            className={cn(
              "inline-block w-1.5 h-1.5 rounded-full",
              card.statusColor === "gold"
                ? "bg-hud-gold"
                : card.statusColor === "cyan"
                  ? "bg-hud-cyan"
                  : "bg-hud-muted"
            )}
          />
          {card.status}
        </span>
      </div>

      {/* Problem → Built → Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "THE PROBLEM", body: card.problem, color: "text-hud-gold" },
          { label: "WHAT I BUILT", body: card.built, color: "text-hud-cyan" },
          { label: "THE OUTCOME", body: card.outcome, color: "text-hud-text" },
        ].map(({ label, body, color }) => (
          <div key={label} className="flex flex-col gap-2">
            <p className={cn("font-mono text-[10px] tracking-[0.2em]", color)}>
              // {label}
            </p>
            <div className="h-px w-full bg-hud-border" />
            <p className="text-hud-muted text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Initiative() {
  return (
    <section id="initiative" className="min-h-screen py-24 px-6 bg-hud-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-hud-muted mb-3">
            BEYOND THE JOB DESCRIPTION
          </p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-hud-text tracking-wide">
            <span className="text-hud-gold text-glow-gold">/</span> INITIATIVE
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-hud-gold to-transparent" />

          <div className="mt-8 flex flex-col gap-4 max-w-2xl">
            <div className="border-l-2 border-hud-gold pl-4">
              <p className="font-mono text-xs text-hud-gold tracking-[0.2em] mb-2">
                BUILT WITHOUT BEING ASKED
              </p>
              <p className="text-hud-text text-base leading-relaxed">
                I don&apos;t just code — I identify problems and build solutions for them,
                even when it&apos;s not my job to.
              </p>
            </div>

            <p className="text-hud-muted text-sm leading-relaxed">
              Every place I&apos;ve worked, I&apos;ve spotted inefficiencies slowing down
              the team, the managers, sometimes the whole operation — not just for me,
              but for everyone around me. Instead of just flagging it, I built a working
              solution and proposed a better way.{" "}
              <span className="text-hud-text">
                These aren&apos;t tutorial projects. These are real gaps I saw, real builds
                I shipped, and real results — even when the timing wasn&apos;t right.
              </span>
            </p>

            <p className="text-hud-muted text-sm leading-relaxed">
              These aren&apos;t tutorial projects. These are real problems I saw,
              real solutions I built, and real results — even when the system
              wasn&apos;t ready for them yet.
            </p>
          </div>
        </div>

        {/* Initiative cards */}
        <div className="flex flex-col gap-8">
          {INITIATIVES.map((card, i) => (
            <FadeIn key={card.id} delay={i * 150}>
              <InitiativeItem card={card} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
