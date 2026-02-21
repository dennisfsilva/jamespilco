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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-whatsapp"
        style={{ animation: "pulse-ring 3s ease-out infinite" }}
      />
      <MessageCircle size={24} className="relative z-10" fill="white" />
    </a>
  );
}
