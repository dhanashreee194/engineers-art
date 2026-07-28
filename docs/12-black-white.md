# Black & White theme

Branch: `theme/black-white`  
`main` retains **Maroon & Steel**.

Monochrome remap of the same semantic tokens (layout/components unchanged).

## Palette

| Token (compat name) | Hex | Role |
|---|---|---|
| `ink` / `maroon` / `action` | `#111111` | Body, primary brand, CTA fill |
| `wine` / `action-hover` | `#000000` | Dark sections, CTA hover, footer |
| `steel` / `secondary` | `#5C5C5C` | Muted text, secondary CTA, icons |
| `cool-grey` / `border` | `#D4D4D4` | Borders, blueprint lines |
| `snow` / `page` | `#F5F5F5` | Page background |
| `white` / `surface` | `#FFFFFF` | Cards |
| `on-maroon` / `on-action` | `#FFFFFF` | Labels/icons on black fills |

## Usage

- Primary CTA: black fill + white label; hover → pure black fill, white label kept.
- Secondary CTA: steel outline on snow; hover fills steel with white label.
- Dark hero/sections: ink/black + white/`on-maroon` text; cool-grey muted.
- Blueprint grid: cool-grey on snow; steel lines on black.

## Contrast (WCAG AA)

| Pairing | Ratio | Body AA |
|---|---:|---|
| ink on snow | ~15.4:1 | PASS |
| steel on snow | ~5.0:1 | PASS |
| white on ink/maroon | ~15.9:1 | PASS |
| white on wine | ~21:1 | PASS |
| cool-grey on ink | ~11.5:1 | PASS |
| cool-grey on snow | ~1.4:1 | FAIL text — borders only |
