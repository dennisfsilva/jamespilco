"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Artwork } from "@/types/artwork";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText } from "@/lib/locale-text";

const ease = [0.22, 1, 0.36, 1] as const;

export function ArtworkCard({ artwork, index = 0 }: { artwork: Artwork; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("artwork");

  const imageUrl = resolveImageUrl(artwork.images[0]);
  const title = getLocalizedText(artwork.title, locale);
  const medium = getLocalizedText(artwork.medium, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.5, ease }}
    >
      <Link
        href={`/artwork/${artwork.slug.current}`}
        className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
      >
        {/* Image with subtle hover */}
        <div className="relative rounded-sm overflow-hidden border border-transparent group-hover:border-gold/30 transition-all duration-500 group-hover:-translate-y-0.5">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={800}
            className="w-full h-auto brightness-[0.93] transition-all duration-700 ease-out group-hover:brightness-100 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Museum label — always visible */}
        <div className="mt-3 px-0.5">
          <h3 className="font-display font-bold text-cream text-sm leading-snug group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="text-stone text-xs font-body mt-1">
            {medium} · {artwork.year}
          </p>
          {artwork.availability === "sold" && (
            <p className="text-blood/80 text-xs font-body uppercase tracking-wider mt-1">
              {t("sold")}
            </p>
          )}
          {artwork.availability === "nfs" && (
            <p className="text-stone text-xs font-body italic mt-1">
              {t("nfs")}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
