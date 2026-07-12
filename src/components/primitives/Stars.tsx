import { Star } from "lucide-react";

export function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} strokeWidth={0} className={i < count ? "fill-gold" : "fill-ink/15"} />
      ))}
    </div>
  );
}
