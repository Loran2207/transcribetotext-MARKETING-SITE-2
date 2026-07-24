import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Clock, ChevronsRight, Infinity as InfinityIcon, Database, Sparkles, Zap, Star, ShieldCheck, ArrowRight, Info } from "lucide-react";
import { subscribe, offers } from "../../data/subscribe";
import { EASE_OUT } from "../../lib/motion";
import { SecureCheckout } from "./SecureCheckout";

const GRADIENT_PILL =
  "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] text-sm font-semibold text-white shadow-blue ring-1 ring-inset ring-white/20 transition-[filter] hover:brightness-[1.05]";
const SOFT_PILL =
  "flex h-12 w-full items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent transition-colors hover:bg-accent/15";
const field = "h-12 w-full rounded-input bg-white px-3 text-sm text-ink outline-none transition-all placeholder:text-muted focus:ring-2 border border-border focus:border-accent focus:ring-accent/15 sm:px-4";
const wallet = "flex h-11 items-center justify-center rounded-full transition-[filter] hover:brightness-110";

const CARD_BRANDS = [
  { src: "/brand/pay/mastercard.svg", alt: "Mastercard", h: "h-4" },
  { src: "/brand/pay/visa.svg", alt: "Visa", h: "h-2.5" },
  { src: "/brand/pay/amex.svg", alt: "American Express", h: "h-4" },
  { src: "/brand/pay/discover.svg", alt: "Discover", h: "h-2" },
];

function useCountdown(start: number) {
  const [left, setLeft] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}
const two = (n: number) => String(n).padStart(2, "0");
const fmtHMS = (s: number) => `${two(Math.floor(s / 3600))} : ${two(Math.floor((s % 3600) / 60))} : ${two(s % 60)}`;
const fmtMS = (s: number) => `${two(Math.floor(s / 60))}:${two(s % 60)}`;

function OfferShell({ open, onClose, maxW, children, id }: { open: boolean; onClose: () => void; maxW: string; children: ReactNode; id: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={`relative max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-tile bg-white p-6 shadow-lift sm:p-8 ${maxW}`}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent transition-colors hover:text-accent-dark sm:h-9 sm:w-9">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BenefitRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"><Check size={12} strokeWidth={3} /></span>
      <span className="text-sm font-medium text-ink">{text}</span>
    </li>
  );
}

// Trustpilot-style rating: five solid green rounded squares, each holding a white star.
function TrustStars({ big = false, className = "" }: { big?: boolean; className?: string }) {
  const box = big ? "size-[19px]" : "size-[15px]";
  const glyph = big ? 12 : 9;
  return (
    <span role="img" aria-label="Rated 5 out of 5" className={`flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`grid ${box} shrink-0 place-items-center rounded-[3px] bg-[#00B67A]`}>
          <Star size={glyph} strokeWidth={0} className="fill-white text-white" />
        </span>
      ))}
    </span>
  );
}

function PlanOfferCard({ planKey, badge, per, cta, highlighted, onPick, className = "" }: { planKey: string; badge: string; per: string; cta: string; highlighted: boolean; onPick: () => void; className?: string }) {
  const plan = subscribe.plans.find((p) => p.key === planKey) ?? subscribe.plans[1];
  return (
    <div className={`relative flex flex-col rounded-tile bg-white p-6 ${highlighted ? "border-2 border-accent shadow-card" : "border border-border shadow-soft"} ${className}`}>
      {badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#3B82F6,#2563EB)] px-3 py-1 text-xs font-semibold text-white shadow-blue">{badge}</span>
      ) : null}
      <p className="text-center text-sm font-semibold text-ink-2">{plan.name}</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="text-sm font-medium text-muted line-through">{plan.was}</span>
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink">{plan.now}</span>
        <span className="text-sm text-muted">{per}</span>
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {offers.limited.benefits.map((b) => <BenefitRow key={b} text={b} />)}
      </ul>
      <button onClick={onPick} className={`mt-5 ${highlighted ? GRADIENT_PILL : SOFT_PILL}`}>{cta}</button>
    </div>
  );
}

function FreeOfferCard({ onPick, className = "" }: { onPick: () => void; className?: string }) {
  const f = offers.limited.freeCard;
  return (
    <div className={`relative flex flex-col rounded-tile border border-border bg-white p-6 shadow-soft ${className}`}>
      <p className="text-center text-sm font-semibold text-ink-2">{f.name}</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink">{f.price}</span>
      </div>
      <p className="mt-1 text-center text-sm text-muted">{f.tagline}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {f.features.map((b) => <BenefitRow key={b} text={b} />)}
      </ul>
      <button onClick={onPick} className="mt-auto pt-5">
        <span className={SOFT_PILL}>{f.cta}</span>
      </button>
    </div>
  );
}

