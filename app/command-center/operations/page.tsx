import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata:Metadata={title:"Operations | Hands Gifted Command Center",robots:{index:false,follow:false}};

const modules=[['Tasks','tasks'],['Programs','programs'],['Projects','projects'],['Events','events'],['Grant Opportunities','grant_opportunities'],['Grant Projects','grant_projects'],['Household Needs','household_needs'],['School Records','school_records'],['Partner Family Applications','partner_family_applications'],['Signals / Knowledge','operating_knowledge']];
const focusStates=['ACTIVE BUSINESS','INTERNAL R&D','FUTURE ROADMAP'] as const;
type InitiativeState=(typeof focusStates)[number];
type InitiativeRow={id:string;name:string;initiative_state:InitiativeState|null};

export default async function OperationsPage(){
 let state:"config"|"signed_out"|"denied"|"ready"="signed_out";
 let counts:Record<string,number>={};
 let initiatives:InitiativeRow[]=[];
 try{
  const supabase=await createSupabaseServerClient();
  const {data:auth}=await supabase.auth.getUser();
  if(!auth.user)state="signed_out";
  else{
   const {data:memberships}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",auth.user.id);
   const m=memberships?.find(r=>["owner","admin","staff"].includes(String(r.role)));
   if(!m)state="denied";
   else{
    state="ready";
    const [rs,initiativeResult]=await Promise.all([
     Promise.all(modules.map(async([,t])=>{const {count}=await supabase.from(t).select("*",{count:"exact",head:true}).eq("organization_id",m.organization_id);return[t,count??0] as const;})),
     supabase.from("projects").select("id,name,initiative_state").eq("organization_id",m.organization_id).not("initiative_state","is",null).order("name")
    ]);
    counts=Object.fromEntries(rs);
    initiatives=(initiativeResult.data??[]) as InitiativeRow[];
   }
  }
 }catch{state="config"}

 return <main><SiteHeader/>
  <section className="inner-hero"><span>Command Center · Operations</span><h1>Operations & Stability</h1><p>Track execution work across tasks, projects, household needs, family administration and Hands Gifted priorities without confusing operational volume with business launch priority.</p></section>
  <section className="section">{state!=="ready"?<div className="access-note"><strong>{state==="signed_out"?"AUTH REQUIRED":state==="denied"?"ACCESS DENIED":"PARTIAL — Supabase runtime unavailable"}</strong></div>:<>
   <div className="section-heading left no-margin"><span>90-day business focus</span><h2>Every business initiative has one priority state.</h2><p>Execution status still tracks whether work is planned, active or complete. Initiative state answers a different question: should this business lane receive launch attention now?</p></div>
   <div className="detail-grid" style={{marginTop:32}}>{focusStates.map(label=>{const items=initiatives.filter(item=>item.initiative_state===label);return <article key={label}><span>{label}</span><h3>{items.length}</h3><p>{items.length?items.map(item=>item.name).join(" · "):"No project is currently classified in this state."}</p></article>})}</div>

   <div className="section-heading left" style={{marginTop:48}}><span>Durable operations</span><h2>Current operational record map</h2><p>Counts come from the production organization and are shown as inventory, not as claims of completion.</p></div>
   <div className="detail-grid" style={{marginTop:32}}>{modules.map(([label,t])=><article key={t}><span>{label}</span><h3>{counts[t]??0}</h3><p>Records currently stored for this operational area.</p></article>)}</div>
  </>}</section><SiteFooter/></main>
}
