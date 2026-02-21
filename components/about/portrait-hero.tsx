"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { placeholderArtist } from "@/lib/placeholder-data";
import { galleryEase } from "@/lib/animations";

export function PortraitHero() {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center bg-void pt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Portrait */}
        <motion.div
          className="relative aspect-[3/4] max-h-[70vh] rounded-sm overflow-hidden"
          style={{ y: imageY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: galleryEase as unknown as number[] }}
        >
          <Image
            src={placeholderArtist.portrait}
            alt={placeholderArtist.name}
            fill
            className="object-cover contrast-[1.05]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ mixBlendMode: "luminosity" }}
          />
          {/* Warm tint */}
          <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: galleryEase as unknown as number[] }}
        >
          <h1 className="font-display font-black text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">
            {placeholderArtist.name.replace("Dr. ", "")}
          </h1>
          <p className="font-body font-semibold text-gold text-sm tracking-[0.2em] uppercase mt-4">
            {t("roles")}
          </p>
          <p className="text-stone font-body text-sm mt-2">
            {t("location")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
