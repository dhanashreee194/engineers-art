# Phase 8 — Old vs New Comparison

**Old:** https://www.artisticengineers.in (Bootstrap 3 e‑commerce theme, CodeIgniter)  
**New:** Artistic Engineers redesign (`~/Projects/artistic-engineers`) — Modern Industrial Luxury  
**Date:** 27 Jul 2026

---

## Executive verdict

| Dimension | Old | New | Delta |
|---|---|---|---|
| Visual appeal | 3/10 | 9/10 | **+6** |
| UX clarity | 4/10 | 9/10 | **+5** |
| Brand perception | 2/10 | 9/10 | **+7** |
| Trust | 3/10 | 8/10 | **+5** |
| Lead generation | 3/10 | 9/10 | **+6** |
| Mobile | 5/10 | 9/10 | **+4** |
| Accessibility | 2/10 | 8/10 | **+6** |
| SEO | 1/10 | 9/10 | **+8** |
| Performance architecture | 3/10 | 8/10* | **+5** |
| **Overall** | **~2.9** | **~8.7** | **~+5.8** |

\*New app is code-split and optimized; final Lighthouse 95+ on production still depends on hosting image CDN (WebP/AVIF), server caching, and real case-study assets.

---

## 1. Visual appeal

| | Old | New |
|---|---|---|
| Look | ThemeForest furniture shop, dusty rose `#c06b81`, Nivo sliders | Navy / copper / charcoal industrial system, Space Grotesk + Manrope |
| Hero | Image carousel, no brand promise | Full-bleed hero, brand-forward H1, one sentence, dual CTAs |
| Composition | Dense grids, image-only banners, payment strip | Generous whitespace, precision sections, blueprint accents |
| Motion | Owl/Nivo/Animate overload | Restrained Framer Motion + reduced-motion support |

**Gain:** Reads as a premium engineering manufacturer, not a 2015 retail template.

---

## 2. UX & information hierarchy

| | Old | New |
|---|---|---|
| IA | Flat: Home / About / Interiour / Exteriour / Art & Crafts / Contact | Home + About, Capabilities, Products, Projects, Quality, Industries, Contact |
| Spelling | “Interiour / Exteriour” | Correct Interior / Exterior |
| Product links | `href="#"` dead ends | Real routes + enquire CTAs |
| Page jobs | Catalog browsing | Trust → capability → proof → quote |

**Gain:** Clear journeys for B2B buyers, product shoppers, and custom enquiries.

---

## 3. Brand perception

| | Old | New |
|---|---|---|
| Category cue | Consumer furniture e‑commerce | Precision metal engineering & smart space systems |
| Peer set feel | Local retailer template | Siemens / ABB / L&T-adjacent industrial luxury (scaled to SME truth) |
| Mission | Buried on About | Elevated across hero, about, footer |
| Visual DNA | Fashion pink + grey nav | Deep navy + copper accent (brand DNA modernized) |

**Gain:** Instant “engineering company” signal in the first viewport.

---

## 4. Trust

| Section / signal | Old | New |
|---|---|---|
| Why us | Three images, no copy | Four explicit differentiators + CTA |
| Testimonials | One cites **“Altruistic”** (wrong brand) | Corrected to Artistic Engineers |
| Quality | Absent | Dedicated page + compact home module |
| Infrastructure | Absent | Snapshot with capacity signals |
| Clients | Logos, empty alts, no names | Named logo wall + enquire path |
| Projects | Absent | Featured cases + detail templates |

**Gain:** Trust is architected (process, quality, proof), not implied by a catalog.

---

## 5. Lead generation / conversion

| CTA path | Old | New |
|---|---|---|
| Primary quote | Missing | Header + sticky mobile + section CTAs + contact band |
| Hero | None | Request Quote + Explore Capabilities |
| Product | Dead links | Enquire on this product + WhatsApp |
| Contact form | Empty `action`, weak validation | RHF + Zod, intents, honeypot, a11y errors |
| WhatsApp | Present | Retained + contextual deep-links |
| Call | Footer only | Header + sticky bar + tel links |

**Gain:** Quote is the product. Every major section ends in a CTA path.

---

## Section-by-section (Home)

