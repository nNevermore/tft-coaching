"use client";

import React, { useState } from "react";
import { toggleAvailabilitySlot } from "@/app/actions/coach-schedule";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 9); // 9:00 to 22:00

interface Slot {
  id?: string;
  startTime: Date | string;
  isBooked: boolean;
}

export default function TacticalSchedule({
  initialSlots,
}: {
  initialSlots: Slot[];
}) {
  const [activeSlots, setActiveSlots] = useState<Slot[]>(initialSlots);
  const [isPending, setIsPending] = useState(false);

  const isSlotActive = (dayIdx: number, hour: number) => {
    // Logic to find if a slot for this day/hour exists in activeSlots
    // This is a simplified mock-logic for the grid visualization
    return activeSlots.some((s) => {
      const d = new Date(s.startTime);
      return d.getDay() === (dayIdx + 1) % 7 && d.getHours() === hour;
    });
  };

  const handleToggle = async (dayIdx: number, hour: number) => {
    if (isPending) return;
    setIsPending(true);

    const now = new Date();
    const targetDate = new Date();
    // Calculate date for the specific day of this week
    const currentDay = now.getDay();
    const diff = dayIdx + 1 - (currentDay === 0 ? 7 : currentDay);
    targetDate.setDate(now.getDate() + diff);
    targetDate.setHours(hour, 0, 0, 0);

    const endTime = new Date(targetDate);
    endTime.setHours(hour + 1);

    const res = await toggleAvailabilitySlot(targetDate, endTime);

    if (res.success) {
      // Local state update for immediate feedback
      // In a real app, revalidatePath would handle this, but for UX we can toggle locally
      setActiveSlots((prev) => {
        const exists = isSlotActive(dayIdx, hour);
        if (exists) {
          return prev.filter((s) => {
            const d = new Date(s.startTime);
            return !(d.getDay() === (dayIdx + 1) % 7 && d.getHours() === hour);
          });
        } else {
          return [...prev, { startTime: targetDate, isBooked: false }];
        }
      });
    }

    setIsPending(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Legend & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Available
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-800"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Off Duty
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500/40"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Booked
            </span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-teal-400 uppercase tracking-widest animate-pulse">
          Signal: Encrypted
        </div>
      </div>

      {/* Grid Matrix */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Header: Days */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="col-span-1"></div>
            {DAYS.map((day) => (
              <div key={day} className="text-center">
                <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">
                  {day}
                </div>
              </div>
            ))}
          </div>

          {/* Rows: Hours */}
          <div className="space-y-2">
            {HOURS.map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-2">
                <div className="col-span-1 flex items-center justify-end pr-4">
                  <span className="text-[10px] font-mono text-slate-500">
                    {hour}:00
                  </span>
                </div>
                {DAYS.map((_, dayIdx) => {
                  const active = isSlotActive(dayIdx, hour);
                  return (
                    <button
                      key={`${dayIdx}-${hour}`}
                      onClick={() => handleToggle(dayIdx, hour)}
                      className={`h-12 rounded-lg border transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                        active
                          ? "bg-teal-500/10 border-teal-500/40 text-teal-400 shadow-[inset_0_0_12px_rgba(45,212,191,0.1)]"
                          : "bg-slate-900/20 border-white/5 hover:border-white/20"
                      }`}
                    >
                      {active ? (
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] font-black uppercase tracking-tighter">
                            Active
                          </span>
                          <div className="w-1 h-1 rounded-full bg-teal-400 animate-ping mt-1"></div>
                        </div>
                      ) : (
                        <span className="text-[8px] font-bold text-slate-700 uppercase group-hover:text-slate-400 transition-colors">
                          Select
                        </span>
                      )}

                      {/* Hover highlight */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Override Status */}
      <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">
        <span>Node: Schedule_Manager_v4</span>
        <span>Security: Class-A Clearance</span>
      </div>
    </div>
  );
}
