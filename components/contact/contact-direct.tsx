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
      className="space-y-6"
    >
      <motion.p
        variants={fadeInUp}
        className="font-body font-semibold text-gold text-xs tracking-[0.3em] uppercase"
      >
        {t("directContact")}
      </motion.p>

      {/* WhatsApp — primary */}
      <motion.a
        variants={fadeInUp}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full py-4 px-6 bg-whatsapp/90 hover:bg-whatsapp text-white font-body font-semibold rounded-sm transition-colors"
      >
        <MessageCircle size={20} />
        {t("whatsapp")}
      </motion.a>

      {/* Email */}
      <motion.a
        variants={fadeInUp}
        href={`mailto:${SITE_CONFIG.email}`}
        className="flex items-center gap-3 text-stone hover:text-gold transition-colors font-body text-sm py-3"
      >
        <Mail size={18} />
        {SITE_CONFIG.email}
      </motion.a>

      {/* Instagram */}
      <motion.a
        variants={fadeInUp}
        href={SITE_CONFIG.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-stone hover:text-gold transition-colors font-body text-sm py-3"
      >
        <Instagram size={18} />
        {SITE_CONFIG.instagramHandle}
      </motion.a>

      {/* Location */}
      <motion.div
        variants={fadeInUp}
        className="flex items-center gap-3 text-stone font-body text-sm py-3"
      >
        <MapPin size={18} />
        {SITE_CONFIG.location}
      </motion.div>
    </motion.div>
  );
}
