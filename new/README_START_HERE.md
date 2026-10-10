# Starfolio × Usman Khan — Codex handoff

This handoff is for the existing `indkhan/Portfolio` repository. **It is not a modified copy of the Starfolio theme or your existing repository.** Codex should obtain the upstream template from https://github.com/webrating/starfolio, customize it in a separate worktree/branch of your Portfolio repository, and merge only after review.

## What's included

- `public/portfolio-media/projects/` — **9 actual muted, looping MP4 animations**, one per featured/secondary project.
- `public/portfolio-media/hackathons/` — **5 actual MP4 highlight reels**, one per hackathon.
- `public/portfolio-media/posters/` — WebP poster images for every animation.
- `src/data/project-media.ts` — typed path/metadata manifest.
- `src/components/PortfolioMotion.tsx` — optional reduced-motion-aware lazy video component for React sections.
- `docs/PORTFOLIO_CONTENT_AND_LAYOUT.md` — exact content and visual hierarchy.
- `docs/MEDIA_USAGE_AND_PROVENANCE.md` — asset authenticity, photo instructions, performance and accessibility.
- `docs/PROJECT_CASE_STUDIES.md` — structure for detailed flagship pages.
- `CODEX_IMPLEMENTATION_PROMPT.md` — instructions to give Codex.
- `scripts/generate_portfolio_media.py` — source generator so loops can be remade / combined with existing event photos.

## First actions

1. Download this ZIP into a location Codex can access. This chat's sandbox links do not automatically become files in the Codex runtime.
2. Open the **existing `Portfolio` repo** in Codex. Preserve its `public/` folder and all original photos. Do not implement on `main` directly.
3. Ask Codex to read and follow `CODEX_IMPLEMENTATION_PROMPT.md`, supplying the location of the extracted ZIP.
4. Let Codex pull the **Starfolio `master`** branch in a temporary directory, integrate it in a feature worktree, then import the media from `public/portfolio-media/`.
5. Review the local preview/PR before merging or deploying.

## Important authenticity note

Project MP4s are polished **conceptual workflow animations** generated from verified high-level project capabilities, *not actual product screen recordings*. No customer records or personal financial data appear in the media. The five hackathon loops are graphic award reels until rebuilt with your original, existing event photos. The source generator can do this using `--existing-assets /path/to/old/Portfolio/public`; after that, Codex should replace the initial hackathon videos/posters with those photo-rich outputs.

The template's sample company histories, usernames, achievements, and project links must be removed, not retained.

## No publishing has happened

These files only live in your downloadable handoff. They have not been committed to GitHub or deployed.
