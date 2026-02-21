"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import type { Artwork } from "@/types/artwork";
import { getLocalizedText, formatPrice, formatDimensions } from "@/lib/locale-text";
import { fadeInUp, staggerContainer, galleryEase } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";
import { MessageCircle, Mail, Share2, ShieldCheck } from "lucide-react";

export function ArtworkInfo({ artwork }: { artwork: Artwork }) {
  const t = useTranslations("artwork");
  const locale = useLocale();

  const title = getLocalizedText(artwork.title, locale);
  const medium = getLocalizedText(artwork.medium, locale);
  const dimensions = formatDimensions(artwork.dimensions);

  const whatsappMessage = encodeURIComponent(
    `Hola James, me interesa la obra "${title}" (${artwork.year}).`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;
  const emailSubject = encodeURIComponent(`Consulta: ${title}`);
  const emailUrl = `mailto:${SITE_CONFIG.email}?subject=${emailSubject}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // silent fail
    }
  };

  return (
    <section className="bg-night border-t border-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16">
          {/* Left — description placeholder */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-accent text-cream text-lg leading-relaxed">
              {locale === "en"
                ? `"${title}" is a work that captures the essence of James Pilco's artistic vision — the intersection of medical precision and emotional depth. Through careful brushwork and a mastery of color, Pilco reveals the stories hidden within every face, every gesture, every moment of human experience.`
                : `"${title}" es una obra que captura la esencia de la visión artística de James Pilco — la intersección entre la precisión médica y la profundidad emocional. A través de pinceladas cuidadosas y un dominio del color, Pilco revela las historias ocultas en cada rostro, cada gesto, cada momento de la experiencia humana.`}
            </p>
          </motion.div>

          {/* Right — acquisition panel (sticky) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 lg:self-start space-y-6"
          >
            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="font-display font-bold text-cream text-3xl"
            >
              {title}
            </motion.h1>

            {/* Metadata */}
            <motion.p variants={fadeInUp} className="text-stone font-body text-sm">
              {medium} {dimensions && `· ${dimensions}`} · {artwork.year}
            </motion.p>

            {/* Price / Status */}
            <motion.div variants={fadeInUp} className="py-4 border-y border-charcoal/50">
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
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a
              variants={fadeInUp}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors"
            >
              <MessageCircle size={18} />
              {t("inquire")}
            </motion.a>

            {/* Secondary actions */}
            <motion.div variants={fadeInUp} className="flex gap-3">
              <a
                href={emailUrl}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-charcoal text-stone hover:text-gold hover:border-gold font-body text-sm rounded-sm transition-colors"
              >
                <Mail size={16} />
                {t("email")}
              </a>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-charcoal text-stone hover:text-gold hover:border-gold font-body text-sm rounded-sm transition-colors"
              >
                <Share2 size={16} />
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-ash text-xs font-body pt-2"
            >
              <ShieldCheck size={14} />
              <span>{t("trust")}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
