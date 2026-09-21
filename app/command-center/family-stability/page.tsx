import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

type Task={id:string;title:string;description:string|null;status:string;priority:string|null;due_at:string|null};
type Need={id:string;title:string;category:string;status:string;priority:string|null;needed_by:string|null};

function bucket(title:string){
 const v=title.toLowerCase();
 if(/rent|housing|landlord|eviction|utility|electric/.test(v)) return "Housing & Stability";
 if(/bus|ride|transport|work|job|shift/.test(v)) return "Transportation & Work";
 if(/family promise|cis|communities in schools|mch|salvation|assistance|agency|follow up|callback|resource/.test(v)) return "Assistance / Case Management";
 if(/laundry|clothes|clothing|food|grocery|household/.test(v)) return "Household Continuity";
 return "Other";
}

export default async function FamilyStabilityPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context);
 const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="family-stability" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const [taskRes,needRes]=await Promise.all([
   supabase.from("tasks").select("id,title,description,status,priority,due_at").eq("organization_id",access.organizationId).not("status","in",'("completed","complete","archived")').order("updated_at",{ascending:false}).limit(100),
   supabase.from("household_needs").select("id,title,category,status,priority,needed_by").eq("organization_id",access.organizationId).order("updated_at",{ascending:false}).limit(50)
 ]);
 const allTasks=(taskRes.data??[]) as Task[];
 const tasks=allTasks.filter(t=>bucket(t.title)!=="Other");
 const needs=(needRes.data??[]) as Need[];
 const groups=["Housing & Stability","Transportation & Work","Assistance / Case Management","Household Continuity"] as const;
 return <CommandCenterShell active="family-stability" context={context}>
  <div className={styles.pageTitle}><div className={styles.eyebrow}>Family case-management layer</div><h1>Stability & Cases</h1><p>Rent, housing, utilities, transportation, work continuity, assistance organizations and household needs are tracked as operational cases—not scattered notes.</p></div>
  <div className={styles.summaryGrid}>{groups.map(g=><div className={styles.summaryCard} key={g}><span>{g}</span><strong>{tasks.filter(t=>bucket(t.title)===g).length}</strong><small>open tasks</small></div>)}</div>
  <section className={styles.section} style={{marginTop:14}}><div className={styles.sectionHeader}><h2>Active stability work</h2><span className={styles.count}>{tasks.length}</span></div>
   {tasks.length?tasks.slice(0,30).map(t=><div className={styles.row} key={t.id}><span className={styles.severity+" "+(t.priority==="urgent"?styles.critical:t.priority==="high"?styles.attention:styles.neutral)}/><div className={styles.rowMain}><div className={styles.rowReason}>{bucket(t.title)} · {t.status.replaceAll("_"," ")}</div><div className={styles.rowTitle}>{t.title}</div><div className={styles.rowMeta}><span>{t.priority??"normal"}</span><span>{t.due_at?"Due "+new Date(t.due_at).toLocaleDateString():"No due date"}</span></div></div></div>):<div className={styles.empty}>No open stability cases surfaced.</div>}
  </section>
  <section className={styles.section} style={{marginTop:14}}><div className={styles.sectionHeader}><h2>Household needs record</h2><span className={styles.count}>{needs.length}</span></div>
   {needs.slice(0,20).map(n=><div className={styles.row} key={n.id}><span className={styles.severity+" "+styles.neutral}/><div className={styles.rowMain}><div className={styles.rowReason}>{n.category} · {n.status}</div><div className={styles.rowTitle}>{n.title}</div><div className={styles.rowMeta}><span>{n.priority??"normal"}</span><span>{n.needed_by?"Needed "+new Date(n.needed_by+"T12:00:00").toLocaleDateString():"No target date"}</span></div></div></div>)}
  </section>
 </CommandCenterShell>
}
