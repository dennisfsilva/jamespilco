"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hola James, me interesa su obra.")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/25 hover:scale-110 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      aria-label="WhatsApp"
    >
      {/* Pulse ring — CSS only, expands and fades */}
      <span
        className="absolute inset-0 rounded-full bg-whatsapp/40"
        style={{ animation: "whatsapp-ring 2.5s ease-out infinite" }}
      />
      <MessageCircle size={24} fill="white" className="relative z-10" />
    </a>
  );
}
