import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink-2 shadow-soft transition-colors hover:border-accent/40 hover:text-ink ${className}`}
    >
      {children}
    </motion.span>
  );
}
