import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../../components/SiteHeader";
import { SiteFooter } from "../../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";

export const metadata: Metadata = { title: "SOP Detail | Hands Gifted Command Center", robots: { index: false, follow: false } };

type Step = { step?: number; instruction?: string; assistant_tip?: string };
type JsonMap = Record<string, unknown>;

function asMap(value: unknown): JsonMap {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonMap) : {};
}

export default async function SopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let state: "config" | "signed_out" | "denied" | "ready" = "signed_out";
  let sop: any = null;
  let zoneName = "Household SOP";

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) state = "signed_out";
    else {
      const { data: memberships } = await supabase.from("organization_members").select("organization_id,role").eq("user_id", auth.user.id);
      const membership = memberships?.find((row) => ["owner", "admin", "staff"].includes(String(row.role)));
      if (!membership) state = "denied";
      else {
        const { data } = await supabase
          .from("household_sops")
          .select("id,zone_id,title,steps,age_versions,safety_notes,scripture_reference,active")
          .eq("organization_id", membership.organization_id)
          .eq("id", id)
          .eq("active", true)
          .maybeSingle();
        if (!data) notFound();
        sop = data;
        state = "ready";
        if (data.zone_id) {
          const { data: zone } = await supabase.from("household_zones").select("name").eq("organization_id", membership.organization_id).eq("id", data.zone_id).maybeSingle();
          if (zone?.name) zoneName = zone.name;
        }
      }
    }
  } catch {
    state = "config";
  }

  const steps = Array.isArray(sop?.steps) ? (sop.steps as Step[]) : [];
  const ages = asMap(sop?.age_versions);
  const rules = Array.isArray(ages.rules) ? ages.rules.filter((item): item is string => typeof item === "string") : [];
  const ageLabels: Array<[string, string]> = [["elementary", "Elementary"], ["older_child", "Older child"], ["teen", "Teen"]];

  return <main><SiteHeader/>
    <section className="inner-hero"><span>PRIVATE · {zoneName.toUpperCase()}</span><h1>{sop?.title ?? "SOP"}</h1><p>Current live procedure from the Hands Gifted family operating system.</p><div className="hero-actions"><a className="button gold" href="/command-center/sops">Back to SOP Resource Center</a><a className="button" href="/family/academy/resources">Academy Resource View</a></div></section>
    <section className="section">
      {state !== "ready" ? <div className="access-note"><strong>{state === "signed_out" ? "AUTH REQUIRED" : state === "denied" ? "ACCESS DENIED" : "PARTIAL — Supabase runtime unavailable"}</strong></div> : <>
        <div className="detail-grid">
          <article><span>ZONE</span><h3>{zoneName}</h3><p>This is the operating area linked to this SOP.</p></article>
          <article><span>STEPS</span><h3>{steps.length}</h3><p>Current ordered procedure steps.</p></article>
          <article><span>ACADEMY</span><h3>{Object.keys(ages).length ? "Age adapted" : "Standard only"}</h3><p>Age guidance is used when this SOP is surfaced to children.</p></article>
          <article><span>STATUS</span><h3>Active</h3><p>Only active production records are exposed here.</p></article>
        </div>
        {sop.safety_notes ? <div className="access-note" style={{marginTop:32}}><strong>Safety boundary</strong><p>{sop.safety_notes}</p></div> : null}
        {sop.scripture_reference ? <div className="access-note" style={{marginTop:16}}><strong>Scripture reference</strong><p>{sop.scripture_reference}</p></div> : null}

        <div className="section-heading left" style={{marginTop:48}}><span>Procedure</span><h2>Do the work in order.</h2></div>
        <div className="detail-grid" style={{marginTop:24}}>{steps.map((step, index)=><article key={`${step.step ?? index}-${index}`}><span>STEP {step.step ?? index + 1}</span><h3>{step.instruction ?? "Procedure step"}</h3>{step.assistant_tip ? <p><strong>Help:</strong> {step.assistant_tip}</p> : null}</article>)}</div>

        {rules.length ? <><div className="section-heading left" style={{marginTop:48}}><span>Rules</span><h2>Standards that apply every time.</h2></div><div className="detail-grid" style={{marginTop:24}}>{rules.map((rule)=><article key={rule}><h3>{rule}</h3></article>)}</div></> : null}

        <div className="section-heading left" style={{marginTop:48}}><span>Age-adapted Academy guidance</span><h2>Same standard, appropriate responsibility.</h2></div>
        <div className="detail-grid" style={{marginTop:24}}>{ageLabels.map(([key,label])=>{const value=ages[key];return typeof value === "string" ? <article key={key}><span>{label}</span><h3>{value}</h3></article> : null;})}</div>
      </>}
    </section><SiteFooter/></main>;
}
