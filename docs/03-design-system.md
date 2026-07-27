# Phase 3 — Component Architecture & Design System

**Brand language:** Modern Industrial Luxury  
**Positioning:** Hybrid — industrial-first  
**Status:** Awaiting approval before Phase 4 (wireframes)

---

## 1. Design principles

1. **Precision over decoration** — grid, alignment, and restraint signal engineering.
2. **One job per section** — headline, support line, proof, CTA.
3. **Trust before catalog** — capability and proof outrank product grids on Home.
4. **Quote is the product** — every major surface offers a clear enquiry path.
5. **Quiet motion** — short fades/slides; no carousel overload.
6. **WCAG AA by default** — contrast, focus, semantics are system-level, not afterthoughts.

---

## 2. Brand tokens

### 2.1 Color

Modernize brand DNA: Deep Navy · Industrial Blue · Orange/Copper · Light Grey/White · Charcoal.

| Token | Hex | Role | AA notes |
|---|---|---|---|
| `--color-navy-950` | `#0B1F33` | Primary brand / dark surfaces | White text ✓ |
| `--color-navy-900` | `#122A45` | Dark sections, footer | White text ✓ |
| `--color-navy-800` | `#1A3654` | Hover on dark / cards on charcoal | White text ✓ |
| `--color-blue-600` | `#1F6FEB` | Secondary / links on light | On white ✓ |
| `--color-blue-500` | `#2B7DE9` | Interactive accent (light UI) | Prefer navy for body links if large blocks |
| `--color-copper-600` | `#C45C26` | Primary accent / CTA | White text on copper ✓ |
| `--color-copper-500` | `#D96B32` | Hover accent | White text ✓ |
| `--color-copper-100` | `#F8E8DE` | Soft accent wash | Navy text ✓ |
| `--color-charcoal-900` | `#14181F` | Deep charcoal sections | White / grey-100 text ✓ |
| `--color-charcoal-800` | `#1E2430` | Elevated dark panels | White text ✓ |
| `--color-grey-50` | `#F4F6F8` | Page background alternate | Navy text ✓ |
| `--color-grey-100` | `#E8ECF1` | Borders / dividers / chips | — |
| `--color-grey-300` | `#C5CDD8` | Subtle borders | — |
| `--color-grey-500` | `#6B7785` | Secondary body | On white ✓ (≥4.5:1) |
| `--color-grey-700` | `#3D4754` | Primary body on light | ✓ |
| `--color-white` | `#FFFFFF` | Surfaces | Navy/copper text ✓ |
| `--color-success` | `#1F7A4C` | Form success | White text ✓ |
| `--color-error` | `#B42318` | Form error | White text ✓ |
| `--color-focus` | `#1F6FEB` | Focus ring | 2px ring + offset |

**Pairing rules**
- Light bg → text `grey-700` / headings `navy-950`
- Dark bg → text `white` / muted `grey-100` at ≥70% opacity only if contrast holds
- CTAs: `copper-600` fill + white label; ghost CTA: navy border + navy text
- Never use rose/pink from legacy theme
- Decorative gradients only: `navy-950 → navy-800` or subtle blueprint blue washes — not purple, not cream-serif clichés

**Semantic aliases**

```
--bg-page: white
--bg-muted: grey-50
--bg-inverse: navy-950
--bg-dark: charcoal-900
--text-primary: navy-950 | grey-700 (body)
--text-inverse: white
--text-muted: grey-500
--border-subtle: grey-100
--action-primary: copper-600
--action-secondary: navy-950
--link: blue-600
```

### 2.2 Typography

**Fonts (Google):**  
- **Display / Headings:** Space Grotesk  
- **Body / UI:** Manrope  

(Plus Jakarta Sans reserved as alternate body if Manrope feels too soft in implementation.)

| Token | Size | Line | Weight | Use |
|---|---|---|---|---|
| `--text-hero` | clamp(2.5rem, 5vw, 4.5rem) → **40–72px** | 1.05–1.1 | 600–700 | Home / page heroes |
| `--text-h1` | clamp(2.25rem, 4vw, 3rem) → **36–48px** | 1.15 | 600 | Page titles |
| `--text-h2` | clamp(1.75rem, 3vw, 2.75rem) → **28–44px** | 1.2 | 600 | Section titles (target 40–48) |
| `--text-h3` | 1.5rem–1.75rem → **24–28px** | 1.25 | 600 | Cards / sub-blocks |
| `--text-subhead` | 1.25rem–1.5rem → **20–24px** | 1.4 | 500 | Section support |
| `--text-body-lg` | 1.125rem → **18px** | 1.65 | 400 | Lead paragraphs |
| `--text-body` | 1rem–1.125rem → **16–18px** | 1.65 | 400 | Default body |
| `--text-sm` | 0.875rem → **14px** | 1.5 | 500 | Meta, labels |
| `--text-xs` | 0.75rem → **12px** | 1.4 | 500 | Eyebrows, legal |

