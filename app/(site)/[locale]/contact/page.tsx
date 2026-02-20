"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { GALLERY_SPACING } from "@/lib/constants";
import { useSiteSettings } from "@/lib/site-settings-context";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const tc = useTranslations("Common");
  const { whatsappNumber, email, location } = useSiteSettings();

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tc("whatsappGeneric"))}`;

  return (
    <section className={GALLERY_SPACING.section}>
      <div className={GALLERY_SPACING.narrowContainer}>
        <h1 className="font-heading text-4xl font-light tracking-wide sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea id="message" rows={5} required />
              </div>
              <Button type="submit" size="lg" className="w-full">
                {t("send")}
              </Button>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="space-y-8">
            {/* WhatsApp CTA */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-heading text-lg">{t("orWhatsApp")}</h3>
              <Button
                asChild
                size="lg"
                className="mt-4 w-full gap-2"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>

            <Separator />

            {/* Contact details */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
