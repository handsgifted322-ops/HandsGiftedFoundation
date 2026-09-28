import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import { recordDecision } from "./actions";
import shell from "../command-center.module.css";
import styles from "./decision-center.module.css";

export const metadata: Metadata = {
  title: "HXOS Decision Center | Hands Gifted",
  robots: { index: false, follow: false },
};

type DecisionCase = {
  id: string;
  request_title: string;
  subject_type: string;
  status: string;
  recommendation: string | null;
  score: number | null;
  confidence: number | string | null;
  rationale: unknown;
  risk_flags: unknown;
  required_next_actions: unknown;
  automation_scope: unknown;
  human_approval_required: boolean;
  human_decision: string | null;
  human_decision_notes: string | null;
  decided_at: string | null;
  created_at: string;
  updated_at: string;
};

function arrayOfObjects(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object")) : [];
}

function fmt(value: string | null) {
  if (!value) return "Not yet";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function pretty(value: string | null | undefined) {
  if (!value) return "Pending";
  return value.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function percent(value: number | string | null) {
  const n = Number(value ?? 0);
  return Math.round(n * 100);
}

export default async function DecisionsPage({ searchParams }: { searchParams: Promise<{ context?: string; case?: string }> }) {
  const params = await searchParams;
  const context = normalizeContext(params.context);
  const access = await getCommandAccess();

  if (access.state !== "ready") {
    const m = accessMessage(access.state);
    return <CommandCenterShell active="decisions" context={context}><section className={shell.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("hxos_decision_cases")
    .select("id,request_title,subject_type,status,recommendation,score,confidence,rationale,risk_flags,required_next_actions,automation_scope,human_approval_required,human_decision,human_decision_notes,decided_at,created_at,updated_at")
    .eq("organization_id", access.organizationId)
    .order("created_at", { ascending: false })
    .limit(25);

  const cases = (data ?? []) as DecisionCase[];
  const selected = cases.find((item) => item.id === params.case) ?? cases[0] ?? null;

  const rationale = selected ? arrayOfObjects(selected.rationale) : [];
  const risks = selected ? arrayOfObjects(selected.risk_flags) : [];
  const nextActions = selected ? arrayOfObjects(selected.required_next_actions) : [];
  const automation = selected && selected.automation_scope && typeof selected.automation_scope === "object"
    ? selected.automation_scope as Record<string, unknown>
    : {};
  const automated = Array.isArray(automation.hxos_may_automate) ? automation.hxos_may_automate.map(String) : [];
  const humanRequired = Array.isArray(automation.human_approval_required) ? automation.human_approval_required.map(String) : [];

  const canDecide = ["owner","admin"].includes(access.role);
  const rightRail = selected ? <div className={styles.railStack}>
    <div className={shell.detailCard}>
      <h3>Decision authority</h3>
      <p><strong>HXOS advises. Shayla decides.</strong> Brandon is only brought in for technical or explicitly delegated work.</p>
    </div>
    <div className={shell.detailCard}>
      <h3>Approval boundary</h3>
      <p>Approving a pilot records permission to continue research/testing. It does not approve a supplier contract, payment, bulk order, retail price, or public launch.</p>
    </div>
  </div> : undefined;

  return <CommandCenterShell active="decisions" context={context} rightRail={rightRail}>
    <div className={shell.pageTitle}>
      <div className={shell.eyebrow}>HXOS decision support</div>
      <h1>Decision Center</h1>
      <p>Evidence, risk flags and recommended next actions come here for human review before Hands Gifted commits money, contracts, production or publication.</p>
    </div>

    {error ? <div className={styles.noticeError}>Decision records could not be loaded: {error.message}</div> : null}

    <section className={styles.topGrid}>
      <article className={styles.summaryCard}><span>Open cases</span><strong>{cases.filter((c) => !c.human_decision).length}</strong><small>Awaiting a human decision</small></article>
      <article className={styles.summaryCard}><span>Latest recommendation</span><strong>{selected?.recommendation ?? "—"}</strong><small>Advisory only</small></article>
      <article className={styles.summaryCard}><span>Decision score</span><strong>{selected?.score ?? "—"}</strong><small>Model/rule score, not an automatic approval</small></article>
      <article className={styles.summaryCard}><span>Evidence confidence</span><strong>{selected ? percent(selected.confidence) + "%" : "—"}</strong><small>Higher means more supplier evidence is verified</small></article>
    </section>

    <div className={styles.layout}>
      <section className={styles.caseList} aria-label="HXOS decision cases">
        <div className={styles.listHead}><strong>Decision cases</strong><span>{cases.length}</span></div>
        {cases.length ? cases.map((item) => <Link
          key={item.id}
          href={"/command-center/decisions?case=" + item.id + (context !== "all" ? "&context=" + context : "")}
          className={styles.caseItem + (selected?.id === item.id ? " " + styles.caseItemActive : "")}
        >
          <span className={styles.caseStatus}>{pretty(item.status)}</span>
          <strong>{item.request_title}</strong>
          <small>{item.recommendation ?? "No recommendation"} · {fmt(item.created_at)}</small>
        </Link>) : <div className={styles.empty}>No HXOS decision cases yet.</div>}
      </section>

      <section className={styles.detail}>
        {!selected ? <div className={styles.empty}>When HXOS evaluates a business or operations decision, it will appear here.</div> : <>
          <div className={styles.hero}>
            <div>
              <span className={styles.kicker}>Recommendation</span>
              <h2>{selected.recommendation ?? "HOLD"}</h2>
              <p>{selected.request_title}</p>
            </div>
            <div className={styles.heroScore}><strong>{selected.score ?? "—"}</strong><span>Decision score</span></div>
          </div>

          <section className={styles.panel}>
            <div className={styles.panelHead}><h3>Why HXOS reached this recommendation</h3><span>{percent(selected.confidence)}% evidence confidence</span></div>
            <div className={styles.reasonList}>
              {rationale.map((item, index) => <div className={styles.reason} key={index}>
                <span>{index + 1}</span>
                <div><strong>{String(item.point ?? "Decision factor")}</strong>{item.leader ? <small>Leading option: {String(item.leader)}{item.score !== undefined && item.score !== null ? " · score " + String(item.score) : ""}</small> : null}</div>
              </div>)}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHead}><h3>Risk flags</h3><span>{risks.length}</span></div>
            {risks.length ? risks.map((risk, index) => <div className={styles.risk} key={index}>
              <strong>{pretty(String(risk.code ?? "risk"))}</strong>
              <p>{String(risk.message ?? (Array.isArray(risk.suppliers) ? "Current evidence is still missing for: " + risk.suppliers.join(", ") : "Review required."))}</p>
            </div>) : <div className={styles.empty}>No risk flags recorded.</div>}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHead}><h3>Required next actions</h3><span>{nextActions.length}</span></div>
            <ol className={styles.actionList}>
              {nextActions.map((item, index) => <li key={index}>{String(item.action ?? "")}</li>)}
            </ol>
          </section>

          <section className={styles.twoCol}>
            <article className={styles.panel}>
              <div className={styles.panelHead}><h3>HXOS may automate</h3></div>
              <ul className={styles.bulletList}>{automated.map((item) => <li key={item}>{pretty(item)}</li>)}</ul>
            </article>
            <article className={styles.panel}>
              <div className={styles.panelHead}><h3>Human approval required</h3></div>
              <ul className={styles.bulletList}>{humanRequired.map((item) => <li key={item}>{pretty(item)}</li>)}</ul>
            </article>
          </section>

          <section className={styles.decisionPanel}>
            <div>
              <span className={styles.kicker}>Human decision</span>
              <h3>{selected.human_decision ? pretty(selected.human_decision) : "Your approval is still open"}</h3>
              <p>{selected.human_decision_notes || "Record the next step without authorizing money or a supplier contract."}</p>
              {selected.decided_at ? <small>Recorded {fmt(selected.decided_at)}</small> : null}
            </div>

            {canDecide ? <form action={recordDecision} className={styles.form}>
              <input type="hidden" name="case_id" value={selected.id} />
              <label htmlFor="decision-notes">Decision note <span>optional</span></label>
              <textarea id="decision-notes" name="notes" placeholder="Example: Approve only the Shopify Collective pilot. No bulk inventory purchase." defaultValue={selected.human_decision_notes ?? ""} />
              <div className={styles.buttonRow}>
                <button className={styles.approve} type="submit" name="decision" value="approve_pilot">Approve Pilot</button>
                <button className={styles.revise} type="submit" name="decision" value="request_revision">Request Revision</button>
                <button className={styles.reject} type="submit" name="decision" value="reject">Reject</button>
              </div>
              <small className={styles.boundary}>Approve Pilot = permission to continue validation/testing only. No contract, payment, bulk order or public launch is authorized.</small>
            </form> : <div className={styles.readOnly}>Your current role can view the recommendation but cannot record the final Hands Gifted decision.</div>}
          </section>
        </>}
      </section>
    </div>
  </CommandCenterShell>;
}