"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export async function updateMyAssignmentStatus(formData: FormData) {
  const assignmentId = String(formData.get("assignment_id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!assignmentId || !["working", "ready_for_check"].includes(status)) {
    throw new Error("Invalid assignment action");
  }

  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error("Authentication required");

  const { error } = await supabase.rpc("update_my_household_assignment_status", {
    p_assignment_id: assignmentId,
    p_status: status,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/family/dashboard");
  revalidatePath("/command-center");
  revalidatePath("/command-center/household");
  revalidatePath("/command-center/assignments");
}
