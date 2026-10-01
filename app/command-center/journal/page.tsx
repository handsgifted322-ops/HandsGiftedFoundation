import type { Metadata } from "next";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";
import { saveJournalEntry } from "./actions";

export const metadata: Metadata = {
  title: "Journal | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

type JournalRow = {
  id: string;
  title: string;
  summary: string;
  created_at: string;
};

function fmt(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function JournalPage({ searchParams }: { searchParams: Promise<{ context?: string }> }) {
  const context = normalizeContext((await searchParams).context);
  const access = await getCommandAccess();

  if (access.state !== "ready") {
    const msg = accessMessage(access.state);
    return (
      <CommandCenterShell active="private-records" context={context}>
        <section className={styles.access}>
          <h1>{msg.title}</h1>
          <p>{msg.body}</p>
        </section>
      </CommandCenterShell>
    );
  }

  if (access.role !== "owner") {
    return (
      <CommandCenterShell active="private-records" context={context}>
        <section className={styles.access}>
          <h1>Owner access required</h1>
          <p>The private journal is intentionally restricted to the owner account.</p>
        </section>
      </CommandCenterShell>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("project_context_entries")
    .select("id,title,summary,created_at")
    .eq("organization_id", access.organizationId)
    .eq("source_type", "journal_entry")
    .eq("confidentiality", "private")
    .order("created_at", { ascending: false })
    .limit(30);

  const entries = (data ?? []) as JournalRow[];

  return (
    <CommandCenterShell active="private-records" context={context}>
      <div className={styles.pageTitle}>
        <div className={styles.eyebrow}>Private reflection</div>
        <h1>Journal</h1>
        <p>Write freely. Journal entries stay private by default and do not automatically become tasks, family records, or public Hands Gifted content.</p>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>New entry</h2>
        </div>
        <form action={saveJournalEntry} style={{ display: "grid", gap: 14, maxWidth: 820 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span>Title (optional)</span>
            <input name="title" maxLength={180} placeholder="Today, prayer, reflection, family win..." style={{ padding: 12, borderRadius: 10 }} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span>Write freely</span>
            <textarea name="body" required maxLength={12000} rows={10} placeholder="What happened? What are you thinking about? What did you learn? What needs prayer or attention?" style={{ padding: 12, borderRadius: 10, resize: "vertical" }} />
          </label>
          <div>
            <button type="submit" style={{padding:"12px 18px",borderRadius:10,border:"1px solid rgba(128,128,128,.35)",fontWeight:700,cursor:"pointer"}}>Save private entry</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent entries</h2>
          <span className={styles.count}>{entries.length}</span>
        </div>
        {entries.length ? entries.map((entry) => (
          <article key={entry.id} className={styles.row}>
            <span className={styles.severity + " " + styles.neutral} />
            <div className={styles.rowMain}>
              <div className={styles.rowReason}>{fmt(entry.created_at)} · private journal</div>
              <div className={styles.rowTitle}>{entry.title}</div>
              <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{entry.summary}</p>
            </div>
          </article>
        )) : (
          <div className={styles.empty}>No journal entries yet.</div>
        )}
      </section>
    </CommandCenterShell>
  );
}
