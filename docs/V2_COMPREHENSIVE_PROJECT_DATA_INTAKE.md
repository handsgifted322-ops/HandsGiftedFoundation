# Hands Gifted V2 — Comprehensive Project & Data Intake Map

## Rule

The V2 Content Readiness system is not limited to social-media posts. It is the intake and promotion layer for **all existing Hands Gifted work** that may eventually produce Personal, Family, Shared Knowledge/Evidence, or Public outputs.

Do not restart or duplicate an existing initiative. First locate its current records, artifacts, code, data, evidence, and ownership.

## Canonical technical sources

- **GitHub — HandsGiftedFoundation:** canonical application code, migrations, technical documentation, and V2 branch.
- **Supabase — hands-gifted-production:** canonical runtime/business records subject to RLS and V2 authorization.
- **Vercel — hands-gifted-foundation:** canonical deployment target.
- **Library/Drive:** document-record and source-artifact layer where applicable.
- **Bible Study app:** remains a separate application; link through governed interfaces rather than folding its database into Hands Gifted.
- **HXOS / Z21:** remain separately governed systems. Integrate through approved contracts/interfaces and provenance; do not clone production data, secrets, or ownership boundaries into Hands Gifted.

## Existing project/workstream intake

V2 inventory and Content Readiness must be capable of linking records from:

### Personal / Founder Development
- Today / personal operating view
- Teach Me / Research
- Develop Me
- Skills and skill practice
- Projects
- Evidence / Portfolio / Show My Growth
- Business Lab
- Founder learning, notes, drafts, research, designs, and tested practices

### Family & Household
- Family Household Operating System
- Family Command Center / Parent-Operator Command Center
- Household zones, routines, assignments, chores and SOPs
- Meals, food inventory, cooking and meal-prep systems
- Laundry/clothing and household-stability workflows
- Sabbath / Holy Day preparation
- Calendars, appointments, school events and family coordination
- Assistance/resource follow-ups, transportation and stability work
- Family documentation, evidence and tested-used practices

### Enhanced Gifted / Family Academy
- Family Academy
- Enhanced Gifted learning model
- Child profiles and role/age-appropriate experiences
- School-to-Academy bridge
- Assignments, tracks, enrollments and progress
- Bible/Scripture learning
- Reading, science and school support
- Cooking
- Sewing/making
- Gardening
- Art/creative studio
- Music
- Technology / game-building / Technology Lab concepts
- Entrepreneurship and financial literacy
- Practical-life learning
- Daughters of Sarah
- Kings of God
- Family library, family research nights, projects, evidence and portfolios

### Research / Knowledge / History
- Teach Me / Research collections
- Scripture and references
- Primary sources
- Secondary scholarship
- Videos/documentaries
- Faith teaching and theological interpretation
- Historical events/timelines
- Notes and family discussion questions
- Citations and source artifacts
- Tested practices and applications
- Hands Gifted history
- Family-created systems/history
- Z21-related history/provenance where authorized
- Historical research for websites, exhibits, lessons, social content and archives

### Sewing / Apparel / Making
- Hands Gifted Sewing — Garment Development
- Hands Gifted Sewing Book
- Garment catalog and canonical designs
- Patterning, measurements, construction and alteration records
- Design provenance
- Materials/tools and testing
- Before/progress/final evidence
- Modest apparel
- Women/girls and mother-daughter concepts
- Blue borders/fringes where applicable
- Braiding / Natural Hair & Self-Care
- Creative skills/trades and making projects

### Food / Garden / Wellness
- Recipes and cookbook development
- Cooking/media documentation
- Food & Nutrition
- Gardening and garden tracking
- Tested meals and family-use evidence
- Natural-products concepts where applicable
- Health/wellness program concepts only at the appropriate privacy level

### Programs / Community / Ministry
- Family Development
- Gift-to-Stability
- Family Recovery / Rebuilding
- Daughters of Sarah
- Kings of God
- Children / Youth
- Biblical Teaching & Family Skills
- Food / Garden / Nutrition
- Creative Skills / Trades
- Entrepreneurship / Economic Empowerment
- Grants / Business Development
- Love Thy Neighbor / outreach
- Voice / Media
- Creative workshops/media
- Community/resource sharing

