"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GALLERY_SPACING } from "@/lib/constants";

interface ArtistStatementProps {
  statement: string;
}

export function ArtistStatement({ statement }: ArtistStatementProps) {
  const t = useTranslations("HomePage");

  return (
    <section className={`${GALLERY_SPACING.section} bg-secondary/50`}>
      <div className={GALLERY_SPACING.narrowContainer}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-3xl font-light tracking-wide sm:text-4xl"
        >
          {t("artistStatement")}
        </motion.h2>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center font-heading text-xl leading-relaxed text-foreground/80 sm:text-2xl md:text-3xl md:leading-relaxed"
        >
          &ldquo;{statement.split(". ").slice(0, 2).join(". ")}.&rdquo;
        </motion.blockquote>
        {statement.split(". ").length > 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center leading-relaxed text-muted-foreground"
          >
            {statement.split(". ").slice(2).join(". ")}
          </motion.p>
        )}
      </div>
    </section>
  );
}
