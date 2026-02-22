"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { placeholderArtist } from "@/lib/placeholder-data";
import { HighlightedText } from "@/components/shared/highlighted-text";
import { galleryEase } from "@/lib/animations";

export function BioNarrative() {
  const locale = useLocale();
  const t = useTranslations("about");
  const bio = locale === "en" ? placeholderArtist.bioEn : placeholderArtist.bioEs;

  const highlights =
    locale === "en"
      ? [
          "funded his surgical training by selling his own paintings",
          "scalpels paid for with brushstrokes",
          "never stop painting, never stop writing",
          "founding professor",
        ]
      : [
          "financió su formación quirúrgica vendiendo sus propios cuadros",
          "los bisturís pagados con pinceles",
          "nunca dejes de pintar, nunca dejes de escribir",
          "profesor fundador",
        ];

  const sentences = bio.split(/(?<=\.)\s+/).filter(Boolean);
  const mid = Math.ceil(sentences.length / 2);
  const col1 = sentences.slice(0, mid).join(" ");
  const col2 = sentences.slice(mid).join(" ");

  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.13 0.015 60) 12%, oklch(0.13 0.015 60) 88%, transparent 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: galleryEase }}
            className="font-accent text-parchment text-lg leading-[1.8]"
          >
            <HighlightedText text={col1} highlights={highlights} />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: galleryEase }}
            className="font-accent text-parchment text-lg leading-[1.8]"
          >
            <HighlightedText text={col2} highlights={highlights} />
          </motion.p>
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: galleryEase }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="gold-line max-w-[40px] mx-auto mb-8" />
          <p className="font-accent italic text-gold text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
            &ldquo;{t("pullQuote")}&rdquo;
          </p>
          <div className="gold-line max-w-[40px] mx-auto mt-8" />
        </motion.blockquote>
      </div>
    </section>
  );
}
