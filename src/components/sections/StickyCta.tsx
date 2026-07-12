import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stickyCta } from "../../data/content";

const MotionLink = motion(Link);

// A floating, levitating pill CTA pinned to the bottom on every screen.
// It fades up after a little scroll and gently bobs (motion honors reduced-motion).
export function StickyCta() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [140, 360], [0, 1]);
  const lift = useTransform(scrollY, [140, 360], [28, 0]);
  const reduce = useReducedMotion();
  return (
    <motion.div style={{ opacity, y: lift }} className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <MotionLink
        to={stickyCta.href}
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={reduce ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto inline-flex h-14 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] px-9 text-base font-semibold text-white ring-1 ring-inset ring-white/25 transition-[filter] hover:brightness-[1.06]"
        style={{ boxShadow: "0 14px 44px rgba(37,99,235,0.55), 0 2px 8px rgba(37,99,235,0.4)" }}
      >
        {stickyCta.label} <ArrowRight size={18} />
      </MotionLink>
    </motion.div>
  );
}
