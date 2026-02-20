"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocalizedText, formatPrice } from "@/lib/locale-text";
import { GALLERY_SPACING } from "@/lib/constants";
import type { Artwork } from "@/types/artwork";

interface RelatedWorksProps {
  artworks: Artwork[];
}

export function RelatedWorks({ artworks }: RelatedWorksProps) {
  const t = useTranslations("Artwork");
  const locale = useLocale();

  if (artworks.length === 0) return null;

  return (
    <section className={GALLERY_SPACING.sectionSm}>
      <div className={GALLERY_SPACING.container}>
        <h2 className="font-heading text-2xl font-light tracking-wide">
          {t("relatedWorks")}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {artworks.map((artwork) => (
            <Link
              key={artwork._id}
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="mt-2">
                <h3 className="truncate font-heading text-sm">
                  {getLocalizedText(artwork.title, locale)}
                </h3>
                {artwork.price && artwork.availability === "available" && (
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(artwork.price)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
