"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { galleryEase } from "@/lib/animations";
import { placeholderArtist } from "@/lib/placeholder-data";

export function MilestonePhotos() {
  const t = useTranslations("about.milestones");
  const photos = placeholderArtist.studioPhotos;

  if (photos.length < 2) return null;

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Mural unveiling */}
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: galleryEase }}
          >
            <div className="spotlight">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden">
                <Image
                  src={photos[0]}
                  alt={t("muralAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <figcaption className="mt-3">
              <p className="font-body text-cream text-sm">{t("muralTitle")}</p>
              <p className="font-accent italic text-stone text-xs mt-0.5">{t("muralCaption")}</p>
            </figcaption>
          </motion.figure>

          {/* Press coverage */}
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: galleryEase }}
          >
            <div className="spotlight">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden">
                <Image
                  src={photos[1]}
                  alt={t("pressAlt")}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <figcaption className="mt-3">
              <p className="font-body text-cream text-sm">{t("pressTitle")}</p>
              <p className="font-accent italic text-stone text-xs mt-0.5">{t("pressCaption")}</p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
