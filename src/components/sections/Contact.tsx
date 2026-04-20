"use client";

import { motion } from "framer-motion";
import {
  Mail,
  ExternalLink,
  Code2,
  Music,
  User,
} from "lucide-react";

const links = [
  {
    label: "Email",
    href: "mailto:asbanu.manny@gmail.com",
    icon: Mail,
    stamp: "circle",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mannyasbanu/",
    icon: ExternalLink,
    stamp: "square",
  },
  {
    label: "GitHub",
    href: "https://github.com/mannyasbanu/",
    icon: Code2,
    stamp: "square",
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/289648004510777344",
    icon: User,
    stamp: "circle",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/fru1c6zhp9ao0yorce53citmv?si=0ab8ac1eda894cde",
    icon: Music,
    stamp: "circle",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stampVariants = {
  initial: { scale: 0.8, opacity: 0 },
  hover: { scale: 1, opacity: 1, transition: { duration: 0.15 } },
};

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#F9F8F4]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2C2C2C]">Contact</h2>
        </motion.div>

        <div className="border-t border-[#E2E2E2] pt-8">
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-1"
          >
            {links.map((link) => (
              <motion.li key={link.label} variants={itemVariants}>
                <a
                  href={link.href}
                  className="group flex items-center gap-4 py-4 text-[#2C2C2C] hover:bg-[#F2F2F2] -mx-4 px-4 rounded transition-colors relative"
                >
                  {/* Hanko Stamp */}
                  <motion.div
                    variants={stampVariants}
                    initial="initial"
                    whileHover="hover"
                    className={`absolute left-4 w-3 h-3 bg-[#B22222] ${
                      link.stamp === "circle" ? "rounded-full" : "rounded-sm"
                    }`}
                    style={{ opacity: 0, pointerEvents: "none" }}
                  />

                  {/* Icon */}
                  <link.icon className="w-4 h-4 text-[#2C2C2C]/60 group-hover:text-[#2C2C2C] transition-colors" />

                  {/* Label */}
                  <span className="text-sm font-mono tracking-wide text-[#2C2C2C]/80 group-hover:text-[#2C2C2C] transition-colors">
                    {link.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
