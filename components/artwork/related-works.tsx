"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Artwork } from "@/types/artwork";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText } from "@/lib/locale-text";

const ease = [0.22, 1, 0.36, 1] as const;

export function RelatedWorks({ currentSlug }: { currentSlug: string }) {
  const t = useTranslations("artwork");
  const locale = useLocale();

  const related = placeholderArtworks
    .filter((a) => a.slug.current !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.12 0.015 55) 15%, oklch(0.12 0.015 55) 85%, transparent 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="gold-line max-w-[60px] mb-10" />
        <p className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-6">
          {t("related")}
        </p>

        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {related.map((artwork, i) => {
            const imageUrl = resolveImageUrl(artwork.images[0]);
            const title = getLocalizedText(artwork.title, locale);
            return (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex-shrink-0 w-[260px] md:w-[320px] group snap-start"
              >
                <Link href={`/artwork/${artwork.slug.current}`}>
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-2">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="320px"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-cream text-sm group-hover:text-gold transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-stone text-xs font-body mt-0.5">
                    {getLocalizedText(artwork.medium, locale)} · {artwork.year}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
