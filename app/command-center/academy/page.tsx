import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Academy Management | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

type ChildMember = {
  id: string;
  display_name: string;
  age_group: string | null;
};

type SchoolRecord = {
  id: string;
  household_member_id: string | null;
  record_type: string;
  title: string;
  school_name: string | null;
  document_date: string | null;
  source_metadata: unknown;
};

type AcademyAssignment = {
  id: string;
  title: string;
  status: string;
  priority: number | null;
  due_at: string | null;
  parent_feedback: string | null;
  household_member_id: string;
};

type JsonMap = Record<string, unknown>;
type TeacherContact = {
  name?: string;
  role?: string;
  room?: string;
  email?: string;
  school_phone?: string;
  status?: string;
};

function asMap(value: unknown): JsonMap {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonMap) : {};
}

function readText(source: JsonMap, key: string) {
  const value = source[key];
  return typeof value === "string" && value.trim() ? value : null;
}

function readTextList(source: JsonMap, key: string) {
  const value = source[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function readTeacherContacts(source: JsonMap): TeacherContact[] {
  const value = source.teacher_contacts;
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => asMap(entry))
    .map((entry) => ({
      name: readText(entry, "name") ?? undefined,
      role: readText(entry, "role") ?? undefined,
      room: readText(entry, "room") ?? undefined,
      email: readText(entry, "email") ?? undefined,
      school_phone: readText(entry, "school_phone") ?? undefined,
      status: readText(entry, "status") ?? undefined,
    }))
    .filter((entry) => entry.name || entry.email || entry.school_phone);
}

export default async function AcademyManagementPage() {
  let state: "config" | "signed_out" | "denied" | "ready" = "signed_out";
  let counts: Record<string, number> = {};
  let assignments: AcademyAssignment[] = [];
  let children: ChildMember[] = [];
  let schoolRecords: SchoolRecord[] = [];
  let schoolAssignments: AcademyAssignment[] = [];

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
        const organizationId = membership.organization_id;
        const tables = [
          "academy_tracks",
          "academy_learning_items",
          "academy_assignments",
          "academy_progress",
          "academy_requests",
          "academy_assessments",
        ];

        const [countResults, childResult, recentAssignmentsResult, schoolTrackResult] = await Promise.all([
          Promise.all(
            tables.map(async (table) => {
              const { count } = await supabase
                .from(table)
                .select("*", { count: "exact", head: true })
                .eq("organization_id", organizationId);
              return [table, count ?? 0] as const;
            }),
          ),
          supabase
            .from("household_members")
            .select("id,display_name,age_group")
            .eq("organization_id", organizationId)
            .eq("household_role", "child")
            .eq("is_active", true)
            .order("display_name", { ascending: true }),
          supabase
            .from("academy_assignments")
            .select("id,title,status,priority,due_at,parent_feedback,household_member_id")
            .eq("organization_id", organizationId)
            .order("updated_at", { ascending: false })
            .limit(20),
          supabase
            .from("academy_tracks")
            .select("id")
            .eq("organization_id", organizationId)
            .eq("slug", "school-support")
            .eq("active", true)
            .maybeSingle(),
        ]);

        counts = Object.fromEntries(countResults);
        children = (childResult.data ?? []) as ChildMember[];
        assignments = (recentAssignmentsResult.data ?? []) as AcademyAssignment[];

        const childIds = children.map((child) => child.id);
        if (childIds.length > 0) {
          const schoolRecordResult = await supabase
            .from("school_records")
            .select("id,household_member_id,record_type,title,school_name,document_date,source_metadata")
            .in("household_member_id", childIds)
            .order("document_date", { ascending: false })
            .order("updated_at", { ascending: false });
          schoolRecords = (schoolRecordResult.data ?? []) as SchoolRecord[];
        }

        counts.school_records = schoolRecords.length;

        if (schoolTrackResult.data?.id && childIds.length > 0) {
          const schoolAssignmentResult = await supabase
            .from("academy_assignments")
            .select("id,title,status,priority,due_at,parent_feedback,household_member_id")
            .eq("organization_id", organizationId)
            .eq("track_id", schoolTrackResult.data.id)
            .in("household_member_id", childIds)
            .neq("status", "completed")
            .order("priority", { ascending: true })
            .order("updated_at", { ascending: false });
          schoolAssignments = (schoolAssignmentResult.data ?? []) as AcademyAssignment[];
        }
      }
    }
  } catch {
    state = "config";
  }

  const cards: Array<[string, string]> = [
    ["Tracks", "academy_tracks"],
    ["Learning Items", "academy_learning_items"],
    ["Assignments", "academy_assignments"],
    ["Progress Records", "academy_progress"],
    ["Help Requests", "academy_requests"],
    ["Assessments", "academy_assessments"],
    ["School Records", "school_records"],
  ];

  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <span>Command Center · Academy</span>
        <h1>Family Academy Management</h1>
        <p>Create curriculum, assign learning, review progress, respond to help requests, and connect each child&apos;s real school needs to private Family Academy support.</p>
        <div className="hero-actions">
          <a className="button gold" href="/family/academy/world">Enter Academy World</a>
          <a className="button" href="/command-center/operations">System Operations</a>
        </div>
      </section>

      <section className="section">
        {state !== "ready" ? (
          <div className="access-note">
            <strong>{state === "signed_out" ? "AUTH REQUIRED" : state === "denied" ? "ACCESS DENIED" : "PARTIAL — Supabase runtime unavailable"}</strong>
          </div>
        ) : (
          <>
            <div className="detail-grid">
              {cards.map(([label, table]) => (
                <article key={table}>
                  <span>{label}</span>
                  <h3>{counts[table] ?? 0}</h3>
                  <p>Durable records currently visible in this Academy module.</p>
                </article>
              ))}
            </div>

            <div className="section-heading left" style={{ marginTop: 48 }}>
              <span>School → Academy Bridge</span>
              <h2>School tells us what each child needs. Family Academy reinforces it at home.</h2>
              <p>Verified grades, assignments, teacher feedback, pacing information, interventions, testing notices, and school contacts are connected to each child. Missing information stays marked for verification instead of being guessed.</p>
            </div>

            <div className="detail-grid">
              {children.map((child) => {
                const childRecords = schoolRecords.filter((record) => record.household_member_id === child.id);
                const profile = childRecords.find((record) => record.record_type === "school_profile");
                const academicPerformance = childRecords.find((record) => record.record_type === "academic_performance");
                const profileMeta = asMap(profile?.source_metadata);
                const academicMeta = asMap(academicPerformance?.source_metadata);
                const grade = readText(profileMeta, "grade");
                const academyUse = readText(profileMeta, "academy_use");
                const currentSupport = readText(profileMeta, "current_school_support");
                const teacherStatus = readText(profileMeta, "teacher_contact_status");
                const priorities = readTextList(profileMeta, "academic_priority");
                const followups = readTextList(profileMeta, "parent_followup");
                const contacts = readTeacherContacts(profileMeta);
                const academicAction = readText(academicMeta, "academy_action");
                const childSchoolAssignments = schoolAssignments.filter((assignment) => assignment.household_member_id === child.id);
                const schoolName = profile?.school_name ?? childRecords.find((record) => record.school_name)?.school_name ?? "School not yet linked";

                return (
                  <article key={child.id}>
                    <span>{grade ? `${grade} grade` : String(child.age_group ?? "child").replaceAll("_", " ")}</span>
                    <h3>{child.display_name}</h3>
                    <p><strong>School:</strong> {schoolName}</p>
                    {currentSupport ? <p><strong>Current school support:</strong> {currentSupport}</p> : null}
                    {priorities.length > 0 ? <p><strong>Academy priorities:</strong> {priorities.join(" · ")}</p> : null}
                    {academyUse ? <p><strong>Home-learning rule:</strong> {academyUse}</p> : null}
                    {academicPerformance ? <p><strong>Latest performance record:</strong> {academicPerformance.title}{academicPerformance.document_date ? ` · ${academicPerformance.document_date}` : ""}</p> : null}
                    {academicAction ? <p><strong>Academy action:</strong> {academicAction}</p> : null}
                    {contacts.length > 0 ? (
                      <div>
                        <strong>Teacher contacts</strong>
                        <ul>
                          {contacts.map((contact, index) => (
                            <li key={`${child.id}-contact-${index}`}>
                              {[contact.name, contact.role, contact.room ? `Room ${contact.room}` : null, contact.email, contact.school_phone, contact.status].filter(Boolean).join(" · ")}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : teacherStatus ? <p><strong>Teacher contacts:</strong> {teacherStatus}</p> : null}
                    {followups.length > 0 ? (
                      <div>
                        <strong>Parent follow-up</strong>
                        <ul>{followups.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    ) : null}
                    <p><strong>Open School Support Academy assignments:</strong> {childSchoolAssignments.length}</p>
                    {childSchoolAssignments.slice(0, 3).map((assignment) => (
                      <p key={assignment.id}>• {assignment.title} — {String(assignment.status).replaceAll("_", " ")}</p>
                    ))}
                  </article>
                );
              })}
            </div>

            <div className="access-note">
              <strong>Private by design.</strong>
              <p>School details and child-specific learning remain behind authenticated parent/staff access. The public Academy page only explains the program; it does not expose student records.</p>
            </div>

            <div className="section-heading left" style={{ marginTop: 48 }}>
              <span>Recent assignment work</span>
              <h2>Assignments and parent review</h2>
            </div>
            <div className="detail-grid">
              {assignments.length === 0 ? (
                <article>
                  <h3>No Academy assignments yet</h3>
                  <p>The curriculum structure exists, but no visible assignments are currently stored for this organization.</p>
                </article>
              ) : assignments.map((assignment) => (
                <article key={assignment.id}>
                  <span>{String(assignment.status).replaceAll("_", " ")}</span>
                  <h3>{assignment.title}</h3>
                  <p><strong>Priority:</strong> {assignment.priority ?? "—"} · <strong>Due:</strong> {assignment.due_at ?? "No due date"}</p>
                  {assignment.parent_feedback ? <p><strong>Parent feedback:</strong> {assignment.parent_feedback}</p> : null}
                </article>
              ))}
            </div>
          </>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
