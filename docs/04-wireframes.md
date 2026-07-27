# Phase 4 — Low-Fi Wireframe Structure

**Goal:** Page-by-page structural wireframes (layout blocks only — not visual design).  
**System reference:** Phase 2 IA · Phase 3 tokens/components  
**Status:** Awaiting approval before Phase 5 (design system in code)

**Legend**

```
[====]  full-bleed band
[----]  contained (~1200px)
( CTA ) primary action
( cta ) secondary action
···     optional / content-dependent
```

---

## Global chrome (all pages)

```
┌─────────────────────────────────────────────────────────────┐
│ SKIP LINK → #main                                           │
├─────────────────────────────────────────────────────────────┤
│ HEADER (sticky / glass on hero)                             │
│ [Logo]  Nav…Nav  ( Call )  ( Request Quote )  [☰ mobile]    │
├─────────────────────────────────────────────────────────────┤
│ MAIN #main                                                  │
│   …page sections…                                           │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
│ [Logo + blurb] [Company] [Solutions] [Support] [Contact]    │
│ Legal · Social · ©                                          │
├─────────────────────────────────────────────────────────────┤
│ MOBILE STICKY BAR (md:hidden)  ( Call ) ( Quote )           │
│ WHATSAPP FAB (accessible)                                   │
└─────────────────────────────────────────────────────────────┘
```

Breadcrumbs on all non-home pages, under header, above page hero:

```
[----] Home / Section / Current
```

---

## 1. Home `/`

**Job:** Establish industrial authority in one viewport, then build trust → capability → proof → quote.

```
[====] HERO (full-bleed media + navy overlay)
       Brand-forward title (not generic headline overpowering brand)
       One supporting sentence
       ( Request Quote )  ( Explore Capabilities )
       ··· scroll cue

[----] TRUST BAR
       | Stat | Stat | Stat | Stat |   (years · lines · clients · location)

[----] ABOUT TEASER                    [ image / plant ]
       Eyebrow · H2 · 2–3 lines
       ( About Artistic Engineers )

[----] WHY US
       H2 + subhead
       | Diff 1 | Diff 2 | Diff 3 | Diff 4 |   (icon + title + line)
       ( Talk to Engineering )

[----] CAPABILITIES
       H2 + subhead
       | Cap | Cap | Cap |
       | Cap | Cap |     |   (5 pillars)
       each card → capability detail
       ( View all capabilities )

[----] INDUSTRIES
       H2
       horizontal or 3×2 grid of sector tiles
       ( See industries )

[====] FEATURED PROJECTS (muted or charcoal band)
       H2 + subhead
       | Project | Project | Project |
       ( View all projects )

[----] INFRASTRUCTURE SNAPSHOT
       H2 · short copy · 3 capacity signals + media
       ( Quality & infrastructure )

[----] QUALITY (compact)
       H2 · 3 process points
       ( Our quality system )

[----] CLIENTS
       H2
       logo row / grid (named)

[----] TESTIMONIALS
       H2
       | Quote | Quote | Quote |   (name · role/city — no wrong brand)

[----] PROCESS
       H2
       1 Enquire → 2 Design → 3 Manufacture → 4 Deliver → 5 Support
       ( Start your project )

[====] CONTACT BAND (navy)
       H2 · short line
       mini form OR jump links
       ( Submit enquiry )  ( WhatsApp )
```

**First viewport budget:** Logo/brand · one headline · one sentence · CTA group · dominant image. No stats/schedules in hero.

---

## 2. About `/about`

```
[----] BREADCRUMBS

[====] PAGE HERO (navy)
       H1 · mission line
       ( Request Quote )

[----] STORY                         [ media ]
       Est. 2018 · Nashik · what we make
       ··· pull-quote: “Expanding The Space To Perform”

[----] VISION | MISSION
       | Vision block | Mission block |

[----] VALUES / STAND FOR
       | V1 | V2 | V3 | V4 |

[----] LEADERSHIP ··· (omit if no assets)
       | Person | Person |

[----] MILESTONES / SCALE
       timeline OR expanded stats

[====] CTA BAND
       Institutional / partnership enquiry
       ( Contact us )
```

