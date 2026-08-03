# 🚀 Shahriar's Portfolio

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Welcome to my personal portfolio repository! This project serves as a showcase of my work, skills, articles, and design experiments, built with modern web technologies and a focus on sleek, interactive user experiences.

**Live demo:** _add your deployed URL here_
**Status:** Actively maintained

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Core Components](#-core-components)
- [Theming & Customization](#-theming--customization)
- [Animation & Performance Notes](#-animation--performance-notes)
- [Browser Support](#-browser-support)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Performance & SEO](#-performance--seo)
- [Accessibility](#-accessibility)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [Code Style](#-code-style)
- [Changelog](#-changelog)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)
- [Contact](#-contact)

---

## 🧭 Overview

This repository powers my personal portfolio site — a single-page application that highlights selected projects, technical articles, and design experiments. It's built to be fast, accessible, and visually distinctive, moving away from generic template layouts in favor of custom animation and interaction design.

The goal of this project is twofold: to serve as a professional showcase for potential collaborators and employers, and to act as a sandbox for experimenting with modern frontend techniques (canvas-based backgrounds, scroll-linked animation, glassmorphic UI, etc.). The codebase is intentionally modular so individual sections (Hero, About, Projects, Articles) can be iterated on independently.

## ✨ Features

- **Modern UI/UX** — Implements cutting-edge design trends including glassmorphism, dynamic scroll animations, and organic, asymmetric layouts.
- **Responsive Design** — Fully optimized layouts and typography for mobile, tablet, and desktop viewports using a mobile-first approach, with tested breakpoints at 480px, 768px, 1024px, and 1440px.
- **Dynamic Theming** — Built-in support for Light and Dark modes with a custom, high-performance interactive shimmer background that reacts to cursor movement and persists the user's preference.
- **Interactive Case Studies** — Detailed project displays with alternating left/right layouts, image reveals, tech-stack tags, and engaging hover states.
- **Scroll-driven Animations** — Advanced canvas drawing combined with CSS masks and `IntersectionObserver` for performant, GPU-friendly background effects that pause when off-screen.
- **Articles Section** — A lightweight blog/articles module for publishing write-ups and technical notes without needing a separate CMS, driven by structured data in `src/data`.
- **Accessibility-minded** — Semantic HTML, keyboard-navigable components, visible focus states, and respect for `prefers-reduced-motion`.
- **SEO-friendly** — Meta tags, Open Graph data, structured data, and a clean document outline for better discoverability.
- **Lazy Loading** — Images and heavier sections are lazily loaded to keep the initial bundle lean.
- **Contact Integration** — A working contact form/section wired to an external endpoint or email service.


## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React + TypeScript |
| Bundler / Dev Server | Vite |
| Styling | Tailwind CSS with custom CSS variables |
| Animation | Canvas API, CSS transitions/masks, scroll-linked effects |
| Routing | React Router (or equivalent SPA routing) |
| Icons | Custom SVG / icon library |
| Linting & Formatting | ESLint, Prettier |
| Package Manager | npm |
| Deployment | Vercel / Netlify / GitHub Pages |
| Version Control | Git + GitHub |

> Adjust this table to match the exact libraries used in your `package.json`.

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or later ([download](https://nodejs.org/))
- **npm** v9 or later (bundled with Node.js)
- **Git** for cloning the repository
- A modern code editor (VS Code recommended) with ESLint/Prettier extensions for the best DX

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShahriarXProxima/Portfolio.git
   cd Portfolio/Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy the example file and fill in your own values:
   ```bash
   cp .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the localhost URL provided in your terminal (typically `http://localhost:5173`).

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_CONTACT_FORM_ENDPOINT` | Endpoint used to submit the contact form | Optional |
| `VITE_SITE_URL` | Canonical site URL, used for SEO/Open Graph tags | Recommended |
| `VITE_ANALYTICS_ID` | Analytics tracking ID (e.g. Plausible/GA) | Optional |

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server with hot module reloading. |
| `npm run build` | Type-checks and bundles the app for production into `/dist`. |
| `npm run preview` | Serves the production build locally for final checks. |
| `npm run lint` | Runs ESLint across the codebase to catch style/quality issues. |
| `npm run lint:fix` | Automatically fixes lint issues where possible. |
| `npm run format` | Formats the codebase using Prettier. |
| `npm run typecheck` | Runs the TypeScript compiler in no-emit mode to catch type errors. |

## 📂 Project Structure

```
Portfolio/Project
├── public/                     # Static assets served as-is (favicon, robots.txt, etc.)
├── docs/                        # Screenshots and documentation assets
├── src/
│   ├── components/
│   │   ├── Hero/                # Landing section with shimmer background
│   │   ├── About/                # Bio, skills, and timeline
│   │   ├── Projects/              # Case study cards and detail views
│   │   ├── Articles/               # Blog/article listing and reader
│   │   ├── ThemeToggle/             # Light/Dark mode switch
│   │   └── shared/                   # Buttons, cards, layout primitives
│   ├── data/                    # Static data for projects and articles (JSON/TS)
│   ├── resources/                # Images, icons, and static assets
│   ├── hooks/                     # Custom React hooks (useTheme, useScrollProgress, etc.)
│   ├── styles/                     # Additional global/shared styles
│   ├── utils/                       # Helper functions (formatting, animation math, etc.)
│   ├── index.css                     # Global styles, Tailwind directives, custom CSS variables
│   └── App.tsx                        # Main application entry point handling routing/layout
├── .env.example                # Template for required environment variables
├── .eslintrc                    # Linting configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite build configuration
├── tsconfig.json                # TypeScript configuration
├── package.json
└── README.md
```

## 🧩 Core Components

| Component | Responsibility |
|---|---|
| `Hero` | Landing section featuring the animated shimmer canvas background and intro copy. |
| `About` | Skills, bio, and career timeline. |
| `Projects` | Grid of case studies with alternating layout and hover interactions. |
| `Articles` | List and detail views for written content, sourced from `src/data`. |
| `ThemeToggle` | Handles switching and persisting Light/Dark theme preference. |
| `Navbar` / `Footer` | Site-wide navigation and closing section with contact/social links. |

## 🎨 Theming & Customization

- Light/Dark theme values are controlled via CSS custom properties defined in `src/index.css`.
- The interactive shimmer background can be tuned (speed, intensity, color stops, particle density) via constants exposed near the top of its component file for easy experimentation.
- Tailwind's `tailwind.config.js` centralizes design tokens (colors, spacing, fonts, breakpoints) so the visual language can be adjusted globally from one place.
- Theme preference is persisted (e.g. via `localStorage`) so returning visitors see their last-selected mode.

## ⚡ Animation & Performance Notes

- Canvas-based background effects use `requestAnimationFrame` and pause automatically when the tab is inactive or the section is off-screen.
- Scroll-linked animations rely on `IntersectionObserver` rather than scroll-event listeners to avoid jank.
- Heavy assets (images, illustrations) are lazy-loaded and served in modern formats (e.g. WebP/AVIF) where possible.
- Animations respect the `prefers-reduced-motion` media query for users who opt out of motion effects.

## 🌐 Browser Support

Tested and supported on the latest two versions of:

- Chrome / Edge (Chromium-based)
- Firefox
- Safari (desktop and iOS)

## 🧪 Testing

> If tests are added to this project, document them here, e.g.:

```bash
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests (if configured)
```

## ☁️ Deployment

This project can be deployed to any static hosting provider that supports Vite builds:

- **Vercel** — connect the repo and deploy with zero configuration; auto-deploys on push.
- **Netlify** — set the build command to `npm run build` and the publish directory to `dist`.
- **GitHub Pages** — deploy the contents of the `dist` folder after building, using `gh-pages` or GitHub Actions.

## 📈 Performance & SEO

- Optimized for high Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.
- Includes meta tags, Open Graph, and Twitter Card data for rich link previews.
- Uses semantic HTML5 landmarks (`header`, `main`, `nav`, `footer`) for better crawlability and screen-reader support.

## ♿ Accessibility

- Keyboard-navigable interactive elements with visible focus rings.
- Sufficient color contrast in both Light and Dark themes.
- Alt text provided for all meaningful images.
- Motion-heavy effects degrade gracefully for `prefers-reduced-motion` users.

## 🗺️ Roadmap

- [ ] Add a CMS-backed articles system
- [ ] Add unit/integration/e2e tests
- [ ] Improve Lighthouse performance score further
- [ ] Add internationalization (i18n) support
- [ ] Add a downloadable resume/CV section
- [ ] Add case-study filtering/search
- [ ] Add a blog RSS feed

## ❓ FAQ

**Why is the dev server not starting?**
Make sure you're using Node.js v18+ and that `npm install` completed without errors.

**How do I add a new project/case study?**
Add an entry to the relevant file in `src/data`, then reference any images from `src/resources`.

**Can I reuse this for my own portfolio?**
Yes — it's MIT licensed. Feel free to fork it and swap in your own content and branding.

## 🤝 Contributing

This is primarily a personal project, but suggestions and bug reports are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request describing your change

## 🧹 Code Style

- Formatting is enforced via Prettier; run `npm run format` before committing.
- Linting is enforced via ESLint; run `npm run lint` to check, `npm run lint:fix` to auto-fix.
- Prefer functional components and hooks over class components.
- Keep components small and focused; shared UI primitives live in `src/components/shared`.

## 📝 Changelog

| Version | Date | Notes |
|---|---|---|
| v1.0.0 | 2026-08-04 | Initial public release with Hero, About, Projects, Articles, and theming. |

## 🙏 Acknowledgments

- Design inspiration from the broader glassmorphism and modern portfolio design community.
- Icons and fonts sourced from their respective open-source/free-use libraries (credit them here).

## 📄 License

This project is open-source and available under the **MIT License**. Feel free to use the code as inspiration for your own portfolio!

## 📬 Contact

- **GitHub:** [@ShahriarXProxima](https://github.com/ShahriarXProxima)
- **Portfolio:** https://shahriar-x-proxima.vercel.app/
- **Email:** [EMAIL_ADDRESS]
- **LinkedIn:** https://www.linkedin.com/in/shahriar-mohammad-0094a2267/

---

<p align="center">Made by Shahriar</p>