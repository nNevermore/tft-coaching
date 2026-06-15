"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Logo from "@/components/Logo";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 z-10">
        <div className="max-w-xl w-full text-center space-y-12">
          {/* Tactical Logo / Alert Indicator */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-red-500/30 flex items-center justify-center">
                <Logo size="sm" variant="default" className="border-red-500/40" />
                <div className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-red-600 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-white animate-bounce">
                  !
                </div>
              </div>
            </div>
          </motion.div>

          {/* Glitchy 404 Status */}
          <div className="space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xs font-mono font-black tracking-[0.3em] text-red-500 uppercase flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              {t("subtitle")}
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm text-slate-400 font-medium leading-relaxed max-w-md mx-auto"
            >
              {t("description")}
            </motion.p>
          </div>

          {/* Tactical Terminal Readout */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-md font-mono text-left text-xs text-slate-400 space-y-2 relative overflow-hidden"
          >
            {/* Hologram scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent w-full h-full animate-scan pointer-events-none"></div>

            <div className="flex justify-between border-b border-slate-900 pb-2">
              <span className="text-slate-500 uppercase tracking-wider">SYSTEM LOG:</span>
              <span className="text-red-400/90 font-bold tracking-widest">{t("status")}</span>
            </div>
            <div className="pt-2 grid grid-cols-3 gap-2">
              <span className="text-slate-500">COORDINATES:</span>
              <span className="col-span-2 text-slate-300 font-bold">0x404_LOBBY_GRID</span>

              <span className="text-slate-500">OBJECTIVE:</span>
              <span className="col-span-2 text-slate-300 font-bold">RE-ESTABLISH UPLINK</span>

              <span className="text-slate-500">ERROR_CODE:</span>
              <span className="col-span-2 text-red-400/80 font-bold">ERR_TARGET_LOST_IN_FOG</span>
            </div>
          </motion.div>

          {/* Navigation Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-extrabold text-xs uppercase tracking-wider text-white transition-all shadow-[0_0_30px_-10px_rgba(13,148,136,0.5)] border border-teal-500/20 text-center hover:scale-105"
            >
              {t("returnHome")}
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all border border-slate-800 hover:border-slate-700 text-center hover:scale-105"
            >
              {t("dashboard")}
            </Link>
          </motion.div>
        </div>
      </main>

      <CookieBanner />
      <Footer />
    </div>
  );
}
