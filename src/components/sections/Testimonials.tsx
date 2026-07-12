import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionCutout } from "../primitives/SectionCutout";
import { StarField } from "../mocks/StarField";
import { HeartGlow } from "../mocks/HeartGlow";
import { Stars } from "../primitives/Stars";
import { testimonials } from "../../data/content";
import { brand } from "../../data/assets";
import { EASE_OUT, fadeLeft, fadeRight, fadeUp, stagger, viewportOnce } from "../../lib/motion";

const handle = (u: string) => "@" + u.toLowerCase().replace(/[^a-z0-9]/g, "");

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-dark-atmosphere py-20 md:py-28">
      <SectionCutout />
      <StarField />
      <HeartGlow className="left-1/2 top-[-40px] -translate-x-1/2" />
      <motion.div aria-hidden="true" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <Container className="relative">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="flex flex-col items-center gap-3 text-center">
          <motion.span variants={fadeUp} className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-accent-glow">Reviews</motion.span>
          <motion.h2 variants={fadeUp} className="text-balance font-display text-3xl font-semibold tracking-[-0.02em] text-ink-invert sm:text-4xl md:text-[44px] md:leading-[1.08]">{testimonials.title}</motion.h2>
          <motion.div variants={fadeUp} className="flex items-center gap-2"><Stars count={5} /><span className="text-sm text-muted-invert">{testimonials.rating}</span></motion.div>
        </motion.div>
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => {
            const variant = i % 3 === 0 ? fadeLeft : i % 3 === 2 ? fadeRight : fadeUp;
            return (
              <motion.figure
                key={t.user}
                variants={variant}
                whileHover={{ y: -4 }}
                className="group break-inside-avoid rounded-tile border border-white/10 surface-dark p-6 transition-colors hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <img src={brand.avatars[t.avatar]} alt="" className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15" />
                  <div className="leading-tight">
                    <span className="flex items-center gap-1 text-sm font-semibold text-ink-invert">{t.user}<BadgeCheck size={14} className="text-accent-glow" /></span>
                    <span className="text-[12px] text-muted-invert">{handle(t.user)}</span>
                  </div>
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-invert/85">{t.quote}</blockquote>
              </motion.figure>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
