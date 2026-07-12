import type { InputHTMLAttributes } from "react";

// Ported from the app design system (transcribe2text ui/input.tsx), classes verbatim.
export function AppInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`placeholder:text-muted-foreground border-input bg-input-background flex h-9 w-full min-w-0 rounded-[12px] border px-3 py-1 text-sm text-foreground transition-[color,box-shadow] outline-none focus-visible:border-ring/50 focus-visible:ring-ring/20 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export function AppLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none text-foreground">
      {children}
    </label>
  );
}
