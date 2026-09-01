/* One typographic scale for the whole site (Kirill, round 14).
   Before this, the large headings had drifted apart - 46 on the final CTA, 44
   on the section heading, 42 on reviews, 40 on features/trust/languages and 32
   on the paywall's own title - so two headings a reader sees in one screen were
   different sizes for no reason.

   There are exactly TWO sizes now:
   - PAGE_TITLE  - the one h1 a page owns (the landing hero, the paywall, skip)
   - SECTION_TITLE - every section heading on every page

   The page title stays a step above the section title, which is what keeps the
   hierarchy readable; everything within each level is identical everywhere.
   Weight is extrabold: the paywall's own headings had always been extrabold and
   dropping them to bold read as "невзрачные" (Kirill, round 17), so the whole
   site rises to that weight rather than the paywall falling to the lighter one.
   Colour is applied by the caller, since the same size is used on light and
   dark surfaces. */

export const PAGE_TITLE =
  "text-balance font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] sm:text-[38px] md:text-[44px]";

export const SECTION_TITLE =
  "text-balance font-display text-[26px] font-extrabold leading-[1.15] tracking-[-0.025em] sm:text-[32px] md:text-[36px]";
