"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { placeholderExhibitions } from "@/lib/placeholder-data";
import { getLocalizedText } from "@/lib/locale-text";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ExhibitionsList() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section
      className="relative py-14 md:py-20"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.10 0.01 60) 20%, oklch(0.10 0.01 60) 80%, transparent 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="gold-line max-w-[60px] mb-10" />
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-10"
        >
          {t("exhibitions")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-0"
        >
          {placeholderExhibitions.map((ex, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_1fr_auto] gap-4 items-center py-4 border-b border-charcoal/30"
            >
              <span className="font-display font-bold text-gold text-sm">
                {ex.year}
              </span>
              <span className="font-body text-cream text-sm">
                {getLocalizedText(ex.title, locale)}
              </span>
              <span className="hidden md:block text-stone text-sm font-body">
                {ex.venue}, {ex.location}
              </span>
              <span
                className={`text-xs font-body uppercase tracking-wider ${
                  ex.type === "solo" ? "text-gold" : "text-stone"
                }`}
              >
                {t(ex.type)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
