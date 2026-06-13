import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { env } from "@/env";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: {
      template: `%s | TFT-Coaching Elite`,
      default: t("title"),
    },
    description: t("description"),
    metadataBase: new URL(
      env.NEXT_PUBLIC_APP_URL || "https://tft-coaching.net",
    ),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "pl-PL": "/pl",
      },
    },
    openGraph: {
      title: "TFT-Coaching | Elite Tactical Training",
      description:
        "Optimize your early-game economy and late-game positioning with Challenger-tier specialists.",
      url: "https://tft-coaching.net",
      siteName: "TFT-Coaching",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "TFT-Coaching Elite Program",
      description: "Data-driven coaching for Teamfight Tactics.",
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  const isDev = process.env.NODE_ENV !== "production";
  const isDemoMode =
    isDev &&
    (!process.env.TURSO_DB_URL ||
      !process.env.TURSO_DB_TOKEN ||
      !process.env.STRIPE_SECRET_KEY);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className={`min-h-full flex flex-col ${isDemoMode ? "pb-12" : ""}`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            {isDemoMode && (
              <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-amber-500/30 text-amber-400 py-3.5 px-4 text-center text-[9px] font-black uppercase tracking-[0.2em] z-50 flex items-center justify-center gap-2 select-none shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
                <span>
                  {locale === "pl"
                    ? "Ostrzeżenie Taktyczne: Aktywny Tryb Demonstracyjny / Używanie Symulowanych Danych i Płatności (Brak Konfiguracji .env)"
                    : "Tactical Warning: Sandbox Demo Mode Active / Using Simulated Mock Intelligence & Payments (No API Keys Configured)"}
                </span>
              </div>
            )}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
