# Security Policy

## Supported website

Security fixes apply to the current `main` branch and the deployed GitHub Pages site.

## Reporting a vulnerability

Please do **not** publish sensitive vulnerability details in a public issue.

For a website/security concern, contact the repository owner privately through GitHub or use the business email `kleenova.cleaning@gmail.com` with the subject **Website security**.

Include:
- affected URL or file;
- reproduction steps;
- expected vs actual behavior;
- impact;
- any suggested mitigation.

Do not include customer personal data in a report.

## Security posture

The launch site:
- is static;
- has no database;
- has no login;
- stores no quote-form submission;
- includes no API keys;
- uses no third-party JavaScript;
- deploys through GitHub Pages Actions.

If dynamic forms, payments, CRM APIs or admin capabilities are added, this policy and threat model must be expanded before production release.
