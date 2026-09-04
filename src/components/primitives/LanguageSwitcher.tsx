import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { brand } from "../../data/assets";

/* The six languages the landing artwork was translated into. The flag is the
   same flat disc used in the Languages section, so the switcher belongs to the
   page rather than arriving from an icon set of its own. */
export const LANGUAGES = [
  { code: "EN", name: "English", flag: "English" },
  { code: "ES", name: "Español", flag: "Spanish" },
  { code: "PT", name: "Português", flag: "Portuguese" },
  { code: "FR", name: "Français", flag: "French" },
  { code: "IT", name: "Italiano", flag: "Italian" },
  { code: "RU", name: "Русский", flag: "Russian" },
] as const;

/* Closed it is a flag and a chevron - nothing else. The two-letter code was
   there first, but it fitted in one header and not the other, and a control
   that changes shape between two screens of the same site reads as a mistake
   (Kirill, round 21c). The flag alone says which language you are reading. */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const lang = LANGUAGES[current];

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${lang.name}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
      >
        <img src={brand.langFlags[lang.flag]} alt="" className="size-5 shrink-0 rounded-full object-cover" />
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-lift"
        >
          {LANGUAGES.map((l, i) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={i === current}
                onClick={() => { setCurrent(i); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  i === current ? "bg-accent-soft/70 font-semibold text-accent" : "text-ink-2 hover:bg-surface-soft hover:text-ink"
                }`}
              >
                <img src={brand.langFlags[l.flag]} alt="" className="size-5 shrink-0 rounded-full object-cover" />
                <span className="flex-1">{l.name}</span>
                {i === current ? <Check size={15} strokeWidth={3} /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
