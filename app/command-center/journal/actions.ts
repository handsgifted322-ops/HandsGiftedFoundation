"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { getCommandAccess } from "../_lib/access";

export async function saveJournalEntry(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!body || body.length > 12000 || title.length > 180) return;

  const access = await getCommandAccess();
  if (access.state !== "ready" || access.role !== "owner") return;

  const supabase = await createSupabaseServerClient();
  await supabase.from("project_context_entries").insert({
    organization_id: access.organizationId,
    area: "private_owner_records",
    title: title || "Journal entry",
    summary: body,
    source_type: "journal_entry",
    maturity: "conversation",
    confidentiality: "private",
    approval_status: "needs_review",
    metadata: {
      entry_type: "journal",
      private_by_default: true,
      convert_to_task: false
    }
  });

  revalidatePath("/command-center/journal");
  revalidatePath("/command-center/private-records");
  revalidatePath("/command-center/dashboard");
}
