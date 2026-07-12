import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, AudioLines, ChevronDown, CloudUpload, Mic, Music2, Music4,
  UserRound, Users, Video, Youtube,
} from "lucide-react";
import { Logo } from "../primitives/Logo";
import { Button } from "../primitives/Button";
import { audioToText, nav, navServices } from "../../data/content";
import { EASE_OUT } from "../../lib/motion";

const SERVICE_ICONS = [AudioLines, Video, Users, CloudUpload, Mic, Youtube, Music2, Music4];

function EqBars() {
  return (
    <span aria-hidden="true" className="flex h-6 items-end gap-[3px]">
      {[0.5, 0.9, 0.65, 1, 0.75].map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom rounded-full bg-accent animate-[eq_1.1s_ease-in-out_infinite]"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}

function FeaturesMenu() {
  const [active, setActive] = useState(0);
  const svc = navServices[active];
  return (
    <div className="invisible pointer-events-none absolute -left-24 top-full pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100">
      <div className="grid w-[860px] grid-cols-[300px_1fr] gap-3 rounded-[24px] border border-border bg-white p-3 shadow-lift">
        <div className="flex flex-col gap-0.5">
          {navServices.map((s, i) => {
            const RowIcon = SERVICE_ICONS[i];
            const isActive = i === active;
            return (
              <a
                key={s.key}
                href="#services"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-accent-soft/70 text-accent" : "text-ink-2 hover:text-ink"
                }`}
              >
                <RowIcon size={17} className={isActive ? "text-accent" : "text-muted"} />
                <span className="flex-1">{s.label}</span>
                {isActive ? <ArrowRight size={15} /> : null}
              </a>
            );
          })}
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-accent/10 bg-accent-soft/50 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={svc.key}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              <div className="flex items-center gap-3">
                <EqBars />
                <h3 className="font-display text-xl font-semibold text-ink">{svc.label}</h3>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">{svc.desc}</p>
              {svc.formats ? (
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {audioToText.formats.map((f) => (
                    <a key={f} href="#services" className="group/chip flex items-center justify-between rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-ink shadow-soft transition hover:border-accent/40">
                      {f}
                      <ArrowRight size={14} className="text-muted transition group-hover/chip:translate-x-0.5 group-hover/chip:text-accent" />
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, [0, 80], [0, 1]);
  const bg = useTransform(scrollY, [0, 80], [0.6, 1]);
  return (
    <motion.header initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASE_OUT }} className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ opacity: bg }} className="absolute inset-0 -z-10 bg-white/85 backdrop-blur-xl" />
      <motion.div style={{ opacity: shadow }} className="absolute inset-x-0 bottom-0 h-px bg-border" />
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-6 px-6 md:px-10">
        <Logo />
        <ul className="ml-2 flex items-center gap-7">
          {nav.links.map((l) =>
            l.label === "Features" ? (
              <li key={l.href} className="group relative">
                <a href={l.href} className="inline-flex items-center gap-1 py-5 text-sm font-medium text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                  <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                </a>
                <FeaturesMenu />
              </li>
            ) : (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            )
          )}
        </ul>
        <div className="ml-auto flex items-center gap-3">
          <a href="#" className="inline-flex h-10 items-center gap-2 rounded-full bg-surface-soft px-4 text-sm font-medium text-ink-2 transition-colors hover:text-ink">
            <UserRound size={16} />
            {nav.login}
          </a>
          <Button href="/subscribe" size="md">{nav.cta}</Button>
        </div>
      </nav>
    </motion.header>
  );
}
