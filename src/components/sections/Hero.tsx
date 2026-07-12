import { motion } from "framer-motion";
import { Play, ArrowRight, FileVideo, Mic, Link2, Plus } from "lucide-react";
import { Button } from "../primitives/Button";
import { Stars } from "../primitives/Stars";
import { TopWave } from "../primitives/TopWave";
import { GlowBackground } from "../primitives/GlowBackground";
import { DashboardHero } from "../mocks/DashboardHero";
import { ScaledFrame } from "../primitives/ScaledFrame";
import { hero } from "../../data/content";
import { EASE_OUT, fadeUp, stagger } from "../../lib/motion";

const FADE = "linear-gradient(to bottom, black 0%, black 84%, transparent 100%)";
const GRID_MASK = "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 38%, transparent 72%)";
const PILLS = [
  { label: "Audio & Video", Icon: FileVideo, color: "#2563EB", tint: "rgba(37,99,235,0.12)" },
  { label: "Meeting Recorder", Icon: Mic, color: "#7C3AED", tint: "rgba(124,58,237,0.12)" },
  { label: "Transcribe from Link", Icon: Link2, color: "#F59E0B", tint: "rgba(245,158,11,0.14)" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-wash pt-32 pb-8 md:pt-40 md:pb-10">
      <div aria-hidden="true" className="bg-grid-lines pointer-events-none absolute inset-0" style={{ WebkitMaskImage: GRID_MASK, maskImage: GRID_MASK }} />
      <TopWave />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.div variants={stagger(0.09)} initial="hidden" animate="show" className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-accent shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {hero.eyebrow}
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-6 text-balance font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-6xl md:text-[68px]">
            {hero.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-2 md:text-xl">
            {hero.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/subscribe" size="lg">{hero.primaryCta} <ArrowRight size={18} /></Button>
            <Button href="#how" variant="outline" size="lg"><Play size={16} /> {hero.secondaryCta}</Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-2">
            <span className="flex items-center gap-2"><Stars count={5} /> 4.9 from 300+ reviews</span>
            <span className="hidden text-border sm:inline">|</span>
            <span className="text-muted">No credit card required</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.6, ease: EASE_OUT }} className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {PILLS.map(({ label, Icon, color, tint }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 text-sm font-medium text-ink shadow-soft">
              <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: tint, color }}><Icon size={12} strokeWidth={2.2} /></span>
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: EASE_OUT }} className="relative mx-auto mt-14 w-full max-w-[1280px] px-6">
          <GlowBackground className="inset-x-0 -top-10 bottom-24 opacity-90" intensity="lg" />
          <div style={{ WebkitMaskImage: FADE, maskImage: FADE }}>
            <ScaledFrame width={1360} maxHeight={620}>
              <DashboardHero />
            </ScaledFrame>
          </div>
          <div aria-hidden="true" className="absolute bottom-5 right-9 z-10 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-blue"><Plus size={24} strokeWidth={2.5} /></div>
        </motion.div>
      </div>
    </section>
  );
}
