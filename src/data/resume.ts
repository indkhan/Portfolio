import { PROJECT_MEDIA, HACKATHON_MEDIA } from "./project-media";
export const DATA = {
  name: "Usman Khan",
  email: "mgsukhan@gmail.com",
  location: "Saarbrücken, Germany",
  summary:
    "I'm a Computer Science student at Saarland University and a Software & AI Engineer based in Saarbrücken. I enjoy turning ideas into useful software, learning by building, and solving tough problems with a team—whether at work or over a hackathon weekend.",
  skills: [
    "TypeScript",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "RAG",
    "MCP",
    "Tool calling",
    "Git",
  ],
  work: [
    {
      company: "Cyvalent",
      role: "Software & AI Engineer",
      dates: "Jul 2026 — Present",
      note: "Working student",
      description:
        "Contributing to software development and collaborating with the team on day-to-day engineering work.",
      initials: "Cy",
    },
    {
      company: "PersonalClientCare",
      role: "Full-Stack Engineer",
      dates: "Sep 2025 — Jun 2026",
      note: "Working student",
      description:
        "Built automation across 3 areas: AI agents, scheduled and event-driven workflows, and document processing. Developed backend APIs and Flutter features for a production application.",
      stack: "AI agents · Automation · Flutter",
      initials: "PCC",
    },
    {
      company: "LeadLane",
      role: "Founding Engineer",
      dates: "Jul — Aug 2025",
      note: "Working student",
      description:
        "Built an AI-powered B2B sales MVP from concept to production. Improved outbound sales by ~70% and operational efficiency by ~80%, with AI responses in under 3 seconds.",
      stack: "RAG · Backend APIs · React",
      initials: "LL",
    },
  ],
};
export const projects = [
  {
    ...PROJECT_MEDIA.unipirate,
    id: "unipirate",
    kicker: "From uncertainty to a next step",
    description:
      "A clearer path to German public universities. Rule-based eligibility, official sources, and an application workspace built for international students.",
    stack: ["Next.js", "Supabase", "Rule engine", "Applied AI"],
    status: "Public eligibility checker",
  },
  {
    ...PROJECT_MEDIA.moneo,
    id: "moneo",
    kicker: "Make the numbers make sense",
    description:
      "A personal finance workspace that turns transaction imports into reviewed records, useful analysis, and plans you can explore with AI.",
    stack: ["Next.js", "TypeScript", "Supabase", "Finance APIs"],
    status: "Personal finance workspace",
  },
  {
    ...PROJECT_MEDIA.nox,
    id: "nox",
    kicker: "An assistant. With a paper trail.",
    description:
      "A local-first Notion assistant using Codex and Notion MCP. Propose changes, approve the plan, and follow each action as it happens.",
    stack: ["Chrome extension", "Codex", "Notion MCP"],
    status: "v0.1.0 · Alpha",
  },
] as const;
export const secondary = [
  {
    ...PROJECT_MEDIA.worldsim,
    description:
      "Synthetic global scenarios and timeline comparisons. An experiment in simulation, explicitly not a forecast.",
    label: "Experimental",
  },
  {
    ...PROJECT_MEDIA.dreamtransport,
    description:
      "A team hackathon exploration of public transport optimization using k-median hubs and graph methods.",
    label: "Transport · Team project",
  },
  {
    ...PROJECT_MEDIA.voice_oasis,
    description:
      "Speaker recognition, audio processing, and conversational memory built with a hackathon team.",
    label: "Voice AI · Team project",
  },
];
export const hackathons = [
  {
    ...HACKATHON_MEDIA.mittelstand,
    key: "mittelstand",
    media: PROJECT_MEDIA.klebl,
    location: "Neumarkt, Germany",
    photo: "/photos/mittelstand2.webp",
    description:
      "Our team built Klebl AI: blueprint analysis and structured construction-document extraction.",
  },
  {
    ...HACKATHON_MEDIA.techeurope,
    key: "techeurope",
    media: PROJECT_MEDIA.mhack,
    location: "Munich, Germany",
    photo: "/photos/munichhack.webp",
    description:
      "Built MHack / UdS Operator, a desktop assistant for browsing, code execution, and tool-driven tasks.",
  },
  {
    ...HACKATHON_MEDIA.starthack,
    key: "starthack",
    media: PROJECT_MEDIA.voice_oasis,
    location: "St. Gallen, Switzerland",
    photo: "/photos/starthack.webp",
    description:
      "Co-developed Voice Oasis, connecting speaker recognition with conversational memory.",
  },
  {
    ...HACKATHON_MEDIA.swisshacks,
    key: "swisshacks",
    media: PROJECT_MEDIA.swissinsight,
    location: "Zurich, Switzerland",
    photo: "/photos/swisshacks1.webp",
    description:
      "Built SwissInsight: natural-language exploration of Swiss startup data through SPARQL and a knowledge graph.",
  },
  {
    ...HACKATHON_MEDIA.servusai,
    key: "servusai",
    media: PROJECT_MEDIA.dreamtransport,
    location: "Neumarkt, Germany",
    photo: "/photos/dream_transport.webp",
    description:
      "Built DreamTransport, exploring better transit hubs and routes with mathematical optimization.",
  },
];
