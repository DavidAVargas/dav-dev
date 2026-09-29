export function Footer() {
  return (
    <footer className="px-6 pb-24">
      <div className="max-w-4xl mx-auto pt-8 border-t border-hud-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-hud-muted tracking-[0.2em]">
          DAVID A VARGAS · MARK III · {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs text-hud-muted tracking-[0.15em]">
          BUILT WITH NEXT.JS · TAILWIND · VERCEL
        </p>
      </div>
    </footer>
  );
}
