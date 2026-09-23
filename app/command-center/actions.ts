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
  const confidentiality=privacy==="internal"?"internal":"private";
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
    maturity:"conversation",
    confidentiality,
    approval_status:"needs_review",
    metadata:{priority,due_at:dueAt,privacy_scope:privacy}
  });

  revalidatePath("/command-center/dashboard");
  revalidatePath("/command-center/inbox");
  revalidatePath("/command-center/family-operations");
  revalidatePath("/command-center/family-stability");
  revalidatePath("/command-center/private-records");
}


export async function captureWorkspaceItem(formData:FormData){
  const title=String(formData.get("title")??"").trim();
  const notes=String(formData.get("notes")??"").trim();
  const kind=String(formData.get("kind")??"idea");
  const roleValues=formData.getAll("role").map(String).filter(v=>["wife","mother","daughter_of_sarah"].includes(v));
  if(!title||title.length>240||notes.length>12000) return;
  const allowedKinds=new Set(["question","idea","work","research","design","evidence"]);
  const itemKind=allowedKinds.has(kind)?kind:"idea";
  const access=await getCommandAccess();
  if(access.state!=="ready") return;
  const supabase=await createSupabaseServerClient();
  await supabase.from("project_context_entries").insert({
    organization_id:access.organizationId,
    area:"private_owner_records",
    title,
    summary:notes||"Captured in My Hands Gifted workspace.",
    source_type:"v2_workspace_capture",
    source_ref:null,
    maturity:itemKind==="evidence"?"tested":"conversation",
    confidentiality:"private",
    approval_status:"needs_review",
    metadata:{item_kind:itemKind,role_lenses:roleValues,access_scope:"personal",readiness:"captured"}
  });
  revalidatePath("/command-center/workspace");
}


export async function saveAskLearnConversation(payload:{title:string;turns:{role:"user"|"assistant";content:string}[]}){
  const title=String(payload?.title??"").trim().slice(0,240);
  const turns=Array.isArray(payload?.turns)?payload.turns.slice(-20).filter(t=>(t?.role==="user"||t?.role==="assistant")&&typeof t?.content==="string"&&t.content.trim()).map(t=>({role:t.role,content:t.content.trim().slice(0,12000)})):[];
  if(!title||!turns.length) return {ok:false};
  const access=await getCommandAccess();
  if(access.state!=="ready") return {ok:false};
  const supabase=await createSupabaseServerClient();
  const summary=turns.map(t=>`${t.role==="user"?"Question":"Hands Gifted"}: ${t.content}`).join("\n\n").slice(0,12000);
  const {data,error}=await supabase.from("project_context_entries").insert({
    organization_id:access.organizationId,
    area:"private_owner_records",
    title,
    summary,
    source_type:"v2_ask_learn_conversation",
    source_ref:null,
    maturity:"conversation",
    confidentiality:"private",
    approval_status:"needs_review",
    metadata:{item_kind:"research",role_lenses:[],access_scope:"personal",readiness:"captured",conversation_turns:turns}
  }).select("id").single();
  revalidatePath("/command-center/workspace");
  revalidatePath("/command-center/ask-learn");
  return error||!data?{ok:false}:{ok:true,id:String(data.id)};
}
