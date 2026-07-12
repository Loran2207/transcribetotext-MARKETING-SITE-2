import { ShieldCheck, Zap, Users, Captions, Phone, Languages, Pencil, Search, Upload, Sparkles, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { subscribe } from "../../data/subscribe";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import { PaymentRow } from "./PaymentMarks";

const ICONS: Record<string, LucideIcon> = { zap: Zap, users: Users, captions: Captions, phone: Phone, languages: Languages, pencil: Pencil, search: Search, upload: Upload, sparkles: Sparkles, globe: Globe };

// Centered blue guarantee card, mirroring the original app paywall mockup.
export function Guarantee() {
  return (
    <div className="mt-12 rounded-tile border border-accent/15 bg-accent-soft/50 px-8 py-8 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-white shadow-blue"><ShieldCheck size={22} /></span>
      <p className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">{subscribe.guarantee.title}</p>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{subscribe.guarantee.body}</p>
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

// Bottom block of the paywall, mirroring the original: safe checkout marks,
// help email, publisher details and legal links.
export function SafeCheckout() {
  return (
    <div className="mt-16 border-t border-border pt-10">
      <p className="font-display text-lg font-semibold text-ink">{subscribe.safeCheckout}</p>
      <div className="mt-3"><PaymentRow /></div>
      <p className="mt-8 font-display text-lg font-semibold text-ink">{subscribe.help.title}</p>
      <p className="mt-2 text-sm text-ink-2">
        {subscribe.help.prefix}{" "}
        <a href={`mailto:${subscribe.help.email}`} className="font-medium text-accent hover:underline">{subscribe.help.email}</a>
      </p>
      <p className="mt-8 font-display text-lg font-semibold text-ink">{subscribe.publisher.title}</p>
      <p className="mt-2 text-sm text-ink-2">{subscribe.publisher.name}</p>
      <p className="mt-1 text-sm text-ink-2">{subscribe.publisher.address}</p>
      <div className="mt-6 flex gap-5">
        {subscribe.legalLinks.map((l) => (
          <a key={l} href="#" className="text-xs text-muted transition-colors hover:text-accent">{l}</a>
        ))}
      </div>
    </div>
  );
}
