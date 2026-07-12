import { motion } from "framer-motion";
import { Stars } from "../primitives/Stars";
import { subscribe } from "../../data/subscribe";
import { brand } from "../../data/assets";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../../lib/motion";

// Light wall of love: reuses the landing Testimonials card language (white page,
// soft tinted cards, gold stars). Export name kept for drop-in compatibility.
export function DarkFeedback() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="flex flex-col items-center gap-3 text-center">
          <motion.h2 variants={fadeUp} className="text-balance font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{subscribe.feedbacksTitle}</motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl text-pretty text-sm leading-relaxed text-ink-2">{subscribe.feedbacksSub}</motion.p>
        </motion.div>
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 grid items-stretch gap-5 sm:grid-cols-3">
          {subscribe.feedbacks.map((f) => (
            <motion.figure
              key={f.name}
              variants={scaleIn}
              className="flex flex-col items-center rounded-[24px] border border-border-soft bg-surface-soft px-6 py-7 text-center transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <img src={brand.avatars[f.avatar]} alt="" className="size-16 rounded-full object-cover shadow-soft ring-4 ring-white" />
              <Stars count={5} className="mt-3" />
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-2">{f.quote}</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-ink">{f.name}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
