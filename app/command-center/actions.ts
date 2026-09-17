"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { getCommandAccess } from "./_lib/access";

export async function captureWork(formData:FormData){
  const title=String(formData.get("title")??"").trim();
  if(!title||title.length>240) return;
  const access=await getCommandAccess();
  if(access.state!=="ready") return;
  const supabase=await createSupabaseServerClient();
  await supabase.from("tasks").insert({organization_id:access.organizationId,title,description:"Captured from Command Center Inbox; classify and route during triage.",status:"todo",priority:"normal",assigned_to:access.userId});
  revalidatePath("/command-center");
  revalidatePath("/command-center/inbox");
}
