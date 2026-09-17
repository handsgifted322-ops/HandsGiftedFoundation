import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

export default async function ApprovalsPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="approvals" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient(); const org=access.organizationId;
 const [contentRes,contextRes,houseRes]=await Promise.all([
  supabase.from("content_items").select("id,title,status,content_type").eq("organization_id",org).neq("status","published").order("updated_at",{ascending:false}).limit(20),
  supabase.from("project_context_entries").select("id,title,area,approval_status,confidentiality").eq("organization_id",org).eq("approval_status","needs_review").order("updated_at",{ascending:false}).limit(20),
  supabase.from("household_assignments").select("id,title,status,parent_check_status").eq("organization_id",org).neq("parent_check_status","pass").order("updated_at",{ascending:false}).limit(20),
 ]);
 const content=contentRes.data??[]; const reviews=contextRes.data??[]; const checks=houseRes.data??[];
 return <CommandCenterShell active="approvals" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Decision queue</div><h1>Approvals</h1><p>Review decisions separately from ordinary tasks. Nothing is made public automatically.</p></div>
  <section className={styles.section}><div className={styles.sectionHeader}><h2>Content & public-use review</h2><span className={styles.count}>{content.length+reviews.length}</span></div>{[...reviews.map((r:any)=>({id:r.id,title:r.title,meta:`${r.area} · ${r.confidentiality}`,href:"/command-center/content"})),...content.map((r:any)=>({id:r.id,title:r.title,meta:`${r.content_type} · ${r.status}`,href:"/command-center/content"}))].slice(0,12).map((r:any)=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${styles.attention}`}/><div className={styles.rowMain}><div className={styles.rowReason}>Review required</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.meta}</span></div></div><a className={styles.primaryAction} href={r.href}>Review</a></div>)}</section>
  <section className={styles.section}><div className={styles.sectionHeader}><h2>Parent verification</h2><span className={styles.count}>{checks.length}</span></div>{checks.slice(0,10).map((r:any)=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${styles.scheduled}`}/><div className={styles.rowMain}><div className={styles.rowReason}>Parent check</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.status} · {r.parent_check_status}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/household">Verify</a></div>)}</section>
 </CommandCenterShell>
}
