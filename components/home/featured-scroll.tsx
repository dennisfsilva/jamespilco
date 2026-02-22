"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { ArrowRight } from "lucide-react";
import { galleryEase } from "@/lib/animations";

export function FeaturedScroll() {
  const t = useTranslations("home.featured");
  const tArtwork = useTranslations("artwork");
  const locale = useLocale();

  const featured = placeholderArtworks.filter((a) => a.featured);

  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.11 0.01 60) 15%, oklch(0.11 0.01 60) 85%, transparent 100%)"
      }}
    >
      {/* Ambient wash — warm glow from the exhibition lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(0.20 0.04 72 / 0.3), transparent)"
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: galleryEase }}
        className="relative text-center mb-10"
      >
        <p className="font-body font-semibold text-gold text-[11px] tracking-[0.35em] uppercase">
          {t("label")}
        </p>
        <div className="gold-line max-w-[40px] mx-auto mt-4" />
      </motion.div>

      {/* Scroll container */}
      <div
        className="relative flex gap-6 md:gap-8 overflow-x-auto px-6 sm:px-10 lg:px-20 pb-4 scrollbar-none snap-x snap-mandatory"
      >
        {featured.map((artwork, i) => {
          const imageUrl = resolveImageUrl(artwork.images[0]);
          const title = getLocalizedText(artwork.title, locale);
          const medium = getLocalizedText(artwork.medium, locale);

          return (
            <motion.div
              key={artwork._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: galleryEase }}
              className="flex-shrink-0 w-[280px] md:w-[320px] group snap-start"
            >
              <Link href={`/artwork/${artwork.slug.current}`}>
                {/* Card with spotlight glow behind */}
                <div className="spotlight">
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-transparent group-hover:border-gold/20 transition-all duration-500">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover brightness-[0.93] transition-all duration-700 ease-out group-hover:brightness-100 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-display font-bold text-cream text-sm leading-snug group-hover:text-gold transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-stone text-xs font-body mt-1.5">
                    {medium} · {artwork.year}
                  </p>
                  <div className="mt-1.5">
                    {artwork.availability === "available" && artwork.price ? (
                      <span className="text-gold font-body font-bold text-sm">
                        {formatPrice(artwork.price)}
                      </span>
                    ) : artwork.availability === "sold" ? (
                      <span className="text-blood font-body font-bold text-xs uppercase tracking-wider">
                        {tArtwork("sold")}
                      </span>
                    ) : (
                      <span className="text-stone font-body text-xs italic">
                        {tArtwork("nfs")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative text-center mt-10"
      >
        <Link
          href="/gallery"
          className="text-gold hover:text-cream font-body text-sm transition-colors duration-300 inline-flex items-center gap-2 border-b border-gold/30 pb-0.5 hover:border-gold/60"
        >
          {t("viewAll")} <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  );
}
