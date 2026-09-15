import { platform } from "../../data/assets";

export function PlatformPills({ items, compact = false }: { items: string[]; compact?: boolean }) {
  /* V1's pill row. Every mark keeps its NATIVE aspect: height is fixed, width
     is the logo's own - a brand mark forced into a square box is what came out
     cropped and stretched, and a cropped brand mark reads as a fake one. */
  return (
    <ul className={`flex flex-wrap ${compact ? "gap-2" : "gap-2.5 sm:gap-3"}`}>
      {items.map((name) => (
        <li
          key={name}
          className={`inline-flex items-center rounded-full border border-border bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card ${
            compact ? "h-10 gap-2 px-3.5" : "h-[52px] gap-2.5 px-5"
          }`}
        >
          <img src={platform[name]} alt="" aria-hidden className={compact ? "h-[16px] w-auto" : "h-[22px] w-auto"} />
          <span className={`font-semibold text-ink ${compact ? "text-[13px]" : "text-sm"}`}>{name}</span>
        </li>
      ))}
    </ul>
  );
}
