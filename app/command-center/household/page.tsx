import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Household Chores | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

type RotationRow = {
  id: string;
  zone_id: string;
  current_member_id: string;
  hold_weeks: number;
  extension_weeks: number;
  reminder_count: number;
  behavior_review: string | null;
  extension_reason: string | null;
  started_on: string;
  next_rotation_on: string;
};

type MemberRow = { id: string; display_name: string; age_group: string; household_role: string };
type ZoneRow = { id: string; name: string; daily_standard: string | null; age_guidance: string | null };

export default async function HouseholdControlPage() {
  let state: "config" | "signed_out" | "denied" | "ready" = "signed_out";
  let rotations: RotationRow[] = [];
  let members: MemberRow[] = [];
  let zones: ZoneRow[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      state = "signed_out";
    } else {
      const { data: memberships } = await supabase
        .from("organization_members")
        .select("organization_id, role")
        .eq("user_id", authData.user.id);

      const membership = memberships?.find((row) => ["owner", "admin", "staff"].includes(String(row.role)));
      if (!membership) {
        state = "denied";
      } else {
        state = "ready";
        const [rotationResult, memberResult, zoneResult] = await Promise.all([
          supabase
            .from("household_chore_rotation_state")
            .select("id, zone_id, current_member_id, hold_weeks, extension_weeks, reminder_count, behavior_review, extension_reason, started_on, next_rotation_on")
            .eq("organization_id", membership.organization_id)
            .eq("active", true),
          supabase
            .from("household_members")
            .select("id, display_name, age_group, household_role")
            .eq("organization_id", membership.organization_id)
            .eq("is_active", true),
          supabase
            .from("household_zones")
            .select("id, name, daily_standard, age_guidance")
            .eq("organization_id", membership.organization_id)
            .eq("active", true),
        ]);
        rotations = (rotationResult.data ?? []) as RotationRow[];
        members = (memberResult.data ?? []) as MemberRow[];
        zones = (zoneResult.data ?? []) as ZoneRow[];
      }
    }
  } catch {
    state = "config";
  }

  const memberById = new Map(members.map((member) => [member.id, member]));
  const zoneById = new Map(zones.map((zone) => [zone.id, zone]));
  const ordered = [...rotations].sort((a, b) => (zoneById.get(a.zone_id)?.name ?? "").localeCompare(zoneById.get(b.zone_id)?.name ?? ""));

  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <span>Command Center · Private Household</span>
        <h1>Weekly Chore Control</h1>
        <p>Review the current owner of every household zone, the one-week cycle, reminders, behavior review, and any parent-approved extension before the chore rotates to the next child.</p>
      </section>

      <section className="section">
        {state === "config" ? (
          <div className="access-note"><strong>PARTIAL — Supabase runtime configuration is unavailable.</strong></div>
        ) : state === "signed_out" ? (
          <div className="access-note"><strong>AUTH REQUIRED</strong><p>Household records stay hidden until an authorized parent or administrator is signed in.</p></div>
        ) : state === "denied" ? (
          <div className="access-note"><strong>ACCESS DENIED</strong><p>This account is not authorized to manage the household.</p></div>
        ) : (
          <>
            <div className="section-heading left no-margin">
              <span>Parent review model</span>
              <h2>One week by default. Extension only after review.</h2>
              <p>Normal result: rotate. Extension: one additional week when repeated reminders, incomplete work, poor follow-through, or behavior connected to the responsibility requires more practice. A second extra week remains a parent decision.</p>
            </div>

            <div className="detail-grid" style={{ marginTop: 32 }}>
              {ordered.map((rotation) => {
                const member = memberById.get(rotation.current_member_id);
                const zone = zoneById.get(rotation.zone_id);
                return (
                  <article key={rotation.id}>
                    <span>{zone?.name ?? "Household chore"}</span>
                    <h3>{member?.display_name ?? "Unassigned"}</h3>
                    <p><strong>Cycle:</strong> {rotation.hold_weeks} week{rotation.hold_weeks === 1 ? "" : "s"} · next review {rotation.next_rotation_on}</p>
                    <p><strong>Reminders:</strong> {rotation.reminder_count} · <strong>Extension:</strong> {rotation.extension_weeks} extra week{rotation.extension_weeks === 1 ? "" : "s"}</p>
                    {rotation.behavior_review ? <p><strong>Behavior review:</strong> {rotation.behavior_review}</p> : null}
                    {rotation.extension_reason ? <p><strong>Extension reason:</strong> {rotation.extension_reason}</p> : null}
                    {zone?.daily_standard ? <p><strong>Daily standard:</strong> {zone.daily_standard}</p> : null}
                    {zone?.age_guidance ? <p><strong>Age guidance:</strong> {zone.age_guidance}</p> : null}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
