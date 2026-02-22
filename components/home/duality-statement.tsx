"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { placeholderArtist } from "@/lib/placeholder-data";

const ease = [0.22, 1, 0.36, 1] as const;

function HighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
  let parts: { text: string; highlighted: boolean }[] = [{ text, highlighted: false }];

  for (const phrase of highlights) {
    const newParts: typeof parts = [];
    for (const part of parts) {
      if (part.highlighted) {
        newParts.push(part);
        continue;
      }
      const idx = part.text.indexOf(phrase);
      if (idx === -1) {
        newParts.push(part);
        continue;
      }
      if (idx > 0) newParts.push({ text: part.text.slice(0, idx), highlighted: false });
      newParts.push({ text: phrase, highlighted: true });
      if (idx + phrase.length < part.text.length)
        newParts.push({ text: part.text.slice(idx + phrase.length), highlighted: false });
    }
    parts = newParts;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.highlighted ? (
          <span key={i} className="text-gold">{part.text}</span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

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
            transition={{ duration: 1, ease }}
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
                  ease,
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
