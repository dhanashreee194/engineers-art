# Phase 1 — Site Audit Report

**Site:** https://www.artisticengineers.in  
**Audited:** 27 Jul 2026  
**Stack found:** PHP/CodeIgniter on LiteSpeed · Bootstrap 3 e‑commerce theme · jQuery 1.12 · Nivo Slider · Owl Carousel  
**Pages reviewed:** Home, About, Contact, Interior Products, Exterior Products, Art & Crafts  
**SEO files:** `robots.txt` / `sitemap.xml` — both missing (404)

---

## Critical strategic finding

The live site is **not** positioned as a Siemens/ABB-style industrial OEM. It presents as a **smart furniture + metal fabrication SME** (est. Feb 2018, Nashik).

| What the site says | What the redesign brief asks for |
|---|---|
| “Manufacturing & trading of Smart Furniture” | Engineering / industrial manufacturing & service |
| Consumer catalog UX (“new arrival”, “bestseller”, payment icons) | B2B trust, capability, quote-driven lead gen |
| Dusty rose/pink retail theme (`#c06b81`) | Deep navy / industrial blue / copper luxury |
| Products: shoeracks, sofas, beds, TV units | Plus real industrial signals: laser cutting, MS/GI doors, fabricated shades |

**Approved positioning for redesign (assumption confirmed with Phase 1 approval):**  
**Hybrid — industrial-first.** Position as a precision metal engineering & smart space systems manufacturer; sell capability, quality, and institutional trust first; keep furniture + exterior fabrication as product lines for retail and institutional buyers.

---

## 1. Design & brand perception

| Area | Finding | Severity |
|---|---|---|
| Template DNA | Theme leftover titles (`Printed Chiffon Dress`), fashion-blog dummy posts, payment strip — ThemeForest furniture shop, not engineering | Critical |
| Color | Accent dusty rose `#c06b81` (67 CSS hits); nav `#363636` / `#bebebe`. No navy/copper industrial system | Critical |
| Typography | Lato + Open Sans, ~12–16px body, weak hierarchy; no premium display scale | High |
| Imagery | Dated JPG sliders (~540KB each), sparse alt text, mixed quality product shots | High |
| Layout | Dense Bootstrap grids, image-only banners with no copy, little whitespace | High |
| Motion | Nivo + Owl + Animate.css — classic 2015 “slider overload” | Medium |

**Verdict:** Reads like a ~₹1–5 Cr retail furniture template, not a ₹100 Cr+ engineering brand.

---

## 2. UX & information architecture

**Current sitemap (flat, shallow):**

```
Home
About us
Interiour products   ← misspelled
Exteriour products   ← misspelled
Art & Crafts products
Contact us
Disclaimer / Privacy
```

**Issues:**
- No Services, Industries, Projects, Quality, Infrastructure, or Process pages
- Product cards link to `#` — catalog is non-navigable
- Duplicate products (Sofa-cum-bed ×2, doors/shades repeated)
- Art & Crafts page uses wrong `<title>` (“Exteriour Products”)
- About is two short text blocks; no leadership, capacity, certifications, plant story
- Home “Why choose us?” is three images with **no supporting copy**
- Blog section commented out but still ships dummy “Bootstrap / Bangladesh agency” content in HTML

---

## 3. Hierarchy & messaging

- **No homepage H1** — slider images only; brand promise never stated above the fold
- Value props are vague retail slogans (“100% value for money”, “Creative furniture designing”)
- Vision date “till 12th Oct 2040” feels arbitrary; mission line is stronger (“Expanding The Space To Perform”) and should be elevated
- Testimonial cites **“Altruistic”** — wrong brand name; trust-destroying
- Client logos have empty `alt` and no names/context

---

## 4. CTAs & conversion

| CTA | Status |
|---|---|
| Primary “Request Quote” | Missing |
| Hero CTA | None (image slider only) |
| Product → detail / enquiry | Dead `#` links |
| Contact form | Present; empty `action=""`, weak validation, duplicate `id="name"` |
| WhatsApp widget | Present (+91 87665 26860) — strongest current lead path |
| Newsletter | Present; no clear value exchange |
| Footer “coffee” copy | Casual; undercuts B2B seriousness |

**Conversion score:** Low. No quote funnel, no capability proof, no urgency path besides WhatsApp.

---

## 5. Mobile experience

- MeanMenu mobile nav exists (positive)
- Bootstrap 3 / `col-xs-*` era responsive — functional but dated
- Slider + multi-carousel patterns are heavy on mobile bandwidth
- Contact form stacks awkwardly
- No sticky quote / call bar; WhatsApp floats but competes with thumb zone

---

## 6. Accessibility (WCAG)

| Issue | Evidence |
|---|---|
| Empty `lang=""` | `<html class="no-js" lang="">` |
| Missing/empty alt | Home: 31/34 images empty alt |
| Focus / skip link | Not evident |
| Heading misuse | Multiple H2s for feature cards; no H1 on home |
| Duplicate IDs | Contact form: two `id="name"` |
| Color contrast | Rose on white / grey nav links likely fail AA in places |
| Keyboard | Carousel/slider controls unlikely robust |

---

## 7. SEO & technical

| Item | Status |
|---|---|
| Meta description | Empty on all pages |
| Open Graph / Twitter cards | Absent |
| Canonical | Absent |
| Structured data | Absent |
| `robots.txt` | 404 |
| `sitemap.xml` | 404 |
| Spelling in URLs/nav | “Interiour” / “Exteriour” |
| Cache headers | `no-store` on HTML; assets 7-day cache |

---

## 8. Performance (observed)

- **10 CSS + 15 JS** render-blocking dependencies
- Hero slider image ≈ **540 KB** JPEG; no `srcset` / WebP / lazy-load on critical path
- No code splitting; full plugin suite on every page
- Estimated Lighthouse performance: well below 95 (likely 40–65 mobile)

---

## 9. Content inventory (preserve)

**Company facts:**
- Artistic Engineers · est. Feb 2018 · Nashik
- 1, Kothari Plaza, Near Bali Maharaj Mandir, Mumbai–Agra Highway, Panchavati, Nashik-422003
- +91-87665 26860 · sales@artisticengineers.in
- Facebook / YouTube present
- Mission: *“Expanding The Space To Perform”*

**Product families:**
1. Interior / smart furniture (~30 SKUs)
2. Exterior / fabrication (doors, laser cutting, shades)
3. Art & crafts (placeholder)

---

## 10. Scorecard vs redesign brief

| Dimension | Score /10 |
|---|---|
| Visual appeal | 3 |
| UX clarity | 4 |
| Brand perception | 2 |
| Trust | 3 |
| Lead generation | 3 |
| Mobile | 5 |
| Accessibility | 2 |
| SEO | 1 |
| Performance | 3 |
| **Overall** | **~2.9** |

---

## Phase 1 status

**Approved** — proceed to Phase 2 (sitemap + page hierarchy).
