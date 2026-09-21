import { createSupabaseServerClient } from "../../../lib/supabase/server";

export type CommandAccess =
  | { state:"ready"; organizationId:string; userId:string; role:"owner"|"admin"|"staff" }
  | { state:"signed_out"|"denied"|"config" };

export async function getCommandAccess():Promise<CommandAccess>{
  try{
    const supabase=await createSupabaseServerClient();
    const {data:auth}=await supabase.auth.getUser();
    if(!auth.user) return {state:"signed_out"};
    const {data:memberships}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",auth.user.id);
    const membership=memberships?.find((row)=>["owner","admin","staff"].includes(String(row.role)));
    if(!membership) return {state:"denied"};
    return {state:"ready",organizationId:String(membership.organization_id),userId:auth.user.id,role:String(membership.role) as "owner"|"admin"|"staff"};
  }catch{return {state:"config"}}
}

export function accessMessage(state:"signed_out"|"denied"|"config"){
  if(state==="signed_out") return {title:"Sign in required",body:"This is a private operations area. Sign in with an authorized Hands Gifted account to view live records."};
  if(state==="denied") return {title:"Access not authorized",body:"This account does not have an owner, admin, or staff role for the Hands Gifted Command Center."};
  return {title:"Command Center temporarily unavailable",body:"The private data connection could not be established. No private records are being displayed."};
}
