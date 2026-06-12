export default function CoachLessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Lekcje Uczniów
        </h1>
        <p className="text-sm text-slate-400">
          Zarządzaj zgłoszeniami VOD i zaplanowanymi lekcjami live dla swoich uczniów.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center py-16 space-y-4">
        <span className="text-4xl">👥</span>
        <h2 className="text-lg font-bold text-slate-200">Brak aktywnych zgłoszeń</h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Nie otrzymałeś jeszcze żadnych wniosków o coaching live lub analizę VOD.
        </p>
      </div>
    </div>
  );
}
