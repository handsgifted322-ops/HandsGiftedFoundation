# Hands Gifted Foundation — Application Source

This repository replaces the former static `index.html` Foundation page with a mobile-first Next.js/TypeScript application.

## Architecture boundary

This public application includes mission, programs, learning pathways, approved product concepts, current initiatives, and public ecosystem navigation. It intentionally does **not** expose private household, child, school, behavior/discipline, financial, medical, journal, case-management, or administrative records.

Private authenticated surfaces remain separate:
- Parent/Operator (Mother) Command Center
- Children Dashboard / Family Dashboard
- Family Academy authenticated experiences

Runtime/business data remains in the Hands Gifted production Supabase project. GitHub remains the code/migration source of truth; Vercel remains deployment infrastructure; HXOS integration remains contract-based rather than database sharing.

## Local development

```bash
npm ci
npm run typecheck
npm run build
npm start
```

Node.js 22+ is required.

## Source recovery

Preferred recovery branch: `recovery/hands-gifted-source-consolidation`.

Do not publish private household data into this public application. Do not claim planned features are production-complete until code, security, and deployment verification are complete.
