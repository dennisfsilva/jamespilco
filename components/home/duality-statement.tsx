"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLocale } from "next-intl";
import { placeholderArtist } from "@/lib/placeholder-data";

const ease = [0.22, 1, 0.36, 1];

export function DualityStatement() {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const statement =
    locale === "en"
      ? placeholderArtist.statementEn
      : placeholderArtist.statementEs;

  const sentences = statement.split(/(?<=\.)\s+/).filter(Boolean);

  const highlights =
    locale === "en"
      ? [
          "the most important form of human expression",
          "where medicine meets the canvas",
          "the stories that inhabit every face",
        ]
      : [
          "la expresión humana más importante",
          "donde la medicina se encuentra con el lienzo",
          "las historias que habitan en cada rostro",
        ];

  function highlightText(text: string) {
    let result = text;
    for (const phrase of highlights) {
      result = result.replace(
        phrase,
        `<span class="text-gold">${phrase}</span>`
      );
    }
    return result;
  }

  return (
    <section ref={containerRef} className="bg-void py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] gap-10 lg:gap-20 items-start">
          {/* Left — painting detail */}
          <motion.div
            className="relative aspect-[3/4] rounded-sm overflow-hidden lg:sticky lg:top-24"
            style={{ y: imageY }}
          >
            <Image
              src="/images/artwork/uda-gallery-2.jpg"
              alt="Memorias del Cuerpo II — detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </motion.div>

          {/* Right — statement */}
          <div className="space-y-5 lg:pt-8">
            {sentences.map((sentence, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease,
                }}
                className="font-accent text-cream/90 text-lg md:text-xl lg:text-2xl leading-[1.75]"
                dangerouslySetInnerHTML={{ __html: highlightText(sentence) }}
              />
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
