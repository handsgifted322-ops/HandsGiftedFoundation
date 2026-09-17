import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import { captureWork } from "../actions";
import styles from "../command-center.module.css";

type Row={id:string;title:string;status:string;priority:string|null;due_at:string|null;created_at:string};
export default async function InboxPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="inbox" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.from("tasks").select("id,title,status,priority,due_at,created_at").eq("organization_id",access.organizationId).not("status","in",'("complete","completed","archived")').order("created_at",{ascending:false}).limit(30);
 const rows=(data??[]) as Row[];
 return <CommandCenterShell active="inbox" context={context}>
  <div className={styles.pageTitle}><div className={styles.eyebrow}>Capture → triage → route</div><h1>Inbox & Triage</h1><p>Get something out of your head first. Add details only after it is safely captured.</p></div>
  <form id="capture" action={captureWork} className={styles.capturePanel}><label htmlFor="capture-title">What needs attention?</label><textarea id="capture-title" name="title" required maxLength={240} placeholder="Example: Review the website homepage changes before the developer moves forward."/><div className={styles.buttonRow}><button className={styles.button} type="submit">Save to Inbox</button><button className={`${styles.button} ${styles.buttonSecondary}`} type="reset">Clear</button></div></form>
  <section className={styles.section} style={{marginTop:14}}><div className={styles.sectionHeader}><h2>Open work</h2><span className={styles.count}>{rows.length}</span></div>{rows.length?rows.map(r=><div className={styles.row} key={r.id}><span className={`${styles.severity} ${r.priority==="urgent"?styles.critical:r.priority==="high"?styles.attention:styles.neutral}`}/><div className={styles.rowMain}><div className={styles.rowReason}>{r.status.replaceAll("_"," ")}</div><div className={styles.rowTitle}>{r.title}</div><div className={styles.rowMeta}><span>{r.priority??"normal"}</span><span>{r.due_at?new Date(r.due_at).toLocaleDateString():"Needs routing"}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href="/command-center/operations">Triage</a></div>):<div className={styles.empty}>Inbox clear. New captures will appear here.</div>}</section>
 </CommandCenterShell>
}
