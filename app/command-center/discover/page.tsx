import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

export default async function DiscoverPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="discover" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("project_context_entries").select("id,area,title,summary,source_type,maturity,confidentiality,approval_status,updated_at").eq("organization_id",access.organizationId).order("updated_at",{ascending:false}).limit(30);
 const rows=data??[];
 return <CommandCenterShell active="discover" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Useful signals without task clutter</div><h1>Discover / Insights</h1><p>Research, ideas, opportunities and observations can stay informational until you decide they require action.</p></div><section className={styles.section}><div className={styles.sectionHeader}><h2>Recent insights</h2><span className={styles.count}>{rows.length}</span></div>{rows.map((r:any)=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${r.approval_status==="needs_review"?styles.attention:styles.neutral}`}/><div className={styles.rowMain}><div className={styles.rowReason}>{r.area} · {r.approval_status.replaceAll("_"," ")}</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.maturity}</span><span>{r.confidentiality}</span><span>{r.source_type}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/operations">Review</a></div>)}</section></CommandCenterShell>
}
