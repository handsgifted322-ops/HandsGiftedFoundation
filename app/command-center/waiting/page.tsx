import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

export default async function WaitingPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="waiting" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("tasks").select("id,title,description,status,priority,due_at,updated_at").eq("organization_id",access.organizationId).ilike("status","%waiting%").order("updated_at",{ascending:true}).limit(30);
 const rows=data??[];
 return <CommandCenterShell active="waiting" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Dependencies and follow-through</div><h1>Waiting & Follow-ups</h1><p>Track work that cannot move until someone else responds or a future check date arrives.</p></div><section className={styles.section}><div className={styles.sectionHeader}><h2>Waiting now</h2><span className={styles.count}>{rows.length}</span></div>{rows.length?rows.map((r:any)=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${styles.neutral}`}/><div className={styles.rowMain}><div className={styles.rowReason}>Waiting</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.priority??"normal"}</span><span>{r.due_at?`Follow up ${new Date(r.due_at).toLocaleDateString()}`:"Needs follow-up date"}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/operations">Update</a></div>):<div className={styles.empty}>No tasks are currently marked waiting.</div>}</section></CommandCenterShell>
}
