"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Send, Check } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission — replace with actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4">
          <Check size={24} className="text-gold" />
        </div>
        <p className="font-accent text-cream text-lg">{t("success")}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <label className="block text-stone text-sm font-body mb-2">
          {t("name")} *
        </label>
        <input
          type="text"
          required
          className="w-full bg-night border border-charcoal rounded-sm px-4 py-3 text-cream font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-stone text-sm font-body mb-2">
          {t("email")} *
        </label>
        <input
          type="email"
          required
          className="w-full bg-night border border-charcoal rounded-sm px-4 py-3 text-cream font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-stone text-sm font-body mb-2">
          {t("phone")}
        </label>
        <input
          type="tel"
          className="w-full bg-night border border-charcoal rounded-sm px-4 py-3 text-cream font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors"
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-stone text-sm font-body mb-2">
          {t("message")} *
        </label>
        <textarea
          required
          rows={5}
          className="w-full bg-night border border-charcoal rounded-sm px-4 py-3 text-cream font-body text-sm focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors resize-none"
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors disabled:opacity-60"
        >
          <Send size={16} />
          {status === "sending" ? t("sending") : t("send")}
        </button>
      </motion.div>
    </motion.form>
  );
}
