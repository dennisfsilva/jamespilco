"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";

export function Footer() {
  const t = useTranslations("footer");
  const roles = t("roles").split("·");

  return (
    <footer className="bg-night">
      {/* Threshold — single gold interpunct */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pt-16 md:pt-20 flex justify-center"
      >
        <span className="text-gold/50 text-xl select-none" aria-hidden>
          ·
        </span>
      </motion.div>

      {/* The Plaque */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="text-center px-5 pt-8 pb-10 md:pt-10 md:pb-12"
      >
        <p className="font-display font-semibold text-cream text-base tracking-[0.2em] uppercase">
          {SITE_CONFIG.artistName}
        </p>

        <p className="text-xs mt-3 tracking-wider leading-relaxed">
          {roles.map((role, i) => (
            <Fragment key={i}>
              <span className="text-stone">{role.trim()}</span>
              {i < roles.length - 1 && (
                <span className="text-gold/40 mx-2">·</span>
              )}
            </Fragment>
          ))}
        </p>

        <p className="text-ash text-xs mt-1.5">{SITE_CONFIG.location}</p>

        {/* Social — icons joined by gold interpuncts */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            aria-label="Email"
            className="text-stone hover:text-gold transition-colors duration-300 p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
          >
            <Mail size={18} strokeWidth={1.5} />
          </a>
          <span className="text-gold/30 text-xs select-none" aria-hidden>
            ·
          </span>
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-stone hover:text-gold transition-colors duration-300 p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <span className="text-gold/30 text-xs select-none" aria-hidden>
            ·
          </span>
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-stone hover:text-gold transition-colors duration-300 p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 rounded-sm"
          >
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>

      {/* Colophon */}
      <div className="mx-auto max-w-xl px-5">
        <div className="border-t border-charcoal/15 py-5 flex items-center justify-between">
          <p className="text-ash text-xs">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.artistName}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
