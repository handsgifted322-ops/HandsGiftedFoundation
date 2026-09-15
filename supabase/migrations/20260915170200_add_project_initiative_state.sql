-- Applied to hands-gifted-production on 2026-09-15.
-- Business initiative priority is separate from execution status.

alter table public.projects
  add column if not exists initiative_state text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'projects_initiative_state_check'
      and conrelid = 'public.projects'::regclass
  ) then
    alter table public.projects
      add constraint projects_initiative_state_check
      check (
        initiative_state is null
        or initiative_state in ('ACTIVE BUSINESS', 'INTERNAL R&D', 'FUTURE ROADMAP')
      );
  end if;
end $$;

create index if not exists projects_org_initiative_state_idx
  on public.projects (organization_id, initiative_state)
  where initiative_state is not null;
