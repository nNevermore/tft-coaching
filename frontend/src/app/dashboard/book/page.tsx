"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createCheckoutSession } from "@/app/actions/stripe";

function BookPageContent() {
  const searchParams = useSearchParams();
  const isCancelled = searchParams.get("cancelled") === "true";
  const [loadingType, setLoadingType] = useState<"live" | "vod" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (type: "live" | "vod") => {
    setError(null);
    setLoadingType(type);
    try {
      const res = await createCheckoutSession(type);
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas przekierowania do płatności.");
      setLoadingType(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Kup sesję coachingową
        </h1>
        <p className="text-sm text-slate-400">
          Wybierz odpowiedni pakiet i zarezerwuj dogodny termin u swojego trenera.
        </p>
      </div>

      {isCancelled && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
          ⚠️ Płatność została anulowana. Możesz spróbować ponownie w dowolnym momencie.
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
          ❌ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Coaching Card */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">LIVE</span>
            <h2 className="text-xl font-bold text-white">Live Session (1 godzina)</h2>
            <p className="text-sm text-slate-400">
              Analiza na żywo podczas Twojego meczu. Trener obserwuje ekran (udostępnianie na Discordzie) i koryguje decyzje w czasie rzeczywistym.
            </p>
            <div className="pt-2">
              <span className="text-lg font-bold text-white">120.00 PLN</span>
            </div>
          </div>
          <button 
            disabled={loadingType !== null}
            onClick={() => handleCheckout("live")}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/45 disabled:text-slate-400 text-center font-bold text-sm transition-colors text-white cursor-pointer flex items-center justify-center gap-2"
          >
            {loadingType === "live" ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Trwa łączenie ze Stripe...
              </>
            ) : (
              "Wybierz termin i przejdź do płatności"
            )}
          </button>
        </div>

        {/* VOD Review Card */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 rounded border border-teal-500/20">VOD</span>
            <h2 className="text-xl font-bold text-white">Przegląd VOD (Zapis Gry)</h2>
            <p className="text-sm text-slate-400">
              Przesyłasz nagranie ze swojej gry (np. YouTube, Twitch, plik). Trener nagrywa autorskie wideo (30-40 min), analizując każdy etap gry, ekonomię i kompozycję.
            </p>
            <div className="pt-2">
              <span className="text-lg font-bold text-white">80.00 PLN</span>
            </div>
          </div>
          <button 
            disabled={loadingType !== null}
            onClick={() => handleCheckout("vod")}
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800/45 disabled:text-slate-400 text-center font-bold text-sm transition-colors text-white cursor-pointer flex items-center justify-center gap-2"
          >
            {loadingType === "vod" ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Trwa łączenie ze Stripe...
              </>
            ) : (
              "Prześlij link i opłać analizę"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">Ładowanie...</h1>
        <div className="h-40 bg-slate-900/20 rounded-2xl animate-pulse"></div>
      </div>
    }>
      <BookPageContent />
    </Suspense>
  );
}
