# Hands Gifted — AI Web Developer Handoff

## Mission
Complete and stabilize one connected Hands Gifted ecosystem without replacing the existing architecture.

### Canonical surfaces
1. **Public Hands Gifted Foundation** — public informational and learning website/app.
2. **Command Center** — private parent/operator control plane for household and Foundation administration.
3. **Family Dashboard** — private family execution layer for role-appropriate assignments, Academy work, progress, and help.

Do not merge these surfaces and do not create another major standalone app.

## Current stack
- Next.js 15 App Router
- React 19
- TypeScript 5.7
- Supabase/PostgreSQL + RLS
- Vercel
- GitHub
- Node 22

## Current repo / branch
- Repo: `handsgifted322-ops/HandsGiftedFoundation`
- Working branch: `visual-recovery-2026-09-04`

## Production database snapshot — 2026-09-04
- Supabase project: `hands-gifted-production`
- Project ref: `ocliixwpnesfgalrafpi`
- 65 public base tables
- 125 RLS policies
- 12 public functions
- All public base tables inspected had RLS enabled and at least one policy.

### Key durable data already present
- `tasks`: 26
- `programs`: 20
- `projects`: 10
- `products`: 18
- `operating_knowledge`: 60
- `household_assignments`: 25
- `household_members`: 7
- `household_needs`: 5
- `household_routines`: 27
- `household_rules`: 15
- `household_sops`: 9
- `household_zones`: 9
- `academy_tracks`: 10
- `academy_learning_items`: 10
- `academy_progress`: 90
- `academy_assignments`: 0
- `content_items`: 0
- `events`: 0
- `grant_opportunities`: 1
- `school_records`: 1

This database is not an empty prototype. Preserve it. Do not rebuild or wipe it.

## Authentication reality
Current active household members: two parents and five children. Only one parent household member is currently linked to a login. The other parent and all five child records are currently unlinked.

The current short-term UX intentionally allows a child-name selection shell before child account provisioning, but private child records must never become publicly readable as a shortcut.

## Security / RLS findings
- Household, Academy, content, and task tables use RLS.
- Parent/operator writes generally depend on organization roles `owner`, `admin`, or `staff`.
- Child/self reads for assignments and Academy use `current_household_member_id()`.
- Child UPDATE of `household_assignments` is not currently broadly allowed. Do not add a permissive UPDATE policy. Use narrow, validated transitions or RPC/server actions.
- `household_sops_member_read` currently depends on `is_org_member(organization_id)`. Confirm whether future child accounts will also be organization members or implement a dedicated active-household-member authorization rule.
- Never expose behavior-review, extension-reason, school, health, financial, or sibling-private information to a child-facing route.

## Command Center current state
Existing routes include:
- `/command-center`
- `/command-center/overview`
- `/command-center/household`
- `/command-center/assignments`
- `/command-center/academy`
- `/command-center/content`
- `/command-center/operations`
- `/command-center/resources`
- `/command-center/system-health`

The Command Center home has been changed from a module directory into a live parent/operator attention dashboard.

A real parent assignment workflow now exists:
`Command Center → Assign a Task → choose household member → enter task → save → durable household_assignments row`.

The developer must verify this end-to-end under an authenticated parent session, not just confirm that the deployment builds.

## Family Dashboard target behavior
Short-term requested experience:
- Show child names first.
- Child clicks their own name.
- Do not force child sign-up yet.

Long-term secure experience:
- Authenticated role-aware access.
- Child sees only own assignments, lessons, status, progress, help, and parent feedback.
- Parent sees all household management in Command Center.

Target assignment workflow:
`Parent creates assignment → child sees assignment → child starts → child marks Ready for Mom Check → parent Pass/Redo → progress updates → chore rotates or parent approves extension`.

## Household rules that are product requirements
- Chores normally last one week.
- Parent decides whether poor follow-through/reminders/behavior justify an extra week.
- Software does not autonomously discipline or extend chores.
- Current child rotation order is fixed oldest-to-youngest for each chore independently.
- Parent remains final authority for Pass/Redo and extensions.

