"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

async function getAuthorizedParent() {
  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Authentication required");
  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id,role")
    .eq("user_id", auth.user.id);
  const membership = memberships?.find((row) => ["owner", "admin", "staff"].includes(String(row.role)));
  if (!membership) throw new Error("Not authorized");
  return { supabase, organizationId: membership.organization_id };
}

export async function reviewHouseholdAssignment(formData: FormData) {
  const assignmentId = String(formData.get("assignment_id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (!assignmentId || !["pass", "redo"].includes(decision)) throw new Error("Invalid review action");

  const { supabase, organizationId } = await getAuthorizedParent();
  const { data: assignment } = await supabase
    .from("household_assignments")
    .select("id,status")
    .eq("id", assignmentId)
    .eq("organization_id", organizationId)
    .maybeSingle();
  if (!assignment) throw new Error("Assignment not found");

  const next = decision === "pass"
    ? { parent_check_status: "pass", status: "complete", completed_at: new Date().toISOString() }
    : { parent_check_status: "redo", status: "needs_attention", completed_at: null };

  const { error } = await supabase
    .from("household_assignments")
    .update(next)
    .eq("id", assignmentId)
    .eq("organization_id", organizationId);
  if (error) throw new Error(error.message);

  revalidatePath("/command-center");
  revalidatePath("/command-center/household");
  revalidatePath("/command-center/assignments");
  revalidatePath("/family/dashboard");
}

export async function rotateHouseholdChore(formData: FormData) {
  const zoneId = String(formData.get("zone_id") ?? "");
  if (!zoneId) throw new Error("Zone required");
  const { supabase, organizationId } = await getAuthorizedParent();
  const { data: state } = await supabase
    .from("household_chore_rotation_state")
    .select("zone_id")
    .eq("zone_id", zoneId)
    .eq("organization_id", organizationId)
    .eq("active", true)
    .maybeSingle();
  if (!state) throw new Error("Rotation not found");
  const { error } = await supabase.rpc("advance_household_chore_rotation", { p_zone_id: zoneId, p_next_hold_weeks: 1 });
  if (error) throw new Error(error.message);
  revalidatePath("/command-center/household");
  revalidatePath("/family/dashboard");
}

export async function extendHouseholdChore(formData: FormData) {
  const zoneId = String(formData.get("zone_id") ?? "");
  const extraWeeks = Number(formData.get("extra_weeks") ?? 1);
  const reminderCount = Number(formData.get("reminder_count") ?? 0);
  const behaviorReview = String(formData.get("behavior_review") ?? "").trim();
  const extensionReason = String(formData.get("extension_reason") ?? "").trim();
  if (!zoneId || ![1,2].includes(extraWeeks)) throw new Error("Invalid extension");
  const { supabase, organizationId } = await getAuthorizedParent();
  const { data: state } = await supabase
    .from("household_chore_rotation_state")
    .select("zone_id")
    .eq("zone_id", zoneId)
    .eq("organization_id", organizationId)
    .eq("active", true)
    .maybeSingle();
  if (!state) throw new Error("Rotation not found");
  const { error } = await supabase.rpc("extend_household_chore_rotation", {
    p_zone_id: zoneId,
    p_extra_weeks: extraWeeks,
    p_reminder_count: Math.max(0, reminderCount),
    p_behavior_review: behaviorReview || null,
    p_extension_reason: extensionReason || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/command-center/household");
  revalidatePath("/family/dashboard");
}
