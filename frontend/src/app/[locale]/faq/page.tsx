"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQPage() {
  const t = useTranslations("FAQPage");

  // Keep track of which question is expanded
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  // Unreachable block for i18n-check static analyzer to discover dynamic keys
  if (false) {
    t("catGeneral");
    t("catPayments");
    t("catSafety");
    t("q1");
    t("a1");
    t("q2");
    t("a2");
    t("q3");
    t("a3");
    t("q4");
    t("a4");
    t("q5");
    t("a5");
  }

  const categories = [
    {
      titleKey: "catGeneral",
      items: [
        { qKey: "q1", aKey: "a1" },
        { qKey: "q4", aKey: "a4" },
      ],
    },
    {
      titleKey: "catPayments",
      items: [
        { qKey: "q3", aKey: "a3" },
        { qKey: "q5", aKey: "a5" },
      ],
    },
    {
      titleKey: "catSafety",
      items: [{ qKey: "q2", aKey: "a2" }],
    },
  ];

  const handleToggle = (id: string) => {
    setExpandedIndex(expandedIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow py-20 relative z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-slate-100 to-slate-400 text-transparent bg-clip-text">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Accordion Categories */}
          <div className="space-y-10">
            {categories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 pl-2">
                  {t(category.titleKey)}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => {
                    const uniqueId = `${catIdx}-${itemIdx}`;
                    const isOpen = expandedIndex === uniqueId;

                    return (
                      <div
                        key={itemIdx}
                        className="rounded-xl border border-slate-850 bg-slate-900/10 hover:bg-slate-900/20 hover:border-slate-800 transition-all overflow-hidden"
                      >
                        {/* Header/Question Trigger */}
                        <button
                          onClick={() => handleToggle(uniqueId)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-slate-200 hover:text-white transition-colors cursor-pointer focus:outline-none"
                        >
                          <span>{t(item.qKey)}</span>
                          <span
                            className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-45 text-blue-400" : ""}`}
                          >
                            ＋
                          </span>
                        </button>

                        {/* Content/Answer Panel */}
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "max-h-96 opacity-100 border-t border-slate-900/60"
                              : "max-h-0 opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="px-6 py-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                            {t(item.aKey)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
