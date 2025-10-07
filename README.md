# Exowz Portfolio

## 🌟 Overview
My personal portfolio website - I'm Mathew Kapoor (Exowz), a developer passionate about Data, AI, and building interactive web experiences.

## 🚀 Features
- Multilingual support (English & French) using next-intl
- Dark mode with system preference detection
- Responsive design with modern UI
- Built with Next.js 15 and TypeScript
- Styled with Tailwind CSS and shadcn/ui
- Custom Seraph font for my branding
- Smooth animations with Framer Motion

## 🛠️ Tech Stack
- **Framework:** Next.js 15.5.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui, Aceternity UI
- **Internationalization:** next-intl
- **Theme:** next-themes (dark mode)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Package Manager:** Bun
- **Deployment:** Vercel

## 📁 Project Structure

```
exowz-portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── layout.tsx     # Root layout with theme provider
│   │   │   └── page.tsx       # Main page
│   │   └── globals.css        # Global styles with Tailwind v4
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── HoldingPage.tsx    # Landing page component
│   │   ├── theme-provider.tsx # Theme context provider
│   │   ├── theme-toggle.tsx   # Dark mode toggle
│   │   └── language-switcher.tsx # Language dropdown
│   ├── i18n/
│   │   ├── routing.ts         # Internationalization routing
│   │   └── request.ts         # i18n request configuration
│   ├── messages/
│   │   ├── en.json            # English translations
│   │   └── fr.json            # French translations
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/
│   └── fonts/
│       └── Seraph Regular.otf # Custom font
└── components.json            # shadcn/ui configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Exowz/exowz-portfolio.git
cd exowz-portfolio
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

## 🎨 Customization

### Colors
I use a custom color scheme:
- **Ivory Drift** (#FDF0D5) - Light mode background
- **Abyss Blue** (#003049) - Dark mode background / Light mode text

Colors are defined in Tailwind config and can be customized in `src/app/globals.css`.

### Fonts
I use a custom font (Seraph) loaded from `/public/fonts/Seraph Regular.otf`

To change the font:
1. Add your font file to `/public/fonts/`
2. Update the @font-face declaration in `src/app/globals.css`
3. Update the fontFamily style in `HoldingPage.tsx`

### Adding New Languages

1. Create a new JSON file in `src/messages/` (e.g., `es.json`)
2. Add the locale to `src/i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en'
});
```
3. Update the language switcher in `src/components/language-switcher.tsx`

## 🌐 Internationalization

This project uses `next-intl` for internationalization. Translation files are located in `src/messages/`:
- `en.json` - English translations
- `fr.json` - French translations

All text content is externalized and can be easily translated by editing these JSON files.

## 🎭 Dark Mode

Dark mode is implemented using `next-themes` with:
- System preference detection
- Manual toggle via button in top-right corner
- Persistent theme selection in localStorage
- Smooth transitions between themes

## 📦 Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server
bun lint             # Run ESLint

# shadcn/ui
bunx shadcn@latest add [component]  # Add new UI component
```

## 🧩 Key Components

### HoldingPage
The main landing page component featuring:
- Large centered name display with custom Seraph font
- Multilingual content
- Social media links
- Dark mode support

### ThemeToggle
Dark mode toggle button with:
- Animated sun/moon icons
- System preference detection
- Smooth transitions

### LanguageSwitcher
Language selection dropdown with:
- Current locale display
- Available languages (English/Français)
- Visual indicator for selected language

## 📧 Contact

- **Website:** [mke-kapoor.com](https://mke-kapoor.com)
- **Email:** contact@mke-kapoor.com
- **LinkedIn:** [linkedin.com/in/mke-kapoor](https://linkedin.com/in/mke-kapoor)
- **GitHub:** [@Exowz](https://github.com/Exowz)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Exowz](https://github.com/Exowz)
