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
        <motion.div className="fixed inset-0 z-[70] flex items-stretch justify-center p-0 sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-transparent sm:bg-ink/60 sm:backdrop-blur-sm" onClick={onClose} />
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={`relative min-h-[100dvh] max-h-[100dvh] w-full max-w-none overflow-y-auto rounded-none bg-white px-4 py-6 shadow-lift sm:min-h-0 sm:max-h-[92vh] sm:rounded-tile sm:p-8 ${maxW}`}
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

function PlanOfferCard({ planKey, badge, per, cta, highlighted, onPick }: { planKey: string; badge: string; per: string; cta: string; highlighted: boolean; onPick: () => void }) {
  const plan = subscribe.plans.find((p) => p.key === planKey) ?? subscribe.plans[1];
  return (
    <div className={`relative flex flex-col rounded-tile bg-white p-6 ${highlighted ? "border-2 border-accent shadow-card" : "border border-border shadow-soft"}`}>
      {badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-deal px-3 py-1 text-xs font-semibold text-white">{badge}</span>
      ) : null}
      <p className="text-center text-sm font-semibold text-ink-2">{plan.name}</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="text-sm font-medium text-muted line-through">{plan.was}</span>
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink">{plan.now}</span>
        <span className="text-sm text-muted">{per}</span>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {offers.limited.benefits.map((b) => <BenefitRow key={b} text={b} />)}
      </ul>
      <button onClick={onPick} className={`mt-6 ${highlighted ? GRADIENT_PILL : SOFT_PILL}`}>{cta}</button>
    </div>
  );
}

function FreeOfferCard({ onPick }: { onPick: () => void }) {
  const f = offers.limited.freeCard;
  return (
    <div className="relative flex flex-col rounded-tile border border-border bg-white p-6 shadow-soft">
      <p className="text-center text-sm font-semibold text-ink-2">{f.name}</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink">{f.price}</span>
      </div>
      <p className="mt-1 text-center text-sm text-muted">{f.tagline}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {f.features.map((b) => <BenefitRow key={b} text={b} />)}
      </ul>
      <button onClick={onPick} className={`mt-auto pt-6 ${""}`}>
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
            <FreeOfferCard onPick={onClose} />
            <PlanOfferCard planKey={o.premiumCard.planKey} badge={o.premiumCard.badge} per={o.premiumCard.per} cta={o.premiumCard.cta} highlighted onPick={onContinue} />
          </>
        ) : (
          o.plansCards.map((c, i) => (
            <PlanOfferCard key={c.planKey} planKey={c.planKey} badge={c.badge} per={c.per} cta={c.cta} highlighted={i === 1} onPick={onContinue} />
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
      <h3 className="pr-12 text-left font-display text-2xl font-extrabold tracking-tight text-ink sm:pr-0 sm:text-center sm:text-3xl">{o.title}</h3>
      <p className="mt-2.5 text-left text-sm leading-relaxed text-ink-2 sm:text-center">{o.subtitle}</p>
      <div className="mt-4 flex sm:justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 font-display text-xl font-bold tabular-nums text-accent">
          <Clock size={18} /> {fmtMS(left)}
        </span>
      </div>
      <p className="mt-3 text-left font-display text-5xl font-extrabold tracking-tight text-accent sm:text-center">{o.discount}</p>
      <div className="mt-6 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
        {o.features.map((f) => {
          const IconCmp = SPECIAL_ICONS[f.icon as keyof typeof SPECIAL_ICONS] ?? Sparkles;
          return (
            <div key={f.label} className="flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3.5 py-3 shadow-soft">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><IconCmp size={16} /></span>
              <span className="text-[13px] font-medium leading-snug text-ink">{f.label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-left text-lg text-ink-2 sm:text-center">
        {o.priceLead} <span className="font-medium text-muted line-through">{o.was}</span>{" "}
        <span className="font-display text-2xl font-extrabold text-ink">{o.now}</span>
      </p>
      <p className="mt-1 text-left text-xs font-medium text-accent sm:text-center">{o.perDay}</p>
      <button onClick={onGrab} className={`mt-6 ${GRADIENT_PILL}`}>{o.cta}</button>
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
      <h3 className="pr-12 text-left font-display text-2xl font-extrabold tracking-tight text-ink sm:pr-0 sm:text-center sm:text-3xl">{o.title}</h3>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-9">
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
          <div className="mt-6 rounded-tile border border-border bg-white p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent">{o.review.initial}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{o.review.name}</p>
                <p className="text-xs text-muted">{o.review.meta}</p>
              </div>
              <span className="ml-auto text-xs text-muted">{o.review.date}</span>
            </div>
            <div className="mt-3 flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-current" />)}
            </div>
            <p className="mt-2.5 text-sm font-medium leading-relaxed text-ink">{o.review.text}</p>
            <p className="mt-2 text-xs text-muted">{o.review.experience}</p>
          </div>
        </div>
        <div className="order-1 rounded-tile bg-tint-sky p-4 sm:p-5 lg:order-2">
          <div className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-muted">{o.discountCard.label}</p>
              <p className="text-xs font-medium text-muted">{o.discountCard.forLabel}</p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 rounded-xl bg-accent-soft px-3 py-2">
                <span className="text-sm font-semibold text-ink">{o.discountCard.code}</span>
                <ChevronsRight size={16} className="text-accent" />
                <span className="text-sm font-bold text-deal">{o.discountCard.off}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="rounded-xl border border-border bg-white px-2.5 py-1.5 text-center">
                  <span className="block font-display text-base font-bold tabular-nums text-ink">{two(Math.floor(left / 60))}</span>
                  <span className="block text-[10px] text-muted">min</span>
                </span>
                <span className="rounded-xl border border-border bg-white px-2.5 py-1.5 text-center">
                  <span className="block font-display text-base font-bold tabular-nums text-ink">{two(left % 60)}</span>
                  <span className="block text-[10px] text-muted">sec</span>
                </span>
              </span>
            </div>
          </div>
          <p className="mt-3 text-center text-xs leading-relaxed text-ink-2">{o.welcome}</p>
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <p className="font-display text-lg font-bold text-ink">{o.totalLabel}</p>
            <p className="text-right">
              <span className="text-sm font-medium text-muted line-through">{o.was}</span>{" "}
              <span className="font-display text-2xl font-extrabold text-ink">{o.now}</span>
            </p>
          </div>
          <p className="text-right text-xs font-semibold text-deal">{o.save}</p>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-accent-soft px-4 py-2.5">
            <ShieldCheck size={16} className="shrink-0 text-accent" />
            <p className="text-sm font-medium text-ink">
              {o.guarantee.pre} <span className="font-semibold text-accent">{o.guarantee.strong}</span> {o.guarantee.post}
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
