# Starfolio redesign review

Implemented October 10, 2026 in `C:/codebases/Portfolio-starfolio` on `feat/starfolio-redesign`, based on original Portfolio commit `fe30e6b`. The original checkout remains on `check` with its untracked `new/` handoff intact. No merge, push, deployment, or remote PR was performed.

Preview: http://localhost:4322/ (production build, running locally).

## Implementation

- Official Starfolio `master`, commit `6d49318fee1fa9d5d48eba85f57e71c092983350`; MIT license retained in `LICENSE.starfolio`. Reuses its Outfit/Geist Mono typography, theme variables, Tailwind, shadcn button/badge primitives, timeline, and class utility.
- One Astro app with static HTML. React is used at build time; the homepage has no hydration dependency. Small inline JavaScript handles theme selection and motion. Cloudflare server hosting and fictional sample blog content were excluded.
- Light-first/system-aware dark mode, portrait hero, about, professional experience, two full-width flagship showcases, medium Nox panel, three secondary projects, education/skills, five event entries, personal photo strip, contact.
- `/projects/unipirate`, `/projects/moneo`, and `/projects/nox` include role, workflow, code-derived architecture, trade-offs, evidence, limitations, and next improvements.
- All 14 supplied silent MP4s and posters integrated. Supporting project/award loops are inside native keyboard-accessible event disclosures. Motion plays only while visible, pauses offscreen and in hidden tabs, and yields to static posters with reduced motion.
- Real public UniPirate checker and Moneo sign-in screenshots captured without logging in. Conceptual animations are labeled. Moneo sample data is fictional; WorldSim remains experimental and explicitly not predictive; Nox remains alpha.
- All 25 original public assets remain byte-for-byte intact, checked against SHA-256 inventory. Optimized derivatives improve loading; GIF event imagery has a static derivative. The portrait uses the original small photograph as fallback with a higher-resolution crop from the original large photograph.
- No CV, private financial records, phone number, or street address is published.

## Main files

| File                                                 | Responsibility                                     |
| ---------------------------------------------------- | -------------------------------------------------- |
| `src/components/HomePage.tsx`                        | Homepage and showcase hierarchy                    |
| `src/data/resume.ts`                                 | Customized professional and project content        |
| `src/data/case-studies.ts`                           | Architecture, trade-offs, evidence and boundaries  |
| `src/pages/projects/[slug].astro`                    | Static case-study routes                           |
| `src/layouts/Layout.astro`                           | SEO, navigation, theme controls                    |
| `src/styles/portfolio.css`                           | Responsive visual customization                    |
| `src/components/Motion.tsx`, `src/scripts/motion.js` | Posters and controlled playback                    |
| `public/portfolio-media`, `public/photos`            | Supplied motion and real photo derivatives         |
| `tests/`, `scripts/check-links.mjs`                  | Asset, static-output, motion and link verification |

The old Astro sections/configuration were replaced. The original git history and public files were preserved.

## Verification

Passed:

- `pnpm install`
- `pnpm typecheck`: 0 errors, warnings, hints
- `pnpm lint`: Astro/TypeScript diagnostics, 0 errors, warnings, hints (no separate ESLint configuration)
- `pnpm format:check`
- `pnpm build`: five static pages, meaningful server HTML and Open Graph/canonical metadata
- `pnpm test`: 3 passing checks covering playback decisions, all original asset hashes, static routes/local references, all 14 loop references, and valid Unicode copy
- `git diff --check` and `git diff --cached --check`

Browser checks in the T3 collaborative preview:

- Homepage plus all three case studies at 1440, 768, and 390 pixels, in both light and dark modes: 24 checks with no horizontal overflow, clipped headings, or detected WCAG A/AA violations. Raw results are in `verification/browser-results.json`.
- All 14 distinct MP4 files decoded at 960x540 without media errors; posters and public screenshots loaded.
- Visible UniPirate/Moneo loops played; offscreen loops paused. Opening an event disclosure started its visible project loop while the out-of-view award reel remained paused.
- Native keyboard focus reached the skip link with a visible outline. Theme toggle and persisted selection worked across navigation; system appearance changes also worked.
- Reduced-motion and hidden-tab decisions are tested by the Node controller test; CSS suppresses videos under the reduced-motion media query. The preview API does not expose a native reduced-motion emulation control, so a full OS-level reduced-motion browser run was not performed.
- Axe flags manual review for moving video backgrounds/captions. These silent conceptual loops contain no speech; explanatory captions and visible project descriptions remain outside the media.
- No client React bundle is loaded by these routes. Media files are static URLs, not JavaScript blobs. All 14 videos total approximately 940 KB.

External links:

- GitHub project repositories and both flagship app origins returned 200. UniPirate's public checker was opened; Moneo was opened and redirected to its email sign-in page.
- LinkedIn blocks automated requests with HTTP 999. The handoff's verified URL is retained; automated verification is inconclusive.
- Some GitHub document views returned intermittent 503 responses after initially returning 200. Their corresponding raw source files were verified with 200 responses. The link-check script reports this distinction and fails for missing/unverified destinations.
- The local Nox audit ledger is unavailable on its public default branch. That link was removed and the distinction is explained in the case study.

Known tooling warnings: the build completes with two upstream Zod/Rollup comment-annotation warnings; they do not affect generated pages. pnpm reports ignored dependency build scripts for esbuild/sharp; installed platform packages built the site successfully. No image-service runtime is used.

## Content evidence

Inspected local project revisions:

- UniPirate `b773630298ff9a358e843ab4be51e7bf4e10d874`: README, `docs/application.md`, rule/task tests and architecture paths.
- Moneo `a3cc2edbd3e5e333aa99c1afb55f27ed526e8d50`: README, import worker, finance tools, artifact SDK, test files and browser prerequisites. README's `stack.md` reference is missing; implementation details were derived from actual code instead.
- Nox `a9040bf17f35926488ea5e757c415c404a624ac5`: README and application architecture. The extension executes Notion calls itself; Codex tool requests return through Nox approval/overwrite checks.

Employer/education dates follow the supplied handoff. Email and event placements originate in the old Portfolio config. No unsupported performance percentages or production metrics are carried forward. Portfolio checks do not certify the project apps' full test suites or authenticated deployments.

## Before publication

Owner approval is required before merging or deploying. Confirm exact hackathon event/placement labels and rights to event/team photos. No public-safe CV was provided or approved; there is no CV button. Moneo authenticated screens, live AI providers, and the user's deployment configuration were not exercised. The canonical origin remains the known existing Portfolio URL and should be updated if the final domain changes.

## Screenshots

Screenshot files live in the T3 browser artifact directory. Exact paths for desktop case studies and desktop/tablet/mobile home views are recorded in `verification/browser-results.json`. The final light desktop preview is `C:/Users/mgsuk/.t3/userdata/browser-artifacts/browser-screenshot-localhost-mv2n9nr9-0f572584.png`.
