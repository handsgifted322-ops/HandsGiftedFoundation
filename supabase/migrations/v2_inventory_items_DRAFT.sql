-- HANDS GIFTED V2 DRAFT MIGRATION — DO NOT APPLY TO PRODUCTION WITHOUT REVIEW
-- Purpose: additive metadata layer for V2 intake/readiness/provenance.
create table if not exists public.v2_inventory_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  source_table text not null,
  source_id uuid,
  title text not null,
  workstream text,
  record_type text not null,
  access_scope text not null default 'PERSONAL' check (access_scope in ('PERSONAL','FAMILY','PUBLIC','SHARED_KNOWLEDGE_EVIDENCE','SYSTEM_INTERNAL')),
  readiness text not null default 'CAPTURED' check (readiness in ('CAPTURED','DEVELOPING','ORGANIZED','VERIFY','APPROVAL','PUBLISH_READY','PUBLISHED','ARCHIVED')),
  migration_disposition text check (migration_disposition in ('REUSE','EXTEND','MIGRATE','REFERENCE','DEPRECATE','SEPARATE_SYSTEM')),
  business_priority text,
  execution_status text,
  provenance jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  approved_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(source_table, source_id)
);
alter table public.v2_inventory_items enable row level security;
-- Policies intentionally omitted until owner/family/public authorization identities are verified.
-- No public read policy should be added by default.
