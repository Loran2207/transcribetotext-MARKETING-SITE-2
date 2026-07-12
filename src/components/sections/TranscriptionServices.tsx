import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AudioLines, Video, Users, CloudUpload, ArrowRight } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionCutout } from "../primitives/SectionCutout";
import { SectionHeading } from "../primitives/SectionHeading";
import { StarField } from "../mocks/StarField";
import { CosmicGlow } from "../mocks/CosmicGlow";
import { AudioToTextViz } from "../mocks/AudioToTextViz";
import { VideoViz } from "../mocks/VideoViz";
import { MeetingViz } from "../mocks/MeetingViz";
import { CloudFileViz } from "../mocks/CloudFileViz";
import { transcriptionServices as S } from "../../data/content";
import { EASE_OUT, viewportOnce } from "../../lib/motion";

const ICONS = [AudioLines, Video, Users, CloudUpload];
const VIZ = [AudioToTextViz, VideoViz, MeetingViz, CloudFileViz];

export function TranscriptionServices() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = S.tabs.length;
  const t = S.tabs[active];
  const Viz = VIZ[active];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-dark py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionCutout />
      <StarField />
      <CosmicGlow variant="beam" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 right-1/3 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
      <motion.div aria-hidden="true" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <Container className="relative">
        <SectionHeading eyebrow={S.eyebrow} title={S.title} tone="dark" />

        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {S.tabs.map((tab, i) => {
            const Icon = ICONS[i];
            const on = i === active;
            return (
              <motion.button
                key={tab.key}
                variants={{ hidden: { opacity: 0, y: 14, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE_OUT } } }}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-3 text-left text-[13px] font-medium transition-colors ${on ? "border-accent/60 bg-white/[0.06] text-ink-invert" : "border-white/10 bg-white/[0.02] text-muted-invert hover:border-white/20 hover:text-ink-invert"}`}
              >
                <Icon size={16} className={on ? "shrink-0 text-accent-glow" : "shrink-0"} />
                <span className="leading-tight">{tab.tab}</span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/10" />
                {on && !reduce && (
                  <span
                    key={active}
                    aria-hidden="true"
                    onAnimationEnd={() => setActive((a) => (a + 1) % n)}
                    style={{ animationName: "tabProgress", animationDuration: `${S.autoMs}ms`, animationTimingFunction: "linear", animationFillMode: "forwards", animationPlayState: paused ? "paused" : "running" }}
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-12 grid min-h-[460px] items-center gap-10 md:grid-cols-2">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={t.key} initial={{ opacity: 0, x: -22, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: 22, filter: "blur(8px)" }} transition={{ duration: 0.45, ease: EASE_OUT }}>
                <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink-invert sm:text-4xl md:text-[42px] md:leading-[1.1]">
                  {t.lead} <span className="text-accent-glow">{t.accent}</span>
                </h3>
                <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-invert">{t.desc}</p>
                <a href="#pricing" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-6 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]">
                  {t.cta} <ArrowRight size={16} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative min-h-[280px]">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-8 opacity-70 blur-[80px]" style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.30), transparent)" }} />
            <AnimatePresence mode="wait">
              <motion.div key={t.key} initial={{ opacity: 0, x: 24, filter: "blur(10px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -24, filter: "blur(10px)" }} transition={{ duration: 0.5, ease: EASE_OUT }} className="relative">
                <Viz />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
