# Portfolio design and content specification

## The identity

**Display name:** Usman Khan  
**Professional positioning:** Software Engineer · Full-Stack & Applied AI  
**Goal:** Software engineering internships, working-student roles, and engineering jobs.  
**Story:** Professional engineering experience + products developed independently + team hackathons.  
**Tone:** Confident, grounded, friendly, not self-important or exaggerated.

## Layout hierarchy

### Hero

**Heading:** Hi, I'm Usman.  
**Second line:** Software Engineer · Full-Stack & Applied AI  
**Subheading:** I build complete software products—from backend systems and polished interfaces to AI workflows designed around real users and reliable outcomes.  
**Supporting:** Computer Science student at Saarland University and Software & AI Engineer at Cyvalent.  
**Actions:** Explore Projects, GitHub, LinkedIn; CV when a public-safe file is approved.  
**Photo:** `usman-small.jpg` from original `Portfolio/public` (keep actual photo; never use a generated replacement).

### About (short)

I'm a Computer Science student and working Software & AI Engineer based in Saarbrücken. I'm drawn to projects where engineering connects to real workflows: simplifying university applications, interpreting financial data, and building AI assistants that let people review and control changes. I also enjoy building with teams at hackathons.

### Professional experience

| Employer | Role | Dates | Evidence-based summary |
| --- | --- | --- | --- |
| Cyvalent / 3kb GmbH | Software & AI Engineer (Working Student) | Jul 2026–Present | Next.js/TypeScript/PostgreSQL; evidence onboarding, document pipelines and AI-assisted review workflows |
| PersonalClientCare (PCC) | Full-Stack Engineer (Working Student) | Sep 2025–Jun 2026 | Natural-language agents, scheduled/event-driven orchestration, document processing, Flutter integrations |
| LeadLane | Founding Engineer (Working Student) | Jul–Aug 2025 | Built AI-powered B2B sales MVP using RAG, backend APIs and React/Next.js |

### Featured projects

**FLAGSHIP #1: UniPirate**

- Link: https://github.com/indkhan/unipirate
- Demo (verify before publishing): https://unipirate.vercel.app
- Goal: Make German public-university applications easier to navigate for international students.
- Evidence-supported features: rule-based eligibility flow with explicit unknown states, user profiles, source-aware course search, application tracking, tasks, calendar, admin review, AI assistant (provider availability may constrain some live functionality).
- Engineering story: deterministic eligibility vs AI assistance, official sources, validations, user ownership, changes over time.
- Media: `/portfolio-media/projects/unipirate.mp4`; poster `/portfolio-media/posters/unipirate.webp`.
- Display: **full-width, large** card, ~440–500 px desktop height; media on left and short story/actions on right.

**FLAGSHIP #2: Moneo**

- Link: https://github.com/indkhan/Moneo
- Demo (verify): https://moneo-mu.vercel.app
- Goal: Understand and plan personal finances through trustworthy calculations and AI-assisted exploration.
- Evidence-supported features: transaction imports, accounts, review/editing, financial analytics, planning, AI discussions and interactive analysis tools; functionality/deployment must be checked against current app.
- Engineering story: data ownership, import idempotency, authoritative deterministic calculations, uncertainty, background workflows, private workspaces.
- Media: `/portfolio-media/projects/moneo.mp4`; poster `/portfolio-media/posters/moneo.webp`.
- Display: **full-width, large**, alternate media orientation for visual rhythm.

**FEATURED #3: Nox**

- Link: https://github.com/indkhan/Nox
- Status: v0.1.0 alpha. No hosted live demo promised.
- Summary: Open-source local-first Notion AI assistant using existing Codex login and Notion MCP, with user approval, action tracing and guarded writes.
- Engineering story: native messaging bridge, explicit approval and observable/verified actions.
- Media: `/portfolio-media/projects/nox.mp4`; poster `/portfolio-media/posters/nox.webp`.
- Display: **medium** feature panel (~340px desktop height), below the two flagships, above minor projects.

**SMALLER CARDS:**

| Project | Verified framing | Media |
| --- | --- | --- |
| WorldSim | Experimental synthetic global scenario simulator, explicitly not a forecast. https://github.com/indkhan/WorldSim | `worldsim.mp4` |
| DreamTransport | Hackathon public transport optimization with k-median hubs and graph methods. https://github.com/indkhan/DreamTransport | `dreamtransport.mp4` |
| Voice Oasis | Team hackathon project with speaker recognition, audio processing and conversational memory. https://github.com/indkhan/Voice_Oasis | `voice_oasis.mp4` |

**SUPPORTING PROJECTS VIA HACKATHONS:** Klebl (`klebl.mp4`), MHack (`mhack.mp4`), SwissInsight (`swissinsight.mp4`); these can appear in expandable hackathon cards or a small supporting-project strip.

### Education and skills

- University: Saarland University / Universität des Saarlandes
- Degree: B.Sc. Computer Science, Oct 2024–Present (as in CV)
- Skills: TypeScript, JavaScript, Python, Next.js, React, Node.js, PostgreSQL, Supabase, Git, Docker, serverless, LLM integration, RAG, tool calling, MCP, agents and AI safety/approval flows. Use only skills user is comfortable defending in interviews.

### Hackathon timeline

| Event | Project | Existing portfolio's placement | Existing original photos | Animation |
| --- | --- | --- | --- | --- |
| Mittelstand Hackathon (Neumarkt) | Klebl | 1st | `mittelstadt.png`, `mittelstand2.jpeg`, `mittelstand3.jpeg` | `mittelstand.mp4` |
| {Tech: Europe} AI Hackathon (Munich) | MHack / UdS OP | 3rd | `munichhack.jpeg` | `techeurope.mp4` |
| START HACK 2025 (St. Gallen) | Voice Oasis | 3rd | `starthack.jpg`, `start_hack2.jpeg` | `starthack.mp4` |
| SwissHacks (Zurich) | SwissInsight | 2nd | `swisshacks1.jpeg`, `swisshacks2.jpeg` | `swisshacks.mp4` |
| Servus AI Summer (Neumarkt) | DreamTransport | 2nd | `dream_transport.gif` | `servusai.mp4` |

Placements above are copied from the existing Portfolio config. Recheck exact event labels/placement with the user before deploying.

### Beyond engineering / photo strip

Choose four to six **genuine** hackathon photographs from your old repository, not stock images. Consider an understated heading, 'Built with people, not just prompts.' No invented personal travel details.

### Contact

- GitHub: https://github.com/indkhan
- LinkedIn: https://www.linkedin.com/in/indkhan
- Email: existing verified repo config
- Do **not** publicly show full street address or phone by default.
- CV button only when approved public résumé is available.

## Overall presentation

- Light-first with system-responsive dark mode; dark project video cards become the visual centerpiece.
- Typography-driven, clear spacing, strong headings, no noisy decoration.
- Desktop hierarchy: flagship projects > Nox > smaller cards > supporting hackathon projects.
- Mobile: all blocks stack naturally; videos should show a readable 16:9 poster, not letterboxed to tiny slivers.
- Short visible copy; technical depth in case studies, not in enormous homepage paragraphs.
