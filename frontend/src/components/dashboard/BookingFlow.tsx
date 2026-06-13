"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Link } from "@/i18n/routing";

// --- Types ---
type Step = "SERVICE" | "COACH" | "TIME" | "CONFIRM";
type ServiceType = "live" | "vod";

interface Coach {
  id: string;
  name: string;
  rank: string;
  specialty: string;
  avatar: string;
  winRate: string;
}

const COACHES: Coach[] = [
  {
    id: "c1",
    name: "Mismatched",
    rank: "Radiant",
    specialty: "Early Game & Econ",
    avatar: "Mismatched",
    winRate: "68%",
  },
  {
    id: "c2",
    name: "TFT_Enthusiast",
    rank: "Challenger",
    specialty: "Late Game Comps",
    avatar: "Enthusiast",
    winRate: "64%",
  },
];

const SLOTS = [
  { id: "s1", time: "18:00", status: "available" },
  { id: "s2", time: "19:00", status: "available" },
  { id: "s3", time: "20:00", status: "locked" },
  { id: "s4", time: "21:00", status: "available" },
];

// --- Sub-components ---
const TacticalStepHeader = ({
  current,
  total,
  title,
}: {
  current: number;
  total: number;
  title: string;
}) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 w-8 rounded-full transition-all duration-500 ${i < current ? "bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.5)]" : "bg-slate-800"}`}
        />
      ))}
    </div>
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
      Phase 0{current}: {title}
    </span>
  </div>
);

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const isCancelled = searchParams.get("cancelled") === "true";

  const [step, setStep] = useState<Step>("SERVICE");
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Actions ---
  const handleServiceSelect = (type: ServiceType) => {
    setSelectedService(type);
    setStep("COACH");
  };

  const handleCoachSelect = (coach: Coach) => {
    setSelectedCoach(coach);
    setStep("TIME");
  };

  const handleSlotSelect = (id: string) => {
    setSelectedSlot(id);
    setStep("CONFIRM");
  };

  const handleCheckout = async () => {
    if (!selectedService) return;
    setIsProcessing(true);
    try {
      const res = await createCheckoutSession(selectedService);
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[500px] flex flex-col">
      {/* Notifications */}
      {isCancelled && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
          ⚠️ Mission Aborted: Payment Cancelled. Signal Restored.
        </div>
      )}

      {/* --- PHASE 1: SERVICE SELECTION --- */}
      {step === "SERVICE" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TacticalStepHeader current={1} total={4} title="Mission Type" />
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-8">
            Select Objective
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleServiceSelect("live")}
              className="group relative p-8 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 hover:border-blue-500/30 transition-all text-left cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">
                🎮
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 uppercase tracking-widest mb-4">
                Tactical Live
              </span>
              <h3 className="text-2xl font-black text-white uppercase italic group-hover:text-blue-400 transition-colors">
                Live Coaching
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                Real-time oversight during your active combat session. Instant
                feedback on economy and positioning.
              </p>
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-lg font-black text-white">
                  120.00 PLN
                </span>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  Select Target →
                </span>
              </div>
            </button>

            <button
              onClick={() => handleServiceSelect("vod")}
              className="group relative p-8 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 hover:border-teal-500/30 transition-all text-left cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">
                📼
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-[8px] font-black text-teal-400 uppercase tracking-widest mb-4">
                Post-Action Review
              </span>
              <h3 className="text-2xl font-black text-white uppercase italic group-hover:text-teal-400 transition-colors">
                VOD Analysis
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">
                Deep-dive into recorded operations. Full report on fundamental
                errors and strategic gaps.
              </p>
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-lg font-black text-white">80.00 PLN</span>
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                  Select Target →
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* --- PHASE 2: COACH SELECTION --- */}
      {step === "COACH" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <TacticalStepHeader current={2} total={4} title="Assign Specialist" />
          <button
            onClick={() => setStep("SERVICE")}
            className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest mb-6 transition-colors"
          >
            ← Change Objective
          </button>
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-8">
            Specialist Dossier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COACHES.map((coach) => (
              <button
                key={coach.id}
                onClick={() => handleCoachSelect(coach)}
                className="group relative p-6 rounded-3xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 hover:border-white/20 transition-all text-left cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${coach.avatar}&backgroundColor=1e293b`}
                      alt={coach.name}
                      className="w-16 h-16 rounded-2xl border-2 border-white/5"
                    />
                    <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-[8px] font-black text-teal-400">
                      {coach.winRate} WR
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-teal-500 uppercase tracking-widest">
                      {coach.rank} Specialist
                    </div>
                    <h3 className="text-xl font-black text-white uppercase italic">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold mt-1 uppercase">
                      {coach.specialty}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- PHASE 3: TIME SLOT SELECTION --- */}
      {step === "TIME" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <TacticalStepHeader
            current={3}
            total={4}
            title="Operational Window"
          />
          <button
            onClick={() => setStep("COACH")}
            className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest mb-6 transition-colors"
          >
            ← Change Specialist
          </button>
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-8">
            Tactical Grid
          </h2>
          <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">
              Today / Current Sector
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  disabled={slot.status !== "available"}
                  onClick={() => handleSlotSelect(slot.id)}
                  className={`p-4 rounded-xl border font-mono text-sm transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    slot.status === "available"
                      ? "border-white/5 bg-slate-950/40 text-white hover:border-teal-500/50 hover:bg-teal-500/5"
                      : "border-red-900/20 bg-red-950/10 text-red-900 opacity-40 cursor-not-allowed"
                  }`}
                >
                  <span className="font-bold">{slot.time}</span>
                  <span className="text-[8px] uppercase tracking-tighter font-black">
                    {slot.status === "available"
                      ? "Available"
                      : "Target Locked"}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Awaiting selection of operational window.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --- PHASE 4: FINAL CONFIRMATION --- */}
      {step === "CONFIRM" && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <TacticalStepHeader current={4} total={4} title="Final Briefing" />
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-8">
            Mission Summary
          </h2>

          <div className="relative p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl overflow-hidden">
            {/* Tactical overlay */}
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <svg
                className="w-32 h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <div className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Objective
                  </div>
                  <div className="text-sm font-black text-white uppercase italic">
                    {selectedService === "live"
                      ? "Live Coaching"
                      : "VOD Review"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Specialist
                  </div>
                  <div className="text-sm font-black text-white uppercase italic">
                    {selectedCoach?.name}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Window
                  </div>
                  <div className="text-sm font-black text-white uppercase italic">
                    Today, {SLOTS.find((s) => s.id === selectedSlot)?.time}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Total Transaction Value
                </span>
                <span className="text-2xl font-black text-teal-400 italic">
                  {selectedService === "live" ? "120.00" : "80.00"} PLN
                </span>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleCheckout}
                className="relative w-full group overflow-hidden py-5 rounded-2xl bg-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 transition-opacity duration-500 ${isProcessing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                ></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span className="text-xs font-black uppercase tracking-tighter text-white">
                        Authorizing Encryption...
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 text-slate-950 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="text-xs font-black uppercase tracking-tighter text-slate-950 group-hover:text-white transition-colors">
                        Authorize Mission Payment
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
          <button
            onClick={() => setStep("TIME")}
            className="w-full text-center mt-6 text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest transition-colors"
          >
            ← Review Operational Window
          </button>
        </div>
      )}
    </div>
  );
}
