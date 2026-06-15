"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Identifier too short."),
  email: z.string().email("Invalid signal address."),
  rank: z.string().min(1, "Rank intel required."),
  discord: z.string().min(2, "Discord frequency required."),
  message: z.string().min(10, "Transmission payload too small."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const [status, setStatus] = useState<
    "IDLE" | "TRANSMITTING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("TRANSMITTING");
    // Mocking the encrypted transmission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("SUCCESS");
    reset();
    setTimeout(() => setStatus("IDLE"), 5000);
  };

  return (
    <main className="flex-grow py-32 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Communications / Open Frequency
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
              {t("title")}
            </h1>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sector: Transmission Input (Form) */}
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-3xl blur-sm group-hover:opacity-100 transition duration-1000 opacity-50"></div>
              <div className="relative p-8 sm:p-10 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
                <AnimatePresence mode="wait">
                  {status === "SUCCESS" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center space-y-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                        <span className="text-4xl">📡</span>
                      </div>
                      <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                        {t("success")}
                      </h2>
                      <button
                        onClick={() => setStatus("IDLE")}
                        className="text-sm font-bold text-teal-400 uppercase tracking-wider border-b border-teal-500/30 hover:text-white transition-colors"
                      >
                        Establish New Link
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">
                            {t("name")}
                          </label>
                          <input
                            {...register("name")}
                            className={`w-full bg-slate-950/50 border ${errors.name ? "border-red-500/50" : "border-white/5"} rounded-xl p-4 text-base font-medium text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-0 transition-all`}
                            placeholder="Identify yourself"
                          />
                          {errors.name && (
                            <p className="text-xs font-medium text-red-500 ml-1 mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">
                            {t("email")}
                          </label>
                          <input
                            {...register("email")}
                            className={`w-full bg-slate-950/50 border ${errors.email ? "border-red-500/50" : "border-white/5"} rounded-xl p-4 text-base font-medium text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-0 transition-all`}
                            placeholder="signal@domain.com"
                          />
                          {errors.email && (
                            <p className="text-xs font-medium text-red-500 ml-1 mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">
                            {t("rank")}
                          </label>
                          <input
                            {...register("rank")}
                            className={`w-full bg-slate-950/50 border ${errors.rank ? "border-red-500/50" : "border-white/5"} rounded-xl p-4 text-base font-medium text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-0 transition-all`}
                            placeholder="e.g. Radiant / Diamond I"
                          />
                          {errors.rank && (
                            <p className="text-xs font-medium text-red-500 ml-1 mt-1">
                              {errors.rank.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">
                            {t("discord")}
                          </label>
                          <input
                            {...register("discord")}
                            className={`w-full bg-slate-950/50 border ${errors.discord ? "border-red-500/50" : "border-white/5"} rounded-xl p-4 text-base font-medium text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-0 transition-all`}
                            placeholder="username#0000"
                          />
                          {errors.discord && (
                            <p className="text-xs font-medium text-red-500 ml-1 mt-1">
                              {errors.discord.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">
                          {t("message")}
                        </label>
                        <textarea
                          {...register("message")}
                          rows={5}
                          className={`w-full bg-slate-950/50 border ${errors.message ? "border-red-500/50" : "border-white/5"} rounded-xl p-4 text-base font-medium text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-0 transition-all resize-none`}
                          placeholder="Detailed mission report..."
                        ></textarea>
                        {errors.message && (
                          <p className="text-xs font-medium text-red-500 ml-1 mt-1">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <button
                        disabled={status === "TRANSMITTING"}
                        type="submit"
                        className="w-full relative group overflow-hidden py-5 rounded-2xl bg-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 transition-opacity duration-500 ${status === "TRANSMITTING" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        ></div>
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          {status === "TRANSMITTING" ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                              <span className="text-sm font-bold text-white">
                                Transmitting Data Package...
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm font-bold text-slate-950 group-hover:text-white transition-colors">
                                {t("submit")}
                              </span>
                              <svg
                                className="w-4 h-4 text-slate-950 group-hover:text-white transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </>
                          )}
                        </div>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sector: Support Intel (Sidebar) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-sm space-y-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center text-xl">
                    💬
                  </div>
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">
                    {t("infoTitle")}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    {t("infoDesc")}
                  </p>
                  <a
                    href="https://discord.gg/tftcoaching"
                    className="block w-full py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-center font-bold text-sm text-white uppercase tracking-wider transition-transform hover:scale-105"
                  >
                    {t("discordButton")}
                  </a>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-slate-400">
                        {t("emailUs")}
                      </div>
                      <div className="text-base font-semibold text-blue-400">
                        hq@tft-coaching.net
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-sm font-medium text-slate-400">
                        {t("hours")}
                      </div>
                      <div className="text-base font-semibold text-slate-300">
                        {t("hoursValue")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
