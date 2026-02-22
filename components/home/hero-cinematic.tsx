"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
const ease = [0.22, 1, 0.36, 1] as const;

export function HeroCinematic() {
  const t = useTranslations("home.hero");
  const titleLines = t("title").split("\n");

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-void">
      {/* Warm ambient light behind the painting — the painting lives in warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 50% 45%, oklch(0.25 0.07 75 / 0.65) 0%, oklch(0.15 0.03 75 / 0.3) 40%, transparent 68%)",
        }}
      />

      {/* Painting — fades in with Ken Burns slow zoom */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-[72%] sm:w-[55%] md:w-[45%] lg:w-[38%]"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease }}
        >
          <div
            className="will-change-transform"
            style={{ animation: "ken-burns 22s ease-out forwards" }}
          >
            <Image
              src="/images/artwork/uda-gallery-3.jpg"
              alt="Inocencia I, James Pilco Luzuriaga"
              width={800}
              height={1067}
              className="w-full h-auto drop-shadow-[0_0_80px_oklch(0.28_0.07_75_/_0.25)]"
              priority
              sizes="(max-width: 768px) 72vw, (max-width: 1024px) 45vw, 38vw"
            />
          </div>
        </motion.div>
      </div>

      {/* Vignette — combined radial + directional fades for performance */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {/* Radial vignette — center transparent, edges darken + side fades */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 50% 45%, transparent 0%, oklch(0.08 0.01 60 / 0.9) 100%)",
          }}
        />
        {/* Bottom heavy + top subtle — single div with layered gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--color-void) 0%, oklch(0.08 0.01 60 / 0.7) 30%, transparent 55%), linear-gradient(to bottom, oklch(0.08 0.01 60 / 0.5) 0%, transparent 30%)",
          }}
        />
      </div>

      {/* Text content — cinematic line-by-line reveal */}
      <div className="absolute bottom-0 left-0 z-20 px-6 md:px-16 pb-16 md:pb-24 max-w-3xl">
        {/* Name label */}
        <motion.p
          className="font-body font-semibold text-gold text-[11px] md:text-xs tracking-[0.35em] uppercase mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease }}
        >
          {t("name")}
        </motion.p>

        {/* Title — dramatic line-by-line stagger */}
        <h1 className="font-display font-black text-cream text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] tracking-tight">
          {titleLines.map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2 + i * 0.3,
                duration: 0.9,
                ease,
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-accent italic text-stone text-base md:text-lg mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          {t("subtitle")}
        </motion.p>
      </div>

      {/* Scroll indicator — gold breathing line */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <div
          className="w-[1px] h-10 bg-gold/60 origin-top"
          style={{ animation: "scroll-pulse 3s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
