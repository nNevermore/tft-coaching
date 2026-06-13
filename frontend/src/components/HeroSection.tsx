"use client";

import React, { useRef, useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// --- Magnetic Button Component ---
const MagneticButton = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } =
      buttonRef.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2; // 0.2 is the magnetic pull strength
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      href={href}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-300" />
    </Link>
  );
};

// --- Main Hero Section ---
export default function HeroSection() {
  const t = useTranslations("HomePage");

  // 3D Tilt Effect State for the Coach Card
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden perspective-1000">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asymmetric Copy (60%) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-semibold text-blue-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t("discordBadge")}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 animate-pulse-slow">
                  {t("title").split(" ")[0]}
                </span>
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-yellow-800 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]">
                    1-on-1 Coaching
                  </span>
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed font-medium">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <MagneticButton
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 font-extrabold text-sm shadow-[0_0_30px_-5px_rgba(13,148,136,0.4)] border border-teal-500/30 text-white"
              >
                {t("heroCtaBook")}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </MagneticButton>
              <Link
                href="#services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 font-bold text-sm text-slate-300 hover:text-white transition-all text-center backdrop-blur-md"
              >
                {t("heroCtaOffer")}
              </Link>
            </div>
          </div>

          {/* Right Column: Glassmorphic Coach Card (40%) */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative perspective-1000">
            {/* Ambient Background Glow for the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-emerald-600/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" />

            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: "transform 0.1s ease-out",
                transformStyle: "preserve-3d",
              }}
              className="w-full max-w-sm rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 relative overflow-hidden"
            >
              {/* Fake Reflection Line */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"
                style={{ transform: "translateZ(30px)" }}
              />

              <div
                className="flex items-center justify-between mb-6"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Challenger&backgroundColor=1e293b"
                      alt="Coach Avatar"
                      className="w-14 h-14 rounded-full border-2 border-teal-500/50"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      Mismatched
                    </h3>
                    <p className="text-xs font-semibold text-teal-400">
                      Master / Challenger
                    </p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
                  LIVE
                </div>
              </div>

              <div
                className="space-y-4"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 flex justify-between items-center">
                  <span className="text-sm text-slate-400">Win Rate</span>
                  <span className="font-mono font-bold text-emerald-400">
                    68.4%
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 flex justify-between items-center">
                  <span className="text-sm text-slate-400">Next Slot</span>
                  <span className="font-mono font-bold text-slate-200">
                    Today, 20:00
                  </span>
                </div>
              </div>

              {/* Progress Bar visual element */}
              <div
                className="mt-6 pt-4 border-t border-slate-800/50"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Current Session</span>
                  <span className="text-teal-400 animate-pulse">
                    In Progress...
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 w-2/3 rounded-full relative">
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:200%_200%] animate-[shimmer_2s_linear_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