## Academy architecture
Academy is shared curriculum, not shared privacy.
- Public Foundation: approved public learning.
- Command Center: curriculum creation, publishing, assignment, verification, progress oversight.
- Family Dashboard: private personalized lessons and progress.

Public learning journey:
`Explore → Learn → Study → Pray → Apply → Create → Serve`.

## Public Foundation requirements
The public site remains informational, educational, mission-driven, and public. It may include mission/story, programs, Academy, resources, public projects, services/products, outreach, media, events, participation, and contact.

Never place household controls or private family records on the public Foundation surface.

## Immediate engineering backlog — priority order
1. **Authenticated parent runtime verification** for every current Command Center write action.
2. **Assignment completion loop**: parent create → DB row → Command Center readback → child view → parent Pass/Redo.
3. **Safe child status transitions** with strict authorization; no generic child UPDATE access.
4. **Exact SOP-to-assignment relationship** using durable relational data rather than brittle title matching.
5. **Household review actions**: Pass, Redo, reminder count, Rotate, Extend +1/+2, reason/history.
6. **Academy assignment write/readback** using existing `academy_*` tables.
7. **Content publishing workflow** from `content_items` to public Foundation rendering.
8. **Unified navigation/design system** so Command Center feels like a working operating dashboard instead of disconnected pages.
9. **Loading, success, error, empty, mobile, and accessibility states** across all forms and dashboards.
10. **Automated tests** for authorization boundaries and critical workflows.
11. **Deployment verification** after each vertical slice.
12. **Domain cutover only after preview and production behavior are verified.**

## Definition of DONE for any feature
A feature is not WORKING just because the page exists or Vercel says READY.

Required receipt:
1. UI interaction works.
2. Server action/API/RPC succeeds.
3. Supabase durable row/change verified.
4. Correct data reads back into UI.
5. Authorization/RLS verified for parent and child roles.
6. Vercel deployment READY.
7. Runtime route tested.
8. Rollback path documented.

## Developer profile required
Hire a **senior full-stack product engineer**, not only a visual web designer.

Must demonstrate hands-on work with:
- Next.js App Router + React Server Components/server actions
- TypeScript strict applications
- Supabase/PostgreSQL
- Supabase Auth and RLS
- SQL migrations, functions/RPC, constraints, indexes
- Vercel deployments and environment configuration
- Git/GitHub branch workflow
- Admin dashboards / role-aware multi-surface products
- Secure handling of child/family data
- AI-assisted development tools, while still reviewing code and database changes manually

Strong preference for someone who can own product architecture and UX, not merely execute prompts.

## Screening test
Before giving broad access, pay for one contained trial milestone:

**Trial:** Make the parent assignment workflow fully verified end-to-end in preview.

Acceptance criteria:
- Authorized parent can create an assignment.
- The row exists in `household_assignments`.
- The Command Center immediately reads it back.
- Selected child shell can display the correct assignment without sibling leakage.
- Unauthorized/public session cannot read the private record.
- No destructive database migration.
- Developer supplies changed files, migration(s), test evidence, deployment URL, and rollback notes.

Do not proceed to a larger contract until this trial passes.

## Access rules for the developer
- Use least privilege.
- Do not send database passwords, service-role keys, or secrets in chat/email.
- Prefer platform invitations / scoped access.
- Work on a feature branch and preview deployment first.
- Migrations only for schema/DDL changes.
- No production deletes, table rebuilds, RLS disabling, or domain changes without explicit approval.
- Never copy private child/family data into public issues, logs, screenshots, prompts, or demo datasets.

## Technical principle
Repair and complete the existing system. Do not replace verified working components because a new AI tool can generate a prettier prototype.

Engineering order:
`DATABASE INTEGRITY → AUTH → DATA WRITES → DATA READBACK → COMMAND CENTER → FAMILY DASHBOARD → PUBLIC PUBLISHING → DEPLOYMENT → UI POLISH`
