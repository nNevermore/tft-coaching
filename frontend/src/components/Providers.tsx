"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Tactical Providers Module
 *
 * Injects session context and global UI features like the
 * top-level route loading indicator.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SessionProvider>
      {/* Global Progress Bar (Top) - Key-based reset */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-500 z-[100] origin-left pointer-events-none"
        />
      </AnimatePresence>

      {children}
    </SessionProvider>
  );
}
