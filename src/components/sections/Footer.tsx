import { motion } from "framer-motion";
import { Youtube, Facebook } from "lucide-react";
import { Container } from "../primitives/Container";
import { footer, nav } from "../../data/content";
import { brand } from "../../data/assets";
import { fadeUp, fadeIn, stagger, viewportOnce } from "../../lib/motion";

const COMPANY_ANCHORS = ["#premium", "#how", "#languages", "#pricing", "#reviews", "#faq"];

function hrefFor(columnTitle: string, index: number): string {
  if (columnTitle === "Top Services") return "#services";
  if (columnTitle === "Company") return COMPANY_ANCHORS[index] ?? "#";
  return "#";
}

const SOCIALS = [
  { label: "YouTube", href: "https://www.youtube.com/@Transcribetotextai", Icon: Youtube, bg: "#FF0000" },
  { label: "Facebook", href: "https://www.facebook.com/transcribetotextai", Icon: Facebook, bg: "#1877F2" },
] as const;

export function Footer() {
  return (
    <footer className="bg-tint-sky pt-14">
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-4 gap-10"
        >
          {footer.columns.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <p className="mb-4 font-display font-semibold text-ink">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link, i) => (
                  <li key={link}>
                    <a href={hrefFor(col.title, i)} className="text-[15px] text-ink-2 transition-colors hover:text-accent">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div variants={fadeUp}>
            <p className="mb-4 font-display font-semibold text-ink">{footer.followTitle}</p>
            <div className="flex gap-3">
              {SOCIALS.map(({ label, href, Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={18} fill="currentColor" strokeWidth={label === "Facebook" ? 0 : 1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex items-center justify-between gap-6 border-t border-border pb-28 pt-6"
        >
          <img src={brand.logo} alt={nav.logo} className="h-6 w-auto" />
          <span className="text-sm text-ink-2">{footer.copyright}</span>
          <span className="text-xs text-muted">{footer.companyDetails}</span>
        </motion.div>
      </Container>
    </footer>
  );
}
