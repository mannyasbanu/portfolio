"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#F9F8F4]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8">About</h2>
          <div className="space-y-6 text-[#2C2C2C]/80 leading-relaxed">
            <p>
              I'm a computer science student who's naturally drawn to problem solving. I like working through challenges where there isn't an obvious answer, whether that's algorithmic problems, competitive style puzzles, or figuring out the best strategy in high pressure situations. That mindset is what pulled me into tech in the first place.
            </p>
            <p>
              I spend a lot of time thinking about data structures, algorithms, and performance, especially in C++. I enjoy going deeper than just making something work, understanding trade offs, optimising solutions, and building things that are clean and hold up over time. I've also developed an interest in data science, particularly when it comes to analysing real world problems and extracting meaningful patterns.
            </p>
            <p>
              Outside of that, I like staying active, travelling, and doing things that challenge me mentally or physically. I spend a lot of time cooking and eating, and at home I've got chickens and dogs, so life's a mix of problem solving, good food, and a bit of chaos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
