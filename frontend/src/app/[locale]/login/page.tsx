"use client";

import { useSession, signIn } from "next-auth/react";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";

// --- Tactical Decorative Element ---
const TacticalCorner = ({ className }: { className: string }) => (
  <div className={`absolute w-4 h-4 border-slate-700 ${className}`} />
);

export default function LoginPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("LoginPage");
  const router = useRouter();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  // Ambient mouse follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Cycle loading messages for "tactical" feel
  useEffect(() => {
    if (status === "loading") {
      const texts = [
        "Syncing with Riot...",
        "Decrypting Profile...",
        "Verifying Access...",
        "Loading Assets...",
      ];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(texts[i % texts.length]);
        i++;
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleMockLogin = (email: string) => {
    signIn("mock-login", {
      email,
      password: email.split("@")[0] + "123",
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-[family-name:var(--font-geist-sans)] selection:bg-teal-500/30">
      {/* --- Ambient Background --- */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-40"
        style={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.07), transparent 40%)`,
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* --- Header Navigation --- */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <Link href="/" className="group flex items-center gap-3 cursor-pointer">
          <span className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-teal-400 shadow-xl group-hover:scale-110 transition-transform">
            TF
          </span>
          <span className="hidden sm:block text-sm font-black tracking-widest text-slate-400 group-hover:text-white transition-colors uppercase">
            Exit to Base
          </span>
        </Link>
      </div>

      {/* --- Main Login Module --- */}
      <main className="relative z-10 w-full max-w-md">
        {/* Module Frame */}
        <div className="relative p-8 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-2xl shadow-2xl overflow-hidden group">
          {/* Tactical Corners */}
          <TacticalCorner className="top-0 left-0 border-t-2 border-l-2 -translate-x-1 -translate-y-1" />
          <TacticalCorner className="top-0 right-0 border-t-2 border-r-2 translate-x-1 -translate-y-1" />
          <TacticalCorner className="bottom-0 left-0 border-b-2 border-l-2 -translate-x-1 translate-y-1" />
          <TacticalCorner className="bottom-0 right-0 border-b-2 border-r-2 translate-x-1 translate-y-1" />

          {/* Heading */}
          <div className="flex flex-col gap-2 items-center text-center mb-10">
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4 animate-pulse">
              System Authorization
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              {t("title")}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {t("subtitle")}
            </p>
          </div>

          {status === "loading" ? (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border border-teal-500/30 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-mono text-teal-400 animate-pulse">
                  {loadingText}
                </span>
                <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-teal-400 w-1/2 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Primary: Riot Sign-On */}
              <button
                onClick={() => signIn("riot", { callbackUrl: "/dashboard" })}
                className="relative w-full group overflow-hidden py-4 rounded-xl bg-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d13639] to-[#eb4c50] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {/* Riot Games Red Fist SVG */}
                  <svg
                    className="w-5 h-5 transition-colors group-hover:text-white text-[#d13639]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.66 2.08L5.3 5.43c-.45.24-.76.7-.82 1.2l-.76 6.44c-.06.51.15.99.55 1.3l5.34 4.07c.4.3.94.34 1.38.1l6.36-3.35c.45-.24.76-.7.82-1.2l.76-6.44c.06-.51-.15-.99-.55-1.3l-5.34-4.07c-.4-.3-.94-.34-1.38-.1zm-1.16 4.42l4.5 3.5-4.5 3.5v-7z" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-tighter text-slate-950 group-hover:text-white transition-colors">
                    {t("riotSignIn")}
                  </span>
                </div>
              </button>

              {/* Separator */}
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-white/5"></div>
                <div className="absolute px-4 bg-slate-900/10 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] backdrop-blur-md">
                  Testing Protocal
                </div>
              </div>

              {/* Secondary: Mock Terminal Logins */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    label: t("coachLabel"),
                    email: "coach@tft-coaching.net",
                    color: "text-blue-400",
                    bg: "bg-blue-500/5",
                    border: "border-blue-500/20",
                  },
                  {
                    label: t("studentLabel"),
                    email: "student@tft-coaching.net",
                    color: "text-teal-400",
                    bg: "bg-teal-500/5",
                    border: "border-teal-500/20",
                  },
                  {
                    label: t("adminLabel"),
                    email: "admin@tft-coaching.net",
                    color: "text-purple-400",
                    bg: "bg-purple-500/5",
                    border: "border-purple-500/20",
                  },
                ].map((item) => (
                  <button
                    key={item.email}
                    onClick={() => handleMockLogin(item.email)}
                    className={`group w-full p-4 rounded-xl border ${item.border} ${item.bg} hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${item.color.replace("text", "bg")} animate-pulse`}
                      ></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white">
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono ${item.color} opacity-60 group-hover:opacity-100`}
                    >
                      {item.email.split("@")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}


        </div>

        {/* Support Link */}
        <p className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          Trouble signing in?{" "}
          <Link
            href="/contact"
            className="text-teal-500 hover:text-teal-400 underline underline-offset-4"
          >
            Contact Command
          </Link>
        </p>
      </main>
    </div>
  );
}
