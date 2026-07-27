# Phase 5 — Design System in Code

**Status:** Complete — awaiting approval before Phase 6  
**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide · RHF · Zod · React Query · React Router

## What shipped

### Tokens (`src/index.css`)
- Color system (navy / blue / copper / charcoal / grey + semantic aliases)
- Typography (Space Grotesk + Manrope, hero→body scales)
- Spacing, radius, shadows, motion easing
- Utilities: `container-ae`, blueprint grid, glass surfaces
- Base focus rings + `prefers-reduced-motion`

### Primitives (`src/components/ui`)
Button, ButtonLink, Link, Container, Section, Heading, Text, Badge, Card, Media, Divider, Input, Textarea, Select, Label, FieldError, FormField, Accordion, Breadcrumbs, SkipLink

### Layout (`src/components/layout`)
PageShell, SiteHeader (desktop + mobile), SiteFooter, StickyCtaBar, WhatsAppFab

### Forms
`QuoteForm` + `quoteFormSchema` (Zod) with intents and honeypot

### Routes
- `/` — temporary industrial hero (Phase 6 expands sections)
- `/design-system` — living token/component gallery
- `/contact` — working quote form UI
- Other IA routes — placeholders ready for Phase 6

## Run

```bash
npm install
npm run dev
```

Open `/design-system` to review the system.
