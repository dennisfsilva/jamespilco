"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { GALLERY_SPACING } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import type { Artwork } from "@/types/artwork";

interface SelectedGalleryGridProps {
  artworks: Artwork[];
}

export function SelectedGalleryGrid({ artworks }: SelectedGalleryGridProps) {
  const t = useTranslations("HomePage");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const selected = artworks;

  const availabilityLabel: Record<string, string> = {
    sold: tc("sold"),
    reserved: tc("reserved"),
    nfs: tc("privateCollection"),
    donated: tc("donated"),
  };

  return (
    <section className={GALLERY_SPACING.section}>
      <div className={GALLERY_SPACING.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <h2 className="font-heading text-3xl font-light tracking-wide sm:text-4xl">
            {t("selectedWorks")}
          </h2>
          <Link
            href="/gallery"
            className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            {tc("viewAll")} →
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {selected.map((artwork) => (
            <motion.div key={artwork._id} variants={fadeInUp}>
              <Link
                href={`/artwork/${artwork.slug.current}`}
                className="group block"
              >
                <div
                  className="relative overflow-hidden bg-muted"
                  style={{ aspectRatio: artwork.aspectRatio || 3 / 4 }}
                >
                  <Image
                    src={artwork.imageUrl || "/images/artwork/uda-gallery-1.jpg"}
                    alt={getLocalizedText(artwork.title, locale)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {artwork.availability !== "available" && (
                    <Badge
                      variant="secondary"
                      className={`absolute left-3 top-3 ${
                        artwork.availability === "sold"
                          ? "bg-foreground/80 text-background"
                          : artwork.availability === "donated"
                            ? "bg-blue-600/80 text-white"
                            : "bg-gold text-gold-foreground"
                      }`}
                    >
                      {availabilityLabel[artwork.availability]}
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-heading text-lg">
                    {getLocalizedText(artwork.title, locale)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getLocalizedText(artwork.medium, locale)}, {artwork.year}
                  </p>
                  {artwork.price && artwork.availability === "available" && (
                    <p className="mt-1 text-sm font-medium">
                      {formatPrice(artwork.price)}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
