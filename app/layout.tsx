import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import { SideNav } from "@/components/layout/SideNav";
import { HudReadout } from "@/components/ui/HudReadout";
import { BootSequence } from "@/components/ui/BootSequence";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { SystemClock } from "@/components/ui/SystemClock";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "David A. Vargas — Software Engineer",
  description:
    "Software engineer, builder, marathon runner. Based in the US. Open to full-time roles.",
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
        <CursorTrail />
        <SystemClock />
        <HudReadout />
        <SideNav />
        <main>{children}</main>
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
