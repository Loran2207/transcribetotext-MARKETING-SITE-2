import { motion } from "framer-motion";
import { Youtube, Video, Users, Cloud, HardDrive } from "lucide-react";

const APPS = [
  { Icon: Youtube, label: "YouTube" },
  { Icon: Video, label: "Zoom" },
  { Icon: Users, label: "Google Meet" },
  { Icon: Cloud, label: "Dropbox" },
  { Icon: HardDrive, label: "Google Drive" },
];

export function IntegrationsViz() {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {APPS.map(({ Icon, label }, i) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-ink-invert"
        >
          <Icon size={14} className="text-accent-glow" /> {label}
        </motion.span>
      ))}
    </div>
  );
}