export function OfferPlansModal({ open, variant, onClose, onContinue }: { open: boolean; variant: "plans" | "trial"; onClose: () => void; onContinue: () => void }) {
  const o = offers.limited;
  const left = useCountdown(o.startSeconds);
  return (
    <OfferShell open={open} onClose={onClose} maxW="sm:max-w-3xl" id="offer-plans">
      <h3 className="pr-12 text-left font-display text-2xl font-extrabold tracking-tight text-ink sm:pr-0 sm:text-center sm:text-3xl">{o.title}</h3>
      <p className="mt-3 text-left font-display text-3xl font-extrabold tabular-nums tracking-tight text-accent sm:text-center sm:text-4xl">{fmtHMS(left)}</p>
      <p className="mt-3 max-w-xl text-left text-sm text-ink-2 sm:mx-auto sm:text-center">{o.subtitle}</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {variant === "trial" ? (
          <>
            <FreeOfferCard onPick={onClose} className="order-last sm:order-none" />
            <PlanOfferCard planKey={o.premiumCard.planKey} badge={o.premiumCard.badge} per={o.premiumCard.per} cta={o.premiumCard.cta} highlighted onPick={onContinue} className="order-first sm:order-none" />
          </>
        ) : (
          o.plansCards.map((c, i) => (
            <PlanOfferCard key={c.planKey} planKey={c.planKey} badge={c.badge} per={c.per} cta={c.cta} highlighted={i === 1} onPick={onContinue} className={i === 1 ? "order-first sm:order-none" : "order-last sm:order-none"} />
          ))
        )}
      </div>
    </OfferShell>
  );
}

const SPECIAL_ICONS = { infinity: InfinityIcon, database: Database, sparkles: Sparkles, zap: Zap } as const;

