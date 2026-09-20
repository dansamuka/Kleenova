# Architecture Decision Record — Kleenova Website

## 1. Context

Kleenova needs a simple, high-quality marketing website that is easy to host on GitHub, fast on mobile networks, safe to maintain, and capable of growing into richer booking and content workflows.

The design benchmark uses the patterns that work well for service businesses: a clear value proposition, prominent booking/quote calls to action, service discovery, trust signals, a simple process explanation, FAQ content and multiple contact paths. The Kleenova implementation adopts those structural patterns without copying benchmark branding or unsupported claims.

## 2. Decision

### Static-first architecture

The first production release uses native HTML/CSS/JavaScript and GitHub Pages.

Why:
- no public server to patch or administer;
- no database or credential handling for the launch experience;
- no framework/runtime dependency required to render pages;
- excellent performance and resilience;
- very low hosting complexity;
- easy rollback via Git history;
- suitable for SEO because all key content is present in HTML.

A framework would add operational and supply-chain complexity without improving the current user need. If the site later requires dozens of service/location pages, a CMS, authenticated areas, dynamic pricing or online payments, introduce a static site generator or application layer behind the same content and design contracts.

### Layering

1. **Content layer:** semantic HTML and structured data.
2. **Design-system layer:** CSS variables, layout primitives and reusable components.
3. **Interaction layer:** dependency-free `assets/js/main.js`.
4. **Integration layer:** standards-based external links (tel, mailto, WhatsApp).
5. **Delivery layer:** GitHub Actions → GitHub Pages.

The quote form does not post to a backend. It creates a WhatsApp message client-side, which means no form database, API key or spam endpoint is exposed. Required lead fields stay visible while notes and timing use progressive disclosure to keep the mobile form compact.

## 3. Security model

- No secrets in source or browser code.
- No inline third-party scripts.
- Inter Variable is self-hosted under `assets/fonts/`; no third-party presentation dependency is required at runtime.
- No analytics or advertising trackers at launch.
- Content Security Policy is supplied through a `<meta http-equiv>` directive because GitHub Pages does not provide repository-level response-header configuration.
- `target="_blank"` external links use `rel="noopener noreferrer"`.
- External form submission is avoided.
- Deployment uses official GitHub Pages actions and least-privilege workflow permissions.
- Dependabot watches GitHub Actions references.
- Security reporting guidance lives in `SECURITY.md`.

### Future hardening with a custom domain

If the business places Cloudflare or another edge provider in front of the custom domain, configure response headers there:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy`
- `Referrer-Policy`
- frame protection through CSP `frame-ancestors`

Those controls cannot all be reliably expressed by a static HTML page alone.

## 4. Performance model

- One optimized SVG hero illustration.
- Local brand/media assets on the critical visual path.
- Inter Variable is served locally from `assets/fonts/inter-latin-var.woff2` with `font-display: swap` and a system-font fallback.
- No JavaScript framework.
- Hero image is explicitly prioritized; decorative and future below-fold media should be lazy-loaded.
- CSS is shared and cacheable.
- Current image payload is intentionally small for a visual service site.

## 5. Accessibility

Target: WCAG 2.2 AA patterns where applicable.

Implemented:
- semantic headings and landmarks;
- skip link;
- visible focus states;
- native form controls and labels;
- reduced-motion support;
- keyboard-operable navigation and FAQ controls;
- decorative SVGs hidden from assistive technology;
- color system selected for readable contrast.

## 6. SEO and discoverability

- canonical URL;
- descriptive title/meta description;
- Open Graph/Twitter metadata;
- `LocalBusiness` JSON-LD;
- service catalog in structured data;
- robots.txt + sitemap.xml;
- service-area language matching the published business material.

When a custom domain is added, update canonical, OG, sitemap, structured-data URL and the GitHub Pages domain configuration together.

## 7. Scalability triggers

Migrate from hand-authored static pages to a generator/CMS when any of these become true:
- more than ~10–15 independently maintained landing pages;
- non-technical staff must publish content frequently;
- structured service-area pages expand materially;
- booking inventory/pricing must be calculated;
- payments or deposits are accepted online;
- authenticated customer/staff workflows are required.

At that point preserve the design tokens, content model and route contracts while replacing the rendering layer.
