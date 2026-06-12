export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Dziennik Logów Systemowych
        </h1>
        <p className="text-sm text-slate-400">
          Monitoruj zdarzenia, błędy oraz telemetrię z serwerów Edge oraz
          background workerów.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h2 className="text-base font-bold text-white">
            Logi czasu rzeczywistego
          </h2>
          <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
            Live Log Tape
          </span>
        </div>

        <div className="font-mono text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-850 h-64 overflow-y-auto space-y-2">
          <div>
            [2026-06-12 08:52:14] <span className="text-blue-400">INFO</span>{" "}
            [database] connection established with Turso edge database.
          </div>
          <div>
            [2026-06-12 08:52:18] <span className="text-blue-400">INFO</span>{" "}
            [laravel-worker] check schema database status: Nothing to migrate.
          </div>
          <div>
            [2026-06-12 08:55:43] <span className="text-blue-400">INFO</span>{" "}
            [next-server] ready in 464ms on port 3000 (Turbopack).
          </div>
          <div>
            [2026-06-12 08:58:20]{" "}
            <span className="text-emerald-400">SUCCESS</span> [next-auth]
            session initialized successfully for user (role: admin).
          </div>
        </div>
      </div>
    </div>
  );
}
