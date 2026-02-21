"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { placeholderPress } from "@/lib/placeholder-data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GALLERY_SPACING } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function PressList() {
  const t = useTranslations("about");

  return (
    <section className={`bg-void ${GALLERY_SPACING.sectionSm}`}>
      <div className={GALLERY_SPACING.container}>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-10"
        >
          {t("press")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-0"
        >
          {placeholderPress.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex items-center justify-between py-4 border-b border-charcoal/30"
            >
              <div>
                <span className="font-body text-cream text-sm flex items-center gap-1">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-muted transition-colors inline-flex items-center gap-1"
                    >
                      {item.title} <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    item.title
                  )}
                </span>
                <p className="text-stone text-xs font-body mt-0.5">
                  {item.publication}
                  {item.date && ` · ${item.date}`}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
