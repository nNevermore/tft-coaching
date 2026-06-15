import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("LegalPages");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow py-20 relative z-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-white via-slate-100 to-slate-400 text-transparent bg-clip-text">
              {t("cookiesTitle")}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500 font-medium pb-4 border-b border-slate-900">
              <p>{t("cookiesSubtitle")}</p>
              <p>{t("lastUpdated")}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-slate-350 text-xs sm:text-sm leading-relaxed space-y-6">
            <p className="text-slate-400">{t("cookiesContent")}</p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              1. Types of Cookies We Use
            </h3>
            <p>
              We use both session cookies (which expire when you close your web browser)
              and persistent cookies (which stay on your device until you delete them or they expire).
              These cookies serve essential authentication requirements and user preferences.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              2. Third-Party Services
            </h3>
            <p>
              We integrate third-party services like Stripe for secure payment processing.
              These services may set cookies on your browser to facilitate transaction security
              and fraud prevention.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              3. Opting Out and Control
            </h3>
            <p>
              You can configure your browser to decline cookies, or remove individual cookies.
              Note that declining essential cookies will block access to premium coaching tools
              and the login dashboard.
            </p>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
