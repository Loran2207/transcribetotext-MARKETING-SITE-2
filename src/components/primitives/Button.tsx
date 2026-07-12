import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SPRING } from "../../lib/motion";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] text-white shadow-blue ring-1 ring-inset ring-white/20 hover:brightness-[1.05]",
  outline: "border border-border bg-white text-ink shadow-soft hover:border-accent/40 hover:bg-surface-soft",
  ghost: "text-ink-2 hover:bg-ink/5 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

const MotionLink = motion(Link);

export function Button({
  children,
  href = "#",
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all ${variants[variant]} ${sizes[size]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <MotionLink to={href} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={SPRING} className={cls}>
        {children}
      </MotionLink>
    );
  }
  return (
    <motion.a href={href} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={SPRING} className={cls}>
      {children}
    </motion.a>
  );
}
