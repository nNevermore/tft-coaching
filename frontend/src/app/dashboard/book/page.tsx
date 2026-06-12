export default function BookPage() {
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
          <button className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-center font-bold text-sm transition-colors text-white cursor-pointer">
            Wybierz termin i przejdź do płatności
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
          <button className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-center font-bold text-sm transition-colors text-white cursor-pointer">
            Prześlij link i opłać analizę
          </button>
        </div>
      </div>
    </div>
  );
}
