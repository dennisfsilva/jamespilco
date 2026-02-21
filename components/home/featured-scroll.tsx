"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1];

export function FeaturedScroll() {
  const t = useTranslations("home.featured");
  const tArtwork = useTranslations("artwork");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const featured = placeholderArtworks.filter((a) => a.featured);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -360 : 360;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-void py-20 md:py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="text-center mb-10"
      >
        <p className="font-body font-semibold text-gold text-[11px] tracking-[0.3em] uppercase">
          {t("label")}
        </p>
      </motion.div>

      {/* Scroll container */}
      <div className="relative group/scroll">
        {/* Arrow buttons — only visible on hover of the section */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-[35%] z-10 w-10 h-10 rounded-full border border-gold/30 items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 hover:bg-gold/5 transition-all opacity-0 group-hover/scroll:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-[35%] z-10 w-10 h-10 rounded-full border border-gold/30 items-center justify-center text-gold/60 hover:text-gold hover:border-gold/60 hover:bg-gold/5 transition-all opacity-0 group-hover/scroll:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto px-5 sm:px-8 lg:px-16 pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
          data-lenis-prevent
        >
          {featured.map((artwork, i) => {
            const imageUrl = resolveImageUrl(artwork.images[0]);
            const title = getLocalizedText(artwork.title, locale);
            const medium = getLocalizedText(artwork.medium, locale);

            return (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="flex-shrink-0 w-[280px] md:w-[340px] group"
              >
                <Link href={`/artwork/${artwork.slug.current}`}>
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 280px, 340px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-gold text-xs font-body flex items-center gap-1">
                        {t("viewWork")} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-cream text-base leading-snug">
                    {title}
                  </h3>
                  <p className="text-stone text-sm font-body mt-1">
                    {medium} · {artwork.year}
                  </p>
                  <div className="mt-1.5">
                    {artwork.availability === "available" && artwork.price ? (
                      <span className="text-gold font-body font-semibold">
                        {formatPrice(artwork.price)}
                      </span>
                    ) : artwork.availability === "sold" ? (
                      <span className="text-blood font-body font-semibold text-xs uppercase tracking-wider">
                        {tArtwork("sold")}
                      </span>
                    ) : (
                      <span className="text-stone font-body text-xs italic">
                        {tArtwork("nfs")}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-10"
      >
        <Link
          href="/gallery"
          className="text-gold hover:text-gold-muted font-body text-sm transition-colors inline-flex items-center gap-2"
        >
          {t("viewAll")} <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  );
}
