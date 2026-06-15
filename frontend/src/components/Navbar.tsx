"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params.locale as string) || "en";

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- Sliding Indicator Logic ---
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const parentRect = navRef.current?.getBoundingClientRect();

    if (parentRect) {
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const toggleLocale = () => {
    const nextLocale = currentLocale === "pl" ? "en" : "pl";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled
        ? "py-2 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        : "py-4 bg-transparent border-b border-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between relative">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Logo size="sm" variant="glow" />
              <span className="hidden sm:block text-lg font-black tracking-tighter text-white">
                TFT-COACHING<span className="text-teal-500">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation with Sliding Indicator */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div
              ref={navRef}
              className="relative flex items-center bg-slate-900/40 border border-white/5 rounded-full px-2 py-1 backdrop-blur-md"
            >
              {/* The Sliding Highlight */}
              <div
                className="absolute h-8 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                }}
              />

              {[
                { name: t("home"), href: "/" },
                { name: t("faq"), href: "/faq" },
                { name: t("contact"), href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`relative z-10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${pathname === link.href
                    ? "text-teal-400"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions: Locale & Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* Minimalist Locale Switcher */}
            <button
              onClick={toggleLocale}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-slate-500 group-hover:text-teal-400 uppercase">
                {currentLocale}
              </span>
              <div className="w-4 h-px bg-slate-700 group-hover:bg-teal-500/50 transition-colors"></div>
              <span className="text-xs font-bold text-slate-300 uppercase">
                {currentLocale === "en" ? "pl" : "en"}
              </span>
            </button>

            <div className="h-6 w-px bg-slate-800 mx-1"></div>

            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                  {t("dashboard")}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 rounded-full bg-red-500/5 border border-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                  title={t("logout")}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="relative group overflow-hidden px-6 py-2 rounded-full bg-white text-slate-950 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">{t("login")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with glassmorphism */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 py-8 px-4 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {[
              { name: t("home"), href: "/" },
              { name: t("faq"), href: "/faq" },
              { name: t("contact"), href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold tracking-tight ${pathname === link.href ? "text-teal-400" : "text-slate-500"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
            <button
              onClick={toggleLocale}
              className="text-sm font-bold text-slate-400 flex items-center gap-2"
            >
              🌐 SWITCH TO {currentLocale === "en" ? "POLISH" : "ENGLISH"}
            </button>
            {session ? (
              <Link
                href="/dashboard"
                className="w-full py-4 bg-slate-900 border border-slate-800 rounded-xl text-center font-bold"
              >
                DASHBOARD
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full py-4 bg-white text-slate-950 rounded-xl text-center font-bold"
              >
                GET STARTED
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
