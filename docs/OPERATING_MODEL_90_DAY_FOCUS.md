# Hands Gifted — 90-Day Operating Model

**Effective:** September 15, 2026

This document records the current business-focus rule for the Hands Gifted application and Command Center. It is intentionally limited to business/technical operating context and contains no private household, child, financial, medical, journal, or case-management details.

## Active business focus

For the next 90 days, Hands Gifted operates around:

- **One active customer:** women and mothers managing busy or rebuilding households who need practical organization systems.
- **One major problem:** household responsibilities, meals, schedules, routines, inventory, and planning are scattered and create mental overload.
- **One flagship offer:** **Hands Gifted Family Household Operating System**.
- **One primary website message:** practical household systems that create order, consistency, and stability, informed by real internal testing.
- **One primary acquisition channel:** choose one social platform and use privacy-safe household-system testing as the content engine.

The validation objective is to determine whether the target customer understands the problem, wants the system, uses it, and is willing to pay for it.

## Initiative states

Business initiatives use only these three states:

### ACTIVE BUSINESS
Work required to validate and operate the current flagship, including:

- Family Household Operating System flagship
- public website/message
- Command Center and SOP operating infrastructure
- business/legal/entity clarification and governance records
- one acquisition system/channel
- customer validation and offer measurement

### INTERNAL R&D
Household-tested skills, systems, and content that may generate evidence but do not compete as separate launches during this cycle, including:

- Family Academy
- cooking/recipe development
- gardening
- sewing
- hair/self-care
- other household-tested systems and practical skills

### FUTURE ROADMAP
Expansion that is not required to validate the current flagship, including broader community programs, extensive e-commerce, certifications/procurement expansion, mobility pilots, and additional divisions.

## Product boundary

The internal household operating system can remain broad because it must operate real family and business work. The public market message must remain narrow. Internal breadth must not become public offer confusion.

Private family records are test inputs and operational records, not public marketing assets. Any public lessons derived from household testing must be privacy-safe and must not expose child, school, financial, health, journal, discipline, case-management, or other sensitive data.

## System-of-record boundary

- **GitHub:** code, migrations, architecture, canonical technical documentation
- **Supabase:** runtime/business data, project classification, living business-plan records
- **Vercel:** deployment and environment state
- **Library/Drive:** document records and source files
- **Conversation:** planning and working decisions

Do not create a second canonical copy of private records in the public repository.

## Application implementation

The `projects` model includes an optional `initiative_state` field constrained to:

- `ACTIVE BUSINESS`
- `INTERNAL R&D`
- `FUTURE ROADMAP`

The Command Center Operations view should surface these classifications separately from ordinary execution status. Execution status answers *what is happening*; initiative state answers *whether the business should be investing launch attention in it now*.
