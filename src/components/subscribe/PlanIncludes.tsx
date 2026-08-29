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
      className="mt-8 rounded-[20px] border border-border-soft bg-surface-soft px-4 py-5 sm:px-6"
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold text-ink">
        {subscribe.includesTitle}
      </motion.p>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3.5 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-2">
        {subscribe.includes.map((it) => {
          const Icon = ICONS[it.icon];
          return (
            <motion.li key={it.label} variants={fadeUp} className="flex items-center gap-2 lg:flex-col lg:gap-1.5 lg:text-center">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-soft">
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <span className="text-[11px] font-medium leading-tight text-ink-2 lg:text-[11px]">{it.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
