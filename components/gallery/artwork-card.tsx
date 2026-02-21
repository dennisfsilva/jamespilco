"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Artwork } from "@/types/artwork";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export function ArtworkCard({ artwork, index = 0 }: { artwork: Artwork; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("artwork");

  const imageUrl = resolveImageUrl(artwork.images[0]);
  const title = getLocalizedText(artwork.title, locale);
  const medium = getLocalizedText(artwork.medium, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.5, ease }}
    >
      <Link
        href={`/artwork/${artwork.slug.current}`}
        className="group block"
      >
        <div className="relative rounded-sm overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={800}
            className="w-full h-auto transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <h3 className="font-display font-semibold text-cream text-sm leading-snug">
              {title}
            </h3>
            <p className="text-stone/80 text-xs font-body mt-1">
              {medium} · {artwork.year}
            </p>
            <div className="mt-2 flex items-center justify-between">
              {artwork.availability === "available" && artwork.price ? (
                <span className="text-gold font-body font-semibold text-sm">
                  {formatPrice(artwork.price)}
                </span>
              ) : artwork.availability === "sold" ? (
                <span className="text-blood font-body font-semibold text-[11px] uppercase tracking-wider">
                  {t("sold")}
                </span>
              ) : (
                <span className="text-stone font-body text-[11px] italic">
                  {t("nfs")}
                </span>
              )}
              <ArrowUpRight size={14} className="text-gold/70" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
