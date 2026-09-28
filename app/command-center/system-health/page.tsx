import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import shell from "../command-center.module.css";
import styles from "./system-health.module.css";

export const metadata: Metadata = {
  title: "Reality C.H.E.X. | Hands Gifted Command Center",
  robots: { index: false, follow: false },
};

type CheckStatus = "pass" | "attention" | "blocked" | "fail" | "partial";

type VerificationCheck = {
  key?: string;
  label?: string;
  status?: CheckStatus;
  evidence?: string;
};

type VerificationRun = {
  id: string;
  status: CheckStatus;
  source: string;
  source_repo: string | null;
  source_branch: string | null;
  git_sha: string | null;
  vercel_project_id: string | null;
  deployment_id: string | null;
  deployment_url: string | null;
  canonical_domain: string | null;
  checks: unknown;
  summary: unknown;
  runtime_error_count: number | null;
  completed_at: string | null;
  created_at: string;
};

function titleCase(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(value: string | null) {
  if (!value) return "Not completed";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function checksFrom(value: unknown): VerificationCheck[] {
  return Array.isArray(value)
    ? value.filter((item): item is VerificationCheck => Boolean(item && typeof item === "object"))
    : [];
}

function summaryText(value: unknown) {
  if (!value || typeof value !== "object") return "No verification summary recorded.";
  const overall = (value as Record<string, unknown>).overall;
  return typeof overall === "string" ? overall : "No verification summary recorded.";
}

function statusClass(status: CheckStatus | undefined) {
  if (status === "pass") return styles.pass;
  if (status === "attention") return styles.attention;
  if (status === "blocked") return styles.blocked;
  if (status === "fail") return styles.fail;
  return styles.partial;
}

export default async function SystemHealthPage({
  searchParams,
}: {
  searchParams: Promise<{ context?: string }>;
}) {
  const params = await searchParams;
  const context = normalizeContext(params.context);
  const access = await getCommandAccess();

  if (access.state !== "ready") {
    const message = accessMessage(access.state);
    return (
      <CommandCenterShell active="system-health" context={context}>
        <section className={shell.access}>
          <h1>{message.title}</h1>
          <p>{message.body}</p>
        </section>
      </CommandCenterShell>
    );
  }

  const supabase = await createSupabaseServerClient();

  const [
    verificationResult,
    connectionResult,
    outboxPendingResult,
    receiptResult,
    decisionResult,
    auditResult,
  ] = await Promise.all([
    supabase
      .from("website_verification_runs")
      .select("id,status,source,source_repo,source_branch,git_sha,vercel_project_id,deployment_id,deployment_url,canonical_domain,checks,summary,runtime_error_count,completed_at,created_at")
      .eq("organization_id", access.organizationId)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("integration_connections")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", access.organizationId),
    supabase
      .from("hxos_sync_outbox")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", access.organizationId)
      .eq("status", "pending"),
    supabase
      .from("hxos_sync_receipts")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", access.organizationId),
    supabase
      .from("hxos_decision_cases")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", access.organizationId)
      .is("human_decision", null),
    supabase
      .from("integration_audit_log")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", access.organizationId),
  ]);

  const runs = (verificationResult.data ?? []) as VerificationRun[];
  const latest = runs[0] ?? null;
  const checks = latest ? checksFrom(latest.checks) : [];
  const attentionItems = checks.filter((item) => item.status !== "pass");

  const currentRuntime = {
    environment: process.env.VERCEL_ENV ?? "unknown",
    branch: process.env.VERCEL_GIT_COMMIT_REF ?? "unknown",
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown",
    url: process.env.VERCEL_URL ?? "unknown",
  };

  const rightRail = (
    <div className={styles.railStack}>
      <div className={shell.detailCard}>
        <h3>C.H.E.X. standard</h3>
        <p>
          CODE → BUILD → PREVIEW → AUTH → DATA → UI → PRODUCTION → READBACK.
          A screen is not marked working from a build alone.
        </p>
      </div>
      <div className={shell.detailCard}>
        <h3>Decision boundary</h3>
        <p>
          The developer agent can diagnose, branch, patch and verify. High-impact
          business, privacy and release decisions remain human-approved.
        </p>
      </div>
      <div className={shell.detailCard}>
        <h3>Developer work item</h3>
        <p>
          GitHub issue #24 tracks the Web Developer Agent, domain verification,
          smoke tests, accessibility checks and release safeguards.
        </p>
      </div>
    </div>
  );

  return (
    <CommandCenterShell
      active="system-health"
      context={context}
      rightRail={rightRail}
    >
      <div className={shell.pageTitle}>
        <div className={shell.eyebrow}>Reality C.H.E.X. · Website QA</div>
        <h1>Live Website Health</h1>
        <p>
          The private verification control room for Hands Gifted. It separates
          proven checks from assumptions and keeps website changes tied to
          evidence.
        </p>
      </div>

      <section className={styles.overview}>
        <article className={styles.heroCard}>
          <div>
            <span className={styles.label}>Latest verification</span>
            <div className={styles.heroStatus}>
              <span
                className={styles.statusDot + " " + statusClass(latest?.status)}
              />
              <strong>{latest ? titleCase(latest.status) : "No run"}</strong>
            </div>
            <p>{latest ? summaryText(latest.summary) : "No website verification run has been recorded yet."}</p>
          </div>
          <div className={styles.heroMeta}>
            <span>Completed</span>
            <strong>{latest ? formatDate(latest.completed_at ?? latest.created_at) : "—"}</strong>
          </div>
        </article>

        <div className={styles.metrics}>
          <article>
            <span>Runtime errors</span>
            <strong>{latest?.runtime_error_count ?? "—"}</strong>
            <small>Latest recorded production check</small>
          </article>
          <article>
            <span>Needs attention</span>
            <strong>{attentionItems.length}</strong>
            <small>Attention, blocked or failed checks</small>
          </article>
          <article>
            <span>HXOS pending</span>
            <strong>{outboxPendingResult.count ?? 0}</strong>
            <small>Outbox items awaiting transport</small>
          </article>
          <article>
            <span>Open decisions</span>
            <strong>{decisionResult.count ?? 0}</strong>
            <small>Human approval still open</small>
          </article>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <span className={styles.label}>Source of truth</span>
            <h2>Authoritative production stack</h2>
          </div>
          <span className={styles.privateBadge}>Private operations</span>
        </div>
        <div className={styles.sourceGrid}>
          <div><span>Repository</span><strong>{latest?.source_repo ?? "handsgifted322-ops/HandsGiftedFoundation"}</strong></div>
          <div><span>Production branch</span><strong>{latest?.source_branch ?? "main"}</strong></div>
          <div><span>Verified Git SHA</span><strong className={styles.mono}>{latest?.git_sha?.slice(0, 12) ?? "Not recorded"}</strong></div>
          <div><span>Vercel project</span><strong>{latest?.vercel_project_id ?? "Not recorded"}</strong></div>
          <div><span>Deployment</span><strong className={styles.mono}>{latest?.deployment_id ?? "Not recorded"}</strong></div>
          <div><span>Canonical domain</span><strong>{latest?.canonical_domain ?? "Not recorded"}</strong></div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <span className={styles.label}>Evidence</span>
            <h2>Verification checks</h2>
          </div>
          <span>{checks.length} checks</span>
        </div>
        <div className={styles.checkList}>
          {checks.length ? checks.map((check, index) => (
            <article className={styles.checkRow} key={check.key ?? index}>
              <span className={styles.statusDot + " " + statusClass(check.status)} />
              <div>
                <div className={styles.checkTop}>
                  <strong>{check.label ?? "Verification check"}</strong>
                  <span className={styles.statusChip + " " + statusClass(check.status)}>
                    {titleCase(check.status ?? "partial")}
                  </span>
                </div>
                <p>{check.evidence ?? "No evidence note recorded."}</p>
              </div>
            </article>
          )) : (
            <div className={styles.empty}>No detailed verification evidence has been recorded.</div>
          )}
        </div>
      </section>

      <section className={styles.twoColumn}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.label}>Current runtime</span>
              <h2>This page deployment</h2>
            </div>
          </div>
          <dl className={styles.definitionList}>
            <div><dt>Environment</dt><dd>{currentRuntime.environment}</dd></div>
            <div><dt>Branch</dt><dd>{currentRuntime.branch}</dd></div>
            <div><dt>Git SHA</dt><dd className={styles.mono}>{currentRuntime.sha.slice(0, 12)}</dd></div>
            <div><dt>Vercel URL</dt><dd>{currentRuntime.url}</dd></div>
          </dl>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <span className={styles.label}>Operations signals</span>
              <h2>Connected system records</h2>
            </div>
          </div>
          <dl className={styles.definitionList}>
            <div><dt>Integration connections</dt><dd>{connectionResult.count ?? 0}</dd></div>
            <div><dt>HXOS receipts</dt><dd>{receiptResult.count ?? 0}</dd></div>
            <div><dt>Audit records</dt><dd>{auditResult.count ?? 0}</dd></div>
            <div><dt>Verification runs</dt><dd>{runs.length}</dd></div>
          </dl>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <span className={styles.label}>Developer queue</span>
            <h2>Next technical actions</h2>
          </div>
          <a
            href="https://github.com/handsgifted322-ops/HandsGiftedFoundation/issues/24"
            target="_blank"
            rel="noreferrer"
          >
            Open issue #24
          </a>
        </div>
        {attentionItems.length ? (
          <ol className={styles.nextList}>
            {attentionItems.map((item, index) => (
              <li key={item.key ?? index}>
                <strong>{item.label ?? "Verification item"}</strong>
                <span>{item.evidence ?? "Further verification required."}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.empty}>No attention items in the latest verification.</div>
        )}
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <span className={styles.label}>History</span>
            <h2>Recent verification runs</h2>
          </div>
        </div>
        <div className={styles.history}>
          {runs.map((run) => (
            <div className={styles.historyRow} key={run.id}>
              <span className={styles.statusDot + " " + statusClass(run.status)} />
              <div>
                <strong>{titleCase(run.status)} · {run.source}</strong>
                <small>{formatDate(run.completed_at ?? run.created_at)}</small>
              </div>
              <span className={styles.mono}>{run.git_sha?.slice(0, 8) ?? "—"}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.footerNote}>
        <strong>Reality C.H.E.X. rule:</strong> a successful deployment is evidence,
        not proof. Production is considered verified only when the relevant
        user flow, data path and access boundary have been checked.
        {" "}
        <Link href="/command-center/decisions">Open HXOS Decision Center</Link>
      </div>
    </CommandCenterShell>
  );
}