**Rules:** Max ~3 font weights in UI (400 / 500 / 600–700). No all-caps paragraphs. Eyebrows allowed in small tracking (+0.06em) for engineering feel.

### 2.3 Spacing scale

4px base unit.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |
| `--space-10` | 128px |

**Section rhythm:**  
- Mobile section Y: `--space-8` (64)  
- Desktop section Y: `--space-9`–`--space-10` (96–128)  
- Component internal gap: `--space-4`–`--space-6`

### 2.4 Layout

| Token | Value |
|---|---|
| `--container` | 1200px |
| `--container-wide` | 1400px |
| `--container-narrow` | 720px (prose / forms) |
| `--gutter` | 16px → 24px → 32px |
| `--grid-cols` | 12 |
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-full` | 9999px (pills sparingly — prefer md for industrial) |
| `--shadow-sm` | 0 1px 2px rgba(11,31,51,0.06) |
| `--shadow-md` | 0 8px 24px rgba(11,31,51,0.08) |
| `--blur-glass` | 12px |
| `--header-h` | 72px desktop / 64px mobile |
| `--z-header` | 50 |
| `--z-overlay` | 60 |
| `--z-modal` | 70 |
| `--z-toast` | 80 |

**Grid:** 12-column. Prefer asymmetric 7/5 or 8/4 for editorial industrial layouts; avoid equal 3-card “template” rows unless content truly equal.

### 2.5 Motion

| Token | Value |
|---|---|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--duration-fast` | 150ms |
| `--duration-base` | 300ms |
| `--duration-slow` | 500ms |
| `--motion-distance` | 16–24px |

Framer Motion presets: `fadeUp`, `fadeIn`, `staggerChildren`. Respect `prefers-reduced-motion`.

### 2.6 Elevation & surfaces

| Surface | Treatment |
|---|---|
| Default | Flat white / grey-50 |
| Dark band | Navy or charcoal + subtle blueprint grid SVG |
| Glass (nav on hero) | `rgba(255,255,255,0.72)` + blur — light; or `rgba(11,31,51,0.55)` on dark hero |
| Card (interaction only) | Border grey-100, radius-md, shadow-sm; no heavy shadows |

---

## 3. Component architecture

### 3.1 Folder structure (planned)

```
src/
├── app/ or pages/          # routes
├── components/
│   ├── ui/                 # primitives
│   ├── layout/             # shell
│   ├── sections/           # page sections
│   ├── forms/              # enquiry / quote
│   └── seo/                # Helmet/meta, schema, breadcrumbs
├── lib/                    # utils, schemas (zod), query clients
├── content/                # typed content modules
├── styles/                 # tokens.css / tailwind config
├── hooks/
└── assets/
    ├── icons/
    └── images/
```

### 3.2 Primitive UI (`components/ui`)

| Component | Responsibility |
|---|---|
| `Button` | primary / secondary / ghost / link; sizes sm/md/lg; loading; icon slot |
| `Link` | Router + external; underline rules |
| `Container` | max-width + gutters |
| `Section` | section spacing, optional `tone` (light/muted/dark/navy), `id` |
| `Heading` | h1–h3 with display scale; optional eyebrow |
| `Text` | body / muted / lead |
| `Badge` | status / sector tags |
| `Icon` | Lucide wrapper; consistent size (20/24) |
| `Card` | interactive container only |
| `Media` | responsive image/picture; lazy; aspect ratios |
| `Avatar` | testimonials |
| `Divider` | hairline with optional label |
| `Input`, `Textarea`, `Select`, `Checkbox`, `Label`, `FieldError`, `FormField` | accessible form primitives |
| `Modal` / `Drawer` | mobile nav, lightboxes |
| `Tabs` | product filters if needed |
| `Accordion` | FAQ |
| `Breadcrumbs` | SEO + wayfinding |
| `SkipLink` | a11y |
| `FocusRing` | shared outline utility |

### 3.3 Layout (`components/layout`)

| Component | Responsibility |
|---|---|
| `SiteHeader` | logo, nav, Quote CTA, mobile drawer |
| `SiteFooter` | IA columns, contact, legal, social |
| `MobileNav` | full-screen or drawer; thumb-friendly |
| `StickyCtaBar` | mobile: Call + Quote |
| `WhatsAppFab` | accessible floating action |
| `PageShell` | header + main + footer + skip link |
| `Prose` | long-form legal/about |

### 3.4 Section components (`components/sections`)

Map 1:1 to Phase 2 IA (reusable across pages).

