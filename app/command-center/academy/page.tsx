import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata:Metadata={title:"Academy Management | Hands Gifted Command Center",robots:{index:false,follow:false}};

export default async function AcademyManagementPage(){
  let state:"config"|"signed_out"|"denied"|"ready"="signed_out"; let counts:Record<string,number>={}; let assignments:any[]=[];
  try{ const supabase=await createSupabaseServerClient(); const {data:auth}=await supabase.auth.getUser();
    if(!auth.user) state="signed_out"; else { const {data:memberships}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",auth.user.id); const m=memberships?.find(r=>["owner","admin","staff"].includes(String(r.role)));
      if(!m) state="denied"; else { state="ready"; const tables=["academy_tracks","academy_learning_items","academy_assignments","academy_progress","academy_requests","academy_assessments"];
        const rs=await Promise.all(tables.map(async t=>{const {count}=await supabase.from(t).select("*",{count:"exact",head:true}).eq("organization_id",m.organization_id); return [t,count??0] as const;})); counts=Object.fromEntries(rs);
        const {data}=await supabase.from("academy_assignments").select("id,title,status,priority,due_at,parent_feedback,household_member_id").eq("organization_id",m.organization_id).order("updated_at",{ascending:false}).limit(20); assignments=data??[];
      }} }catch{state="config"}
  const cards=[['Tracks','academy_tracks'],['Learning Items','academy_learning_items'],['Assignments','academy_assignments'],['Progress Records','academy_progress'],['Help Requests','academy_requests'],['Assessments','academy_assessments']];
  return <main><SiteHeader/><section className="inner-hero"><span>Command Center · Academy</span><h1>Family Academy Management</h1><p>Create curriculum, assign learning, review progress, respond to help requests, and keep public Academy material separate from private family learning.</p></section><section className="section">{state!=="ready"?<div className="access-note"><strong>{state==="signed_out"?"AUTH REQUIRED":state==="denied"?"ACCESS DENIED":"PARTIAL — Supabase runtime unavailable"}</strong></div>:<><div className="detail-grid">{cards.map(([label,t])=><article key={t}><span>{label}</span><h3>{counts[t]??0}</h3><p>Durable records currently visible in this Academy module.</p></article>)}</div><div className="section-heading left" style={{marginTop:48}}><span>Recent assignment work</span><h2>Assignments and parent review</h2></div><div className="detail-grid">{assignments.length===0?<article><h3>No Academy assignments yet</h3><p>The curriculum structure exists, but no visible assignments are currently stored for this organization.</p></article>:assignments.map(a=><article key={a.id}><span>{String(a.status).replaceAll('_',' ')}</span><h3>{a.title}</h3><p><strong>Priority:</strong> {a.priority??'—'} · <strong>Due:</strong> {a.due_at??'No due date'}</p>{a.parent_feedback?<p><strong>Parent feedback:</strong> {a.parent_feedback}</p>:null}</article>)}</div></>}</section><SiteFooter/></main>
}
