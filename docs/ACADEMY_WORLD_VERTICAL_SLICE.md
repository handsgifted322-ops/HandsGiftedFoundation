# Hands Gifted Family Academy World — Vertical Slice

## Product goal
Build an explorable learning world for the seven-person household. The Academy is one shared biblical and family-development system with role- and age-aware pathways. It is not four separate academies.

## Fixed pathway model
1. Major foundational family track first.
2. Shared biblical subject branches into role application.
3. Father and sons develop through the Father / Kings of God side of the same pathway.
4. Mother and daughters develop through the Mother / Daughters of Sarah side of the same pathway.
5. Children progress by age and maturity toward adult responsibility.
6. Family-together missions reconnect the pathways.

## Learning progression
Read → Find → Understand → Investigate → Compare → Apply → Explain → Demonstrate → Teach.

Each major level ends in an assessment. Passing score is 70% or higher. A failed assessment keeps the next level locked and routes the learner to review before a retake.

## Dashboard rule
My Academy surfaces one current unlocked lesson at a time. Future areas may be visible in the world, but locked content is not available until progression rules are met.

## Academy world interaction model
The world should feel like an explorable game environment rather than a conventional LMS. Learners move through an Academy map and approach locations or objects to open missions.

Initial zones:
- Scripture Hall
- Family Hall
- Garden Lab
- Kitchen Lab
- Creative Studio
- Technology Lab

Later role-development experiences live inside the same world and pathway rather than becoming separate products.

## Vertical slice definition
Learner opens Family Dashboard → enters Academy World → sees current unlocked area → opens current mission → completes study/activity → takes level assessment → score is persisted → score >= 70 marks level passed → next level becomes available → world visibly unlocks the next area.

## Family restoration requirements
The Academy supports household rebuilding, love, responsibility, communication and bonding. Relationship activities are not graded like academic assessments.

Father has a recurring weekly responsibility to spend intentional one-on-one bonding time with Mother and each of the five children. Reflection remains private and sibling-safe.

## Research and study tools
Lessons can deliberately require opening the KJV 1611 / Apocrypha, finding passages, comparing Scripture, taking notes, asking for hints, or using approved web research when the assignment permits it. Children receive age-appropriate research guidance.

## Privacy and authority
- Parent authority remains final.
- Children can work, request help and submit Ready for Parent Review.
- Children cannot self-approve, self-unlock, alter discipline or access sibling-private data.
- Sibling behavior, school records, parent notes, consequences and private progress stay isolated.
- Adult-only content must never surface to child dashboards.

## Technical architecture
Keep the current stack: Next.js App Router + TypeScript + Supabase + Vercel. Do not rebuild or replace the production database.

The game-world UI is a presentation layer over the Academy engine. Academy progression, assignments, assessments, scores, permissions and unlock state remain durable Supabase data so the visual world can later evolve from lightweight 2D/2.5D into richer web 3D without replacing the underlying learning system.

## Definition of done for this slice
- UI interaction works.
- Current learner is resolved safely.
- Current unlocked level comes from Supabase.
- Assessment submission writes durably.
- Score is read back.
- 70% threshold controls progression.
- Next level unlock is persisted.
- Child sees only their own Academy state.
- Parent can review relevant child state.
- Build/typecheck pass.
- Vercel preview is READY.
- Runtime route is tested on mobile.
