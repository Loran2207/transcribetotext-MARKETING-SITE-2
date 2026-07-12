import { motion } from "framer-motion";
import { Youtube, Facebook } from "lucide-react";
import { Container } from "../primitives/Container";
import { Logo } from "../primitives/Logo";
import { Waveform } from "../primitives/Waveform";
import { footer } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

const SOCIAL = { YouTube: Youtube, Facebook: Facebook } as const;

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (<li key={it}><a href="#" className="text-sm text-ink-2 transition-colors hover:text-accent">{it}</a></li>))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-soft">
      <Container className="py-16">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <motion.div variants={fadeUp}>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">AI-powered audio and video transcription in 117 languages, with 99% accuracy.</p>
            <Waveform bars={26} height={20} color="accent" className="mt-5 max-w-[170px] opacity-70" />
            <div className="mt-6 flex gap-3">
              {footer.social.map((s) => {
                const Icon = SOCIAL[s as keyof typeof SOCIAL];
                return (
                  <a key={s} href="#" aria-label={s} className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink-2 shadow-soft transition-all hover:-translate-y-0.5 hover:text-accent">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>
          <motion.div variants={fadeUp}><Column title="Services" items={footer.services} /></motion.div>
          <motion.div variants={fadeUp}><Column title="Company" items={footer.company} /></motion.div>
          <motion.div variants={fadeUp}><Column title="Information" items={footer.information} /></motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {footer.copyright}</span>
          <span>{footer.companyDetails}</span>
        </motion.div>
      </Container>
    </footer>
  );
}
