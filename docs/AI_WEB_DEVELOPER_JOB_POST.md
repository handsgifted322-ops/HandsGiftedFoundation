# Hiring Brief — Senior AI-Assisted Full-Stack Web Developer

## Project
Hands Gifted Foundation + private Command Center + private Family Dashboard

## What already exists
This is an existing Next.js/Supabase/Vercel application with a live production database. It is not a greenfield mockup.

The developer will inherit:
- Next.js 15 / React 19 / TypeScript
- Supabase/PostgreSQL with RLS
- Vercel deployments
- GitHub repo and feature branch
- Public Foundation website
- Private parent/operator Command Center
- Private Family Dashboard
- Existing household, Academy, program, project, product, task, and knowledge data

## Role
We need a senior full-stack product engineer who uses AI coding tools effectively but can independently audit architecture, SQL, authentication, RLS, server actions, deployment behavior, and UX.

This is not primarily a graphic-design job and not a prompt-only app-builder project.

## First paid milestone
Complete and verify the parent assignment loop:

`Command Center → Assign Task → save to Supabase → read back in Command Center → show only to selected child → parent review path`

Deliverables:
- working preview deployment
- durable Supabase write/readback
- authorization/RLS proof
- no sibling/private data leakage
- changed-file list
- migrations, if any
- test evidence
- rollback notes

## Required experience
- Next.js App Router / React Server Components / server actions
- TypeScript
- Supabase Auth, PostgreSQL, RLS, SQL migrations, RPC/functions
- Vercel
- Git/GitHub
- responsive dashboard UX
- role-based applications
- secure family/child data handling
- AI-assisted engineering tools such as Codex, Cursor, Claude Code, Copilot, or equivalent

## Apply with
1. Two live applications you personally built or maintained using Next.js + PostgreSQL/Supabase.
2. One example where you implemented row-level or role-based authorization.
3. One example of taking over an existing codebase rather than rebuilding it.
4. How you verify a database write from UI through production readback.
5. Your fixed price for the first trial milestone and estimated turnaround.
6. Which AI development tools you use and how you review their output before shipping.

## Disqualifiers
- proposes rebuilding the entire database immediately
- requests service-role secrets over chat/email
- wants to disable RLS to make development easier
- cannot explain preview vs production deployment workflow
- only shows static websites/landing pages
- cannot explain how to prevent one child/user from seeing another user's records

## Architecture rule
Public Foundation, private Command Center, and private Family Dashboard remain separate surfaces within one ecosystem. Do not merge private household functionality into the public site and do not create another disconnected application.
