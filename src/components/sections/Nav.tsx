import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "../primitives/Logo";
import { Button } from "../primitives/Button";
import { nav } from "../../data/content";
import { EASE_OUT } from "../../lib/motion";

export function Nav() {
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, [0, 80], [0, 1]);
  const bg = useTransform(scrollY, [0, 80], [0.6, 1]);
  const [open, setOpen] = useState(false);
  return (
    <motion.header initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASE_OUT }} className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ opacity: bg }} className="absolute inset-0 -z-10 bg-white/85 backdrop-blur-xl" />
      <motion.div style={{ opacity: shadow }} className="absolute inset-x-0 bottom-0 h-px bg-border" />
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-6 px-6 md:px-10">
        <Logo />
        <ul className="ml-2 hidden items-center gap-7 lg:flex">
          {nav.links.map((l) => (<li key={l.href}><a href={l.href} className="text-sm font-medium text-ink-2 transition-colors hover:text-ink">{l.label}</a></li>))}
        </ul>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a href="#" className="hidden text-sm font-medium text-ink-2 transition-colors hover:text-ink sm:block">{nav.login}</a>
          <Button href="/subscribe" size="md" className="hidden sm:inline-flex">{nav.cta}</Button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-ink shadow-soft lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mx-4 mt-2 rounded-2xl border border-border bg-white p-4 shadow-lift lg:hidden">
            <ul className="flex flex-col">
              {nav.links.map((l) => (<li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-2 hover:bg-surface-soft hover:text-ink">{l.label}</a></li>))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <a href="#" className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-2">{nav.login}</a>
              <Button href="/subscribe" size="md" className="w-full">{nav.cta}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
