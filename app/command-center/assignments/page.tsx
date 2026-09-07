import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { createHouseholdAssignment } from "./actions";

export const metadata: Metadata = { title: "Assign Tasks | Hands Gifted Command Center", robots: { index: false, follow: false } };

type Member = { id:string; display_name:string; household_role:string };
type Assignment = { id:string; title:string; assignment_date:string; assignment_type:string; status:string; parent_check_status:string; member_id:string };

export default async function AssignmentsPage(){
  let state:"config"|"signed_out"|"denied"|"ready"="signed_out";
  let members:Member[]=[]; let assignments:Assignment[]=[];
  try{
    const supabase=await createSupabaseServerClient();
    const {data:auth}=await supabase.auth.getUser();
    if(!auth.user) state="signed_out"; else {
      const {data:memberships}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",auth.user.id);
      const membership=memberships?.find(r=>["owner","admin","staff"].includes(String(r.role)));
      if(!membership) state="denied"; else {
        state="ready";
        const [{data:m},{data:a}]=await Promise.all([
          supabase.from("household_members").select("id,display_name,household_role").eq("organization_id",membership.organization_id).eq("is_active",true).order("display_name"),
          supabase.from("household_assignments").select("id,title,assignment_date,assignment_type,status,parent_check_status,member_id").eq("organization_id",membership.organization_id).order("assignment_date",{ascending:false}).limit(20)
        ]);
        members=(m??[]) as Member[]; assignments=(a??[]) as Assignment[];
      }
    }
  }catch{state="config"}
  const memberById=new Map(members.map(m=>[m.id,m.display_name]));

  return <main><SiteHeader/><section className="inner-hero"><span>Command Center · Parent Action</span><h1>Assign a Task</h1><p>Create a real household assignment for a child. It saves to Supabase and then appears in the parent queue.</p></section><section className="section">
    {state!=="ready"?<div className="access-note"><strong>{state==="signed_out"?"AUTH REQUIRED":state==="denied"?"ACCESS DENIED":"PARTIAL — Supabase runtime unavailable"}</strong></div>:
    <><div className="detail-grid"><article><h3>New assignment</h3><form action={createHouseholdAssignment} className="form-stack"><label>Assign to<select name="member_id" required defaultValue=""><option value="" disabled>Select a child</option>{members.filter(m=>m.household_role==="child").map(m=><option key={m.id} value={m.id}>{m.display_name}</option>)}</select></label><label>Task title<input name="title" required placeholder="Example: Kitchen Reset"/></label><label>Type<select name="assignment_type" defaultValue="chore"><option value="chore">Chore</option><option value="routine">Routine</option><option value="school">School</option><option value="sabbath">Sabbath</option><option value="kitchen">Kitchen</option><option value="laundry">Laundry</option><option value="goal">Goal</option><option value="appointment">Appointment</option><option value="other">Other</option></select></label><label>Date<input type="date" name="assignment_date" required/></label><label>Instructions<textarea name="instructions" rows={5} placeholder="What should they do?"/></label><label>Notes / Scripture<textarea name="notes" rows={3}/></label><button className="button gold" type="submit">Assign Task</button></form></article><article><span>HOW IT WORKS</span><h3>Parent creates → child receives → parent checks</h3><p>New assignments begin as not started and not checked. Children should not be able to mark their own work as Pass or Redo; that remains a parent review decision.</p></article></div><div className="section-heading left" style={{marginTop:48}}><span>Recent assignments</span><h2>Durable readback</h2></div><div className="detail-grid">{assignments.map(a=><article key={a.id}><span>{a.assignment_type}</span><h3>{a.title}</h3><p><strong>{memberById.get(a.member_id)??"Household member"}</strong> · {a.assignment_date}</p><p>Status: {a.status.replaceAll("_"," ")} · Parent check: {a.parent_check_status.replaceAll("_"," ")}</p></article>)}</div></>}
  </section><SiteFooter/></main>
}
