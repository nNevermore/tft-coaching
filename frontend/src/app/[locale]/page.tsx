import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsWidget from "@/components/ReviewsWidget";
import CookieBanner from "@/components/CookieBanner";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />

        {/* PROCESS SECTION */}
        <section className="py-24 border-t border-slate-900 bg-slate-950/40 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t("processTitle")}
              </h2>
              <p className="mt-4 text-slate-400 text-base leading-relaxed">
                {t("processSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/60 transition-colors space-y-4 shadow-lg shadow-slate-950/50">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold font-mono">
                  01
                </div>
                <h3 className="text-xl font-bold text-slate-200">
                  {t("step1Title")}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("step1Desc")}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/60 transition-colors space-y-4 shadow-lg shadow-slate-950/50">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold font-mono">
                  02
                </div>
                <h3 className="text-xl font-bold text-slate-200">
                  {t("step2Title")}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("step2Desc")}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/60 transition-colors space-y-4 shadow-lg shadow-slate-950/50">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold font-mono">
                  03
                </div>
                <h3 className="text-xl font-bold text-slate-200">
                  {t("step3Title")}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS WIDGET */}
        <ReviewsWidget />

        {/* BOTTOM CTA SECTION */}
        <section className="py-24 relative overflow-hidden border-t border-slate-900 bg-slate-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/10 to-teal-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-xl mx-auto text-base text-slate-400 leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <div className="pt-6">
              <Link
                href="/login"
                className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-extrabold text-sm transition-all shadow-[0_0_40px_-10px_rgba(13,148,136,0.5)] border border-teal-500/20 text-white"
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
