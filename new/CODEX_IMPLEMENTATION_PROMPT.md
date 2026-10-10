# Codex implementation task — rebuild Usman Khan's Portfolio with Starfolio

You are implementing a **portfolio redesign** in the existing Git repository `https://github.com/indkhan/Portfolio`. The user has selected the MIT-licensed **Starfolio** template (`https://github.com/webrating/starfolio`, default branch `master`) as the foundation. A handoff archive is supplied separately, containing `public/portfolio-media/`, content plans, and source assets. These instructions take precedence over the template's example data.

## Mission

Deliver a striking but restrained, recruiter-focused website for **Usman Khan**, a Computer Science student at Saarland University and Software & AI Engineer (Working Student) at Cyvalent. He applies for software engineering internships and engineering jobs and wants to demonstrate full-stack engineering, backend reasoning, applied AI, shipped products and hackathon achievements. Keep personality and real photographs; avoid resume-template sterility. All main content must be accurate and grounded in his CV, original Portfolio repo and documented project repositories.

## Safety and workflow FIRST

1. Inspect repository status/branch, existing code, assets, build scripts and deployment. **Do not touch `main`**. Create a separate git worktree and `feat/starfolio-redesign` branch (choose a safe unused name). If the workspace has uncommitted changes, preserve them, do not reset or overwrite them; ask before destructive operations.
2. Preserve **all existing assets** from the original `Portfolio/public/`, especially the user portraits and hackathon photographs. Keep a copy in the new worktree (original filenames can stay in `public/`). Do not invent events or participants.
3. Obtain upstream Starfolio from the official GitHub repository (master, MIT). Keep its LICENSE and attribution obligations. Use it as the website foundation rather than importing a second app beside the old app. The existing `Portfolio` git history must remain intact.
4. Read `README_START_HERE.md`, `docs/PORTFOLIO_CONTENT_AND_LAYOUT.md`, `docs/MEDIA_USAGE_AND_PROVENANCE.md`, and `docs/PROJECT_CASE_STUDIES.md` from this handoff. Treat these as the product/design brief.
5. Copy supplied media into `public/portfolio-media/`, and use `src/data/project-media.ts` / optional `src/components/PortfolioMotion.tsx` as starting references. Do not call the videos authentic site recordings: they are illustrated workflows. Optional later enhancement: rerender award reels with your original `public/` photographs using the provided generator.
6. **Do not automatically merge or deploy.** Complete in the feature worktree, test, and open a PR or present a diff for review, depending on available permissions.

## Required site design

**Design base:** use Starfolio's simple type, whitespace, responsive layout, light/dark mode and achievement timeline. Improve typography, image rhythm and cards enough that this feels like Usman's own site. Favor a neutral/light-first interface with carefully designed dark mode, restrained color accent, strong media contrast, no gimmicky parallax. Use Starfolio's shadcn/Tailwind/Astro choices unless there is a concrete technical reason not to.

**Project hierarchy is non-negotiable:**

- Tier 1 — **UniPirate** and **Moneo**, each a significantly larger, dedicated full-width media-and-story showcase with moving previews, demo + code links, and dedicated detail pages.
- Tier 2 — **Nox**, a medium-sized featured showcase noticeably more prominent than ordinary projects, but smaller than the two flagships. Show local-first architecture, Codex/Notion MCP and approval behavior; label Alpha.
- Tier 3 — **WorldSim**, **DreamTransport**, **Voice Oasis** as smaller cards with loops. Keep WorldSim explicitly experimental, not predictive.
- Hackathon-only supporting projects — **Klebl**, **MHack / UdS Operator**, **SwissInsight**; showcase via their respective hackathon entries and a compact Selected More Work section if needed, not as primary flagships.

Suggested homepage order: hero → short About → professional Experience → Featured Projects (tier 1 and 2) → Other Projects → Education + Skills → Hackathon Awards (five events) → curated personal/event photo strip → contact. Blog hidden until real posts exist. Avoid repetitive full-height sticky sections.

**Hero** should say `Hi, I'm Usman.` and `Software Engineer · Full-Stack & Applied AI`, explain building real products with reliable AI systems, show user portrait from existing repo, social links and a prominent Projects CTA. Show CV link only when the user has approved a **public-safe résumé**—the provided CV includes private contact details and full street address, so do not publish that PDF by default. Contact email is okay; do not put phone number / street address on the homepage.

