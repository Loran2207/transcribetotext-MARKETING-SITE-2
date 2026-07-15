import { motion } from "framer-motion";
import { Stars } from "../primitives/Stars";
import { subscribe } from "../../data/subscribe";
import { PAYWALL_HEADING } from "./headings";
import { fadeUp, scaleIn, stagger, viewportOnce } from "../../lib/motion";

// Wall of love. No avatars (the original app has none): name on top, then stars,
// then the quote. Export name kept for drop-in compatibility.
export function DarkFeedback() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="flex flex-col items-center gap-3 text-center">
          <motion.h2 variants={fadeUp} className={PAYWALL_HEADING}>{subscribe.feedbacksTitle}</motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl text-pretty text-sm leading-relaxed text-ink-2">{subscribe.feedbacksSub}</motion.p>
        </motion.div>
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-8 grid items-stretch gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {subscribe.feedbacks.map((f) => (
            <motion.figure
              key={f.name}
              variants={scaleIn}
              className="flex flex-col items-center rounded-[24px] border border-border-soft bg-surface-soft px-5 py-7 text-center transition hover:-translate-y-0.5 hover:shadow-card lg:px-6 lg:py-8"
            >
              <figcaption className="font-display text-base font-bold text-ink">{f.name}</figcaption>
              <Stars count={5} className="mt-2.5" />
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-2">{f.quote}</blockquote>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
