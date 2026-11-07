# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences, **explicitly co-equal — none is primary** (confirmed by the owner when asked to rank them). The site must serve all four without collapsing into a single funnel:

- **Apprenticeship recruiters and hiring managers.** Evaluating Ewan for a work-study (alternance) contract tied to the MSc Data & AI for Finance. They arrive with limited time and need credibility, evidence, and a way to act.
- **Freelance clients.** Prospects assessing him for paid web and automation work. They need proof of shipped, live client projects and a clear route to contact.
- **Engineering peers and the wider community.** Developers who found a repository, a project, or the site itself. They judge on craft and depth, and reward exploration.
- **Academic and MSc network.** Faculty, programme contacts, and potential research collaborators at Albert School × Mines Paris-PSL and ECE Paris.

**Design consequence of co-equality:** when two audiences' needs conflict, the resolution is *parallel paths*, not a ranking. A recruiter's fast route to the CV and a peer's slow exploration of the OS must both exist as first-class routes. Do not optimise one at the expense of another, and do not propose a "primary user" hierarchy in future work — that question has been asked and deliberately answered as "all of them."

## Product Purpose

The personal portfolio of **Ewan Kapoor** — a working demonstration that he can take an idea from data through to a shipped, polished product.

The site is simultaneously the argument and the evidence: rather than describing craft, it *is* the artifact being evaluated. Success is a visitor from any of the four audiences leaving convinced enough to act — an interview, a project enquiry, a follow, or a collaboration.

Immediate objective (confirmed August 2026, **still searching**): landing a work-study apprenticeship starting September 2026.

## Positioning

An explorable operating system rather than a scrolling page. On desktop it presents a menu bar, a dock, desktop icons, and draggable, arrangeable windows; on mobile it becomes a hand-built iOS-style SpringBoard with app sheets, gestures, and a Projects folder. The same content inhabits two worlds, each of which feels native to its device.

Everything is hand-coded — no templates, no page builders. The concept is not decoration on top of a portfolio; the fidelity of the environment is the primary evidence of the skill being claimed.

The second differentiator is the substance behind it: a genuine Data & AI track record (production ML on IoT time series, ETL pipelines, RAG systems) paired with the product and front-end ability to ship it, held together by a stated commitment to European digital sovereignty.

## Operating Context

- Visitors arrive from a CV link, a GitHub profile, a recruiter's inbox, or a shared project link — often on mobile, often with very little time.
- Recruiters routinely need an artifact they can file or forward: the site provides a real PDF CV export, plus AI tailoring of the CV to a pasted role or job description.
- The audience is international and multilingual; the site ships **12 locales** (`en-GB` default, plus `fr`, `es`, `pt`, `de`, `it`, `zh`, `ja`, `ru`, `ko`, `hi`, `ar`), including RTL Arabic and CJK.
- Visitors are expected to *explore* rather than scroll: a boot sequence precedes the shell, and content lives behind icons, windows, and app sheets instead of a single linear page.
- Deployment runs on Vercel: `dev` is the live-test branch, `main` is production.

## Capabilities and Constraints

**Confirmed capabilities**

- Dual shells from one content source: desktop OS (boot sequence, menu bar, dock, window manager with draggable windows, desktop widgets) and a mobile iOS-style shell (SpringBoard, app sheets, Control Centre, status bar, dock, gestures, Projects folder, Now widget/overlay).
- Content surfaces: Home, About, Projects (index + per-project detail), CV, Principles, Contact, Colophon, Settings.
- **18 projects**, classified across six facets: `data-eng`, `ml`, `ai-rag`, `finance`, `web`, `sovereignty`. A subset is flagged `featured`.
- **CV system:** structured CV data per locale, facet filtering, PDF generation (Puppeteer + Nunjucks HTML templates, including a print and a banking variant), and AI tailoring of the CV to a pasted role via Mistral, with grounding applied so output stays factual.
- **RAG assistant** ("Ask Ewan"): Mistral chat (`mistral-medium-latest`) over `mistral-embed` embeddings stored in Qdrant (`portfolio_assistant` collection), answering questions about work, projects, and principles from ingested site documents. Rate-limited; degrades to an explicit unavailable state without its API key.
- **Contact:** server-validated form, React Email templates, delivery via Resend, protected by a honeypot and timing checks.
- Command palette, theme switching (light/dark/system), and locale switching.

**Technical constraints future work must respect**

- **Every user-facing string is translatable.** 12 locales, messages split per-namespace. Hardcoded copy in components is a defect, not a shortcut. Layouts must survive both RTL (`ar`) and long-word German/CJK text.
- **Theming is token-driven.** Colour and surface decisions go through CSS custom properties in `globals.css`; hardcoded hex values and `theme === 'dark'` branching in components are not acceptable.
- **Motion respects the user.** `prefers-reduced-motion` is honoured, and the WebGL background (LiquidEther, three.js) steps down on low-capability devices via an explicit device-capability check.
- **Third-party UI adapts to this project, never the reverse.** Components sourced from Aceternity, shadcn/ui, or elsewhere must be conformed to the project's tokens, i18n, and reduced-motion behaviour before use.
- Runtime secrets required for full function: `MISTRAL_API_KEY`, `QDRANT_URL` / `QDRANT_API_KEY`, `RESEND_API_KEY`, `CONTACT_TO` / `CONTACT_FROM` / `CONTACT_CONFIRM_FROM`, `REDIS_URL`. Every dependent feature must degrade gracefully when they are absent.
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, next-intl, next-themes, Framer Motion, three.js. Tests run on Vitest; package manager is Bun.

