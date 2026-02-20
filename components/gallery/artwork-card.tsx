"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { getLocalizedText, formatPrice, formatDimensions } from "@/lib/locale-text";
import type { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
  showDetails?: boolean;
}

export function ArtworkCard({ artwork, showDetails = true }: ArtworkCardProps) {
  const t = useTranslations("Common");
  const locale = useLocale();

  const availabilityLabel: Record<string, string> = {
    available: t("available"),
    sold: t("sold"),
    reserved: t("reserved"),
    nfs: t("privateCollection"),
    donated: t("donated"),
  };

  return (
    <Link
      href={`/artwork/${artwork.slug.current}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-muted">
        <div
          className="relative w-full"
          style={{
            aspectRatio: artwork.aspectRatio || `${artwork.dimensions?.width || 3} / ${artwork.dimensions?.height || 4}`,
          }}
        >
          <Image
            src={artwork.imageUrl || "/images/artwork/uda-gallery-1.jpg"}
            alt={getLocalizedText(artwork.title, locale)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
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
      {showDetails && (
        <div className="mt-3">
          <h3 className="font-heading text-base">
            {getLocalizedText(artwork.title, locale)}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {getLocalizedText(artwork.medium, locale)}, {artwork.year}
          </p>
          {artwork.dimensions && (
            <p className="text-xs text-muted-foreground">
              {formatDimensions(artwork.dimensions)}
            </p>
          )}
          {artwork.price && artwork.availability === "available" && (
            <p className="mt-1 text-sm font-medium">
              {formatPrice(artwork.price)}
            </p>
          )}
        </div>
      )}
    </Link>
  );
}
