import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Initiative } from "@/components/sections/Initiative";
import { About } from "@/components/sections/About";
import { SideMissions } from "@/components/sections/SideMissions";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Initiative />
      <Skills />
      <About />
      <SideMissions />
      <Contact />
    </>
  );
}
