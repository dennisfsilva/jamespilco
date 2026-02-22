"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { placeholderArtist } from "@/lib/placeholder-data";
import { HighlightedText } from "@/components/shared/highlighted-text";
import { galleryEase } from "@/lib/animations";

export function DualityStatement() {
  const locale = useLocale();

  const statement =
    locale === "en"
      ? placeholderArtist.dualityEn
      : placeholderArtist.dualityEs;

  const sentences = statement.split(/(?<=\.)\s+/).filter(Boolean);

  const highlights =
    locale === "en"
      ? [
          "a dual learning",
          "if I didn't paint, I couldn't see the human being from other sides",
          "where medicine meets the canvas",
        ]
      : [
          "un aprendizaje dual",
          "si yo no pintara, no podría ver en otros lados al ser humano",
          "donde la medicina se encuentra con el lienzo",
        ];

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, transparent 0%, oklch(0.13 0.015 65) 12%, oklch(0.14 0.02 65) 50%, oklch(0.13 0.015 65) 88%, transparent 100%)"
      }}
    >
      {/* Warm glow near the painting — low chroma warm-gray */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 65% at 28% 50%, oklch(0.28 0.05 72 / 0.4), transparent)"
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-10 lg:gap-20 items-start">
          {/* Left — painting detail with warm glow */}
          <motion.div
            className="relative lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: galleryEase }}
          >
            <div className="spotlight">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/images/artwork/uda-gallery-2.jpg"
                  alt="Memorias del Cuerpo II, detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — statement sentences stagger in */}
          <div className="space-y-5 lg:pt-8">
            {sentences.map((sentence, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  delay: Math.min(i * 0.08, 0.4),
                  duration: 0.6,
                  ease: galleryEase,
                }}
                className="font-accent text-cream/90 text-lg md:text-xl lg:text-2xl leading-[1.8]"
              >
                <HighlightedText text={sentence} highlights={highlights} />
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Gold separator */}
      <div className="mt-20 md:mt-28">
        <div className="gold-line mx-auto max-w-xs" />
      </div>
    </section>
  );
}
