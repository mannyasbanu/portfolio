"use client";

import { motion } from "framer-motion";

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F9F8F4]/90 backdrop-blur-md border-b border-[#E2E2E2]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-bold text-[#2C2C2C]">
          Manny Asbanu<span className="text-[#B22222]">.</span>
        </a>
        <ul className="flex items-center gap-6">
          <li>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "#about")}
              className="text-sm text-[#2C2C2C]/80 relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#E8D3D1] after:transition-all hover:after:w-full"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "#projects")}
              className="text-sm text-[#2C2C2C]/80 relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#E8D3D1] after:transition-all hover:after:w-full"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="text-sm text-[#2C2C2C]/80 relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#E8D3D1] after:transition-all hover:after:w-full"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
