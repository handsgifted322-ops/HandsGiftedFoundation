"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

const allowedRoles = new Set(["owner", "admin", "staff"]);

export async function createContentItem(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    throw new Error("Authentication is required before Command Center content can be changed.");
  }

  const { data: memberships, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", authData.user.id);

  if (membershipError) throw membershipError;

  const membership = memberships?.find((row) => allowedRoles.has(String(row.role)));
  if (!membership) {
    throw new Error("Owner, admin, or staff authorization is required.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const contentType = String(formData.get("content_type") ?? "learning").trim();
  const audience = String(formData.get("audience") ?? "public").trim();
  const learningStep = String(formData.get("learning_step") ?? "study").trim();

  if (!title) throw new Error("A title is required.");

  const { error } = await supabase.from("content_items").insert({
    organization_id: membership.organization_id,
    title,
    body: body || null,
    content_type: contentType,
    status: "draft",
    metadata: {
      audience,
      learning_step: learningStep,
      managed_by: "command_center",
      workflow: "explore_learn_study_pray_apply_create_serve",
    },
  });

  if (error) throw error;

  revalidatePath("/command-center/content");
}
