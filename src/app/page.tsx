import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import BeyondCode from "@/components/BeyondCode";
import OpenSource from "@/components/OpenSource";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Projects />
      <BeyondCode />
      <OpenSource />
      <Skills />
      <Contact />
    </div>
  );
}