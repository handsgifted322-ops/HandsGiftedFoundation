import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = { title: "My Family Dashboard | Hands Gifted", robots: { index: false, follow: false } };

const childNames: Record<string,string> = { isayah:"Isayah", caleb:"Caleb", amiyah:"Amiyah", kaliyah:"Kaliyah", ayahnna:"Ayahnna" };
type Assignment = { id:string; title:string; instructions:string|null; assignment_type:string; assignment_date:string; status:string; parent_check_status:string; notes:string|null };
type Rotation = { zone_id:string; next_rotation_on:string };
type Zone = { id:string; name:string; daily_standard:string|null; age_guidance:string|null };
type Sop = { zone_id:string; title:string; steps:unknown; age_versions:Record<string,unknown>|null; safety_notes:string|null; scripture_reference:string|null };

export default async function FamilyDashboardPage({ searchParams }:{ searchParams:Promise<{child?:string}> }){
  const params = await searchParams;
  const selectedSlug = String(params.child ?? "").toLowerCase();
  const selectedName = childNames[selectedSlug] ?? "";
  let state:"config"|"guest"|"parent"|"child"|"unlinked"="guest";
  let name=selectedName; let ageGroup=""; let assignments:Assignment[]=[]; let rotations:Rotation[]=[]; let zones:Zone[]=[]; let sops:Sop[]=[];

  try{
    const supabase=await createSupabaseServerClient();
    const {data:auth}=await supabase.auth.getUser();
    if(auth.user){
      const {data:member}=await supabase.from("household_members").select("id,display_name,age_group,household_role,organization_id").eq("user_id",auth.user.id).eq("is_active",true).maybeSingle();
      if(!member) state="unlinked";
      else if(member.household_role==="parent") { state="parent"; name=member.display_name; }
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

  return <main><SiteHeader/><section className="inner-hero"><span>Family Dashboard</span><h1>{name?`${name}'s Dashboard`:"Choose Your Name"}</h1><p>Start with your name. Account sign-up can be connected later.</p></section><section className="section">
    {!selectedName && state==="guest"?<div className="access-note"><strong>Choose a child name first.</strong><p><a className="button" href="/family">Back to names</a></p></div>:
    state==="config"?<div className="access-note"><strong>PARTIAL — Supabase runtime configuration is unavailable.</strong></div>:
    state==="parent"?<div className="access-note"><strong>Parent account detected.</strong><p>{name}, household management belongs in the Command Center.</p><a className="button" href="/command-center/household">Open Household Control</a></div>:
    state==="unlinked"?<div className="access-note"><strong>ACCOUNT NOT LINKED</strong><p>The selected dashboard shell works now; private data will appear after account access is connected.</p></div>:
    state==="guest"?<><div className="section-heading left no-margin"><span>Child workspace</span><h2>Hi, {selectedName}.</h2><p>This first version only identifies whose dashboard is open. No sign-up is required yet.</p></div><div className="detail-grid" style={{marginTop:32}}><article><span>01</span><h3>Today</h3><p>Your daily responsibilities will appear here after the private data connection is turned on.</p></article><article><span>02</span><h3>Chore Instructions</h3><p>Your exact household chore guide, safety rules and Scripture will appear here.</p></article><article><span>03</span><h3>Academy</h3><p>Your assigned learning and practice will appear here.</p></article><article><span>04</span><h3>Mom Check & Help</h3><p>This area will handle Ready for Mom Check, parent feedback and Help requests.</p></article></div><p style={{marginTop:28}}><a className="button" href="/family">Choose a different name</a></p></>:
    <><div className="section-heading left no-margin"><span>{ageGroup.replace("_"," ")} workspace</span><h2>{name}'s active responsibilities</h2><p>The signed-in path now connects real assignments and exact active chore guides by household zone.</p></div><div className="detail-grid" style={{marginTop:32}}>{assignments.map(a=><article key={a.id}><span>{a.assignment_type}</span><h3>{a.title}</h3><p><strong>Status:</strong> {a.status.replaceAll("_"," ")} · <strong>Mom Check:</strong> {a.parent_check_status.replaceAll("_"," ")}</p>{a.instructions?<p><strong>Instructions:</strong> {a.instructions}</p>:null}{a.notes?<p><strong>Notes / Scripture:</strong> {a.notes}</p>:null}</article>)}</div><div className="section-heading left" style={{marginTop:48}}><span>Exact chore guides</span><h2>Current rotation instructions</h2></div><div className="detail-grid">{rotations.map(r=>{const z=zoneById.get(r.zone_id);const s=sopByZone.get(r.zone_id);return <article key={r.zone_id}><span>{z?.name??"Chore"}</span><h3>{s?.title??"Instructions"}</h3><p><strong>Rotation review:</strong> {r.next_rotation_on}</p>{z?.daily_standard?<p><strong>Daily standard:</strong> {z.daily_standard}</p>:null}{z?.age_guidance?<p><strong>Age guidance:</strong> {z.age_guidance}</p>:null}{s?.safety_notes?<p><strong>Safety:</strong> {s.safety_notes}</p>:null}{s?.scripture_reference?<p><strong>Scripture:</strong> {s.scripture_reference}</p>:null}</article>})}</div></>}
  </section><SiteFooter/></main>
}
