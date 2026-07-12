// Recognizable payment-brand marks as inline SVG / styled chips. Brand casing kept
// as each brand's own mark (Visa, Amex, PayPal, stripe), Google uses its 4-color G.

export function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.62 6.62 0 0 1-.35-2.1c0-.73.13-1.44.35-2.1V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function Apple({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M17.05 12.7c-.03-2.6 2.13-3.85 2.22-3.9-1.21-1.77-3.1-2.02-3.77-2.05-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.15-.47 7.82 1.3 10.38.86 1.25 1.89 2.66 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.29-1.27 3.14-2.53.99-1.45 1.4-2.85 1.42-2.93-.03-.01-2.72-1.04-2.75-4.13-.02-2.58 2.11-3.82 2.2-3.88Zm-2.6-7.13c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-.09 3.16 0 0 1.32.1 2.04-1.43Z" />
    </svg>
  );
}

const chip = "inline-flex h-8 items-center gap-1 rounded-md border border-border bg-white px-2.5 shadow-soft";

export function PaymentRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className={chip} title="Visa"><span className="text-[13px] font-bold italic tracking-tight text-[#1A1F71]">Visa</span></span>
      <span className={chip} title="Mastercard">
        <svg width="26" height="16" viewBox="0 0 36 24" aria-hidden="true"><circle cx="14" cy="12" r="9" fill="#EB001B" /><circle cx="22" cy="12" r="9" fill="#F79E1B" fillOpacity="0.85" /></svg>
      </span>
      <span className={chip} title="American Express"><span className="text-[12px] font-bold text-[#2E77BC]">Amex</span></span>
      <span className={chip} title="Google Pay"><GoogleG size={16} /><span className="text-[12px] font-medium text-ink-2">Pay</span></span>
      <span className={chip} title="Apple Pay"><Apple size={14} /><span className="text-[12px] font-medium text-ink">Pay</span></span>
      <span className={chip} title="PayPal"><span className="text-[13px] font-bold italic"><span className="text-[#003087]">Pay</span><span className="text-[#0099DE]">Pal</span></span></span>
    </div>
  );
}

export function StripeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-muted">
      Powered by <span className="font-bold italic tracking-tight text-[#635BFF]">stripe</span>
    </span>
  );
}
