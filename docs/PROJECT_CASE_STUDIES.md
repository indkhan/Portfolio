# Case-study template and truthful project-specific prompts

## Page requirements

Implement `/projects/unipirate` and `/projects/moneo`. Each page should include:

1. A strong one-sentence problem statement and clear personal role (don't conflate individual and team work).
2. Representative looping animation + real screenshots from a demo or anonymized sample account when safely available. Label animations as illustrative.
3. Links to working app and source code.
4. Concise user journey from input to outcome, with 3–5 actual features.
5. A 4–6 block architecture diagram derived from **the current code**, not speculative boxes.
6. Specific engineering choices and trade-offs, ideally three concise examples each.
7. Testing/evidence and known limitations. Do not claim a clean deployment solely because local tests passed.
8. 'What I'd improve next' with accurate current backlog items.

## UniPirate — depth opportunities

- *Problem:* international applicants face fragmented and country-/qualification-specific rules.
- *Why deterministic rules:* AI shouldn't decide academic eligibility based only on probabilistic prose.
- *Source provenance:* how citations, review/approval and unknown coverage are represented.
- *Product boundaries:* application tracker, personal tasks vs officially sourced tasks, review/correction.
- *Known caveat:* upstream source coverage and AI provider availability can limit certain answers; use current repository verification before stating live status.

## Moneo — depth opportunities

- *Problem:* transaction files give records but not clear financial insight or forward planning.
- *Import architecture:* CSV/Excel parsing, field interpretation, validation, dedupe and review.
- *Financial correctness:* transferred funds not counted twice, deterministic amounts/calculations, evidence traceability.
- *AI-generated tools:* trusted finance APIs, activation validation, interactive recalculation and permissions.
- *Background work:* resumable analysis and tracked states; verify code before describing system precisely.
- *Privacy:* never publish genuine transactions, account numbers, names, balances, or user documents.

## Nox — optional lightweight technical page

Explain local-first Chrome side panel + Codex CLI + Notion MCP, explicit approvals and limitations in its alpha README. Avoid calling it fully production-ready.

## Verification before publish

Read each repo's `README.md`, tests and corresponding architecture notes; cross-check any external link and feature. Avoid performance metrics or claims unsupported by documented evidence. The animation scenes are storyboards, not proof that the current deployment implements each journey end-to-end.
