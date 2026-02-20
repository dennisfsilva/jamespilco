"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Share2, Award, Check } from "lucide-react";
import { useSiteSettings } from "@/lib/site-settings-context";
import {
  getLocalizedText,
  formatPrice,
  formatDimensions,
} from "@/lib/locale-text";
import type { Artwork } from "@/types/artwork";

interface ArtworkSidebarProps {
  artwork: Artwork;
}

export function ArtworkSidebar({ artwork }: ArtworkSidebarProps) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const { whatsappNumber } = useSiteSettings();
  const [copied, setCopied] = useState(false);

  const title = getLocalizedText(artwork.title, locale);
  const whatsappMessage = encodeURIComponent(
    t("whatsappMessage", { title })
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const availabilityLabel: Record<string, string> = {
    available: t("available"),
    sold: t("sold"),
    reserved: t("reserved"),
    nfs: t("privateCollection"),
    donated: t("donated"),
  };

  const availabilityColor: Record<string, string> = {
    available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    sold: "bg-foreground/10 text-foreground",
    reserved: "bg-gold/20 text-gold-foreground dark:text-gold",
    nfs: "bg-muted text-muted-foreground",
    donated: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Title and year */}
      <div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          James Pilco Luzuriaga
        </p>
        <h1 className="mt-2 font-heading text-3xl font-light">
          {title}
        </h1>
        <p className="mt-1 text-muted-foreground">{artwork.year}</p>
      </div>

      <Separator />

      {/* Details */}
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{t("medium")}</dt>
          <dd>{getLocalizedText(artwork.medium, locale)}</dd>
        </div>
        {artwork.dimensions && (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t("dimensions")}</dt>
            <dd>{formatDimensions(artwork.dimensions)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">{t("year")}</dt>
          <dd>{artwork.year}</dd>
        </div>
      </dl>

      <Separator />

      {/* Price and availability */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge className={availabilityColor[artwork.availability]}>
            {availabilityLabel[artwork.availability]}
          </Badge>
        </div>
        {artwork.price && artwork.availability === "available" && (
          <p className="text-2xl font-light">{formatPrice(artwork.price)}</p>
        )}
      </div>

      {/* Badges — only for available works */}
      {artwork.availability === "available" && (
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            {t("oneOfAKind")}
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            {t("certificate")}
          </div>
        </div>
      )}

      <Separator />

      {/* CTAs */}
      <div className="space-y-3">
        {artwork.availability === "available" ? (
          <Button asChild size="lg" className="w-full gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {t("whatsappInquiry")}
            </a>
          </Button>
        ) : artwork.availability === "sold" ? (
          <Button asChild size="lg" variant="secondary" className="w-full gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              {t("inquireSimilar")}
            </a>
          </Button>
        ) : null}

        <Button
          variant="outline"
          size="lg"
          className="w-full gap-2"
          onClick={async () => {
            const url = window.location.href;
            if (navigator.share) {
              try {
                await navigator.share({ title, url });
              } catch {
                // User cancelled share dialog
              }
            } else {
              try {
                await navigator.clipboard.writeText(url);
              } catch {
                // Clipboard API not available (insecure context)
                const input = document.createElement("input");
                input.value = url;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
              }
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {copied ? t("linkCopied") : t("share")}
        </Button>
      </div>
    </div>
  );
}
