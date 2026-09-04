import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = { title: "My Family Dashboard | Hands Gifted", robots: { index: false, follow: false } };

type Assignment = { id:string; title:string; instructions:string|null; assignment_type:string; assignment_date:string; status:string; parent_check_status:string; notes:string|null; rotation_template_id:string|null };
type Sop = { id:string; zone_id:string; title:string; steps:unknown; age_versions:Record<string,unknown>|null; safety_notes:string|null; scripture_reference:string|null };

export default async function FamilyDashboardPage(){
  let state:"config"|"signed_out"|"parent"|"child"|"unlinked"="signed_out";
  let name=""; let ageGroup=""; let assignments:Assignment[]=[]; let sops:Sop[]=[];
  try{
    const supabase=await createSupabaseServerClient();
    const {data:auth}=await supabase.auth.getUser();
    if(!auth.user) state="signed_out";
    else {
      const {data:member}=await supabase.from("household_members").select("id,display_name,age_group,household_role,organization_id").eq("user_id",auth.user.id).eq("is_active",true).maybeSingle();
      if(!member) state="unlinked";
      else if(member.household_role==="parent") { state="parent"; name=member.display_name; }
      else {
        state="child"; name=member.display_name; ageGroup=member.age_group;
        const [{data:a},{data:s}]=await Promise.all([
          supabase.from("household_assignments").select("id,title,instructions,assignment_type,assignment_date,status,parent_check_status,notes,rotation_template_id").eq("member_id",member.id).order("assignment_date",{ascending:false}).limit(30),
          supabase.from("household_sops").select("id,zone_id,title,steps,age_versions,safety_notes,scripture_reference").eq("organization_id",member.organization_id).eq("active",true)
        ]);
        assignments=(a??[]) as Assignment[]; sops=(s??[]) as Sop[];
      }
    }
  }catch{state="config"}

  return <main><SiteHeader/><section className="inner-hero"><span>Private Family Dashboard</span><h1>{state==="child"?`${name} — Today`:"My Family Dashboard"}</h1><p>Your responsibilities, instructions, Scripture, safety guidance, progress and parent review stay in the private family system.</p></section><section className="section">
    {state==="config"?<div className="access-note"><strong>PARTIAL — Supabase runtime configuration is unavailable.</strong></div>:
    state==="signed_out"?<div className="access-note"><strong>SIGN IN REQUIRED</strong><p>Private family records are never shown without authentication.</p></div>:
    state==="unlinked"?<div className="access-note"><strong>ACCOUNT NOT LINKED</strong><p>Your signed-in account is not yet connected to an active household member.</p></div>:
    state==="parent"?<div className="access-note"><strong>Parent account detected.</strong><p>{name}, household management belongs in the protected Command Center.</p><a className="button" href="/command-center/household">Open Household Control</a></div>:
    <><div className="section-heading left no-margin"><span>{ageGroup.replace("_"," ")} workspace</span><h2>Responsibilities assigned to you</h2><p>Open the instructions, do the work carefully, use the Help guidance when you are stuck, and finish by asking for a parent check.</p></div><div className="detail-grid" style={{marginTop:32}}>{assignments.length===0?<article><h3>No assignments yet</h3><p>Your parent can assign responsibilities from the Command Center.</p></article>:assignments.map(a=><article key={a.id}><span>{a.assignment_type}</span><h3>{a.title}</h3><p><strong>Status:</strong> {a.status.replaceAll("_"," ")} · <strong>Mom Check:</strong> {a.parent_check_status.replaceAll("_"," ")}</p>{a.instructions?<p><strong>Instructions:</strong> {a.instructions}</p>:null}{a.notes?<p><strong>Notes / Scripture:</strong> {a.notes}</p>:null}<details><summary><strong>Need Help? Chore guidance</strong></summary><p>Work one step at a time. Stop and ask your parent whenever something is unsafe, unclear, too heavy, hot, sharp, electrical, chemical, or otherwise outside your age-level instructions.</p><p>{sops.length} household instruction guides are available to this authenticated family account. The next connection will match the exact guide to each assigned zone.</p></details><p><strong>Finish:</strong> When the task is complete, it should move to Ready for Mom Check. Parent approval—not the child—determines Pass or Redo.</p></article>)}</div></>}
  </section><SiteFooter/></main>
}
