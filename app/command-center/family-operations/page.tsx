import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export const metadata: Metadata = { title: "Family Operations | Hands Gifted", robots: { index: false, follow: false } };

type Row = Record<string, any>;
const clean = (value: unknown) => String(value ?? "").replaceAll("_", " ");

export default async function FamilyOperationsPage() {
  let state: "signed_out" | "denied" | "ready" | "config" = "signed_out";
  let assignments: Row[] = [], inventory: Row[] = [], events: Row[] = [], notices: Row[] = [], needs: Row[] = [], routines: Row[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) state = "signed_out";
    else {
      const { data: memberships } = await supabase.from("organization_members").select("organization_id,role").eq("user_id", auth.user.id);
      const membership = memberships?.find((r) => ["owner", "admin", "staff"].includes(String(r.role)));
      if (!membership) state = "denied";
      else {
        state = "ready";
        const org = membership.organization_id;
        const now = new Date().toISOString();
        const results = await Promise.all([
          supabase.from("household_assignments").select("id,title,status,parent_check_status,assignment_date").eq("organization_id", org).neq("parent_check_status", "pass").order("assignment_date", { ascending: false }).limit(6),
          supabase.from("household_inventory").select("id,item_name,status,quantity,unit,storage_location").eq("organization_id", org).in("status", ["low", "out", "need", "replace", "repair"]).limit(6),
          supabase.from("events").select("id,title,event_type,starts_at,location").eq("organization_id", org).gte("starts_at", now).order("starts_at", { ascending: true }).limit(6),
          supabase.from("household_advance_notices").select("id,title,request_type,needed_at,status").eq("organization_id", org).not("status", "in", "(completed,cancelled)").limit(6),
          supabase.from("household_needs").select("id,title,category,status,priority,needed_by").eq("organization_id", org).not("status", "in", "(completed,declined)").limit(6),
          supabase.from("household_routines").select("id,routine_name,start_time,instruction").eq("organization_id", org).eq("active", true).limit(8),
        ]);
        [assignments, inventory, events, notices, needs, routines] = results.map((r) => r.data ?? []);
      }
    }
  } catch { state = "config"; }

  const attention = assignments.length + inventory.length + notices.length + needs.length;
  const first = (rows: Row[]) => rows[0];

  return <main><SiteHeader />
    <section className="inner-hero"><span>PRIVATE · FAMILY OPERATIONS</span><h1>Run the household from one place.</h1><p>Routines, chores, inventory alerts, schedule items, advance planning and stability needs in one parent-controlled view.</p><div className="hero-actions"><a className="button gold" href="/command-center/household">Review Household</a><a className="button" href="/command-center/assignments">Assign a Task</a></div></section>
    <section className="section">
      {state !== "ready" ? <div className="access-note"><strong>{state === "signed_out" ? "AUTH REQUIRED" : state === "denied" ? "ACCESS DENIED" : "PARTIAL — Supabase unavailable"}</strong><p>Protected family records remain hidden unless an authorized parent/operator is signed in.</p></div> : <>
        <div className="detail-grid">
          <article><span>ATTENTION</span><h3>{attention}</h3><p>Household checks, inventory alerts, advance notices and family needs.</p></article>
          <article><span>UPCOMING</span><h3>{events.length}</h3><p>Upcoming events currently stored in the family system.</p></article>
          <article><span>ROUTINES</span><h3>{routines.length}</h3><p>Active routine steps loaded into this view.</p></article>
          <article><span>INVENTORY ALERTS</span><h3>{inventory.length}</h3><p>Items marked low, out, needed, replace or repair.</p></article>
        </div>
        <div className="section-heading left" style={{marginTop:48}}><span>Household attention queue</span><h2>Handle what affects the family first.</h2></div>
        <div className="detail-grid" style={{marginTop:24}}>
          <article><span>CHORES / MOM CHECK</span><h3>{first(assignments)?.title ?? "No pending household check"}</h3><p>{first(assignments) ? `${clean(first(assignments).status)} · Mom Check ${clean(first(assignments).parent_check_status)}` : "Nothing is waiting for parent verification."}</p><a className="button" href="/command-center/household">Open household control</a></article>
          <article><span>INVENTORY / RESTOCK</span><h3>{first(inventory)?.item_name ?? "Inventory is ready to activate"}</h3><p>{first(inventory) ? `${clean(first(inventory).status)}${first(inventory).storage_location ? ` · ${first(inventory).storage_location}` : ""}` : "The existing inventory table will power Use First and restock."}</p></article>
          <article><span>ADVANCE NOTICE</span><h3>{first(notices)?.title ?? "No advance request is pending"}</h3><p>{first(notices) ? `${clean(first(notices).request_type)} · ${clean(first(notices).status)}` : "Future rides, groceries and errands can be surfaced before they become emergencies."}</p></article>
          <article><span>STABILITY / NEEDS</span><h3>{first(needs)?.title ?? "No active need in this queue"}</h3><p>{first(needs) ? `${clean(first(needs).category)} · ${clean(first(needs).priority)}` : "No current need is visible."}</p><a className="button" href="/command-center/operations">Open stability work</a></article>
        </div>
        <div className="section-heading left" style={{marginTop:48}}><span>Next build</span><h2>Connect the remaining household systems.</h2></div>
        <div className="detail-grid" style={{marginTop:24}}>
          <article><span>SHARED LISTS</span><h3>Shopping, errands and restock</h3><p>One reusable list engine for grocery, school, cleaning, Sabbath/feast, garden, clothing and household needs.</p></article>
          <article><span>KITCHEN</span><h3>Inventory → Use First → Meals → Shopping</h3><p>Plan from what is already in the home and add only genuine gaps to the shopping list.</p></article>
          <article><span>NEXT EVENT</span><h3>{first(events)?.title ?? "No upcoming event stored yet"}</h3><p>{first(events)?.starts_at ? new Date(first(events).starts_at).toLocaleString() : "Calendar data will appear here as events are connected."}</p></article>
          <article><span>ROUTINE</span><h3>{first(routines)?.routine_name ?? "No active routine loaded"}</h3><p>{first(routines)?.instruction ?? "Family routines will appear here once active."}</p></article>
        </div>
      </>}
    </section><SiteFooter /></main>;
}
