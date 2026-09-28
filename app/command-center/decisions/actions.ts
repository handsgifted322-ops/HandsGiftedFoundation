"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { getCommandAccess } from "../_lib/access";

const allowed = new Set(["approve_pilot","request_revision","reject"]);

export async function recordDecision(formData: FormData) {
  const access = await getCommandAccess();
  if (access.state !== "ready" || !["owner","admin"].includes(access.role)) {
    throw new Error("Owner or admin approval is required.");
  }

  const caseId = String(formData.get("case_id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!caseId || !allowed.has(decision)) {
    throw new Error("Invalid decision request.");
  }

  const status =
    decision === "approve_pilot"
      ? "human_approved_for_pilot"
      : decision === "request_revision"
        ? "revision_requested"
        : "human_rejected";

  const supabase = await createSupabaseServerClient();

  const { data: decisionCase, error: readError } = await supabase
    .from("hxos_decision_cases")
    .select("id,organization_id,request_title,recommendation")
    .eq("id", caseId)
    .eq("organization_id", access.organizationId)
    .single();

  if (readError || !decisionCase) {
    throw new Error("Decision case not found.");
  }

  const { error: updateError } = await supabase
    .from("hxos_decision_cases")
    .update({
      status,
      human_decision: decision,
      human_decision_notes: notes || null,
      decided_by: access.userId,
      decided_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", caseId)
    .eq("organization_id", access.organizationId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  await supabase.from("integration_audit_log").insert({
    organization_id: access.organizationId,
    direction: "internal",
    event_type: "hxos.decision_support.human_decision",
    status,
    details: {
      decision_case_id: caseId,
      request_title: decisionCase.request_title,
      hxos_recommendation: decisionCase.recommendation,
      human_decision: decision,
      notes: notes || null,
      decided_by: access.userId,
      boundary:
        "This decision records approval of the evaluation/pilot step only. It does not authorize contracts, payments, bulk orders, or publication.",
    },
  });

  revalidatePath("/command-center/decisions");
  revalidatePath("/command-center/approvals");
}