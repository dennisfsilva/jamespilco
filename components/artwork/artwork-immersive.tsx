"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { resolveImageUrl } from "@/sanity/lib/image";
import { getLocalizedText, formatDimensions } from "@/lib/locale-text";
import type { Artwork } from "@/types/artwork";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { ArtworkLightbox } from "./artwork-lightbox";

const ease = [0.22, 1, 0.36, 1] as const;

export function ArtworkImmersive({ artwork }: { artwork: Artwork }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const t = useTranslations("common");
  const locale = useLocale();
  const imageUrl = resolveImageUrl(artwork.images[0]);

  const title = getLocalizedText(artwork.title, locale);
  const medium = getLocalizedText(artwork.medium, locale);
  const dimensions = formatDimensions(artwork.dimensions);

  return (
    <>
      <section className="relative min-h-[60vh] flex flex-col items-center bg-void pt-24 pb-12">
        {/* Back to gallery — content flow */}
        <div className="w-full max-w-7xl px-5 sm:px-6 lg:px-8 mb-6 md:mb-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-stone hover:text-gold font-body text-sm transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            {t("backToGallery")}
          </Link>
        </div>

        {/* Warm spotlight glow — painting floats in warm light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.22 0.05 75 / 0.45) 0%, oklch(0.13 0.025 75 / 0.2) 40%, transparent 65%)",
          }}
        />

        <motion.div
          className="relative cursor-zoom-in group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded-sm"
          tabIndex={0}
          role="button"
          aria-label="Zoom image"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxOpen(true); } }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={1067}
            className="max-h-[72vh] w-auto object-contain drop-shadow-[0_4px_60px_oklch(0.25_0.06_75_/_0.35)]"
            priority
            sizes="(max-width: 768px) 90vw, 60vw"
          />
          <div className="absolute bottom-3 right-3 bg-void/60 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn size={16} className="text-gold" />
          </div>
        </motion.div>

        {/* Museum label — below the painting */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease }}
          className="text-center mt-8 md:mt-12"
        >
          <h1 className="font-display font-bold text-cream text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="text-stone font-body text-sm mt-2">
            {medium} {dimensions && `· ${dimensions}`} · {artwork.year}
          </p>
          <div className="gold-line max-w-[60px] mx-auto mt-6" />
        </motion.div>
      </section>

      <ArtworkLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={imageUrl}
        title={title}
      />
    </>
  );
}
