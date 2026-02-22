"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { placeholderArtist } from "@/lib/placeholder-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ArtistEssay() {
  const t = useTranslations("about");
  const locale = useLocale();
  const essay = locale === "en" ? placeholderArtist.essayEn : placeholderArtist.essayEs;
  const paragraphs = essay.split("\n\n");

  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, oklch(0.10 0.01 60) 15%, oklch(0.10 0.01 60) 85%, transparent 100%)",
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-3xl px-6"
      >
        <div className="gold-line max-w-[60px] mb-10" />

        <motion.p
          variants={fadeInUp}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-10"
        >
          {t("essay")}
        </motion.p>

        <div className="space-y-6">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeInUp}
              className="font-accent text-parchment text-lg leading-[1.9]"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
