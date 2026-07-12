import { ShieldCheck, Zap, Users, Captions, Phone, Languages, Pencil, Search, Upload, Sparkles, Globe, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import { PaymentRow } from "./PaymentMarks";

const ICONS: Record<string, LucideIcon> = { zap: Zap, users: Users, captions: Captions, phone: Phone, languages: Languages, pencil: Pencil, search: Search, upload: Upload, sparkles: Sparkles, globe: Globe };

export function Guarantee() {
  return (
    <div className="mt-12 flex items-start gap-4 rounded-tile border border-trust/25 bg-trust-soft p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-trust shadow-soft"><ShieldCheck size={22} /></span>
      <div>
        <p className="font-semibold text-ink">{subscribe.guarantee.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{subscribe.guarantee.body}</p>
      </div>
    </div>
  );
}

export function Benefits() {
  return (
    <div className="mt-20">
      <h2 className="text-balance text-center font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{subscribe.benefitsTitle}</h2>
      <motion.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {subscribe.benefits.map((b) => {
          const Icon = ICONS[b.icon] || Sparkles;
          return (
            <motion.div key={b.title} variants={fadeUp} className="flex gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><Icon size={18} /></span>
              <div>
                <p className="text-[15px] font-semibold text-ink">{b.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-2">{b.body}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function SafeCheckout() {
  return (
    <div className="mt-16 flex flex-col items-center gap-3">
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted"><Lock size={13} /> {subscribe.safeCheckout}</span>
      <PaymentRow />
    </div>
  );
}
