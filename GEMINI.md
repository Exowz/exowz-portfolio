# Project Overview: Exowz Portfolio

Personal portfolio website for Mathew Kapoor (Exowz), featuring a sophisticated "OS-like" interactive experience with dual-UI for desktop and mobile.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using `@theme inline` in `globals.css`)
- **Animation:** Framer Motion, Motion, Three.js (`@react-three/fiber`)
- **Internationalization:** `next-intl` (12 fully translated modular locales: `en-GB`, `fr`, `es`, `pt`, `de`, `it`, `zh`, `ja`, `ru`, `ko`, `hi`, `ar`)
- **Theme:** `next-themes` (Dark/Light mode with system detection)
- **UI Components:** shadcn/ui (Radix UI), Aceternity UI, custom "Stanley" font
- **Testing:** Vitest
- **Package Manager:** Bun
- **Deployment:** Vercel

## 🏛 Architecture & Core Concepts

### Dual-UI Design
The application employs a specialized dual-UI strategy based on device type:
- **Desktop:** A macOS-inspired environment with a `Header` (menu bar), `Dock`, and a `WindowManager` that handles multi-window navigation.
- **Mobile:** An iOS-inspired "SpringBoard" shell (`MobileShell`) for the home screen, using `MobileAppSheet` for individual page views.

### Navigation & Window Management
- **WindowManager:** Orchestrates desktop windows. It syncs with the URL via `parseActiveRoute(pathname)`.
- **LayoutContent:** A conditional wrapper that decides whether to render the full `Desktop` environment or standard page content based on the route.
- **Dynamic Routing:** Routes like `/about`, `/projects`, etc., are treated as "Windowed" routes on desktop.

### Boot Sequence
- **BootWrapper:** An initial sequence that plays a "boot" animation.
- State is persisted in `localStorage` (`hasSeenBoot: "true"`) to avoid re-playing it on every visit.

### Visual Effects
- **LiquidEther:** A fluid simulation background (Three.js) that runs on capable devices (checked via `shouldRunLiquidSim`).
- **Glassmorphism:** Primary design aesthetic defined in `globals.css` (`.glass-light`, `.glass-dark`).

## 🚦 Building and Running

### Development
```bash
bun dev          # Starts development server with Turbopack
```

### Testing
```bash
bun test         # Runs Vitest suites
bun test:watch   # Runs Vitest in watch mode
```

### Production
```bash
bun build        # Builds for production
bun start        # Starts production server
```

### Linting
```bash
bun lint         # Runs ESLint
```

## 📁 Key Directories

- `src/app/[locale]/`: Internationalized routes.
- `src/components/desktop/`: Components specific to the macOS-like desktop UI.
- `src/components/mobile/`: Components specific to the iOS-like mobile UI.
- `src/components/windows/`: Content for individual windows/apps (Projects, About, Contact, etc.).
- `src/components/boot/`: Boot sequence animations and logic.
- `src/messages/`: Modular translation files organized by locale (e.g., `en-GB/index.ts`, `en-GB/projects.json`).
- `src/lib/`: Core utilities (SEO, validation, device capabilities).

## 🛠 Development Conventions

### Styling
- Use **Tailwind CSS v4** utility classes.
- Prefer the established **Glassmorphism** classes (`.glass-light`, `.glass-dark`) for UI containers.
- Use the `cn` utility (`src/lib/utils.ts`) for conditional class merging.

### Components
- Functional components with TypeScript interfaces for props.
- Utilize `framer-motion` for interaction-heavy animations.
- UI components follow the **shadcn/ui** pattern (Radix primitives + `cva` for variants).

### Internationalization
- Use `next-intl` hooks (`useTranslations`, `useLocale`).
- Ensure all static text is externalized to `src/messages/*.json`.
- Locales follow the `en-GB` and `fr` format.

### Performance & Capabilities
- Use `shouldRunLiquidSim()` from `src/lib/deviceCapability.ts` before enabling heavy 3D simulations.
- Use `dynamic` imports for heavy components (e.g., `ProjectDetailWindow`).

## ⚠️ Important Implementation Details

- **Middleware:** The i18n middleware is located at `src/proxy.ts`.
- **Window State:** Window state is derived strictly from the URL. Avoid manual state management for window visibility; use `router.push` instead.
- **Mobile Home:** The `MobileShell` is fixed and covers the desktop UI on mobile devices when at the root route.
