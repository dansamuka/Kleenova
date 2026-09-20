# Delivery Roadmap

The project is intentionally phased so visual quality, factual quality and integrations are reviewed separately rather than being rushed into one low-quality release.

## Phase 0 — Discovery & benchmark translation — COMPLETE

Outputs:
- review of the supplied Kleenova business artwork;
- brand palette and visual direction;
- review of the Hello Cleaners benchmark structure;
- content inventory limited to substantiated Kleenova claims;
- conversion model: quote, WhatsApp, phone and email.

Quality gate:
- no copied benchmark branding or text;
- no invented pricing, testimonials, certifications or guarantees.

## Phase 1 — Production design system & core website — COMPLETE

Outputs:
- responsive single-page website;
- reusable typography, spacing, color and component tokens;
- service cards for Residential, Office, Healthcare and Commercial;
- Why Kleenova, process, FAQ and contact sections;
- mobile navigation;
- accessibility and reduced-motion behavior;
- privacy page and 404 page.

Quality gate:
- works without a JavaScript framework;
- mobile-first layouts;
- all primary conversion paths functional.

## Phase 2 — High-quality visual asset pipeline — COMPLETE FOR V1

Outputs:
- scalable SVG wordmark recreated from the supplied business artwork;
- bespoke vector hero illustration created from the AI art direction and aligned to the teal/gold system;
- resolution-independent SVG production artwork;
- - SVG favicon;
- asset provenance register.

Quality gate:
- no watermarked stock photography;
- no low-resolution full-width assets;
- no AI-generated text embedded in published photography;
- image file sizes optimized for web.

### Phase 2B — Optional next asset set

Create only when needed:
- real team photography;
- real before/after case studies with customer permission;
- service-specific imagery for healthcare, office, residential and commercial pages;
- branded uniforms/vehicle photography;
- final vector master logo from original design files.

Real business photography should replace synthetic imagery progressively as it becomes available.

## Phase 3 — Conversion & operations integration — NEXT

Recommended outputs:
- proper hosted enquiry endpoint or CRM integration;
- spam protection and rate limiting if a public form endpoint is introduced;
- business-hours and response-time copy once confirmed;
- Google Business Profile link;
- optional privacy-respecting analytics;
- event tracking for quote, call and WhatsApp conversions;
- lead-source tagging.

Do not add tracking until a privacy decision and analytics owner are agreed.

## Phase 4 — Search growth & service-area scale — LATER

Recommended outputs:
- dedicated service pages;
- Nairobi neighbourhood/service-area pages where there is genuine operational coverage;
- verified testimonials and project case studies;
- FAQ schema only where content is visible and compliant with current search guidance;
- editorial content that answers real customer questions;
- custom domain and edge security headers.

Avoid thin SEO pages. Each new page should contain genuinely useful, location/service-specific content.

## Phase 5 — Booking/payments platform — ONLY IF THE BUSINESS NEEDS IT

Potential outputs:
- availability calendar;
- quote-to-book workflow;
- M-PESA/card payments;
- customer notifications;
- staff scheduling;
- CRM/job management;
- role-based admin tools;
- audit logging.

This phase should move off a purely static architecture and use server-side secret management, validated APIs, a database and a formal threat model.