### Business / Products / Public
- HandsGiftedFoundation.com
- Public resources
- Shop/products
- Services
- B2C
- B2B
- B2G
- Product concepts and catalog records
- Grants and grant-readiness work
- Business plan and revisions
- Governance/operations
- Content Studio / social-media assets
- Books, workbooks and educational materials
- Marketing campaigns
- Partnerships/outreach
- Sales/distribution concepts
- Flagship Family Household Operating System
- Internal R&D and Future Roadmap initiatives

### Technology / Operations
- Canonical Next.js/TypeScript application
- V2 Personal / Family / Public surfaces
- Supabase schema, RLS and runtime records
- Vercel deployments
- GitHub branches, issues, PRs, migrations and documentation
- SOP library and Trigger → SOP → Task → Execute → Record → Verify → Improve workflow
- Integrations, integration logs and decision records
- Legacy dashboard/family-app deployments retained for evidence/migration review
- HandsKits/private-dashboard concepts only according to their established separation
- Bible Study app as separate system
- HXOS/Z21 governed integration records

## Existing data classes to map, not recreate

The audit must map all existing tables/records, including at minimum:

- household members
- projects
- tasks
- programs
- products
- operating knowledge
- source artifacts
- project context
- Academy tracks/enrollments/assignments/progress
- school records
- family progress metrics
- sewing garments and garment-development evidence
- business-plan sections/revisions
- routines, rules, assignments and household zones
- grants/outreach/partnership records where present
- content/media records
- files/documents/evidence references
- integration/sync/decision logs
- approvals/publication records
- legacy/partial/empty tables that require migration or deprecation decisions

## Universal V2 metadata

Every inventory item should eventually be able to carry:

- canonical ID
- title
- description
- owner/source system
- project/workstream
- record/artifact type
- access scope: PERSONAL / FAMILY / PUBLIC / SHARED_KNOWLEDGE_EVIDENCE / SYSTEM_INTERNAL
- content readiness: CAPTURED / DEVELOPING / ORGANIZED / VERIFY / APPROVAL / PUBLISH_READY / PUBLISHED / ARCHIVED
- business priority where relevant: ACTIVE BUSINESS / INTERNAL R&D / FUTURE ROADMAP
- execution status
- evidence/source links
- citations/provenance where relevant
- related people/roles using privacy-safe identifiers
- related project/task/program/product/lesson/research collection
- publication channel/date/reference where relevant
- verification/approval history
- created/updated timestamps
- legacy source/migration status

## Migration classification

Each existing asset receives one disposition:

- **REUSE** — already fits V2.
- **EXTEND** — retain record/table/component and add V2 fields/relations.
- **MIGRATE** — move/transform into the canonical V2 model.
- **REFERENCE** — preserve as evidence/history but do not make operational.
- **DEPRECATE** — superseded after verification.
- **SEPARATE_SYSTEM** — intentionally remains outside Hands Gifted canonical storage and connects only through approved interfaces.

## Safety / publication constraints

- Private family/child/school/medical/financial/journal/case-management data never becomes public by inheritance or category.
- A public-looking project name does not grant PUBLIC visibility.
- Readiness never grants access.
- PUBLIC requires explicit public scope plus approval/publication state.
- Child/family evidence defaults to protected scope.
- Historical fact, primary evidence, secondary scholarship, faith interpretation, family lived experience, and Hands Gifted/Z21 conclusions must remain distinguishable.
- External/separate systems keep their ownership and security boundaries.

## Immediate V2 implementation consequence

The Personal **Content Readiness** queue should become an inventory gateway, not merely a posting queue. It must be able to surface existing projects/data/artifacts, show where each lives, assign a readiness state, connect supporting evidence, and deliberately promote approved derivatives into Family or Public use.

The first vertical slice remains **Teach Me / Research**, but it must use this shared intake/provenance model so research can later feed Enhanced Gifted lessons, family research nights, evidence/portfolio records, public educational resources, products, programs, and historical archives without copying the same source material into disconnected systems.
