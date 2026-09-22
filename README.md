# Hands Gifted Foundation — Application Source

This repository is the canonical Next.js/TypeScript application for Hands Gifted.

## Architecture boundary

The canonical application contains both public routes and protected authenticated surfaces. They are **separate by authorization and data boundary, not separate canonical deployments**.

Public routes may include the approved business story, flagship offer, learning/public resources, selected product concepts, and customer-facing navigation. They intentionally do **not** expose private household, child, school, behavior/discipline, financial, medical, journal, case-management, or administrative records.

Protected surfaces include:
- Parent/Operator Command Center
- Family Dashboard / role-appropriate child experiences
- Family Academy authenticated experiences

Runtime/business data remains in the Hands Gifted production Supabase project with RLS. GitHub remains the code/migration and canonical technical-documentation source of truth. Vercel remains deployment infrastructure. Library/Drive remains the document-record layer. HXOS integration remains contract-based rather than database sharing.

## V2 architecture and publishing discipline

V2 is organized as **Personal → Family → Public**, supported by a **Shared Knowledge & Evidence** layer and system/internal infrastructure. Personal and Family are both protected, but they are separate authorization scopes; Family access does not automatically grant access to Personal records.

Content follows a readiness workflow separate from access scope and business priority. New material is private by default and moves through `CAPTURED → DEVELOPING → ORGANIZED → VERIFY → APPROVAL → PUBLISH_READY → PUBLISHED → ARCHIVED`. Public routes may use only material deliberately approved for public scope. See [`docs/V2_CONTENT_READINESS_WORKFLOW.md`](docs/V2_CONTENT_READINESS_WORKFLOW.md).

## Current business focus

The current 90-day business operating model is documented in [`docs/OPERATING_MODEL_90_DAY_FOCUS.md`](docs/OPERATING_MODEL_90_DAY_FOCUS.md).

Business initiatives use only these priority states:
- `ACTIVE BUSINESS`
- `INTERNAL R&D`
- `FUTURE ROADMAP`

This priority state is separate from ordinary execution status such as planned, in progress, or complete.

## Local development

```bash
npm ci
npm run typecheck
npm run build
npm start
```

Node.js 22.x is required by `package.json`.

## Source recovery and deployment discipline

Continue from `main`; preserve verified components rather than rebuilding the application from old static sources. Use feature branches and Vercel previews for material changes, then promote only verified work.

Do not publish private household data into public routes or repository documentation. Do not claim planned features are production-complete until code, security, data readback, authorization, and deployment verification are complete.


### V2 three-view principle

Hands Gifted V2 uses **one idea, three views**: Personal, Family/Private, and Public. These are views over a canonical lineage, not three disconnected copies. See [`docs/V2_THREE_VIEW_PRINCIPLE.md`](docs/V2_THREE_VIEW_PRINCIPLE.md).
