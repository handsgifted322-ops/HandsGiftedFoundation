import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { CommandCenterShell, normalizeContext } from "../_components/CommandCenterShell";
import { accessMessage, getCommandAccess } from "../_lib/access";
import styles from "../command-center.module.css";

const modules=[
 ["Children","household_members","Five child profiles plus parent roles","/command-center/academy"],
 ["School Records","school_records","Grades, attendance, testing and school follow-up","/command-center/academy"],
 ["Household Assignments","household_assignments","Chores, zones, parent checks and responsibilities","/command-center/household"],
 ["Academy Assignments","academy_assignments","Home learning and practical skill work","/command-center/academy"],
 ["Household Routines","household_routines","Morning, evening, Sabbath prep and repeatable rhythms","/command-center/routines"],
 ["Household Needs","household_needs","Clothing, food, transportation and stability needs","/command-center/family-stability"],
 ["SOPs","household_sops","Repeatable household procedures","/command-center/routines"],
 ["Family Progress","family_progress_metrics","Growth and development tracking","/command-center/academy"],
] as const;

export default async function FamilyOperationsPage({searchParams}:{searchParams:Promise<{context?:string}>}){
 const context=normalizeContext((await searchParams).context);
 const access=await getCommandAccess();
 if(access.state!=="ready"){const m=accessMessage(access.state);return <CommandCenterShell active="family-operations" context={context}><section className={styles.access}><h1>{m.title}</h1><p>{m.body}</p></section></CommandCenterShell>}
 const supabase=await createSupabaseServerClient();
 const results=await Promise.all(modules.map(async ([,table])=>{const {count}=await supabase.from(table).select("*",{count:"exact",head:true}).eq("organization_id",access.organizationId);return [table,count??0] as const;}));
 const counts=Object.fromEntries(results);
 return <CommandCenterShell active="family-operations" context={context}>
   <div className={styles.pageTitle}><div className={styles.eyebrow}>Household operating system</div><h1>Family Operations</h1><p>One control surface for five children, household execution, school responsibilities, routines, needs and Family Academy work.</p></div>
   <div className={styles.notice}><strong>Operating model</strong><p>My Day surfaces what is urgent. Family Operations holds the durable system underneath it: people, routines, assignments, school records, needs, SOPs and progress.</p></div>
   <section className={styles.section}><div className={styles.sectionHeader}><h2>Family operating map</h2><span className={styles.count}>{modules.length}</span></div>
     {modules.map(([label,table,desc,href])=><div className={styles.row} key={table}><span className={styles.severity+" "+styles.neutral}/><div className={styles.rowMain}><div className={styles.rowReason}>{counts[table]??0} records</div><div className={styles.rowTitle}>{label}</div><div className={styles.rowMeta}><span>{desc}</span></div></div><a className={styles.primaryAction+" "+styles.secondaryAction} href={href}>Open</a></div>)}
   </section>
 </CommandCenterShell>
}
