import { motion } from "framer-motion";
import {
  Download,
  Globe,
  Infinity as InfinityIcon,
  Sparkles,
  Upload,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const ICONS: Record<string, LucideIcon> = {
  infinity: InfinityIcon,
  video: Video,
  sparkles: Sparkles,
  users: Users,
  upload: Upload,
  globe: Globe,
  download: Download,
  zap: Zap,
};

/* Eight things every plan carries. Said once, under the three cards, rather
   than repeated inside each of them - which is what let the cards spend their
   room on the one thing that differs between them, the price. */
export function PlanIncludes() {
  return (
    <motion.div
      variants={stagger(0.04)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="mt-8 rounded-[20px] border border-border bg-white px-4 py-5 shadow-soft sm:px-6"
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold text-ink">
        {subscribe.includesTitle}
      </motion.p>
      {/* The reference draws the eight as ONE row, icon beside a two-line
          label, thin dividers between them. Below lg they fall back to a grid. */}
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3.5 sm:grid-cols-4 lg:flex lg:items-stretch lg:gap-0 lg:divide-x lg:divide-border-soft">
        {subscribe.includes.map((it) => {
          const Icon = ICONS[it.icon];
          return (
            <motion.li key={it.label} variants={fadeUp} className="flex items-center gap-2 lg:flex-1 lg:justify-center lg:px-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <span className="min-w-0 text-[11px] font-medium leading-tight text-ink-2">{it.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
