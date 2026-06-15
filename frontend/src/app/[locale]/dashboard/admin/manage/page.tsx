import { Suspense } from "react";
import { getAdminData, updateSpecialistStatus } from "@/app/actions/admin";

// --- Components ---
const StatusIndicator = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    ONLINE: "bg-emerald-500",
    OFFLINE: "bg-slate-700",
    IN_COMBAT: "bg-blue-500 animate-pulse",
  };
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-1.5 h-1.5 rounded-full ${colors[status] || "bg-slate-500"}`}
      ></div>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
        {status}
      </span>
    </div>
  );
};

async function AdminContent() {
  const data = await getAdminData();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Personnel Count
          </div>
          <div className="text-3xl font-black italic text-white uppercase">
            {data.specialists.length}
          </div>
          <p className="text-[9px] font-bold text-teal-400 uppercase mt-2 tracking-widest italic">
            Active Specialists
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Total Platform Yield
          </div>
          <div className="text-3xl font-black italic text-white uppercase">
            {data.yield.toFixed(2)} PLN
          </div>
          <p className="text-[9px] font-bold text-blue-400 uppercase mt-2 tracking-widest italic">
            Gross Revenue
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
            Core Health
          </div>
          <div className="text-3xl font-black italic text-white uppercase">
            99.9%
          </div>
          <p className="text-[9px] font-bold text-emerald-400 uppercase mt-2 tracking-widest italic">
            Uptime Stable
          </p>
        </div>
      </div>

      {/* Tables Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Sector: Specialist Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] italic">
              Personnel Management
            </h3>
            <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest border-b border-blue-500/30 hover:text-white transition-colors">
              Add New Unit
            </button>
          </div>
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Unit Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.specialists.map((unit) => (
                  <tr
                    key={unit.id}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-white uppercase italic">
                          {unit.name}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 tracking-tighter">
                          {unit.rank} • {unit.winRate} WR
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusIndicator status={unit.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sector: Recent Transmissions (Stripe/Missions) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] italic">
              Tactical Transmissions
            </h3>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">
              Encrypted Feed
            </span>
          </div>
          <div className="rounded-3xl border border-white/5 bg-slate-900/40 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Op ID</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.missions.map((op) => (
                  <tr
                    key={op.id}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-white uppercase tracking-tighter">
                          0x{op.id.substring(0, 6)}
                        </span>
                        <span className="text-[8px] font-bold text-slate-600 uppercase">
                          {op.type} Deployment
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-black text-slate-300 italic">
                        {(op.amountPaid || 0) / 100} PLN
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-block px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 uppercase tracking-widest italic">
                        {op.status}
                      </div>
                    </td>
                  </tr>
                ))}
                {data.missions.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-[10px] font-black text-slate-600 uppercase tracking-widest italic"
                    >
                      No Data Packets Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Footer Status */}
      <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">
        <span>System: GLOBAL_CONTROLLER_v2</span>
        <span>Access: Superuser Confirmed</span>
      </div>
    </div>
  );
}

export default function AdminManagePage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            Security / Admin Command
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
          Command
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Control Module
          </span>
        </h1>
        <p className="max-w-xl text-sm text-slate-400 font-medium leading-relaxed mt-2">
          Global administrative interface. Monitor personnel status, authorized
          transmissions, and financial yield across all sectors.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-96 rounded-[2rem] bg-slate-900/20 border border-white/5 animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                Accessing Command Center...
              </span>
            </div>
          </div>
        }
      >
        <AdminContent />
      </Suspense>
    </div>
  );
}
