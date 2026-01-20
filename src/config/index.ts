import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Usman Khan — AI & Full-Stack Engineer",
  author: "Usman Khan",
  description:
    "AI & Full-Stack Engineer building production-ready software and intelligent systems, from low-latency AI pipelines to scalable full-stack products.",
  lang: "en",
  siteLogo: "/usman-small.jpg",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://www.linkedin.com/in/indkhan" },
    { text: "GitHub", href: "https://github.com/indkhan" },
    { text: "Email", href: "mailto:mgsukhan@gmail.com" },
  ],
  canonicalURL: "https://portfolio-ten-sooty-60.vercel.app/",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Usman Khan",
    specialty: "AI & Full-Stack Engineer",
    summary:
      "I build real-world software products — from intelligent AI systems and RAG pipelines to scalable full-stack applications designed for production use.",
    email: "mgsukhan@gmail.com",
  },

  experience: [
    {
      company: "PersonalClientCare (PCC)",
      position: "Full-Stack Engineer (Werkstudent)",
      startDate: "Sep 2025",
      endDate: "Present",
      summary: [
        "Developed user-facing features and backend automation for a production application used in real workflows.",
        "Designed and implemented backend APIs and data pipelines to support intelligent automation.",
        "Shipped scalable, production-ready improvements in a fast-paced engineering environment.",
      ],
    },
    {
      company: "LeadLane",
      position: "Founding Engineer (Werkstudent)",
      startDate: "2025",
      endDate: "MVP Engagement",
      summary: [
        "Built the AI-powered MVP of a B2B sales automation platform from concept to production.",
        "Designed and implemented RAG pipelines using vector databases and LLMs (LLaMA 3, Mistral).",
        "Improved outbound sales by ~70% and operational efficiency by ~80%.",
        "Engineered low-latency AI pipelines delivering responses in under 3 seconds.",
      ],
    },
  ],

  projects: [
    {
      name: "Context",
      summary:
        "A fast, RAG-first AI chat platform inspired by t3.chat, built for document and YouTube-based knowledge retrieval with a strong focus on latency and UX.",
      linkPreview: "https://context-one-opal.vercel.app",
      linkSource: "",
      image: "/context.png",
    },
    {
      name: "CourseVault",
      summary:
        "A full-stack platform for university students to discover, share, and rank study resources, deployed on Vercel as a complete production system.",
      linkPreview: "https://course-vault.vercel.app/",
      linkSource: "",
      image: "/coursevault.png",
    },
    {
      name: "Klebl",
      summary:
        "Hackathon-winning AI system for automated architectural blueprint analysis using YOLOv11 and Gemini, reducing manual review time by ~90%.",
      linkPreview: "",
      linkSource: "https://github.com/indkhan/klebl",
      image: "/klebl.png",
    },
    {
      name: "Voice Oasis",
      summary:
        "Hackathon-winning real-time voice enhancement and conversational memory system with speaker recognition, designed under strict latency and privacy constraints.",
      linkPreview: "",
      linkSource: "https://github.com/indkhan/Voice_Oasis",
      image: "/voice_oasis.png",
    },
    {
      name: "Offline_AI",
      summary:
        "An offline-first Android application enabling on-device LLM inference and agent workflows, focused on privacy, reliability, and low-latency execution.",
      linkPreview: "",
      linkSource: "https://github.com/indkhan/Offline_AI",
      image: "/offline_ai.png",
    },
    {
      name: "MHack",
      summary:
        "A desktop AI assistant capable of browsing, code execution, and task automation through agent-based tool orchestration.",
      linkPreview: "",
      linkSource: "https://github.com/indkhan/MHack",
      image: "/mhack.png",
    },
  ],

  about: {
    description: `
Hi, I’m Usman.

I’m a Computer Science student at Universität des Saarlandes and a working AI & Full-Stack Engineer. I focus on building production-grade software — not just models or demos — but complete systems that handle real constraints like latency, privacy, and scalability.

My work spans AI-powered products, real-time voice and vision systems, offline-first applications, and full-stack platforms deployed in production. I enjoy working in early-stage and fast-moving environments, where ideas quickly turn into shipped products.
    `,
    image: "/usman-big.jpg",
  },
};
