-- Hands Gifted Family Operations v1
-- Shared household lists schema.
-- REVIEW IN PREVIEW/DEVELOPMENT BEFORE APPLYING TO PRODUCTION.

create table if not exists public.household_lists (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  list_type text not null default 'general' check (list_type in ('general','grocery','store','errand','restock','school','cleaning','sabbath','feast','garden','clothing','repair','donation','packing','other')),
  store_name text,
  status text not null default 'active' check (status in ('active','completed','archived')),
  reusable boolean not null default true,
  visibility text not null default 'parent' check (visibility in ('parent','family')),
  reset_count integer not null default 0 check (reset_count >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id)
);

create table if not exists public.household_list_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  list_id uuid not null,
  item_name text not null,
  category text,
  quantity numeric,
  unit text,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'needed' check (status in ('needed','in_cart','checked','skipped')),
  source_type text not null default 'manual' check (source_type in ('manual','inventory','recipe','meal_plan','school','routine','maintenance','garden','other')),
  source_ref text,
  estimated_price_cents integer check (estimated_price_cents is null or estimated_price_cents >= 0),
  actual_price_cents integer check (actual_price_cents is null or actual_price_cents >= 0),
  notes text,
  sort_order integer not null default 0,
  checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint household_list_items_list_org_fkey
    foreign key (list_id, organization_id)
    references public.household_lists(id, organization_id)
    on delete cascade
);

create index if not exists household_lists_org_status_idx
  on public.household_lists (organization_id, status, updated_at desc);

create index if not exists household_list_items_list_status_idx
  on public.household_list_items (list_id, status, sort_order, created_at);

create index if not exists household_list_items_org_source_idx
  on public.household_list_items (organization_id, source_type, source_ref);

alter table public.household_lists enable row level security;
alter table public.household_list_items enable row level security;

drop policy if exists household_lists_parent_admin on public.household_lists;
create policy household_lists_parent_admin
on public.household_lists
for all
to authenticated
using (has_org_role(organization_id, array['owner'::member_role,'admin'::member_role,'staff'::member_role]))
with check (has_org_role(organization_id, array['owner'::member_role,'admin'::member_role,'staff'::member_role]));

drop policy if exists household_list_items_parent_admin on public.household_list_items;
create policy household_list_items_parent_admin
on public.household_list_items
for all
to authenticated
using (has_org_role(organization_id, array['owner'::member_role,'admin'::member_role,'staff'::member_role]))
with check (has_org_role(organization_id, array['owner'::member_role,'admin'::member_role,'staff'::member_role]));

comment on table public.household_lists is 'Reusable parent-controlled family operations lists. Family/child access requires a later reviewed RLS slice.';
comment on table public.household_list_items is 'Items belonging to reusable household lists; source_type/source_ref support later inventory, recipe and school integrations.';
