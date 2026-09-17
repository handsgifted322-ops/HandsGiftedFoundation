import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

type EventRow={id:string;title:string;when:string;kind:string;href:string};
export default async function CalendarPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="calendar" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient(); const org=access.organizationId;
 const [tasksRes,academyRes]=await Promise.all([
   supabase.from("tasks").select("id,title,due_at,status").eq("organization_id",org).not("due_at","is",null).not("status","in",'("complete","completed")').order("due_at",{ascending:true}).limit(30),
   supabase.from("academy_assignments").select("id,title,due_at,status").eq("organization_id",org).not("due_at","is",null).not("status","in",'("complete","completed")').order("due_at",{ascending:true}).limit(20),
 ]);
 const events:EventRow[]=[...(tasksRes.data??[]).map((r:any)=>({id:`task-${r.id}`,title:r.title,when:r.due_at,kind:"Task",href:"/command-center/operations"})),...(academyRes.data??[]).map((r:any)=>({id:`academy-${r.id}`,title:r.title,when:r.due_at,kind:"Academy",href:"/command-center/academy"}))].sort((a,b)=>new Date(a.when).getTime()-new Date(b.when).getTime());
 return <CommandCenterShell active="calendar" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Time-bound commitments</div><h1>Calendar</h1><p>Deadlines and scheduled work are shown here without turning every task into a calendar event.</p></div><section className={styles.section}><div className={styles.sectionHeader}><h2>Upcoming</h2><span className={styles.count}>{events.length}</span></div><div className={styles.timeline}>{events.length?events.map(e=><div className={styles.timelineItem} key={e.id}><div className={styles.time}>{new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(e.when))}</div><div><strong>{e.title}</strong><span>{e.kind} · {new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit"}).format(new Date(e.when))}</span><a href={e.href}>Open</a></div></div>):<div className={styles.empty}>No dated work is currently scheduled.</div>}</div></section></CommandCenterShell>
}
