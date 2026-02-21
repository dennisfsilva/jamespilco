"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { Artwork } from "@/types/artwork";
import { placeholderArtworks } from "@/lib/placeholder-data";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GALLERY_SPACING } from "@/lib/constants";

export function RelatedWorks({ currentSlug }: { currentSlug: string }) {
  const t = useTranslations("artwork");
  const locale = useLocale();

  // Simple related: all artworks except current
  const related = placeholderArtworks
    .filter((a) => a.slug.current !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className={`bg-void ${GALLERY_SPACING.sectionSm}`}>
      <div className={GALLERY_SPACING.wideContainer}>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-8"
        >
          {t("related")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4"
        >
          {related.map((artwork) => {
            const imageUrl = resolveImageUrl(artwork.images[0]);
            const title = getLocalizedText(artwork.title, locale);
            return (
              <motion.div
                key={artwork._id}
                variants={fadeInUp}
                className="flex-shrink-0 w-[250px] md:w-[300px] group"
              >
                <Link href={`/artwork/${artwork.slug.current}`}>
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-3">
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover brightness-[0.9] group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500"
                      sizes="300px"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-cream text-sm">
                    {title}
                  </h3>
                  <p className="text-stone text-xs font-body mt-1">
                    {getLocalizedText(artwork.medium, locale)} · {artwork.year}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
