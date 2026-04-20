import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <BentoGrid />
      <Contact />
    </>
  );
}
