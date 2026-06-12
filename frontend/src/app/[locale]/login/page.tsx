"use client";

import { useSession, signIn } from "next-auth/react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("LoginPage");
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleMockLogin = (email: string) => {
    signIn("mock-login", {
      email,
      password: email.split("@")[0] + "123", // e.g. coach123
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-200 transition-colors z-20 cursor-pointer"
      >
        <span>←</span> Back to Home
      </Link>

      <main className="z-10 w-full max-w-md p-8 rounded-2xl border border-slate-900 bg-slate-900/60 backdrop-blur-xl shadow-2xl space-y-8">
        <div className="flex flex-col gap-2 items-center text-center">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer mb-2"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              TFT
            </span>
            <span className="text-xl font-extrabold text-white tracking-tight">
              TFT Coaching
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="text-xs text-slate-450 mt-1 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Riot RSO Button */}
            <button
              onClick={() => signIn("riot", { callbackUrl: "/dashboard" })}
              className="w-full py-3 rounded-xl bg-[#d13639] hover:bg-[#c22e31] font-bold text-white transition-all shadow-lg shadow-red-500/10 cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              {t("riotSignIn")}
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-850"></div>
              </div>
              <span className="relative px-3 text-[10px] text-slate-500 bg-slate-900 uppercase tracking-widest font-bold">
                {t("demoHeader")}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleMockLogin("coach@tft-coaching.net")}
                className="w-full py-3 px-4 rounded-xl border border-slate-850 bg-slate-950/40 hover:bg-slate-950/80 font-medium text-slate-200 transition-colors flex justify-between items-center text-sm cursor-pointer"
              >
                <span>{t("coachLabel")}</span>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-mono">
                  coach123
                </span>
              </button>
              <button
                onClick={() => handleMockLogin("student@tft-coaching.net")}
                className="w-full py-3 px-4 rounded-xl border border-slate-850 bg-slate-950/40 hover:bg-slate-950/80 font-medium text-slate-200 transition-colors flex justify-between items-center text-sm cursor-pointer"
              >
                <span>{t("studentLabel")}</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  student123
                </span>
              </button>
              <button
                onClick={() => handleMockLogin("admin@tft-coaching.net")}
                className="w-full py-3 px-4 rounded-xl border border-slate-850 bg-slate-950/40 hover:bg-slate-950/80 font-medium text-slate-200 transition-colors flex justify-between items-center text-sm cursor-pointer"
              >
                <span>{t("adminLabel")}</span>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-mono">
                  admin123
                </span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
