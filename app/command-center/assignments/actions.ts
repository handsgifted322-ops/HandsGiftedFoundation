"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

const allowedTypes = new Set(["chore","kitchen","routine","school","appointment","sabbath","laundry","goal","other"]);

export async function createHouseholdAssignment(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Authentication required");

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", auth.user.id);
  const membership = memberships?.find((row) => ["owner", "admin", "staff"].includes(String(row.role)));
  if (!membership) throw new Error("Not authorized");

  const memberId = String(formData.get("member_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const instructions = String(formData.get("instructions") ?? "").trim();
  const assignmentDate = String(formData.get("assignment_date") ?? "");
  const assignmentType = String(formData.get("assignment_type") ?? "other");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!memberId || !title || !assignmentDate) throw new Error("Child, title, and date are required");
  if (!allowedTypes.has(assignmentType)) throw new Error("Invalid assignment type");

  const { data: member } = await supabase
    .from("household_members")
    .select("id")
    .eq("id", memberId)
    .eq("organization_id", membership.organization_id)
    .eq("is_active", true)
    .maybeSingle();
  if (!member) throw new Error("Household member not found");

  const { error } = await supabase.from("household_assignments").insert({
    organization_id: membership.organization_id,
    member_id: memberId,
    assignment_date: assignmentDate,
    title,
    instructions: instructions || null,
    assignment_type: assignmentType,
    status: "not_started",
    parent_check_status: "not_checked",
    notes: notes || null,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/command-center");
  revalidatePath("/command-center/assignments");
  revalidatePath("/family");
}
