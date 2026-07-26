// Shared "Guaranteed safe & secure checkout" strip. This is the approved exported
// asset (927x198, transparent) rendered at its 309x66 design size, so the paywall
// bottom and every checkout surface show the exact same artwork.
export function SecureCheckout({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex w-full justify-center ${className}`}>
      <img
        src="/images/secure-checkout-badge.png"
        alt="Guaranteed safe and secure checkout"
        width={309}
        height={66}
        className="h-auto w-[309px] max-w-full"
      />
    </div>
  );
}
