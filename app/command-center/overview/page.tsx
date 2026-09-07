import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = { title: "Command Center Overview | Hands Gifted", robots: { index:false, follow:false } };

type Metric = { label:string; table:string; href:string; description:string };
const metrics:Metric[] = [
  {label:"Tasks",table:"tasks",href:"/command-center/operations",description:"Priorities, follow-up, and execution work"},
  {label:"Programs",table:"programs",href:"/command-center/operations",description:"Hands Gifted programs and development status"},
  {label:"Projects",table:"projects",href:"/command-center/operations",description:"Active build and implementation work"},
  {label:"Website Content",table:"content_items",href:"/command-center/content",description:"Managed Foundation and Academy content"},
  {label:"Academy Assignments",table:"academy_assignments",href:"/command-center/academy",description:"Private learning assignments and review"},
  {label:"Household Assignments",table:"household_assignments",href:"/command-center/household",description:"Family responsibilities and parent checks"},
  {label:"Household Needs",table:"household_needs",href:"/command-center/operations",description:"Stability needs and resource navigation"},
  {label:"Grant Opportunities",table:"grant_opportunities",href:"/command-center/operations",description:"Funding opportunities and grant pipeline"},
  {label:"Events",table:"events",href:"/command-center/operations",description:"Public and internal events"},
  {label:"Products",table:"products",href:"/command-center/resources",description:"Products, resources, and offerings"},
];

export default async function OverviewPage(){
  let state:"config"|"signed_out"|"denied"|"ready"="signed_out";
  let counts:Record<string,number>={};
  try{
    const supabase=await createSupabaseServerClient(); const {data:auth}=await supabase.auth.getUser();
    if(!auth.user) state="signed_out"; else {
      const {data:memberships}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",auth.user.id);
      const m=memberships?.find((r)=>["owner","admin","staff"].includes(String(r.role)));
      if(!m) state="denied"; else { state="ready";
        const results=await Promise.all(metrics.map(async x=>{ const {count}=await supabase.from(x.table).select("*",{count:"exact",head:true}).eq("organization_id",m.organization_id); return [x.table,count??0] as const; }));
        counts=Object.fromEntries(results);
      }
    }
  } catch { state="config"; }
  return <main><SiteHeader/><section className="inner-hero"><span>Private · Parent / Operator</span><h1>Command Center Overview</h1><p>One control plane for Foundation publishing, Family Academy, household operations, resources, projects, funding, events, and system verification.</p></section><section className="section">
    {state!=="ready"?<div className="access-note"><strong>{state==="signed_out"?"AUTH REQUIRED":state==="denied"?"ACCESS DENIED":"PARTIAL — Supabase runtime unavailable"}</strong></div>:
    <><div className="section-heading left no-margin"><span>Live operational map</span><h2>What exists right now</h2><p>These totals are read from the current production Supabase organization. A zero means no durable records are currently visible to this authorized account; it does not get presented as completed work.</p></div><div className="detail-grid" style={{marginTop:32}}>{metrics.map(x=><article key={x.table}><span>{x.label}</span><h3>{counts[x.table]??0}</h3><p>{x.description}</p><a className="button" href={x.href}>Open module</a></article>)}</div></>}
  </section><SiteFooter/></main>
}
