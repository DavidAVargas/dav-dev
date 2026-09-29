import type { Metadata, Viewport } from "next";
import { inter } from "@/utils/fonts";
import { SideNav } from "@/components/layout/SideNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { HudReadout } from "@/components/ui/HudReadout";
import { BootSequence } from "@/components/ui/BootSequence";
import { HudBackground } from "@/components/ui/HudBackground";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { SystemClock } from "@/components/ui/SystemClock";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "David A Vargas — Software Engineer",
  description:
    "Software engineer, builder, marathon runner. Based in the US. Open to full-time roles.",
  openGraph: {
    title: "David A Vargas — Software Engineer",
    description:
      "Software engineer, builder, marathon runner. Based in the US. Open to full-time roles.",
    url: "https://davidavargas.com",
    siteName: "David A Vargas",
    images: [
      {
        url: "/headshot.jpg",
        width: 1200,
        height: 630,
        alt: "David A Vargas — Software Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "David A Vargas — Software Engineer",
    description:
      "Software engineer, builder, marathon runner. Based in the US. Open to full-time roles.",
    images: ["/headshot.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[10000] bg-hud-dark border border-hud-cyan text-hud-cyan font-mono text-xs tracking-[0.2em] px-4 py-2"
        >
          SKIP TO CONTENT
        </a>
        <BootSequence />
        <HudBackground />
        <ScrollProgress />
        <CursorTrail />
        <header>
          <SystemClock />
          <HudReadout />
          <SideNav />
          <MobileNav />
        </header>
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
