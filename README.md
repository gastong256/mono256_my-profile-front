# mono256_my-profile-front

Frontend application for **mono256_my-profile**. This repository delivers a production-ready personal professional website built with a static-first architecture, and it establishes the foundation for a future developer-facing generator product.

The current frontend also includes:

- A real backend-connected public contact form.
- A private admin area at `/admin` for reviewing contact submissions.
- A typed API layer for public and authenticated backend communication.

## 1. Project Overview

`mono256_my-profile-front` is a Next.js 14 frontend designed to:

- Present a professional personal website.
- Communicate the future product direction.
- Provide a stable base for evolving into a generator platform.

Core product promise:

> Meet me and generate your personal website in two clicks.

Two clicks means:

1. Connect GitHub.
2. Connect Vercel.

## 2. Purpose Of This Repository

This repository is the frontend entrypoint of the broader `mono256_my-profile` project.

It currently serves:

- Marketing and professional profile pages (Home, About, Projects, Contact, Product).
- A product boundary for future generated flows (`/create`, `/result/[id]`).
- A hidden admin route for internal contact-submission operations (`/admin`).
- Baseline operational readiness through linting, type-checking, and CI.

## 3. Architecture Explanation

The project follows these principles:

- Static-first rendering for fast performance and lower operational complexity.
- Clear separation between current marketing experience and future product workflows.
- Private admin flows isolated from public navigation.
- Typed content files to avoid long hardcoded page copy.
- Typed API contracts and a centralized API client for backend integration.
- Lean dependency strategy with minimal libraries.
- Production-ready, scalable folder organization.

### Global Style System

The shared layout layer uses a token-based dark theme with a Fedora-inspired blue accent direction (cool primary tones, subtle slate surfaces, and blue-focused interaction states).  
Core tokens are defined in `src/styles/tokens.css` and mapped through `tailwind.config.ts`.  
Reusable interaction classes for shared UI primitives live in `src/components/ui/foundation.ts` and are consumed by base components (`button`, `input`, `textarea`, `badge`, and shared layout interactions).
Window-shell layout primitives are centralized in `src/components/shared/window/foundation.ts` to keep page window behavior consistent across sections.

### Route Segmentation

- `(marketing)` group: public profile and product-marketing pages.
- `(product)` group: future generator flow routes.
- `admin` group: private login and contact-submission review flows.
- `api/health`: backend health placeholder endpoint.

## 4. Folder Structure Explanation

```text
mono256_my-profile-front/
  .github/
    workflows/
      ci.yml
      release.yml

  public/
    images/
      profile/
    favicon.ico

  src/
    app/
      (marketing)/
        page.tsx
        about/page.tsx
        projects/page.tsx
        contact/page.tsx
        product/page.tsx
      (product)/
        create/page.tsx
        result/[id]/page.tsx
      admin/
        login/page.tsx
        (protected)/
          page.tsx
          submissions/[id]/page.tsx
      api/
        health/route.ts
      layout.tsx
      not-found.tsx
      sitemap.ts
      robots.ts
      globals.css

    components/
      admin/
      layout/
      marketing/
      pages/
      ui/
      shared/
        icons/
        primitives/
        system/
        window/

    content/
      site.ts
      profile.ts
      projects.ts
      product.ts

    lib/
      admin/
      env.ts
      metadata.ts
      api/client.ts
      api/auth.ts
      api/admin.ts
      api/contact.ts
      utils/cn.ts

    styles/
      tokens.css

    types/
      content.ts
      api.ts

  .env.example
  package.json
  next.config.mjs
  tailwind.config.ts
  postcss.config.js
  tsconfig.json
  README.md
```

## 5. Local Development Instructions

### Prerequisites

- Node.js 20+ (LTS recommended)
- `pnpm` 10+

### Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Application runs at:

- `http://localhost:3000`

### Quality Checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

### Local Git Hooks

This repository uses local Git hooks through `husky`:

- `pre-commit`: runs `lint-staged` on staged files
- `commit-msg`: validates commit messages with `commitlint`

Formatting is enforced on staged files during local commits and checked across the full repository in CI.

Expected commit message style follows Conventional Commits, for example:

- `feat: add admin submission filters`
- `fix: handle contact rate-limit feedback`
- `chore: update release workflow`

## 6. Deployment Notes (Vercel)

This project is optimized for Vercel deployment:

1. Import repository into Vercel.
2. Set required environment variables.
3. Deploy the default branch.

No custom server is required for current scope.

## 7. Environment Variables

Defined in `.env.example`:

