"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  const handleMockLogin = (email: string) => {
    signIn("mock-login", {
      email,
      password: email.split("@")[0] + "123", // e.g. coach123, student123, admin123
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-[family-name:var(--font-geist-sans)] selection:bg-blue-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <main className="z-10 w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col gap-2 items-center text-center mb-8">
          <div className="px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 mb-2">
            TFT-COACHING
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-transparent bg-clip-text">
            TFT-Coaching
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Profesjonalne sesje coachingowe i analizy VOD. Zaloguj się, aby przetestować platformę.
          </p>
        </div>

        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400">Ładowanie sesji...</p>
          </div>
        ) : session ? (
          <div className="flex flex-col gap-6">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Status</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  Zalogowany
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Użytkownik</div>
                <div className="text-sm font-semibold text-slate-200">{session.user?.name}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Email</div>
                <div className="text-sm text-slate-300">{session.user?.email}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500">Rola konta</div>
                <div className="text-sm font-mono text-blue-400 capitalize">{(session.user as any).role}</div>
              </div>
              {(session.user as any).riotId && (
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">Powiązany Riot ID</div>
                  <div className="text-sm font-semibold text-teal-400">{(session.user as any).riotId}</div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 font-bold transition-all shadow-lg shadow-blue-500/10 cursor-pointer text-center text-sm">
                Przejdź do Panelu (Dashboard)
              </button>
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold transition-colors cursor-pointer text-center text-sm"
              >
                Wyloguj się
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Riot RSO Button */}
            <button 
              onClick={() => signIn("riot")}
              className="w-full py-3 rounded-xl bg-[#d13639] hover:bg-[#c22e31] font-bold text-white transition-all shadow-lg shadow-red-500/10 cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              Zaloguj przez Riot Games (RSO)
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <span className="relative px-3 text-xs text-slate-500 bg-slate-900 uppercase tracking-widest font-semibold">
                Lokalne konta demo
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => handleMockLogin("coach@tft-coaching.net")}
                className="w-full py-3 px-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 font-medium text-slate-200 transition-colors flex justify-between items-center text-sm cursor-pointer"
              >
                <span>Zaloguj jako <strong>Trener</strong></span>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-mono">coach123</span>
              </button>
              <button 
                onClick={() => handleMockLogin("student@tft-coaching.net")}
                className="w-full py-3 px-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 font-medium text-slate-200 transition-colors flex justify-between items-center text-sm cursor-pointer"
              >
                <span>Zaloguj jako <strong>Uczeń</strong></span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">student123</span>
              </button>
              <button 
                onClick={() => handleMockLogin("admin@tft-coaching.net")}
                className="w-full py-3 px-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 font-medium text-slate-200 transition-colors flex justify-between items-center text-sm cursor-pointer"
              >
                <span>Zaloguj jako <strong>Admin</strong></span>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-mono">admin123</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-slate-500 text-xs">
        © {new Date().getFullYear()} TFT-Coaching.net • Wersja Demo Portfolio
      </footer>
    </div>
  );
}
