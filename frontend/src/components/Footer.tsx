import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-slate-950 border-t border-white/5 text-slate-500 mt-auto pt-24 pb-12 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Module (4 cols) */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-teal-400 shadow-xl">
                TFT
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                COACHING<span className="text-teal-500">.</span>
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed max-w-xs text-slate-500">
              {t("description")}
            </p>
            <div className="flex items-center gap-4">
              {/* Dummy social links with technical hover */}
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center hover:border-teal-500/50 hover:text-teal-400 transition-all cursor-pointer">
                𝕏
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center hover:border-teal-500/50 hover:text-teal-400 transition-all cursor-pointer">
                🎞️
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center hover:border-teal-500/50 hover:text-teal-400 transition-all cursor-pointer">
                👾
              </div>
            </div>
          </div>

          {/* Links Matrix (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">
                {t("links")}
              </h3>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                <li>
                  <Link
                    href="/"
                    className="hover:text-teal-400 transition-colors"
                  >
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-teal-400 transition-colors"
                  >
                    {t("faq")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-teal-400 transition-colors"
                  >
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">
                {t("legal")}
              </h3>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-teal-400 transition-colors"
                  >
                    {t("terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-teal-400 transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tactical Footer Bottom */}
        <div className="pt-12 border-t border-white/5 space-y-8">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 rounded bg-slate-950 border border-white/10 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                Official
              </div>
              <div className="text-[11px] font-bold text-slate-400 italic">
                {t("riotDisclaimer")}
              </div>
            </div>
            <div className="text-[14px] font-black text-white uppercase italic tracking-tighter">
              TFT-COACHING{" "}
              <span className="text-teal-500">#2026</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
            <span>
              &copy; {new Date().getFullYear()} {t("logo")}. {t("rights")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
