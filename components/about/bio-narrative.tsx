"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { placeholderArtist } from "@/lib/placeholder-data";
import { fadeInUp, galleryEase } from "@/lib/animations";
import { GALLERY_SPACING } from "@/lib/constants";

export function BioNarrative() {
  const locale = useLocale();
  const bio = locale === "en" ? placeholderArtist.bioEn : placeholderArtist.bioEs;

  // Split into paragraphs at sentence boundaries for better layout
  const sentences = bio.split(/(?<=\.)\s+/).filter(Boolean);
  const mid = Math.ceil(sentences.length / 2);
  const col1 = sentences.slice(0, mid).join(" ");
  const col2 = sentences.slice(mid).join(" ");

  // Phrases to highlight
  const highlights =
    locale === "en"
      ? [
          "funded his surgical training through the sale of his own artwork",
          "founding professor",
        ]
      : [
          "financió sus estudios de especialidad a través de la venta de su propia obra",
          "profesor fundador",
        ];

  function highlightText(text: string) {
    let result = text;
    for (const phrase of highlights) {
      result = result.replace(
        phrase,
        `<span class="text-gold">${phrase}</span>`
      );
    }
    return result;
  }

  return (
    <section className={`bg-void ${GALLERY_SPACING.section}`}>
      <div className={GALLERY_SPACING.container}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-accent text-parchment text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightText(col1) }}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-accent text-parchment text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightText(col2) }}
          />
        </div>
      </div>
    </section>
  );
}
