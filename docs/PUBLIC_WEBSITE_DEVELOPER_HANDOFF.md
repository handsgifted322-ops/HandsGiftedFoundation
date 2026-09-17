# Hands Gifted — Public Website Developer Handoff

**Status:** Canonical brief for the public website redesign and ongoing public-site updates.

This document is intentionally limited to the community-facing website. Owner execution, daily roadmaps, private household operations, Family Dashboard details, and Command Center workflows are managed separately.

## 1. Role split

### Public Website & Domain project
Use this project for implementation work only:
- public UI/UX
- information architecture
- public content and resources
- B2C visitor flows
- B2B organization/partner flows
- approved products/services
- forms, analytics, SEO, accessibility, performance
- preview/production deployments
- domain routing and website maintenance

### Private Command Center
The owner manages her daily execution roadmap, approvals, planning, progress tracking, research, and internal task sequencing there.

Do not turn the public website into a project-management surface.

## 2. Current technical source of truth

- Repository: `handsgifted322-ops/HandsGiftedFoundation`
- Default source branch: `main`
- Framework: Next.js App Router
- Next.js: 15.5.25
- React: 19.1.0
- TypeScript: 5.7.2
- Supabase client: `@supabase/supabase-js` 2.57.4
- Supabase SSR: 0.7.0
- `package.json` declares Node 22.x
- Canonical Vercel project: `hands-gifted-foundation`
- Vercel currently reports Node 24.x; reconcile intentionally before launch
- Production Supabase project: `hands-gifted-production`
- Supabase project ref: `ocliixwpnesfgalrafpi`

Current Vercel-attached domains are Vercel subdomains. The custom domain `handsgiftedfoundation.com` is not currently shown as attached to the canonical Vercel project. Treat domain cutover as a gated launch task, not an assumption.

## 3. Website purpose

Hands Gifted is building a community-facing, faith-centered family resource and learning ecosystem. The website should help visitors discover useful information, move through connected topic pathways, understand what Hands Gifted currently offers, and find appropriate next steps.

The public site should not look like:
- a private family dashboard
- a diary
- a generic nonprofit template
- a government-services portal
- a random list of unrelated programs
- a generic SaaS landing page

The intended feel is editorial, premium, warm, structured, practical, faith-centered, culturally grounded, and mobile-first.

## 4. Audience architecture

### B2C — active
Support individuals, women, parents, families, learners, customers, members/pilot participants, and general community visitors.

### B2B — active
Support organizations, businesses, community organizations, service providers, educators, collaborators, vendors, and appropriate partners.

A professional path such as `For Organizations` or `Partner With Hands Gifted` should exist.

### B2G — undecided
Do not publish government-contracting, procurement, agency-services, capability-statement, or public-sector claims until the owner explicitly approves a B2G strategy.

## 5. Public information architecture

The final sitemap should be validated in design, but the public system should support these major areas:

- Home
- Explore / Resource Center
- Family & Household
- Children & Learning
- Faith & Scripture
- Practical Skills
- Family Stability Resources
- Household Operating System
- Products / Shop — only approved/current items
- For Organizations / Partnerships
- About
- Follow My Journey
- Contact
- Member / Family Login entry

Keep public website navigation separate from protected Command Center routes.

## 6. Follow My Journey

`Follow My Journey` should be a distinct public content hub linked from the About page.

It may include:
- build updates
- lessons learned
- milestones
- behind-the-process notes
- what is being tested
- public reflections

It does not need to be branded as a traditional blog unless that becomes useful later.

Never publish private family conflict, child records, school information, medical details, legal matters, household finances, private journals, or private spiritual records through this feature.

## 7. Resource Center / rabbit-hole model

A visitor should be able to enter through a real question or topic and continue into connected material rather than hit a flat article archive.

Example path:
`Meal planning → grocery stewardship → food inventory → family routines → children learning kitchen responsibility → Sabbath preparation → related Scripture → free resource → deeper Hands Gifted tool`

