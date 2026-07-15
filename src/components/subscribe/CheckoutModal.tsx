import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Info, CreditCard, AlertCircle } from "lucide-react";
import { subscribe } from "../../data/subscribe";
import { EASE_OUT } from "../../lib/motion";
import { SecureCheckout } from "./SecureCheckout";

const field = "h-12 w-full rounded-input bg-white px-3 text-sm text-ink outline-none transition-all placeholder:text-muted focus:ring-2 sm:px-4";
const ok = "border border-border focus:border-accent focus:ring-accent/15";
const bad = "border border-deal focus:border-deal focus:ring-deal/15";
// Every button in the project is a full pill.
const wallet = "flex h-12 w-full items-center justify-center rounded-full transition-[filter] hover:brightness-110";

// Card brands sit inside the card-number field, like the source dialog.
const CARD_BRANDS = [
  { src: "/brand/pay/mastercard.svg", alt: "Mastercard", h: "h-4 sm:h-5" },
  { src: "/brand/pay/visa.svg", alt: "Visa", h: "h-2.5 sm:h-3" },
  { src: "/brand/pay/amex.svg", alt: "American Express", h: "h-4 sm:h-5" },
  { src: "/brand/pay/discover.svg", alt: "Discover", h: "h-2 sm:h-2.5" },
];

