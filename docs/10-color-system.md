# Color System — Deep Teal & Molten Copper (Option B)

## Recommendation

**Option B** over A and C:

- Escapes generic navy/blue/orange engineering templates
- Materials narrative (patina / molten / brass) pairs with Living Blueprint
- Warm Bone surfaces feel premium without cream-serif cliché
- Chartreuse (A) is distinctive but risks “startup tech” for this client
- Ion+Amber (C) is safer but still closer to corporate-default territory

## 60 / 30 / 10

| Role | Token | Share |
|---|---|---|
| Dominant | Bone `#F3F1EC` (+ surface-warm) | ~60% |
| Secondary | Abyss / Pine dark sections | ~30% |
| Accent | Molten `#E0632A` (+ Brass detail lines) | ≤10% |

## Semantic tokens

| Token | Value | Use |
|---|---|---|
| `bg` / `page` | Bone `#F3F1EC` | Page background |
| `surface` / `muted` | `#EAE7E1` | Alternating bands |
| `inverse` | Abyss `#06231F` | Dark sections / footer |
| `dark` | Pine `#0F3D35` | Elevated dark panels |
| `text` / `primary` | Abyss | Headings |
| `text-muted` / `secondary` | `#3F5650` | Body (AA on Bone) |
| `border` | `#D6D1C8` | Dividers |
| `accent` / `action` | Molten `#E0632A` | CTAs |
| `accent-hover` | `#E8733A` | CTA hover |
| `on-action` | Abyss | CTA label (AA on Molten) |
| `focus` | Abyss (light) / `#5ED0BC` (dark contexts) | Focus ring |
| `brass` | `#C9A45C` | Blueprint lines / eyebrows on dark |
| `verdigris` | `#2E7D6E` | Links / secondary metal |

Gradients: `.hero-mesh`, `.metallic-brass`, `.metallic-molten`, `.blueprint-grid`.

## Contrast audit (WCAG)

Target: **4.5:1** body · **3:1** large text / UI.

| Pairing | Ratio | Body 4.5 | Large 3.0 | Status |
|---|---:|---|---|---|
| Abyss on Bone | 14.67 | PASS | PASS | Primary text |
| Pine on Bone | 10.70 | PASS | PASS | Alt dark text |
| Ink-muted `#3F5650` on Bone | 7.00 | PASS | PASS | Body / muted |
| Bone on Abyss | 14.67 | PASS | PASS | Inverse text |
| Bone on Pine | 12.07 | PASS | PASS | Inverse on surface |
| Abyss on Molten | 4.72 | PASS | PASS | **CTA label** |
| Abyss on Molten-hover | 5.48 | PASS | PASS | CTA hover label |
| White on Verdigris | 4.91 | PASS | PASS | Link on filled chip |
| Brass on Abyss | 7.06 | PASS | PASS | Blueprint callouts |
| Brass on Pine | 5.14 | PASS | PASS | Detail on dark surface |
| Focus `#5ED0BC` on Abyss | 8.85 | PASS | PASS | Dark focus accent |
| Verdigris on Bone | 4.35 | FAIL | PASS | **Large / icons only** |
| Molten on Bone | 3.11 | FAIL | PASS | **Large / decoration only** |
| Brass on Bone | 2.08 | FAIL | FAIL | Dark sections only |
| White on Molten | 3.51 | FAIL | PASS | Do not use for CTA body |

### Rules from audit
1. CTA text is always **Abyss on Molten** (never white on Molten).
2. Verdigris is for links/icons; body copy uses ink-muted or Abyss.
3. Brass is for dark-section detail lines, not body on Bone.

## Light vs dark section variants

| | Light | Dark |
|---|---|---|
| Background | Bone / surface-warm | Abyss / Pine + blueprint grid |
| Text | Abyss / ink-muted | Bone / Brass eyebrows |
| Accent | Molten CTA | Molten CTA + Brass lines |
| Border | `#D6D1C8` | Brass/Verdigris at low opacity |

## Demo surfaces
- Hero (`HeroBlueprint`) — abyss mesh, brass/verdigris/molten SVG + WebGL
- Process (`ProcessBlueprint`) — molten path draw + brass markers
- Full swatches — `/design-system`
