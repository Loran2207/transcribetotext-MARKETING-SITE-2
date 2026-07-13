import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check, ArrowRight, CreditCard } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { EASE_OUT } from "../../lib/motion";
import { GoogleG, PaymentRow } from "./PaymentMarks";

const field = "h-12 w-full rounded-input border border-border bg-white px-4 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/15";

function AppleMark({ className = "" }: { className?: string }) {
  return (
    <svg width="15" height="18" viewBox="0 0 24 29" className={className} aria-hidden="true">
      <path fill="currentColor" d="M20.06 15.36c-.04-3.1 2.53-4.58 2.65-4.66-1.44-2.11-3.69-2.4-4.49-2.44-1.9-.19-3.72 1.12-4.69 1.12-.96 0-2.46-1.09-4.04-1.06-2.08.03-4 1.21-5.07 3.07-2.16 3.75-.55 9.3 1.55 12.35 1.03 1.49 2.25 3.17 3.85 3.11 1.55-.06 2.13-1 4-1 1.87 0 2.4 1 4.03.97 1.67-.03 2.72-1.52 3.74-3.01 1.18-1.73 1.66-3.4 1.69-3.48-.04-.02-3.24-1.24-3.27-4.92l.05-.05Zm-3.1-8.49c.86-1.04 1.43-2.48 1.27-3.92-1.23.05-2.71.82-3.6 1.86-.79.92-1.48 2.38-1.29 3.79 1.37.11 2.77-.7 3.62-1.73Z" />
    </svg>
  );
}

function LinkMark() {
  return (
    <span className="inline-flex items-center gap-1 font-bold tracking-tight">
      <span className="grid size-4 place-items-center rounded-full bg-black text-[10px] font-black text-[#00D66F]">&gt;</span>
      link
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-sm text-ink"><span>{label}</span><span>{value}</span></div>;
}

export function CheckoutModal({ open, onClose, planIndex }: { open: boolean; onClose: () => void; planIndex: number }) {
  const plan = subscribe.plans[planIndex];
  const c = subscribe.checkout;
  const [done, setDone] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  useEffect(() => { if (open) setDone(false); }, [open]);
  const fill = (t: string) => t.replace("{now}", plan.now).replace("{was}", plan.was);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div id="checkout-modal" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-tile bg-white p-7 shadow-lift">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent transition-colors hover:text-accent-dark"><X size={16} /></button>
            {done ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent"><Check size={30} /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{c.success.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">{c.success.body}</p>
                <button onClick={onClose} className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-7 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-center font-display text-2xl font-bold text-ink">{c.title}</h3>
                <p className="mt-5 text-xs font-medium text-muted">{c.summaryLabel}</p>
                <div className="mt-2 space-y-1.5">
                  {c.summary.map((row) => (
                    <Row key={row.label} label={row.label} value={fill(row.value)} />
                  ))}
                  <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-ink"><span>{c.totalLabel}</span><span>{plan.now}</span></div>
                </div>
                <div className="mt-5 space-y-2.5">
                  <button onClick={() => setDone(true)} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-semibold text-white transition-[filter] hover:brightness-125">Pay with <GoogleG size={17} /> <span className="-ml-1">Pay</span></button>
                  <button onClick={() => setDone(true)} className="flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-black text-sm font-semibold text-white transition-[filter] hover:brightness-125">Pay with <AppleMark className="ml-0.5" /> <span className="-ml-1">Pay</span></button>
                  <button onClick={() => setDone(true)} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00D66F] text-sm font-semibold text-black transition-[filter] hover:brightness-105">Pay securely with <LinkMark /></button>
                  <button onClick={() => setDone(true)} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#FFC439] transition-[filter] hover:brightness-105"><img src="/brand/pay/paypal.svg" alt="PayPal" className="h-5 w-auto" /></button>
                </div>
                <div className="my-4 flex items-center gap-3 text-[11px] text-muted"><span className="h-px flex-1 bg-border" />or pay with card<span className="h-px flex-1 bg-border" /></div>
                <div className="space-y-3">
                  <div className="relative">
                    <input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric" placeholder={c.cardPlaceholder} className={`${field} pr-32`} />
                    <span className="pointer-events-none absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
                      <img src="/brand/pay/mastercard.svg" alt="Mastercard" className="h-4 w-auto" />
                      <img src="/brand/pay/visa.svg" alt="Visa" className="h-2.5 w-auto" />
                      <img src="/brand/pay/amex.svg" alt="American Express" className="h-4 w-auto" />
                      <img src="/brand/pay/discover.svg" alt="Discover" className="h-2 w-auto" />
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder={c.expiryPlaceholder} className={field} />
                    <div className="relative">
                      <input value={cvc} onChange={(e) => setCvc(e.target.value)} inputMode="numeric" placeholder={c.cvcPlaceholder} className={`${field} pr-10`} />
                      <CreditCard size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    </div>
                  </div>
                </div>
                <button onClick={() => setDone(true)} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]">{c.continue} <ArrowRight size={16} /></button>
                <div className="mt-5 flex flex-col items-center gap-3"><span className="inline-flex items-center gap-1.5 text-[11px] text-muted"><Lock size={12} /> {subscribe.safeCheckout}</span><PaymentRow /></div>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
                  {c.termsPre}{" "}
                  {c.termsLinks.map((l, i) => (
                    <span key={l}>
                      <a href="#" className="font-medium text-accent hover:underline">{l}</a>
                      {i < c.termsLinks.length - 1 ? ", " : ". "}
                    </span>
                  ))}
                  {c.helpPrefix}{" "}
                  <a href={`mailto:${c.helpEmail}`} className="font-medium text-accent hover:underline">{c.helpEmail}</a>
                </p>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">{fill(c.renewal)}</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