---

## 3. Capabilities `/capabilities`

```
[----] BREADCRUMBS

[====] PAGE HERO
       H1: Engineering. Fabrication. Delivery.
       ( Request Quote )

[----] CAPABILITY GRID (5)
       | Metal fabrication |
       | Laser cutting |
       | Smart furniture systems |
       | Custom engineering |
       | Installation & service |
       each → child page

[----] HOW WE WORK (process teaser)
       4–5 steps compact
       ( Start enquiry )

[----] RELATED PROJECTS
       | P | P | P |

[====] CTA BAND
       ( Talk to Engineering )
```

### 3.a Capability detail `/capabilities/:slug`

```
[----] BREADCRUMBS

[====] HERO
       Capability name · one sentence · ( Request Quote )

[----] SCOPE
       What we deliver (bullets / short blocks)

[----] MATERIALS / PROCESS
       | Materials | Process notes | Tolerances/finish ··· |

[----] APPLICATIONS
       chip/tags → industries or products

[----] RELATED
       | Products ··· | Projects ··· |

[====] CTA BAND
       ( Get a quote on this capability )
```

---

## 4. Products `/products`

```
[----] BREADCRUMBS

[====] HERO
       Engineered products for interior & exterior spaces
       ( Request Quote )

[----] CATEGORY HUB
       | Interior systems |   | Exterior & fabrication |   | Custom |
       large tiles (not tiny cards clutter)

[----] FEATURED SKUs
       | Product | Product | Product | Product |
       ( Browse interior ) ( Browse exterior )

[====] CUSTOM BAND
       Don’t see it? We engineer it.
       ( Custom enquiry )
```

### 4.a Interior / Exterior index `/products/interior` | `/products/exterior`

```
[----] BREADCRUMBS

[====] CATEGORY HERO
       H1 · short category promise
       ( Enquire )

[----] FILTERS ··· (type / use)   [ optional MVP: type chips only ]

[----] PRODUCT GRID
       | img | name | one-line use | ( View ) |
       × N (from inventory; no dead # links)

[====] CTA BAND
       Need a custom size/finish?
       ( Request Quote )
```

### 4.b Product detail `/products/:category/:slug`

```
[----] BREADCRUMBS

[----] PRODUCT STAGE
       | Gallery (main + thumbs) |  Title
       |                           |  Specs list
       |                           |  Use cases
       |                           |  Customization note
       |                           |  ( Enquire on this product )
       |                           |  ( WhatsApp )

[----] RELATED PRODUCTS
       | P | P | P |

[====] CTA BAND
       ( Request Quote )
```

### 4.c Custom `/products/custom`

```
[----] BREADCRUMBS

[====] HERO
       Custom engineering for your site

[----] CUSTOM FORM (narrow container)
       Need · Site type · Timeline · Message · Upload ···
       ( Submit custom enquiry )

[----] WHAT HAPPENS NEXT
       3 steps

[----] EXAMPLE CUSTOM WORK ···
       | Project | Project |
```

---

## 5. Projects `/projects`

```
[----] BREADCRUMBS

[====] HERO
       Delivered work · proof of capability
       ( Discuss your project )

[----] FILTERS
       All | Industry | Capability | Product type

[----] PROJECT GRID
       | cover | title | sector tags | outcome tag |
       × N

[====] CTA BAND
       ( Request Quote )
```

### 5.a Project detail `/projects/:slug`

```
[----] BREADCRUMBS

[====] HERO MEDIA + TITLE
       Sector · capability tags
       ( Request similar work )

[----] CHALLENGE → SOLUTION
       | Challenge | Solution |

[----] SCOPE
       bullets / deliverables

[----] OUTCOME
       2–4 result lines

[----] GALLERY
       grid

[----] RELATED PROJECTS
       | P | P |

[====] CTA BAND
       ( Get a quote )
```

---

## 6. Quality `/quality`

