"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { echo } from "@/lib/echo";

// --- Types ---
type MissionStatus =
  | "ACCOMPLISHED"
  | "PREPARING"
  | "IN_PROGRESS"
  | "VOD_UPLOADED";

interface Mission {
  id: string;
  type: "LIVE" | "VOD";
  date: string;
  specialist: string;
  status: MissionStatus;
  intelSummary?: string;
  vodUrl?: string;
}

const MOCK_MISSIONS: Mission[] = [
  {
    id: "M-001",
    type: "VOD",
    date: "10 JUN 2026",
    specialist: "Mismatched",
    status: "ACCOMPLISHED",
    intelSummary:
      "Early game pivot errors identified. Recommendation: Fast-8 strategy optimization.",
    vodUrl: "#",
  },
  {
    id: "M-002",
    type: "LIVE",
    date: "12 JUN 2026",
    specialist: "TFT_Enthusiast",
    status: "PREPARING",
  },
];

// --- Sub-components ---

const MissionStatusBadge = ({ status }: { status: MissionStatus }) => {
  const styles = {
    ACCOMPLISHED: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    PREPARING: "bg-blue-500/10 border-blue-500/20 text-blue-400 animate-pulse",
    IN_PROGRESS:
      "bg-teal-500/10 border-teal-500/20 text-teal-400 animate-pulse",
    VOD_UPLOADED: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };

  return (
    <div
      className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </div>
  );
};

export default function MissionLogs({ isSuccess }: { isSuccess: boolean }) {
  const { data: session } = useSession();
  const [missions, setMissions] = useState<Mission[]>(MOCK_MISSIONS);
  const [activeIntel, setActiveIntel] = useState<Mission | null>(null);

  // --- Real-time Sync (WebSockets) ---
  useEffect(() => {
    if (!echo || !session?.user) return;

    const userId = (session.user as any).id;
    const channelName = `missions.${userId}`;

    // Listen for tactical updates
    const channel = echo
      .private(channelName)
      .listen(".mission.updated", (data: any) => {
        console.log("Tactical Signal Received:", data);

        setMissions((currentMissions) => {
          // Check if mission exists, if so update it, otherwise add it
          const index = currentMissions.findIndex(
            (m) => m.id === data.mission_id,
          );
          if (index !== -1) {
            const updated = [...currentMissions];
            updated[index] = {
              ...updated[index],
              status: data.status,
              intelSummary: data.intel?.summary || updated[index].intelSummary,
            };
            return updated;
          } else {
            // New mission from Stripe
            return [
              {
                id: data.mission_id,
                type: data.status === "VOD_UPLOADED" ? "VOD" : "LIVE",
                date: new Date()
                  .toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .toUpperCase(),
                specialist: "ASSIGNING...",
                status: data.status as MissionStatus,
                intelSummary: data.intel?.summary,
              },
              ...currentMissions,
            ];
          }
        });
      });

    return () => {
      if (echo) echo.leave(channelName);
    };
  }, [session]);

  return (
    <div className="space-y-10">
      {/* --- SUCCESS NOTIFICATION: Secure Transmission --- */}
      {isSuccess && (
        <div className="relative group animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative p-6 rounded-2xl border border-emerald-500/20 bg-slate-900/60 backdrop-blur-xl flex items-center gap-6 overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl border border-emerald-500/20">
              📡
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-white uppercase tracking-tighter italic">
                Secure Transmission Received
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Transaction 0x9482 verified. New mission parameters initialized.
                Awaiting specialist deployment.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
                Signal: Stable
              </div>
              <div className="h-1 w-24 bg-emerald-950 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 w-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN LOGS GRID --- */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2 italic">
            Operation Archives
          </h3>
          <span className="text-[10px] font-mono text-slate-600">
            {missions.length} RECORDS FOUND
          </span>
        </div>

        {missions.length === 0 ? (
          <div className="p-20 rounded-3xl border border-white/5 bg-slate-900/20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-3xl grayscale opacity-20">
              🗄️
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-widest">
                No Tactical Intel Available
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">
                Your mission logs are empty. Initiate booking to start data
                collection.
              </p>
            </div>
            <Link
              href="/dashboard/book"
              className="px-6 py-3 rounded-xl bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors"
            >
              Start Mission
            </Link>
          </div>
        ) : (
          missions.map((mission) => (
            <div
              key={mission.id}
              className="group relative p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all overflow-hidden"
            >
              {/* Tactical Marker */}
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-white/5 group-hover:bg-teal-500/40 transition-colors"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/5 flex flex-col items-center justify-center leading-none">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">
                      {mission.type}
                    </span>
                    <span className="text-sm font-black text-white italic">
                      0{mission.id.split("-")[1]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-black text-white uppercase italic tracking-tight">
                        {mission.type === "LIVE"
                          ? "Combat Session"
                          : "Strategic VOD Review"}
                      </h4>
                      <MissionStatusBadge status={mission.status} />
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>
                        Specialist:{" "}
                        <span className="text-slate-300 italic">
                          {mission.specialist}
                        </span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span>Date: {mission.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {mission.status === "ACCOMPLISHED" && (
                    <button
                      onClick={() => setActiveIntel(mission)}
                      className="px-6 py-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-slate-950 transition-all cursor-pointer"
                    >
                      Access Intel
                    </button>
                  )}
                  {mission.status === "PREPARING" && (
                    <div className="text-[10px] font-mono text-blue-400/50 uppercase tracking-widest italic animate-pulse">
                      Deployment Pending...
                    </div>
                  )}
                  <button className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all">
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expansion Area for summary if visible */}
              {activeIntel?.id === mission.id && (
                <div className="mt-6 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8 space-y-4">
                      <div className="text-[9px] font-black text-teal-500 uppercase tracking-[0.3em]">
                        Strategic Briefing
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed font-mono">
                        {mission.intelSummary || "Loading briefing data..."}
                      </p>
                      <div className="flex gap-4">
                        <button className="px-5 py-2 rounded-lg bg-white text-slate-950 text-[10px] font-black uppercase tracking-tighter hover:scale-105 transition-transform">
                          Watch Mission VOD
                        </button>
                        <button className="px-5 py-2 rounded-lg bg-slate-800 text-white text-[10px] font-black uppercase tracking-tighter">
                          Download Data
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-4 p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-3">
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        Key Comps Identified
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Arcanist Lux", "Yordle Re-roll"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
