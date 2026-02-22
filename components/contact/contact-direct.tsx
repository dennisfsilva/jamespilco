"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MessageCircle, Mail, Instagram, MapPin } from "lucide-react";

export function ContactDirect() {
  const t = useTranslations("contact");

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hola James, me gustaría saber más sobre su obra.")}`;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.p
        variants={fadeInUp}
        className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase mb-8"
      >
        {t("directContact")}
      </motion.p>

      {/* WhatsApp + Email side by side */}
      <motion.div variants={fadeInUp} className="flex gap-3 max-w-sm mx-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          <MessageCircle size={16} />
          {t("whatsapp")}
        </a>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-charcoal/50 text-stone hover:text-gold hover:border-gold/40 font-body text-sm rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          <Mail size={16} />
          {SITE_CONFIG.email}
        </a>
      </motion.div>

      {/* Instagram + Location */}
      <motion.div variants={fadeInUp} className="mt-8 space-y-2">
        <p className="text-stone text-sm font-body">
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Instagram size={14} />
            {SITE_CONFIG.instagramHandle}
          </a>
        </p>
        <p className="text-stone text-sm font-body inline-flex items-center gap-2">
          <MapPin size={14} />
          {SITE_CONFIG.location}
        </p>
      </motion.div>
    </motion.div>
  );
}
