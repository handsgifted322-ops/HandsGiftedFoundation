import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export const metadata: Metadata = { title: "Hands Gifted Command Center", robots: { index:false, follow:false } };

type TaskRow={id:string;title:string;status:string;priority:string|null;due_at:string|null};
type NeedRow={id:string;title:string;category:string;status:string;priority:string|null;needed_by:string|null};
type HouseholdRow={id:string;title:string;status:string;parent_check_status:string;assignment_date:string};
type AcademyRow={id:string;title:string;status:string;due_at:string|null};
type ContentRow={id:string;title:string;status:string;content_type:string};

const quickLinks=[
  ["Assign Task","/command-center/assignments","Create a household assignment for a child and save it to the live family system"],
  ["Household Control","/command-center/household","Chores, routines, parent checks and weekly rotation"],
  ["Family Academy","/command-center/academy","Lessons, assignments, progress and parent feedback"],
  ["Foundation Content","/command-center/content","Draft, organize and publish approved public content"],
  ["Operations & Stability","/command-center/operations","Needs, tasks, school, grants, events and family-support work"],
  ["Resources & Media","/command-center/resources","Products, documents, brand assets and creative resources"],
  ["System Health","/command-center/system-health","Reality C.H.E.X., integrations, sync and deployment state"],
] as const;

export default async function CommandCenterPage(){
  let state:"config"|"signed_out"|"denied"|"ready"="signed_out";
  let tasks:TaskRow[]=[]; let needs:NeedRow[]=[]; let household:HouseholdRow[]=[]; let academy:AcademyRow[]=[]; let drafts:ContentRow[]=[];
  try{
    const supabase=await createSupabaseServerClient();
    const {data:auth}=await supabase.auth.getUser();
    if(!auth.user) state="signed_out";
    else {
      const {data:memberships}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",auth.user.id);
      const membership=memberships?.find((r)=>["owner","admin","staff"].includes(String(r.role)));
      if(!membership) state="denied";
      else {
        state="ready";
        const [t,n,h,a,c]=await Promise.all([
          supabase.from("tasks").select("id,title,status,priority,due_at").eq("organization_id",membership.organization_id).neq("status","complete").order("due_at",{ascending:true,nullsFirst:false}).limit(6),
          supabase.from("household_needs").select("id,title,category,status,priority,needed_by").eq("organization_id",membership.organization_id).neq("status","resolved").order("needed_by",{ascending:true,nullsFirst:false}).limit(6),
          supabase.from("household_assignments").select("id,title,status,parent_check_status,assignment_date").eq("organization_id",membership.organization_id).neq("parent_check_status","pass").order("assignment_date",{ascending:false}).limit(6),
          supabase.from("academy_assignments").select("id,title,status,due_at").eq("organization_id",membership.organization_id).neq("status","complete").order("due_at",{ascending:true,nullsFirst:false}).limit(6),
          supabase.from("content_items").select("id,title,status,content_type").eq("organization_id",membership.organization_id).neq("status","published").order("updated_at",{ascending:false}).limit(6),
        ]);
        tasks=(t.data??[]) as TaskRow[]; needs=(n.data??[]) as NeedRow[]; household=(h.data??[]) as HouseholdRow[]; academy=(a.data??[]) as AcademyRow[]; drafts=(c.data??[]) as ContentRow[];
      }
    }
  }catch{state="config"}

  const attention=tasks.length+needs.length+household.length+academy.length+drafts.length;
  return <main><SiteHeader/>
    <section className="inner-hero"><span>PRIVATE · MOTHER / PARENT OPERATOR</span><h1>What needs my attention today?</h1><p>This Command Center is your working home screen—not a directory. It brings household responsibility, children, Academy, stability work and Foundation administration into one parent-controlled view.</p><div className="hero-actions"><a className="button gold" href="/command-center/assignments">Assign a Task</a><a className="button" href="/command-center/household">Review Household</a></div></section>
    <section className="section">
      {state!=="ready"?<div className="access-note"><strong>{state==="signed_out"?"AUTH REQUIRED":state==="denied"?"ACCESS DENIED":"PARTIAL — Supabase runtime unavailable"}</strong><p>The private Command Center only shows live operational records to an authorized parent/operator.</p></div>:<>
        <div className="detail-grid">
          <article><span>TODAY</span><h3>{attention}</h3><p>Open items across household, Academy, stability, tasks and Foundation content.</p></article>
          <article><span>HOUSEHOLD CHECKS</span><h3>{household.length}</h3><p>Responsibilities that still need completion or parent verification.</p><a className="button" href="/command-center/household">Review household</a></article>
          <article><span>FAMILY NEEDS</span><h3>{needs.length}</h3><p>Unresolved stability or resource needs requiring follow-up.</p><a className="button" href="/command-center/operations">Review needs</a></article>
          <article><span>ACADEMY</span><h3>{academy.length}</h3><p>Learning assignments still active or waiting for completion.</p><a className="button" href="/command-center/academy">Review Academy</a></article>
        </div>
        <div className="section-heading left" style={{marginTop:48}}><span>Parent attention queue</span><h2>Handle the household first, then everything around it.</h2><p>The goal is to see what requires a decision, follow-up, approval, correction or next action without opening six different systems first.</p></div>
        <div className="detail-grid" style={{marginTop:24}}>
          <article><span>HOUSEHOLD / MOM CHECK</span><h3>{household.length?household[0].title:"No pending household checks"}</h3><p>{household.length?`${household[0].status.replaceAll("_"," ")} · parent check ${household[0].parent_check_status.replaceAll("_"," ")}`:"Nothing is currently waiting in this queue."}</p><a className="button" href="/command-center/household">Open household control</a></article>
          <article><span>STABILITY / NEEDS</span><h3>{needs.length?needs[0].title:"No unresolved needs in queue"}</h3><p>{needs.length?`${needs[0].category} · ${needs[0].status}${needs[0].priority?` · ${needs[0].priority}`:""}`:"No current need is visible to this authorized account."}</p><a className="button" href="/command-center/operations">Open stability work</a></article>
          <article><span>TASKS / FOLLOW-UP</span><h3>{tasks.length?tasks[0].title:"No open task in queue"}</h3><p>{tasks.length?`${tasks[0].status}${tasks[0].priority?` · ${tasks[0].priority}`:""}`:"No current task is visible to this authorized account."}</p><a className="button" href="/command-center/operations">Open tasks</a></article>
          <article><span>FOUNDATION / CONTENT</span><h3>{drafts.length?drafts[0].title:"No unpublished content in queue"}</h3><p>{drafts.length?`${drafts[0].content_type} · ${drafts[0].status}`:"Nothing currently waiting for publication review."}</p><a className="button" href="/command-center/content">Open content control</a></article>
        </div>
        <div className="section-heading left" style={{marginTop:48}}><span>Control areas</span><h2>Everything else stays one tap away.</h2></div>
        <div className="detail-grid" style={{marginTop:24}}>{quickLinks.map(([title,href,description])=><article key={href}><h3>{title}</h3><p>{description}</p><a className="button" href={href}>Open</a></article>)}</div>
      </>}
    </section><SiteFooter/></main>
}
