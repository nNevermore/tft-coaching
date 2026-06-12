"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full py-2.5 px-4 rounded-lg bg-slate-850 hover:bg-red-950/40 hover:text-red-400 font-medium text-sm text-slate-400 transition-all border border-slate-800/80 hover:border-red-900/30 cursor-pointer flex items-center justify-center gap-2"
    >
      <span>🚪 Wyloguj się</span>
    </button>
  );
}