**Explicitly undecided**

- **A possible future shift from a traditional-OS metaphor to an "AI OS" metaphor.** The owner is drawn to the idea but has explicitly deferred it: *"that would need thinking in the future."* It is not approved, not scheduled, and must not be treated as a mandate. Any future work proposing it is a new concept decision requiring its own discussion — not an incremental change.

## Brand Commitments

- **Name.** Full legal name is **Mathew Kristoffer Ewan Kapoor**. He goes by **Ewan**; **Exowz** is his nickname and online handle. Conversational and personal surfaces use "Ewan"; formal documents may carry the full name; "Exowz" is the handle. *"Mathew Kapoor" as a standalone public byline is not how he presents himself* — the README and SEO metadata currently use it and are out of date.
- **The OS metaphor is a fixed commitment.** Confirmed directly: *"I love the OS metaphor and I do not wish to change it."* No future work may abandon or dilute it. It is the differentiator, not an implementation detail.
- **Hand-built is the point.** No templates, no page builders. Every window, gesture, and animation is hand-coded, and the Colophon says so publicly. Work that undermines this claim damages the core argument.
- **Published personal principles** (site content, in `principles.json`, and genuine convictions rather than marketing): useful *and* beautiful (an explicit Apple influence — power and pleasure, never one at the cost of the other); European digital sovereignty; own your data (minimal tracking, clear purpose, EU-friendly hosting); build it end to end; always learning.
- **Voice.** First-person, plain, understated, specific. Comfortable admitting a modest role or a long route into the field. No hype, no superlatives, no invented authority.
- **Typographic assets are owned and deliberate:** custom display faces (`Stanley`, `TakenByVultures`, `Array`, the legacy `Seraph`) plus Tegaki handwriting fonts used for the localized boot greeting, with Geist carrying UI and mono.

## Evidence on Hand

**Real and verifiable — use this instead of inventing anything**

- **Employment:** Purecontrol (Rennes) — AI Engineer, Data Science intern, Apr–Sep 2026: ML forecasting on IoT time series in production, a water-leak anomaly-detection algorithm, ETL pipelines into production PostgreSQL. Freelance full-stack developer since Jul 2025. Body Iron Guyane, Jul–Sep 2025. REM Cutting Edge Nutrition Ltd (Mauritius), 2021–2022, e-commerce & operations manager.
- **Education:** final-year BSc Data & AI at ECE Paris; admitted to MSc Data & AI for Finance (Albert School × Mines Paris-PSL); ECE prep, CPGE at Lycée Pothier, Liora diploma from DataScientest. Institution logos and credential badges are present as assets.
- **18 real projects** with genuine GitHub repositories (`src/data/projects.ts`), including RiskLens, ThoraxAI, Blue Gold Analytics, ReviewAI Platform, and the Purecontrol ML technical test.
- **Two publicly live demos:** `thoraxai-exowz.streamlit.app` and `shiatsu-guyane.com` (a real, shipped multilingual client site).
- **Contact facts:** contact@mke-kapoor.com (public; the CV uses ewan@mke-kapoor.com) · Paris (75017) · remote or on-site · mke-kapoor.com · linkedin.com/in/mke-kapoor · github.com/Exowz.
- **Personal imagery:** a professional headshot plus candid portraits (guitar, café) and a cooking photograph, used on the About surface.

**Absences future work must not fabricate**

There are **no** client testimonials, **no** quantified case-study results, **no** press coverage, **no** "trusted by" logo walls, **no** user or traffic numbers, and **no** awards. Do not invent them, do not add placeholder versions of them, and do not design layouts whose credibility depends on proof that does not exist. Credibility here comes from real repositories, real employers, and the demonstrated quality of the site itself.

## Product Principles

1. **Four doors, no funnel.** Recruiter, client, peer, and academic each get a legitimate first-class path. Conflicts are resolved by adding a parallel route, never by ranking one audience above another.
2. **The environment is the argument.** The OS metaphor and its execution quality are the portfolio's primary evidence. Craft is not decoration layered on the content — it *is* the content being evaluated, so a rough edge is a failed claim.
3. **Every claim traces to a real artifact.** Copy, layout, and proof elements are built only on the evidence listed above. Absence of proof is stated or designed around, never filled in.
4. **Sovereignty and data minimalism are practised, not merely stated.** The site publicly commits to minimal tracking, clear purpose, and EU-friendly hosting; implementation choices must not contradict the principles page.
5. **Twelve locales and reduced motion are constraints, not afterthoughts.** A design is finished only when it holds in Arabic and Japanese, on a low-capability device, with animation disabled.

## Accessibility & Inclusion

- `prefers-reduced-motion` is honoured across the shell, boot sequence, assistant, and content surfaces; a device-capability check independently steps down the WebGL background.
- The interface is heavily gesture- and pointer-driven (draggable windows, swipes, drag-to-arrange). **Every such interaction requires a non-gestural equivalent** — keyboard, button, or the command palette — so the site does not become unusable for keyboard and assistive-technology users. This is the standing accessibility risk of the OS metaphor and must be checked in any new shell work.
- RTL (`ar`) and CJK (`zh`, `ja`, `ko`) rendering are supported requirements, not optional extras.
- No formal conformance standard (e.g. WCAG level) has been committed to yet — undecided.
