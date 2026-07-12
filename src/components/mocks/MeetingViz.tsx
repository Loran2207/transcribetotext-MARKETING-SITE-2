import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";

const PEOPLE = [
  { initials: "JN", name: "Jordan N.", color: "#4C9BFF" },
  { initials: "EA", name: "Elena A.", color: "#A78BFA" },
  { initials: "LK", name: "Liam K.", color: "#34D399" },
  { initials: "RM", name: "Rosa M.", color: "#FBBF24" },
];

const PROVIDERS = [
  { letter: "M", label: "Meet", color: "#34D399" },
  { letter: "Z", label: "Zoom", color: "#4C9BFF" },
  { letter: "T", label: "Teams", color: "#A78BFA" },
];

export function MeetingViz() {
  return (
    <div className="relative rounded-tile border border-white/10 bg-dark-2 p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        {PEOPLE.map((p) => (
          <div key={p.initials} className="relative flex h-24 items-center justify-center rounded-lg border border-white/10 bg-black/20">
            <span className="grid h-10 w-10 place-items-center rounded-full text-[13px] font-medium" style={{ backgroundColor: `${p.color}26`, color: p.color }}>{p.initials}</span>
            <span className="absolute bottom-2 left-2.5 text-[10px] text-muted-invert">{p.name}</span>
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="absolute left-3 top-3 w-[248px] rounded-xl border border-white/10 bg-white/[0.06] p-3.5 shadow-lg shadow-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-accent-glow" />
          <p className="text-[13px] font-medium text-ink-invert">Scheduled Meeting</p>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["Google Calendar", "Microsoft Outlook"].map((c) => (
            <span key={c} className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] text-muted-invert">{c}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-ink-invert">Write to calendar</span>
          <span className="relative h-4 w-7 rounded-full bg-accent"><span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" /></span>
        </div>
        <button className="mt-3 inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-[11px] font-medium text-white">
          <Check size={12} /> Done
        </button>
      </motion.div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] text-ink-invert">
          <motion.span animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="h-2 w-2 rounded-full bg-accent-glow" />
          TranscribeToText bot is recording now
        </div>
        <div className="flex gap-1.5">
          {PROVIDERS.map((p) => (
            <span key={p.letter} className="grid h-7 w-7 place-items-center rounded-md text-[12px] font-semibold" style={{ backgroundColor: `${p.color}26`, color: p.color }} title={p.label}>{p.letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
