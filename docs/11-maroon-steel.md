# Maroon & Steel — FINAL color system

Replaces all prior palettes (navy/copper, Deep Teal & Molten Copper).

## Primitives (theme tokens only — never raw hex in components)

| Token | Hex | Role |
|---|---|---|
| `ink` | `#1C2023` | Body text, deepest UI |
| `wine` | `#5C1C27` | Dark sections, hover/active, footer |
| `maroon` | `#822C38` | PRIMARY — brand, headers, CTAs |
| `steel` | `#5E7079` | Secondary — links, icons, muted labels, secondary buttons |
| `cool-grey` | `#C6CBCE` | Borders, dividers, subtle fills, blueprint lines |
| `snow` | `#F4F3F1` | Primary light background |
| `white` | `#FCFBFA` | Cards (warm — not `#FFF`) |

Source of truth: `src/index.css` `@theme` + `src/styles/tokens.ts` (WebGL/canvas).

## Usage

- **60/30/10:** snow/white dominant → steel + neutrals → maroon ~10% brand moments.
- **Primary CTA:** `bg-action` (maroon) + `text-on-action` (white); hover `bg-action-hover` (wine).
- **Secondary CTA:** steel outline; fill steel + white text on hover.
- **Dark sections:** wine/ink backgrounds, snow text, maroon or cool-grey accents.
- **No** pure `#000` / `#FFF`.
- **Blueprint grid:** cool-grey lines on snow; steel lines on wine (`blueprint-grid` / `blueprint-grid-dark`).

## Approval scope

Hero (`HeroBlueprint`) + Process (`ProcessBlueprint`) only. Site-wide rollout after sign-off.

---

## Contrast audit (WCAG 2.1)

Relative luminance ratios. Targets: **4.5:1** body / UI text; **3:1** large text (≥18pt / 14pt bold).

### Approved pairings (use these)

| Foreground | Background | Ratio | Body AA (4.5:1) | Large AA (3:1) | Where used |
|---|---|---:|---|---|---|
| ink `#1C2023` | snow `#F4F3F1` | **14.79:1** | PASS | PASS | Body, headings on page |
| ink `#1C2023` | white `#FCFBFA` | **15.87:1** | PASS | PASS | Body on cards |
| steel `#5E7079` | snow `#F4F3F1` | **4.65:1** | PASS | PASS | Muted body, leads, labels |
| steel `#5E7079` | white `#FCFBFA` | **4.99:1** | PASS | PASS | Muted on cards |
| maroon `#822C38` | snow `#F4F3F1` | **8.00:1** | PASS | PASS | Eyebrows, accents on light |
| maroon `#822C38` | white `#FCFBFA` | **8.59:1** | PASS | PASS | Accents on cards |
| wine `#5C1C27` | snow `#F4F3F1` | **11.47:1** | PASS | PASS | Strong emphasis on light |
| white `#FCFBFA` | maroon `#822C38` | **8.59:1** | PASS | PASS | Primary CTA label |
| white `#FCFBFA` | wine `#5C1C27` | **12.31:1** | PASS | PASS | CTA hover, dark UI |
| snow `#F4F3F1` | ink `#1C2023` | **14.79:1** | PASS | PASS | Hero titles, dark UI |
| snow `#F4F3F1` | wine `#5C1C27` | **11.47:1** | PASS | PASS | Dark section titles |
| snow `#F4F3F1` | maroon `#822C38` | **8.00:1** | PASS | PASS | On primary fills |
| cool-grey `#C6CBCE` | ink `#1C2023` | **10.03:1** | PASS | PASS | Hero muted copy, metrics |
| cool-grey `#C6CBCE` | wine `#5C1C27` | **7.78:1** | PASS | PASS | Muted on wine |
| cool-grey `#C6CBCE` | maroon `#822C38` | **5.42:1** | PASS | PASS | Muted on maroon |
| white `#FCFBFA` | steel `#5E7079` | **4.99:1** | PASS | PASS | Secondary CTA hover label |
| snow `#F4F3F1` | steel `#5E7079` | **4.65:1** | PASS | PASS | On steel fills |
| ink `#1C2023` | cool-grey `#C6CBCE` | **10.03:1** | PASS | PASS | Text on subtle fills |
| maroon `#822C38` | cool-grey `#C6CBCE` | **5.42:1** | PASS | PASS | Accents on subtle fills |

### Non-text / decorative only (do not use as body text)

| Foreground | Background | Ratio | Verdict | Rule |
|---|---|---:|---|---|
| cool-grey `#C6CBCE` | snow `#F4F3F1` | **1.48:1** | FAIL text | Borders, dividers, blueprint lines only |
| cool-grey `#C6CBCE` | white `#FCFBFA` | **1.58:1** | FAIL text | Borders / hairlines only |

### Forbidden text pairings (do not use)

| Foreground | Background | Ratio | Verdict |
|---|---|---:|---|
| steel on wine | — | **2.47:1** | FAIL — use snow / cool-grey |
| steel on maroon | — | **1.72:1** | FAIL |
| steel on ink | — | **3.18:1** | Large only — prefer cool-grey / snow for body |
| maroon on ink | — | **1.85:1** | FAIL — accent lines/fills OK, not text |
| maroon on wine | — | **1.43:1** | FAIL — accent only |

## Primary CTA label (critical)

| Pairing | Ratio | Rule |
|---|---:|---|
| `on-maroon` `#FCFBFA` on maroon `#822C38` | **8.59:1** | PASS — **required** for all primary button labels/icons |
| `on-maroon` `#FCFBFA` on wine `#5C1C27` | **12.31:1** | PASS — hover / dark fills |
| ink or steel on maroon | FAIL | **Never** — looks disabled |

Token: `--color-on-maroon` (`text-on-maroon`). Alias: `--color-on-action`. Utility: `.btn-primary` sets cream label + maroon fill; hover keeps cream on wine.

Note: `tailwind-merge` previously stripped `text-on-*` when paired with `text-body` (font-size). `src/lib/cn.ts` classifies the type scale as `font-size` so label color is preserved.

---

## Demo surfaces (this PR)

1. **Hero** — ink base, maroon eyebrow, snow title, cool-grey lead, maroon CTA / steel secondary, WebGL from `tokens.ts`.
2. **Process** — snow page, maroon path + markers, ink titles, steel muted body, primary + secondary CTAs.