**Experience** (from user's CV; do not copy fictional Starfolio data):
- Cyvalent / 3kb GmbH — Software & AI Engineer (Working Student), Jul 2026–present; Next.js, TypeScript, PostgreSQL; AI-assisted evidence onboarding, document ingestion, citation-backed results, editable review.
- PersonalClientCare (PCC) — Full-Stack Engineer (Working Student), Sep 2025–Jun 2026; AI agents, scheduled/event-driven workflows, document processing, Flutter applications.
- LeadLane — Founding Engineer (Working Student), Jul–Aug 2025; AI-powered B2B sales MVP, RAG, backend APIs, React/Next.js.
Avoid unverified percentages, metrics and private employer details.

**Education:** B.Sc. Computer Science, Saarland University, Oct 2024–present (as stated on CV). **Skills:** TypeScript, JavaScript, Python, React, Next.js, Node.js, PostgreSQL, Supabase, Docker, AI tools/workflows, RAG, MCP, tool calling, Git; use a curated subset, not an infinite logo wall. **Contact:** verified LinkedIn `https://www.linkedin.com/in/indkhan`, GitHub `https://github.com/indkhan`, and known email from existing repo config.

**Hackathons** from original Portfolio code: Mittelstand Hackathon/Klebl (1st); {Tech: Europe} AI Hackathon/MHack (3rd); START HACK 2025/Voice Oasis (3rd); SwissHacks/SwissInsight (2nd); Servus AI Summer/DreamTransport (2nd). These ranks are from existing portfolio config, not independently verified; confirm before publication. Use original event photographs wherever possible, optionally alongside the supplied award MP4s. Each has event, location, project, award, 1–2 clear sentences and source link.

**Dedicated case studies:** build `/projects/unipirate` and `/projects/moneo`, with header, looping media, problem, user workflow, system architecture (real code based), design trade-offs, role, tests and verified limitations. Optionally a lighter `/projects/nox` page. Never imply unsupported features or fabricate production metrics.

## Media integration and engineering requirements

- Supplied media paths are manifest-backed. Project loops are `.mp4` with `.webp` posters, 960×540, muted, no audio. Stars/default poster are **NOT** an excuse to substitute unrelated stock illustrations.
- Videos should use `muted playsInline loop poster`, `preload="none"` or metadata only; autoplay **only when in view** using IntersectionObserver. Stop when offscreen. If `prefers-reduced-motion: reduce`, show poster instead. Provide alt text/context and keyboard-accessible links.
- Starfolio's shipped `src/pages/index.astro` uses `<HomePage client:only="react" />`. Do not leave the entire homepage client-only: prefer server-rendered markup (e.g. SSR-capable React with `client:load`, or properly separated Astro sections and interactive islands) so crawlers and no-JS users see the profile and project content. Verify `astro build` output actually contains meaningful HTML.
- Protect privacy: Moneo UI animations use **fictional sample data** only. Other animations are labeled conceptual and should not mislead about real UI screens. Live demos are linked only when they work. If login is required, state that rather than claiming a public demo route.
- Keep accessibility: link labels, image alt text, contrast, responsive headings, motion preferences; check desktop (1440px), tablet (768px) and mobile (390px).
- Existing original image references include `usman-big.jpg`, `usman-small.jpg`, `mittelstadt.png`, `mittelstand2.jpeg`, `mittelstand3.jpeg`, `munichhack.jpeg`, `starthack.jpg`, `start_hack2.jpeg`, `swisshacks1.jpeg`, `swisshacks2.jpeg`, `swisshacks3.gif`, `dream_transport.gif`, `klebl.png`, `mhack.png`, `swiss.png`, `voice_oasis.png`, etc. Validate files exist after migration.

## Verify before finishing

1. Install dependencies and run working package-manager equivalents of typecheck, lint, format and `pnpm build`; resolve issues.
2. Run browser smoke checks and inspect screenshots at 1440, 768 and 390 widths. No overflow, clipped titles, broken cards or missing poster files. Confirm video behavior incl. reduced motion and off-screen pause.
3. Open each demo/repository/CV link and ensure destinations exist; use actual known URLs, not guessed ones.
4. Check the two detail routes and homepage render meaningful SEO/OG data as server HTML. Confirm accessible headings, focus states, image alt text and reasonable contrast.
5. Keep bundle sensible: no giant video blobs in JavaScript, video formats static under `public`, no unnecessary dependencies, lazy load motion.
6. Document remaining unknowns (demo logins, exact hackathon placements, unavailable CV version, user-owned deployment, photo rights) instead of making claims.
7. Present a review summary: files changed, implementation, screenshots/preview URL, commands passed or failed, caveats. **Do not merge or deploy unless expressly asked.**

## Desired result

A beautiful, product-first Starfolio-based website that actually represents Usman's work, with all 14 loops and existing real photography integrated, two outstanding flagship case studies, and engineering-grade verification. Make sensible choices without repeatedly asking trivial questions, but ask before publishing private data or performing irreversible actions.
