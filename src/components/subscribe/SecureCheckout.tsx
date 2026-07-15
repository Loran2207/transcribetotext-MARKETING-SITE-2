import { Lock } from "lucide-react";
import { subscribe } from "../../data/subscribe";

// Shared "Guaranteed safe & secure checkout" block, matching the Figma component
// (node 3802:154): a bordered card with a lock + label on top and a single row of
// real brand logos below. Used identically on the paywall bottom and in checkout.
const LOGOS = [
  { name: "Visa", src: "/brand/pay/visa.svg", h: "h-[18px]" },
  { name: "Mastercard", src: "/brand/pay/mastercard.svg", h: "h-6" },
  { name: "American Express", src: "/brand/pay/amex.svg", h: "h-6" },
  { name: "Google Pay", src: "/brand/pay/gpay.svg", h: "h-[18px]" },
  { name: "Apple Pay", src: "/brand/pay/applepay.svg", h: "h-[18px]" },
  { name: "PayPal", src: "/brand/pay/paypal.svg", h: "h-5" },
];

export function SecureCheckout({ className = "" }: { className?: string }) {
  const s = subscribe.secure;
  return (
    <div className={`mx-auto w-full rounded-2xl border border-border bg-white px-4 py-3.5 ${className}`}>
      <p className="flex items-center justify-center gap-2 text-sm text-ink">
        <Lock size={15} className="shrink-0 text-ink-2" />
        <span>
          {s.pre}
          <strong className="font-semibold">{s.strong}</strong>
          {s.post}
        </span>
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5">
        {LOGOS.map((l) => (
          <img key={l.name} src={l.src} alt={l.name} className={`${l.h} w-auto`} />
        ))}
      </div>
    </div>
  );
}
