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

/* Closed it is a flag, two letters and a chevron - the smallest thing that
   still says which language you are reading and that it can be changed. */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
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
        className={`inline-flex items-center gap-2 rounded-full font-medium text-ink-2 transition-colors hover:text-ink ${
          compact ? "h-11 px-3 text-sm" : "h-10 px-3 text-sm"
        }`}
      >
        <img src={brand.langFlags[lang.flag]} alt="" className="size-5 shrink-0 rounded-full object-cover" />
        {/* On a phone the header already carries a menu, a logo and an account
            icon; the two letters are what gives way, since the flag says the
            same thing in less room. */}
        {compact ? null : <span>{lang.code}</span>}
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
