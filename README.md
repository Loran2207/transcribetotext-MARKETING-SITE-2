# TranscribeToText.AI marketing site

Redesigned marketing landing for TranscribeToText.AI. A bright, minimal, premium
light UI built on the real brand: the actual logo, brand blue (#0088EB), and real
product assets (icons, avatars, language flags, product screenshots) pulled from the
live site. All copy and section order are preserved from the current site; only the
visual layer is new.

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/index.css`)
- Framer Motion (scroll reveals, pricing toggle, FAQ accordion, count-up)
- lucide-react icons
- Google Fonts: Inter Tight (display) + Inter (body)

## Develop
    npm install
    npm run dev       # http://localhost:5173
    npm run build     # type-check + production build to dist/
    npm run preview   # serve the built site on :4173

## Structure
- `src/data/content.ts` - all copy, single source of truth
- `src/data/assets.ts` - map of the real brand assets in public/brand/
- `src/lib/motion.ts` - shared animation variants and easings
- `src/components/primitives/` - Button, Chip, Section, Waveform, and other building blocks
- `src/components/sections/` - the 14 landing sections, composed in `src/App.tsx`
- `public/brand/` - real logo, icons, avatars, flags and product screenshots

## Deploy
Vercel auto-detects Vite. Build command `npm run build`, output directory `dist`.
