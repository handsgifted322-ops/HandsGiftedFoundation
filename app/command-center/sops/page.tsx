import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "SOP Resource Center | Hands Gifted Command Center",
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
  active: boolean;
};

type ZoneRow = { id: string; name: string };

function stepCount(steps: unknown) {
  return Array.isArray(steps) ? steps.length : 0;
}

export default async function SopResourceCenterPage() {
  let state: "config" | "signed_out" | "denied" | "ready" = "signed_out";
  let sops: SopRow[] = [];
  let zones: ZoneRow[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      state = "signed_out";
    } else {
      const { data: memberships } = await supabase
        .from("organization_members")
        .select("organization_id,role")
        .eq("user_id", auth.user.id);
      const membership = memberships?.find((row) => ["owner", "admin", "staff"].includes(String(row.role)));

      if (!membership) {
        state = "denied";
      } else {
        state = "ready";
        const [sopResult, zoneResult] = await Promise.all([
          supabase
            .from("household_sops")
            .select("id,zone_id,title,steps,age_versions,safety_notes,scripture_reference,active")
            .eq("organization_id", membership.organization_id)
            .eq("active", true)
            .order("title", { ascending: true }),
          supabase
            .from("household_zones")
            .select("id,name")
            .eq("organization_id", membership.organization_id)
            .eq("active", true)
            .order("name", { ascending: true }),
        ]);
        sops = (sopResult.data ?? []) as SopRow[];
        zones = (zoneResult.data ?? []) as ZoneRow[];
      }
    }
  } catch {
    state = "config";
  }

  const zoneById = new Map(zones.map((zone) => [zone.id, zone.name]));
  const childReady = sops.filter((sop) => Boolean(sop.age_versions)).length;
  const safetyReady = sops.filter((sop) => Boolean(sop.safety_notes)).length;

  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <span>PRIVATE · COMMAND CENTER RESOURCE</span>
        <h1>SOP Resource Center</h1>
        <p>The Command Center manages the standards. The Dashboard surfaces what needs attention. Family Academy teaches approved, age-appropriate versions from the same operating source.</p>
        <div className="hero-actions">
          <a className="button gold" href="/family/academy/resources">Open Academy Resource View</a>
          <a className="button" href="/command-center/resources">Resources & Media</a>
        </div>
      </section>

      <section className="section">
        {state !== "ready" ? (
          <div className="access-note">
            <strong>{state === "signed_out" ? "AUTH REQUIRED" : state === "denied" ? "ACCESS DENIED" : "PARTIAL — Supabase runtime unavailable"}</strong>
            <p>SOP records remain private and are shown only to an authorized parent/operator.</p>
          </div>
        ) : (
          <>
            <div className="detail-grid">
              <article><span>LIVE SOP RECORDS</span><h3>{sops.length}</h3><p>Active procedures currently stored in the production family database.</p></article>
              <article><span>HOUSEHOLD ZONES</span><h3>{zones.length}</h3><p>Operational areas available for SOP-to-zone mapping.</p></article>
              <article><span>ACADEMY READY</span><h3>{childReady}</h3><p>SOPs with age-adapted guidance available for family learning.</p></article>
              <article><span>SAFETY GUIDANCE</span><h3>{safetyReady}</h3><p>Live SOPs carrying explicit safety notes.</p></article>
            </div>

            <div className="section-heading left" style={{ marginTop: 48 }}>
              <span>Parent SOP governance</span>
              <h2>One source of truth, multiple views.</h2>
              <p>The parent SOP governs how procedures are created, linked, reviewed, corrected and improved. The live database is the execution layer; broader Version 2 source material should be imported only after each SOP is verified and mapped.</p>
            </div>
            <div className="detail-grid" style={{ marginTop: 24 }}>
              <article>
                <span>PARENT SOP</span>
                <h3>SOP FOR CREATING SOP&apos;S</h3>
                <p>Problem areas → rules and procedures → inefficiency/waste review → reasoning → SMART goals → linked SOPs → hazards/financial impacts → continuous improvement.</p>
              </article>
              <article>
                <span>OPERATING LOOP</span>
                <h3>Trigger → SOP → Task → Execute → Record → Verify → Improve</h3>
                <p>The SOP defines the standard. Tasks schedule the work. Evidence and parent review verify completion before the standard is improved.</p>
              </article>
              <article>
                <span>DASHBOARD ROLE</span>
                <h3>Surface attention, not duplicate the library</h3>
                <p>The Family Dashboard should show today&apos;s responsibilities and exact linked guides while the Command Center remains the management surface.</p>
              </article>
              <article>
                <span>ACADEMY ROLE</span>
                <h3>Teach from approved procedures</h3>
                <p>Children receive active, age-appropriate SOP guidance without exposing parent-only operations or private administrative records.</p>
              </article>
            </div>

            <div className="section-heading left" style={{ marginTop: 48 }}>
              <span>Clickable master index · live records</span>
              <h2>Open a procedure</h2>
              <p>This index intentionally shows what is actually stored in the production database rather than labeling unimported source material as live.</p>
            </div>
            {sops.length === 0 ? (
              <div className="access-note"><strong>No active SOP records are currently visible.</strong></div>
            ) : (
              <div className="detail-grid" style={{ marginTop: 24 }}>
                {sops.map((sop) => (
                  <article key={sop.id}>
                    <span>{sop.zone_id ? zoneById.get(sop.zone_id) ?? "HOUSEHOLD SOP" : "HOUSEHOLD SOP"}</span>
                    <h3>{sop.title}</h3>
                    <p><strong>{stepCount(sop.steps)}</strong> procedure steps · {sop.age_versions ? "age-adapted" : "adult/standard view"}{sop.safety_notes ? " · safety guidance" : ""}</p>
                    {sop.scripture_reference ? <p><strong>Scripture:</strong> {sop.scripture_reference}</p> : null}
                    <a className="button" href={`/command-center/sops/${sop.id}`}>Open SOP</a>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
