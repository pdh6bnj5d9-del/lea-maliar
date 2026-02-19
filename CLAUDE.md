# CLAUDE.md — AI Assistant Guide for lea-maliar

## Project Overview

This is a personal interactive portfolio/CV website for Léa Maliar, a marketing digital, data, and business development professional. The site is a single-page application built with Next.js 15 and React 19, entirely in French, featuring a carousel-based experience timeline, an interactive mini-game, and contact CTAs.

## Repository Structure

```
lea-maliar/
├── public/
│   ├── CV-Lea-Maliar.pdf       # Downloadable resume
│   └── photo-lea.png           # Profile photo
├── src/
│   └── app/
│       ├── layout.js           # Root layout (fonts, metadata, HTML lang)
│       ├── page.js             # Entire site — single client component
│       └── globals.css         # All styles (design system + sections)
├── next.config.js              # Minimal Next.js config
└── package.json                # Dependencies and scripts
```

There are no subdirectories beyond `src/app/`. All logic, markup, and state management live in `page.js`. All styles live in `globals.css`.

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.1.0 (App Router) |
| UI Library | React 19.0.0 |
| Language | JavaScript/JSX (no TypeScript) |
| Styling | Plain CSS via `globals.css` (no CSS modules, no Tailwind) |
| Fonts | Google Fonts: Lora, Playfair Display + custom Perandory font |
| Rendering | Client-side (`'use client'` directive on `page.js`) |
| No backend | No API routes, no database, no auth |

## Development Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build at http://localhost:3000
```

There are no test scripts, no linter, and no formatter configured. The project has minimal tooling by design.

## Key Conventions

### File organization
- **Do not create new files or components** unless strictly necessary. This is an intentionally flat, single-file frontend — all content goes into `page.js` and all styles go into `globals.css`.
- If a new page or route is needed, create `src/app/<route>/page.js`.

### JavaScript / JSX
- All components are plain JavaScript (`.js`), not TypeScript (`.ts`/`.tsx`).
- `page.js` uses the `'use client'` directive — it is a React Client Component.
- State is managed with React hooks (`useState`, `useEffect`, `useRef`). No external state library.
- No prop-drilling abstractions — props and state stay local to `page.js`.

### Styling
- All CSS lives in `globals.css`. Do not use inline styles or CSS modules.
- Use CSS custom properties (variables) defined in `:root` for all colors and fonts:

```css
--bg-dark: #1a1c25        /* Page background */
--bg-card: #22242f        /* Card / section background */
--accent: #ffe5ec         /* Primary rose-pink accent */
--accent-hover: #ffd6e0   /* Accent on hover */
--text-white: #ffffff
--text-muted: #a0a3b1
--text-light: #d0d2da
--font-heading: Perandory, 'Playfair Display', serif
--font-body: Lora, serif
```

- Maintain the dark navy + rose-pink aesthetic — do not introduce new base colors without updating the variables.
- Use `clamp()` for fluid typography rather than fixed `px` sizes.
- Responsive breakpoints are handled with `@media` queries; the mobile hamburger menu activates around 768px.

### Content language
- All user-facing text is in **French**. Keep it French when editing or adding content.
- Professional tone — this is a formal CV/portfolio, not a casual site.

### Contact & personal data
- Email: `lea.maliar.pro@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/léa-m-86342b21a`
- CV file: `/public/CV-Lea-Maliar.pdf` (served at `/CV-Lea-Maliar.pdf`)
- These values are hardcoded directly in `page.js` and `globals.css`. Update them in both places if changed.

## Site Sections (in render order)

1. **Navbar** — fixed, glass-morphism, collapses to hamburger on mobile
2. **Marquee banner** — scrolling animated strip with contact info
3. **Hero** — large headline, tagline, CTA button
4. **About** — rose background, profile photo + biography text, "Les Avis" link
5. **Experiences carousel** — 3 professional roles (GAPIANNE, FAGUO, Comptoir Doré), navigated by arrows and dots
6. **Formation carousel** — 4 educational entries (MBA, Masters, Bachelor, University Diploma), navigated by arrows and dots
7. **Hard Skills** — grid of skill tags
8. **Soft Skills** — 8 soft skills with emoji icons
9. **Interactive game** — canvas-based "Lipstick Catcher" mini-game (see below)
10. **Contact** — email and LinkedIn links + CV download
11. **Footer**

## Interactive Game — Lipstick Catcher

Located in `page.js`, the game uses an HTML `<canvas>` element:

- **Objective:** Catch 3 lipstick emojis (💄) with a basket (🧺) before 30 seconds expire.
- **Controls:** Arrow keys (desktop) or touch drag (mobile) to move the basket.
- **Win condition:** Triggers a `mailto:` with a pre-filled recruitment email template to `lea.maliar.pro@gmail.com`.
- **State:** Managed with `useState` / `useRef` inside the same `page.js` component. Game loop runs via `requestAnimationFrame`.

When editing the game, be careful not to break the canvas `ref` binding or the event listener cleanup in `useEffect`.

## Carousel Pattern

Both the Experiences and Formation carousels follow the same pattern in `page.js`:

```js
const [currentExperience, setCurrentExperience] = useState(0);
// Navigation via prev/next buttons and dot indicators
// Items defined as inline arrays of objects
```

To add a new experience or formation entry, append an object to the relevant array — do not restructure the component.

## Public Assets

Files in `/public/` are served statically at the root URL:
- `/CV-Lea-Maliar.pdf` — referenced in the contact section download link
- `/photo-lea.png` — referenced in the About section via Next.js `<Image>` or `<img>`

When replacing assets, keep the same filenames to avoid broken references in `page.js`.

## Git Workflow

- **Default development branch:** `master`
- **Feature/AI branches:** named `claude/<descriptor>` (e.g., `claude/claude-md-mlti9568fnmbhouk-Re5Rg`)
- Remote: `origin`
- Commit messages are concise, descriptive, written in English (historically also some French).
- There are no pre-commit hooks, CI pipelines, or automated tests.

## What to Avoid

- Do not add TypeScript, Tailwind, ESLint, or other tooling unless explicitly requested — the project is intentionally minimal.
- Do not split `page.js` into multiple components without explicit instruction.
- Do not create new CSS files — all styles belong in `globals.css`.
- Do not hardcode colors or font families outside the CSS variables.
- Do not add a backend, API routes, or a database — this is a static frontend.
- Do not change the language of UI text from French to English.