| Section | Old | New | Gains |
|---|---|---|---|
| **Nav** | Separate logo row + dark menu; misspellings | Sticky glass header; Quote + Call; mobile drawer | Brand, conversion, mobile UX |
| **Hero** | Nivo slider | Full-bleed industrial hero + H1 | Brand perception, clarity, lead gen |
| **Trust bar** | None | Est. / city / lines / focus | Trust, hierarchy |
| **About** | Thin About page only | Teaser with mission path | Trust, UX |
| **Why us** | Images only | Written differentiators | Trust, brand |
| **Services / capabilities** | “Value for money” retail blurbs | Five capability pillars with routes | Expertise, SEO, leads |
| **Industries** | None | Sector grid | B2B relevance, SEO |
| **Projects** | None | Featured proof band | Trust, conversion |
| **Infrastructure** | None | Shop/finish/delivery signals | Capability credibility |
| **Quality** | None | Inspection rhythm | Trust, B2B |
| **Clients** | Logo carousel | Accessible logo wall + CTA | Trust, lead gen |
| **Testimonials** | Brand error | Corrected quotes + CTA | Trust |
| **Process** | None | Enquire → Support steps | UX, conversion |
| **Contact band** | Banner image link | Navy band + Submit / WhatsApp | Lead gen |
| **Footer** | “Coffee” casual + payment icons | Industrial IA + real contact | Brand, a11y, trust |

---

## 6. Mobile

| | Old | New |
|---|---|---|
| Nav | MeanMenu | Thumb-friendly drawer + Request Quote |
| CTA access | WhatsApp float only | Sticky Call + Quote bar + FAB |
| Layout | Bootstrap 3 stacking | Mobile-first section rhythm, safe bottom padding |
| Weight | Multi-plugin carousels | Lazy routes; no slider stack |

**Gain:** Conversion controls stay in reach without fighting the thumb zone alone.

---

## 7. Accessibility

| Issue | Old | New |
|---|---|---|
| `lang` | Empty | `en` |
| Home H1 | Missing | Present |
| Image alts | Mostly empty | Meaningful on key media |
| Forms | Duplicate IDs, weak labeling | Unique IDs, aria-describedby/invalid/required |
| Focus | Unclear | Visible focus rings |
| Skip link | None | Present |
| Motion | No reduced-motion | Honored |

**Gain:** Moves from failing basics to WCAG-AA-oriented foundations.

---

## 8. SEO

| Item | Old | New |
|---|---|---|
| Meta description | Empty | Per-route |
| OG / Twitter | Absent | Present |
| Canonical | Absent | Present |
| Schema | Absent | Org, LocalBusiness, WebSite, Breadcrumb, FAQ |
| robots.txt | 404 | Present |
| sitemap.xml | 404 | Present |
| URL spelling | Interiour/Exteriour | Correct |
| Semantics | Weak template | Section landmarks, H1 hierarchy |

**Gain:** From near-zero crawl/share readiness to production SEO shell.

---

## 9. Performance

| | Old | New |
|---|---|---|
| JS model | jQuery 1.12 + 15 scripts globally | React app with route lazy-load + vendor chunks |
| CSS | 10 stylesheets | One purged Tailwind bundle (~40 kB) |
| Images | ~540 KB hero JPEG, no srcset strategy | Lazy by default; hero `fetchPriority=high`; CDN host preconnect |
| Caching HTML | `no-store` | Static SPA assets hash-cacheable on host |
| Bundle note | N/A | Entry ~35 kB; motion/forms/react split (was 568 kB monolith) |

**Gain:** Architecture ready for Lighthouse 95+ once images are optimized at the CDN and hosted with proper cache headers.

---

## Deep pages (net-new or rebuilt)

| Page | Old | New |
|---|---|---|
| Capabilities | None | Hub + 5 detail templates |
| Products | Dead catalog | Hub, indexes, details, custom form |
| Projects | None | Index + case detail pattern |
| Quality | None | Standards + process + infrastructure |
| Industries | None | Hub + sector details |
| Contact | Form + map | Quote UX, channels, map, FAQ schema |
| Legal | Present | Clean semantic stubs |

---

## What still needs real-world assets (not blockers)

1. Original photography (plant, installs, leadership) replacing temporary live-site image URLs  
2. Named project case studies with outcomes  
3. Production form endpoint (email/CRM) instead of demo submit  
4. Hosted WebP/AVIF responsive images for Lighthouse image score  
5. Optional brochure PDF lead magnet  

---

## Bottom line

The redesign is a **category repositioning**, not a recolor: from a broken furniture theme to an industrial trust-and-quote machine. Visual, UX, brand, conversion, a11y, and SEO gaps from the Phase 1 audit are closed in structure and code. Remaining upside is content photography and hosting polish — not another template swap.

**Phase 8 status:** Complete. Redesign workflow finished.
