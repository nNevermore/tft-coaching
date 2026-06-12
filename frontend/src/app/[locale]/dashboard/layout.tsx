import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const role = (session.user as any).role || "user";
  const name = session.user?.name || "Użytkownik";
  const riotId = (session.user as any).riotId;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 animate-pulse"></span>
            <Link
              href="/"
              className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text hover:opacity-85 transition-opacity"
            >
              TFT-COACHING
            </Link>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-slate-950/50 border border-slate-800/80">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
              Konto
            </div>
            <div className="text-sm font-semibold truncate text-slate-200">
              {name}
            </div>
            {riotId && (
              <div className="text-xs text-teal-400 font-mono truncate mt-0.5">
                {riotId}
              </div>
            )}
            <div className="text-[10px] mt-2 inline-block px-2 py-0.5 font-bold uppercase tracking-wider rounded bg-slate-800 text-slate-400 border border-slate-700/50">
              {role === "admin"
                ? "🔑 Admin"
                : role === "coach"
                  ? "🎓 Trener"
                  : "🎮 Uczeń"}
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>🏠 Pulpit</span>
            </Link>

            {/* Student Links */}
            {role === "user" && (
              <>
                <Link
                  href="/dashboard/lessons"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>📖 Moje Lekcje</span>
                </Link>
                <Link
                  href="/dashboard/book"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>📅 Kup Trening</span>
                </Link>
              </>
            )}

            {/* Coach Links */}
            {role === "coach" && (
              <>
                <Link
                  href="/dashboard/coach/schedule"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>📅 Mój Grafik</span>
                </Link>
                <Link
                  href="/dashboard/coach/lessons"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>👥 Lekcje Uczniów</span>
                </Link>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <Link
                  href="/dashboard/admin/manage"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>🛠️ Zarządzanie</span>
                </Link>
                <Link
                  href="/dashboard/admin/logs"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>📄 Logi Systemowe</span>
                </Link>
                <Link
                  href="/dashboard/admin/status"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <span>📊 Status Serwera</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-850">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
