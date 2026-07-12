import { motion } from "framer-motion";
import { ArrowRight, Check, Infinity as InfinityIcon, Zap, ShieldCheck, Target } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionCutout } from "../primitives/SectionCutout";
import { Waveform } from "../primitives/Waveform";
import { StarField } from "../mocks/StarField";
import { CosmicGlow } from "../mocks/CosmicGlow";
import { finalCta } from "../../data/content";
import { EASE_OUT, blurIn, fadeUp, stagger, tiltUp, viewportOnce, SPRING } from "../../lib/motion";

const ICONS = [InfinityIcon, Zap, ShieldCheck, Target];

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-dark-atmosphere py-24 md:py-28">
      <SectionCutout />
      <StarField />
      <CosmicGlow variant="beam" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[130px]" />
      <motion.div aria-hidden="true" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <Container className="relative">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.h2 variants={blurIn} className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink-invert md:text-[52px]">{finalCta.title}</motion.h2>
          <motion.a variants={fadeUp} href="#pricing" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={SPRING} className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-accent shadow-lift">
            {finalCta.cta} <ArrowRight size={18} />
          </motion.a>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {finalCta.trust.map((t) => (<span key={t} className="flex items-center gap-1.5 text-sm text-muted-invert"><Check size={15} className="text-accent-glow" /> {t}</span>))}
          </motion.div>
        </motion.div>
        <motion.div variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ transformStyle: "preserve-3d" }}>
          {finalCta.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={it.title} variants={tiltUp} className="rounded-card border border-white/10 surface-dark p-5 text-left">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent-glow ring-1 ring-inset ring-white/10"><Icon size={22} strokeWidth={1.6} /></span>
                <p className="mt-4 text-sm font-semibold text-ink-invert">{it.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-invert">{it.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
      <motion.div initial={{ opacity: 0, filter: "blur(6px)" }} whileInView={{ opacity: 0.7, filter: "blur(0px)" }} viewport={viewportOnce} transition={{ duration: 0.9, ease: EASE_OUT }} className="relative mx-auto mt-16 max-w-5xl px-6"><Waveform bars={72} height={30} color="accent" /></motion.div>
    </section>
  );
}
