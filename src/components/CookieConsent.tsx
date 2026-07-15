import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
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

export function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [forced, setForced] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(() => buildPrefs((always) => always));

  useEffect(() => {
    let search = "";
    try {
      search = window.location.search;
    } catch {
      search = "";
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
                  {c.categories.map((cat, i) => (
                    <div key={cat.key} className={i > 0 ? "border-t border-border-soft pt-4" : ""}>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-ink">{cat.title}</h3>
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
                      <p className="mt-1.5 text-sm text-ink-2">{cat.body}</p>
                    </div>
                  ))}
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
