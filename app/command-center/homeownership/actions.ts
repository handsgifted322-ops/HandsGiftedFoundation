"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

const allowedRoles = new Set(["owner", "admin", "staff"]);
const allowedMilestoneStatuses = new Set(["not_started", "in_progress", "complete", "blocked"]);

const defaultMilestones = [
  { phase: "Foundation", title: "Establish financial baseline", due_date: "2026-10-31", sort_order: 1 },
  { phase: "Foundation", title: "Build a consistent Home Fund routine", due_date: "2026-12-31", sort_order: 2 },
  { phase: "Mortgage readiness", title: "Review credit reports and correction plan", due_date: "2027-03-31", sort_order: 3 },
  { phase: "Mortgage readiness", title: "Research first-time buyer and down-payment programs", due_date: "2027-06-30", sort_order: 4 },
  { phase: "12-month checkpoint", title: "Complete mortgage-readiness review", due_date: "2027-09-11", sort_order: 5 },
  { phase: "Position for approval", title: "Strengthen approval profile and narrow target market", due_date: "2028-03-31", sort_order: 6 },
  { phase: "Purchase phase", title: "Obtain preapproval and begin active home search", due_date: "2028-06-30", sort_order: 7 },
  { phase: "Purchase phase", title: "Reach purchase-ready checkpoint", due_date: "2028-09-11", sort_order: 8 },
];

async function getAuthorizedContext() {
  const supabase = await createSupabaseServerClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Authentication is required before the homeownership plan can be changed.");
  }

  const { data: memberships, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", authData.user.id);

  if (membershipError) throw membershipError;

  const membership = memberships?.find((row) => allowedRoles.has(String(row.role)));
  if (!membership) throw new Error("Owner, admin, or staff authorization is required.");

  return { supabase, organizationId: String(membership.organization_id) };
}

function numberOrNull(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error("Amounts must be valid non-negative numbers.");
  return parsed;
}

export async function initializeHomeownershipPlan() {
  const { supabase, organizationId } = await getAuthorizedContext();

  const { data: existing, error: existingError } = await supabase
    .from("homeownership_plans")
    .select("id")
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) {
    revalidatePath("/command-center/homeownership");
    return;
  }

  const { data: plan, error: planError } = await supabase
    .from("homeownership_plans")
    .insert({
      organization_id: organizationId,
      goal_name: "Hands Gifted Family Homeownership Goal",
      readiness_target_date: "2027-09-11",
      purchase_target_date: "2028-09-11",
      status: "foundation",
      dream_home_address: "16007 Seekers St, San Antonio, TX 78255",
      dream_home_price: 675000,
      notes: "The San Antonio property is inspiration only. The actual purchase range will be based on sustainable household affordability and mortgage readiness.",
    })
    .select("id")
    .single();

  if (planError) throw planError;

  const { error: milestoneError } = await supabase.from("homeownership_milestones").insert(
    defaultMilestones.map((milestone) => ({
      ...milestone,
      organization_id: organizationId,
      plan_id: plan.id,
      status: "not_started",
    }))
  );
  if (milestoneError) throw milestoneError;

  const { error: propertyError } = await supabase.from("homeownership_properties").insert({
    organization_id: organizationId,
    plan_id: plan.id,
    label: "Dream-home inspiration",
    address: "16007 Seekers St",
    city: "San Antonio",
    state: "TX",
    list_price: 675000,
    status: "vision",
    notes: "Use this home for feature inspiration, not as the current affordability target.",
  });
  if (propertyError) throw propertyError;

  revalidatePath("/command-center/homeownership");
  revalidatePath("/command-center");
}

export async function updateHomeownershipPlan(formData: FormData) {
  const { supabase, organizationId } = await getAuthorizedContext();

  const payload = {
    readiness_target_date: String(formData.get("readiness_target_date") ?? "2027-09-11"),
    purchase_target_date: String(formData.get("purchase_target_date") ?? "2028-09-11"),
    home_fund_current: numberOrNull(formData.get("home_fund_current")) ?? 0,
    home_fund_target: numberOrNull(formData.get("home_fund_target")) ?? 0,
    credit_stage: String(formData.get("credit_stage") ?? "not_reviewed"),
    documents_stage: String(formData.get("documents_stage") ?? "not_started"),
    counselor_stage: String(formData.get("counselor_stage") ?? "not_started"),
    target_market: String(formData.get("target_market") ?? "").trim() || null,
    target_purchase_price: numberOrNull(formData.get("target_purchase_price")),
    notes: String(formData.get("notes") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("homeownership_plans")
    .update(payload)
    .eq("organization_id", organizationId);

  if (error) throw error;
  revalidatePath("/command-center/homeownership");
}

export async function updateHomeownershipMilestone(formData: FormData) {
  const { supabase, organizationId } = await getAuthorizedContext();
  const milestoneId = String(formData.get("milestone_id") ?? "").trim();
  const status = String(formData.get("status") ?? "not_started").trim();

  if (!milestoneId) throw new Error("A milestone is required.");
  if (!allowedMilestoneStatuses.has(status)) throw new Error("Invalid milestone status.");

  const { error } = await supabase
    .from("homeownership_milestones")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", milestoneId)
    .eq("organization_id", organizationId);

  if (error) throw error;
  revalidatePath("/command-center/homeownership");
}

export async function addHomeownershipProperty(formData: FormData) {
  const { supabase, organizationId } = await getAuthorizedContext();

  const { data: plan, error: planError } = await supabase
    .from("homeownership_plans")
    .select("id")
    .eq("organization_id", organizationId)
    .single();

  if (planError) throw planError;

  const label = String(formData.get("label") ?? "").trim();
  if (!label) throw new Error("Give the property a label.");

  const { error } = await supabase.from("homeownership_properties").insert({
    organization_id: organizationId,
    plan_id: plan.id,
    label,
    address: String(formData.get("address") ?? "").trim() || null,
    city: String(formData.get("city") ?? "").trim() || null,
    state: String(formData.get("state") ?? "").trim() || null,
    list_price: numberOrNull(formData.get("list_price")),
    source_url: String(formData.get("source_url") ?? "").trim() || null,
    status: "vision",
    notes: String(formData.get("property_notes") ?? "").trim() || null,
  });

  if (error) throw error;
  revalidatePath("/command-center/homeownership");
}
