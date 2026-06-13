"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MissionLogs from "@/components/dashboard/MissionLogs";

function LessonsPageContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            Intelligence / Mission History
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
          Mission
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Intelligence Hub
          </span>
        </h1>
        <p className="max-w-xl text-sm text-slate-400 font-medium leading-relaxed mt-2">
          Access past operation archives, strategic intel reports, and upcoming
          deployment schedules. Signal encryption active.
        </p>
      </div>

      <MissionLogs isSuccess={isSuccess} />
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1 uppercase">
            Accessing Archives...
          </h1>
          <div className="h-64 bg-slate-900/20 rounded-[2rem] border border-white/5 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <LessonsPageContent />
    </Suspense>
  );
}
