import { motion } from "framer-motion";
import { CloudUpload, FileVideo, Link2 } from "lucide-react";

const PROVIDERS = ["Dropbox", "Drive", "OneDrive"];

export function CloudFileViz() {
  return (
    <div className="rounded-tile border border-white/10 bg-dark-2 p-5 sm:p-6">
      <div className="rounded-xl border border-white/10 p-3.5">
        <p className="text-[11px] font-medium text-muted-invert">Enter link</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <Link2 size={14} className="shrink-0 text-muted-invert" />
            <span className="truncate font-mono text-[12px] text-muted-invert">https://dropbox.com/s/…/interview.mp4</span>
          </div>
          <button className="shrink-0 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-medium text-ink-invert">Apply</button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-glow"><FileVideo size={16} /></span>
          <p className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink-invert">video1234567890.mp4</p>
          <span className="shrink-0 font-mono text-[11px] text-accent-glow">65%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div initial={{ width: 0 }} whileInView={{ width: "65%" }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }} className="h-full rounded-full bg-accent" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-invert"><CloudUpload size={12} /> Uploading</p>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        {PROVIDERS.map((label) => (
          <div key={label} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5">
            <span className="text-[12px] text-muted-invert">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
