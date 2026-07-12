import { motion } from "framer-motion";
import { Play, Volume2, Rewind, FastForward, Settings, Maximize } from "lucide-react";
import { brand } from "../../data/assets";

// Real flag SVGs (emoji flags do not render on Windows) + a live "transcribed" caption.
const BUBBLES = [
  { lang: "English", text: "Hello!", cls: "left-2 top-3" },
  { lang: "French", text: "Bonjour!", cls: "right-2 top-10" },
  { lang: "Japanese", text: "こんにちは", cls: "left-3 top-1/2" },
  { lang: "German", text: "Hallo!", cls: "right-3 bottom-24" },
];
const CONTROLS = [Volume2, Rewind, Play, FastForward, Settings, Maximize];

export function VideoViz() {
  return (
    <div className="rounded-tile border border-white/10 bg-dark-2 p-5 sm:p-6">
      <div className="relative">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-dark-2 to-black/50">
          <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(58% 48% at 50% 38%, rgba(37,99,235,0.24), transparent)" }} />
          <div className="absolute inset-0 grid place-items-center">
            <motion.span animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 ring-1 ring-white/20">
              <Play size={22} fill="currentColor" className="ml-0.5" />
            </motion.span>
          </div>
          <div className="absolute inset-x-3 bottom-3 rounded-lg bg-black/55 px-3 py-2 backdrop-blur-sm">
            <p className="text-center text-[13px] font-medium text-white">Hello! Welcome to the channel.</p>
          </div>
        </div>
        {BUBBLES.map((b) => (
          <span key={b.lang} className={`absolute ${b.cls} inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-lg ring-1 ring-black/5`}>
            <img src={brand.langFlags[b.lang]} alt="" className="h-3.5 w-3.5 shrink-0 rounded-full object-cover" />
            {b.text}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4 text-muted-invert">
        {CONTROLS.map((Icon, i) => <Icon key={i} size={16} className={i === 2 ? "text-ink-invert" : ""} />)}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="relative flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/5 rounded-full bg-accent" /></div>
          <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-1 ring-black/10" style={{ left: "40%" }} />
        </div>
        <span className="font-mono text-[11px] text-muted-invert">01:41 / 04:12</span>
      </div>
    </div>
  );
}
