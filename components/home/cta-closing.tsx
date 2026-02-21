"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Instagram, ArrowRight, MessageCircle } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function CtaClosing() {
  const t = useTranslations("home.cta");

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hola James, me interesa su obra.")}`;

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-void to-night">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="font-display font-bold text-cream text-3xl md:text-[2.75rem] leading-snug"
        >
          {t("title").split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h2>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 border border-gold/70 text-gold font-body font-semibold text-sm rounded-sm hover:bg-gold/10 transition-colors duration-300"
          >
            {t("gallery")} <ArrowRight size={15} />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors duration-300"
          >
            <MessageCircle size={15} />
            {t("whatsapp")}
          </a>
        </motion.div>

        {/* Instagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-stone hover:text-gold text-sm font-body transition-colors"
          >
            <Instagram size={15} />
            {SITE_CONFIG.instagramHandle}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