function Row({ label, value, total = false }: { label: string; value: string; total?: boolean }) {
  return (
    <div className={total ? "flex justify-between border-t border-border pt-2 text-base font-bold text-ink" : "flex justify-between text-sm text-ink"}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function CheckoutModal({ open, onClose, planIndex, forceError = false }: { open: boolean; onClose: () => void; planIndex: number; forceError?: boolean }) {
  const plan = subscribe.plans[planIndex];
  const c = subscribe.checkout;
  const [done, setDone] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState(false);
  useEffect(() => { if (open) { setDone(false); setErrors(forceError); } }, [open, forceError]);
  const fill = (t: string) => t.replace("{now}", plan.now).replace("{was}", plan.was);
  const submit = () => {
    if (!card.trim() || !exp.trim() || !cvc.trim()) { setErrors(true); return; }
    setDone(true);
  };
  const cardBad = errors && !card.trim();
  const expBad = errors && !exp.trim();
  const cvcBad = errors && !cvc.trim();
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-stretch justify-center p-0 sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-transparent sm:bg-ink/60 sm:backdrop-blur-sm" onClick={onClose} />
          <motion.div id="checkout-modal" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.35, ease: EASE_OUT }} className="relative min-h-[100dvh] max-h-[100dvh] w-full max-w-none overflow-y-auto rounded-none bg-white px-4 py-5 shadow-lift sm:min-h-0 sm:max-h-[92vh] sm:max-w-lg sm:rounded-tile sm:p-7">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent transition-colors hover:text-accent-dark sm:h-9 sm:w-9"><X size={18} /></button>
            {done ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent"><Check size={30} /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{c.success.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">{c.success.body}</p>
                <button onClick={onClose} className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-7 text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20">Done</button>
              </div>
            ) : (
              <>
                <h3 className="pr-12 text-left font-display text-xl font-bold text-ink sm:pr-0 sm:text-center sm:text-2xl">{c.title}</h3>
                <p className="mt-5 text-xs font-medium text-muted">{c.summaryLabel}</p>
                <div className="mt-2 space-y-1.5">
                  {c.summary.map((row) => <Row key={row.label} label={row.label} value={fill(row.value)} />)}
                  <Row label={c.totalLabel} value={plan.now} total />
                </div>
                {errors && (
                  <div className="mt-4 flex items-start gap-3 overflow-hidden rounded-2xl border-l-4 border-deal bg-deal-soft px-4 py-3">
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-deal" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{c.error.title}</p>
                      <p className="text-sm leading-snug text-ink-2">{c.error.subtitle}</p>
                    </div>
                  </div>
                )}
                <div className="mt-5 space-y-2.5">
                  <button onClick={submit} className={`${wallet} bg-[#FFC439]`} aria-label="Pay with PayPal">
                    <img src="/brand/pay/paypal-wordmark.svg" alt="PayPal" className="h-5 w-auto" />
                  </button>
                  <button onClick={submit} className={`${wallet} bg-[#00D66F]`} aria-label="Pay securely with Link">
                    <img src="/brand/pay/link-logo.svg" alt="Link" className="h-5 w-auto" />
                  </button>
                  <button onClick={submit} className={`${wallet} bg-black`} aria-label="Pay with Google Pay">
                    <img src="/brand/pay/gpay-white.svg" alt="Google Pay" className="h-5 w-auto" />
                  </button>
                  <button onClick={submit} className={`${wallet} gap-1.5 bg-black text-[17px] font-semibold text-white`} aria-label="Pay with Apple Pay">
                    <svg width="16" height="19" viewBox="0 0 24 29" aria-hidden="true"><path fill="currentColor" d="M20.06 15.36c-.04-3.1 2.53-4.58 2.65-4.66-1.44-2.11-3.69-2.4-4.49-2.44-1.9-.19-3.72 1.12-4.69 1.12-.96 0-2.46-1.09-4.04-1.06-2.08.03-4 1.21-5.07 3.07-2.16 3.75-.55 9.3 1.55 12.35 1.03 1.49 2.25 3.17 3.85 3.11 1.55-.06 2.13-1 4-1 1.87 0 2.4 1 4.03.97 1.67-.03 2.72-1.52 3.74-3.01 1.18-1.73 1.66-3.4 1.69-3.48-.04-.02-3.24-1.24-3.27-4.92l.05-.05Zm-3.1-8.49c.86-1.04 1.43-2.48 1.27-3.92-1.23.05-2.71.82-3.6 1.86-.79.92-1.48 2.38-1.29 3.79 1.37.11 2.77-.7 3.62-1.73Z" /></svg>
                    Pay
                  </button>
                </div>
                <div className="my-4 flex items-center gap-3 text-[11px] text-muted"><span className="h-px flex-1 bg-border" />{c.dividerText}<span className="h-px flex-1 bg-border" /></div>
                <div className="space-y-3">
                  <div>
                    <div className="relative">
                      <input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric" placeholder={c.cardPlaceholder} className={`${field} ${cardBad ? bad : ok} ${cardBad ? "pr-10" : "pr-[8.75rem] sm:pr-32"}`} />
                      {cardBad ? (
                        <CreditCard size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-deal" />
                      ) : (
                        <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 sm:right-3.5 sm:gap-1.5">
                          {CARD_BRANDS.map((b) => <img key={b.alt} src={b.src} alt={b.alt} className={`${b.h} w-auto`} />)}
                        </span>
                      )}
                    </div>
                    {cardBad && <p className="mt-1.5 text-xs font-medium text-deal">{c.error.card}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder={c.expiryPlaceholder} className={`${field} ${expBad ? bad : ok}`} />
                      {expBad && <p className="mt-1.5 text-xs font-medium text-deal">{c.error.expiry}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <input value={cvc} onChange={(e) => setCvc(e.target.value)} inputMode="numeric" placeholder={c.cvcPlaceholder} className={`${field} ${cvcBad ? bad : ok} pr-10`} />
                        {cvcBad ? (
                          <CreditCard size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-deal sm:right-3.5" />
                        ) : (
                          <Info size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent sm:right-3.5" />
                        )}
                      </div>
                      {cvcBad && <p className="mt-1.5 text-xs font-medium text-deal">{c.error.cvc}</p>}
                    </div>
                  </div>
                </div>
                <button onClick={submit} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]">{c.continue} <ArrowRight size={16} /></button>
                <div className="mt-5"><SecureCheckout /></div>
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
