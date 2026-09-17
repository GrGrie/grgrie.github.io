---
title: FitNotFat
description: An Android food diary and workout log — Flutter client, NestJS and PostgreSQL backend, barcode lookup through Open Food Facts, self-hosted and invite-only.
order: 4
---

A food diary built around the thing other trackers get wrong: recipes are
entered by raw ingredients and then scaled by the *cooked* weight, so a portion
of yesterday's stew has honest numbers. Barcodes resolve through Open Food Facts
with a local product cache, and simple workouts are logged alongside meals.

- **Client:** Flutter, Android first.
- **API:** NestJS with Prisma over PostgreSQL, migrations applied on deploy.
- **Accounts:** invite-only, JWT, tokens in the platform's secure storage.
- **Operations:** runs on my own server behind a tunnel; Helmet, a CORS
  allowlist, request size limits, rate limiting and required-env validation as a
  baseline. Every response carries a request id and errors follow one JSON
  contract, so a user-visible failure can be traced without logging bodies or
  credentials.

*Private repository while it is in development.*
