"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";

const CATEGORIES = [
  {
    titleKey: "catGeneral",
    items: [
      { q: "q1", a: "a1" },
      { q: "q4", a: "a4" },
    ],
  },
  {
    titleKey: "catPayments",
    items: [
      { q: "q3", a: "a3" },
      { q: "q5", a: "a5" },
    ],
  },
  { titleKey: "catSafety", items: [{ q: "q2", a: "a2" }] },
];

export default function FAQPage() {
  const t = useTranslations("FAQPage");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    if (!search) return CATEGORIES;
    const s = search.toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          t(item.q).toLowerCase().includes(s) ||
          t(item.a).toLowerCase().includes(s),
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [search, t]);

  return (
    <main className="flex-grow py-32 relative z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header & Search */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Knowledge Base
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
                {t("title")}
              </h1>
              <p className="max-w-xl text-sm text-slate-400 font-medium leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            {/* Search Module */}
            <div className="relative max-w-md group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-slate-900 border border-white/5 hover:border-white/10 focus-within:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300">
                <div className="pl-5 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-none text-base font-medium p-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Result Counter */}
          {search && (
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider animate-pulse">
              Matching signals found:{" "}
              {filteredCategories.reduce((acc, c) => acc + c.items.length, 0)}
            </div>
          )}

          {/* Accordion Categories */}
          <div className="space-y-12">
            {filteredCategories.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <span className="text-4xl grayscale opacity-20">📡</span>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Signal Lost: No matching protocols found.
                </div>
              </div>
            ) : (
              filteredCategories.map((category, catIdx) => (
                <div key={catIdx} className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-3 italic">
                    <span className="w-4 h-px bg-slate-800"></span>
                    {t(category.titleKey)}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, itemIdx) => {
                      const id = `${catIdx}-${itemIdx}`;
                      const isOpen = expandedId === id;

                      return (
                        <div
                          key={id}
                          className={`group rounded-2xl border transition-all duration-500 ${isOpen
                            ? "bg-slate-900/60 border-blue-500/30 shadow-2xl"
                            : "bg-slate-900/20 border-white/5 hover:border-white/10"
                            } overflow-hidden`}
                        >
                          <button
                            onClick={() => setExpandedId(isOpen ? null : id)}
                            aria-expanded={isOpen}
                            className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                          >
                            <span
                              className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? "text-blue-400" : "text-slate-200 group-hover:text-white"}`}
                            >
                              {t(item.q)}
                            </span>
                            <div
                              className={`relative w-5 h-5 flex items-center justify-center transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                            >
                              <div
                                className={`absolute w-full h-0.5 bg-slate-700 rounded-full transition-colors ${isOpen ? "bg-blue-400" : ""}`}
                              ></div>
                              {!isOpen && (
                                <div className="absolute w-0.5 h-full bg-slate-700 rounded-full"></div>
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.23, 1, 0.32, 1],
                                }}
                              >
                                <div className="px-8 pb-8 text-sm text-slate-400 font-medium leading-relaxed">
                                  <div className="pt-4 border-t border-white/5">
                                    {t(item.a)}
                                  </div>
                                  <div className="mt-6 flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                    <span>Security: Verified</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                                    <span>Read Time: 1m</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Help Desk Bottom */}
          <div className="p-8 rounded-3xl border border-white/5 bg-slate-950/50 flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white uppercase italic tracking-wider">
                Still Awaiting Orders?
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Issues? Contact Tactical Support.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white text-slate-950 text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
            >
              Contact Command
            </Link>
          </div>
        </div>
      </main>
  );
}
