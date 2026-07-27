# Phase 7 — SEO, Accessibility & Performance

**Status:** Complete — awaiting approval before Phase 8

## SEO
- Route-level meta via `react-helmet-async` (`Seo`, `RouteSeo`)
- Canonical, robots, Open Graph, Twitter cards
- `public/robots.txt` + `public/sitemap.xml`
- JSON-LD: Organization, WebSite, LocalBusiness (home), BreadcrumbList, FAQPage (contact)
- Design system route set to `noindex`

## Accessibility
- `lang="en"`, skip link, landmarks (`header` / `main` / `footer` / nav labels)
- Breadcrumbs with `aria-current`
- FormField clones `aria-describedby` / `aria-invalid` / `aria-required` onto controls
- Meaningful image alts on project/product media
- Accordion keyboard/ARIA pattern
- Focus-visible rings retained; reduced-motion honored in reveals
- Loading route fallback uses `role="status"`

## Performance
- Route-level `React.lazy` + `Suspense` (Home eager; other pages split)
- Manual chunks: `react-vendor`, `router`, `motion`, `forms`, `icons`, `query`
- Lazy images by default; hero uses `fetchPriority="high"`
- Map iframe `loading="lazy"`
- Font + asset host preconnect/dns-prefetch in `index.html`

## Verify
```bash
npm run build
```
Confirm multiple JS chunks under `dist/assets/` and that `/robots.txt` + `/sitemap.xml` copy into `dist/`.
