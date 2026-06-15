import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("LegalPages");

  return (
    <main className="flex-grow py-20 relative z-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-white via-slate-100 to-slate-400 text-transparent bg-clip-text">
              {t("termsTitle")}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500 font-medium pb-4 border-b border-slate-900">
              <p>{t("termsSubtitle")}</p>
              <p>{t("lastUpdated")}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-slate-350 text-xs sm:text-sm leading-relaxed space-y-6">
            <p className="text-slate-400">{t("termsContent")}</p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              1. Acceptable Use
            </h3>
            <p>
              Users are permitted to use the website and services for personal,
              non-commercial purposes only. Any unauthorized use, data
              extraction, scraping, or copying of content is strictly
              prohibited.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              2. Account Credentials & Security
            </h3>
            <p>
              When utilizing credentials or Riot RSO, you are responsible for
              maintaining the confidentiality of your login details. You agree
              to notify us immediately of any unauthorized access to your
              account.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              3. Disclaimer of Warranties
            </h3>
            <p>
              All tutoring and educational guidance are provided &quot;as
              is&quot;. We make no warranties, express or implied, regarding
              rank gains or performance outcomes, as results depend heavily on
              individual study and practice.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              4. Governing Law
            </h3>
            <p>
              These Terms shall be governed by and construed in accordance with
              the local laws, without regard to conflict of law principles.
            </p>
          </div>
        </div>
      </main>

  );
}
