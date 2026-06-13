import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Link, usePathname } from "@/i18n/routing";
import { SignOutButton } from "./SignOutButton";
import SidebarNav from "@/components/dashboard/SidebarNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const user = session.user;
  const role = (user as any).role || "user";
  const name = user?.name || "Użytkownik";
  const riotId = (user as any).riotId;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-[family-name:var(--font-geist-sans)] selection:bg-teal-500/30">
      {/* Sidebar: Tactical Command Panel */}
      <aside className="w-full md:w-72 bg-slate-900/50 backdrop-blur-2xl border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between shrink-0 relative z-30">
        {/* Top Branding & Profile */}
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="p-8">
            <Link href="/" className="flex items-center gap-3 group mb-10">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                <span className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-teal-400">
                  TF
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-widest text-white uppercase italic leading-none">
                  Command
                </span>
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase leading-none mt-1">
                  Center
                </span>
              </div>
            </Link>

            {/* Profile Card Mini */}
            <div className="mb-10 relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative p-5 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=1e293b`}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-lg border border-white/10"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal-500 border-2 border-slate-950 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-white uppercase truncate tracking-tighter">
                      {name}
                    </div>
                    <div className="text-[10px] font-mono text-teal-400/70 truncate">
                      {riotId || "NO_RIOT_ID"}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">
                    {role === "admin"
                      ? "Auth: Admin"
                      : role === "coach"
                        ? "Auth: Coach"
                        : "Auth: Student"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-teal-500 animate-pulse"></span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase">
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links (Componentized for client-side active state) */}
            <SidebarNav role={role} />
          </div>
        </div>

        {/* Bottom Status & Telemetry */}
        <div className="p-8 mt-auto border-t border-white/5 space-y-6">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content: Perspective Area */}
      <main className="flex-1 min-h-screen relative flex flex-col">
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="p-6 md:p-12 lg:p-16 max-w-7xl w-full mx-auto relative z-10 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
