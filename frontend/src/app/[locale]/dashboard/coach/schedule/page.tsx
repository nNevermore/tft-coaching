import { Suspense } from "react";
import TacticalSchedule from "@/components/dashboard/TacticalSchedule";
import { getCoachAvailability } from "@/app/actions/coach-schedule";

async function ScheduleContent() {
  const initialSlots = await getCoachAvailability();

  return <TacticalSchedule initialSlots={initialSlots} />;
}

export default function CoachSchedulePage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            Operations / Availability
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
          Tactical
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            Schedule Manager
          </span>
        </h1>
        <p className="max-w-xl text-sm text-slate-400 font-medium leading-relaxed mt-2">
          Define your operational windows for live deployments. Tactical slots
          allow students to assign you to active missions. Select cells to
          toggle availability.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-96 rounded-[2rem] bg-slate-900/20 border border-white/5 animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                Accessing Tactical Grid...
              </span>
            </div>
          </div>
        }
      >
        <ScheduleContent />
      </Suspense>
    </div>
  );
}
