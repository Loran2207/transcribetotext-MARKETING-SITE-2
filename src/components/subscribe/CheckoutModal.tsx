import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check, ArrowRight, CreditCard } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { EASE_OUT } from "../../lib/motion";
import { GoogleG, PaymentRow } from "./PaymentMarks";

const field = "h-12 w-full rounded-input border border-border bg-white px-4 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/15";

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-ink-2"><span>{label}</span><span>{value}</span></div>;
}

export function CheckoutModal({ open, onClose, planIndex }: { open: boolean; onClose: () => void; planIndex: number }) {
  const plan = subscribe.plans[planIndex];
  const c = subscribe.checkout;
  const [done, setDone] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  useEffect(() => { if (open) setDone(false); }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-tile bg-white p-7 shadow-lift">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-surface-soft text-muted transition-colors hover:text-ink"><X size={16} /></button>
            {done ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent"><Check size={30} /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{c.success.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">{c.success.body}</p>
                <button onClick={onClose} className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-7 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20">Done</button>
              </div>
            ) : (
              <>
                <h3 className="pr-8 font-display text-2xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-5 text-xs font-medium text-muted">{c.summaryLabel}</p>
                <div className="mt-2 space-y-1.5 text-sm">
                  <Row label={c.regularLabel} value={plan.now} />
                  <Row label={c.bonusLabel} value={c.bonusValue} />
                  <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-ink"><span>{c.totalLabel}</span><span>{plan.now}</span></div>
                </div>
                <button onClick={() => setDone(true)} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-[filter] hover:brightness-150"><GoogleG size={18} /> Pay</button>
                <div className="my-4 flex items-center gap-3 text-[11px] text-muted"><span className="h-px flex-1 bg-border" />or pay with card<span className="h-px flex-1 bg-border" /></div>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink-2">{c.cardLabel}</label>
                    <div className="relative">
                      <CreditCard size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                      <input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric" placeholder="1234 1234 1234 1234" className={`${field} pl-10`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-ink-2">{c.expiryLabel}</label>
                      <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM / YY" className={field} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-ink-2">{c.cvcLabel}</label>
                      <input value={cvc} onChange={(e) => setCvc(e.target.value)} inputMode="numeric" placeholder="123" className={field} />
                    </div>
                  </div>
                </div>
                <button onClick={() => setDone(true)} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]">{c.continue} <ArrowRight size={16} /></button>
                <div className="mt-5 flex flex-col items-center gap-3"><span className="inline-flex items-center gap-1.5 text-[11px] text-muted"><Lock size={12} /> {subscribe.safeCheckout}</span><PaymentRow /></div>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">{c.terms}</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
