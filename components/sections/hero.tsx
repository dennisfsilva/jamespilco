"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const KENBURNS_CLASSES = [
  "animate-kenburns-1",
  "animate-kenburns-2",
  "animate-kenburns-3",
];

interface HeroProps {
  images: string[];
}

export function Hero({ images }: HeroProps) {
  const t = useTranslations("HomePage");
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background images with Ken Burns */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className={`h-full w-full ${KENBURNS_CLASSES[currentIndex % 3]}`}
          >
            <Image
              src={images[currentIndex]}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content with staggered entrance */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-heading text-6xl font-light tracking-wide sm:text-7xl md:text-8xl lg:text-9xl"
        >
          James Pilco
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-4 text-lg font-light tracking-wider opacity-90 sm:text-xl"
        >
          {t("heroSubtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Link
            href="/gallery"
            className="mt-10 inline-block border border-white/60 px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("heroButton")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
