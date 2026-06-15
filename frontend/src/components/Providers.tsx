"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Tactical Providers Module
 *
 * Injects session context.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
