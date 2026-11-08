<div align="center">

# Exowz Portfolio

### _A portfolio you explore like an operating system_

<p><em>The personal site of Mathew Kristoffer Ewan Kapoor (Exowz): Data, AI, and the products built around them</em></p>

![Status](https://img.shields.io/badge/status-live-success?style=flat)
![Locales](https://img.shields.io/badge/locales-12-blue?style=flat)
![Projects](https://img.shields.io/badge/projects-17-informational?style=flat)
![Deployed on Vercel](https://img.shields.io/badge/deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

<p><em>Built with the tools and technologies:</em></p>

![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat&logo=framer&logoColor=white)
![three.js](https://img.shields.io/badge/three.js-0.180-000000?style=flat&logo=three.js&logoColor=white)

![Mistral](https://img.shields.io/badge/Mistral-AI-FA520F?style=flat)
![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-DC244C?style=flat)
![Redis](https://img.shields.io/badge/Redis-Rate_limiting-DC382D?style=flat&logo=redis&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-Email-000000?style=flat)
![next-intl](https://img.shields.io/badge/next--intl-4-0A0A0A?style=flat)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat&logo=vitest&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-runtime-000000?style=flat&logo=bun&logoColor=white)

---

**[🌐 mke-kapoor.com](https://mke-kapoor.com) · [🧭 Architecture](#architecture) · [🚦 Getting Started](#getting-started)**

</div>

---

## Table of Contents

- [Purpose](#purpose)
- [Features](#features)
  - [1. Two Shells, One Source](#1-two-shells-one-source)
  - [2. Content Surfaces](#2-content-surfaces)
  - [3. AI Assistant ("Ask Ewan")](#3-ai-assistant-ask-ewan)
  - [4. CV System](#4-cv-system)
  - [5. Contact](#5-contact)
  - [6. Internationalisation](#6-internationalisation)
  - [7. Accessibility & Motion](#7-accessibility--motion)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [API Routes](#api-routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Design & Theming](#design--theming)
- [Technical Decisions](#technical-decisions)
- [Author](#author)

---

## Purpose

This is my personal portfolio, and I wanted it to show that I can take an idea from data all the way to a shipped, polished product.

So it isn't a page you scroll. On desktop it behaves like an operating system: a boot sequence, a menu bar, a dock, desktop icons, and draggable windows you open and arrange. On phones it becomes an iOS-style shell with a springboard, app sheets, gestures, and a Projects folder. Same content, two worlds that each feel native to their device.

Everything is hand-coded, with no templates and no page builders. The site is written for four audiences on equal footing: apprenticeship recruiters, freelance clients, engineering peers, and my academic network. Each one gets its own direct route rather than being pushed through a single funnel. A recruiter can get to the CV in two clicks, and a developer can spend twenty minutes poking at the window manager.

---

## Features

### 1. Two Shells, One Source

The same content renders through two completely different shells, chosen at runtime from the viewport (`useIsMobile`).

#### Desktop OS

| Element | What it does |
|---------|--------------|
| **Boot sequence** | Press-start screen, count-up loader, and a localised handwritten greeting (Tegaki) |
| **Menu bar** | Morphing menu, language panel, settings, theme toggle |
| **Window manager** | Draggable, focusable, stackable windows. Each route opens as a window |
| **Dock & desktop icons** | Launch surfaces. Icons mirror the routes |
| **Widgets** | Now widget with expanded content |
| **Background** | LiquidEther, a WebGL fluid simulation (three.js) with a static gradient fallback |
| **Command palette** | `cmdk`-based keyboard navigation to any surface |

#### Mobile SpringBoard

| Element | What it does |
|---------|--------------|
| **SpringBoard** | Home screen of app icons, with an identity widget and a Now widget/overlay |
| **App sheets** | Each surface opens as a sheet with an app-open transition |
| **Projects folder** | Projects grouped by category, with folder navigation |
| **Control Centre** | Theme, language, and quick settings |
| **Status bar & dock** | Live clock, persistent dock |
| **Gestures** | Swipe and long-press handling (`gestures.ts`, `useLongPress`), each with a non-gesture equivalent |

### 2. Content Surfaces

| Route | Surface |
|-------|---------|
| `/` | Home (desktop or mobile shell) |
| `/about` | Background, photo gallery, personal details |
| `/projects` | Project index, filterable by facet |
| `/projects/[slug]` | Per-project detail window: context, implementation, stack, links |
| `/cv` | Curriculum Vitae, with facet filtering, PDF export, and AI tailoring |
| `/principles` | Published principles: useful *and* beautiful, European digital sovereignty, own your data, build it end to end, always learning |
| `/contact` | Contact form |
| `/colophon` | How the site is built |
| `/settings` | Theme, language, replay intro, command palette |

**17 projects** live in `src/data/projects.ts`, each classified across six facets (`data-eng`, `ml`, `ai-rag`, `finance`, `web`, `sovereignty`). A subset is flagged `featured`; currently RiskLens, ThoraxAI, and Green AI Scanner.

### 3. AI Assistant ("Ask Ewan")

A glass "Ask…" pill opens a chat that answers questions about my work, projects, and principles. It uses retrieval-augmented generation over the site's own documents.

#### Pipeline

```
question ──► mistral-embed (1024-d) ──► Qdrant top-7 search ──► context
                                                                 │
           streamed answer ◄── mistral-medium-latest ◄── system prompt + context + history
```

| Parameter | Value |
|-----------|-------|
| Chat model | `mistral-medium-latest` (overridable via `MISTRAL_CHAT_MODEL`) |
| Embeddings | `mistral-embed`, 1024 dimensions |
| Vector store | Qdrant, collection `portfolio_assistant` |
| Chunking | 1,200 characters with 180-character overlap, deterministic SHA-256 chunk IDs |
| Retrieval | Top 7 chunks per question |
| Input limits | 500 characters per message, last 8 messages of history |
| Rate limit | 10 requests / 10 min per client (Redis, in-memory fallback) |

Answers stream back to the client through a `ReadableStream`. Documents are indexed with `bun run assistant:ingest` (see [Scripts](#scripts)). Because chunk IDs are deterministic, re-ingesting a document overwrites its chunks instead of duplicating them.

### 4. CV System

- **Structured data** per locale (`src/data/cv.ts` + `cv.json` messages), filterable by the same six facets as the projects.
- **PDF export**, rendered server-side by Puppeteer (`puppeteer-core` + `@sparticuz/chromium` on Vercel) from Nunjucks HTML templates, in a print variant and a banking variant. Pre-built PDFs for `en-GB` and `fr` also ship in `public/`.
- **AI tailoring**: paste a role or job description and Mistral picks the most relevant projects, skills, and experience. The output is then **grounded**:

  | Field | Rule |
  |-------|------|
  | Projects | Must be real slugs from `projects.ts`; max 5, each with a reason ≤ 140 chars |
  | Skills | Must exist in the CV's skill vocabulary; max 12 |
  | Experience | Must be real experience IDs; max 3 |
  | Label / summary | Markdown stripped, clamped to 50 / 280 chars |
  | Role input | 3–2,000 characters |

  Anything the model invents that isn't in the vocabulary is silently dropped, so the tailored CV can only rearrange true facts.

### 5. Contact

- Server-validated form (`src/lib/validation.ts`)
- Bot protection: a **honeypot** field and a **timing check** that rejects anything submitted less than 2 s after render
- Two React Email templates: a notification to me and a confirmation to the sender
- Delivered through **Resend**

### 6. Internationalisation

**12 locales** via `next-intl`, with locale-prefixed routes:

| Code | Language | Code | Language |
|------|----------|------|----------|
| `en-GB` | English (default) | `zh` | 中文 |
| `fr` | Français | `ja` | 日本語 |
| `es` | Español | `ru` | Русский |
| `pt` | Português | `ko` | 한국어 |
| `de` | Deutsch | `hi` | हिन्दी |
| `it` | Italiano | `ar` | العربية (RTL) |

Messages are split **per namespace** (`cv.json`, `projects.json`, `nav.json`, `boot.json`, …) under `src/messages/<locale>/` instead of one large file per language. No user-facing string is hardcoded in a component.

### 7. Accessibility & Motion

- `prefers-reduced-motion` is respected across the shell, boot sequence, assistant, and content surfaces.
- `deviceCapability.ts` decides separately whether the WebGL background runs. It turns it off for reduced motion, coarse pointers (desktop variant), fewer than 4 CPU cores, under 4 GB device memory (mobile variant), or missing WebGL. Those clients get a static gradient.
- Every drag or swipe interaction has a keyboard, button, or command-palette equivalent.
- RTL Arabic and CJK rendering are requirements, not extras.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│  Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 │
│                                                              │
│  Shells:                                                     │
│  • Desktop  — BootSequence, Header, WindowManager, Dock,     │
│               DesktopWidgets, LiquidEther (three.js / R3F)   │
│  • Mobile   — SpringBoard, MobileAppSheet, ControlCenter,    │
│               StatusBar, ProjectsFolder, NowOverlay          │
│                                                              │
│  UI: shadcn/ui · Aceternity UI · liquid-glass-react · cmdk   │
│  Motion: Framer Motion / Motion · Tegaki handwriting         │
│  i18n: next-intl (12 locales) · Theme: next-themes           │
└──────────────────────┬───────────────────────────────────────┘
                       │ fetch / streaming
┌──────────────────────▼───────────────────────────────────────┐
│                  ROUTE HANDLERS (Node.js)                    │
│                                                              │
│  /api/assistant   RAG chat, streamed                         │
│  /api/cv/tailor   Job-description tailoring + grounding      │
│  /api/cv/pdf      Puppeteer + Nunjucks → PDF                 │
│  /api/contact     Validation, honeypot, timing → Resend      │
│                                                              │
│  lib/assistant: rag · validate · rateLimit                   │
│  lib/cv: tailor · select-projects · pdf-data                 │
└──────┬──────────────┬──────────────┬──────────────┬──────────┘
       │              │              │              │
┌──────▼─────┐ ┌──────▼─────┐ ┌──────▼─────┐ ┌──────▼─────┐
│ Mistral AI │ │   Qdrant   │ │   Redis    │ │   Resend   │
│ chat +     │ │ vectors    │ │ rate       │ │ email      │
│ embeddings │ │            │ │ limiting   │ │ delivery   │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

Hosted on **Vercel**: `dev` is the live-test branch, `main` is production. Vercel Analytics is the only analytics.

---

## Project Structure

```
exowz-portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # Shell, fonts, providers, analytics
│   │   │   ├── page.tsx              # Home (desktop or mobile shell)
│   │   │   ├── about/ cv/ principles/ contact/ colophon/ settings/
│   │   │   └── projects/[slug]/      # Project index + detail
│   │   ├── api/
│   │   │   ├── assistant/            # RAG chat endpoint
│   │   │   ├── contact/              # Contact form handler
│   │   │   └── cv/pdf/ cv/tailor/    # PDF export, AI tailoring
│   │   ├── globals.css               # Design tokens + Tailwind v4
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── desktop/                  # Desktop, WindowManager, Window, LiquidEther
│   │   ├── mobile/                   # SpringBoard, ControlCenter, gestures, ProjectsFolder
│   │   ├── windows/                  # Content surfaces (About, CV, Projects, …)
│   │   ├── boot/                     # Boot + start sequences, Tegaki text
│   │   ├── assistant/                # Assistant pill, chat, useAssistant
│   │   ├── header/                   # Menu bar, language + settings menus
│   │   ├── dock/ widgets/ command/ transitions/ layout/
│   │   ├── hooks/                    # useIsMobile, useClock, usePrefersReducedMotion, …
│   │   └── ui/                       # shadcn/ui + Aceternity components
│   ├── data/                         # projects.ts, cv.ts (+ tests)
│   ├── lib/
│   │   ├── assistant/                # RAG, validation, rate limiting
│   │   ├── cv/                       # Tailoring, project selection, PDF data
│   │   ├── cv-pdf/                   # Nunjucks templates + fonts
│   │   ├── projects/                 # Gallery helpers
│   │   └── seo.ts deviceCapability.ts validation.ts clock.ts
│   ├── emails/                       # ContactNotification, ContactConfirmation
│   ├── i18n/                         # routing.ts, request.ts
│   ├── messages/                     # 12 locales, split per namespace
│   └── types/
├── scripts/
│   └── ingest-assistant-docs.ts      # Builds the assistant's vector index
├── public/
│   ├── fonts/                        # Stanley, TakenByVultures, Array, Seraph, Tegaki
│   ├── images/ sounds/
│   └── resume-en-GB.pdf resume-fr.pdf
├── DESIGN.md                         # Design system: tokens, type, rules
├── PRODUCT.md                        # Product context: audiences, principles
└── components.json                   # shadcn/ui configuration
```

---

## Data Model

There is no database. Content is typed TypeScript data, with all prose stored in i18n messages.

```ts
type CvFacet = 'data-eng' | 'ml' | 'ai-rag' | 'finance' | 'web' | 'sovereignty';

interface Project {
  slug: string;          // URL segment + identity
  key: string;           // i18n namespace → projects.<key>.* in messages
  tags: string[];        // Stack shown on cards
  facets: CvFacet[];     // Shared with the CV filter
  featured?: boolean;    // Featured rotation
  github: string | null;
  demo: string | null;
  date: string;          // 'YYYY-MM'
}
```

Vitest checks the data's invariants: project count, unique slugs, exactly three featured projects, valid facets with no unused filter, and matching `en-GB` / `fr` copy for every project.

---

## API Routes

All handlers run on the Node.js runtime and return a clear "unavailable" response when their keys are missing.

```
POST   /api/assistant     Stream a RAG answer                  10 req / 10 min
POST   /api/cv/tailor     Tailor the CV to a role description  10 req / 10 min
POST   /api/cv/pdf        Render the CV as PDF (per locale)     5 req / 10 min
POST   /api/contact       Validate + send via Resend           honeypot + 2 s timing
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.0+ (or Node.js 20+)
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- Git
- *Optional:* a [Mistral](https://console.mistral.ai/) API key, a [Qdrant](https://qdrant.tech/) cluster, a [Resend](https://resend.com/) key, and a Redis URL, needed only for the assistant, CV tailoring, and contact form

### 1. Clone and install

```bash
git clone https://github.com/Exowz/exowz-portfolio.git
cd exowz-portfolio
bun install
```

### 2. Environment

```bash
cp .env.example .env.local
```

Fill in whatever you need (see [Environment Variables](#environment-variables)). You can leave all of it empty and the site still runs.

### 3. Run

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. (Optional) Index the assistant's documents

```bash
bun run assistant:ingest ./path/to/docs ./another/folder
# or set ASSISTANT_DOC_PATHS (colon-separated) and run with no arguments
```

Supported formats: `.md`, `.mdx`, `.txt`, `.json`, `.yaml`, `.yml`.

### 5. Production build

```bash
bun run build
bun start
```

---

## Environment Variables

Each feature that depends on these **degrades gracefully** when its keys are absent. The assistant, CV tailoring, and contact form simply report that they are unavailable.

| Variable | Used for |
|----------|----------|
| `MISTRAL_API_KEY` | Assistant chat + embeddings, CV tailoring |
| `MISTRAL_CHAT_MODEL` | Optional (default `mistral-medium-latest`) |
| `MISTRAL_EMBEDDING_MODEL` | Optional (default `mistral-embed`) |
| `MISTRAL_EMBEDDING_DIMENSION` | Optional (default `1024`) |
| `QDRANT_URL` | Assistant vector store |
| `QDRANT_API_KEY` | Assistant vector store auth |
| `QDRANT_COLLECTION` | Optional (default `portfolio_assistant`) |
| `ASSISTANT_DOC_PATHS` | Optional default source folders for `assistant:ingest` |
| `REDIS_URL` | Distributed rate limiting (in-memory fallback without it) |
| `RESEND_API_KEY` | Contact form delivery |
| `CONTACT_TO` | Contact form recipient |
| `CONTACT_FROM` | Notification sender |
| `CONTACT_CONFIRM_FROM` | Confirmation email sender |

---

## Scripts

```bash
bun dev                    # Development server (Turbopack)
bun run build              # Production build (Turbopack)
bun start                  # Serve the production build
bun lint                   # ESLint
bun test                   # Vitest suite
bun run test:watch         # Vitest in watch mode
bun run assistant:ingest   # (Re)build the assistant's Qdrant index
```

**Adding a locale:**

1. Create `src/messages/<locale>/` and copy the namespace files from `en-GB`
2. Add the locale to `routing.locales` in `src/i18n/routing.ts`
3. Translate each namespace file, then check the layout in RTL and with long German/CJK words

---

## Design & Theming

Full reference: [`DESIGN.md`](DESIGN.md).

Colour and surface decisions go through CSS custom properties in `src/app/globals.css`. Components use the tokens, never raw hex, and never branch on `theme === 'dark'`.

The accent is split by usage so contrast holds in both themes:

| Token | Use |
|-------|-----|
| `--accent` (`#64b5f6`) | Fills, glows, focus rings |
| `--accent-text` | Accent used as text or icons on a light background |
| `--accent-solid` | Accent as a fill behind white text (the icy `--accent` is too light for that) |

Alongside `--background` / `--foreground` and `--text-secondary` for body hierarchy.

**Type:** Stanley and TakenByVultures as display faces, Array on the press-start screen, Tegaki handwriting for the localised boot greeting, and Geist for UI and mono.

**Third-party UI** (Aceternity, shadcn/ui, …) is always adapted to the project's tokens, i18n, and reduced-motion behaviour before use. The project never changes to fit the component.

---

## Technical Decisions

### Why an OS metaphor instead of a scrolling page?
The environment is the evidence. A portfolio that claims front-end and product craft makes the strongest case by *being* a demanding piece of front-end work. A boot sequence, window manager, and native-feeling mobile shell show things a list of bullet points can't.

### Why two shells instead of one responsive layout?
A desktop window manager squeezed onto a phone feels wrong, and so does an iOS springboard stretched across a monitor. Both shells read from the same data and messages, so content is written once while each device gets an interaction model that suits it.

### Why Mistral, and why talk to Qdrant directly?
I publish a commitment to European digital sovereignty, and using a European model provider follows through on it. The assistant originally used Mistral's Agents API with a Document Library. It now does retrieval itself against Qdrant, which gives control over chunking, retrieval depth, and the prompt, and makes the pipeline testable.

### Why ground the CV tailoring output?
A language model will happily invent a project or a skill. Validating every returned slug, skill, and experience ID against the real vocabulary means tailoring can only *select and reorder* true facts. A recruiter never sees a fabricated claim.

### Why server-side PDFs with Puppeteer?
The CV templates are plain HTML/CSS with the real fonts, so the PDF matches the design exactly. `@sparticuz/chromium` fits within Vercel's serverless limits, and Nunjucks keeps the templates readable without pulling React into the print path.

### Why split messages per namespace?
Twelve locales × one huge file per locale makes every change risky and every diff noisy. Per-namespace files keep translation work scoped (e.g. updating `projects.json` across all locales) and keep merges clean.

### Why graceful degradation everywhere?
The site has to run from a fresh clone with no secrets, and keep running if a provider goes down. Every external dependency (Mistral, Qdrant, Redis, Resend) has a defined "unavailable" path instead of a crash.

### Why a device-capability check on top of `prefers-reduced-motion`?
They answer different questions. Reduced motion is about what the user wants. Capability is about what the device can handle. A low-end phone whose user is fine with motion still shouldn't run a fluid simulation that drains its battery.

---

## Author

- **Mathew Kristoffer Ewan Kapoor** (Ewan · Exowz)
  - MSc Data & AI for Finance, Albert School × Mines Paris-PSL (2026–2028)
  - Digital Project Manager, Automation & AI, at Prosper Conseil (work-study)
  - BSc Data & AI, ECE Paris
  - Website: [mke-kapoor.com](https://mke-kapoor.com)
  - Email: [contact@mke-kapoor.com](mailto:contact@mke-kapoor.com)
  - LinkedIn: [linkedin.com/in/mke-kapoor](https://linkedin.com/in/mke-kapoor)
  - GitHub: [@Exowz](https://github.com/Exowz)

---

**Last updated**: November 2026
**Status**: ✅ Live at [mke-kapoor.com](https://mke-kapoor.com)
