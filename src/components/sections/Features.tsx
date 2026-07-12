import { motion } from "framer-motion";
import { Infinity as InfinityIcon, Zap, ShieldCheck, Link2, FileAudio, Download, ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { Container } from "../primitives/Container";
import { SectionCutout } from "../primitives/SectionCutout";
import { SectionHeading } from "../primitives/SectionHeading";
import { WaveViz } from "../mocks/WaveViz";
import { IntegrationsViz } from "../mocks/IntegrationsViz";
import { TranscriptMini, MeetingLiveMini, FormatDropMini, SpeedViz } from "../mocks/FeatureViz";
import { StarField } from "../mocks/StarField";
import { CosmicGlow } from "../mocks/CosmicGlow";
import { premiumFeatures } from "../../data/content";
import { EASE_OUT, scaleIn, stagger, viewportOnce, SPRING } from "../../lib/motion";

const ICONS = [InfinityIcon, Zap, ShieldCheck, Link2, FileAudio, Download];
const WIDE = new Set([0, 3, 4]);
const FORMATS = ["MP3", "MP4", "WAV", "MOV", "M4A", "AAC", "OGG", "WMV"];
const EXPORTS = ["DOCX", "PDF", "TXT", "SRT", "VTT"];

function Chips({ items }: { items: string[] }) {
  return <div className="mt-5 flex flex-wrap gap-1.5">{items.map((x) => (<span key={x} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-muted-invert">{x}</span>))}</div>;
}

export function Features() {
  return (
    <section id="premium" className="relative overflow-hidden bg-dark-atmosphere py-20 md:py-28">
      <SectionCutout />
      <StarField />
      <CosmicGlow variant="orbit" className="top-[-120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-8 right-1/4 h-72 w-72 rounded-full blur-[120px]" style={{ background: "rgba(109,91,255,0.20)" }} />
      <motion.div aria-hidden="true" initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={viewportOnce} transition={{ duration: 1.1, ease: EASE_OUT }} className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <Container className="relative">
        <SectionHeading eyebrow="Premium" title={premiumFeatures.title} tone="dark" />
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {premiumFeatures.items.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div key={f.title} variants={scaleIn} whileHover={{ y: -6 }} transition={SPRING} className={`group relative flex flex-col overflow-hidden rounded-tile border border-white/10 surface-dark p-6 transition-colors hover:border-white/20 ${WIDE.has(i) ? "lg:col-span-2" : ""}`}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(130% 60% at 50% 0%, rgba(37,99,235,0.20), transparent 70%)" }} />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent-glow ring-1 ring-inset ring-white/10"><Icon size={22} strokeWidth={1.6} /></span>
                    <ArrowUpRight size={18} className="text-white/25 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-invert">{f.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-invert">{f.body}</p>
                  {i === 0 ? (<><WaveViz /><TranscriptMini /></>) : null}
                  {i === 1 ? (
                    <>
                      <div className="mt-5 flex items-center gap-2">
                        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-muted-invert">1h audio</span>
                        <ArrowRight size={14} className="shrink-0 text-accent-glow" />
                        <span className="rounded-lg bg-accent/15 px-2.5 py-1.5 text-[11px] font-medium text-accent-glow">Text in ~12s</span>
                      </div>
                      <SpeedViz />
                    </>
                  ) : null}
                  {i === 2 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["7-day money-back", "End-to-end encrypted"].map((x) => (<span key={x} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-muted-invert"><Check size={12} className="text-accent-glow" />{x}</span>))}
                    </div>
                  ) : null}
                  {i === 3 ? (<><IntegrationsViz /><MeetingLiveMini /></>) : null}
                  {i === 4 ? (<><FormatDropMini /><Chips items={FORMATS} /></>) : null}
                  {i === 5 ? <Chips items={EXPORTS} /> : null}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
