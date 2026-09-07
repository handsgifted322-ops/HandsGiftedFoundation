import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = { title: "My Family Dashboard | Hands Gifted", robots: { index: false, follow: false } };

type Assignment = { id:string; title:string; instructions:string|null; assignment_type:string; assignment_date:string; status:string; parent_check_status:string; notes:string|null };
type Rotation = { zone_id:string; next_rotation_on:string };
type Zone = { id:string; name:string; daily_standard:string|null; age_guidance:string|null };
type Sop = { zone_id:string; title:string; steps:unknown; age_versions:Record<string,unknown>|null; safety_notes:string|null; scripture_reference:string|null };

export default async function FamilyDashboardPage(){
  let state:"config"|"signed_out"|"parent"|"child"|"unlinked"="signed_out";
  let name=""; let ageGroup=""; let assignments:Assignment[]=[]; let rotations:Rotation[]=[]; let zones:Zone[]=[]; let sops:Sop[]=[];

  try{
    const supabase=await createSupabaseServerClient();
    const {data:auth}=await supabase.auth.getUser();
    if(auth.user){
      const {data:member}=await supabase.from("household_members").select("id,display_name,age_group,household_role,organization_id").eq("user_id",auth.user.id).eq("is_active",true).maybeSingle();
      if(!member) state="unlinked";
      else if(member.household_role==="parent" || member.household_role==="adult") { state="parent"; name=member.display_name; }
      else {
        state="child"; name=member.display_name; ageGroup=member.age_group;
        const [{data:a},{data:r},{data:z},{data:s}]=await Promise.all([
          supabase.from("household_assignments").select("id,title,instructions,assignment_type,assignment_date,status,parent_check_status,notes").eq("member_id",member.id).order("assignment_date",{ascending:false}).limit(30),
          supabase.from("household_chore_rotation_state").select("zone_id,next_rotation_on").eq("organization_id",member.organization_id).eq("current_member_id",member.id).eq("active",true),
          supabase.from("household_zones").select("id,name,daily_standard,age_guidance").eq("organization_id",member.organization_id).eq("active",true),
          supabase.from("household_sops").select("zone_id,title,steps,age_versions,safety_notes,scripture_reference").eq("organization_id",member.organization_id).eq("active",true)
        ]);
        assignments=(a??[]) as Assignment[]; rotations=(r??[]) as Rotation[]; zones=(z??[]) as Zone[]; sops=(s??[]) as Sop[];
      }
    }
  }catch{state="config"}

  const zoneById=new Map(zones.map(z=>[z.id,z]));
  const sopByZone=new Map(sops.map(s=>[s.zone_id,s]));

  return <main><SiteHeader/><section className="inner-hero"><span>PRIVATE FAMILY DASHBOARD</span><h1>{state==="child"?`${name}'s Dashboard`:"Family Dashboard"}</h1><p>Private household information is available only to the authenticated family member it belongs to.</p></section><section className="section">
    {state==="config"?<div className="access-note"><strong>PARTIAL — Supabase runtime configuration is unavailable.</strong></div>:
    state==="signed_out"?<div className="access-note"><strong>SIGN IN REQUIRED</strong><p>No family names or records are shown without authenticated access.</p><p><a className="button" href="/family">Go to Family Sign In</a></p></div>:
    state==="parent"?<div className="access-note"><strong>Parent account detected.</strong><p>{name}, household management belongs in the protected Parent Command Center.</p><p><a className="button" href="/command-center">Open Parent Command Center</a> <a className="button" href="/family/academy/world">Enter My Academy</a></p></div>:
    state==="unlinked"?<div className="access-note"><strong>ACCOUNT NOT LINKED</strong><p>This account is authenticated but not linked to an active household member. No private records are available.</p><p><a className="button" href="/family">Return to Family Access</a></p></div>:
    <><div className="section-heading left no-margin"><span>{ageGroup.replace("_"," ")} workspace</span><h2>{name}'s active responsibilities</h2><p>Your signed-in account is connected to your own assignments and current chore guides.</p><p><a className="button" href="/family/academy/world">Enter My Academy</a></p></div>{assignments.length?<div className="detail-grid" style={{marginTop:32}}>{assignments.map(a=><article key={a.id}><span>{a.assignment_type}</span><h3>{a.title}</h3><p><strong>Status:</strong> {a.status.replaceAll("_"," ")} · <strong>Mom Check:</strong> {a.parent_check_status.replaceAll("_"," ")}</p>{a.instructions?<p><strong>Instructions:</strong> {a.instructions}</p>:null}{a.notes?<p><strong>Notes / Scripture:</strong> {a.notes}</p>:null}</article>)}</div>:<div className="access-note" style={{marginTop:32}}><strong>No active assignments are showing yet.</strong><p>Your dashboard is connected; new approved responsibilities will appear here.</p></div>}<div className="section-heading left" style={{marginTop:48}}><span>Exact chore guides</span><h2>Current rotation instructions</h2></div>{rotations.length?<div className="detail-grid">{rotations.map(r=>{const z=zoneById.get(r.zone_id);const s=sopByZone.get(r.zone_id);return <article key={r.zone_id}><span>{z?.name??"Chore"}</span><h3>{s?.title??"Instructions"}</h3><p><strong>Rotation review:</strong> {r.next_rotation_on}</p>{z?.daily_standard?<p><strong>Daily standard:</strong> {z.daily_standard}</p>:null}{z?.age_guidance?<p><strong>Age guidance:</strong> {z.age_guidance}</p>:null}{s?.safety_notes?<p><strong>Safety:</strong> {s.safety_notes}</p>:null}{s?.scripture_reference?<p><strong>Scripture:</strong> {s.scripture_reference}</p>:null}</article>})}</div>:<p>No current rotation is assigned to this account.</p>}</>}
  </section><SiteFooter/></main>
}
