"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Tactical Page Transition Wrapper
 *
 * Provides smooth opacity and vertical slide transitions between sectors.
 * Ensures a seamless SPA-like feeling.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1], // Custom tactical cubic-bezier
      }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
