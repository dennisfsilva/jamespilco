"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Typewriter } from "@/components/shared/animated-text";

const ease = [0.22, 1, 0.36, 1];

export function PhilosophyMoment() {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-void overflow-hidden py-24">
      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* The quote — typewriter */}
        <blockquote className="font-accent italic text-cream text-2xl md:text-3xl lg:text-[2.5rem] leading-relaxed">
          &ldquo;
          <Typewriter text={t("quote")} speed={35} delay={0.2} />
          &rdquo;
        </blockquote>

        {/* Attribution */}
        <motion.p
          className="font-accent text-stone text-base mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.8, ease }}
        >
          {t("quoteAttribution")}
        </motion.p>

        {/* Translation */}
        <motion.p
          className="font-accent italic text-ash text-sm mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.8, duration: 0.8, ease }}
        >
          {t("quoteTranslation")}
        </motion.p>
      </div>
    </section>
  );
}
