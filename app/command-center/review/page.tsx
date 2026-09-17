import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

export default async function ReviewPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context); const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="review" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient(); const org=access.organizationId;
 const [tasks,projects,needs,content]=await Promise.all([
   supabase.from("tasks").select("id,status",{count:"exact",head:true}).eq("organization_id",org).not("status","in",'("complete","completed","archived")'),
   supabase.from("projects").select("id,status",{count:"exact",head:true}).eq("organization_id",org).not("status","in",'("complete","completed","archived")'),
   supabase.from("household_needs").select("id,status",{count:"exact",head:true}).eq("organization_id",org).neq("status","resolved"),
   supabase.from("content_items").select("id,status",{count:"exact",head:true}).eq("organization_id",org).neq("status","published"),
 ]);
 const steps=[
   ["1","Clear the Inbox",`${tasks.count??0} open work items need a clear next action, owner, date or waiting state.`,"/command-center/inbox"],
   ["2","Review Waiting","Follow up on anything that has been waiting long enough to require action.","/command-center/waiting"],
   ["3","Make Decisions",`${content.count??0} content items and other approvals may be waiting for review.`,"/command-center/approvals"],
   ["4","Review Family Needs",`${needs.count??0} unresolved household needs remain visible to this account.`,"/command-center/operations"],
   ["5","Check Projects",`${projects.count??0} active projects should each have a concrete next action.`,"/command-center/projects"],
   ["6","Choose Next Outcomes","Set the small number of outcomes that deserve attention next; defer the rest deliberately.","/command-center"],
 ] as const;
 return <CommandCenterShell active="review" context={context}><div className={styles.pageTitle}><div className={styles.eyebrow}>Executive reset</div><h1>Weekly Review</h1><p>A guided closeout so household and business work does not accumulate as invisible mental load.</p></div><section className={styles.section}><div className={styles.sectionHeader}><h2>Review sequence</h2></div>{steps.map(([num,title,body,href])=><div className={styles.row} key={num}><span className={`${styles.severity} ${styles.scheduled}`}/><div className={styles.rowMain}><div className={styles.rowReason}>Step {num}</div><div className={styles.rowTitle}>{title}</div><div className={styles.rowMeta}><span>{body}</span></div></div><a className={`${styles.primaryAction} ${styles.secondaryAction}`} href={href}>Review</a></div>)}</section></CommandCenterShell>
}
