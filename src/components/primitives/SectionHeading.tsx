import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const alignClass = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";
  return (
    <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className={`flex max-w-2xl flex-col gap-3 sm:gap-4 ${alignClass} ${className}`}>
      {eyebrow ? (
        <motion.span variants={fadeUp} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${dark ? "border-white/15 bg-white/5 text-accent-glow" : "border-border bg-white text-accent shadow-soft"}`}>
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2 variants={fadeUp} className={`text-balance font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl md:text-[44px] md:leading-[1.08] ${dark ? "text-ink-invert" : "text-ink"}`}>
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p variants={fadeUp} className={`text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-muted-invert" : "text-ink-2"}`}>
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
