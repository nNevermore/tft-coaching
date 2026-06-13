import { Suspense } from "react";
import BookingFlow from "@/components/dashboard/BookingFlow";

export default function BookPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            Operations / Deployment
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
          Tactical
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Booking System
          </span>
        </h1>
        <p className="max-w-xl text-sm text-slate-400 font-medium leading-relaxed mt-2">
          Secure an operational window with elite tactical specialists. Select
          your objective, assign a unit, and authorize deployment.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-96 rounded-[2rem] bg-slate-900/20 border border-white/5 animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                Decrypting Interface...
              </span>
            </div>
          </div>
        }
      >
        <BookingFlow />
      </Suspense>
    </div>
  );
}
