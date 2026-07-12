import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Stars } from "../primitives/Stars";
import { socialProof } from "../../data/content";
import { brand } from "../../data/assets";
import { blurIn, viewportOnce } from "../../lib/motion";

const CLUSTER = [0, 1, 2, 3];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden bg-canvas py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.figure
          variants={blurIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-tile border border-border bg-white px-8 py-12 text-center shadow-lift md:px-16 md:py-16"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 h-44 w-3/5 -translate-x-1/2 rounded-full bg-accent-soft opacity-70 blur-[70px]" />
          <div className="relative">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent"><Quote size={22} /></span>
            <div className="mt-6 flex justify-center"><Stars count={5} /></div>
            <blockquote className="mt-5 text-balance font-display text-2xl font-medium leading-snug tracking-tight text-ink md:text-[32px] md:leading-[1.28]">{socialProof.quote}</blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {CLUSTER.map((i) => (
                  <img key={i} src={brand.avatars[i]} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-ink">Loved by 55k+ people</p>
                <p className="text-sm text-ink-2">{socialProof.rating} {socialProof.ratingLabel}</p>
              </div>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
