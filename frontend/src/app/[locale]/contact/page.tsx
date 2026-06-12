"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState("");
  const [discord, setDiscord] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Mock API call delay
    setTimeout(() => {
      setStatus("success");
      // Clear form
      setName("");
      setEmail("");
      setRank("");
      setDiscord("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow py-20 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-slate-100 to-slate-400 text-transparent bg-clip-text">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Form Section (3/5 width) */}
            <div className="lg:col-span-3 p-8 rounded-2xl border border-slate-850 bg-slate-900/10 backdrop-blur-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-200">
                {t("formTitle")}
              </h2>

              {status === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-400">
                  {t("success")}
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-red-400">
                  {t("error")}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 focus:border-blue-500/50 focus:outline-none text-sm text-slate-200 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 focus:border-blue-500/50 focus:outline-none text-sm text-slate-200 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                      {t("rank")}
                    </label>
                    <input
                      type="text"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      placeholder="e.g. Platinum II"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 focus:border-blue-500/50 focus:outline-none text-sm text-slate-200 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                      {t("discord")}
                    </label>
                    <input
                      type="text"
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="e.g. username"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 focus:border-blue-500/50 focus:outline-none text-sm text-slate-200 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
                    {t("message")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message details here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 focus:border-blue-500/50 focus:outline-none text-sm text-slate-200 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-extrabold text-sm transition-all shadow-lg shadow-blue-500/10 cursor-pointer text-center disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : t("submit")}
                </button>
              </form>
            </div>

            {/* Contact Details (2/5 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Discord Box */}
              <div className="p-8 rounded-2xl border border-slate-850 bg-slate-900/10 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                  💬
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-200">
                    {t("infoTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t("infoDesc")}
                  </p>
                </div>
                <a
                  href="https://discord.gg/tftcoaching"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-center font-bold text-sm text-white transition-colors cursor-pointer"
                >
                  {t("discordButton")}
                </a>
              </div>

              {/* General Info Box */}
              <div className="p-8 rounded-2xl border border-slate-850 bg-slate-900/10 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t("emailUs")}
                  </div>
                  <a
                    href="mailto:support@tft-coaching.net"
                    className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    support@tft-coaching.net
                  </a>
                </div>

                <div className="space-y-1 pt-3 border-t border-slate-850/60">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t("hours")}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-300">
                    {t("hoursValue")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