Topic pages should be capable of surfacing:
- practical guidance
- related topics
- Scripture/study where relevant
- practical application
- verified external resources
- related Hands Gifted tools/products
- next-step actions

Design the content model for search, filters, related-topic links, and reusable content blocks.

## 8. Faith-content standard

Faith is structural, not decorative.

Where appropriate, support:
`Scripture → context → principle → related passages → study/reflection → practical application → related resource`

Do not reduce faith integration to isolated decorative verse cards.

## 9. Public/private boundary

Production Supabase contains private application and family data. The public website must only read intentionally public-safe data.

Never expose anonymous/public access to:
- household member records
- child identities or private profiles
- school records
- behavior/discipline records
- household needs
- private schedules/appointments
- financial information
- medical information
- legal information
- private journals
- private measurement/profile data
- Command Center records
- private Academy progress

RLS must remain enabled. Never expose a service-role key in browser code.

Prefer an explicit public publishing layer with status/visibility controls rather than binding the homepage to arbitrary production tables.

## 10. Status-aware publishing

Database existence does not equal public availability.

Public UI must support states such as:
- Available
- Pilot
- In development
- Planned
- Future

Only approved/current states should receive purchase, booking, registration, or participation calls to action.

## 11. Visual system

Approved brand palette currently includes:
- Deep Plum `#1B0826`
- Royal Purple `#42105F`
- Purple `#652279`
- Gold `#D5A323`
- Bright Gold `#F0C449`
- Cream `#FFF8EA`
- Parchment `#F5E5C6`

Use these as a disciplined system, not as decoration on every surface.

The canonical logo artifact identified in the data is `Elegant hands gift logo design.png`. Reconcile the final logo asset before launch rather than inventing a replacement without approval.

## 12. Mobile-first requirement

Primary testing must include:
- small Android viewport
- larger Android/iPhone
- tablet portrait and landscape
- laptop
- desktop/wide desktop

Navigation, forms, resource cards, Scripture content, calls to action, search, and login entry must be readable and thumb-friendly.

## 13. Developer roadmap in Supabase

The `Public Website & Domain` project now contains a dedicated implementation backlog labeled `DEV ROADMAP 01` through `DEV ROADMAP 16`.

These are developer-facing milestones, not the owner’s daily 90-day roadmap.

The milestone sequence covers:
1. source-of-truth audit
2. public sitemap/IA
3. UI/UX design system
4. homepage redesign
5. About + Follow My Journey
6. Resource Center architecture
7. B2C paths
8. B2B paths
9. public publishing layer
10. status-aware products/services
11. Scripture content templates
12. responsive/accessibility/SEO/performance
13. forms/analytics
14. public/private security QA
15. deployment/runtime/domain cutover
16. update/maintenance workflow

## 14. Current deployment issues to preserve in backlog

- custom domain is not currently attached to the canonical Vercel project
- package engine is Node 22.x while Vercel reports Node 24.x
- domain cutover must happen only after preview QA
- existing public site should not be destroyed before the replacement is approved

## 15. Development workflow

Use:
`task → feature branch → implementation → local/typecheck/build → Vercel preview → mobile/accessibility/privacy QA → owner review → merge → production verification`

For content-only changes, still preserve review and rollback.

Do not rebuild the website in GoDaddy Airo.

## 16. Definition of done for public website work

A website milestone is not complete because a page exists.

Required checks:
1. correct public content and visitor path
2. responsive behavior verified
3. accessibility basics verified
4. public/private boundary verified
5. no secrets exposed
6. typecheck/build succeeds
7. preview route works
8. owner-approved copy/design
9. production route verified after release
10. rollback/change history preserved

## 17. Canonical instruction

For public-website-only work, this file is the primary developer brief. The older `docs/AI_WEB_DEVELOPER_HANDOFF.md` contains broader private-application engineering context and should not be treated as the public website redesign brief unless the developer is separately authorized to work on those private systems.
