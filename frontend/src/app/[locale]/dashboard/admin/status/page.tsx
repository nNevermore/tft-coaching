import { env } from "@/env";

interface StatusData {
  status: string;
  environment: string;
  php_version: string;
  database_connected: boolean;
  timestamp: string;
}

async function getBackendStatus(): Promise<{
  success: boolean;
  data: StatusData | null;
  error: string | null;
}> {
  const backendUrl = env.BACKEND_API_URL || "http://localhost";

  try {
    const res = await fetch(`${backendUrl}/api/status`, {
      cache: "no-store", // Disable caching for real-time check
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: `Serwer zwrócił kod błędu: ${res.status} ${res.statusText}`,
      };
    }

    const data: StatusData = await res.json();
    return { success: true, data, error: null };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      error:
        err.message ||
        "Brak odpowiedzi od serwera API (timeout/network error).",
    };
  }
}

export default async function AdminStatusPage() {
  const backendUrl = env.BACKEND_API_URL || "http://localhost";
  const isLocal =
    backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1");
  const { success, data, error } = await getBackendStatus();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Status Serwera & Integracji
        </h1>
        <p className="text-sm text-slate-400">
          Monitoruj status połączenia z mikroserwisem Laravel oraz stan bazy
          danych Turso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Status Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white pb-2 border-b border-slate-800/60">
            Połączenie Next.js ↔ Laravel (PHP)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Status połączenia
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${success ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
                ></span>
                <span
                  className={`text-sm font-bold ${success ? "text-emerald-400" : "text-red-400"}`}
                >
                  {success ? "ONLINE (Połączono)" : "OFFLINE (Brak połączenia)"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Adres docelowy API
              </div>
              <div className="text-sm font-mono text-slate-350">
                {backendUrl}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Środowisko backendu
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{isLocal ? "💻 " : "☁️ "}</span>
                <span className="text-sm font-semibold text-slate-200">
                  {isLocal
                    ? "Lokalne (Docker / localhost)"
                    : "Produkcyjne (Serwer Zewnętrzny)"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">
                Wersja PHP
              </div>
              <div className="text-sm text-slate-300 font-semibold font-mono">
                {success && data ? data.php_version : "Brak danych"}
              </div>
            </div>
          </div>

          {!success && (
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 space-y-1.5 leading-relaxed">
              <div className="font-bold">Szczegóły błędu połączenia:</div>
              <div>{error}</div>
              <div className="text-slate-500 mt-2">
                * Wskazówka: Jeśli łączysz się lokalnie, upewnij się, że
                kontenery docker są aktywne (`docker compose up -d` w folderze
                `/backend`).
              </div>
            </div>
          )}
        </div>

        {/* Database Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white pb-2 border-b border-slate-800/60">
            Status Bazy Danych (Turso)
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Połączenie z poziomu PHP
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${success && data?.database_connected ? "bg-emerald-500" : "bg-red-500"}`}
                ></span>
                <span
                  className={`text-sm font-bold ${success && data?.database_connected ? "text-emerald-400" : "text-red-400"}`}
                >
                  {success && data?.database_connected
                    ? "OK (Połączono)"
                    : "Błąd / Brak połączenia"}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-850 space-y-2">
              <div className="font-semibold text-slate-300">
                Jak działa to sprawdzenie?
              </div>
              <p>
                Next.js wysyła żądanie do Laravel API. Laravel podejmuje próbę
                pobrania połączenia PDO (PHP Data Objects) i wykonuje szybkie
                zapytanie testowe do bazy **Turso** przez rozszerzenie **FFI**.
              </p>
              <p className="text-slate-500">
                Gwarantuje to pełną weryfikację poprawności wdrożenia kluczy i
                działania sterownika bazy danych po stronie backendu PHP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
