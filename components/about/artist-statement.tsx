"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { placeholderArtist } from "@/lib/placeholder-data";
import { fadeInUp, galleryEase } from "@/lib/animations";
import { GALLERY_SPACING } from "@/lib/constants";

export function ArtistStatement() {
  const t = useTranslations("about");
  const locale = useLocale();
  const statement = locale === "en" ? placeholderArtist.statementEn : placeholderArtist.statementEs;

  return (
    <section className={`bg-void ${GALLERY_SPACING.section}`}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-8"
        >
          {t("statement")}
        </motion.p>

        {/* Decorative quotation mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: galleryEase as unknown as number[] }}
          className="font-accent text-gold text-[120px] leading-none mb-[-60px]"
        >
          &ldquo;
        </motion.div>

        <motion.blockquote
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-accent italic text-cream text-xl md:text-2xl leading-loose"
        >
          {statement}
        </motion.blockquote>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone font-accent mt-6"
        >
          — James Pilco Luzuriaga
        </motion.p>
      </div>
    </section>
  );
}
