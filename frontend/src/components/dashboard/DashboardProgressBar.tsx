"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Dashboard Navigation Progress Bar
 *
 * Visual indicator shown during route transitions within the dashboard.
 */
export default function DashboardProgressBar() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-500 z-[100] origin-left pointer-events-none"
      />
    </AnimatePresence>
  );
}
