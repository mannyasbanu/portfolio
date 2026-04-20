"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, mass: 2, damping: 100 } },
};

const springConfig = { stiffness: 50, damping: 100, mass: 2 };

type ProjectCardProps = {
  category: string;
  title: string;
  subtitle?: string;
  summary: string;
  details: string[];
  techTags: string[];
  imageSrc: string;
  videoSrc?: string;
  imageAlt: string;
  sizes: string;
  className: string;
  mediaLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  surfaceClassName?: string;
};

function ProjectCard({
  category,
  title,
  subtitle,
  summary,
  details,
  techTags,
  imageSrc,
  videoSrc,
  imageAlt,
  sizes,
  className,
  mediaLabel = "Gameplay Demo",
  ctaHref,
  ctaLabel = "View Project",
  surfaceClassName = "bg-[#F9F8F4]",
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [canHoverPreview, setCanHoverPreview] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCanHoverPreview = () => {
      setCanHoverPreview(mediaQuery.matches);
    };

    updateCanHoverPreview();
    mediaQuery.addEventListener("change", updateCanHoverPreview);

    return () => {
      mediaQuery.removeEventListener("change", updateCanHoverPreview);
    };
  }, []);

  const startPreview = async () => {
    if (!videoSrc || !canHoverPreview || !videoRef.current) {
      return;
    }

    setIsPreviewActive(true);

    try {
      await videoRef.current.play();
    } catch {
      setIsPreviewActive(false);
    }
  };

  const stopPreview = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPreviewActive(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={startPreview}
      onHoverEnd={stopPreview}
      className={`${className} ${surfaceClassName} rounded-lg border border-[#E2E2E2] overflow-hidden relative`}
      style={springConfig}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full bg-gradient-to-br from-[#E8D3D1]/20 to-[#D3D3D3]/20" />
      </div>
      <div className="relative z-10 flex h-full flex-col p-6">
        <div
          className="relative mb-6 aspect-[16/9] overflow-hidden rounded-md border border-[#E2E2E2] bg-[#E8E6E1]"
          onFocus={startPreview}
          onBlur={stopPreview}
          tabIndex={0}
          aria-label={`${title} demo preview`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={sizes}
            className={`object-cover transition-opacity duration-300 ease-out ${
              isPreviewActive ? "opacity-0" : "opacity-100"
            }`}
          />
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              loop
              preload="metadata"
              aria-hidden={!isPreviewActive}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
                isPreviewActive ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#2C2C2C]/60 via-[#2C2C2C]/20 to-transparent px-4 py-3">
            <span className="text-xs font-medium tracking-wide text-white/90">
              {mediaLabel}
            </span>
            <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {videoSrc
                ? canHoverPreview
                  ? "Hover to preview"
                  : "Demo available"
                : "Image preview"}
            </span>
          </div>
        </div>
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-[#B22222]">
          {category}
        </span>
        <h3 className="mb-2 text-2xl font-bold text-[#2C2C2C]">{title}</h3>
        {subtitle ? (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#2C2C2C]/50">
            {subtitle}
          </p>
        ) : null}
        <p className="mb-4 text-sm text-[#2C2C2C]/60">{summary}</p>
        <ul className="flex-grow space-y-3">
          {details.map((detail) => (
            <li key={detail} className="flex gap-3 text-sm text-[#2C2C2C]/70">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B22222]/70" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {techTags.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-[#E8D3D1]/30 px-3 py-1 text-xs text-[#2C2C2C]/80"
            >
              {tech}
            </span>
          ))}
        </div>
        {ctaHref ? (
          <div className="mt-4">
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#2C2C2C] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#B22222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2F2F2]"
              aria-label={`${ctaLabel} - opens in a new tab`}
            >
              <span>{ctaLabel}</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function ExpandableResearchCard() {
  const [canHoverExpand, setCanHoverExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCanHoverExpand = () => {
      const matches = mediaQuery.matches;
      setCanHoverExpand(matches);
      setIsExpanded((current) => (matches ? false : current));
    };

    updateCanHoverExpand();
    mediaQuery.addEventListener("change", updateCanHoverExpand);

    return () => {
      mediaQuery.removeEventListener("change", updateCanHoverExpand);
    };
  }, []);

  const expandCard = () => {
    if (canHoverExpand) {
      setIsExpanded(true);
    }
  };

  const collapseCard = () => {
    if (canHoverExpand) {
      setIsExpanded(false);
    }
  };

  const toggleCard = () => {
    if (!canHoverExpand) {
      setIsExpanded((current) => !current);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (canHoverExpand) {
        setIsExpanded(true);
        return;
      }

      toggleCard();
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={expandCard}
      onHoverEnd={collapseCard}
      className="md:col-span-2 lg:col-span-5 bg-[#F9F8F4] rounded-lg border border-[#E2E2E2] p-6 relative overflow-hidden min-h-[540px]"
      style={springConfig}
      onClick={toggleCard}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-controls="np-hard-paper-preview"
    >
      <span className="inline-block text-xs font-semibold text-[#B22222] uppercase tracking-wider mb-3">
        Research
      </span>
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-[#2C2C2C]">NP-Hard Problems</h3>
        <span className="rounded-full border border-[#E2E2E2] bg-[#F2F2F2] px-3 py-1 text-[11px] font-medium text-[#2C2C2C]/65">
          {canHoverExpand ? "Hover to preview" : isExpanded ? "Tap to collapse" : "Tap to expand"}
        </span>
      </div>
      <p className="text-[#2C2C2C]/60 text-sm mb-4">
        Analysis of NP-hard problems and practical approaches to solving them.
      </p>
      <p className="text-[#2C2C2C]/70 text-sm">
        Explored approximation algorithms and heuristics, analysing trade-offs between accuracy and efficiency. Evaluated when exact solutions are unrealistic and how to design practically useful approaches.
      </p>

      <motion.div
        id="np-hard-paper-preview"
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded ? 20 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="rounded-md border border-[#E2E2E2] bg-[#F2F2F2] p-3">
          <div className="relative aspect-[8.5/11] overflow-hidden rounded-md border border-[#E2E2E2] bg-white">
            <Image
              src="/images/nphard.png"
              alt="First page preview of the NP-hard final paper"
              fill
              sizes="(min-width: 1024px) 26vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-[#2C2C2C]/55">
              First-page preview of the final paper
            </span>
            <a
              href="/pdfs/nphard.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-[#2C2C2C] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#B22222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2F2F2]"
              onClick={(event) => event.stopPropagation()}
            >
              View Full Paper
            </a>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mt-4 flex-wrap">
        {["Python", "Data Analysis", "Algorithms"].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-[#E8D3D1]/30 text-[#2C2C2C]/80 text-xs rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#F9F8F4]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold text-[#2C2C2C]">Projects</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* SFML Street Fighter - Featured */}
          <ProjectCard
            category="Game Development"
            title="SFML Street Fighter"
            summary="Local multiplayer 2D fighting game with custom combat systems."
            details={[
              "Built a flexible class hierarchy using inheritance and polymorphism to support multiple fighters with shared core behaviour.",
              "Implemented combat systems that kept character-specific moves modular while preserving a clean real-time game loop.",
              "Structured rendering and gameplay logic for extensibility as mechanics and player types expanded.",
            ]}
            techTags={["C++", "SFML", "OOP"]}
            imageSrc="/images/project99.png"
            videoSrc="/videos/project99.mp4"
            imageAlt="SFML Street Fighter project thumbnail"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="md:col-span-2 lg:col-span-7 min-h-[540px]"
          />

          {/* NP-Hard Research - Featured */}
          <ExpandableResearchCard />

          {/* MannyTAIKO - Supporting */}
          <ProjectCard
            category="Rhythm Game"
            title="MannyTAIKO"
            summary="Taiko-style rhythm game focused on beat-aligned timing, responsive judgement, and event-driven gameplay systems."
            details={[
              "Implemented timing windows and judgement logic to score player input against scheduled notes with real-time accuracy feedback.",
              "Built event-driven spawning, animation, and input handling systems to keep gameplay synchronized inside a real-time loop.",
              "Designed the scoring flow around timing precision so the game clearly communicates hit quality and rhythm consistency.",
            ]}
            techTags={["C++ / SFML", "Timing Systems", "Scoring Logic"]}
            imageSrc="/images/taiko.png"
            videoSrc="/videos/taiko.mp4"
            imageAlt="MannyTAIKO project thumbnail"
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="md:col-span-1 lg:col-span-7 min-h-[430px]"
            mediaLabel="Demo Preview"
          />

          {/* Sentra AI - Supporting */}
          <ProjectCard
            category="Hackathon Project"
            title="Sentra AI"
            subtitle="Python / FastAPI / React / FinBERT"
            summary="AI-powered trading sentiment platform built at UNIHACK."
            details={[
              "Aggregated financial news and sentiment signals into actionable trading insights.",
              "Built backend APIs and processing pipelines for sentiment-driven analysis.",
              "Presented results through an interactive dashboard and project showcase.",
            ]}
            techTags={["Python", "FastAPI", "React", "FinBERT"]}
            imageSrc="/images/sentra.png"
            videoSrc="/videos/sentra.mp4"
            imageAlt="Sentra AI project preview"
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
            className="md:col-span-1 lg:col-span-5 min-h-[430px]"
            mediaLabel="Project Preview"
            ctaHref="https://devpost.com/software/sentra-ai"
            ctaLabel="Open Devpost"
          />
        </div>
      </div>
    </section>
  );
}
