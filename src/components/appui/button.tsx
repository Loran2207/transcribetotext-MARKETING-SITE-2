import type { ButtonHTMLAttributes } from "react";

// Ported from the app design system (transcribe2text ui/button.tsx).
// Pill-shaped by project rule; class strings kept verbatim, cva machinery dropped.
type Variant = "default" | "pill-outline" | "pill-dark" | "link";
type Size = "default" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const VARIANTS: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  "pill-outline":
    "border border-input bg-background text-foreground hover:bg-background hover:border-muted-foreground/40",
  "pill-dark":
    "bg-oauth text-oauth-foreground border border-transparent shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_2px_rgba(0,0,0,0.25)] hover:bg-oauth-hover active:bg-oauth focus-visible:ring-oauth/40",
  link: "text-primary underline-offset-4 hover:underline",
};

const SIZES: Record<Size, string> = {
  default: "h-9 px-4 py-2",
  lg: "h-10 px-6",
};

export function AppButton({
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button type={type} className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props} />;
}
