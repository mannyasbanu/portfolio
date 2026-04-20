"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High damping springs for slow, fluid movement
  const springConfig = { damping: 100, stiffness: 50, mass: 2 };

  // Parallax transforms with different depths for each shape
  const circleX = useTransform(mouseX, [0, window.innerWidth], [0, 80], { clamp: false });
  const circleY = useTransform(mouseY, [0, window.innerHeight], [0, 60], { clamp: false });
  const squareX = useTransform(mouseX, [0, window.innerWidth], [0, -60], { clamp: false });
  const squareY = useTransform(mouseY, [0, window.innerHeight], [0, -50], { clamp: false });
  const triangleX = useTransform(mouseX, [0, window.innerWidth], [0, 40], { clamp: false });
  const triangleY = useTransform(mouseY, [0, window.innerHeight], [0, -40], { clamp: false });

  // Apply spring physics for damping
  const circleSpringX = useSpring(circleX, springConfig);
  const circleSpringY = useSpring(circleY, springConfig);
  const squareSpringX = useSpring(squareX, springConfig);
  const squareSpringY = useSpring(squareY, springConfig);
  const triangleSpringX = useSpring(triangleX, springConfig);
  const triangleSpringY = useSpring(triangleY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#F9F8F4]">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] font-sans mb-4">
            Manny Asbanu
          </h1>
          <p className="text-lg md:text-xl text-[#2C2C2C]/70 leading-relaxed">
            Computer scientist who enjoys solving hard problems, writing efficient code, and constantly pushing my limits.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#F9F8F4]">
      {/* Background Shapes with Parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circle - Sakura */}
        <motion.div
          style={{ x: circleSpringX, y: circleSpringY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#E8D3D1]"
        />

        {/* Square - Light Grey */}
        <motion.div
          style={{ x: squareSpringX, y: squareSpringY }}
          initial={{ opacity: 0, rotate: -15 }}
          animate={{ opacity: 0.2, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-[#D3D3D3]"
        />

        {/* Triangle - Sakura */}
        <motion.div
          style={{ x: triangleSpringX, y: triangleSpringY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-1/2 right-1/4 w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[140px] border-b-[#E8D3D1]"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] font-sans mb-4">
          Manny Asbanu
        </h1>
        <p className="text-lg md:text-xl text-[#2C2C2C]/70 leading-relaxed">
          Computer scientist who enjoys solving hard problems, writing efficient code, and constantly pushing my limits.
        </p>
      </motion.div>
    </section>
  );
}
