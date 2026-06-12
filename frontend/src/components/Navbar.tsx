"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
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

  const toggleLocale = () => {
    const nextLocale = currentLocale === "pl" ? "en" : "pl";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                TFT
              </span>
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 text-transparent bg-clip-text">
                {t("logo")}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-white cursor-pointer ${
                pathname === "/" ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium transition-colors hover:text-white cursor-pointer ${
                pathname === "/faq" ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {t("faq")}
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-white cursor-pointer ${
                pathname === "/contact" ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {t("contact")}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 uppercase"
            >
              🌐 {currentLocale}
            </button>

            {/* Auth Buttons */}
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-sm font-bold text-slate-200 transition-all cursor-pointer"
                >
                  {t("dashboard")}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-sm font-bold text-red-400 hover:text-red-300 transition-all cursor-pointer"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-sm font-extrabold text-white transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                {t("login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLocale}
              className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/40 text-xs font-semibold text-slate-300 uppercase cursor-pointer"
            >
              {currentLocale}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              pathname === "/"
                ? "bg-slate-900 text-blue-400"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("home")}
          </Link>
          <Link
            href="/faq"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              pathname === "/faq"
                ? "bg-slate-900 text-blue-400"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("faq")}
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              pathname === "/contact"
                ? "bg-slate-900 text-blue-400"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            {t("contact")}
          </Link>

          <div className="pt-4 border-t border-slate-900 space-y-2">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-slate-200"
                >
                  {t("dashboard")}
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm font-bold text-red-400 cursor-pointer"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-sm font-bold text-white shadow-md shadow-blue-500/10"
              >
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
