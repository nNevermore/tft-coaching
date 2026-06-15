import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({
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
              {t("privacyTitle")}
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500 font-medium pb-4 border-b border-slate-900">
              <p>{t("privacySubtitle")}</p>
              <p>{t("lastUpdated")}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-slate-350 text-xs sm:text-sm leading-relaxed space-y-6">
            <p className="text-slate-400">{t("privacyContent")}</p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              1. Information Sharing
            </h3>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties. We only share data with service providers (like Stripe
              for payment processing) to the extent necessary to perform
              services.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              2. Data Retention
            </h3>
            <p>
              We retain personal data only for as long as your account remains
              active or as needed to provide coaching services. You may request
              the deletion of your account and personal information at any time
              by contacting support.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              3. Security Measures
            </h3>
            <p>
              We enforce appropriate technical and organizational measures to
              safeguard against unauthorized access, loss, or alteration of
              personal data. All traffic to our servers is encrypted using
              HTTPS/TLS.
            </p>

            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider mt-8">
              4. Contact Information
            </h3>
            <p>
              For any privacy-related inquiries or data deletion requests,
              please email us directly at:{" "}
              <a
                href="mailto:support@tft-coaching.net"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                support@tft-coaching.net
              </a>
            </p>
          </div>
        </div>
      </main>

  );
}
