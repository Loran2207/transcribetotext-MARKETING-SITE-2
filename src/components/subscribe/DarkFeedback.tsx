import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionCutout } from "../primitives/SectionCutout";
import { StarField } from "../mocks/StarField";
import { HeartGlow } from "../mocks/HeartGlow";
import { subscribe } from "../../data/subscribe";
import { brand } from "../../data/assets";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../../lib/motion";

// Reuses the dark "wall of love" language from the landing Reviews, in blue.
export function DarkFeedback() {
  return (
    <section className="relative overflow-hidden bg-dark-atmosphere py-20">
      <SectionCutout fill="#FFFFFF" />
      <StarField />
      <HeartGlow className="left-1/2 top-[-30px] -translate-x-1/2" />
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="flex flex-col items-center gap-3 text-center">
          <motion.h2 variants={fadeUp} className="text-balance font-display text-3xl font-semibold tracking-tight text-ink-invert sm:text-4xl">{subscribe.feedbacksTitle}</motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl text-pretty text-sm leading-relaxed text-muted-invert">{subscribe.feedbacksSub}</motion.p>
        </motion.div>
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 grid items-start gap-5 sm:grid-cols-3">
          {subscribe.feedbacks.map((f) => (
            <motion.figure key={f.name} variants={scaleIn} whileHover={{ y: -4 }} className="rounded-tile border border-white/10 surface-dark p-6 transition-colors hover:border-white/20">
              <div className="flex items-center gap-3">
                <img src={brand.avatars[f.avatar]} alt="" className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink-invert">{f.name}</p>
                  <div className="mt-0.5 flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={11} fill="currentColor" />)}</div>
                </div>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink-invert/85">{f.quote}</blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
