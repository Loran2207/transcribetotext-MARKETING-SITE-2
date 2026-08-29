import { motion } from "framer-motion";
import { Stars } from "../primitives/Stars";
import { brand } from "../../data/assets";
import { fadeUp } from "../../lib/motion";

/* The block the app's 10.08 revision added between the promo and the plan
   cards: four real reviewer faces, the stars, and the review count - social
   proof at the exact moment of choosing. Mirrored here so the funnel says the
   same thing the product says. */
export function SocialPill() {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-6 flex justify-center">
      <div className="inline-flex items-center gap-3.5 rounded-full border border-border bg-white py-2.5 pl-3 pr-5 shadow-card">
        <span className="flex -space-x-2.5">
          {brand.avatars.slice(0, 4).map((a) => (
            <img key={a} src={a} alt="" aria-hidden className="size-8 rounded-full ring-2 ring-white" />
          ))}
        </span>
        <span className="flex flex-col gap-0.5">
          <Stars count={5} />
          <span className="text-[12px] text-muted">based on 300+ reviews</span>
        </span>
      </div>
    </motion.div>
  );
}
