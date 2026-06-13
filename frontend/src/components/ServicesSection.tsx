"use client";

import React, { useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// --- Mouse Tracking Spotlight Card Wrapper ---
const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-colors hover:border-slate-700/80 group ${className}`}
    >
      {/* Spotlight Effect overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(45,212,191,0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

export default function ServicesSection() {
  const t = useTranslations("HomePage");

  return (
    <section
      id="services"
      className="py-24 border-t border-slate-900 bg-slate-950/20 relative z-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left md:text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">
            {t("servicesTitle")}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t("servicesSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Live Coaching */}
          <SpotlightCard className="flex flex-col justify-between h-full min-h-[380px]">
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {t("serviceLiveTitle")}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("serviceLiveDesc")}
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800/60 flex items-center justify-between relative z-10">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Starting at
                </span>
                <span className="text-lg font-bold text-white">120.00 PLN</span>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-400 hover:text-blue-300 transition-colors group/link"
              >
                {t("heroCtaBook")}
                <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </SpotlightCard>

          {/* Card 2: VOD Review */}
          <SpotlightCard className="flex flex-col justify-between h-full min-h-[380px]">
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-6 h-6 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {t("serviceVodTitle")}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("serviceVodDesc")}
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800/60 flex items-center justify-between relative z-10">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Flat rate
                </span>
                <span className="text-lg font-bold text-white">80.00 PLN</span>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-teal-400 hover:text-teal-300 transition-colors group/link"
              >
                {t("heroCtaBook")}
                <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </SpotlightCard>

          {/* Card 3: Community / Discord */}
          <SpotlightCard className="flex flex-col justify-between h-full min-h-[380px]">
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-6 h-6 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {t("serviceTeamTitle")}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t("serviceTeamDesc")}
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800/60 flex items-center justify-between relative z-10">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Access
                </span>
                <span className="text-lg font-bold text-white">
                  Free Forever
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-teal-400 hover:text-teal-300 transition-colors group/link"
              >
                Join Server
                <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
