"use client";

import { useSession } from "next-auth/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import {
  fetchTacticalIntel,
  type TacticalIntelResponse,
} from "@/app/actions/tactical-intel";

// --- Tactical Metric Card Component ---
const MetricCard = ({
  title,
  value,
  subtitle,
  color = "blue",
  sparkline = [40, 60, 45, 70, 55, 90, 80],
}: {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  color?: "blue" | "teal" | "purple" | "emerald";
  sparkline?: number[];
}) => {
  const colorMap = {
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "shadow-blue-500/10",
      stroke: "#fca311",
    },
    teal: {
      text: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
      glow: "shadow-teal-500/10",
      stroke: "#fca311",
    },
    purple: {
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      glow: "shadow-purple-500/10",
      stroke: "#fca311",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/10",
      stroke: "#fca311",
    },
  };

  const style = colorMap[color];

  return (
    <div
      className={`relative group overflow-hidden p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.02] hover:border-white/10 ${style.glow}`}
    >
      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            {title}
          </div>
          <div
            className={`w-2 h-2 rounded-full ${style.bg.replace("/10", "")} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
          ></div>
        </div>
        <div>
          <div
            className={`text-3xl sm:text-4xl font-black italic tracking-tighter ${style.text}`}
          >
            {value}
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Mini Sparkline Visualization (SVG) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d={`M 0 100 ${sparkline.map((v, i) => `L ${i * (100 / (sparkline.length - 1))} ${100 - v}`).join(" ")} L 100 100 Z`}
            fill={`url(#gradient-${color})`}
          />
          <defs>
            <linearGradient
              id={`gradient-${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={style.stroke} stopOpacity="1" />
              <stop offset="100%" stopColor={style.stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default function DashboardPageContent() {
  const { data: session } = useSession();
  const t = useTranslations("Dashboard");

  const user = session?.user;
  const role = (user as any)?.role || "user";
  const name = user?.name || "Użytkownik";

  // --- Tactical Intel State ---
  const [intel, setIntel] = useState<TacticalIntelResponse | null>(null);
  const [isLoadingIntel, setIsLoadingIntel] = useState(false);

  useEffect(() => {
    if (role === "user" && (user as any)?.riotId) {
      const loadIntel = async () => {
        setIsLoadingIntel(true);
        const res = await fetchTacticalIntel();
        if (!("error" in res)) {
          setIntel(res);
        }
        setIsLoadingIntel(false);
      };

      loadIntel();
    }
  }, [role, user]);

  const getRankDisplay = () => {
    if (isLoadingIntel)
      return <span className="animate-pulse opacity-50">SYNCING...</span>;
    if (intel?.rank_intel && intel.rank_intel.length > 0) {
      // Find TFT rank if possible, or fallback to first
      const tftRank =
        intel.rank_intel.find((r) => r.queueType.includes("TFT")) ||
        intel.rank_intel[0];
      return `${tftRank.tier} ${tftRank.rank}`;
    }
    return "UNRANKED";
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* --- COMMAND HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-[8px] font-black text-teal-400 uppercase tracking-[0.3em] animate-pulse">
              Live Link: Active
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              System Status: {isLoadingIntel ? "SYNCING API" : "OPTIMAL"}
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase">
            {name}
            <span className="text-teal-500">.</span>Center
          </h1>
        </div>
      </div>

      {/* --- TACTICAL MISSION MODULE (Hero Section) --- */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative p-8 sm:p-12 rounded-[2rem] border border-white/5 bg-slate-900/60 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent skew-x-12 translate-x-1/4"></div>

          <div className="relative z-10 grid grid-cols-1 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/50 border border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Strategic Intel
              </div>
              <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter text-white uppercase leading-none">
                No Active Sessions
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                  Awaiting Orders
                </span>
              </h2>
              <p className="max-w-xl text-sm text-slate-400 font-medium leading-relaxed">
                Tactical analysis suggests your early game economy is
                underperforming. Initiate a session with a Radiant-tier coach to
                stabilize your mid-game transitions.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/dashboard/book"
                  className="px-8 py-4 rounded-xl bg-white text-slate-950 text-xs font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-transform shadow-xl"
                >
                  Initiate Booking
                </Link>
                <button className="px-8 py-4 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-black uppercase tracking-tighter hover:bg-slate-800 transition-colors cursor-pointer">
                  Review VOD Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- METRICS SECTOR --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {role === "user" && (
          <>
            <MetricCard
              title="Tactical Ops"
              value="0"
              subtitle="Scheduled Sessions"
              color="blue"
              sparkline={[30, 40, 35, 50, 45, 60, 55]}
            />
            <MetricCard
              title="Combat Rank"
              value={getRankDisplay()}
              subtitle={intel ? "Riot API Verified" : "Awaiting Verification"}
              color="blue"
              sparkline={[50, 55, 60, 65, 70, 75, 80]}
            />
            <MetricCard
              title="Recent Matches"
              value={intel?.recent_operations?.length || 0}
              subtitle="Last 7 days"
              color="teal"
              sparkline={[20, 30, 60, 40, 70, 50, 80]}
            />
          </>
        )}
        {role === "coach" && (
          <>
            <MetricCard
              title="Incoming Intel"
              value="0"
              subtitle="Pending Inquiries"
              color="blue"
            />
            <MetricCard
              title="Active Ops"
              value="0"
              subtitle="Sessions Scheduled"
              color="teal"
            />
            <MetricCard
              title="Combat Hours"
              value="0.0h"
              subtitle="Monthly Training"
              color="blue"
            />
          </>
        )}
        {role === "admin" && (
          <>
            <MetricCard
              title="Unit Count"
              value="1"
              subtitle="Active Specialists"
              color="blue"
            />
            <MetricCard
              title="Stripe Comms"
              value="0"
              subtitle="Secure Transmissions"
              color="teal"
            />
            <MetricCard
              title="Global Yield"
              value="0.00"
              subtitle="Platform Credits (PLN)"
              color="blue"
            />
          </>
        )}
      </div>

      {/* --- COMMAND MODULES (Secondary content) --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-lg font-black text-white uppercase tracking-widest italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            System Operations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  📘
                </span>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">
                  Manual & Protocol
                </h4>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Access the standard operating procedures for live sessions and
                VOD reviews.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  🛰️
                </span>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">
                  Support Frequency
                </h4>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Direct encrypted line to administrative support for billing or
                technical inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Social / Activity */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-white uppercase tracking-widest italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Live Feed
          </h3>
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/20 backdrop-blur-sm min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-xl grayscale opacity-20">
              📭
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                No Incoming Signal
              </div>
              <div className="text-[8px] font-bold text-slate-600 uppercase mt-1">
                Activity logs are empty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
