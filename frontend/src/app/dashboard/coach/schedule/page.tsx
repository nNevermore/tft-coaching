export default function CoachSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Mój Grafik i Dostępność
        </h1>
        <p className="text-sm text-slate-400">
          Określ swoje godziny pracy, w których uczniowie mogą rezerwować sesje live.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center py-16 space-y-4">
        <span className="text-4xl">📅</span>
        <h2 className="text-lg font-bold text-slate-200">Brak ustawionego grafiku</h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Skonfiguruj godziny swojej dostępności w tym tygodniu, aby zacząć otrzymywać zgłoszenia.
        </p>
      </div>
    </div>
  );
}
