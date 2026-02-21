"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { Artwork } from "@/types/artwork";
import { ZoomIn } from "lucide-react";
import { ArtworkLightbox } from "./artwork-lightbox";

const ease = [0.22, 1, 0.36, 1];

export function ArtworkImmersive({ artwork }: { artwork: Artwork }) {
  const t = useTranslations("artwork");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imageUrl = resolveImageUrl(artwork.images[0]);

  return (
    <>
      <section className="relative min-h-[55vh] flex items-center justify-center bg-void pt-28 pb-16">
        {/* Soft warm glow behind painting */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center 40%, oklch(0.16 0.03 70), transparent 65%)",
          }}
        />

        {/* Painting */}
        <motion.div
          className="relative z-10 cursor-zoom-in group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={imageUrl}
            alt={artwork.title.en || artwork.title.es}
            width={800}
            height={1067}
            className="max-h-[65vh] w-auto object-contain"
            priority
            sizes="(max-width: 768px) 90vw, 60vw"
          />
          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-void/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn size={18} className="text-gold/80" />
          </div>
        </motion.div>
      </section>

      <ArtworkLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={imageUrl}
        title={artwork.title.en || artwork.title.es}
      />
    </>
  );
}
