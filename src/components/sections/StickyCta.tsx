import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stickyCta } from "../../data/content";

const MotionLink = motion(Link);

// Full-width white bar pinned to the bottom with one huge centered
// Continue button, always visible (mirrors the live site's bottom bar).
export function StickyCta() {
  const reduce = useReducedMotion();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:py-4 md:pb-4"
      style={{ boxShadow: "0 -10px 34px rgba(16,24,40,.10)" }}
    >
      <div className="flex justify-center">
        <MotionLink
          to={stickyCta.href}
          whileTap={reduce ? undefined : { scale: 0.985 }}
          className="flex h-12 w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] text-base font-semibold text-white shadow-blue ring-1 ring-inset ring-white/25 transition hover:brightness-[1.05] md:h-14"
        >
          {stickyCta.label} <ArrowRight size={18} />
        </MotionLink>
      </div>
    </div>
  );
}
