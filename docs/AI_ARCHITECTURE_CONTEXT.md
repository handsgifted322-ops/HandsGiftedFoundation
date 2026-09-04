# Hands Gifted Foundation — AI Architecture Context

## Purpose
This document gives AI assistants and human collaborators a stable, public-safe operating context for the Hands Gifted Foundation website and ecosystem. It is intentionally limited to information appropriate for a public repository.

## Founder / decision context
Hands Gifted is led by its founder/CEO as a family-first, faith-centered initiative. The operating philosophy is to stabilize and strengthen the household first, document what works, then turn proven skills, systems, resources, and services into support that can benefit other women, children, and families.

The founder prefers practical, usable systems over abstract plans. AI assistants should preserve continuity, avoid duplicating systems, distinguish what is verified from what is merely planned, and never present unfinished work as completed.

## Canonical mission framework
Use your hands. Build your household. Serve your community. Walk according to the Most High.

The current operating pathway is:

Seek → Examine → Build → Establish → Develop → Produce → Stabilize → Serve → Teach

This framework should organize public storytelling, programs, learning pathways, product development, household-to-community progression, and future platform navigation.

## System boundaries
Hands Gifted should remain one ecosystem with distinct technical surfaces:

1. **Public Foundation website**
   - Public mission, story, programs, approved resources, services, products, outreach, public media, learning-path explanations, and participation pathways.
   - Must not expose private household, child, school, behavioral, medical, financial, housing, marital, incident, journal, or permission data.

2. **Private Parent / Mother Command Center**
   - Authenticated household operations, parent approvals, school administration, household needs, routines, tasks, family stability work, private records, and Hands Gifted administration.
   - Must use authorization and row-level security.
   - Private family data must be fetched only after authentication; do not hard-code personal family records into static HTML or public bundles.

3. **Private child-facing dashboard / Family Academy**
   - Each child sees only authorized self-scoped responsibilities, learning, progress, projects, school support, and help pathways.
   - Sibling records and parent administration must remain hidden.

4. **Bible Study app**
   - Separate application and separate Supabase project.
   - Do not merge its database into Hands Gifted production.

## Canonical infrastructure intent
- Public GitHub source of truth: `handsgifted322-ops/HandsGiftedFoundation`
- Public Vercel project: `hands-gifted-foundation`
- Hands Gifted production Supabase project: `hands-gifted-production`
- Bible Study Supabase project remains separate.
- GitHub stores source code and reviewed migrations.
- Supabase stores runtime/application state.
- Vercel hosts deployments and public/private applications.

## Current recovery rules
Until source recovery is complete:
- Do not replace the richer Vercel Foundation build with the small static `index.html` currently on `main`.
- Do not point the public domain at a private dashboard project.
- Do not merge private family and public Foundation surfaces.
- Do not delete production tables or overwrite production records during consolidation.
- Do not commit Supabase service-role or secret keys to GitHub.
- Publishable browser keys are not treated as secrets, but browser access is safe only when RLS/auth policies are correct.

## AI assistant decision protocol
All AI assistants working on Hands Gifted should:

1. Check the current source-of-truth and deployment mapping before changing code.
2. Preserve the original Hands Gifted mission, faith/family/stability emphasis, and household-first operating model.
3. Separate verified implementation from planned concepts.
4. Avoid duplicate repositories, duplicate programs, duplicate app surfaces, and parallel sources of truth.
5. Prefer one canonical public site repository and one canonical private family-system repository.
6. Treat security/privacy as a release gate, not an afterthought.
7. Use migrations for database structural changes and record the security impact.
8. Preserve the principle: **separate database, shared contracts** for HXOS or other external systems.
9. Keep Family Academy distinct from the Parent Command Center even when they share database services.
10. Never expose private family context merely to make an AI assistant "understand the founder." Use public-safe values and operating principles in public code; keep any deeper personal context in private systems only.

## Program architecture
The ecosystem includes, among other approved program lines:
- Hands Gifted Family Development
- Gift-to-Stability
- Family Recovery and Rebuilding
- Daughters of Sarah
- Kings of God
- Children and Youth Development
- Biblical Teaching & Family Skills
- Food, Garden and Family Nutrition
- Hands Gifted Cooking
- Hands Gifted Gardening
- Creative Skills and Trades
- Sewing & Apparel
- Braiding / Natural Hair
- Health and Wellness
- Entrepreneurship and Economic Empowerment
- Grants & Business Development
- Love Thy Neighbor Outreach
- Hands Gifted Voice and Media

Programs should remain navigable by need, gift, stage, or goal rather than becoming an undifferentiated list.

## Build-state discipline
Use explicit statuses such as:
- planned
- in development
- active
- verified / production-ready

Do not infer that a program or feature is fully implemented solely because a database record, design, mockup, or concept exists.

## Immediate architecture priorities
1. Recover/preserve the latest rich public Foundation source in GitHub.
2. Make `HandsGiftedFoundation` the canonical public source of truth.
3. Move both apex and `www` public domains to the `hands-gifted-foundation` Vercel project.
4. Establish a canonical private GitHub repository for the Command Center / family system.
5. Remove hard-coded private family details from static deployment source.
6. Verify environment variables point to the intended Supabase project and no privileged secret exists in Git.
7. Keep Bible Study infrastructure separate.
8. Finish auth/RLS/privacy verification before private household production use.

## Change-control rule
When architecture changes are proposed, assistants should state:
- what is changing;
- why it is changing;
- which repository/project/database is affected;
- whether the change is public, private, or database-level;
- whether it affects security/privacy;
- how it was verified after implementation.
