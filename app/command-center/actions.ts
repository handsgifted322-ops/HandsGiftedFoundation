"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { getCommandAccess } from "./_lib/access";

const areas=new Set(["household_operations","children_school","family_calendar","housing_stability","transportation_work","assistance_case_management","faith_family_rhythm","family_academy","hands_gifted_ceo","projects_rd","private_owner_records","sop_routines","waiting_followup","approvals","system_health","general"]);
const privacyLevels=new Set(["internal","private","owner_only"]);
const priorities=new Set(["low","normal","medium","high","urgent"]);

export async function captureWork(formData:FormData){
  const title=String(formData.get("title")??"").trim();
  if(!title||title.length>240) return;
  const rawArea=String(formData.get("area")??"general");
  const rawPrivacy=String(formData.get("privacy")??"private");
  const rawPriority=String(formData.get("priority")??"normal");
  const dueRaw=String(formData.get("due_at")??"").trim();
  const area=areas.has(rawArea)?rawArea:"general";
  const privacy=privacyLevels.has(rawPrivacy)?rawPrivacy:"private";
  const priority=priorities.has(rawPriority)?rawPriority:"normal";
  const dueAt=dueRaw?new Date(dueRaw+"T12:00:00").toISOString():null;

  const access=await getCommandAccess();
  if(access.state!=="ready") return;
  const supabase=await createSupabaseServerClient();

  const {data:task,error}=await supabase.from("tasks").insert({
    organization_id:access.organizationId,
    title,
    description:"Captured from Command Center Inbox. Route: "+area.replaceAll("_"," ")+"; privacy: "+privacy+".",
    status:"todo",
    priority,
    assigned_to:access.userId,
    due_at:dueAt
  }).select("id").single();

  if(error||!task) return;

  await supabase.from("project_context_entries").insert({
    organization_id:access.organizationId,
    area,
    title,
    summary:"Command Center capture routed to "+area.replaceAll("_"," ")+".",
    source_type:"command_center_capture",
    source_ref:task.id,
    maturity:"captured",
    confidentiality:privacy,
    approval_status:"needs_triage",
    metadata:{priority,due_at:dueAt}
  });

  revalidatePath("/command-center/dashboard");
  revalidatePath("/command-center/inbox");
  revalidatePath("/command-center/family-operations");
  revalidatePath("/command-center/family-stability");
  revalidatePath("/command-center/private-records");
}
