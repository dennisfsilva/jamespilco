"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Send, Check, Loader2 } from "lucide-react";

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-stone text-sm font-body mb-2">
      {children} <span className="text-gold">*</span>
    </label>
  );
}

const inputClasses =
  "w-full bg-night border border-charcoal rounded-sm px-4 py-3 text-cream font-body text-sm placeholder:text-ash/50 focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-colors duration-200";

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
        <RequiredLabel>{t("name")}</RequiredLabel>
        <input
          type="text"
          required
          className={inputClasses}
          placeholder={t("namePlaceholder")}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <RequiredLabel>{t("email")}</RequiredLabel>
        <input
          type="email"
          required
          className={inputClasses}
          placeholder={t("emailPlaceholder")}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-stone text-sm font-body mb-2">
          {t("phone")}
        </label>
        <input
          type="tel"
          className={inputClasses}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <RequiredLabel>{t("message")}</RequiredLabel>
        <textarea
          required
          rows={5}
          className={`${inputClasses} resize-none`}
          placeholder={t("messagePlaceholder")}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-void font-body font-semibold text-sm rounded-sm hover:bg-gold-muted transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          {status === "sending" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {status === "sending" ? t("sending") : t("send")}
        </button>
      </motion.div>
    </motion.form>
  );
}
