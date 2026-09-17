import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
export default async function RoutinesPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="routines" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("household_routines").select("id,routine_name,weekday,start_time,instruction,active").eq("organization_id",access.organizationId).eq("active",true).order("weekday",{ascending:true}).order("sort_order",{ascending:true}).limit(50);
 const rows=data??[];
 return <CommandCenterShell active="routines" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Repeatable execution</div><h1>Routines & Playbooks</h1><p>Recurring work belongs in routines. Procedures and SOPs explain how; dated tasks track what must be done now.</p></div><section className={styles.section}><div className={styles.sectionHeader}><h2>Active routines</h2><a href="/command-center/sops">Open SOP library</a></div>{rows.map((r:any)=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${styles.scheduled}`}/><div className={styles.rowMain}><div className={styles.rowReason}>{typeof r.weekday==="number"?days[r.weekday]??"Routine":"Routine"} {r.start_time?`· ${String(r.start_time).slice(0,5)}`:""}</div><div className={styles.rowTitle}>{r.routine_name}</div><div className={styles.rowMeta}><span>{r.instruction||"Repeatable household routine"}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/household">Open</a></div>)}</section></CommandCenterShell>
}
