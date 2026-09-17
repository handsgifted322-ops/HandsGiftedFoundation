import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

export default async function ProjectsPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="projects" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("projects").select("id,name,description,status,priority,due_at,initiative_state").eq("organization_id",access.organizationId).not("status","in",'("complete","completed","archived")').order("updated_at",{ascending:false}).limit(40);
 let rows=data??[];
 if(context==="family") rows=rows.filter((r:any)=>/family|household|academy|food|school/i.test(`${r.name} ${r.description??""}`));
 if(context==="personal") rows=rows.filter((r:any)=>/personal|faith|sabbath|holy|founder/i.test(`${r.name} ${r.description??""}`));
 if(context==="business") rows=rows.filter((r:any)=>!/family|household|academy|school/i.test(`${r.name} ${r.description??""}`));
 return <CommandCenterShell active="projects" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Outcomes, not loose tasks</div><h1>Projects</h1><p>Multi-step outcomes stay here. Website development is managed as a business project while the actual public website remains separate.</p></div><section className={styles.section}><div className={styles.sectionHeader}><h2>Active portfolio</h2><span className={styles.count}>{rows.length}</span></div>{rows.map((r:any)=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${r.priority==="urgent"?styles.critical:r.priority==="high"?styles.attention:styles.neutral}`}/><div className={styles.rowMain}><div className={styles.rowReason}>{r.initiative_state??"Project"}</div><div className={styles.rowTitle}>{r.name}</div><div className={styles.rowMeta}><span>{r.status.replaceAll("_"," ")}</span><span>{r.priority??"normal"}</span><span>{r.due_at?new Date(r.due_at).toLocaleDateString():"No fixed deadline"}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/operations">Open</a></div>)}</section></CommandCenterShell>
}
