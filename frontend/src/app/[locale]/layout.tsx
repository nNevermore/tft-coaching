import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { env } from "@/env";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        "Optimize your early-game economy and late-game positioning with Radiant-tier specialists.",
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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
