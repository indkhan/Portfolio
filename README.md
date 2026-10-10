# Usman Khan - Starfolio portfolio

A recruiter-focused portfolio built from the official MIT-licensed Starfolio foundation: Astro, Tailwind CSS, Outfit / Geist Mono, shadcn buttons and badges, and the achievement timeline. Pages render as static HTML; React components render during the build and do not hydrate in the browser.

## Development and verification

Requires Node 22.12+ and pnpm 10.18.2.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm test
node scripts/check-links.mjs
pnpm preview --host 0.0.0.0 --port 4322
```

`lint` runs Astro/TypeScript diagnostics. Formatting is checked separately with Prettier. Tests require a fresh build and cover static routes, media and local links, original asset hashes, Unicode copy, and video playback decisions.

## Content and assets

- `src/data/resume.ts`: experience, skills, projects, hackathons.
- `src/data/project-media.ts`: supplied media manifest.
- `src/components/HomePage.tsx`: server-rendered homepage.
- Projects link directly to their live apps and source code; there are no separate project pages.
- `src/scripts/motion.js`: visible-only playback, reduced motion, hidden-tab pause, and native controls when autoplay is blocked.
- `public/portfolio-media`: 14 silent illustrated loops and posters; two actual public screenshots.
- `public/photos`: optimized photo derivatives. All 25 original public assets retain their names and bytes.
- `scripts/generate_portfolio_media.py`: supplied generator with optional photo integration.

No CV, phone number, street address, or private finance records are published. Animations are illustrative; Moneo records are fictional. Hackathon ranks need owner confirmation before publication. Nox alpha and project limitations are explicit.

## Review status

Work is isolated on `feat/starfolio-redesign`. No merge, push, or deployment was performed. See `docs/REDESIGN_REVIEW.md` for verification, provenance, screenshots, and remaining publication checks.

## Attribution

Starfolio: https://github.com/webrating/starfolio, master commit `6d49318fee1fa9d5d48eba85f57e71c092983350`. Its MIT license is retained in `LICENSE.starfolio`. The original Portfolio history and assets are preserved. Starfolio components were adapted for flagship showcases and static rendering. The Cloudflare adapter and sample blog were omitted because this repository uses static hosting and has no real posts.
