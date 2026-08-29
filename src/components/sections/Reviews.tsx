import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "../primitives/Section";
import { reviews } from "../../data/content";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

/* Trustpilot's own review widget is a row of filled green squares, each holding
   a white star - that shape is what makes a review card read as Trustpilot at a
   glance, so it is drawn rather than approximated with generic stars.
   TODO before launch: swap the wordmark below for Trustpilot's official asset
   and pull real reviews through their API. */
const TP_GREEN = "#00B67A";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-[2px]" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="flex size-[18px] items-center justify-center rounded-[2px]"
          style={{ backgroundColor: i < n ? TP_GREEN : "#DCDCE6" }}
        >
          <svg viewBox="0 0 24 24" className="size-[13px]" fill="#fff" aria-hidden>
            <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95L12 2.6z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

function TrustpilotMark() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="size-[14px]" fill={TP_GREEN} aria-hidden>
        <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95L12 2.6z" />
      </svg>
      <span className="text-[12px] font-bold tracking-[-0.01em] text-ink">{reviews.source}</span>
    </span>
  );
}

const PER_PAGE = 3;

export function Reviews() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(reviews.items.length / PER_PAGE);
  const shown = reviews.items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Section id="reviews" tone="soft">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-balance font-display text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl md:text-[42px]"
        >
          {reviews.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
          <Stars />
          {reviews.ratingLabel}
        </motion.p>
      </motion.div>

      <div className="relative mt-9 md:mt-12">
        <motion.ul
          key={page}
          variants={stagger(0.07)}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {/* The brief's card is stars, the review, the name and the Trustpilot
              attribution. No headline: the headlines the site had ("Finally",
              "nice nice") are exactly what it asks to remove. */}
          {shown.map((r) => (
            <motion.li
              key={r.name}
              variants={fadeUp}
              className="flex flex-col rounded-[20px] border border-border bg-white p-5 shadow-soft"
            >
              <Stars n={r.stars} />
              <p className="mt-3.5 flex-1 text-pretty text-sm leading-relaxed text-ink-2">{r.quote}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border-soft pt-3.5">
                <span className="min-w-0 truncate text-[13px] font-semibold text-ink">{r.name}</span>
                <TrustpilotMark />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {pages > 1 ? (
          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => setPage((p) => (p - 1 + pages) % pages)}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-ink-2 shadow-soft transition hover:border-accent/40 hover:text-accent"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="flex gap-1.5">
              {Array.from({ length: pages }).map((_, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-accent" : "w-1.5 bg-border"}`} />
              ))}
            </span>
            <button
              type="button"
              aria-label="More reviews"
              onClick={() => setPage((p) => (p + 1) % pages)}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-ink-2 shadow-soft transition hover:border-accent/40 hover:text-accent"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
