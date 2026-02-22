"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, MessageCircle } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function CtaClosing() {
  const t = useTranslations("home.cta");

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hola James, me interesa su obra.")}`;

  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-b from-void via-night/50 to-night">
      {/* Centered warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 45% at 50% 40%, oklch(0.25 0.04 72 / 0.35), transparent)"
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="font-display font-bold text-cream text-3xl md:text-[2.75rem] leading-snug"
        >
          {t("title").split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className="font-accent italic text-stone text-lg mt-4"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 border border-gold/50 text-gold font-body font-semibold text-sm rounded-sm hover:bg-gold/10 hover:border-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
          >
            {t("gallery")} <ArrowRight size={14} />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            <MessageCircle size={14} />
            {t("whatsapp")}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
