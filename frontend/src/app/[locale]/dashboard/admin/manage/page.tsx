export default function AdminManagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Zarządzanie Platformą
        </h1>
        <p className="text-sm text-slate-400">
          Zarządzaj trenerami, weryfikuj ich aplikacje oraz modyfikuj ceny
          pakietów.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center py-16 space-y-4">
        <span className="text-4xl">🛠️</span>
        <h2 className="text-lg font-bold text-slate-200">
          Brak oczekujących aplikacji
        </h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Aktualnie nie ma żadnych nowych zgłoszeń od kandydatów na trenerów.
        </p>
      </div>
    </div>
  );
}
