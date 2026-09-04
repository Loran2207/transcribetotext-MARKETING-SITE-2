import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../primitives/Button";
import { TopWave } from "../primitives/TopWave";
import { GlowBackground } from "../primitives/GlowBackground";
import { MeetingHeroMock } from "../mocks/MeetingHeroMock";
import { hero } from "../../data/content";
import { EASE_OUT, fadeUp, stagger } from "../../lib/motion";
import { PAGE_TITLE } from "../../lib/typography";

/* The composition the brief's own references share (Rev, Granola, Amberscript):
   the words on the LEFT, the product on the RIGHT. V1's atmosphere - the
   waveform strip, the wash, the faint grid - stays underneath. */

const GRID_MASK = "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 38%, transparent 72%)";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-wash pt-32 pb-16 md:pt-36 md:pb-20">
      <div
        aria-hidden
        className="bg-grid-lines pointer-events-none absolute inset-0"
        style={{ WebkitMaskImage: GRID_MASK, maskImage: GRID_MASK }}
      />
      <TopWave />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <motion.div variants={stagger(0.09)} initial="hidden" animate="show" className="text-left">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-accent shadow-soft"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className={`mt-6 text-ink ${PAGE_TITLE}`}
            >
              <span className="block">{hero.titleLine1}</span>
              {hero.titleLine2}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-[520px] text-pretty text-lg leading-relaxed text-ink-2">
              {hero.subtitle}
            </motion.p>
            {/* The note is centred UNDER the button, not left-aligned with the
                column: the button is wider than the line, so aligning both to
                the left edge left the note hanging off to one side (client,
                round 20). w-max sizes the pair to the button. */}
            <motion.div variants={fadeUp} className="mt-8 flex w-max flex-col items-center gap-2.5">
              <Button href="/subscribe" size="lg">
                {hero.primaryCta} <ArrowRight size={18} />
              </Button>
              <span className="text-[13px] text-muted">{hero.ctaNote}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
            className="relative min-w-0"
          >
            <GlowBackground className="-inset-x-8 -top-10 bottom-0 opacity-90" intensity="lg" />
            <MeetingHeroMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
