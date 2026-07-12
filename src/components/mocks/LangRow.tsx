import { brand } from "../../data/assets";

export function LangRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-max gap-3" style={{ animation: `${reverse ? "marqueeRev" : "marquee"} 42s linear infinite` }}>
      {doubled.map((l, i) => (
        <span key={i} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft">
          {brand.langFlags[l] ? (
            <img src={brand.langFlags[l]} alt="" className="h-4 w-4 shrink-0 rounded-full object-cover" />
          ) : (
            <span className="h-4 w-4 shrink-0 rounded-full bg-accent-soft" />
          )}
          {l}
        </span>
      ))}
    </div>
  );
}
