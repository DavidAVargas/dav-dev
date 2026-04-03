import type { Metadata, Viewport } from "next";
import { inter } from "@/utils/fonts";
import { SideNav } from "@/components/layout/SideNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { HudReadout } from "@/components/ui/HudReadout";
import { BootSequence } from "@/components/ui/BootSequence";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { SystemClock } from "@/components/ui/SystemClock";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "David A Vargas — Software Engineer",
  description:
    "Software engineer, builder, marathon runner. Based in the US. Open to full-time roles.",
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
      <body className={inter.variable}>
        <BootSequence />
        <ScrollProgress />
        <CursorTrail />
        <SystemClock />
        <HudReadout />
        <SideNav />
        <MobileNav />
        <main>{children}</main>
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
