# Kleenova Cleaning Services

Production website for **Kleenova Cleaning Services**, serving Nairobi and surrounding areas.

**Live site:** https://dansamuka.github.io/Kleenova/

## What this repository contains

This is a deliberately lightweight static website: semantic HTML, a shared CSS design system, a small progressive-enhancement JavaScript module, optimized local images, and GitHub Actions deployment. There is no application server, database, runtime package manager dependency, analytics tracker, or secret embedded in the browser.

That architecture keeps the public attack surface small, makes GitHub Pages hosting straightforward, and is appropriate for the current business requirement. The repository is structured so service pages, a CMS-backed content layer, CRM/booking integration, analytics, and a custom domain can be introduced later without rebuilding the visual system.

## Current customer experience

- Responsive, mobile-first landing page
- Residential, office, healthcare and commercial service positioning
- Nairobi + surrounding areas service area
- WhatsApp quote workflow with pre-filled enquiry details
- Phone and email conversion paths
- FAQ and privacy information
- LocalBusiness structured data
- Open Graph / social sharing artwork
- Sitemap, robots.txt, PWA manifest and 404 page
- Keyboard accessibility, reduced-motion support and semantic markup

## Architecture

```text
/
├─ index.html
├─ privacy.html
├─ 404.html
├─ site.webmanifest
├─ robots.txt
├─ sitemap.xml
├─ assets/
│  ├─ css/styles.css          # design tokens, components, responsive rules
│  ├─ js/main.js              # mobile nav + WhatsApp quote composition
│  ├─ icons/favicon.svg
│  └─ images/                 # optimized brand and campaign assets
├─ docs/
│  ├─ ARCHITECTURE.md
│  ├─ ROADMAP.md
│  ├─ BRAND.md
│  └─ ASSET-REGISTER.md
├─ scripts/validate.py        # dependency-free site quality checks
└─ .github/
   ├─ workflows/validate.yml
   ├─ workflows/pages.yml
   ├─ dependabot.yml
   └─ CODEOWNERS
```

## Local preview

No build step is required.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Validation

```bash
python3 scripts/validate.py
```

The validation script checks internal HTML references, anchor targets, image `alt` attributes, required metadata, unsafe target-blank links, and expected project files.

## Deployment

Pushes to `main` run validation and deploy the repository to GitHub Pages through the official Pages actions. The Pages workflow requests only the permissions required to publish.

## Content principles

The launch site does **not** invent reviews, prices, staff counts, years in business, insurance status, guarantees, or certifications. These should be added only when the business can substantiate them.

## Security reporting

See [SECURITY.md](SECURITY.md).

© Kleenova Cleaning Services. All rights reserved.
