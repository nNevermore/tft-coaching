import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsWidget from "@/components/ReviewsWidget";
import CookieBanner from "@/components/CookieBanner";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
            {/* Discord Community Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-semibold text-blue-450 hover:bg-blue-500/10 transition-all cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {t("discordBadge")}
            </div>

            {/* Hero Main Heading */}
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-white via-slate-100 to-slate-400 text-transparent bg-clip-text">
                {t("title")}{" "}
                <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text">
                  1-on-1
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xs sm:max-w-none mx-auto">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-extrabold text-sm transition-all shadow-lg shadow-blue-500/10 text-center cursor-pointer"
              >
                {t("heroCtaBook")}
              </Link>
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700 font-bold text-sm text-slate-300 hover:text-white transition-all text-center cursor-pointer"
              >
                {t("heroCtaOffer")}
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="py-20 border-t border-slate-900 bg-slate-950/20 relative"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t("servicesTitle")}
              </h2>
              <p className="mt-4 text-slate-450 text-sm sm:text-base leading-relaxed">
                {t("servicesSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Live Coaching */}
              <div className="p-8 rounded-2xl border border-slate-850 bg-slate-900/20 hover:border-slate-750 transition-all flex flex-col justify-between h-96 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                    🎮
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">
                    {t("serviceLiveTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
                    {t("serviceLiveDesc")}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-850/60 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-300">
                    120.00 PLN
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {t("heroCtaBook")} →
                  </Link>
                </div>
              </div>

              {/* Card 2: VOD Review */}
              <div className="p-8 rounded-2xl border border-slate-850 bg-slate-900/20 hover:border-slate-750 transition-all flex flex-col justify-between h-96 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                    📼
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">
                    {t("serviceVodTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
                    {t("serviceVodDesc")}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-850/60 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-300">
                    80.00 PLN
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-xs font-extrabold text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    {t("heroCtaBook")} →
                  </Link>
                </div>
              </div>

              {/* Card 3: Community Discord */}
              <div className="p-8 rounded-2xl border border-slate-850 bg-slate-900/20 hover:border-slate-750 transition-all flex flex-col justify-between h-96 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                    👥
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">
                    {t("serviceTeamTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
                    {t("serviceTeamDesc")}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-850/60 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-300">
                    FREE / Community
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-extrabold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Join Server →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-20 border-t border-slate-900 bg-slate-950/40 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t("processTitle")}
              </h2>
              <p className="mt-4 text-slate-450 text-sm sm:text-base leading-relaxed">
                {t("processSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl border border-slate-850/60 bg-slate-900/10 space-y-3">
                <h3 className="text-lg font-bold text-blue-400">
                  {t("step1Title")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl border border-slate-850/60 bg-slate-900/10 space-y-3">
                <h3 className="text-lg font-bold text-teal-400">
                  {t("step2Title")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl border border-slate-850/60 bg-slate-900/10 space-y-3">
                <h3 className="text-lg font-bold text-emerald-400">
                  {t("step3Title")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS WIDGET */}
        <ReviewsWidget />

        {/* BOTTOM CTA SECTION */}
        <section className="py-20 relative overflow-hidden border-t border-slate-900 bg-slate-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4.5xl">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-extrabold text-sm transition-all shadow-lg shadow-blue-500/20"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
