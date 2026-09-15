import type { Metadata } from "next";
import { SiteHeader } from "../../../../components/SiteHeader";
import { SiteFooter } from "../../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Practical Life Resources | Hands Gifted Family Academy",
  robots: { index: false, follow: false },
};

type SopRow = {
  id: string;
  zone_id: string | null;
  title: string;
  steps: unknown;
  age_versions: unknown;
  safety_notes: string | null;
  scripture_reference: string | null;
};
type ZoneRow = { id: string; name: string };
type JsonMap = Record<string, unknown>;
type Step = { step?: number; instruction?: string; assistant_tip?: string };

function asMap(value: unknown): JsonMap {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonMap) : {};
}

function audienceKey(ageGroup: string) {
  const value = ageGroup.toLowerCase();
  if (value.includes("teen")) return "teen";
  if (value.includes("older") || value.includes("middle")) return "older_child";
  return "elementary";
}

export default async function AcademySopResourcesPage() {
  let state: "config" | "signed_out" | "unlinked" | "ready" = "signed_out";
  let learnerName = "Family Learner";
  let householdRole = "child";
  let ageGroup = "elementary";
  let sops: SopRow[] = [];
  let zones: ZoneRow[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) state = "signed_out";
    else {
      const { data: member } = await supabase
        .from("household_members")
        .select("id,display_name,household_role,age_group,organization_id")
        .eq("user_id", auth.user.id)
        .eq("is_active", true)
        .maybeSingle();
      if (!member) state = "unlinked";
      else {
        state = "ready";
        learnerName = member.display_name;
        householdRole = String(member.household_role ?? "child");
        ageGroup = String(member.age_group ?? "elementary");
        const [sopResult, zoneResult] = await Promise.all([
          supabase
            .from("household_sops")
            .select("id,zone_id,title,steps,age_versions,safety_notes,scripture_reference")
            .eq("organization_id", member.organization_id)
            .eq("active", true)
            .order("title", { ascending: true }),
          supabase
            .from("household_zones")
            .select("id,name")
            .eq("organization_id", member.organization_id)
            .eq("active", true),
        ]);
        sops = (sopResult.data ?? []) as SopRow[];
        zones = (zoneResult.data ?? []) as ZoneRow[];
      }
    }
  } catch {
    state = "config";
  }

  const zoneById = new Map(zones.map((zone) => [zone.id, zone.name]));
  const isAdult = householdRole === "parent" || householdRole === "adult";
  const ageKey = audienceKey(ageGroup);

  return <main><SiteHeader/>
    <section className="inner-hero"><span>PRIVATE · FAMILY ACADEMY RESOURCE SHELF</span><h1>Practical Life SOP Library</h1><p>Approved household procedures become practical-life learning resources here. The same live SOP is presented at the responsibility level appropriate for the signed-in family member.</p><div className="hero-actions"><a className="button gold" href="/family/academy/world">Return to Academy World</a><a className="button" href="/family/dashboard">My Family Dashboard</a></div></section>
    <section className="section">
      {state !== "ready" ? <div className="access-note"><strong>{state === "signed_out" ? "SIGN IN REQUIRED" : state === "unlinked" ? "ACCOUNT NOT LINKED" : "PARTIAL — Supabase runtime unavailable"}</strong><p>No private household SOPs are shown without an authenticated, linked family account.</p></div> : <>
        <div className="section-heading left no-margin"><span>{isAdult ? "Adult / parent view" : `${ageGroup.replaceAll("_"," ")} learner view`}</span><h2>{learnerName}&apos;s practical-life resources</h2><p>Use these guides to learn the standard before or during an assigned household responsibility. Completion and parent verification remain in the Family Dashboard and Command Center.</p></div>
        <div className="detail-grid" style={{marginTop:32}}>
          <article><span>AVAILABLE RESOURCES</span><h3>{sops.length}</h3><p>Active SOPs currently approved for authenticated family-member reading.</p></article>
          <article><span>LEARNING MODEL</span><h3>Learn → Practice → Verify</h3><p>The Academy teaches the procedure; the household system records the actual responsibility and Mom Check.</p></article>
          <article><span>SAFETY</span><h3>Stop & ask</h3><p>Safety notes override the task. Children should stop and get an adult when a procedure says adult help is required.</p></article>
          <article><span>ONE SOURCE</span><h3>No duplicate SOPs</h3><p>Academy resources read from the same active SOP records used by the household system.</p></article>
        </div>

        <div className="detail-grid" style={{marginTop:40}}>{sops.map((sop)=>{
          const ages = asMap(sop.age_versions);
          const ageGuidance = isAdult ? null : ages[ageKey];
          const rules = Array.isArray(ages.rules) ? ages.rules.filter((item): item is string => typeof item === "string") : [];
          const steps = Array.isArray(sop.steps) ? (sop.steps as Step[]) : [];
          return <article key={sop.id}>
            <span>{sop.zone_id ? zoneById.get(sop.zone_id) ?? "PRACTICAL LIFE" : "PRACTICAL LIFE"}</span>
            <h3>{sop.title}</h3>
            {!isAdult && typeof ageGuidance === "string" ? <p><strong>Your level:</strong> {ageGuidance}</p> : null}
            {sop.safety_notes ? <p><strong>Safety:</strong> {sop.safety_notes}</p> : null}
            {sop.scripture_reference ? <p><strong>Scripture:</strong> {sop.scripture_reference}</p> : null}
            {rules.length ? <div><strong>Rules</strong><ul>{rules.map((rule)=><li key={rule}>{rule}</li>)}</ul></div> : null}
            <div><strong>Steps</strong><ol>{steps.map((step,index)=><li key={`${sop.id}-${step.step ?? index}`}>{step.instruction ?? `Step ${index + 1}`}</li>)}</ol></div>
          </article>;
        })}</div>
      </>}
    </section><SiteFooter/></main>;
}
