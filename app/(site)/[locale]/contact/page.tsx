import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactDirect } from "@/components/contact/contact-direct";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="relative bg-void min-h-screen pt-28 pb-24 md:pb-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 25%, oklch(0.25 0.04 72 / 0.3), transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-night))" }}
      />
      <div className="relative mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-display font-black text-cream text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="font-accent italic text-stone text-lg mt-4 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="gold-line max-w-[60px] mx-auto mt-6" />
        </div>

        {/* Form */}
        <ContactForm />

        {/* Separator */}
        <div className="gold-line max-w-[40px] mx-auto my-14 md:my-16" />

        {/* Direct contact */}
        <ContactDirect />
      </div>
    </div>
  );
}
