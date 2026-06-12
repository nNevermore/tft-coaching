"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay slightly for smooth transition
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-6 rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-lg shadow-2xl animate-slide-up">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍪</span>
          <h4 className="text-sm font-bold text-white tracking-tight">
            {t("title")}
          </h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {t("description")}
        </p>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/10 cursor-pointer"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
