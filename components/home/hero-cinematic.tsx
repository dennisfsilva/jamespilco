"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { CursorGlow } from "@/components/shared/cursor-glow";

const ease = [0.22, 1, 0.36, 1];

export function HeroCinematic() {
  const t = useTranslations("home.hero");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], ["0%", "10%"]);

  const titleWords = t("title").replace("\n", " ").split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden bg-void"
    >
      {/* Painting — single CSS animation, no Framer scale conflict */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: imageY }}
      >
        <motion.div
          className="relative w-[80%] md:w-[55%] lg:w-[45%] overflow-hidden"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <Image
            src="/images/artwork/uda-gallery-3.jpg"
            alt="Inocencia I — James Pilco Luzuriaga"
            width={800}
            height={1067}
            className="w-full h-auto"
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 55vw, 45vw"
          />
        </motion.div>
      </motion.div>

      {/* Vignette — bottom-heavy for text readability */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/30 to-transparent h-[30%]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.01 60 / 0.8) 100%)",
          }}
        />
      </div>

      {/* Cursor glow — desktop only, behind text */}
      <CursorGlow />

      {/* Text content */}
      <motion.div
        className="absolute bottom-0 left-0 z-20 px-6 md:px-16 pb-20 md:pb-28 max-w-3xl"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Name label */}
        <motion.p
          className="font-body font-semibold text-gold text-[11px] md:text-xs tracking-[0.3em] uppercase mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease }}
        >
          {t("name")}
        </motion.p>

        {/* Title — word stagger */}
        <h1 className="font-display font-black text-cream text-[2.5rem] md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.0 + i * 0.07,
                duration: 0.5,
                ease,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-accent italic text-stone text-base md:text-lg mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8, ease }}
        >
          {t("subtitle")}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div
          className="w-[1px] h-8 bg-gold/60"
          style={{ animation: "scroll-pulse 2.5s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