- `NEXT_PUBLIC_SITE_URL` (example: `http://localhost:3000`)
- `NEXT_PUBLIC_API_BASE_URL` (example: `http://localhost:4000`)

Notes:

- `NEXT_PUBLIC_API_BASE_URL` is the single supported backend base URL variable for the current implementation.
- The frontend never hardcodes backend domains.

These are used for metadata, sitemap/robots generation, and the typed API client.

## 8. Backend Integration Notes

### Public Contact Contract

The public contact form sends `POST /contact` with this payload shape:

```json
{
  "name": "John Doe",
  "subject": "Project inquiry",
  "email": "john@example.com",
  "message": "Hello",
  "website": "",
  "captchaToken": "optional"
}
```

Important behavior:

- `subject` is required by both backend and frontend.
- `website` is a hidden honeypot field and is always sent.
- `captchaToken` is optional and currently not required because backend Turnstile enforcement is disabled.
- Honeypot submissions and some duplicate detections may return a silent `200` success response.

Frontend error handling maps backend responses as follows:

- `400`: validation feedback
- `429`: rate-limit / anti-spam feedback
- `503`: temporary service-unavailable feedback

### Admin Route Usage

Private admin routes are intentionally hidden from public navigation:

- `/admin/login`: backend-backed login form
- `/admin`: submissions list with filters and pagination
- `/admin/submissions/:id`: submission detail and review-status update

Authentication behavior:

- Login uses `POST /auth/login`.
- Session verification uses `GET /auth/me`.
- Protected admin requests send `Authorization: Bearer <token>`.
- If `/auth/me` fails or a protected request returns `401`, the frontend clears the session and redirects back to `/admin/login`.

### Admin Features Currently Consumed

- List contact submissions with backend pagination.
- Filter by `reviewStatus`.
- Filter by `deliveryStatus`.
- Inspect full submission details, delivery metadata, and `lastDeliveryError`.
- Update `reviewStatus` with `PATCH /admin/contact-submissions/:id`.

## 9. Manual QA Checklist

Use this checklist after configuring `NEXT_PUBLIC_API_BASE_URL`:

- Public contact form:
  - Submit a valid message and confirm success feedback.
  - Verify `subject` is required.
  - Verify `website` honeypot is still present in the DOM and sent in the payload.
  - Confirm `400`, `429`, and `503` responses show appropriate error states.
  - Confirm the form remains captcha-ready without blocking submission when no token is present.
- Admin authentication:
  - Open `/admin` while logged out and confirm redirect to `/admin/login`.
  - Log in with valid credentials and confirm redirect into the dashboard.
  - Log in with invalid credentials and confirm error feedback.
  - Remove or invalidate the stored token and confirm protected routes redirect back to login.
- Admin submissions dashboard:
  - Load the submissions list and verify backend data is rendered.
  - Change `reviewStatus` and `deliveryStatus` filters and confirm the list reloads.
  - Change page size and pagination controls and confirm URL/query-state updates.
  - Open a submission detail page and verify full message plus delivery metadata are visible.
  - Update review status from the detail view and confirm the success state and local UI refresh.

## 10. Release Strategy

This repository now uses `semantic-release` after a successful `CI` run on `main`.

What it automates:

- Determines the next version from commit history.
- Creates the git tag and GitHub Release automatically.
- Updates `package.json` with the released version.
- Updates `CHANGELOG.md`.
- Commits the release artifacts back to `main`.

Release rules follow Conventional Commits:

- `fix:` → patch
- `feat:` → minor
- `feat!:` or `BREAKING CHANGE:` → major

To publish a new release:

1. Merge Conventional Commit messages into `main`.
2. GitHub Actions runs `CI`.
3. If `CI` succeeds, the release workflow runs `semantic-release`.
4. The workflow calculates the next version and publishes the release.

Optional local helpers:

- `pnpm release:dry-run`
- `pnpm version:patch`
- `pnpm version:minor`
- `pnpm version:major`

Notes:

- `release:dry-run` is useful for checking what `semantic-release` would do without publishing.
- The `version:*` scripts are now only manual fallbacks and are no longer part of the normal release path.

## 11. Future Roadmap Summary

Planned evolution from profile website to productized generator:

1. Implement authentication and OAuth connections (GitHub, Vercel).
2. Build repository/profile ingestion pipeline.
3. Generate site configurations and themed templates.
4. Automate preview + production deployments.
5. Add dashboard-level management for generated websites.

## 12. Main Project Concept Link

Main concept repository: [mono256_my-profile](https://github.com/mono256/mono256_my-profile)

Project direction statement:

- Personal website first.
- Product generator second.
- Fast website creation for developers with two-click onboarding.