| Component | Used on |
|---|---|
| `HeroIndustrial` | Home, key landings |
| `TrustBar` | Home, About |
| `AboutTeaser` | Home |
| `WhyUs` | Home, About |
| `CapabilitiesGrid` | Home, Capabilities |
| `CapabilityDetail` | Capability children |
| `IndustriesGrid` | Home, Industries |
| `ProjectsGrid` / `ProjectCard` / `ProjectDetail` | Home, Projects |
| `InfrastructureSnapshot` | Home, Quality |
| `QualitySystem` | Home, Quality |
| `ClientsLogoWall` | Home, About |
| `Testimonials` | Home |
| `ProcessSteps` | Home, Capabilities |
| `ContactBand` | Home, deep pages |
| `QuoteFormSection` | Contact |
| `MapSection` | Contact |
| `FaqSection` | Contact |
| `CtaBand` | Universal end-of-page |
| `ProductCategoryHub` | Products |
| `ProductGrid` / `ProductCard` / `ProductDetail` | Product routes |
| `CustomEngineeringBand` | Products, Capabilities |

### 3.5 Forms (`components/forms`)

| Component | Notes |
|---|---|
| `QuoteForm` | React Hook Form + Zod; intents; category; optional file |
| `NewsletterForm` | optional; only if value clear |
| `FormSuccess` / `FormError` | inline states |

**Zod schema (conceptual):**  
`intent`, `name`, `email`, `phone`, `company?`, `category?`, `message`, `honeypot`

### 3.6 SEO (`components/seo`)

| Component | Notes |
|---|---|
| `Seo` | title, description, canonical, OG, Twitter |
| `JsonLd` | Organization, LocalBusiness, BreadcrumbList, etc. |
| `Breadcrumbs` | visual + schema |

---

## 4. Component API conventions

```tsx
// Example shape — not implementation yet
type SectionTone = 'light' | 'muted' | 'navy' | 'charcoal';

type HeroIndustrialProps = {
  eyebrow?: string;
  title: string;          // brand-forward
  description: string;    // one short supporting sentence
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  media: { src: string; alt: string }; // full-bleed
  tone?: 'navy' | 'charcoal';
};
```

**Rules**
- Props over nested magic; content from `content/` modules
- `alt` required for meaningful images; decorative images `alt=""`
- Interactive components keyboard-complete
- No card chrome unless interaction/understanding requires it
- Section components own their internal CTA; pages compose sections only

---

## 5. Tailwind mapping strategy

- Tailwind theme extends CSS variables from `styles/tokens.css`
- Prefer semantic classes: `bg-page`, `text-primary`, `bg-action`, `font-display`
- Avoid one-off hex in JSX
- Dark sections via `tone` prop → predefined class maps

```
font-display → Space Grotesk
font-sans    → Manrope
colors.navy / blue / copper / charcoal / grey → tokens
spacing scale aligned to --space-*
```

---

## 6. Icon & imagery system

- **Icons:** Lucide only; 1.5–2px stroke; navy/copper on light; white on dark
- **Imagery:** Real product/plant/metalwork preferred; blueprint grid + gradients as atmosphere only — not the main visual idea
- **Aspect ratios:** Hero 16/9 or full-viewport crop; product 4/3; project 3/2; logo wall monochrome optional
- **Formats:** AVIF/WebP + JPEG fallback; `srcset`; lazy below fold

---

## 7. Accessibility system requirements

- Skip link → `#main`
- Landmark roles: header / nav / main / footer
- Focus visible: 2px `blue-600` ring + 2px offset
- Touch targets ≥ 44px
- Form errors linked via `aria-describedby`
- Reduced motion media query honored in Motion configs
- Contrast checked for copper/navy pairings in Story-like checklist (Phase 7)

---

## 8. State & data layer

| Concern | Approach |
|---|---|
| Static marketing content | Typed TS modules in `content/` |
| Quote form submit | API route / form endpoint (Phase 6); optimistic UI |
| React Query | Use for post-submit status or future brochure/asset fetches — not required for static pages |
| Routing | React Router or framework file routes (chosen in Phase 5 scaffold) |

---

## 9. Page → section composition map (Home example)

```
PageShell
  SiteHeader
  main#main
    HeroIndustrial
    TrustBar
    AboutTeaser
    WhyUs
    CapabilitiesGrid
    IndustriesGrid
    ProjectsGrid (featured)
    InfrastructureSnapshot
    QualitySystem (compact)
    ClientsLogoWall
    Testimonials
    ProcessSteps
    ContactBand / CtaBand
  SiteFooter
  StickyCtaBar (mobile)
  WhatsAppFab
```

Deep pages reuse the same section primitives with different `content` props.

---

## 10. Out of scope for the design system

- E-commerce cart / payment UI (legacy payment strip removed)
- Blog / news (unless requested later)
- Multi-language (structure allows later `lang` routing)

---

## Phase 3 status

**Deliverable complete.** Tokens, principles, folder architecture, and component inventory are defined for implementation in Phases 5–6.

**Next:** Phase 4 — low-fi wireframe structure for each page.

Awaiting approval to continue.
