import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Cookie, X } from "lucide-react";
import { subscribe } from "../data/subscribe";
import { EASE_OUT, SPRING } from "../lib/motion";

const STORAGE_KEY = "ttt_cookie_consent";
const c = subscribe.cookie;

const primaryPill =
  "inline-flex h-11 items-center justify-center rounded-full bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_100%)] px-5 text-sm font-medium text-white shadow-blue ring-1 ring-inset ring-white/20 transition hover:brightness-[1.05]";
const outlinePill =
  "inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-medium text-ink shadow-soft transition hover:border-accent/40 hover:bg-surface-soft";
const ghostPill =
  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-ink-2 transition hover:bg-ink/5 hover:text-ink";

type Prefs = Record<string, boolean>;

type CookieRow = { name: string; duration: string; desc: string };

// Honest, generic sample cookies revealed when a category row is expanded.
const cookieDetails: Record<string, CookieRow[]> = {
  necessary: [
    { name: "ttt_consent", duration: "1 year", desc: "Remembers your cookie choices so we respect them on your next visit." },
  ],
  functional: [
    { name: "ttt_session", duration: "1 month", desc: "Keeps functional features like shared content and feedback working." },
  ],
  analytics: [
    { name: "_ga", duration: "1 year 1 month", desc: "Google Analytics uses this to count and track visits anonymously." },
    { name: "_ga_*", duration: "1 year 1 month", desc: "Google Analytics session and campaign data." },
  ],
  advertising: [
    { name: "_gcl_au", duration: "3 months", desc: "Measures how our ad campaigns perform." },
    { name: "_fbp", duration: "3 months", desc: "Used to deliver and measure relevant ads." },
  ],
};

function buildPrefs(fill: (always: boolean) => boolean): Prefs {
  const next: Prefs = {};
  for (const cat of c.categories) next[cat.key] = fill(Boolean(cat.always));
  return next;
}

function persist(value: Prefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode); consent still applies for this visit.
  }
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-soft transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="ml-7 mt-3 overflow-hidden rounded-xl bg-surface-soft p-3 text-sm">
      <div className="divide-y divide-border-soft">
        {rows.map((row) => (
          <dl key={row.name} className="grid gap-1.5 py-2.5 first:pt-0 last:pb-0">
            <div className="flex gap-3">
              <dt className="w-[90px] shrink-0 text-muted">Cookie</dt>
              <dd className="min-w-0 font-mono text-ink">{row.name}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[90px] shrink-0 text-muted">Duration</dt>
              <dd className="min-w-0 text-ink">{row.duration}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-[90px] shrink-0 text-muted">Description</dt>
              <dd className="min-w-0 text-ink">{row.desc}</dd>
            </div>
          </dl>
        ))}
      </div>
    </div>
  );
}

export function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [forced, setForced] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(() => ({ ...buildPrefs((always) => always), functional: true }));
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    let search = "";
    try {
      search = window.location.search;
    } catch {
      search = "";
    }
    if (search.includes("cookies=prefs-open")) {
      setForced(true);
      setModalOpen(true);
      setOpenKeys(new Set(["analytics"]));
      return;
    }
    if (search.includes("cookies=prefs")) {
      setForced(true);
      setModalOpen(true);
      return;
    }
    if (search.includes("cookies=banner")) {
      setForced(true);
      setBannerOpen(true);
      return;
    }
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (!stored) setBannerOpen(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const dismiss = () => {
    if (forced) return;
    setBannerOpen(false);
    setModalOpen(false);
  };

  const acceptAll = () => {
    const next = buildPrefs(() => true);
    setPrefs(next);
    persist(next);
    dismiss();
  };

  const rejectAll = () => {
    const next = buildPrefs((always) => always);
    setPrefs(next);
    persist(next);
    dismiss();
  };

  const savePrefs = () => {
    persist(prefs);
    dismiss();
  };

  const toggle = (key: string) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleOpen = (key: string) =>
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <>
      <AnimatePresence>
        {bannerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 z-[70] p-4"
          >
            <div className="mx-auto max-w-[1100px] rounded-tile border border-border bg-white/95 p-5 shadow-lift backdrop-blur sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Cookie className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-ink">{c.title}</h2>
                    <p className="mt-1 text-sm text-ink-2">{c.body}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center">
                  <button type="button" onClick={() => setModalOpen(true)} className={`${outlinePill} w-full sm:w-auto`}>
                    {c.customise}
                  </button>
                  <button type="button" onClick={rejectAll} className={`${ghostPill} w-full sm:w-auto`}>
                    {c.rejectAll}
                  </button>
                  <button type="button" onClick={acceptAll} className={`${primaryPill} w-full sm:w-auto`}>
                    {c.acceptAll}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="fixed inset-0 z-[80] grid place-items-center p-4"
          >
            <div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-prefs-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={SPRING}
              className="relative flex max-h-[85vh] w-full max-w-[560px] flex-col overflow-hidden rounded-tile bg-white shadow-lift"
            >
              <div className="flex items-start justify-between gap-4 p-6 pb-4">
                <div>
                  <h2 id="cookie-prefs-title" className="font-display text-lg font-semibold text-ink">
                    {c.prefsTitle}
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-2">{c.prefsIntro}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close cookie preferences"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition hover:brightness-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-6">
                <div className="space-y-4 pb-2">
                  {c.categories.map((cat, i) => {
                    const isOpen = openKeys.has(cat.key);
                    const rows = cookieDetails[cat.key] ?? [];
                    return (
                      <div key={cat.key} className={i > 0 ? "border-t border-border-soft pt-4" : ""}>
                        <div className="flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => toggleOpen(cat.key)}
                            aria-expanded={isOpen}
                            className="group flex min-w-0 flex-1 items-center gap-2 text-left"
                          >
                            <motion.span
                              animate={{ rotate: isOpen ? 90 : 0 }}
                              transition={{ duration: 0.2, ease: EASE_OUT }}
                              className="grid h-5 w-5 shrink-0 place-items-center text-muted transition-colors group-hover:text-ink"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </motion.span>
                            <h3 className="truncate font-semibold text-ink">{cat.title}</h3>
                          </button>
                          {cat.always ? (
                            <span className="text-sm font-semibold text-trust">{c.alwaysActive}</span>
                          ) : (
                            <Toggle
                              checked={Boolean(prefs[cat.key])}
                              onChange={() => toggle(cat.key)}
                              label={cat.title}
                            />
                          )}
                        </div>
                        <p className="mt-1.5 pl-7 text-sm text-ink-2">{cat.body}</p>
                        <AnimatePresence initial={false}>
                          {isOpen && rows.length > 0 && (
                            <motion.div
                              key="details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: EASE_OUT }}
                              className="overflow-hidden"
                            >
                              <CookieTable rows={rows} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border-soft p-6 pt-4 sm:flex-row">
                <button type="button" onClick={savePrefs} className={`${outlinePill} w-full`}>
                  {c.save}
                </button>
                <button type="button" onClick={acceptAll} className={`${primaryPill} w-full`}>
                  {c.acceptAll}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
