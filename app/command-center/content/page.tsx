import type { Metadata } from "next";
import { SiteHeader } from "../../../components/SiteHeader";
import { SiteFooter } from "../../../components/SiteFooter";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { createContentItem } from "./actions";

export const metadata: Metadata = {
  title: "Content Management | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

const steps = ["explore", "learn", "study", "pray", "apply", "create", "serve"] as const;

export default async function CommandCenterContentPage() {
  let signedIn = false;
  let authorized = false;
  let configurationError = false;
  let items: Array<{ id: string; title: string; content_type: string; status: string; metadata: Record<string, unknown> | null; updated_at: string }> = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data: authData } = await supabase.auth.getUser();
    signedIn = Boolean(authData.user);

    if (authData.user) {
      const { data: memberships } = await supabase
        .from("organization_members")
        .select("organization_id, role")
        .eq("user_id", authData.user.id);

      const membership = memberships?.find((row) => ["owner", "admin", "staff"].includes(String(row.role)));
      authorized = Boolean(membership);

      if (membership) {
        const { data } = await supabase
          .from("content_items")
          .select("id, title, content_type, status, metadata, updated_at")
          .eq("organization_id", membership.organization_id)
          .order("updated_at", { ascending: false })
          .limit(30);
        items = (data ?? []) as typeof items;
      }
    }
  } catch {
    configurationError = true;
  }

  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <span>Command Center · Website & Academy</span>
        <h1>Content Management</h1>
        <p>Create once, organize centrally, and control where approved Hands Gifted content appears. This is the first Command Center vertical slice built against real Supabase records rather than placeholder cards.</p>
      </section>

      <section className="section">
        <div className="section-heading left no-margin">
          <span>Reality C.H.E.X. vertical slice</span>
          <h2>Create → Save → Read Back</h2>
          <p>The first target is durable draft content. Publishing to the public Foundation will remain a separate controlled step after authentication and public-read rules are verified.</p>
        </div>

        {configurationError ? (
          <div className="access-note">
            <strong>PARTIAL — Supabase runtime configuration is not available to this deployment.</strong>
            <p>The code path is present, but it will not be classified as working until the deployment exposes the expected public Supabase URL and publishable-key environment names and an authenticated owner session can complete a write/readback test.</p>
          </div>
        ) : !signedIn ? (
          <div className="access-note">
            <strong>AUTH REQUIRED</strong>
            <p>This management surface does not render organization content or permit writes without a signed-in Supabase user.</p>
          </div>
        ) : !authorized ? (
          <div className="access-note">
            <strong>ACCESS DENIED</strong>
            <p>The signed-in account is not currently recognized by RLS as an owner, admin, or staff member for an organization.</p>
          </div>
        ) : (
          <div className="detail-grid" style={{ marginTop: 36 }}>
            <article style={{ gridColumn: "span 1" }}>
              <span>NEW DRAFT</span>
              <h3>Website / Academy content</h3>
              <form action={createContentItem} style={{ display: "grid", gap: 12 }}>
                <label>
                  Title
                  <input name="title" required style={{ width: "100%", padding: 12, marginTop: 6 }} />
                </label>
                <label>
                  Type
                  <select name="content_type" defaultValue="learning" style={{ width: "100%", padding: 12, marginTop: 6 }}>
                    <option value="learning">Learning</option>
                    <option value="study">Bible study</option>
                    <option value="prayer">Prayer</option>
                    <option value="resource">Resource</option>
                    <option value="project">Create / project</option>
                    <option value="outreach">Service / outreach</option>
                  </select>
                </label>
                <label>
                  Audience
                  <select name="audience" defaultValue="public" style={{ width: "100%", padding: 12, marginTop: 6 }}>
                    <option value="public">Foundation public</option>
                    <option value="family">Family Dashboard</option>
                    <option value="internal">Command Center only</option>
                  </select>
                </label>
                <label>
                  Learning step
                  <select name="learning_step" defaultValue="study" style={{ width: "100%", padding: 12, marginTop: 6 }}>
                    {steps.map((step) => <option key={step} value={step}>{step[0].toUpperCase() + step.slice(1)}</option>)}
                  </select>
                </label>
                <label>
                  Content
                  <textarea name="body" rows={8} style={{ width: "100%", padding: 12, marginTop: 6 }} />
                </label>
                <button className="button" type="submit">Save draft to Supabase</button>
              </form>
            </article>

            <article style={{ gridColumn: "span 2" }}>
              <span>DURABLE READBACK</span>
              <h3>Recent managed content</h3>
              {items.length === 0 ? <p>No content records exist yet. The first successful form submission should appear here after Supabase confirms the insert.</p> : (
                <div style={{ display: "grid", gap: 12 }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ padding: 16, border: "1px solid rgba(55,16,77,.14)", borderRadius: 12 }}>
                      <strong>{item.title}</strong>
                      <p style={{ margin: "6px 0 0" }}>{item.content_type} · {item.status} · {String(item.metadata?.audience ?? "unspecified")}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
