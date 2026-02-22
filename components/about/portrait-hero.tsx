"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { placeholderArtist } from "@/lib/placeholder-data";
import { galleryEase } from "@/lib/animations";

export function PortraitHero() {
  const t = useTranslations("about");

  return (
    <section className="relative min-h-[65vh] flex items-center bg-void pt-24 overflow-hidden">
      {/* Warm spotlight on the portrait */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 65% at 35% 50%, oklch(0.22 0.04 72 / 0.3), transparent)"
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Portrait — with warm contrast filter */}
        <motion.div
          className="relative aspect-[3/4] max-h-[65vh] rounded-sm overflow-hidden"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: galleryEase }}
        >
          <Image
            src={placeholderArtist.portrait}
            alt={placeholderArtist.name}
            fill
            className="object-cover contrast-[1.05] saturate-[0.85]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle warm overlay on portrait */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, oklch(0.08 0.01 60 / 0.3) 0%, transparent 50%)",
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: galleryEase }}
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
          <p className="font-accent italic text-stone text-base mt-4 max-w-sm">
            {t("subtitle")}
          </p>
          <div className="gold-line max-w-[60px] mt-6" />
        </motion.div>
      </div>
    </section>
  );
}
