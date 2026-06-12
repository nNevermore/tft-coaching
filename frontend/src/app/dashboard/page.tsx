import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const user = session.user;
  const role = (user as any).role || "user";
  const name = user?.name || "Użytkownik";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Witaj ponownie, {name}!
        </h1>
        <p className="text-slate-400">
          Zarządzaj swoimi sesjami coachingowymi i śledź postępy na platformie TFT-Coaching.
        </p>
      </div>

      {/* Conditionally Render Dashboards based on role */}
      {role === "user" && <StudentDashboard />}
      {role === "coach" && <CoachDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}

// 🎮 STUDENT DASHBOARD
function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Moje lekcje</div>
          <div className="text-3xl font-bold text-white">0</div>
          <div className="text-xs text-slate-400">Brak nadchodzących sesji live</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Analizy VOD</div>
          <div className="text-3xl font-bold text-teal-400">0</div>
          <div className="text-xs text-slate-400">Wszystkie nagrania zrecenzowane</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Ostatni Rank</div>
          <div className="text-3xl font-bold text-blue-400">DIAMOND I</div>
          <div className="text-xs text-slate-400">Zaktualizowano z Riot API</div>
        </div>
      </div>

      {/* Main Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Coaching Packages Promo */}
        <div className="lg:col-span-2 p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-sm space-y-6">
          <h2 className="text-xl font-bold text-white">Dostępne pakiety szkoleniowe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700/80 transition-all flex flex-col justify-between h-48">
              <div>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">Sesja LIVE</span>
                <h3 className="text-base font-bold text-slate-200 mt-2">1-on-1 Live Coaching</h3>
                <p className="text-xs text-slate-400 mt-1">Kompleksowy przegląd gry na żywo, komunikacja głosowa na Discordzie.</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/60">
                <span className="text-sm font-semibold text-slate-100">120.00 PLN</span>
                <Link href="/dashboard/book" className="text-xs font-bold text-blue-400 hover:text-blue-300">Wybierz →</Link>
              </div>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700/80 transition-all flex flex-col justify-between h-48">
              <div>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 rounded border border-teal-500/20">VOD Review</span>
                <h3 className="text-base font-bold text-slate-200 mt-2">Analiza Nagrania VOD</h3>
                <p className="text-xs text-slate-400 mt-1">Prześlij link do gry, a trener nagra szczegółowe wideo z analizą Twoich błędów.</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/60">
                <span className="text-sm font-semibold text-slate-100">80.00 PLN</span>
                <Link href="/dashboard/book" className="text-xs font-bold text-teal-400 hover:text-teal-300">Wybierz →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Szybkie akcje</h2>
          <div className="space-y-2">
            <Link href="/dashboard/book" className="block w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-center font-bold text-sm transition-colors">
              📅 Zarezerwuj sesję
            </Link>
            <button className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-center font-semibold text-sm transition-colors text-slate-300 cursor-pointer">
              💬 Skontaktuj się z trenerem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🎓 COACH DASHBOARD
function CoachDashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Oczekujące zgłoszenia</div>
          <div className="text-3xl font-bold text-blue-400">0</div>
          <div className="text-xs text-slate-400">Brak nowych lekcji do akceptacji</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Nadchodzące treningi</div>
          <div className="text-3xl font-bold text-teal-400">0</div>
          <div className="text-xs text-slate-400">Brak zaplanowanych lekcji na dziś</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Wypracowane godziny</div>
          <div className="text-3xl font-bold text-white">0.0h</div>
          <div className="text-xs text-slate-400">W tym miesiącu rozliczeniowym</div>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-sm space-y-4">
        <h2 className="text-xl font-bold text-white">Twoje lekcje i zgłoszenia</h2>
        <div className="text-center py-12 rounded-xl bg-slate-950/45 border border-slate-850">
          <span className="text-4xl">📭</span>
          <h3 className="text-base font-semibold text-slate-350 mt-4">Nie masz jeszcze żadnych zgłoszeń</h3>
          <p className="text-xs text-slate-500 mt-1">Udostępnij link do swojego profilu uczniom, aby mogli zarezerwować termin.</p>
        </div>
      </div>
    </div>
  );
}

// 🔑 ADMIN DASHBOARD
function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Aktywni Trenerzy</div>
          <div className="text-3xl font-bold text-purple-400">1</div>
          <div className="text-xs text-slate-400">1 oczekuje na weryfikację aplikacji</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Transakcje Stripe</div>
          <div className="text-3xl font-bold text-emerald-400">0</div>
          <div className="text-xs text-slate-400">Wszystkie transakcje przetworzone</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Miesięczny przychód</div>
          <div className="text-3xl font-bold text-white">0.00 PLN</div>
          <div className="text-xs text-slate-400">Z prowizji od lekcji</div>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800/60 backdrop-blur-sm space-y-4">
        <h2 className="text-xl font-bold text-white">Zarządzanie platformą</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/admin/manage" className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition-all flex items-center gap-4 cursor-pointer">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="text-sm font-bold text-slate-200">Ustawienia Trenerów</h3>
              <p className="text-xs text-slate-500 mt-0.5">Zarządzaj prowizjami, weryfikuj profile, nadawaj role.</p>
            </div>
          </Link>
          <Link href="/dashboard/admin/logs" className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 transition-all flex items-center gap-4 cursor-pointer">
            <span className="text-2xl">📄</span>
            <div>
              <h3 className="text-sm font-bold text-slate-200">Dziennik logów (Better Stack)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Podgląd błędów i telemetrii z Cloudflare i Laravela.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
