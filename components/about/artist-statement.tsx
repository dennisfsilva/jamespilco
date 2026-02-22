"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { placeholderArtist } from "@/lib/placeholder-data";

export function ArtistStatement() {
  const t = useTranslations("about");
  const locale = useLocale();
  const statement = locale === "en" ? placeholderArtist.statementEn : placeholderArtist.statementEs;

  return (
    <section className="relative bg-void py-20 md:py-28">
      {/* Gentle centered glow for the quote */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 45%, oklch(0.25 0.04 72 / 0.35), transparent)" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-8"
        >
          {t("statement")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-accent text-gold text-[100px] leading-none mb-[-50px]"
        >
          &ldquo;
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent italic text-cream text-xl md:text-2xl leading-loose"
        >
          {statement}
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-stone font-accent mt-6"
        >
          — James Pilco Luzuriaga
        </motion.p>

        <div className="gold-line mx-auto max-w-[40px] mt-14 md:mt-18" />
      </div>
    </section>
  );
}