export function SpecialOfferModal({ open, onClose, onGrab }: { open: boolean; onClose: () => void; onGrab: () => void }) {
  const o = offers.special;
  const left = useCountdown(o.startSeconds);
  return (
    <OfferShell open={open} onClose={onClose} maxW="sm:max-w-md" id="offer-special">
      <div className="relative mx-auto flex h-[104px] w-[104px] items-center justify-center">
        <span aria-hidden="true" className="absolute h-[86px] w-[86px] rounded-full bg-rose-500/35 blur-[26px]" />
        <img src="/images/offer-tag.png" alt="" className="relative h-[104px] w-[104px] object-contain" />
      </div>
      <h3 className="mt-4 text-center font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{o.title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-ink-2">{o.subtitle}</p>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 font-display text-lg font-bold tabular-nums text-rose-600">
          <Clock size={16} /> {fmtMS(left)}
        </span>
      </div>
      <p className="mt-3 bg-[linear-gradient(180deg,#F43F5E,#E11D48)] bg-clip-text text-center font-display text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-transparent">{o.discount}</p>
      <div className="mt-5 grid auto-rows-fr grid-cols-2 gap-2">
        {o.features.map((f) => {
          const IconCmp = SPECIAL_ICONS[f.icon as keyof typeof SPECIAL_ICONS] ?? Sparkles;
          return (
            <div key={f.label} className="flex flex-col gap-2 rounded-2xl border border-border bg-white px-3 py-3 shadow-soft">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><IconCmp size={15} /></span>
              <span className="mt-auto text-[12.5px] font-medium leading-snug text-ink">{f.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
        <span className="text-base font-medium text-muted line-through">{o.was}</span>
        <span className="font-display text-[1.75rem] font-extrabold leading-none tracking-tight text-ink">{o.now}</span>
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">{o.saveBadge}</span>
      </div>
      <p className="mt-2 text-center text-xs font-medium text-muted">{o.perDay}</p>
      <button onClick={onGrab} className={`mt-5 ${GRADIENT_PILL}`}>{o.cta} <ArrowRight size={16} /></button>
    </OfferShell>
  );
}

export function OfferCheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const o = offers.offerCheckout;
  const left = useCountdown(o.discountCard.startSeconds);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  return (
    <OfferShell open={open} onClose={onClose} maxW="sm:max-w-5xl" id="offer-checkout">
      <div className="flex flex-col items-center gap-3">
        <img src="/brand/logo.svg" alt="TranscribeToText.AI" className="h-7 w-auto" />
        <h3 className="pr-10 text-center font-display text-2xl font-extrabold tracking-tight text-ink sm:pr-0 sm:text-3xl">{o.title}</h3>
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-9">
        <div className="order-2 lg:order-1">
          <p className="font-display text-lg font-bold text-ink">{o.includesLabel}</p>
          <div className="mt-4 flex flex-col gap-5">
            {o.includes.map((b) => (
              <div key={b.name}>
                <p className="font-display text-base font-bold text-ink">{b.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-tile border border-border bg-white p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-display text-base font-bold text-ink">{o.rating.label}</p>
              <TrustStars big />
              <p className="text-xs text-muted">{o.rating.count}</p>
            </div>
            <div className="mt-4 flex flex-col">
              {o.reviews.map((r) => (
                <div key={r.name} className="flex items-start gap-3 border-t border-border-soft py-3.5 last:pb-0">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent">{r.initial}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
                      <span className="ml-auto shrink-0 text-xs text-muted">{r.date}</span>
                    </div>
                    <TrustStars className="mt-1.5" />
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 rounded-tile bg-tint-sky p-4 sm:p-5 lg:order-2">
          <div className="rounded-2xl bg-white p-4 shadow-soft sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-muted">{o.discountCard.label}</p>
              <p className="text-xs font-medium text-muted">{o.discountCard.forLabel}</p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1 rounded-xl bg-accent-soft px-2.5 py-2">
                <span className="whitespace-nowrap text-[13px] font-semibold text-ink sm:text-sm">{o.discountCard.code}</span>
                <ChevronsRight size={15} className="shrink-0 text-accent" />
                <span className="whitespace-nowrap text-[13px] font-bold text-emerald-600 sm:text-sm">{o.discountCard.off}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="rounded-xl bg-tint-sky px-2 py-1.5 text-center">
                  <span className="block font-display text-base font-bold tabular-nums text-ink">{two(Math.floor(left / 60))}</span>
                  <span className="block text-[10px] text-muted">min</span>
                </span>
                <span className="rounded-xl bg-tint-sky px-2 py-1.5 text-center">
                  <span className="block font-display text-base font-bold tabular-nums text-ink">{two(left % 60)}</span>
                  <span className="block text-[10px] text-muted">sec</span>
                </span>
              </span>
            </div>
            <div className="my-4 h-px bg-border-soft" />
            <div className="flex items-baseline justify-between gap-3">
              <p className="whitespace-nowrap font-display text-[15px] font-bold text-ink sm:text-base">{o.totalLabel}</p>
              <p className="flex items-baseline gap-1.5 whitespace-nowrap sm:gap-2">
                <span className="text-xs font-medium text-muted line-through sm:text-sm">{o.was}</span>
                <span className="font-display text-[24px] font-extrabold tracking-tight text-ink sm:text-3xl">{o.now}</span>
              </p>
            </div>
            <p className="mt-1 text-right text-xs font-semibold text-emerald-600">{o.save}</p>
            <div className="my-4 h-px bg-border-soft" />
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <ShieldCheck size={16} className="shrink-0 text-accent" />
              <span>
                {o.guarantee.pre} <span className="font-semibold text-accent">{o.guarantee.strong}</span> {o.guarantee.post}
              </span>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className={`${wallet} bg-[#FFC439]`} aria-label="Pay with PayPal">
              <img src="/brand/pay/paypal-wordmark.svg" alt="PayPal" className="h-4 w-auto" />
            </button>
            <button className={`${wallet} gap-1 bg-black text-[15px] font-semibold text-white`} aria-label="Pay with Apple Pay">
              <svg width="14" height="17" viewBox="0 0 24 29" aria-hidden="true"><path fill="currentColor" d="M20.06 15.36c-.04-3.1 2.53-4.58 2.65-4.66-1.44-2.11-3.69-2.4-4.49-2.44-1.9-.19-3.72 1.12-4.69 1.12-.96 0-2.46-1.09-4.04-1.06-2.08.03-4 1.21-5.07 3.07-2.16 3.75-.55 9.3 1.55 12.35 1.03 1.49 2.25 3.17 3.85 3.11 1.55-.06 2.13-1 4-1 1.87 0 2.4 1 4.03.97 1.67-.03 2.72-1.52 3.74-3.01 1.18-1.73 1.66-3.4 1.69-3.48-.04-.02-3.24-1.24-3.27-4.92l.05-.05Zm-3.1-8.49c.86-1.04 1.43-2.48 1.27-3.92-1.23.05-2.71.82-3.6 1.86-.79.92-1.48 2.38-1.29 3.79 1.37.11 2.77-.7 3.62-1.73Z" /></svg>
              Pay
            </button>
            <button className={`${wallet} bg-black`} aria-label="Pay with Google Pay">
              <img src="/brand/pay/gpay-white.svg" alt="Google Pay" className="h-4 w-auto" />
            </button>
          </div>
          <div className="mt-3 space-y-2.5">
            <div className="relative">
              <input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric" placeholder={o.cardPlaceholder} className={`${field} pr-[8.25rem]`} />
              <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                {CARD_BRANDS.map((b) => <img key={b.alt} src={b.src} alt={b.alt} className={`${b.h} w-auto`} />)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder={o.expiryPlaceholder} className={field} />
              <div className="relative">
                <input value={cvc} onChange={(e) => setCvc(e.target.value)} inputMode="numeric" placeholder={o.cvcPlaceholder} className={`${field} pr-10`} />
                <Info size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent" />
              </div>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={o.namePlaceholder} className={field} />
          </div>
          <button onClick={onClose} className={`mt-4 ${GRADIENT_PILL}`}>{o.cta} <ArrowRight size={16} /></button>
          <div className="mt-4"><SecureCheckout /></div>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
            {o.termsPre}{" "}
            {o.termsLinks.map((l, i) => (
              <span key={l}>
                <a href="#" className="font-medium text-accent hover:underline">{l}</a>
                {i < o.termsLinks.length - 1 ? " and " : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </OfferShell>
  );
}
