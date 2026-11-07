---
name: Exowz Portfolio
description: A frosted-glass operating system — translucent panels floating over a living fluid field, in twelve languages.
colors:
  glacier-blue: "#64b5f6"
  glacier-blue-deep: "#1976d2"
  paper-white: "#ffffff"
  mist-grey: "#f5f5f5"
  field-mist: "#eef2f6"
  charcoal-dark: "#1a1a1a"
  charcoal-panel: "#2a2a2a"
  charcoal-base: "#333333"
  charcoal-light: "#4a4a4a"
  slate-ink: "#546e7a"
  slate-hint: "#78909c"
  cool-gray-dark: "#90a4ae"
  cool-gray-base: "#b0bec5"
  cool-gray-light: "#cfd8dc"
  cool-gray-hint: "#8a99a3"
  traffic-red: "#ff5f57"
  traffic-amber: "#ffbd2e"
  traffic-green: "#28ca42"
  destructive: "#ef4444"
typography:
  display:
    fontFamily: "Stanley, var(--font-geist-sans), sans-serif"
    fontSize: "3.75rem → 8rem (responsive steps)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
  title:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
  mono:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  script:
    fontFamily: "TakenByVultures, cursive"
    fontSize: "2rem"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  panel: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  gutter-mobile: "16px"
  gutter-tablet: "32px"
  gutter-desktop: "64px"
  chrome-top: "80px"
  chrome-bottom: "100px"
components:
  button-primary:
    backgroundColor: "{colors.glacier-blue-deep}"
    textColor: "{colors.paper-white}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.glacier-blue-deep}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
  input-field:
    backgroundColor: "{colors.field-mist}"
    textColor: "{colors.charcoal-base}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "10px 16px"
  glass-card:
    textColor: "{colors.charcoal-base}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    padding: "24px"
  window-panel:
    textColor: "{colors.charcoal-base}"
    rounded: "{rounded.panel}"
  dock-item:
    textColor: "{colors.charcoal-base}"
    rounded: "{rounded.panel}"
    height: "40px"
    width: "40px"
  app-icon:
    textColor: "{colors.charcoal-base}"
    rounded: "{rounded.panel}"
    height: "56px"
    width: "56px"
  assistant-pill:
    textColor: "{colors.charcoal-base}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 16px"
---

# Design System: Exowz Portfolio

## Overview

**Creative North Star: "The Frosted Workstation"**

Every surface in this system is a pane you see through. Nothing is painted on; everything is a translucent sheet of frosted glass suspended over a field that is quietly alive underneath it. The wallpaper is not a backdrop — on capable hardware it is a running WebGL fluid simulation that reacts to the cursor, and on everything else it steps down to the same three-stop gradient rendered statically. Chrome floats above that field at `blur(20px) saturate(180%)`, thick enough to read against but thin enough that the movement below never fully disappears.

The temperament is **weightless, atmospheric, and fluid**. Panels drift in rather than snap (`scale 0.95 → 1`, `y +20 → 0`, eased on `cubic-bezier(0.16, 1, 0.3, 1)`), edges stay indistinct, and depth is carried by blur and diffuse shadow rather than by drawn lines. The palette is almost entirely colourless — white, mist, charcoal, and cool grey — so that the single chromatic voice, Glacier Blue, reads as precision wherever it lands.

This is an operating system, not a page. The design language exists to make a browser tab feel like a machine you booted: a menu bar, a dock, draggable windows, traffic lights, a BIOS screen, a springboard. That framing is a fixed product commitment, so the visual system's job is to make the illusion hold — which means restraint everywhere the OS metaphor isn't speaking, and total conviction everywhere it is.

**Key Characteristics:**
- Translucent glass over a living fluid field; `blur(20px) saturate(180%)` is the house material
- One chromatic accent (Glacier Blue) against an otherwise neutral palette
- Depth by blur and diffuse shadow, never by a hard outline
- Dual shell: macOS-like windows on desktop, iOS springboard on mobile, from one content source
- Motion is soft and physical — things drift, scale, and glow rather than cutting
- Fully token-driven so light and dark are one system, not two designs

