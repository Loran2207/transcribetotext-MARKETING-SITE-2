import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives/Button";
import { HeroChips, MeetingHeroMock } from "../mocks/MeetingHeroMock";
import { hero } from "../../data/content";
import { fadeUp, stagger } from "../../lib/motion";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-canvas pt-28 pb-16 md:pt-[120px] md:pb-20 lg:pb-24">
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-12"
        >
          <div className="text-left">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-accent shadow-soft"
            >
              {hero.eyebrow}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-balance font-display text-[32px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[40px] lg:text-[43px]"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[520px] text-pretty text-base leading-relaxed text-ink-2 md:text-lg"
            >
              {hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-start gap-2.5">
              <Button href="/subscribe" size="lg">
                {hero.primaryCta} <ArrowRight size={18} />
              </Button>
              <span className="text-[13px] text-muted">{hero.ctaNote}</span>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="min-w-0">
            <MeetingHeroMock />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 lg:mt-10"
        >
          <HeroChips />
        </motion.div>
      </div>
    </section>
  );
}
