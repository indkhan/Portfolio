<div align="center">

# 🚀 Usman Khan — Portfolio

**AI & Full-Stack Engineer**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://portfolio-ten-sooty-60.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-indkhan-181717?style=for-the-badge&logo=github)](https://github.com/indkhan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/indkhan)

<br />

*A modern, responsive portfolio built with Astro & Tailwind CSS*

</div>

---

## ✨ Features

- ⚡ **Blazing Fast** — Built with [Astro](https://astro.build) for optimal performance and SEO
- 🎨 **Modern Design** — Clean, minimal aesthetic with smooth animations and glassmorphism effects
- 📱 **Fully Responsive** — Optimized for all screen sizes, from mobile to desktop
- 🌙 **Dark Mode** — Elegant dark theme with carefully crafted color palette
- 🔧 **Easy to Customize** — All content managed through a single config file
- 🚀 **Deploy Ready** — One-click deploy to Vercel, Netlify, or any static host

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Astro](https://astro.build) | Static Site Generator |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling & Design System |
| [TypeScript](https://www.typescriptlang.org) | Type Safety |
| [Prettier](https://prettier.io) | Code Formatting |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/indkhan/Portfolio.git

# Navigate to the project
cd Portfolio

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to see the result.

### Build for Production

```bash
# Create production build
pnpm build

# Preview the production build locally
pnpm preview
```

---

## 📁 Project Structure

```
Portfolio/
├── public/              # Static assets (images, icons, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── config/          # Site configuration & content
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── astro.config.mjs     # Astro configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

---

## ⚙️ Customization

All site content is managed in a single file: **`src/config/index.ts`**

### Personal Information

```typescript
export const SITE_CONFIG: SiteConfig = {
  title: "Your Name — Your Title",
  author: "Your Name",
  description: "Your description...",
  // ... social links, navigation, etc.
};
```

### Adding Projects

```typescript
projects: [
  {
    name: "Project Name",
    summary: "Brief description of your project...",
    linkPreview: "https://your-live-demo.com",  // Optional
    linkSource: "https://github.com/your/repo", // Optional
    image: "/project-image.png",
  },
  // ... more projects
],
```

### Adding Experience

```typescript
experience: [
  {
    company: "Company Name",
    position: "Your Role",
    startDate: "Jan 2024",
    endDate: "Present",
    summary: [
      "Achievement or responsibility #1",
      "Achievement or responsibility #2",
    ],
  },
],
```

---
