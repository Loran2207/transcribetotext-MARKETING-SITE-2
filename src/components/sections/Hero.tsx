import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives/Button";
import { TopWave } from "../primitives/TopWave";
import { GlowBackground } from "../primitives/GlowBackground";
import { MeetingHeroMock } from "../mocks/MeetingHeroMock";
import { hero } from "../../data/content";
import { EASE_OUT, fadeUp, stagger } from "../../lib/motion";

/* V1's hero composition, carrying the brief's content: everything centered,
   and the product itself full-width underneath - the layout Kirill pointed
   back to. The wash, the grid and the waveform strip are V1's own pieces. */

const GRID_MASK = "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 38%, transparent 72%)";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-wash pt-32 pb-14 md:pt-36 md:pb-20">
      <div
        aria-hidden
        className="bg-grid-lines pointer-events-none absolute inset-0"
        style={{ WebkitMaskImage: GRID_MASK, maskImage: GRID_MASK }}
      />
      <TopWave />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.div variants={stagger(0.09)} initial="hidden" animate="show" className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-accent shadow-soft"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance font-display text-[36px] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[48px] md:text-[56px]"
          >
            {hero.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-2 md:text-xl">
            {hero.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-2.5">
            <Button href="/subscribe" size="lg">
              {hero.primaryCta} <ArrowRight size={18} />
            </Button>
            <span className="text-[13px] text-muted">{hero.ctaNote}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.85, ease: EASE_OUT }}
          className="relative mx-auto mt-12 w-full max-w-[1120px] md:mt-14"
        >
          <GlowBackground className="inset-x-0 -top-10 bottom-6 opacity-90" intensity="lg" />
          <div className="relative">
            <MeetingHeroMock />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
