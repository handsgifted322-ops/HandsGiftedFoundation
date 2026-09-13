# Hands Gifted Family Operations v1

## Purpose
Build one connected family operating system inside the existing Hands Gifted architecture. Do not create another standalone app.

Canonical surfaces:
1. Public Hands Gifted Foundation — approved public information/products/resources only.
2. Parent/Operator Command Center — private household and Foundation control plane.
3. Family Dashboard — private role-appropriate execution layer for children/family members.

Supabase remains the protected system of record. GitHub remains the application-code source of truth. Vercel remains the deployment layer.

## Product principle
Problem -> test at home -> observe -> improve -> stabilize -> product candidate -> approved public digital product.

The household is the first testing environment. A system should not be marketed as proven merely because a printable exists.

## V1 priorities
1. Family Operations home/attention view.
2. Shared lists engine: grocery, store, errands, restock, school, Sabbath/feast prep, cleaning supplies, garden, clothing, repairs/donations.
3. Inventory + Use First workflow using existing household_inventory.
4. Meal/recipe planning linked to shopping and inventory.
5. Cleaning/chore enhancements using existing zones, assignments, rotations, SOPs and Mom Check.
6. Child Daily View: schedule, current chore, school, Academy, reminders and next actions.
7. Family Board: announcements/acknowledgements before full chat.
8. AI Quick Add: natural-language/photo intake -> proposed structured action -> parent approval -> durable write.
9. Family Systems Lab: version household routines, record what worked/failed and revisions.
10. Productization pipeline: approved household systems -> digital product records -> public shop only after review.

## V1 data rules
- Reuse existing tables whenever they already represent the domain.
- Never duplicate protected family data into GitHub, public pages, logs, screenshots or public issues.
- Parent/operator approval remains required for sensitive or consequential changes.
- Child reads/writes must remain role-scoped and sibling-private.
- No permissive child UPDATE policies.
- No automatic discipline, punishment or chore extension decisions by software/AI.

## Existing tables to reuse
- household_members
- household_assignments
- household_zones
- household_chore_rotation_state
- household_chore_rotation_history
- household_routines
- household_sops
- household_rules
- household_needs
- household_inventory
- household_maintenance
- household_advance_notices
- household_module_status
- events
- school_records
- family_progress_metrics
- family_progress_entries
- products
- content_items
- academy_*
- integration_connections
- integration_audit_log

## Proposed new data domains (migration required; do not apply directly to production without preview/review)
### Shared lists
- household_lists
- household_list_items

### Food planning
- recipes
- recipe_ingredients
- meal_plans
- meal_plan_entries

### Family board
- family_board_posts
- family_board_acknowledgements

### Systems Lab
- household_systems
- household_system_versions
- household_system_reviews

## Recommended order of implementation
### Slice A — Operations shell without schema changes
Create /command-center/family-operations using existing tables. Show: today, routines, chores awaiting review, inventory alerts, upcoming events, advance notices, school/Academy attention and household needs.

### Slice B — Shared lists
Add list schema on a reviewed migration and build parent CRUD first. Add child/family read or limited contribution only after RLS verification.

### Slice C — Inventory + Use First
Activate household_inventory in the UI. Add food-specific metadata only after confirming whether separate columns or metadata JSON is preferable.

### Slice D — Meals
Add recipes/meal planning and connect missing ingredients to shared lists. Do not build automated purchasing.

### Slice E — Family Board + Child Daily View
Expose only role-appropriate data.

### Slice F — AI Quick Add
AI proposes structured changes; parent confirms before write. Maintain an audit trail.

### Slice G — Systems Lab + productization
Track versions and home testing. Only approved, privacy-safe outputs can become public product records.

## Definition of done for every vertical slice
1. UI works on mobile and desktop.
2. Server action/API/RPC succeeds.
3. Durable Supabase row/change verified.
4. Correct data reads back into UI.
5. RLS/authorization verified for parent and child roles.
6. Preview deployment verified before production.
7. Error/loading/empty states handled.
8. Rollback path documented.
