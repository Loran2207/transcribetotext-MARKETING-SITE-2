import { motion } from "framer-motion";
import { FileAudio } from "lucide-react";
import { Waveform } from "../primitives/Waveform";

const LINES = [
  "Welcome back to the show. Today we explore how AI",
  "turns raw audio into clean, searchable text in seconds.",
];

export function AudioToTextViz() {
  return (
    <div className="rounded-tile border border-white/10 bg-dark-2 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-glow"><FileAudio size={18} /></span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink-invert">podcast-episode-42.mp3</p>
          <p className="font-mono text-[11px] text-muted-invert">42:18 · 38.4 MB</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent-glow">Done</span>
      </div>
      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
        <Waveform bars={42} height={34} color="accent" />
      </div>
      <div className="mt-5 space-y-3">
        {LINES.map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-glow" />
            <p className="text-[13px] leading-relaxed text-muted-invert">{l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
