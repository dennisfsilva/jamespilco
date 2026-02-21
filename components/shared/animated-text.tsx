"use client";

import { motion } from "framer-motion";
import { wordChild } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1];

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function Typewriter({ text, className, speed = 35, delay = 0 }: TypewriterProps) {
  const chars = text.split("");
  const totalDuration = delay + (chars.length * speed) / 1000;
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCursorVisible(false);
    }, (totalDuration + 1.5) * 1000);
    return () => clearTimeout(timeout);
  }, [totalDuration]);

  return (
    <motion.span
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: speed / 1000,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(className)}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0 } },
          }}
        >
          {char}
        </motion.span>
      ))}
      {cursorVisible && (
        <span
          className="inline-block w-[2px] h-[0.85em] bg-gold ml-0.5 align-middle transition-opacity duration-700"
          style={{ animation: "blink-cursor 0.7s step-end infinite" }}
        />
      )}
    </motion.span>
  );
}

interface WordStaggerProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function WordStagger({ text, className, wordClassName, delay = 0 }: WordStaggerProps) {
  const words = text.split(" ");

  return (
    <motion.span
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={cn(className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordChild}
          className={cn("inline-block mr-[0.25em]", wordClassName)}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
