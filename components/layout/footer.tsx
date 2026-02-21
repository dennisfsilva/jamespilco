"use client";

import { useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-night border-t border-charcoal/20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left */}
          <div>
            <p className="font-display text-cream font-bold text-sm tracking-wide">
              James Pilco Luzuriaga
            </p>
            <p className="text-stone text-sm mt-1">{SITE_CONFIG.location}</p>
          </div>

          {/* Center — the quote (hidden on small screens for cleanliness) */}
          <div className="hidden md:block text-center max-w-sm">
            <p className="font-accent italic text-stone/70 text-sm leading-relaxed">
              &ldquo;{t("quote")}&rdquo;
            </p>
          </div>

          {/* Right — social */}
          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-gold transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-gold transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-charcoal/30 text-center md:text-left">
          <p className="text-ash text-xs">
            &copy; {new Date().getFullYear()} James Pilco Luzuriaga. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
