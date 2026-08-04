# 🚀 Shahriar's Portfolio

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Welcome to my personal portfolio repository! This project serves as a showcase of my work, skills, articles, and design experiments, built with modern web technologies and a focus on sleek, interactive user experiences.

**Live demo:** [https://shahriarxproxima-portfolio.vercel.app/]
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
- [Deployment](#-deployment)
- [Performance & SEO](#-performance--seo)
- [Accessibility](#-accessibility)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [Code Style](#-code-style)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)
- [Contact](#-contact)

---

## 🧭 Overview

This repository powers my personal portfolio site — a single-page application that highlights selected projects, technical articles, skills, and work experience. It's built to be fast, accessible, and visually distinctive, moving away from generic template layouts in favor of custom animation and interaction design.

The goal of this project is twofold: to serve as a professional showcase for potential collaborators and employers, and to act as a sandbox for experimenting with modern frontend techniques (canvas-based scroll backgrounds, interactive shimmer effects, and organic layouts). The codebase is intentionally modular, with each section of the site (Hero, About, Skills, Projects, Articles, Work Experience) broken into its own component.

## ✨ Features

- **Modern UI/UX** — Implements cutting-edge design trends including glassmorphism, dynamic scroll animations, and organic, asymmetric layouts.
- **Responsive Design** — Fully optimized layouts and typography for mobile, tablet, and desktop viewports using a mobile-first approach.
- **Dynamic Backgrounds** — A custom `ShimmerBackground` for interactive, cursor-reactive visuals and a `ScrollBackground` for canvas-driven, scroll-linked effects.
- **Interactive Case Studies** — Detailed project displays (`Projects.tsx`) with alternating layouts and engaging hover states.
- **Articles Module** — A lightweight blog/articles system (`Articles.tsx`, `ArticleDetail.tsx`) for listing and reading individual write-ups, driven by structured data.
- **Skills & Work Experience** — Dedicated sections (`Skills.tsx`, `WorkExperience.tsx`) summarizing technical skills and career history.
- **Design Showcase** — A `Design.tsx` section for highlighting design experiments separate from engineering case studies.
- **UI Accent Components** — `CautionStrip.tsx` and `StaticStrip.tsx` provide decorative/informational strip elements used across the layout.
- **Frame Assets** — Static image "frames" served from `public/frames` for use in project/article visuals.
- **Accessibility-minded** — Semantic HTML, keyboard-navigable components, and respect for `prefers-reduced-motion`.
- **SEO-friendly** — `metadata.json` and standard meta tags support clean previews and discoverability.

```

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React + TypeScript |
| Bundler / Dev Server | Vite |
| Styling | Tailwind CSS with custom CSS variables (`index.css`) |
| Animation | Canvas API (`ScrollBackground`), interactive shimmer effects (`ShimmerBackground`) |
| Icons / Assets | Static frame assets in `public/frames`, additional assets in `resources/` |
| Linting & Type Checking | TypeScript (`tsconfig.json`) |
| Package Manager | npm |
| IDE Config | JetBrains project settings (`.idea/`), Junie config (`.junie/`) |

> Adjust this table to match the exact libraries used in your `package.json`.

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or later ([download](https://nodejs.org/))
- **npm** v9 or later (bundled with Node.js)
- **Git** for cloning the repository
- A modern code editor (JetBrains WebStorm or VS Code recommended)

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

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the localhost URL provided in your terminal (typically `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized output is generated in the `dist/` directory.

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

## 🔑 Environment Variables

If the project requires configuration (API endpoints, analytics IDs, etc.), create a `.env` file in the project root. Document the variables it expects here, for example:

| Variable | Description | Required |
|---|---|---|
| `VITE_CONTACT_FORM_ENDPOINT` | Endpoint used to submit the contact form | Optional |
| `VITE_SITE_URL` | Canonical site URL, used for SEO/meta tags | Recommended |

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server with hot module reloading. |
| `npm run build` | Type-checks and bundles the app for production into `/dist`. |
| `npm run preview` | Serves the production build locally for final checks. |

> Update this table with any additional scripts defined in `package.json` (e.g. lint, format, test).

## 📂 Project Structure

```
Project/
├── .idea/                       # JetBrains IDE project settings
├── .junie/                      # Junie configuration
├── dist/                        # Production build output (generated)
├── node_modules/                # Installed dependencies (generated)
├── public/
│   └── frames/                  # Static image "frame" assets served as-is
├── resources/                   # Design/image resources
├── src/
│   ├── components/
│   │   ├── About.tsx            # About/bio section
│   │   ├── ArticleDetail.tsx    # Single article detail view
│   │   ├── Articles.tsx         # Articles list section
│   │   ├── CautionStrip.tsx     # Decorative/informational accent strip
│   │   ├── Design.tsx           # Design experiments showcase
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Hero.tsx             # Landing/hero section
│   │   ├── Navbar.tsx           # Top navigation bar
│   │   ├── Projects.tsx         # Project case studies section
│   │   ├── ScrollBackground.tsx # Canvas-based scroll-linked background
│   │   ├── ShimmerBackground.tsx# Interactive cursor-reactive shimmer background
│   │   ├── Skills.tsx           # Skills section
│   │   ├── StaticStrip.tsx      # Static accent strip element
│   │   └── WorkExperience.tsx   # Work experience/timeline section
│   ├── data/                    # Static data files backing Projects/Articles/Skills
│   ├── App.tsx                  # Main application entry point / layout composition
│   ├── data.ts                  # Shared/typed data definitions
│   ├── index.css                # Global styles and CSS variables
│   └── main.tsx                 # React root render entry point
├── .gitignore
├── index.html                   # HTML entry point
├── LICENSE
├── metadata.json                # Project/site metadata (SEO, etc.)
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json                # TypeScript configuration
├── vite.config.js               # Vite build configuration (JS)
└── vite.config.ts               # Vite build configuration (TS)
```

> Note: both `vite.config.js` and `vite.config.ts` are present in the repo — confirm which one is actually used by Vite and remove the redundant file to avoid confusion.

## 🧩 Core Components

| Component | Responsibility |
|---|---|
| `Hero.tsx` | Landing section, likely pairs with the shimmer/scroll backgrounds for the first-view impression. |
| `Navbar.tsx` | Site-wide top navigation. |
| `About.tsx` | Bio and personal introduction. |
| `Skills.tsx` | Technical skills overview. |
| `WorkExperience.tsx` | Career/work history timeline. |
| `Projects.tsx` | Grid/list of project case studies. |
| `Design.tsx` | Standalone showcase for design experiments/visual work. |
| `Articles.tsx` | List view for written articles. |
| `ArticleDetail.tsx` | Full-detail reader view for a single article. |
| `ShimmerBackground.tsx` | Interactive, cursor-reactive shimmer visual effect. |
| `ScrollBackground.tsx` | Canvas-based background driven by scroll position. |
| `CautionStrip.tsx` | Decorative/informational strip element used as a visual accent. |
| `StaticStrip.tsx` | Static (non-animated) strip element, likely a visual counterpart to `CautionStrip`. |
| `Footer.tsx` | Site footer with closing content/links. |

## 🎨 Theming & Customization

- Global styles and CSS custom properties live in `src/index.css`.
- Visual/design tokens can be adjusted from this central stylesheet to update the site's look and feel.
- The `ShimmerBackground` and `ScrollBackground` components expose tunable constants (speed, intensity, color stops) near the top of their files for easy experimentation.
- Static assets used across strips and frames live in `public/frames` and `resources/`.

## ⚡ Animation & Performance Notes

- `ScrollBackground.tsx` uses canvas drawing tied to scroll position — ideally gated with `IntersectionObserver` or scroll-position checks so it only animates while in view.
- `ShimmerBackground.tsx` reacts to cursor movement; verify it throttles/debounces pointer events for smooth performance.
- Heavy visual assets in `public/frames` should be served in optimized/modern formats where possible.
- Animations should respect the `prefers-reduced-motion` media query for users who opt out of motion effects.

## 🌐 Browser Support

Tested and supported on the latest two versions of:

- Chrome / Edge (Chromium-based)
- Firefox
- Safari (desktop and iOS)

## ☁️ Deployment

This project can be deployed to any static hosting provider that supports Vite builds:

- **Vercel** — connect the repo and deploy with zero configuration; auto-deploys on push.
- **Netlify** — set the build command to `npm run build` and the publish directory to `dist`.
- **GitHub Pages** — deploy the contents of the `dist` folder after building, using `gh-pages` or GitHub Actions.

## 📈 Performance & SEO

- `metadata.json` centralizes site metadata for SEO and social previews — keep it in sync with `index.html`.
- Uses semantic HTML5 landmarks (`header`, `main`, `nav`, `footer`) for better crawlability and screen-reader support.
- Aim for high Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.

## ♿ Accessibility

- Keyboard-navigable interactive elements with visible focus states.
- Sufficient color contrast across all sections, including over animated backgrounds.
- Alt text provided for all meaningful images, including frame assets.
- Motion-heavy effects (`ShimmerBackground`, `ScrollBackground`) should degrade gracefully for `prefers-reduced-motion` users.

## 🗺️ Roadmap

- [ ] Add a CMS-backed articles system
- [ ] Add unit/integration/e2e tests
- [ ] Resolve duplicate `vite.config.js` / `vite.config.ts` configuration
- [ ] Improve Lighthouse performance score
- [ ] Add internationalization (i18n) support
- [ ] Add a downloadable resume/CV section
- [ ] Add case-study filtering/search

## ❓ FAQ

**Why is the dev server not starting?**
Make sure you're using Node.js v18+ and that `npm install` completed without errors.

**How do I add a new project/article/skill entry?**
Add or edit the relevant data in `src/data/` or `src/data.ts`, then reference any images from `resources/` or `public/frames`.

**Why are there two Vite config files?**
Both `vite.config.js` and `vite.config.ts` currently exist in the repo. Confirm which one Vite actually picks up and remove the unused one to avoid confusion.

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

- Written in TypeScript throughout `src/`; keep new components strongly typed.
- Prefer functional components and hooks over class components.
- Keep components focused on a single responsibility, following the existing pattern of one file per section (`Hero.tsx`, `About.tsx`, etc.).
- Shared/typed data definitions belong in `data.ts` or `src/data/`, not hardcoded inside components.

## 🙏 Acknowledgments

- Design inspiration from the broader glassmorphism and modern portfolio design community.
- Frame and design assets sourced from `public/frames` and `resources/` (credit original sources here if applicable).

## 📄 License

This project is open-source and available under the **MIT License** (see `LICENSE`). Feel free to use the code as inspiration for your own portfolio!

## 📬 Contact

- **GitHub:** [@ShahriarXProxima](https://github.com/ShahriarXProxima)
- **Email:** [EMAIL_ADDRESS](shahriarxproximalog1@gmail.com)
- **LinkedIn:** [@ShahriarXTahmid](https://www.linkedin.com/in/shahriarxtahmid/)

---

<p align="center">Made by Shahriar</p>