## Colors

An almost colourless system — white, mist, charcoal, and cool grey — punctured by exactly one cold blue that carries every interactive signal.

### Primary
- **Glacier Blue** (#64b5f6): The single brand voice. Used for fills, focus rings, hover glows, active states, and the third stop of both the fluid simulation and the mobile wallpaper gradient. In dark mode it also serves as text and icon colour (~8:1 on charcoal).
- **Glacier Blue Deep** (#1976d2): Glacier Blue is too pale to carry text or to sit behind white — white on `#64b5f6` is only ~1.9:1. This darker cut is the light-mode substitute in both cases: as text/icons on white (~5:1) and as a solid fill behind white labels (~4.6:1). In dark mode this role collapses back to Glacier Blue, which already reads.

### Neutral
- **Paper White** (#ffffff): Light-mode page and elevated-surface base.
- **Mist Grey** (#f5f5f5): Light-mode secondary surface and the first stop of the light wallpaper gradient.
- **Field Mist** (#eef2f6): Form-field fill in light mode — a real soft surface so an input never reads as a lone outline on white.
- **Charcoal Dark** (#1a1a1a): Dark-mode page base and first wallpaper stop.
- **Charcoal Panel** (#2a2a2a): Dark-mode secondary surface, second wallpaper stop.
- **Charcoal Base** (#333333): Light-mode primary text; dark-mode elevated surface.
- **Charcoal Light** (#4a4a4a): Reserved tonal step.
- **Slate Ink** (#546e7a): Light-mode secondary text (~5.5:1 on white).
- **Slate Hint** (#78909c): Light-mode tertiary text — hints and large text only, never body copy.
- **Cool Gray Base** (#b0bec5): Dark-mode secondary text (~9:1 on charcoal).
- **Cool Gray Hint** (#8a99a3): Dark-mode tertiary text.
- **Cool Gray Dark / Light** (#90a4ae / #cfd8dc): Supporting tonal steps.

### Tertiary
- **Traffic Red / Amber / Green** (#ff5f57 / #ffbd2e / #28ca42): The macOS window controls. These are the one place saturated colour appears outside the accent, and they are quoting a real OS — they are never repurposed as a status palette.
- **Destructive** (#ef4444): Error and destructive state only.

### Named Rules

**The One Voice Rule.** Glacier Blue is the only chromatic colour in the system. If a new element needs to "stand out with colour", the answer is almost always more contrast or more space, not a second hue. The traffic lights are the sole licensed exception, and only because they are quoting macOS.

**The Two-Cut Accent Rule.** Never use `--accent` as text on a light background, and never place white on it. Use `--accent-text` for text/icons and `--accent-solid` for fills behind white. These collapse to the same value in dark mode, so writing the token — never the hex — is what keeps both themes correct.

**The Tertiary Ceiling Rule.** `--text-tertiary` is for hints and large text only. It does not meet body-copy contrast in light mode and must never carry a sentence the user is expected to read.

## Typography

**Display Font:** Stanley (with Geist Sans fallback)
**Body Font:** Geist Sans
**Label/Mono Font:** Geist Mono
**Script Font:** TakenByVultures — boot sequence and About accents
**Wide Display:** Array — the press-start screen
**Handwriting:** Tegaki (Russian and Chinese cuts) — the localized boot greeting, drawn stroke by stroke

**Character:** A quiet, near-neutral grotesque doing all the real work, with genuinely characterful faces reserved for the moments the OS metaphor is performing — the boot, the greeting, the name. The contrast between an unremarkable UI face and a handwritten greeting is the point: the interface recedes so the personality can land where it's aimed.

### Hierarchy
- **Display** (700, 3.75rem → 8rem responsive, line-height 1, tracking tight): Stanley, for the name on the desktop and the mobile identity widget. Appears once per screen at most.
- **Headline** (600, 2.25rem, line-height 1.15): Section openers inside windows.
- **Title** (600, 1.125rem, line-height 1.4): Window titles, card headings, section labels.
- **Body** (400, 0.875rem, line-height 1.6): The dominant size across the entire system — window prose, descriptions, form text.
- **Label** (500, 0.75rem, line-height 1.3): App labels, tooltips, badges, metadata, dock captions.
- **Mono** (400, 0.875rem, tracking 0.02em): Geist Mono, for the BIOS screen, the menu-bar clock, and anything quoting machine output.

### Named Rules

**The Small-Type System Rule.** This system is built at `0.875rem` body and `0.75rem` label — deliberately compact, because it is imitating OS chrome, not a reading page. Do not scale a new component up to web-marketing sizes; it will immediately read as foreign.

**The Display-Once Rule.** Stanley is an identity mark, not a heading font. One display element per screen. Section headings use Geist Sans at Headline or Title, never Stanley.

**The Twelve-Language Rule.** Every type decision must survive Arabic (RTL), Japanese, Korean, Chinese, and long-compound German. No fixed-width text containers, no `white-space: nowrap` on translated strings, no layouts that assume English word length.

## Layout

The spatial model is OS chrome, not a document grid. Two shells share one content source.

**Desktop.** A fixed menu bar at the top and a floating dock at the bottom, with windows occupying the space between. Windows are positioned `fixed` with `80px` clearance for the header and `100px` for the dock. Side gutters step responsively: `16px` below 768px, `32px` at the `md` breakpoint, `64px` at `lg` and above. Windows are full-bleed within those insets rather than centred in a max-width container — they behave like real windows filling available desk space.

**Mobile.** An iOS springboard: status bar, app grid of `56px` rounded-square icons with `12px` labels beneath, a bottom dock, and sheets that rise over a scrim. Sheets use `--sheet-scrim`, a `color-mix` of the current background at 40%, so one definition frosts correctly in both themes.

**Rhythm.** Spacing follows Tailwind's 4px base. Card interiors sit at `24px` (`p-6`), form stacks at `16px` (`space-y-4`), dock gaps at `16px`. Dock items are `40px`, app icons `56px`, the dock bar `64px` tall.

**Density.** Deliberately compact — this is chrome imitating an operating system, where information density is a signal of competence. Resist the instinct to open the spacing up to marketing-page proportions.

## Elevation & Depth

This system is **all glass, minimal neomorphism** — roughly 90/10 by the implementation's own account. Depth comes from three stacked cues: backdrop blur, translucent fill, and a diffuse resting shadow. It does **not** come from drawn lines.

The critical asymmetry is between themes. In dark mode, a panel separates from its background by fill contrast alone, so a soft bright hairline plus a depth shadow is enough. In light mode there is no fill contrast — white glass on a white page — so a lone hairline reads as an ugly hard outline. Light mode therefore leans on a diffuse resting shadow to do the separating, and keeps its border down to `rgba(0,0,0,0.06)`.

### Shadow Vocabulary
- **Card rest** (`0 6px 24px rgba(0,0,0,0.09), 0 1px 2px rgba(0,0,0,0.04)`): The default floating state for glass cards. Dark mode deepens to `0.35` / `0.2` alpha.
- **Card hover** (`0 10px 30px rgba(100,181,246,0.22), 0 0 0 1px rgba(100,181,246,0.25)`): Lifts and tints toward Glacier Blue, with the border shifting to transparent so the accent ring replaces it.
- **Window** (`0 8px 32px rgba(0,0,0,0.12), 0 0 60px rgba(100,181,246,0.08)`): Depth plus a wide, very faint accent bloom that ties the panel to the fluid field behind it.
- **Dock** (`0 8px 24px rgba(0,0,0,0.15)`) and **dock item** (`0 4px 12px rgba(0,0,0,0.08)`): Progressive; the bar floats, its items float within it.
- **Dock item hover** (`0 4px 16px rgba(100,181,246,0.25), 0 0 20px rgba(100,181,246,0.15)`): Double-layered — a tight lift plus an ambient glow.
- **Accent glow** (`0 0 20px rgba(100,181,246,0.2)`, hover `0 0 30px rgba(100,181,246,0.3)`): Standalone emphasis, no offset — pure bloom.

### Named Rules

**The Depth Never Draws A Line Rule.** Separation comes from blur, fill, and diffuse shadow. A hard 1px outline is never the primary separator. Hairlines exist only to support a shadow, never to replace one — which is why every border in this system is an alpha value (`rgba(0,0,0,0.05)`, `rgba(255,255,255,0.12)`) and never a solid grey.

**The House Blur Rule.** Chrome blurs at `blur(20px) saturate(180%)`; secondary and nested surfaces (tooltips, small overlays) drop to `blur(15px) saturate(150%)`. Two levels, no improvising a third.

**The Glow Belongs To The Accent Rule.** Coloured shadows are always Glacier Blue at low alpha. A shadow tinted any other hue does not exist in this system.

## Shapes

Soft, generous, and consistently rounded — nothing in this system has a sharp corner.

The radius scale runs `6px / 8px / 10px / 14px` (`sm` / `md` / `lg` / `xl`, derived from a `--radius` base of `0.625rem`), with two fixed poles above it: **`16px` for panels** and **fully round for pills**.

- **`16px` (panel)** is the signature: windows, glass cards, dock bar, dock items, mobile app icons, and header buttons all share it. This single radius appearing at `40px`, `56px`, and full-window scale is what makes the desktop and mobile shells feel like one machine.
- **`14px` (xl)** is the form radius: inputs, textareas, small status panels.
- **Fully round** carries anything that reads as a control or a token: the assistant pill, submit buttons, status badges, tooltips, traffic lights, and the circular hover targets in the dock.
- **`6–10px`** are the shadcn inheritance — stock buttons and menu surfaces.

Borders are always translucent, never solid. Overflow is clipped at the panel radius (`overflow-hidden` on windows) so blurred content never bleeds past a corner.

## Components

### Buttons
- **Shape:** Fully round for primary actions (`9999px`); `8px` for inherited shadcn buttons.
- **Primary:** Glacier Blue Deep fill with white text, `12px 24px` padding, semibold at body size, carrying a soft accent shadow (`0 2px 12px` of `--accent` at 40%).
- **Hover / Focus:** `brightness(110%)` on hover — the fill brightens rather than changing hue. Focus shows a 3px ring at `--ring` (Glacier Blue) at 50% alpha.
- **Disabled:** 50% opacity, pointer events off.
- **Ghost / Secondary:** Transparent at rest, picking up an accent-tinted background on hover.

### Cards / Containers
- **Corner Style:** `16px` (panel radius).
- **Background:** Translucent white at 20–25% in light, charcoal at 60% in dark, always over backdrop blur.
- **Shadow Strategy:** Card rest by default; `glass-card-hover` swaps to the accent-tinted hover shadow and drops the border to transparent, so the ring becomes the edge.
- **Border:** `rgba(0,0,0,0.06)` light, `rgba(255,255,255,0.12)` dark.
- **Internal Padding:** `24px`.
- **Transition:** `box-shadow`, `border-color`, and `transform` at `0.25s ease`.

### Inputs / Fields
- **Style:** Field Mist fill in light mode (a genuine surface, not a bare outline), a faint white lift in dark; `14px` radius, `10px 16px` padding, body size.
- **Focus:** Border shifts to `--accent-text`. No glow, no ring — the field is quiet, and the border change is the whole signal.
- **Placeholder:** Tertiary text colour.
- **Disabled:** 60% opacity.

### Navigation
- **Menu bar:** Fixed top, house blur, with a language control at one edge and settings at the other, mirroring correctly under RTL. `16px` radius on its buttons.
- **Dock (desktop):** `64px` tall, `16px` radius, house blur, translucent fill, with a gradient divider (`linear-gradient` fading through 15–20% alpha at the ends) separating navigation from external links. Items magnify and glow on hover, with a label tooltip rising `32px` above.
- **Dock / springboard (mobile):** Same material at touch scale — `56px` app icons with `12px` labels carrying `--label-shadow`, a theme-aware text shadow that keeps white labels legible over a busy wallpaper.

### Windows (signature component)
The defining element. A `16px` translucent panel at house blur, positioned within the chrome insets, entering on a `0.3s` spring-like curve (`cubic-bezier(0.16, 1, 0.3, 1)`) from `scale 0.95` and `y +20`.

Its title bar sits at slightly higher opacity than its body (`--window-titlebar-bg` above `--window-content-bg`), giving the panel internal stratification. **macOS traffic lights** (`12px` circles in red/amber/green) sit at the leading edge on desktop, revealing their glyphs only on group hover; below `md` they collapse to a single `28px` touch-friendly close button, because three 12px targets are not usable on a phone. The title is centred absolutely, independent of the controls.

### Assistant Pill (signature component)
A `44px` fully-round glass capsule using dock tokens rather than window tokens, so it reads as chrome rather than content. A Glacier Blue sparkle icon leads, followed by a rotating set of prompts that cross-fade in place inside a fixed-height clipped container — so the pill never reflows as the text changes, in any of the twelve languages.

## Do's and Don'ts

### Do:
- **Do** write tokens, never hex. `var(--accent-text)` and `var(--accent-solid)` exist precisely because the correct value differs between themes; hardcoding either breaks one of them.
- **Do** use `blur(20px) saturate(180%)` for chrome and `blur(15px) saturate(150%)` for nested overlays. Those are the only two blur levels in the system.
- **Do** reach for `16px` radius on any new panel, card, icon tile, or dock element. It is the signature that unifies the desktop and mobile shells.
- **Do** give every new surface a diffuse resting shadow before considering a border.
- **Do** keep new components at body `0.875rem` / label `0.75rem`. This is OS chrome, not a marketing page.
- **Do** provide a non-gestural equivalent for every drag, swipe, or hover-only affordance — keyboard, button, or command palette. The OS metaphor's biggest accessibility risk is interaction that only exists as a gesture.
- **Do** honour `prefers-reduced-motion` and let `deviceCapability.ts` step the fluid background down. The static gradient fallback uses the identical three stops, so the atmosphere survives the downgrade.
- **Do** test every layout in Arabic and Japanese before calling it finished.

### Don't:
- **Don't** introduce a second chromatic colour. If something needs to stand out, use contrast, scale, or space — not a new hue.
- **Don't** separate surfaces with a hard, solid border. Every border in this system is an alpha value supporting a shadow, never a drawn line doing the job alone.
- **Don't** put white text on `--accent`, or `--accent` text on a light background. Use `--accent-solid` and `--accent-text` respectively.
- **Don't** branch on `theme === 'dark'` in a component. The one licensed exception is `Desktop.tsx`, where the fluid simulation needs literal colour values as JS props for a WebGL canvas; everything reachable from CSS uses tokens.
- **Don't** use `--text-tertiary` for body copy. It is a hint colour and fails contrast in light mode.
- **Don't** use Stanley for section headings. It is an identity mark, used once per screen at most.
- **Don't** tint a shadow any colour but Glacier Blue.
- **Don't** drift toward the **generic AI-SaaS landing page** — purple-blue gradient heroes, bento feature grids, gradient text, or "trusted by" logo walls. This is a confirmed anti-reference, and the portfolio has no logos or testimonials to put in such a wall.
- **Don't** drift toward **flat corporate Material** — opaque hard-edged cards, solid fills, and heavy drop shadows in place of translucency.
- **Don't** drift toward **maximalist neobrutalism** — thick black borders, hard offset shadows, clashing saturated colour.
- **Don't** drift toward **skeuomorphic OS pastiche** — fake wood, brushed metal, or glossy Aqua buttons. This system quotes the *structure* of an operating system (traffic lights, dock, springboard), never its dated textures.
