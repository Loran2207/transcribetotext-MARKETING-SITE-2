// Recognizable payment-brand marks. Real vector logos in their own colors.

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

const CHIP = "inline-flex h-9 items-center justify-center rounded-lg border border-border bg-white px-3 shadow-soft";

const MARKS = [
  { name: "Visa", src: "/brand/pay/visa.svg", h: "h-3.5" },
  { name: "Mastercard", src: "/brand/pay/mastercard.svg", h: "h-5" },
  { name: "American Express", src: "/brand/pay/amex.svg", h: "h-5" },
  { name: "Google Pay", src: "/brand/pay/gpay.svg", h: "h-4" },
  { name: "Apple Pay", src: "/brand/pay/applepay.svg", h: "h-4" },
  { name: "PayPal", src: "/brand/pay/paypal.svg", h: "h-4.5" },
];

// Six marks never wrap into a tidy row on a phone, so they land as two rows of
// three. "grid" keeps that shape everywhere (the checkout dialog is narrow at any
// width); "row" returns to the left-aligned row from the tablet up.
export function PaymentMarks({ variant = "row" }: { variant?: "row" | "grid" }) {
  const wrap =
    variant === "grid"
      ? "grid w-full grid-cols-3 gap-2"
      : "grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center";
  const chip = variant === "grid" ? `${CHIP} w-full` : `${CHIP} w-full sm:w-auto`;
  return (
    <div className={wrap}>
      {MARKS.map((m) => (
        <span key={m.name} className={chip} title={m.name}>
          <img src={m.src} alt={m.name} className={m.h + " w-auto"} />
        </span>
      ))}
    </div>
  );
}

export function PaymentRow() {
  return <PaymentMarks variant="row" />;
}
