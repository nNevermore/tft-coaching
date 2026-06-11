export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
          TFT-Coaching
        </h1>
        <p className="text-lg text-slate-400 max-w-xl">
          Profesjonalne sesje coachingowe i przeglądy VOD dla graczy Teamfight Tactics. 
          Platforma w trakcie budowy.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition-colors">
            Zaloguj przez Riot
          </button>
          <button className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold transition-colors">
            Lista Trenerów
          </button>
        </div>
      </main>
      <footer className="mt-24 text-slate-500 text-sm">
        © {new Date().getFullYear()} TFT-Coaching.net
      </footer>
    </div>
  );
}
