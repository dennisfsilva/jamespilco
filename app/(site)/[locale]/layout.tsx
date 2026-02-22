import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { FilmGrain } from "@/components/shared/film-grain";
import { CursorGlow } from "@/components/shared/cursor-glow";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, locale] = await Promise.all([
    getMessages(),
    getLocale(),
  ]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <FilmGrain />
      <CursorGlow />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFab />
    </NextIntlClientProvider>
  );
}
