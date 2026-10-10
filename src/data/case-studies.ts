export const cases = {
  unipirate: {
    title: "UniPirate",
    eyebrow: "University applications · Independent product",
    problem:
      "International applicants should not have to piece together their future from scattered admission rules.",
    role: "Independent project · Product & full-stack engineering",
    context: "Next.js · TypeScript · Supabase · OpenRouter",
    introduction:
      "UniPirate connects a branching eligibility checker with source evidence and an application workspace. The key boundary is deliberate: deterministic rules evaluate eligibility; AI helps people navigate the supporting information.",
    journey: [
      [
        "Describe your education",
        "Answer branching questions about qualifications, grades, and the degree you want to pursue.",
      ],
      [
        "See a sourced route",
        "Read the evaluated outcome, official source references, and explicit unknowns where rule coverage is missing.",
      ],
      [
        "Find and save courses",
        "Explore courses and import course information for review, with deterministic DAAD parsing and optional AI extraction.",
      ],
      [
        "Plan your application",
        "Track applications, personal tasks, course tasks, and deadlines in Now / Next / Later views and a calendar.",
      ],
    ],
    architecture: [
      [
        "Next.js routes",
        "Public checker and results; authenticated application workspace and admin review.",
        "app/(public), app/(app), app/(admin)",
      ],
      [
        "Session & validation",
        "Session refresh, user/admin guards, and input schemas gate requests before domain logic.",
        "proxy.ts · lib/auth",
      ],
      [
        "Pure rule engine",
        "Eligibility is evaluated without model calls or I/O; unknown coverage stays explicit.",
        "lib/engine",
      ],
      [
        "Courses & tasks",
        "Source-aware course research and pure task generation feed persisted application plans.",
        "lib/courses · lib/tasks",
      ],
      [
        "Bounded AI assistance",
        "Retrieval, citations, quota handling, and provider-backed extraction assist the workflow.",
        "lib/ai",
      ],
      [
        "Supabase",
        "Postgres, authentication, embeddings, and row-level security provide storage and ownership boundaries.",
        "lib/db · supabase/migrations",
      ],
    ],
    flow: "Browser → session & validation → rule engine / course-task services → Supabase. AI assistance reads supporting evidence through its own bounded tools.",
    choices: [
      [
        "Rules before prose",
        "A probabilistic answer is not an eligibility decision. A pure rules core makes outcomes testable, but requires reviewed records for every covered qualification. Missing coverage returns an unknown rather than a guess.",
      ],
      [
        "Evidence travels with the result",
        "Source references and review status remain attached to claims. This adds review work, but makes it possible to inspect why a result exists and distinguish reviewed rules from draft information.",
      ],
      [
        "Authorization in the database",
        "Session-scoped query helpers and row-level security enforce user ownership. A dedicated server-only check writer handles validated anonymous results, which can later be claimed securely.",
      ],
    ],
    evidence: [
      [
        "Architecture & boundaries",
        "https://github.com/indkhan/unipirate/blob/main/docs/application.md",
      ],
      [
        "Rule assessment tests",
        "https://github.com/indkhan/unipirate/tree/main/lib/rules/__tests__",
      ],
      [
        "Verification status & blockers",
        "https://github.com/indkhan/unipirate/blob/main/docs/STATUS.md",
      ],
    ],
    testing:
      "The repository contains Vitest coverage for rule assessments, task generation, result views, and ownership flows, plus SQL checks for database contracts. This case study describes that coverage; it does not claim that every app test or live integration was rerun for this portfolio.",
    limitations:
      "Rule coverage is incomplete. AI assistance needs configured OpenRouter credentials and embeddings. The public checker was reachable during portfolio review; authenticated and provider-dependent workflows were not exercised. Email reminders, rule-change notifications, a standalone grade converter, and an APS wizard are not implemented.",
    next: "Expand reviewed qualification coverage and validate source freshness before adding more guidance. Keep unresolved outcomes visible as the product grows.",
    nextId: "moneo",
    nextTitle: "Moneo",
  },
  moneo: {
    title: "Moneo",
    eyebrow: "Personal finance · Independent product",
    problem:
      "Transaction files tell you what happened. Understanding the numbers—and deciding what to do next—takes more work.",
    role: "Independent project · Product & full-stack engineering",
    context: "Next.js · TypeScript · Supabase · AI workflows",
    introduction:
      "Moneo brings imports, accounts, review, analytics, planning, and AI discussion into a private finance workspace. The engineering focus is traceability: reviewed source rows feed deterministic calculations, while AI tools operate through scoped finance APIs.",
    journey: [
      [
        "Import and map",
        "Bring in CSV or spreadsheet records, inspect field mapping, and resolve ambiguous rows before import.",
      ],
      [
        "Review your records",
        "Work with accounts, source-linked transactions, and reviewable financial records.",
      ],
      [
        "Understand the picture",
        "Use financial tools and analytics to explore spending, wealth, and the coverage behind an answer.",
      ],
      [
        "Explore a plan",
        "Discuss finances with AI and use interactive analysis tools to investigate scenarios.",
      ],
    ],
    architecture: [
      [
        "Workspace UI",
        "Next.js pages, account views, import review, and AI analysis surfaces.",
        "app · components",
      ],
      [
        "Parsing & mapping",
        "CSV and Excel parsers inspect rows and validate mappings before processing.",
        "lib/csv.ts · lib/import-row.ts",
      ],
      [
        "Import workflow",
        "Staged batches, file hashes, workspace checks, and run versions guard resumable imports.",
        "workflows/import-file.ts · lib/import-batch.ts",
      ],
      [
        "Finance domain",
        "Scoped tools calculate financial results with source coverage and supporting evidence.",
        "lib/finance/tools.ts · lib/finance/source-coverage.ts",
      ],
      [
        "AI & artifacts",
        "AI uses finance tools; interactive artifacts use a finance SDK rather than inventing authoritative totals.",
        "lib/ai · lib/artifacts/finance-sdk.ts",
      ],
      [
        "Private storage",
        "Supabase auth, database policies, and workspace-scoped records separate users and source data.",
        "lib/supabase · supabase/migrations",
      ],
    ],
    flow: "Reviewed file → mapping & validation → staged import batches → workspace records → finance tools → analysis and interactive plans.",
    choices: [
      [
        "Review before processing",
        "The import worker checks the stored file hash against the reviewed original, validates account routes, and rejects unresolved rows. The cost is a more deliberate import flow; the benefit is avoiding silent reinterpretation of financial records.",
      ],
      [
        "Calculations stay in code",
        "Finance tools and a scoped SDK expose deterministic results with coverage and evidence. AI can help explore an answer, but should not become the source of truth for money or unsupported totals.",
      ],
      [
        "Resume with explicit state",
        "Import run versions and staged batches detect canceled or superseded work. This takes more bookkeeping than a single upload request, but makes retries and partial processing easier to reason about.",
      ],
    ],
    evidence: [
      [
        "Import workflow implementation",
        "https://github.com/indkhan/Moneo/blob/main/workflows/import-file.ts",
      ],
      [
        "Finance tool tests",
        "https://github.com/indkhan/Moneo/blob/main/lib/finance/tools.test.ts",
      ],
      [
        "Browser coverage & prerequisites",
        "https://github.com/indkhan/Moneo/blob/main/e2e/README.md",
      ],
    ],
    testing:
      "The repository includes unit tests for parsing, import batches, finance tools, source coverage, and the artifact SDK, plus Playwright browser tests. The live-backend journey has configuration prerequisites and can skip; those tests are not evidence of a fully verified deployment.",
    limitations:
      "The hosted app redirects to email sign-in. No private account was accessed during portfolio review. Supabase configuration is required for the workspace, and AI features need provider credentials. The animation uses fictional sample records and is not a live product recording.",
    next: "Broaden configured end-to-end coverage for import retries and source-backed analysis. Keep provenance and uncertainty clear as interactive planning tools expand.",
    nextId: "nox",
    nextTitle: "Nox",
  },
  nox: {
    title: "Nox",
    eyebrow: "Local-first assistant · v0.1.0 Alpha",
    problem:
      "An assistant that edits a workspace should make its proposed changes understandable and its actions visible.",
    role: "Independent project · Extension & bridge engineering",
    context: "Chrome · Native messaging · Codex · Notion MCP",
    introduction:
      "Nox puts a Notion assistant in a Chrome side panel, connecting through a local native bridge to the user’s existing Codex login and Notion MCP. There is no Nox backend or hosted demo. Plans, approvals, and an action stream form the core of the experience.",
    journey: [
      [
        "Connect locally",
        "Install the extension and bridge, then connect Codex and Notion.",
      ],
      [
        "Give page context",
        "Ask about the page you are viewing or mention other pages and databases.",
      ],
      [
        "Review the change",
        "Inspect the proposed action or workspace plan before approving guarded writes.",
      ],
      [
        "Follow the result",
        "Watch tool actions and their outcomes, with undo where Notion supports it.",
      ],
    ],
    architecture: [
      [
        "Chrome side panel",
        "Conversation, page context, settings, and visible action stream.",
        "extension",
      ],
      [
        "Native bridge",
        "Local native messaging carries requests between the extension and Codex.",
        "bridge",
      ],
      [
        "Codex session",
        "Uses the user’s existing Codex CLI authentication for agent work.",
        "Codex CLI / app-server",
      ],
      [
        "Approval boundary",
        "Action approvals, workspace plans, and overwrite checks gate writes.",
        "Approval & action policies",
      ],
      [
        "Notion MCP client",
        "The extension executes every Notion call itself after policy checks; Codex requests tools but does not bypass this boundary.",
        "extension → mcp.notion.com",
      ],
    ],
    flow: "Side panel ↔ native bridge ↔ Codex. Tool requests return to the extension → approval and overwrite guards → Notion MCP → visible results.",
    choices: [
      [
        "Local-first transport",
        "Using a native bridge avoids a separate Nox service and reuses the user’s Codex access. It also introduces local installation requirements and a narrower supported environment.",
      ],
      [
        "Approval is part of the workflow",
        "Substantial structural changes need a workspace plan in both Ask and Auto modes. Auto mode only permits a narrow per-turn grant for small checkbox edits; other changes still ask.",
      ],
      [
        "Make actions observable",
        "The action stream exposes tool outcomes and supports undo where Notion makes it possible. Some operations cannot be reversed reliably, so traceability complements rather than replaces approval.",
      ],
    ],
    evidence: [
      [
        "Setup, supported environments & limitations",
        "https://github.com/indkhan/Nox",
      ],
      [
        "Source code & installation",
        "https://github.com/indkhan/Nox/tree/main",
      ],
    ],
    testing:
      "The local repository contains an audit repair ledger with local checks and live integration limits. That ledger was unavailable on the public default branch at portfolio review, so this page links the public source and setup instructions. Local evidence is not a promise that every Codex / Notion interaction is verified on every platform.",
    limitations:
      "Alpha software, installed from GitHub in Chrome Developer mode. Windows and Ubuntu are documented; other platforms are unverified. PDF/image analysis and file upload into Notion are unavailable. Requires compatible Codex CLI, a local bridge, and a connected Notion account.",
    next: "Extend live integration verification while keeping supported environments and irreversible-action limits explicit.",
    nextId: "unipirate",
    nextTitle: "UniPirate",
  },
} as const;
