import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                TFT
              </span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {t("logo")}
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t("links")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Riot Disclaimer and Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 space-y-4">
          <p className="text-[11px] text-slate-600 leading-relaxed text-center md:text-left">
            {t("riotDisclaimer")}
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <span>
              &copy; {new Date().getFullYear()} {t("logo")}. {t("rights")}
            </span>
            <div className="flex gap-4">
              <span>Wersja 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