```
[----] BREADCRUMBS

[====] HERO
       Quality as engineering discipline

[----] STANDARDS & MATERIALS
       H2 · commitments list + media

[----] PROCESS & INSPECTION
       Incoming → In-process → Final
       vertical or 3-column

[----] INFRASTRUCTURE
       Shop signals · tools · capacity
       | Signal | Signal | Signal |  + media

[====] CTA BAND
       Site visit / RFQ
       ( Schedule discussion )
```

---

## 7. Industries `/industries`

```
[----] BREADCRUMBS

[====] HERO
       Built for the spaces you operate

[----] INDUSTRY GRID
       | Residential |
       | Office |
       | Hospitality |
       | Institutional |
       | Commercial / retail |
       | Custom OEM ··· |

[====] CTA BAND
       ( Request Quote )
```

### 7.a Industry detail `/industries/:slug`

```
[----] BREADCRUMBS

[====] HERO
       Industry name · need we solve

[----] NEEDS → SOLUTIONS
       paired list

[----] TYPICAL PRODUCTS / CAPABILITIES
       chips → links

[----] SAMPLE PROJECTS
       | P | P |

[====] CTA BAND
       Sector enquiry
       ( Request Quote )
```

---

## 8. Contact `/contact`

```
[----] BREADCRUMBS

[====] HERO
       Request a quote / Talk to engineering
       intent tabs or chips: Quote | Enquiry | Support | Other

[----] SPLIT
       | QUOTE FORM (RHF+Zod)     |  DIRECT CHANNELS
       | Intent · Name · Email    |  Phone (tap)
       | Phone · Company          |  WhatsApp
       | Category · Message       |  Email
       | ··· file                 |  Address
       | ( Submit enquiry )       |

[----] MAP (full width contained)
       Nashik embed · ( Directions )

[----] FAQ (accordion)
       Lead time · Customization · Visit · Service area
```

**Query param:** `?intent=quote|custom|support` preselects form intent.

---

## 9. Legal `/privacy-policy` · `/disclaimer`

```
[----] BREADCRUMBS

[----] PROSE (narrow)
       H1
       dated sections
       back link to Contact / Home
```

---

## 10. Responsive behavior (wireframe rules)

| Breakpoint | Behavior |
|---|---|
| `< md` | Single column; sticky Call/Quote bar; hamburger drawer; hero stacked (media full-bleed behind/below type) |
| `md–lg` | 2-col splits; grids 2-up |
| `≥ lg` | 12-col as drawn; header inline CTAs; sticky bar hidden |

**Thumb rules:** Primary CTAs ≥ 44px; FAB clears sticky bar; safe bottom padding on `main`.

---

## 11. Cross-page CTA matrix

| Page | Primary exit | Secondary |
|---|---|---|
| Home | Request Quote | Explore Capabilities |
| About | Contact | Capabilities |
| Capabilities | Talk to Engineering | Projects |
| Capability detail | Quote on capability | Related projects |
| Products hub | Browse / Quote | Custom enquiry |
| Product detail | Enquire on product | WhatsApp |
| Projects | Discuss project | Quote |
| Quality | Schedule discussion | Quote |
| Industries | Quote | Projects |
| Contact | Submit form | Call / WhatsApp |

---

## 12. MVP wireframe priority (build order for Phase 6)

Aligned to your specified section order, then deep pages:

1. Design system primitives (Phase 5)
2. Home sections in order: Hero → Nav/Header → About → Why us → Services/Capabilities → Industries → Projects → Infrastructure → Quality → Clients → Testimonials → Process → Contact → Footer
3. Contact page (full form)
4. About, Capabilities, Products hub + indexes
5. Quality, Industries, Projects
6. Detail templates (product / project / capability / industry)
7. Legal + SEO shell

---

## Phase 4 status

**Deliverable complete.** Low-fi structure defined for global chrome and every route in the Phase 2 sitemap.

**Next:** Phase 5 — implement design system in code (tokens, Tailwind theme, base UI components).

Awaiting approval to continue.
