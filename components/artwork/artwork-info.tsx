"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Artwork } from "@/types/artwork";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { SITE_CONFIG } from "@/lib/constants";
import { MessageCircle, Mail, Share2, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function ArtworkInfo({ artwork }: { artwork: Artwork }) {
  const t = useTranslations("artwork");
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const title = getLocalizedText(artwork.title, locale);

  const whatsappMessage = encodeURIComponent(
    `Hola James, me interesa la obra "${title}" (${artwork.year}).`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;
  const emailSubject = encodeURIComponent(`Consulta: ${title}`);
  const emailUrl = `mailto:${SITE_CONFIG.email}?subject=${emailSubject}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <section
      className="relative"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.12 0.015 55) 8%, oklch(0.13 0.015 55) 50%, oklch(0.12 0.015 55) 92%, transparent 100%)"
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Story section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-body font-semibold text-gold text-xs tracking-[0.2em] uppercase mb-6">
            {t("aboutWork")}
          </p>
          <p className="font-accent text-cream/90 text-lg md:text-xl leading-relaxed">
            {artwork.shortDescription
              ? getLocalizedText(artwork.shortDescription, locale)
              : locale === "en"
                ? `"${title}" reveals the stories hidden within every face, every gesture, where the surgeon's precision meets the artist's tenderness.`
                : `"${title}" revela las historias ocultas en cada rostro, cada gesto, donde la precisión del cirujano se encuentra con la ternura del artista.`}
          </p>
        </motion.div>

        {/* Separator */}
        <div className="gold-line max-w-[60px] mx-auto my-10 md:my-14" />

        {/* Acquisition section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="mx-auto max-w-lg text-center"
        >
          {/* Price / Status */}
          <div className="py-4 border-y border-charcoal/40 mb-6">
            {artwork.availability === "available" && artwork.price ? (
              <div>
                <p className="text-gold font-body font-bold text-2xl">
                  {formatPrice(artwork.price)}
                </p>
                <p className="text-sienna text-sm mt-1">{t("available")}</p>
              </div>
            ) : artwork.availability === "sold" ? (
              <div>
                <p className="text-blood font-body font-bold text-lg uppercase tracking-wider">
                  {t("sold")}
                </p>
                <p className="text-stone text-sm mt-1 italic">{t("soldNote")}</p>
              </div>
            ) : artwork.availability === "reserved" ? (
              <p className="text-gold-muted font-body font-semibold">{t("reserved")}</p>
            ) : artwork.availability === "donated" ? (
              <p className="text-stone font-body italic">{t("donated")}</p>
            ) : (
              <p className="text-stone font-body italic">{t("nfs")}</p>
            )}
          </div>

          {/* Action buttons — WhatsApp + Email side by side */}
          <div className="flex gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              <MessageCircle size={16} />
              {t("inquire")}
            </a>
            <a
              href={emailUrl}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-charcoal/50 text-stone hover:text-gold hover:border-gold/50 font-body text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
            >
              <Mail size={16} />
              {t("email")}
            </a>
          </div>

          {/* Share — smaller row */}
          <div className="flex justify-center mt-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-charcoal/50 text-stone hover:text-gold hover:border-gold/50 font-body text-xs rounded-sm transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50"
            >
              {copied ? <Check size={14} className="text-gold" /> : <Share2 size={14} />}
            </button>
          </div>

          {/* Trust — flowing text, not bullet checklist */}
          <p className="font-accent italic text-stone text-xs leading-relaxed mt-6 max-w-md mx-auto">
            {t("trustOriginal")}. {t("trustDirect")}.
          </p>
          <p className="font-accent italic text-stone text-xs leading-relaxed mt-2 max-w-md mx-auto">
            {t("trustNote")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
