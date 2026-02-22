"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";

/**
 * Word-by-word typewriter reveal (~10 motion.spans, not 60 character spans).
 * Blinking gold cursor fades after the reveal.
 */
function WordTypewriter({
  text,
  className,
  delay = 0,
  speed = 0.15,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const words = text.split(" ");
  const totalDuration = delay + words.length * speed + 1.5;
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hasAppeared, setHasAppeared] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!hasAppeared) return;
    timeoutRef.current = setTimeout(() => {
      setCursorVisible(false);
    }, totalDuration * 1000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasAppeared, totalDuration]);

  return (
    <motion.span
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: speed,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      onAnimationStart={() => setHasAppeared(true)}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 4 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.2 },
            },
          }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
      <span
        className="inline-block w-[2px] h-[0.75em] bg-gold ml-1 align-middle transition-opacity duration-1000"
        style={{
          animation: cursorVisible ? "blink-cursor 0.8s step-end infinite" : "none",
          opacity: cursorVisible ? undefined : 0,
        }}
      />
    </motion.span>
  );
}

export function PhilosophyMoment() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section
      className="relative flex items-center justify-center min-h-[75vh] py-32 md:py-44"
      style={{
        background: "linear-gradient(180deg, var(--color-void) 0%, oklch(0.15 0.025 72) 15%, oklch(0.16 0.03 72) 50%, oklch(0.15 0.025 72) 85%, var(--color-void) 100%)"
      }}
    >
      {/* Centered warm glow — the philosophical heart */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 50% 50%, oklch(0.28 0.04 72 / 0.3), transparent)"
        }}
      />
      <div className="relative text-center max-w-3xl px-6">
        {/* Giant decorative quotation mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="font-accent text-gold text-[140px] md:text-[200px] leading-none mb-[-70px] md:mb-[-100px] select-none"
        >
          &ldquo;
        </motion.div>

        <blockquote className="font-accent italic text-cream text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.6]">
          <WordTypewriter text={t("quote")} delay={0.5} speed={0.15} />
        </blockquote>

        <motion.p
          className="font-accent text-stone text-base mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {t("quoteAttribution")}
        </motion.p>

        {/* Only show the other language when in English — the Spanish IS the original */}
        {locale === "en" && (
          <motion.p
            className="font-accent italic text-ash text-sm mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 3, duration: 1 }}
          >
            {t("quoteTranslation")}
          </motion.p>
        )}
      </div>
    </section>
  );
}
